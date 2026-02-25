# Banking Scheme Guidance System - API Documentation

## Overview
This API provides comprehensive banking scheme information for Indian users. It includes filtering, comparison, and detailed scheme information across multiple major Indian banks.

## Base URL
```
http://localhost:5000/api
```

---

## Endpoints

### 1. Health Check
Check if the server is running and healthy.

**Request:**
```http
GET /api/health
```

**Response (200 OK):**
```json
{
  "status": "OK",
  "message": "Server is running",
  "timestamp": "2026-02-25T10:30:00.000Z",
  "environment": "development"
}
```

---

### 2. Get All Schemes
Retrieve all banking schemes with optional filtering.

**Request:**
```http
GET /api/schemes?category=Education Loans&bank=SBI&limit=10
```

**Query Parameters:**
- `category` (optional): Filter by scheme category (e.g., "Education Loans", "Home Loans")
- `bank` (optional): Filter by bank name (e.g., "SBI", "HDFC Bank")
- `limit` (optional): Maximum results to return (default: 50, max: 100)

**Response (200 OK):**
```json
{
  "success": true,
  "total": 45,
  "filtered": 3,
  "returned": 3,
  "schemes": [
    {
      "id": "sbi_education_1",
      "bank_name": "State Bank of India (SBI)",
      "scheme_category": "Education Loans",
      "scheme_name": "SBI Education Loan for Higher Education",
      "description": "Affordable education loans for pursuing higher education...",
      "target_audience": "Students pursuing graduation, post-graduation...",
      "minimum_income_required": "No minimum income required",
      "minimum_age": 18,
      "maximum_age": 35,
      "loan_amount_min": "₹50,000",
      "loan_amount_max": "₹1,50,00,000",
      "interest_rate_range": "7.5% - 9.5%",
      "processing_fee": "₹0 to ₹1000",
      "repayment_tenure": "3 months to 15 years",
      "collateral_required": "No collateral for loans up to ₹7.5 lakh",
      "key_features": [...],
      "required_documents": [...],
      "eligibility_criteria": [...],
      "pros": [...],
      "cons": [...],
      "official_website_reference": "www.sbi.co.in/education-loans",
      "last_updated": "2026-02-25"
    }
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

**Error Response (500):**
```json
{
  "success": false,
  "error": "Failed to fetch schemes",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 3. Get Scheme by ID
Retrieve detailed information about a specific scheme.

**Request:**
```http
GET /api/schemes/sbi_education_1
```

**Response (200 OK):**
```json
{
  "success": true,
  "scheme": {
    "id": "sbi_education_1",
    "bank_name": "State Bank of India (SBI)",
    "scheme_category": "Education Loans",
    // ... full scheme details
  },
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Scheme not found",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 4. Get All Banks
Retrieve list of all banks with their schemes.

**Request:**
```http
GET /api/banks
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 8,
  "banks": [
    "Axis Bank",
    "Bank of Baroda",
    "Canara Bank",
    "HDFC Bank",
    "ICICI Bank",
    "Punjab National Bank (PNB)",
    "State Bank of India (SBI)",
    "Union Bank of India"
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 5. Get All Categories
Retrieve all available loan categories.

**Request:**
```http
GET /api/categories
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 8,
  "categories": [
    "Agriculture Loans",
    "Education Loans",
    "Fixed Deposits",
    "Government-backed schemes",
    "Home Loans",
    "MSME / Business Loans",
    "Personal Loans",
    "Savings Accounts"
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 6. Filter Schemes (Main Filtering Endpoint) ⭐
Filter schemes based on user eligibility criteria and preferences.

**Request:**
```http
POST /api/filter
Content-Type: application/json

{
  "age": 28,
  "income": 500000,
  "purpose": "Home Loans",
  "loanAmount": 2000000,
  "bank": "SBI",
  "limit": 10
}
```

**Request Body Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `age` | number | ✓ | User's age (18-100) |
| `income` | number | ✓ | Annual income in rupees |
| `purpose` | string | ✓ | Loan purpose/category (e.g., "Home Loans", "Personal Loans") |
| `loanAmount` | number | ✗ | Required loan amount in rupees |
| `bank` | string | ✗ | Specific bank name to filter (optional) |
| `limit` | number | ✗ | Maximum results (default: 10, max: 50) |

**Response (200 OK):**
```json
{
  "success": true,
  "criteria": {
    "age": 28,
    "income": 500000,
    "loanAmount": 2000000,
    "purpose": "Home Loans",
    "bank": "SBI"
  },
  "totalSchemes": 45,
  "matchedSchemes": 2,
  "schemes": [
    {
      "id": "sbi_home_1",
      "bank_name": "State Bank of India (SBI)",
      "scheme_category": "Home Loans",
      "scheme_name": "SBI Home Loan - Priority Lending Scheme",
      "matchScore": 95,
      // ... other scheme details
    },
    {
      "id": "sbi_home_2",
      "bank_name": "State Bank of India (SBI)",
      "scheme_category": "Home Loans",
      "matchScore": 87,
      // ... other scheme details
    }
  ],
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Valid age (18-100) is required",
  "timestamp": "2026-02-25T10:30:00.000Z"
}
```

---

### 7. Compare Schemes
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
