# Banking Scheme Guidance System

> A comprehensive rule-based web application designed to help Indian citizens discover and compare relevant banking and government schemes based on their specific eligibility criteria.

[![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)](https://banking-scheme-guidance-system.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Available Schemes](#available-schemes)
- [User Flows](#user-flows)
- [Data Schema](#data-schema)
- [Development](#development)
- [Deployment](#deployment)
- [Contributors](#contributors)
- [Disclaimer](#disclaimer)

## 📌 Overview

The Banking Scheme Guidance System is an intelligent information aggregator that provides personalized banking scheme recommendations based on user eligibility. Rather than using AI/ML algorithms, the system employs a transparent, rule-based approach to match users with appropriate financial products.

**Key Objectives:**
- Simplify scheme discovery for end users
- Provide instant, accurate recommendations
- Ensure complete privacy with zero data storage
- Offer multi-channel access (Quick Filter, Bank-wise, Category-based)

## ✨ Key Features

### 1. **Multiple Discovery Paths**
   - **Quick Filter**: Fast eligibility-based search with minimal input
   - **Bank Selection**: Browse schemes directly from your preferred bank
   - **Category Browse**: Explore all schemes in a specific category

### 2. **Comprehensive Scheme Coverage**
   - 22 schemes across 9 major Indian banks
   - 8 distinct financial categories
   - Government-backed and private sector products
   - Complete eligibility and documentation requirements

### 3. **Rule-Based Intelligence**
   - Non-arbitrary filtering based on explicit eligibility rules
   - No black-box AI decisions
   - Transparent matching criteria
   - Consistent results for same inputs

### 4. **Professional UI/UX**
   - Responsive design (Mobile, Tablet, Desktop)
   - Neon-themed dark interface
   - Intuitive navigation flows
   - Clear scheme comparison cards
   - Accessibility-first approach

### 5. **Privacy-First Design**
   - No personal data collection
   - No database storage of user information
   - Client-side data processing where applicable
   - No tracking or analytics cookies

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14.x (React 18.x)
- **Styling**: CSS Modules with responsive design
- **Routing**: Next.js Pages Router
- **State Management**: React Hooks (useState, useEffect)

### Backend & API
- **Server**: Next.js API Routes (Serverless)
- **Data Storage**: JSON file (`server/data/bank_schemes.json`)
- **Caching**: In-memory scheme cache with file system read

### Deployment & DevOps
- **Hosting**: Vercel (Production)
- **Version Control**: GitHub
- **Build Tool**: Next.js built-in compiler
- **Node.js**: 18.x runtime

### Data Format
- **Primary Storage**: JSON
- **Data Validation**: Runtime JSON parsing with error handling

## 📁 Project Structure

```
BANKSCHEMEFINDER/
├── pages/
│   ├── _app.js                 # Next.js App wrapper
│   ├── index.js                # Home page with category browse
│   ├── quick-filter.js         # Quick filter form page
│   ├── select-bank.js          # Bank/category selection
│   ├── results.js              # Filter results display
│   ├── scheme-details.js       # Individual scheme details
│   ├── about.js                # About page
│   ├── schemes/
│   │   └── [bankId].js         # Bank-specific schemes list
│   └── api/
│       ├── banks.js            # GET: List all banks
│       ├── filter-schemes.js   # POST: Filter schemes | GET: Get all schemes
│       └── schemes/
│           └── [bankId].js     # GET: Schemes by bank ID
│
├── styles/
│   ├── globals.css             # Global styles
│   ├── Home.module.css         # Home page styles
│   ├── Filter.module.css       # Filter page styles
│   ├── Results.module.css      # Results page styles
│   ├── SchemeDetails.module.css # Scheme details styles
│   └── SelectBank.module.css   # Bank selection styles
│
├── server/
│   └── data/
│       └── bank_schemes.json   # Master data file (22 schemes)
│
├── public/
│   └── favicon.ico             # Application icon
│
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── README.md                   # This file
└── .gitignore                  # Git ignore rules
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.x or higher
- **npm**: v8.0 or higher
- **Git**: For version control

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/snehaamishraa/Banking-Scheme-Guidance-System.git
   cd BANKSCHEMEFINDER
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Verify Data Integrity**
   ```bash
   npm run validate:json
   ```
   Expected output: `✓ JSON is valid`

### Running Locally

**Development Mode:**
```bash
npm run dev
```
Access at: `http://localhost:3000`

**Production Build:**
```bash
npm run build
npm start
```

### Verify Installation

1. Open `http://localhost:3000` in your browser
2. You should see the home page with:
   - "Browse by Category" section with 8 categories
   - Quick Filter CTA button
   - Browse by Bank button
3. Click any category to verify routing works

## 📡 API Documentation

### Available Endpoints

#### 1. Get All Banks
```http
GET /api/banks
```

**Response:**
```json
{
  "success": true,
  "banks": ["SBI", "HDFC Bank", "ICICI Bank", ...],
  "count": 9,
  "timestamp": "2026-02-27T10:30:00.000Z"
}
```

#### 2. Get All Schemes
```http
GET /api/filter-schemes
```

**Response:**
```json
{
  "success": true,
  "totalSchemes": 22,
  "schemes": [
    {
      "id": "sbi_education_001",
      "bank_name": "State Bank of India",
      "scheme_name": "SBI Education Loan",
      "scheme_category": "Education Loans",
      "loan_amount_min": "50000",
      "loan_amount_max": "20000000",
      ...
    }
  ]
}
```

#### 3. Filter Schemes by Category
```http
POST /api/filter-schemes
Content-Type: application/json

{
  "category": "Education Loans"
}
```

**Response:**
```json
{
  "success": true,
  "matchedSchemes": 3,
  "schemes": [...]
}
```

#### 4. Filter Schemes by Criteria
```http
POST /api/filter-schemes
Content-Type: application/json

{
  "age": 28,
  "income": 600000,
  "category": "Home Loans",
  "monthlyIncome": 50000,
  "occupation": "Salaried"
}
```

#### 5. Get Schemes by Bank ID
```http
GET /api/schemes/[bankId]
```

Example: `/api/schemes/SBI`

**Response:**
```json
{
  "success": true,
  "bank": "State Bank of India",
  "schemes": [...]
}
```

## 💰 Available Schemes

### Coverage Summary
- **Total Banks**: 9 (Government & Private)
- **Total Schemes**: 22
- **Categories**: 8

### Scheme Categories

| Icon | Category | Schemes | Description |
|------|----------|---------|-------------|
| 📚 | Education Loans | 3 | Student loans for higher education |
| 🏠 | Home Loans | 3 | Residential property financing |
| 💰 | Personal Loans | 2 | Unsecured personal credit |
| 🏢 | Business Loans | 3 | MSME and entrepreneurship funding |
| 🌾 | Agriculture Loans | 2 | Farming and agricultural credit |
| 🏛️ | Government Schemes | 3 | Government-backed financial products |
| 💎 | Fixed Deposits | 3 | Investment and savings products |
| 💳 | Savings Accounts | 3 | Deposit and savings accounts |

## 🔄 User Flows

### Flow 1: Quick Filter (Recommended)
```
Home Page 
  ↓
Quick Filter Form (Age, Income, Purpose)
  ↓
Results Page (Matched Schemes)
  ↓
Scheme Details (Full Information)
```

### Flow 2: Bank-wise Browse
```
Home Page
  ↓
Select Bank Page
  ↓
Bank Schemes List
  ↓
Scheme Details (Optional)
```

### Flow 3: Category Browse
```
Home Page → Click Category
  ↓
Select Bank Page (Auto-redirect to Category Mode)
  ↓
Category Results Page
  ↓
Scheme Details (Optional)
```

## 📊 Data Schema

### Scheme Object Structure
```javascript
{
  "id": "unique_scheme_id",
  "bank_name": "Bank Name",
  "scheme_name": "Scheme Name",
  "scheme_category": "Category Name",
  "tags": ["tag1", "tag2"],           // Optional eligibility tags
  "description": "Scheme description",
  "minimum_age": 18,
  "maximum_age": 60,
  "loan_amount_min": "50000",
  "loan_amount_max": "10000000",
  "interest_rate_range": "5.0-12.5%",
  "processing_fee": "0-1% of loan amount",
  "tenure": "5-20 years",
  "eligibility": [
    "Indian citizen",
    "Employed/Self-employed",
    "Credit score: 650+"
  ],
  "required_documents": [
    "ID Proof",
    "Income Proof",
    "Bank Statements"
  ],
  "key_benefits": [
    "Flexible tenure",
    "Quick approval"
  ],
  "bankContact": "Toll Free: 1800-XXXXXX",
  "website": "https://bank.com/scheme"
}
```

## 🛠 Development

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Validate JSON data
npm run validate:json

# View scheme statistics
npm run lint:schemes

# Backup data
npm run backup

# Health check (requires server running on port 5000)
npm run health
```

### Code Quality Standards
- **Naming**: camelCase for variables/functions, PascalCase for components
- **Styling**: CSS Modules for component isolation
- **Error Handling**: Try-catch blocks for API routes
- **Performance**: In-memory caching for JSON data

### Adding New Schemes
1. Open `server/data/bank_schemes.json`
2. Add new scheme object following the data schema
3. Run `npm run validate:json` to verify
4. Commit and push changes

## 🌐 Deployment

### Vercel Deployment (Current)
The application is deployed on Vercel with automatic deployments on every push to the main branch.

**Deployment URL:** https://banking-scheme-guidance-system.vercel.app

**Deployment Configuration:**
- **Framework**: Next.js
- **Node Version**: 18.x
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Manual Vercel Deployment
```bash
# Login to Vercel
npx vercel login

# Deploy to production
npx vercel --prod

# Check deployment status
npx vercel ls
```

### Environment Variables
Currently no environment variables required. All configuration is hardcoded for simplicity.

## 👥 Contributors

- **Sneha Mishra** - Team Lead, Full Stack Development
- **Saloni** - Team Member

## 📝 Notes

- **Rule-Based System**: All filtering uses explicit, transparent rules—no machine learning involved
- **Data Source**: Schemes sourced from official bank websites and government financial portals
- **Information Accuracy**: Recommendations based on provided eligibility criteria only
- **Privacy**: Zero personal data collection, storage, or processing
- **Updates**: Scheme data should be updated quarterly for accuracy

## ⚠️ Disclaimer

**IMPORTANT**: This application is provided **for educational and informational purposes only**. It is not an official service of any bank or government entity.

**Key Disclaimers:**
1. Scheme details are based on publicly available information and may not be entirely accurate
2. Always verify directly with official bank sources before applying
3. Eligibility decisions are made solely by the financial institutions
4. Interest rates, terms, and conditions may change without notice
5. This system provides recommendations only; it does not guarantee scheme approval
6. Users are responsible for their financial decisions

**For Official Information:**
- Contact your nearest bank branch
- Visit official bank websites
- Call bank toll-free numbers
- Visit government financial portals

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Support & Feedback

For issues, feature requests, or feedback:
- GitHub Issues: [Banking-Scheme-Guidance-System Issues](https://github.com/snehaamishraa/Banking-Scheme-Guidance-System/issues)
- Email: developer contact (if applicable)

---

**Last Updated**: February 27, 2026  
**Version**: 1.0.0

