# Banking Scheme Guidance System - API Documentation

## Overview
This API provides banking scheme information and filtering. It runs as Next.js API routes under the same domain as the frontend.

## Base URL
```
http://localhost:3000/api
```

In production (Vercel), use the same base as the deployed site:
```
https://your-domain.vercel.app/api
```

---

## Endpoints

### 1. Get All Banks
Returns the list of banks available in the data source.

**Request:**
```http
GET /api/banks
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 9,
  "banks": [
    "Axis Bank",
    "Bank of Baroda",
    "HDFC Bank",
    "ICICI Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank (PNB)",
    "State Bank of India (SBI)",
    "Union Bank of India",
    "Government-backed (All Banks)"
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 2. Get Schemes by Bank
Returns all schemes for a selected bank.

**Request:**
```http
GET /api/schemes/Axis%20Bank
```

**Response (200 OK):**
```json
{
  "success": true,
  "bank": "Axis Bank",
  "count": 5,
  "schemes": [
    {
      "id": "axis_home_1",
      "bank_name": "Axis Bank",
      "scheme_category": "Home Loans",
      "scheme_name": "Axis Home Loan",
      "interest_rate_range": "6.8% - 8.6%",
      "repayment_tenure": "5 to 30 years",
      "last_updated": "2026-02-25"
    }
  ]
}
```

---

### 3. Filter Schemes (Main Endpoint)
Filters schemes based on user criteria and returns ranked results.

**Request:**
```http
POST /api/filter-schemes
Content-Type: application/json

{
  "age": 28,
  "income": 500000,
  "purpose": "Home Loans",
  "loanAmount": 2000000,
  "bank": "Axis Bank",
  "limit": 10
}
```

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `age` | number | optional | User age (18-100) |
| `income` | number | optional | Annual income (rupees) |
| `purpose` | string | optional | Category or tag (e.g., "Home Loans", "Single Child") |
| `loanAmount` | number | optional | Required loan amount (rupees) |
| `bank` | string | optional | Bank name filter |
| `limit` | number | optional | Max results (default: 10) |

**Response (200 OK):**
```json
{
  "success": true,
  "criteria": {
    "age": 28,
    "income": 500000,
    "loanAmount": 2000000,
    "purpose": "Home Loans",
    "bank": "Axis Bank"
  },
  "totalSchemes": 48,
  "matchedSchemes": 2,
  "schemes": [
    {
      "id": "axis_home_1",
      "bank_name": "Axis Bank",
      "scheme_category": "Home Loans",
      "scheme_name": "Axis Home Loan",
      "matchScore": 95
    }
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Age must be between 18 and 100"
}
```

---

## Category Values
The API supports these categories:

- Education Loans
- Home Loans
- Personal Loans
- MSME / Business Loans
- Agriculture Loans
- Government-backed schemes
- Fixed Deposits
- Savings Accounts
- Single Child (tag-based)
- Girl Child (tag-based)

---

## Notes

- Tag-based categories (Single Child, Girl Child) are matched against `scheme_tags` in data.
- All data is served from `server/data/bank_schemes.json`.
- Use URL encoding when calling `/api/schemes/:bankId`.
Compare 2-5 schemes side by side.

**Request:**
```http
POST /api/compare
Content-Type: application/json

{
  "schemeIds": ["sbi_home_1", "hdfc_home_1", "icici_home_1"]
}
```

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `schemeIds` | array | ✓ | Array of scheme IDs (2-5 schemes) |

**Response (200 OK):**
```json
{
  "success": true,
  "comparisonCount": 3,
  "schemes": [
    {
      "id": "sbi_home_1",
      "bank_name": "State Bank of India (SBI)",
      "scheme_name": "SBI Home Loan - Priority Lending Scheme",
      "interest_rate_range": "6.5% - 8.5%",
      // ... other details
    },
    {
      "id": "hdfc_home_1",
      "bank_name": "HDFC Bank",
      "scheme_name": "HDFC Home Loan - Flexipay",
      "interest_rate_range": "6.75% - 8.50%",
      // ... other details
    },
    {
      "id": "icici_home_1",
      "bank_name": "ICICI Bank",
      "scheme_name": "ICICI Home Loan",
      // ... other details
    }
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Cannot compare more than 5 schemes at once",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

## Data Structure

### Scheme Object
```json
{
  "id": "sbi_education_1",
  "bank_name": "State Bank of India (SBI)",
  "scheme_category": "Education Loans",
  "scheme_name": "SBI Education Loan for Higher Education",
  "description": "Affordable education loans for pursuing higher education in India and abroad",
  "target_audience": "Students pursuing graduation, post-graduation, professional courses",
  "minimum_income_required": "No minimum income required",
  "minimum_age": 18,
  "maximum_age": 35,
  "loan_amount_min": "₹50,000",
  "loan_amount_max": "₹1,50,00,000",
  "interest_rate_range": "7.5% - 9.5%",
  "processing_fee": "₹0 to ₹1000",
  "repayment_tenure": "3 months to 15 years",
  "collateral_required": "No collateral for loans up to ₹7.5 lakh",
  "key_features": [
    "Covers full education cost",
    "Flexible repayment options",
    "Moratorium period after course completion"
  ],
  "required_documents": [
    "Completed application form",
    "Proof of identity and address",
    "Bank account statement (6 months)"
  ],
  "eligibility_criteria": [
    "Indian citizen or NRI",
    "Age between 18-35 years",
    "Admission to recognized institution"
  ],
  "pros": [
    "No collateral for loans up to ₹7.5 lakh",
    "Competitive interest rates"
  ],
  "cons": [
    "Requires guarantor for higher loan amounts",
    "Processing takes 7-10 working days"
  ],
  "official_website_reference": "www.sbi.co.in/education-loans",
  "last_updated": "2026-02-25"
}
```

---

## Common Use Cases

### 1. Find Best Home Loan for 30-Year-Old with ₹8 LPA Income
```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 800000,
    "purpose": "Home Loans",
    "loanAmount": 2000000,
    "limit": 5
  }'
```

### 2. Find Education Loans Without Collateral
```bash
curl -X GET "http://localhost:5000/api/schemes?category=Education%20Loans&limit=10"
```

### 3. Compare MSME Loans from Multiple Banks
```bash
curl -X POST http://localhost:5000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "schemeIds": ["sbi_msme_1", "hdfc_msme_1", "icici_msme_1"]
  }'
```

### 4. List All Available Bank Options
```bash
curl -X GET http://localhost:5000/api/banks
```

---

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "error": "Description of the error",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

### Common Status Codes:
- **200 OK**: Successful request
- **400 Bad Request**: Invalid input parameters
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

---

## Best Practices

1. **Validation**: Always validate input parameters before sending requests
2. **Pagination**: Use `limit` parameter to avoid large response payloads
3. **Caching**: Cache responses locally to reduce API calls
4. **Error Handling**: Implement proper error handling for all API calls
5. **Rate Limiting**: Consider implementing rate limiting on the client side

---

## Implementation Examples

### JavaScript/Node.js
```javascript
const fetchSchemes = async (criteria) => {
  try {
    const response = await fetch('http://localhost:5000/api/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(criteria)
    });
    
    const data = await response.json();
    if (data.success) {
      console.log('Matched Schemes:', data.schemes);
    } else {
      console.error('Error:', data.error);
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
};
```

### Python
```python
import requests
import json

criteria = {
    "age": 28,
    "income": 500000,
    "purpose": "Home Loans",
    "loanAmount": 2000000,
    "limit": 10
}

response = requests.post(
    'http://localhost:5000/api/filter',
    json=criteria
)

data = response.json()
if data.get('success'):
    print(f"Found {data.get('matchedSchemes')} schemes")
    for scheme in data.get('schemes', []):
        print(f"- {scheme['scheme_name']}")
else:
    print(f"Error: {data.get('error')}")
```

---

## Support & Updates

- **Last Updated**: February 25, 2026
- **Database Version**: 1.0
- **Total Schemes**: 45+ across 8 major banks

For updates and support, please refer to the official channels or documentation.
