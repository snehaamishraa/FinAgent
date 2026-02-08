const express = require('express');
const cors = require('cors');
const schemes = require('./data/schemes.json');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date().toISOString() });
});

// Get all banks
app.get('/api/banks', (req, res) => {
  const banks = Object.keys(schemes);
  res.json({ banks });
});

// Get schemes for a specific bank
app.get('/api/schemes/:bankId', (req, res) => {
  const { bankId } = req.params;
  
  if (!schemes[bankId]) {
    return res.status(404).json({ error: 'Bank not found' });
  }
  
  res.json({ bank: bankId, schemes: schemes[bankId] });
});

// Filter schemes based on user eligibility
app.post('/api/filter-schemes', (req, res) => {
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
        scheme.bestMatch = true; // Mark as best match if goals align
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
  
  res.json({
    bank: bankId,
    totalSchemes: bankSchemes.length,
    matchedSchemes: filteredSchemes.length,
    schemes: filteredSchemes,
    userCriteria: { age, gender, category, monthlyIncome, occupation, savingsGoal }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Banking Scheme Guidance Server running on http://localhost:${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /api/health`);
  console.log(`   GET  /api/banks`);
  console.log(`   GET  /api/schemes/:bankId`);
  console.log(`   POST /api/filter-schemes`);
});
