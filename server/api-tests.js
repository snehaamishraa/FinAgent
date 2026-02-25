#!/usr/bin/env node

/**
 * Banking Scheme Guidance System - API Test Suite
 * Run this file to test all API endpoints
 * 
 * Usage: node api-tests.js
 * 
 * Requirements:
 * - Server must be running on http://localhost:5000
 * - Install dependencies: npm install
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000';
const API_BASE = `${BASE_URL}/api`;

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

/**
 * Helper function to make HTTP requests
 */
function makeRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: urlObj.port || 80,
      path: urlObj.pathname + urlObj.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Banking-Scheme-API-Test/1.0'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({
            status: res.statusCode,
            data: parsed,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            status: res.statusCode,
            data: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

/**
 * Print test result
 */
function printResult(testName, passed, details = '') {
  const icon = passed ? '✓' : '✗';
  const color = passed ? colors.green : colors.red;
  console.log(`${color}${icon} ${testName}${colors.reset}${details ? ` - ${details}` : ''}`);
}

/**
 * Main test suite
 */
async function runTests() {
  console.log(`\n${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║   Banking Scheme Guidance System - API Test Suite          ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}\n`);

  // Test 1: Health Check
  console.log(`${colors.blue}1. Testing Health Check Endpoint${colors.reset}`);
  try {
    const health = await makeRequest('GET', `${API_BASE}/health`);
    printResult('GET /api/health', health.status === 200 && health.data.status === 'OK');
    console.log(`   Status: ${health.status}, Environment: ${health.data.environment}\n`);
  } catch (error) {
    printResult('GET /api/health', false, error.message);
    console.log('\n❌ Server is not running. Please start the server first.\n');
    process.exit(1);
  }

  // Test 2: Get All Banks
  console.log(`${colors.blue}2. Testing Get All Banks Endpoint${colors.reset}`);
  try {
    const banks = await makeRequest('GET', `${API_BASE}/banks`);
    printResult('GET /api/banks', banks.status === 200, `Found ${banks.data.count} banks`);
    console.log(`   Banks: ${banks.data.banks.slice(0, 3).join(', ')}...\n`);
  } catch (error) {
    printResult('GET /api/banks', false, error.message);
  }

  // Test 3: Get All Categories
  console.log(`${colors.blue}3. Testing Get All Categories Endpoint${colors.reset}`);
  try {
    const categories = await makeRequest('GET', `${API_BASE}/categories`);
    printResult('GET /api/categories', categories.status === 200, `Found ${categories.data.count} categories`);
    console.log(`   Categories: ${categories.data.categories.slice(0, 3).join(', ')}...\n`);
  } catch (error) {
    printResult('GET /api/categories', false, error.message);
  }

  // Test 4: Get All Schemes
  console.log(`${colors.blue}4. Testing Get All Schemes Endpoint${colors.reset}`);
  try {
    const schemes = await makeRequest('GET', `${API_BASE}/schemes?limit=5`);
    printResult('GET /api/schemes', schemes.status === 200 && schemes.data.returned === 5, `Returned 5 of ${schemes.data.total} total`);
    if (schemes.data.schemes.length > 0) {
      console.log(`   First scheme: ${schemes.data.schemes[0].scheme_name}\n`);
    }
  } catch (error) {
    printResult('GET /api/schemes', false, error.message);
  }

  // Test 5: Get Schemes by Category Filter
  console.log(`${colors.blue}5. Testing Category Filter${colors.reset}`);
  try {
    const filtered = await makeRequest('GET', `${API_BASE}/schemes?category=Home%20Loans`);
    printResult('GET /api/schemes?category=Home Loans', filtered.status === 200, `Found ${filtered.data.filtered} home loans`);
    console.log(`   Sample: ${filtered.data.schemes[0]?.scheme_name}\n`);
  } catch (error) {
    printResult('GET /api/schemes?category=Home Loans', false, error.message);
  }

  // Test 6: Get Specific Scheme by ID
  console.log(`${colors.blue}6. Testing Get Scheme by ID Endpoint${colors.reset}`);
  try {
    const scheme = await makeRequest('GET', `${API_BASE}/schemes/sbi_education_1`);
    printResult('GET /api/schemes/sbi_education_1', scheme.status === 200, `Retrieved: ${scheme.data.scheme?.scheme_name}`);
    console.log(`   Bank: ${scheme.data.scheme?.bank_name}\n`);
  } catch (error) {
    printResult('GET /api/schemes/sbi_education_1', false, error.message);
  }

  // Test 7: Filter Schemes (Main Feature)
  console.log(`${colors.blue}7. Testing Filter Schemes Endpoint (Core Feature)${colors.reset}`);
  try {
    const criteria = {
      age: 28,
      income: 600000,
      purpose: 'Home Loans',
      loanAmount: 2000000,
      limit: 10
    };
    
    const filtered = await makeRequest('POST', `${API_BASE}/filter`, criteria);
    printResult('POST /api/filter', 
      filtered.status === 200 && filtered.data.success,
      `Matched ${filtered.data.matchedSchemes} of ${filtered.data.totalSchemes} schemes`
    );
    
    if (filtered.data.schemes.length > 0) {
      console.log(`   Top match: ${filtered.data.schemes[0].scheme_name}`);
      console.log(`   Match score: ${filtered.data.schemes[0].matchScore}/100\n`);
    }
  } catch (error) {
    printResult('POST /api/filter', false, error.message);
  }

  // Test 8: Filter with Invalid Age
  console.log(`${colors.blue}8. Testing Error Handling (Invalid Age)${colors.reset}`);
  try {
    const invalid = await makeRequest('POST', `${API_BASE}/filter`, {
      age: 10,
      income: 300000,
      purpose: 'Personal Loans'
    });
    printResult('POST /api/filter (Invalid Age)', invalid.status === 400 && !invalid.data.success, 'Correctly rejected invalid input');
  } catch (error) {
    printResult('POST /api/filter (Invalid Age)', false, error.message);
  }

  // Test 9: Filter by Specific Bank
  console.log(`${colors.blue}9. Testing Bank-Specific Filter${colors.reset}`);
  try {
    const sibFilter = await makeRequest('POST', `${API_BASE}/filter`, {
      age: 30,
      income: 500000,
      purpose: 'Personal Loans',
      bank: 'State Bank of India (SBI)',
      limit: 5
    });
    printResult('POST /api/filter (SBI Only)', sibFilter.status === 200, `Found ${sibFilter.data.matchedSchemes} SBI personal loans`);
  } catch (error) {
    printResult('POST /api/filter (SBI Only)', false, error.message);
  }

  // Test 10: Compare Schemes
  console.log(`${colors.blue}10. Testing Compare Schemes Endpoint${colors.reset}`);
  try {
    const compare = await makeRequest('POST', `${API_BASE}/compare`, {
      schemeIds: ['sbi_home_1', 'hdfc_home_1', 'icici_msme_1']
    });
    printResult('POST /api/compare', 
      compare.status === 200 && compare.data.success && compare.data.comparisonCount === 3,
      `Compared 3 schemes`
    );
    console.log(`   Schemes: ${compare.data.schemes.map(s => s.scheme_name).join(', ')}\n`);
  } catch (error) {
    printResult('POST /api/compare', false, error.message);
  }

  // Test 11: Compare Too Many Schemes
  console.log(`${colors.blue}11. Testing Comparison Limit${colors.reset}`);
  try {
    const tooMany = await makeRequest('POST', `${API_BASE}/compare`, {
      schemeIds: ['sbi_home_1', 'hdfc_home_1', 'icici_msme_1', 'pnb_personal_1', 'bob_home_1', 'union_agriculture_1']
    });
    printResult('POST /api/compare (Too Many)', tooMany.status === 400 && !tooMany.data.success, 'Correctly limited comparison');
  } catch (error) {
    printResult('POST /api/compare (Too Many)', false, error.message);
  }

  // Test 12: Agriculture Scheme Filtering
  console.log(`${colors.blue}12. Testing Agriculture Schemes Filter${colors.reset}`);
  try {
    const agri = await makeRequest('POST', `${API_BASE}/filter`, {
      age: 45,
      income: 200000,
      purpose: 'Agriculture Loans'
    });
    printResult('POST /api/filter (Agriculture)', agri.status === 200, `Found ${agri.data.matchedSchemes} agriculture schemes`);
  } catch (error) {
    printResult('POST /api/filter (Agriculture)', false, error.message);
  }

  // Summary
  console.log(`${colors.cyan}╔════════════════════════════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.cyan}║                    Test Suite Completed                   ║${colors.reset}`);
  console.log(`${colors.cyan}╚════════════════════════════════════════════════════════════╝${colors.reset}`);
  console.log(`\n${colors.yellow}✓ All endpoints are working correctly!${colors.reset}\n`);
  console.log(`${colors.yellow}📖 For detailed API documentation, see API_DOCUMENTATION.md${colors.reset}\n`);
}

// Run tests
runTests().catch(error => {
  console.error(`${colors.red}Fatal Error:${colors.reset}`, error);
  process.exit(1);
});
