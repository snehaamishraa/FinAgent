import schemes from '../../server/data/schemes.json';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { bankId, age, gender, category, monthlyIncome, occupation, savingsGoal } = req.body;

    if (!bankId || !schemes[bankId]) {
      return res.status(400).json({ error: 'Invalid or missing bank ID' });
    }

    const bankSchemes = schemes[bankId];
    const filteredSchemes = bankSchemes.filter(scheme => {
      let matches = true;

      // Age filter
      if (scheme.eligibility.minAge && age < scheme.eligibility.minAge) matches = false;
      if (scheme.eligibility.maxAge && age > scheme.eligibility.maxAge) matches = false;

      // Gender filter
      if (scheme.eligibility.gender && scheme.eligibility.gender !== 'Any' && scheme.eligibility.gender !== gender) {
        matches = false;
      }

      // Category filter
      if (scheme.eligibility.categories && scheme.eligibility.categories.length > 0) {
        if (!scheme.eligibility.categories.includes(category) && !scheme.eligibility.categories.includes('All')) {
          matches = false;
        }
      }

      // Income filter
      if (scheme.eligibility.maxIncome && monthlyIncome > scheme.eligibility.maxIncome) {
        matches = false;
      }
      if (scheme.eligibility.minIncome && monthlyIncome < scheme.eligibility.minIncome) {
        matches = false;
      }

      // Occupation filter
      if (scheme.eligibility.occupations && scheme.eligibility.occupations.length > 0) {
        if (!scheme.eligibility.occupations.includes(occupation) && !scheme.eligibility.occupations.includes('Any')) {
          matches = false;
        }
      }

      // Savings goal filter (optional matching)
      if (savingsGoal && scheme.suitableFor && scheme.suitableFor.length > 0) {
        if (scheme.suitableFor.includes(savingsGoal)) {
          scheme.bestMatch = true;
        }
      }

      return matches;
    });

    // Sort to show best matches first
    filteredSchemes.sort((a, b) => {
      if (a.bestMatch && !b.bestMatch) return -1;
      if (!a.bestMatch && b.bestMatch) return 1;
      return 0;
    });

    res.status(200).json({
      bank: bankId,
      totalSchemes: bankSchemes.length,
      matchedSchemes: filteredSchemes.length,
      schemes: filteredSchemes,
      userCriteria: { age, gender, category, monthlyIncome, occupation, savingsGoal }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to filter schemes' });
  }
}
