# Banking Scheme Guidance System

A rule-based web application that helps users discover relevant Indian bank schemes based on eligibility criteria. It uses a structured JSON data source and Next.js API routes for filtering.

## Features

- Multiple Indian banks and government-backed schemes
- Rule-based filtering (no AI/ML)
- Quick Filter flow for fast scheme discovery
- Bank-wise browsing flow for detailed exploration
- Responsive UI with clear, consistent styling

## Tech Stack

- **Frontend**: Next.js (React)
- **API**: Next.js API routes (`pages/api`)
- **Styling**: CSS Modules
- **Data**: JSON file (`server/data/bank_schemes.json`)

## Getting Started

### Installation

```bash
npm install
```

### Run the App

```bash
npm run dev
```

### Access

- App: http://localhost:3000
- API: http://localhost:3000/api

## Main Pages

- `/` Home
- `/quick-filter` Quick scheme search
- `/select-bank` Choose a bank and browse
- `/schemes/[bankId]` Bank-specific schemes
- `/scheme-details` Detailed scheme view

## Categories

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

## Data Source

All schemes are stored in `server/data/bank_schemes.json`. Each entry includes:

- Bank and scheme name
- Category and tags
- Eligibility rules
- Interest rate range
- Documents and benefits

## Notes

- Rule-based system only; no AI or ML.
- Data is for informational/demo use.
- No personal data is stored.

## Contributors

- **Sneha Mishra** - Developer
- **Saloni** - Team Lead

## Disclaimer

This application is for educational and demonstration purposes only. Always verify details with the official bank or government source.

