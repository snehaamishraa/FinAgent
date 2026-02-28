import { readFileSync } from 'fs';
import { join } from 'path';

let schemesCache = null;

function loadSchemes() {
  if (schemesCache) return schemesCache;
  
  try {
    const filePath = join(process.cwd(), 'server/data/bank_schemes.json');
    const fileContent = readFileSync(filePath, 'utf-8');
    schemesCache = JSON.parse(fileContent);
    return schemesCache;
  } catch (error) {
    console.error('Error loading schemes:', error);
    return null;
  }
}

function parseCurrency(amount) {
  if (typeof amount === 'number') return amount;
  if (typeof amount !== 'string') return 0;
  return parseInt(amount.replace(/[₹,]/g, '')) || 0;
}

function parseInterestRate(rateRange) {
  if (!rateRange) return { min: 0, max: 100 };
  
  const match = rateRange.match(/[\d.]+/g);
  if (!match || match.length < 1) return { min: 0, max: 100 };
  
  const min = parseFloat(match[0]);
  const max = match.length > 1 ? parseFloat(match[1]) : min;
  
  return { min, max };
}

function normalizeLabel(value) {
  return (value || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function isTagCategory(value) {
  const key = normalizeLabel(value);
  return key === 'singlechild' || key === 'girlchild';
}

function matchesCriteria(scheme, criteria) {
  // Age check
  if (criteria.age) {
    if (scheme.minimum_age && criteria.age < scheme.minimum_age) return false;
    if (scheme.maximum_age && criteria.age > scheme.maximum_age) return false;
  }

  // Income check
  if (criteria.income) {
    if (scheme.minimum_income_required && criteria.income < scheme.minimum_income_required) return false;
  }

  // Loan amount check
  if (criteria.loanAmount && criteria.loanAmount > 0) {
    const minAmount = parseCurrency(scheme.loan_amount_min);
    const maxAmount = parseCurrency(scheme.loan_amount_max);
    if (criteria.loanAmount < minAmount || criteria.loanAmount > maxAmount) return false;
  }

  // Purpose/Category check
  if (criteria.purpose) {
    const purposeKey = normalizeLabel(criteria.purpose);
    if (isTagCategory(criteria.purpose)) {
      const schemeTags = Array.isArray(scheme.scheme_tags) ? scheme.scheme_tags : [];
      const normalizedTags = schemeTags.map(tag => normalizeLabel(tag));
      if (!normalizedTags.includes(purposeKey)) return false;
    } else if (normalizeLabel(scheme.scheme_category) !== purposeKey) {
      return false;
    }
  }

  // Bank check
  if (criteria.bank) {
    if (scheme.bank_name !== criteria.bank) return false;
  }

  return true;
}

function calculateMatchScore(scheme, criteria) {
  let score = 50; // Base score

  // Category match (best indicator)
  if (criteria.purpose) {
    const purposeKey = normalizeLabel(criteria.purpose);
    const categoryKey = normalizeLabel(scheme.scheme_category);
    if (purposeKey === categoryKey) {
      score += 30;
    } else if (isTagCategory(criteria.purpose)) {
      const schemeTags = Array.isArray(scheme.scheme_tags) ? scheme.scheme_tags : [];
      const normalizedTags = schemeTags.map(tag => normalizeLabel(tag));
      if (normalizedTags.includes(purposeKey)) score += 30;
    }
  }

  // Age proximity (if applicable)
  if (criteria.age) {
    if (scheme.minimum_age && scheme.maximum_age) {
      const midAge = (scheme.minimum_age + scheme.maximum_age) / 2;
      const ageDiff = Math.abs(criteria.age - midAge);
      if (ageDiff <= 5) score += 15;
      else if (ageDiff <= 15) score += 10;
      else if (ageDiff <= 25) score += 5;
    }
  }

  // Income match
  if (criteria.income && scheme.minimum_income_required) {
    const incomeRatio = criteria.income / scheme.minimum_income_required;
    if (incomeRatio >= 1.5) score += 5;
  }

  return Math.min(100, Math.max(0, score));
}

export default function handler(req, res) {
  try {
    const data = loadSchemes();
    if (!data || !data.schemes) {
      return res.status(404).json({ success: false, error: 'No schemes found' });
    }

    // Handle GET request - return all schemes
    if (req.method === 'GET') {
      return res.status(200).json({
        success: true,
        totalSchemes: data.schemes.length,
        schemes: data.schemes,
        timestamp: new Date().toISOString()
      });
    }

    // Handle POST request - filter schemes
    if (req.method === 'POST') {
      // Accept both old parameter names (from results.js) and new ones
      const incoming = req.body;
      const age = incoming.age ? parseInt(incoming.age) : null;
      const monthlyIncome = incoming.monthlyIncome ? parseInt(incoming.monthlyIncome) : (incoming.income ? parseInt(incoming.income) : null);
      const gender = incoming.gender || null;
      const category = incoming.category || null;
      const savingsGoal = incoming.savingsGoal || incoming.purpose || null;

      // Validate input
      if (age && (age < 18 || age > 100)) {
        return res.status(400).json({ success: false, error: 'Age must be between 18 and 100' });
      }

      // Filter schemes using helper to handle all criteria (age, income, loan amount, purpose, bank)
      const criteriaObject = { age, income: monthlyIncome, loanAmount: incoming.loanAmount || 0, purpose: savingsGoal, bank: incoming.bank || null };

      let filteredSchemes = data.schemes.filter(scheme => matchesCriteria(scheme, criteriaObject));

      // Generate bestFitExplanation and matchScore for each matched scheme
      const explainedSchemes = filteredSchemes.map(scheme => {
        const explanations = [];

        // Age match explanation
        if (age) {
          const minA = scheme.minimum_age;
          const maxA = scheme.maximum_age;
          if ((minA === undefined || age >= minA) && (maxA === undefined || age <= maxA)) {
            if (minA != null && maxA != null) {
              explanations.push(`Your age (${age}) falls within the eligible range of ${minA}–${maxA} years.`);
            } else if (minA != null) {
              explanations.push(`You meet the minimum age requirement of ${minA} years.`);
            } else if (maxA != null) {
              explanations.push(`You are younger than the maximum allowed age of ${maxA} years.`);
            }
          }
        }

        // Income eligibility explanation
        if (monthlyIncome) {
          const minI = scheme.minimum_income_required;
          if (minI) {
            const minRequired = parseCurrency(minI.toString());
            if (monthlyIncome >= minRequired) {
              explanations.push(`Your income (₹${monthlyIncome.toLocaleString()}) meets the minimum requirement of ₹${minRequired.toLocaleString()}.`);
            }
          } else {
            explanations.push(`This scheme has flexible income requirements.`);
          }
        }

        // Savings goal alignment explanation
        if (savingsGoal) {
          const goalLower = savingsGoal.toLowerCase();
          const categoryLower = (scheme.scheme_category || '').toLowerCase();
          if (categoryLower.includes(goalLower) || goalLower.includes(categoryLower)) {
            explanations.push(`It aligns with your goal of ${savingsGoal}.`);
          }
        }

        return {
          ...scheme,
          bestFitExplanation: explanations,
          matchScore: calculateMatchScore(scheme, criteriaObject)
        };
      });

      // sort by descending matchScore so stronger fits appear first
      explainedSchemes.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

      return res.status(200).json({
        success: true,
        totalSchemes: data.schemes.length,
        matchedSchemes: explainedSchemes.length,
        schemes: explainedSchemes,
        userCriteria: { age, gender, category, monthlyIncome, savingsGoal },
        timestamp: new Date().toISOString()
      });
    }

    // Method not allowed
    return res.status(405).json({ success: false, error: 'Method not allowed' });

  } catch (error) {
    console.error('Error in /api/filter-schemes:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to filter schemes',
      message: error.message 
    });
  }
}
