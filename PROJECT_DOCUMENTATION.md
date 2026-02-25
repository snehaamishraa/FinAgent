# Banking Scheme Guidance System - Complete Documentation

## Table of Contents

1. Project Overview
2. Goals and Non-Goals
3. User Flows
4. Page-by-Page Guide
5. Data Model
6. Categories and Tags
7. API Reference (Next.js API)
8. Filtering and Ranking Logic
9. Error Handling and Edge Cases
10. Local Development
11. Deployment (Vercel)
12. Testing and Verification
13. Troubleshooting
14. Glossary

---

## 1. Project Overview

The Banking Scheme Guidance System is a rule-based web app that helps users discover relevant Indian bank schemes. It provides two main experiences:

- Quick filtering across all banks using a short form.
- Bank-wise browsing with detailed scheme cards and deep details.

All data is stored in a structured JSON file and served through Next.js API routes.

---

## 2. Goals and Non-Goals

### Goals
- Provide a single place to discover schemes across major banks.
- Keep filtering simple and explainable (rule-based, no ML).
- Use easy language and clearly structured documentation.
- Support categories like Single Child and Girl Child as tag-based filters.

### Non-Goals
- No account creation or user data storage.
- No real-time or authoritative eligibility validation.
- No automatic submission to bank portals.

---

## 3. User Flows

### Flow A: Quick Filter
1. User opens `/quick-filter`.
2. Enters age and annual income.
3. Chooses a category (including Single Child or Girl Child).
4. Optional loan amount.
5. App calls `/api/filter-schemes` and returns ranked schemes.

### Flow B: Bank-wise Browse
1. User opens `/select-bank` and chooses a bank.
2. App navigates to `/schemes/[bankId]`.
3. User browses all schemes for that bank.
4. Clicking a scheme opens detailed view (`/scheme-details`).

---

## 4. Page-by-Page Guide

### `/` (Home)
- Main call to action for Quick Filter.
- Secondary action for bank-wise browsing.

### `/quick-filter`
- Short form with age, income, category, and optional loan amount.
- Displays ranked results with match score.

### `/select-bank`
- Shows a list of banks from `/api/banks`.
- Lets the user pick a bank to browse.

### `/schemes/[bankId]`
- Lists all schemes for a selected bank.
- Uses `/api/schemes/[bankId]`.

### `/scheme-details`
- Shows full details of a selected scheme.
- Includes eligibility, documents, and bank contact info.

### `/filter` and `/results`
- Legacy flow with a longer form. These pages remain for compatibility but the Quick Filter is recommended.

---

## 5. Data Model

The data is stored in:

```
server/data/bank_schemes.json
```

Each scheme includes these fields:

- `id`
- `bank_name`
- `scheme_category`
- `scheme_name`
- `description`
- `target_audience`
- `minimum_age`, `maximum_age`
- `minimum_income_required`
- `loan_amount_min`, `loan_amount_max`
- `interest_rate_range`
- `processing_fee`
- `repayment_tenure`
- `collateral_required`
- `key_features[]`
- `required_documents[]`
- `eligibility_criteria[]`
- `pros[]`
- `cons[]`
- `official_website_reference`
- `last_updated`
- `scheme_tags[]` (optional)

---

## 6. Categories and Tags

### Primary Categories
- Education Loans
- Home Loans
- Personal Loans
- MSME / Business Loans
- Agriculture Loans
- Government-backed schemes
- Fixed Deposits
- Savings Accounts

### Tag-Based Categories
These are matched via `scheme_tags`:
- Single Child
- Girl Child

If a user selects one of these, the filter searches for schemes with matching tags.

---

## 7. API Reference (Next.js API)

### Base URL
```
http://localhost:3000/api
```

### GET /api/banks
Returns a list of banks available in the dataset.

### GET /api/schemes/[bankId]
Returns all schemes for a specific bank.
- Use URL encoding for names with spaces.

### POST /api/filter-schemes
Filters and ranks schemes by criteria.

Example:
```json
{
  "age": 28,
  "income": 500000,
  "purpose": "Home Loans",
  "loanAmount": 2000000,
  "bank": "Axis Bank",
  "limit": 10
}
```

---

## 8. Filtering and Ranking Logic

The filter API applies these checks:

- Age: must be inside min/max age if provided.
- Income: must meet minimum income if defined.
- Loan Amount: must fit within scheme min/max if provided.
- Category: must match scheme category.
- Tag category: if user selects Single Child or Girl Child, scheme must have matching tag.

Ranking uses a simple score:
- Base score of 50.
- +30 if category matches.
- +15 if age is near the mid-range.
- +5 if income is comfortably above minimum.

---

## 9. Error Handling and Edge Cases

- Invalid age returns 400 from `/api/filter-schemes`.
- Missing data file returns a 404 response.
- Bank names are URL-encoded to prevent routing errors.
- Empty result set shows a friendly message.

---

## 10. Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open:
   - http://localhost:3000

---

## 11. Deployment (Vercel)

- The app deploys from the `main` branch.
- API routes run inside the same Next.js deployment.
- Ensure `server/data/bank_schemes.json` is committed.

---

## 12. Testing and Verification

Manual checks:

- Open `/quick-filter` and run a search.
- Open `/select-bank` and click a bank.
- Confirm `/schemes/[bankId]` lists items.
- Open a scheme and view details.

---

## 13. Troubleshooting

- If a page shows an application error, check the browser console.
- If an API request fails, inspect Network tab for status codes.
- Use a hard refresh after a new deployment.

---

## 14. Glossary

- Scheme: A financial product or policy offered by a bank or government.
- Category: Primary classification for a scheme (e.g., Home Loans).
- Tag: Secondary label used for filters like Single Child or Girl Child.
- Quick Filter: Short form that returns ranked results across banks.
