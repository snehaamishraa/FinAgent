const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS with specific options
app.use(cors({
  origin: process.env.CORS_ORIGIN || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Middleware
app.use(express.json({ limit: '10kb' })); // Limit payload size
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
});

/**
 * Load schemes data from JSON file
 * @async
 * @returns {Promise<Array>} Array of schemes
 */
async function loadSchemes() {
  try {
    const schemsPath = path.join(__dirname, 'data', 'bank_schemes.json');
    const data = await fs.readFile(schemsPath, 'utf8');
    return JSON.parse(data).schemes;
  } catch (error) {
    console.error('Error loading schemes:', error);
    throw new Error('Failed to load schemes data');
  }
}

/**
 * Parse currency string to number
 * @param {string} amount - Amount string (e.g., "₹50,000")
 * @returns {number} Parsed amount
 */
function parseCurrency(amount) {
  if (!amount || typeof amount !== 'string') return 0;
  return parseInt(amount.replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Parse interest rate range
 * @param {string} rateRange - Rate range string (e.g., "7.5% - 9.5%")
 * @returns {Object} Min and max rates
 */
function parseInterestRate(rateRange) {
  if (!rateRange || typeof rateRange !== 'string') return { min: 0, max: 0 };
  const rates = rateRange.match(/[\d.]+/g);
  return {
    min: rates ? parseFloat(rates[0]) : 0,
    max: rates && rates[1] ? parseFloat(rates[1]) : parseFloat(rates[0] || 0)
  };
}

/**
 * Check if scheme matches user criteria
 * @param {Object} scheme - Scheme object
 * @param {Object} criteria - User criteria
 * @returns {Boolean} Whether scheme matches
 */
function matchesCriteria(scheme, criteria) {
  // Age check
  if (criteria.age) {
    if (scheme.minimum_age && criteria.age < scheme.minimum_age) return false;
    if (scheme.maximum_age !== 'No upper limit' && criteria.age > scheme.maximum_age) return false;
  }

  // Loan amount check
  if (criteria.loanAmount) {
    const loanMin = parseCurrency(scheme.loan_amount_min);
    const loanMax =  parseCurrency(scheme.loan_amount_max);
    if (criteria.loanAmount < loanMin || criteria.loanAmount > loanMax) return false;
  }

  // Income check
  if (criteria.income) {
    // For schemes with no minimum income requirement, allow all
    if(scheme.minimum_income_required && scheme.minimum_income_required !== 'No minimum income required' && scheme.minimum_income_required !== 'No minimum income requirement') {
      const minIncome = parseCurrency(scheme.minimum_income_required);
      if (criteria.income < minIncome) return false;
    }
  }

  // Purpose/Category check
  if (criteria.purpose) {
    if (!scheme.scheme_category.toLowerCase().includes(criteria.purpose.toLowerCase())) {
      return false;
    }
  }

  // Bank filter
  if (criteria.bank && scheme.bank_name !== criteria.bank) {
    return false;
  }

  return true;
}

/**
 * Calculate match score for scheme
 * @param {Object} scheme - Scheme object
 * @param {Object} criteria - User criteria
 * @returns {number} Match score (0-100)
 */
function calculateMatchScore(scheme, criteria) {
  let score = 100;

  // Check if it's a perfect match
  if (scheme.scheme_category.toLowerCase() === criteria.purpose?.toLowerCase()) {
    score += 20;
  }

  // Age proximity (bonus for close match)
  if (criteria.age) {
    const minAge = scheme.minimum_age || 18;
    const maxAge = scheme.maximum_age || 70;
    const ageMid = (minAge + maxAge) / 2;
    const ageDiff = Math.abs(criteria.age - ageMid);
    score -= (ageDiff / 25) * 10; // Penalty for age distance
  }

  return Math.max(0, score);
}

// ============ API ENDPOINTS ============

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

/**
 * Get all schemes with optional filters
 * GET /api/schemes?category=Education&bank=SBI
 */
app.get('/api/schemes', async (req, res) => {
  try {
    const schemes = await loadSchemes();
    const { category, bank, limit = 50 } = req.query;

    let filtered = schemes;

    // Apply filters if provided
    if (category) {
      filtered = filtered.filter(s => s.scheme_category.toLowerCase().includes(category.toLowerCase()));
    }
    if (bank) {
      filtered = filtered.filter(s => s.bank_name.toLowerCase().includes(bank.toLowerCase()));
    }

    // Apply limit
    const results = filtered.slice(0, Math.min(parseInt(limit), 100));

    res.json({
      success: true,
      total: schemes.length,
      filtered: filtered.length,
      returned: results.length,
      schemes: results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch schemes',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get scheme by ID
 * GET /api/schemes/:id
 */
app.get('/api/schemes/:id', async (req, res) => {
  try {
    const schemes = await loadSchemes();
    const scheme = schemes.find(s => s.id === req.params.id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        error: 'Scheme not found',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      scheme,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching scheme:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch scheme',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get all unique banks
 * GET /api/banks
 */
app.get('/api/banks', async (req, res) => {
  try {
    const schemes = await loadSchemes();
    const banks = [...new Set(schemes.map(s => s.bank_name))].sort();

    res.json({
      success: true,
      count: banks.length,
      banks,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching banks:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch banks',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Get all unique categories
 * GET /api/categories
 */
app.get('/api/categories', async (req, res) => {
  try {
    const schemes = await loadSchemes();
    const categories = [...new Set(schemes.map(s => s.scheme_category))].sort();

    res.json({
      success: true,
      count: categories.length,
      categories,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch categories',
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Filter schemes based on user criteria
 * POST /api/filter
 *
 * Request body:
 * {
 *   age: number,
 *   income: number (annual),
 *   loanAmount: number (optional),
 *   purpose: string (e.g., "Education Loans", "Home Loans"),
 *   bank: string (optional),
 *   limit: number (default: 10, max: 50)
 * }
 */
app.post('/api/filter', async (req, res) => {
  try {
    const { age, income, loanAmount, purpose, bank, limit = 10 } = req.body;

    // Validation
    if (!age || age < 18 || age > 100) {
      return res.status(400).json({
        success: false,
        error: 'Valid age (18-100) is required',
        timestamp: new Date().toISOString()
      });
    }

    if (!income || income < 0) {
      return res.status(400).json({
        success: false,
        error: 'Valid annual income is required',
        timestamp: new Date().toISOString()
      });
    }

    if (!purpose || purpose.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Loan purpose is required',
        timestamp: new Date().toISOString()
      });
    }

    const criteria = {
      age,
      income,
      loanAmount: loanAmount || 0,
      purpose,
      bank: bank || null
    };

    // Load schemes
    const schemes = await loadSchemes();

    // Filter schemes
    const matchedSchemes = schemes
      .filter(scheme => matchesCriteria(scheme, criteria))
      .map(scheme => ({
        ...scheme,
        matchScore: calculateMatchScore(scheme, criteria)
      }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, Math.min(parseInt(limit), 50));

    res.json({
      success: true,
      criteria,
      totalSchemes: schemes.length,
      matchedSchemes: matchedSchemes.length,
      schemes: matchedSchemes,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error filtering schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to filter schemes',
      details: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

/**
 * Compare multiple schemes
 * POST /api/compare
 *
 * Request body:
 * {
 *   schemeIds: ["id1", "id2", "id3"]
 * }
 */
app.post('/api/compare', async (req, res) => {
  try {
    const { schemeIds } = req.body;

    if (!schemeIds || !Array.isArray(schemeIds) || schemeIds.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one scheme ID is required for comparison',
        timestamp: new Date().toISOString()
      });
    }

    if (schemeIds.length > 5) {
      return res.status(400).json({
        success: false,
        error: 'Cannot compare more than 5 schemes at once',
        timestamp: new Date().toISOString()
      });
    }

    const schemes = await loadSchemes();
    const comparisonSchemes = schemes.filter(s => schemeIds.includes(s.id));

    if (comparisonSchemes.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No schemes found for comparison',
        timestamp: new Date().toISOString()
      });
    }

    res.json({
      success: true,
      comparisonCount: comparisonSchemes.length,
      schemes: comparisonSchemes,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error comparing schemes:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to compare schemes',
      timestamp: new Date().toISOString()
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path,
    timestamp: new Date().toISOString()
  });
});


// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Banking Scheme Guidance System Server`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`\n📊 Available Endpoints:\n`);
  console.log(`  ✓ GET  /api/health              - Server health check`);
  console.log(`  ✓ GET  /api/banks               - Get all banks`);
  console.log(`  ✓ GET  /api/categories          - Get all loan categories`);
  console.log(`  ✓ GET  /api/schemes             - Get all schemes (with optional filters)`);
  console.log(`  ✓ GET  /api/schemes/:id         - Get specific scheme by ID`);
  console.log(`  ✓ POST /api/filter              - Filter schemes by user criteria`);
  console.log(`  ✓ POST /api/compare             - Compare multiple schemes`);
  console.log(`\n📖 Example Filter Request:`);
  console.log(`  POST /api/filter`);
  console.log(`  {`);
  console.log(`    "age": 28,`);
  console.log(`    "income": 500000,`);
  console.log(`    "purpose": "Home Loans",`);
  console.log(`    "loanAmount": 2000000,`);
  console.log(`    "limit": 10`);
  console.log(`  }\n`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});

module.exports = app;
