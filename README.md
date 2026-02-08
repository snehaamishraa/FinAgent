# Banking Scheme Guidance System

A rule-based web application that helps users discover relevant bank schemes based on their eligibility criteria.

## Features

- 🏦 Multiple bank scheme databases
- 🎯 Rule-based filtering (no AI/ML)
- 🎨 Neon-themed modern UI
- 📱 Fully responsive design
- ♿ Accessible and beginner-friendly

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Node.js + Express
- **Styling**: Custom CSS with neon theme

## Getting Started

### Installation

```bash
npm install
```

### Running the Application

**Option 1: Run both frontend and backend together**
```bash
npm run dev:all
```

**Option 2: Run separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### Access

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
├── pages/              # Next.js pages
├── components/         # React components
├── styles/            # CSS styles
├── server/            # Express backend
│   ├── index.js       # Server entry
│   └── data/          # Scheme data
└── public/            # Static assets
```

## Important Notes

- This is a **rule-based system only** - no AI, ML, or LLMs used
- Schemes and data are **dummy/demo data** for educational purposes
- Results are **informational only** and not actual banking advice
- No personal data is stored

## Disclaimer

This application is for **educational and demonstration purposes only**. All bank names and schemes are fictional. Always consult with actual banks for real financial products and services.
