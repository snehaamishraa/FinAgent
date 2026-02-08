
# 🏦 Banking Scheme Guidance System - Complete Documentation

**Project Name:** Banking Scheme Guidance Web Application  
**Tech Stack:** Next.js (React) + Node.js (Express) + JSON Database  
**Purpose:** Educational tool to help users find suitable banking schemes based on their eligibility

---

## 📑 Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack Explained](#tech-stack-explained)
3. [Project Structure](#project-structure)
4. [Complete File Breakdown](#complete-file-breakdown)
5. [Data Flow & Architecture](#data-flow--architecture)
6. [Code Explanation - Frontend](#code-explanation---frontend)
7. [Code Explanation - Backend](#code-explanation---backend)
8. [Styling System](#styling-system)
9. [Features Implementation](#features-implementation)
10. [Setup & Installation](#setup--installation)
11. [Interview Questions & Answers](#interview-questions--answers)

---

## 1. Project Overview

### What Problem Does This Solve?

Indian citizens ke liye banking schemes ki information scattered aur confusing hoti hai. Different banks ki websites complex hain aur schemes compare karna mushkil hai. Humara system ek centralized platform provide karta hai jaha users:

- Apne eligibility criteria enter kar sakte hain
- Instantly suitable schemes dekh sakte hain
- Complete application process guide mil jata hai
- Bank contact details ek jagah milte hain

### Key Features

✅ **5 Major Indian Banks** - SBI, PNB, HDFC, ICICI, Axis  
✅ **30 Real Banking Schemes** - 6 per bank  
✅ **Rule-Based Filtering** - No AI/ML, pure if-else logic  
✅ **Privacy-Focused** - No data storage, no tracking  
✅ **Complete Guide** - Documents, process, contact details  
✅ **Responsive Design** - Mobile, tablet, desktop  
✅ **Neon Theme UI** - Modern dark theme with gradient effects

---

## 2. Tech Stack Explained

### Frontend Technologies

#### **Next.js 14.1.0**
- **Kya hai:** React-based framework for building web applications
- **Kyu use kiya:**
  - Built-in routing system (no need for React Router)
  - Fast page loads with automatic code splitting
  - SEO-friendly with SSR capabilities
  - File-based routing makes code organization easy
  - Production-ready out of the box

**Example:**
```javascript
// pages/index.js automatically becomes route "/"
// pages/about.js automatically becomes route "/about"
// pages/schemes/[bankId].js becomes dynamic route "/schemes/SBI"
```

#### **React 18.2.0**
- **Kya hai:** JavaScript library for building user interfaces
- **Kyu use kiya:**
  - Component-based architecture (reusable code)
  - Virtual DOM for fast rendering
  - Hooks for state management (useState, useEffect)
  - Large community and ecosystem

**Example:**
```javascript
// Component with state
const [loading, setLoading] = useState(true);

// Effect hook for API calls
useEffect(() => {
  fetchData();
}, []);
```

#### **CSS Modules**
- **Kya hai:** CSS files where classes are scoped to specific components
- **Kyu use kiya:**
  - No class name conflicts between components
  - Better code organization
  - Automatic unique class names
  - No need for CSS-in-JS libraries

**Example:**
```javascript
import styles from './Home.module.css';
<div className={styles.container}>  // Becomes: Home_container__x3k2l
```

### Backend Technologies

#### **Express.js 4.18.2**
- **Kya hai:** Minimal and flexible Node.js web application framework
- **Kyu use kiya:**
  - Easy to create REST APIs
  - Middleware support (CORS, JSON parsing)
  - Lightweight and fast
  - Industry standard for Node.js backends

**Example:**
```javascript
app.get('/api/banks', (req, res) => {
  res.json({ banks: ['SBI', 'PNB', 'HDFC_Bank'] });
});
```

#### **CORS (Cross-Origin Resource Sharing)**
- **Kya hai:** Middleware that allows frontend (port 3000) to call backend (port 5000)
- **Kyu zaroori hai:** Browsers block cross-origin requests by default for security

**Example:**
```javascript
const cors = require('cors');
app.use(cors());  // Now frontend can access backend
```

#### **JSON File Database**
- **Kya hai:** Simple file-based data storage
- **Kyu use kiya:**
  - No database setup needed
  - Fast for read operations
  - Easy to understand and modify
  - Perfect for static data (30 schemes)
  - No user data to store

---

## 3. Project Structure

```
AGENTIC AI BANK/
│
├── pages/                                  # Next.js Pages (Each file = One Route)
│   ├── _app.js                             # App wrapper (global setup)
│   ├── index.js                            # Home page - Route: /
│   ├── select-bank.js                      # Bank selection - Route: /select-bank
│   ├── schemes/
│   │   └── [bankId].js                     # Dynamic route - Route: /schemes/SBI
│   ├── filter.js                           # Eligibility form - Route: /filter
│   ├── results.js                          # Filtered results - Route: /results
│   ├── scheme-details.js                   # Complete guide - Route: /scheme-details
│   └── about.js                            # About page - Route: /about
│
├── styles/                                 # CSS Styling Files
│   ├── globals.css                         # Global styles + CSS variables
│   ├── Home.module.css                     # Home page specific styles
│   ├── SelectBank.module.css               # Bank selection styles
│   ├── Schemes.module.css                  # Scheme list styles
│   ├── Filter.module.css                   # Form styles
│   ├── Results.module.css                  # Results page styles
│   ├── SchemeDetails.module.css            # Detail page styles
│   └── About.module.css                    # About page styles
│
├── server/                                 # Backend Server
│   ├── index.js                            # Express server + API endpoints
│   └── data/
│       └── schemes.json                    # All banking schemes data (30 schemes)
│
├── public/                                 # Static assets (images, icons)
│
├── package.json                            # Project dependencies
├── package-lock.json                       # Locked versions of dependencies
├── next.config.js                          # Next.js configuration
└── README.md                               # Project description
```

### File Count Summary
- **7 Page Files** = 7 Routes
- **8 CSS Files** = Styling
- **1 Backend File** = API Server
- **1 Data File** = 30 Schemes

---

## 4. Complete File Breakdown

### 📄 Frontend Files (pages/)

#### **1. `index.js` - Home Page**

**Route:** `http://localhost:3000/`

**Purpose:** Welcome screen with project introduction

**Key Sections:**
```javascript
// 1. Hero Section
<h1>Find the Perfect Banking Scheme</h1>
<p>Smart, rule-based guidance system...</p>

// 2. Feature Cards (3 cards)
- Personalized Results
- Instant Matching  
- No Data Storage

// 3. CTA Button
<Link href="/select-bank">
  <button>Explore Schemes →</button>
</Link>

// 4. Disclaimer
<p>Educational Purpose Only...</p>

// 5. Link to About Page
<Link href="/about">Learn More →</Link>

// 6. Footer
<p>Banking Scheme Guidance • Real Bank Data...</p>
```

**State Management:**
```javascript
// No state needed - static content
// Just navigation links
```

**API Calls:** None

**Styling:** `Home.module.css` - Neon gradient background, animated text

---

#### **2. `select-bank.js` - Bank Selection**

**Route:** `/select-bank`

**Purpose:** User selects which bank's schemes to explore

**Key Code:**
```javascript
// State Variables
const [banks, setBanks] = useState([]);        // List of banks
const [selectedBank, setSelectedBank] = useState('');  // User's selection
const [loading, setLoading] = useState(true);   // Loading indicator
const [error, setError] = useState('');         // Error message

// API Call - Fetch Banks
useEffect(() => {
  fetchBanks();
}, []);

const fetchBanks = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/banks');
    const data = await response.json();
    // Response: {"banks":["SBI","PNB","HDFC_Bank","ICICI_Bank","Axis_Bank"]}
    setBanks(data.banks);
    setLoading(false);
  } catch (err) {
    setError('Failed to load banks');
  }
};

// Handle Selection
const handleBankSelect = (bankId) => {
  setSelectedBank(bankId);  // Save selection
};

// Navigate to Schemes
const handleContinue = () => {
  if (selectedBank) {
    router.push(`/schemes/${selectedBank}`);  // Go to /schemes/SBI
  }
};

// Format Bank Names
const formatBankName = (bankId) => {
  const bankNames = {
    'SBI': 'State Bank of India (SBI)',
    'PNB': 'Punjab National Bank (PNB)',
    'HDFC_Bank': 'HDFC Bank',
    'ICICI_Bank': 'ICICI Bank',
    'Axis_Bank': 'Axis Bank'
  };
  return bankNames[bankId] || bankId.replace(/_/g, ' ');
};
```

**UI Elements:**
```javascript
// Bank Cards Grid
{banks.map((bank) => (
  <div 
    className={selectedBank === bank ? styles.selected : ''}
    onClick={() => handleBankSelect(bank)}
  >
    <div className={styles.bankIcon}>🏦</div>
    <h3>{formatBankName(bank)}</h3>
    {selectedBank === bank && <div>✓</div>}
  </div>
))}

// Continue Button
<button 
  onClick={handleContinue}
  disabled={!selectedBank}
>
  Continue to Schemes →
</button>
```

**Styling:** Grid layout, hover effects on cards, checkmark on selection

---

#### **3. `schemes/[bankId].js` - Scheme List**

**Route:** `/schemes/SBI` (dynamic route)

**Purpose:** Shows all schemes for selected bank

**Dynamic Routing Explained:**
```javascript
// File name: [bankId].js means "bankId" is a variable
// URL: /schemes/SBI  → bankId = "SBI"
// URL: /schemes/PNB  → bankId = "PNB"

// Access parameter:
const router = useRouter();
const { bankId } = router.query;  // Gets "SBI" from URL
```

**Key Code:**
```javascript
// State
const [schemes, setSchemes] = useState([]);
const [bankName, setBankName] = useState('');
const [loading, setLoading] = useState(true);

// Fetch Schemes When bankId Available
useEffect(() => {
  if (bankId) {
    fetchSchemes();
  }
}, [bankId]);  // Re-fetch if bankId changes

// API Call
const fetchSchemes = async () => {
  const response = await fetch(`http://localhost:5000/api/schemes/${bankId}`);
  const data = await response.json();
  // Response: {"bank":"SBI", "schemes":[{...}, {...}]}
  setSchemes(data.schemes);
  setBankName(formatBankName(data.bank));
};

// Click Handler - Open Details Page
const handleSchemeClick = (schemeId) => {
  router.push(`/scheme-details?schemeId=${schemeId}&bankId=${bankId}`);
};
```

**Scheme Card Display:**
```javascript
{schemes.map((scheme) => (
  <div 
    className={styles.schemeCard}
    onClick={() => handleSchemeClick(scheme.id)}
    role="button"  // Accessibility
  >
    {/* Header */}
    <h3>{scheme.name}</h3>
    <span className={styles.interest}>{scheme.interestRate}</span>
    
    {/* Description */}
    <p>{scheme.description}</p>
    
    {/* Target Group */}
    <div>🎯 Target Group: {scheme.targetGroup}</div>
    
    {/* Eligibility Summary */}
    <ul>
      <li>Age: {scheme.eligibility.minAge}+ years</li>
      <li>Gender: {scheme.eligibility.gender}</li>
      <li>Income: ₹{scheme.eligibility.minIncome?.toLocaleString()}</li>
    </ul>
    
    {/* Suitable For Tags */}
    <div className={styles.tags}>
      {scheme.suitableFor.map(goal => (
        <span>{goal}</span>
      ))}
    </div>
    
    {/* Benefits */}
    <ul>
      {scheme.benefits.slice(0, 3).map(benefit => (
        <li>{benefit}</li>
      ))}
    </ul>
    
    {/* Call to Action */}
    <div className={styles.viewDetailsButton}>
      Click for Complete Details & How to Apply →
    </div>
  </div>
))}
```

**Two Navigation Options:**
```javascript
// Option 1: Filter Schemes
<button onClick={() => router.push(`/filter?bank=${bankId}`)}>
  🎯 Find My Best Match
</button>

// Option 2: Click Individual Scheme Card
// Goes to scheme-details page
```

---

#### **4. `filter.js` - Eligibility Form**

**Route:** `/filter?bank=SBI`

**Purpose:** Collect user criteria for filtering schemes

**Form Fields:**
```javascript
// State for Each Field
const [age, setAge] = useState('');
const [gender, setGender] = useState('');
const [category, setCategory] = useState('');
const [monthlyIncome, setMonthlyIncome] = useState('');
const [occupation, setOccupation] = useState('');
const [savingsGoal, setSavingsGoal] = useState('');
```

**Complete Form Structure:**
```javascript
<form onSubmit={handleSubmit}>
  
  {/* Age Field */}
  <label>Your Age</label>
  <input 
    type="number" 
    value={age}
    onChange={(e) => setAge(e.target.value)}
    min="10"
    max="100"
    required
  />
  <div className={styles.helperText}>
    💡 Why we ask: Age determines eligibility for senior citizen, 
    student, or youth-specific schemes
  </div>
  
  {/* Gender Dropdown */}
  <label>Gender</label>
  <select value={gender} onChange={(e) => setGender(e.target.value)} required>
    <option value="">Select Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Any">Other/Prefer not to say</option>
  </select>
  <div className={styles.helperText}>
    💡 Why we ask: Some schemes are specifically designed for women 
    empowerment
  </div>
  
  {/* Category Dropdown */}
  <label>Category</label>
  <select value={category} onChange={(e) => setCategory(e.target.value)} required>
    <option value="">Select Category</option>
    <option value="General">General</option>
    <option value="SC">SC (Scheduled Caste)</option>
    <option value="ST">ST (Scheduled Tribe)</option>
    <option value="OBC">OBC (Other Backward Class)</option>
    <option value="Minority">Minority</option>
  </select>
  <div className={styles.helperText}>
    💡 Why we ask: Government offers special schemes for SC/ST/OBC/Minority 
    communities
  </div>
  
  {/* Monthly Income */}
  <label>Monthly Income (₹)</label>
  <input 
    type="number" 
    value={monthlyIncome}
    onChange={(e) => setMonthlyIncome(e.target.value)}
    min="0"
    placeholder="e.g., 50000"
    required
  />
  <div className={styles.helperText}>
    💡 Why we ask: Some schemes have income limits to target specific 
    economic groups
  </div>
  
  {/* Occupation Dropdown */}
  <label>Occupation</label>
  <select value={occupation} onChange={(e) => setOccupation(e.target.value)} required>
    <option value="">Select Occupation</option>
    <option value="Student">Student</option>
    <option value="Salaried">Salaried Employee</option>
    <option value="Business Owner">Business Owner</option>
    <option value="Self-Employed">Self-Employed</option>
    <option value="Farmer">Farmer</option>
    <option value="Agricultural Worker">Agricultural Worker</option>
    <option value="Retired">Retired</option>
    <option value="Homemaker">Homemaker</option>
    <option value="Unemployed">Unemployed</option>
  </select>
  <div className={styles.helperText}>
    💡 Why we ask: Schemes like Kisan accounts are for farmers, salary 
    accounts for employees
  </div>
  
  {/* Savings Goal Dropdown */}
  <label>Primary Savings Goal</label>
  <select value={savingsGoal} onChange={(e) => setSavingsGoal(e.target.value)} required>
    <option value="">Select Goal</option>
    <option value="Savings">General Savings</option>
    <option value="Retirement">Retirement Planning</option>
    <option value="Education">Education</option>
    <option value="Business">Business/Investment</option>
    <option value="Home">Home Purchase</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Agriculture">Agriculture</option>
    <option value="Government Schemes">Government Benefit Schemes</option>
  </select>
  <div className={styles.helperText}>
    💡 Why we ask: Helps us prioritize schemes that best match your 
    financial goals
  </div>
  
  {/* Submit Button */}
  <button type="submit">Find Matching Schemes 🔍</button>
  
</form>
```

**Form Submission:**
```javascript
const handleSubmit = (e) => {
  e.preventDefault();  // Prevent page reload
  
  // Create query parameters from form data
  const queryParams = new URLSearchParams({
    bank: bankId,
    age,
    gender,
    category,
    monthlyIncome,
    occupation,
    savingsGoal
  });
  
  // Navigate to results page with parameters
  router.push(`/results?${queryParams.toString()}`);
  // URL becomes: /results?bank=SBI&age=30&gender=Male&...
};
```

**Helper Text Benefits:**
- Transparency: User knows why each field is needed
- Education: Learns about scheme eligibility criteria
- Trust: No hidden data collection

---

#### **5. `results.js` - Filtered Results**

**Route:** `/results?bank=SBI&age=30&gender=Male&category=General&monthlyIncome=50000&occupation=Salaried&savingsGoal=Savings`

**Purpose:** Display schemes matching user criteria

**Reading URL Parameters:**
```javascript
const router = useRouter();
const { bank, age, gender, category, monthlyIncome, occupation, savingsGoal } = router.query;

// When page loads with URL query params, trigger filtering
useEffect(() => {
  if (bank && age && gender && category && monthlyIncome && occupation && savingsGoal) {
    filterSchemes();
  }
}, [bank, age, gender, category, monthlyIncome, occupation, savingsGoal]);
```

**API Call - Filter Schemes:**
```javascript
const filterSchemes = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/filter-schemes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        bankId: bank,
        age: parseInt(age),
        gender,
        category,
        monthlyIncome: parseInt(monthlyIncome),
        occupation,
        savingsGoal
      }),
    });
    
    const data = await response.json();
    /* Response Format:
    {
      bank: "SBI",
      totalSchemes: 6,
      matchedSchemes: 3,
      userCriteria: { age: 30, gender: "Male", ... },
      schemes: [
        { id: "sbi1", name: "...", bestMatch: true },
        { id: "sbi5", name: "...", bestMatch: false }
      ]
    }
    */
    setResults(data);
    setLoading(false);
  } catch (err) {
    setError('Failed to load results');
  }
};
```

**Results Display:**
```javascript
{/* User Criteria Summary */}
<div className={styles.criteriaCard}>
  <h3>Your Eligibility Profile:</h3>
  <div className={styles.criteriaGrid}>
    <div>Age: {age} years</div>
    <div>Gender: {gender}</div>
    <div>Category: {category}</div>
    <div>Monthly Income: ₹{parseInt(monthlyIncome).toLocaleString()}</div>
    <div>Occupation: {occupation}</div>
    <div>Goal: {savingsGoal}</div>
  </div>
</div>

{/* Matched Schemes Count */}
<p>Found <strong>{results.matchedSchemes}</strong> schemes out of {results.totalSchemes}</p>

{/* Scheme Cards */}
{results.schemes.map((scheme) => (
  <div 
    className={scheme.bestMatch ? styles.bestMatch : styles.schemeCard}
    onClick={() => router.push(`/scheme-details?schemeId=${scheme.id}&bankId=${bank}`)}
  >
    {/* Best Match Badge */}
    {scheme.bestMatch && (
      <div className={styles.bestMatchBadge}>⭐ Best Match</div>
    )}
    
    {/* Scheme Details */}
    <h3>{scheme.name}</h3>
    <p>{scheme.description}</p>
    
    {/* Suitable For Tags with Highlight */}
    {scheme.suitableFor.map(goal => (
      <span className={goal === savingsGoal ? styles.matchedGoal : ''}>
        {goal} {goal === savingsGoal && '✓'}
      </span>
    ))}
    
    {/* Benefits */}
    <ul>
      {scheme.benefits.map(benefit => <li>{benefit}</li>)}
    </ul>
    
    {/* Click for Details */}
    <div className={styles.viewDetailsButton}>
      Click for Complete Guide & How to Apply →
    </div>
  </div>
))}

{/* No Results */}
{results.schemes.length === 0 && (
  <div className={styles.noResults}>
    <h2>No Matching Schemes Found 😔</h2>
    <button onClick={() => router.push(`/filter?bank=${bank}`)}>
      Modify Criteria
    </button>
  </div>
)}
```

**Best Match Logic Explained:**
```javascript
// Backend sets bestMatch: true when:
if (scheme.suitableFor.includes(userCriteria.savingsGoal)) {
  scheme.bestMatch = true;
}

// Frontend applies special styling:
// - Pink border instead of cyan
// - Star badge "⭐ Best Match"
// - Animated pulse effect
// - Savings goal tag gets checkmark ✓
```

---

#### **6. `scheme-details.js` - Complete Scheme Guide**

**Route:** `/scheme-details?schemeId=sbi1&bankId=SBI`

**Purpose:** Show comprehensive information about one specific scheme

**Reading Query Parameters:**
```javascript
const router = useRouter();
const { schemeId, bankId } = router.query;

useEffect(() => {
  if (schemeId && bankId) {
    fetchSchemeDetails();
  }
}, [schemeId, bankId]);
```

**Fetching Scheme Data:**
```javascript
const fetchSchemeDetails = async () => {
  // Get all schemes for this bank
  const response = await fetch(`http://localhost:5000/api/schemes/${bankId}`);
  const data = await response.json();
  
  // Find the specific scheme by ID
  const foundScheme = data.schemes.find(s => s.id === schemeId);
  
  if (foundScheme) {
    setScheme(foundScheme);
  }
};
```

**Contact Information Fallback:**
```javascript
// If scheme has bankContact in data, use it
// Otherwise, use default bank contacts
const getBankContact = () => {
  const contacts = {
    'SBI': {
      customerCare: '1800 11 2211 (Toll-Free)',
      email: 'customercare@sbi.co.in',
      website: 'https://sbi.bank.in/',
      smsService: 'SMS "CARE" to 9223440000'
    },
    'PNB': { ... },
    'HDFC_Bank': { ... },
    'ICICI_Bank': { ... },
    'Axis_Bank': { ... }
  };
  return scheme.bankContact || contacts[bankId];
};
```

**Complete Page Sections:**

```javascript
{/* 1. SCHEME HEADER */}
<div className={styles.schemeHeader}>
  <h1>{scheme.name}</h1>
  
  <div className={styles.interestBadge}>
    <span>Interest Rate:</span>
    <span>{scheme.interestRate}</span>
  </div>
  
  <p>{scheme.description}</p>
  
  <div className={styles.targetGroup}>
    🎯 Target Group: {scheme.targetGroup}
  </div>
</div>

{/* 2. ELIGIBILITY CRITERIA */}
<section>
  <h2>✅ Eligibility Criteria</h2>
  <div className={styles.eligibilityGrid}>
    <div className={styles.eligibilityCard}>
      <h3>Age</h3>
      <p>{scheme.eligibility.minAge}+ years</p>
    </div>
    <div className={styles.eligibilityCard}>
      <h3>Gender</h3>
      <p>{scheme.eligibility.gender}</p>
    </div>
    <div className={styles.eligibilityCard}>
      <h3>Category</h3>
      <p>{scheme.eligibility.categories.join(', ')}</p>
    </div>
    {scheme.eligibility.minIncome && (
      <div className={styles.eligibilityCard}>
        <h3>Minimum Income</h3>
        <p>₹{scheme.eligibility.minIncome.toLocaleString()}/month</p>
      </div>
    )}
    {scheme.eligibility.maxIncome && (
      <div className={styles.eligibilityCard}>
        <h3>Maximum Income</h3>
        <p>₹{scheme.eligibility.maxIncome.toLocaleString()}/month</p>
      </div>
    )}
    <div className={styles.eligibilityCard}>
      <h3>Occupation</h3>
      <p>{scheme.eligibility.occupations.join(', ')}</p>
    </div>
  </div>
</section>

{/* 3. HOW TO APPLY */}
<section>
  <h2>📝 How to Apply</h2>
  <p>{scheme.howToApply || 'Visit nearest bank branch...'}</p>
</section>

{/* 4. APPLICATION PROCESS STEPS */}
{scheme.applicationProcess && (
  <section>
    <h2>🔄 Application Process (Step-by-Step)</h2>
    {scheme.applicationProcess.map((step, index) => (
      <div className={styles.processStep}>
        <div className={styles.stepNumber}>{index + 1}</div>
        <div className={styles.stepContent}>{step}</div>
      </div>
    ))}
  </section>
)}

{/* 5. DOCUMENTS REQUIRED */}
<section>
  <h2>📄 Documents Required</h2>
  {scheme.documentsRequired.map((doc, index) => (
    <div className={styles.documentItem}>
      <span className={styles.checkmark}>✓</span>
      <span>{doc}</span>
    </div>
  ))}
</section>

{/* 6. KEY BENEFITS */}
<section>
  <h2>🎁 Key Benefits</h2>
  {scheme.benefits.map((benefit, index) => (
    <div className={styles.benefitItem}>
      <span className={styles.star}>★</span>
      <span>{benefit}</span>
    </div>
  ))}
</section>

{/* 7. BANK CONTACT DETAILS */}
<section>
  <h2>📞 Bank Contact Details</h2>
  <div className={styles.contactGrid}>
    <div className={styles.contactCard}>
      <h3>📞 Customer Care</h3>
      <p>{bankContact.customerCare}</p>
      <small>Available 24x7</small>
    </div>
    <div className={styles.contactCard}>
      <h3>✉️ Email Support</h3>
      <p>{bankContact.email}</p>
      <small>Response within 24-48 hours</small>
    </div>
    <div className={styles.contactCard}>
      <h3>🌐 Official Website</h3>
      <a href={bankContact.website} target="_blank">
        {bankContact.website}
      </a>
      <small>For online applications</small>
    </div>
    <div className={styles.contactCard}>
      <h3>💬 SMS Banking</h3>
      <p>{bankContact.smsService}</p>
      <small>For quick queries</small>
    </div>
  </div>
</section>

{/* 8. IMPORTANT INFORMATION */}
<section className={styles.disclaimerSection}>
  <h3>⚠️ Important Information</h3>
  <ul>
    <li>Interest rates are subject to change</li>
    <li>All eligibility criteria must be met</li>
    <li>Processing time may vary</li>
    <li>For NRI applicants, additional docs may be required</li>
    <li>Always verify with official bank sources</li>
  </ul>
</section>

{/* 9. ACTION BUTTONS */}
<div className={styles.actionButtons}>
  <button 
    onClick={() => window.open(bankContact.website, '_blank')}
    className={styles.applyButton}
  >
    Visit Bank Website
  </button>
  <button 
    onClick={() => router.push(`/filter?bank=${bankId}`)}
    className={styles.filterButton}
  >
    Check Other Schemes
  </button>
</div>
```

**Example: Full SBI WECARE Scheme Data Structure:**
```json
{
  "id": "sbi1",
  "name": "SBI WECARE Senior Citizen Savings Account",
  "description": "Special savings account for senior citizens aged 60+...",
  "interestRate": "7.50% p.a.",
  "targetGroup": "Senior Citizens (60+ years)",
  "eligibility": {
    "minAge": 60,
    "maxAge": null,
    "gender": "Any",
    "categories": ["All"],
    "maxIncome": null,
    "minIncome": null,
    "occupations": ["Any"]
  },
  "suitableFor": ["Savings", "Retirement"],
  "benefits": [
    "Higher interest rates",
    "Free doorstep banking facility",
    "Priority service in branches",
    "Free health checkup annually",
    "No minimum balance for ages 75+"
  ],
  "applicationProcess": [
    "Visit nearest SBI branch with required documents",
    "Fill the savings account opening form",
    "Submit age proof documents (60+ years)",
    "Complete KYC verification process",
    "Make initial deposit (minimum ₹1000)",
    "Receive account number and passbook within 24 hours"
  ],
  "documentsRequired": [
    "Age Proof: Aadhaar Card / PAN Card / Birth Certificate / Passport",
    "Address Proof: Aadhaar Card / Voter ID / Utility Bill",
    "Identity Proof: PAN Card / Aadhaar Card / Passport",
    "Recent passport-size photographs (2 copies)",
    "Senior Citizen Certificate (if available)"
  ],
  "howToApply": "Visit your nearest SBI branch or apply online...",
  "bankContact": {
    "customerCare": "1800 11 2211 (Toll-Free) / 1800 425 3800",
    "email": "customercare@sbi.co.in",
    "website": "https://sbi.bank.in/",
    "smsService": "SMS 'CARE' to 9223440000"
  },
  "source": "https://sbi.bank.in/"
}
```

---

#### **7. `about.js` - About & Ethics Page**

**Route:** `/about`

**Purpose:** Transparency about data sources, privacy, and ethical considerations

**Page Sections:**

```javascript
{/* 1. PURPOSE SECTION */}
<section>
  <h2>📋 Purpose</h2>
  <p>
    This is an <strong>educational project</strong> designed to help users 
    discover banking schemes. The system uses a <strong>purely rule-based 
    approach</strong> with if-else logic—no AI/ML involved.
  </p>
</section>

{/* 2. DATA SOURCES WITH LINKS */}
<section>
  <h2>🔍 Data Sources</h2>
  <p>All scheme information based on publicly available data from:</p>
  <ul>
    <li>
      <strong>State Bank of India (SBI)</strong>
      <a href="https://sbi.bank.in/" target="_blank">
        https://sbi.bank.in/
      </a>
    </li>
    <li>
      <strong>Punjab National Bank (PNB)</strong>
      <a href="https://www.pnbindia.in/" target="_blank">
        https://www.pnbindia.in/
      </a>
    </li>
    {/* ... other banks */}
  </ul>
  <p className={styles.note}>
    <strong>Note:</strong> Scheme details are representative. For current 
    information, visit official bank websites.
  </p>
</section>

{/* 3. PRIVACY & DATA USAGE */}
<section>
  <h2>🛡️ Privacy & Data Usage</h2>
  <ul>
    <li><strong>No Data Storage:</strong> Personal information is NOT stored</li>
    <li><strong>Client-Side Processing:</strong> Criteria processed in real-time</li>
    <li><strong>No Tracking:</strong> No cookies, analytics, or tracking</li>
    <li><strong>No Third-Party Sharing:</strong> No data shared</li>
    <li><strong>Educational Purpose Only:</strong> Not for actual transactions</li>
  </ul>
</section>

{/* 4. ETHICAL CONSIDERATIONS - 4 CARDS */}
<section>
  <h2>⚖️ Ethical Considerations</h2>
  <div className={styles.ethicsGrid}>
    <div className={styles.ethicsCard}>
      <h3>🎯 Transparency</h3>
      <p>All filtering is rule-based. No hidden algorithms.</p>
    </div>
    <div className={styles.ethicsCard}>
      <h3>⚠️ No Financial Advice</h3>
      <p>Informational only. Not financial advice.</p>
    </div>
    <div className={styles.ethicsCard}>
      <h3>📊 Data Accuracy</h3>
      <p>Banking schemes change frequently. Always verify.</p>
    </div>
    <div className={styles.ethicsCard}>
      <h3>🤝 Inclusivity</h3>
      <p>Categories follow government classifications.</p>
    </div>
  </div>
</section>

{/* 5. HOW IT WORKS - 4 STEPS */}
<section>
  <h2>🔧 How It Works</h2>
  <div className={styles.howItWorks}>
    <div className={styles.step}>
      <div className={styles.stepNumber}>1</div>
      <h3>User Input</h3>
      <p>You provide age, gender, category, income, occupation, goal</p>
    </div>
    <div className={styles.step}>
      <div className={styles.stepNumber}>2</div>
      <h3>Rule-Based Filtering</h3>
      <p>System uses if-else conditions to match criteria</p>
    </div>
    <div className={styles.step}>
      <div className={styles.stepNumber}>3</div>
      <h3>Best Match Detection</h3>
      <p>Schemes aligned with your goal are marked</p>
    </div>
    <div className={styles.step}>
      <div className={styles.stepNumber}>4</div>
      <h3>Results Display</h3>
      <p>You see eligible schemes with complete details</p>
    </div>
  </div>
</section>

{/* 6. DISCLAIMER */}
<section>
  <h2>⚠️ Disclaimer</h2>
  <div className={styles.disclaimer}>
    <p>This system is provided "as is" for educational purposes. We:</p>
    <ul>
      <li>Make no warranties about accuracy or completeness</li>
      <li>Are not affiliated with any banks</li>
      <li>Do not endorse specific products</li>
      <li>Are not responsible for decisions made</li>
      <li>Recommend verifying with official sources</li>
    </ul>
    <p>
      <strong>Banking products are subject to change.</strong> Always consult 
      official sources.
    </p>
  </div>
</section>

{/* 7. ADDITIONAL RESOURCES */}
<section>
  <h2>📞 Additional Resources</h2>
  <div className={styles.resources}>
    <a href="https://rbi.org.in/" target="_blank">
      Reserve Bank of India (RBI)
    </a>
    <a href="https://www.india.gov.in/" target="_blank">
      National Portal of India
    </a>
    <a href="https://pmjdy.gov.in/" target="_blank">
      PM Jan Dhan Yojana
    </a>
  </div>
</section>

{/* 8. FOOTER */}
<div className={styles.footer}>
  <p>For questions, contact your bank directly.</p>
  <button onClick={() => router.push('/')}>
    Return to Home
  </button>
</div>
```

---

### 🎨 Styling Files (styles/)

#### **`globals.css` - Global Styles**

**Purpose:** CSS variables and global styling for entire app

```css
/* CSS Custom Properties (Variables) */
:root {
  /* Colors */
  --dark-bg: #0a0a0f;              /* Main background */
  --neon-cyan: #00f3ff;             /* Primary accent */
  --neon-purple: #b400ff;           /* Secondary accent */
  --neon-pink: #ff006e;             /* Best match highlight */
  --neon-green: #4caf50;            /* Success/benefits */
  
  /* Text Colors */
  --text-primary: #ffffff;          /* Main text */
  --text-secondary: rgba(255, 255, 255, 0.7);  /* Subtle text */
  
  /* Card Background */
  --card-bg: rgba(255, 255, 255, 0.05);
  --card-hover: rgba(255, 255, 255, 0.1);
}

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 100%);
  color: var(--text-primary);
  line-height: 1.6;
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  background: var(--dark-bg);
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--neon-cyan), var(--neon-purple));
  border-radius: 6px;
}

/* Selection Color */
::selection {
  background: var(--neon-cyan);
  color: var(--dark-bg);
}
```

#### **CSS Modules Pattern (Home.module.css example)**

```css
/* Container */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Neon Text Effect */
.neonText {
  color: var(--neon-cyan);
  text-shadow: 
    0 0 10px var(--neon-cyan),
    0 0 20px var(--neon-cyan),
    0 0 30px var(--neon-cyan);
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    text-shadow: 
      0 0 10px var(--neon-cyan),
      0 0 20px var(--neon-cyan);
  }
  50% {
    text-shadow: 
      0 0 20px var(--neon-cyan),
      0 0 30px var(--neon-cyan),
      0 0 40px var(--neon-cyan);
  }
}

/* Gradient Button */
.ctaButton {
  background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
  color: var(--dark-bg);
  font-size: 1.25rem;
  font-weight: bold;
  padding: 1.25rem 3rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 0 20px rgba(0, 243, 255, 0.5);
}

.ctaButton:hover {
  transform: scale(1.05);
  box-shadow: 
    0 0 30px rgba(0, 243, 255, 0.8),
    0 0 40px rgba(180, 0, 255, 0.5);
}

/* Card with Hover Effect */
.featureCard {
  background: var(--card-bg);
  padding: 2rem;
  border-radius: 15px;
  border: 1px solid rgba(0, 243, 255, 0.2);
  transition: all 0.3s ease;
}

.featureCard:hover {
  background: var(--card-hover);
  border-color: var(--neon-cyan);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 243, 255, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .ctaButton {
    width: 100%;
    padding: 1rem 2rem;
  }
}
```

#### **Key Styling Patterns Used:**

1. **Neon Glow Effects** - text-shadow with multiple layers
2. **Gradient Backgrounds** - linear-gradient for buttons/badges
3. **Hover Animations** - transform + box-shadow
4. **Card Lift Effect** - translateY(-5px) on hover
5. **Animated Borders** - ::after pseudo-element with transforms
6. **Responsive Grid** - CSS Grid with auto-fit/auto-fill
7. **Mobile-First** - @media queries for tablet/mobile

---

## 5. Data Flow & Architecture

### Complete User Journey Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER STARTS                              │
│                            ↓                                     │
│                    Opens Browser                                 │
│                            ↓                                     │
│              http://localhost:3000/                              │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│ 1. HOME PAGE (index.js)                                         │
│    - Displays hero section                                       │
│    - Shows 3 feature cards                                       │
│    - User clicks "Explore Schemes"                               │
│    → router.push('/select-bank')                                 │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. BANK SELECTION (select-bank.js)                              │
│    API: GET http://localhost:5000/api/banks                     │
│    ←─── {"banks":["SBI","PNB","HDFC_Bank","ICICI_Bank",...]}   │
│    - Displays 5 bank cards                                       │
│    - User clicks on "SBI"                                        │
│    → router.push('/schemes/SBI')                                 │
└─────────────────────────────────────────────────────────────────┘
                             ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. SCHEMES LIST (schemes/[bankId].js)                           │
│    API: GET http://localhost:5000/api/schemes/SBI               │
│    ←─── {"bank":"SBI", "schemes":[{...}, {...}, ...]}          │
│    - Displays 6 scheme cards                                     │
│    User has 2 options:                                           │
│    A) Click "Find My Best Match"                                 │
│       → router.push('/filter?bank=SBI')                          │
│    B) Click on specific scheme card                              │
│       → router.push('/scheme-details?schemeId=sbi1&bankId=SBI') │
└─────────────────────────────────────────────────────────────────┘
                       ↓                    ↓
         ┌─────────────┘                    └─────────────┐
         ↓                                                  ↓
┌────────────────────────┐              ┌──────────────────────────┐
│ 4A. FILTER PAGE        │              │ 4B. SCHEME DETAILS       │
│     (filter.js)        │              │     (scheme-details.js)  │
│                        │              │                          │
│ - User fills form:     │              │ - Shows complete guide   │
│   • Age: 65            │              │ - Eligibility criteria   │
│   • Gender: Any        │              │ - Application process    │
│   • Category: General  │              │ - Documents required     │
│   • Income: 50000      │              │ - Bank contact details   │
│   • Occupation: Any    │              │                          │
│   • Goal: Retirement   │              │ User clicks scheme card  │
│                        │              │ → Back to /filter        │
│ - Submits form         │              │                          │
│ → router.push(         │              └──────────────────────────┘
│   '/results?bank=SBI   │
│   &age=65&gender=Any   │
│   &...'                │
│   )                    │
└────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. RESULTS PAGE (results.js)                                    │
│    API: POST http://localhost:5000/api/filter-schemes           │
│    Body: {bankId:"SBI", age:65, gender:"Any", ...}              │
│    ←─── {                                                        │
│           bank: "SBI",                                           │
│           totalSchemes: 6,                                       │
│           matchedSchemes: 2,                                     │
│           schemes: [                                             │
│             {id:"sbi1", name:"...", bestMatch:true},            │
│             {id:"sbi4", name:"...", bestMatch:false}            │
│           ]                                                      │
│         }                                                        │
│    - Shows matched schemes (2 out of 6)                         │
│    - Highlights "Best Match" with star badge                    │
│    - User clicks on scheme card                                 │
│    → router.push('/scheme-details?schemeId=sbi1&bankId=SBI')   │
└─────────────────────────────────────────────────────────────────┘
         ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. SCHEME DETAILS (scheme-details.js)                           │
│    - Shows complete guide                                        │
│    - User can visit bank website or check other schemes         │
│    → Either exit or go back to filter/schemes                   │
└─────────────────────────────────────────────────────────────────┘
```

### Backend API Flow

```
CLIENT REQUEST
     ↓
┌─────────────────────────────┐
│   Express Server (Port 5000) │
│   - CORS Middleware          │
│   - JSON Parser              │
└─────────────────────────────┘
     ↓
┌─────────────────────────────────────────────────┐
│   ROUTING                                       │
│   1. GET / → Health check                       │
│   2. GET /api/banks → List all banks            │
│   3. GET /api/schemes/:bankId → Get schemes     │
│   4. POST /api/filter-schemes → Filter logic    │
└─────────────────────────────────────────────────┘
     ↓
┌─────────────────────────────┐
│   Read schemes.json          │
│   const schemesData =        │
│     require('./data/schemes  │
│       .json')                │
└─────────────────────────────┘
     ↓
┌─────────────────────────────┐
│   Apply Logic                │
│   (for filter endpoint)      │
│   - Age range check          │
│   - Gender match             │
│   - Category inclusion       │
│   - Income limits            │
│   - Occupation match         │
│   - Best match detection     │
└─────────────────────────────┘
     ↓
┌─────────────────────────────┐
│   Send JSON Response         │
│   res.json({ ... })          │
└─────────────────────────────┘
     ↓
CLIENT RECEIVES RESPONSE
```

---

## 6. Code Explanation - Frontend

### React Hooks Explained

#### **useState - State Management**

```javascript
// What: Stores data that can change
// When to use: When component needs to remember data

// Syntax
const [variableName, setterFunction] = useState(initialValue);

// Examples from our project:

// 1. Loading state
const [loading, setLoading] = useState(true);
// Initially true, becomes false after data loaded

// 2. Form input
const [age, setAge] = useState('');
<input 
  value={age}
  onChange={(e) => setAge(e.target.value)}
/>
// age updates as user types

// 3. Array data
const [schemes, setSchemes] = useState([]);
// Initially empty, filled after API call
setSchemes(data.schemes);
```

#### **useEffect - Side Effects**

```javascript
// What: Runs code when component loads or when dependencies change
// When to use: API calls, subscriptions, manual DOM changes

// Syntax
useEffect(() => {
  // Code to run
}, [dependencies]);

// Examples:

// 1. Run once on component mount
useEffect(() => {
  fetchBanks();
}, []);  // Empty array = run only once

// 2. Run when specific variable changes
useEffect(() => {
  if (bankId) {
    fetchSchemes();
  }
}, [bankId]);  // Re-run when bankId changes

// 3. Cleanup function
useEffect(() => {
  const subscription = subscribeToUpdates();
  
  return () => {
    subscription.unsubscribe();  // Cleanup when component unmounts
  };
}, []);
```

#### **useRouter - Next.js Navigation**

```javascript
// What: Provides routing functionality
// When to use: Navigate between pages, read URL parameters

import { useRouter } from 'next/router';

const router = useRouter();

// Navigate to different page
router.push('/select-bank');

// Navigate with query parameters
router.push('/results?age=30&gender=Male');

// Read URL parameters
const { bankId } = router.query;  // From /schemes/SBI

// Go back
router.back();
```

### API Calls with Fetch

```javascript
// GET Request
const fetchBanks = async () => {
  try {
    // Make request
    const response = await fetch('http://localhost:5000/api/banks');
    
    // Check if successful
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    // Parse JSON response
    const data = await response.json();
    
    // Update state
    setBanks(data.banks);
    
  } catch (error) {
    // Handle errors
    setError('Failed to load banks');
    console.error(error);
  }
};

// POST Request
const filterSchemes = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/filter-schemes', {
      method: 'POST',  // POST instead of GET
      headers: {
        'Content-Type': 'application/json',  // Sending JSON
      },
      body: JSON.stringify({  // Convert object to JSON string
        bankId: 'SBI',
        age: 65,
        gender: 'Any'
      }),
    });
    
    const data = await response.json();
    setResults(data);
    
  } catch (error) {
    setError('Failed to filter schemes');
  }
};
```

### Event Handlers

```javascript
// Click Handler
const handleBankSelect = (bankId) => {
  setSelectedBank(bankId);
};

<button onClick={() => handleBankSelect('SBI')}>
  Select SBI
</button>

// Form Submit Handler
const handleSubmit = (e) => {
  e.preventDefault();  // Prevent page reload
  
  // Validate data
  if (!age || !gender) {
    alert('Please fill all fields');
    return;
  }
  
  // Process data
  router.push('/results?...');
};

<form onSubmit={handleSubmit}>
  {/* form fields */}
  <button type="submit">Submit</button>
</form>

// Input Change Handler
const handleAgeChange = (e) => {
  const value = e.target.value;
  setAge(value);
};

<input 
  type="number"
  value={age}
  onChange={handleAgeChange}
/>
```

### Conditional Rendering

```javascript
// 1. If-else with return
if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

return <div>Content</div>;

// 2. Ternary operator
{loading ? <Spinner /> : <Content />}

// 3. Logical AND (&&)
{error && <ErrorMessage text={error} />}

// 4. Multiple conditions
{!loading && !error && results && (
  <div>
    {/* Show results */}
  </div>
)}

// 5. Switch case in JSX
{status === 'loading' && <Spinner />}
{status === 'error' && <ErrorMessage />}
{status === 'success' && <Results />}
```

### Array Mapping (Lists)

```javascript
// Simple map
{schemes.map((scheme) => (
  <div key={scheme.id}>
    <h3>{scheme.name}</h3>
  </div>
))}

// Map with index
{benefits.map((benefit, index) => (
  <li key={index}>{benefit}</li>
))}

// Map with conditional class
{schemes.map((scheme) => (
  <div 
    key={scheme.id}
    className={scheme.bestMatch ? styles.bestMatch : styles.normal}
  >
    {scheme.name}
  </div>
))}

// Map with filter
{schemes
  .filter(scheme => scheme.interestRate > 5)
  .map(scheme => (
    <div key={scheme.id}>{scheme.name}</div>
  ))
}
```

---

## 7. Code Explanation - Backend

### Express Server Setup

```javascript
// Import required packages
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware - Code that runs before route handlers
app.use(cors());  // Allow cross-origin requests
app.use(express.json());  // Parse JSON request bodies

// Load data
const schemesData = require('./data/schemes.json');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### API Endpoints

#### **1. Health Check**

```javascript
// GET /
// Purpose: Check if server is running
app.get('/', (req, res) => {
  res.json({ 
    status: 'Server is running',
    endpoints: [
      'GET /api/banks',
      'GET /api/schemes/:bankId',
      'POST /api/filter-schemes'
    ]
  });
});

// Test: curl http://localhost:5000/
```

#### **2. Get All Banks**

```javascript
// GET /api/banks
// Purpose: Return list of all available banks
app.get('/api/banks', (req, res) => {
  // Object.keys() returns array of keys from object
  // schemes.json structure: {"SBI": [...], "PNB": [...]}
  // Result: ["SBI", "PNB", "HDFC_Bank", ...]
  const banks = Object.keys(schemesData);
  
  res.json({ banks });
  // Response: {"banks":["SBI","PNB","HDFC_Bank","ICICI_Bank","Axis_Bank"]}
});

// Test: curl http://localhost:5000/api/banks
```

#### **3. Get Schemes by Bank**

```javascript
// GET /api/schemes/:bankId
// :bankId is a URL parameter (variable)
// Example: /api/schemes/SBI → bankId = "SBI"

app.get('/api/schemes/:bankId', (req, res) => {
  // Extract bankId from URL
  const { bankId } = req.params;
  
  // Get schemes for this bank
  const schemes = schemesData[bankId];
  // schemesData["SBI"] returns array of 6 SBI schemes
  
  // Check if bank exists
  if (!schemes) {
    return res.status(404).json({ 
      error: 'Bank not found',
      availableBanks: Object.keys(schemesData)
    });
  }
  
  // Return bank name and schemes
  res.json({ 
    bank: bankId, 
    schemes 
  });
  // Response: {"bank":"SBI", "schemes":[{...}, {...}, ...]}
});

// Test: curl http://localhost:5000/api/schemes/SBI
```

#### **4. Filter Schemes (Main Logic)**

```javascript
// POST /api/filter-schemes
// Purpose: Filter schemes based on user criteria
// Request body: {bankId, age, gender, category, monthlyIncome, occupation, savingsGoal}

app.post('/api/filter-schemes', (req, res) => {
  // Extract user criteria from request body
  const { 
    bankId, 
    age, 
    gender, 
    category, 
    monthlyIncome, 
    occupation, 
    savingsGoal 
  } = req.body;
  
  // Get all schemes for this bank
  const allSchemes = schemesData[bankId];
  
  if (!allSchemes) {
    return res.status(404).json({ error: 'Bank not found' });
  }
  
  // FILTERING LOGIC - Keep only matching schemes
  const filteredSchemes = allSchemes.filter((scheme) => {
    const eligibility = scheme.eligibility;
    
    // ============================================
    // 1. AGE CHECK
    // ============================================
    // If scheme has minAge requirement
    if (eligibility.minAge && age < eligibility.minAge) {
      return false;  // User too young
    }
    
    // If scheme has maxAge limit
    if (eligibility.maxAge && age > eligibility.maxAge) {
      return false;  // User too old
    }
    
    // Example:
    // Scheme: minAge=60, maxAge=null
    // User age=65 → PASS (65 >= 60, no max limit)
    // User age=30 → FAIL (30 < 60)
    
    // ============================================
    // 2. GENDER CHECK
    // ============================================
    if (eligibility.gender !== 'Any' && eligibility.gender !== gender) {
      return false;  // Gender doesn't match
    }
    
    // Example:
    // Scheme: gender="Female"
    // User gender="Male" → FAIL
    // User gender="Female" → PASS
    
    // ============================================
    // 3. CATEGORY CHECK
    // ============================================
    // If scheme accepts all categories
    if (eligibility.categories.includes('All')) {
      // PASS - everyone eligible
    } else {
      // Check if user's category is in scheme's accepted categories
      if (!eligibility.categories.includes(category)) {
        return false;  // Category not accepted
      }
    }
    
    // Example:
    // Scheme: categories=["SC", "ST"]
    // User category="General" → FAIL
    // User category="SC" → PASS
    
    // ============================================
    // 4. INCOME CHECK (Maximum)
    // ============================================
    if (eligibility.maxIncome && monthlyIncome > eligibility.maxIncome) {
      return false;  // User earns too much
    }
    
    // Example:
    // Scheme: maxIncome=50000
    // User income=60000 → FAIL (too high)
    // User income=30000 → PASS
    
    // ============================================
    // 5. INCOME CHECK (Minimum)
    // ============================================
    if (eligibility.minIncome && monthlyIncome < eligibility.minIncome) {
      return false;  // User doesn't earn enough
    }
    
    // Example:
    // Scheme: minIncome=15000 (Salary Account)
    // User income=10000 → FAIL
    // User income=25000 → PASS
    
    // ============================================
    // 6. OCCUPATION CHECK
    // ============================================
    // If scheme accepts any occupation
    if (eligibility.occupations.includes('Any')) {
      // PASS
    } else {
      // Check if user's occupation is accepted
      if (!eligibility.occupations.includes(occupation)) {
        return false;  // Occupation not accepted
      }
    }
    
    // Example:
    // Scheme: occupations=["Farmer", "Agricultural Worker"]
    // User occupation="Salaried" → FAIL
    // User occupation="Farmer" → PASS
    
    // ============================================
    // ALL CHECKS PASSED - SCHEME MATCHES
    // ============================================
    return true;
  });
  
  // ============================================
  // BEST MATCH DETECTION
  // ============================================
  // Mark schemes where savings goal matches
  filteredSchemes.forEach((scheme) => {
    if (scheme.suitableFor && scheme.suitableFor.includes(savingsGoal)) {
      scheme.bestMatch = true;
    } else {
      scheme.bestMatch = false;
    }
  });
  
  // Example:
  // User savingsGoal: "Retirement"
  // Scheme A suitableFor: ["Savings", "Retirement"] → bestMatch = true
  // Scheme B suitableFor: ["Business", "Investment"] → bestMatch = false
  
  // ============================================
  // SORTING - Best matches first
  // ============================================
  filteredSchemes.sort((a, b) => {
    if (a.bestMatch && !b.bestMatch) return -1;  // a comes first
    if (!a.bestMatch && b.bestMatch) return 1;   // b comes first
    return 0;  // Keep original order
  });
  
  // ============================================
  // SEND RESPONSE
  // ============================================
  res.json({
    bank: bankId,
    totalSchemes: allSchemes.length,       // 6
    matchedSchemes: filteredSchemes.length, // 2
    userCriteria: {
      age,
      gender,
      category,
      monthlyIncome,
      occupation,
      savingsGoal
    },
    schemes: filteredSchemes
  });
});

// Test with curl:
// curl -X POST http://localhost:5000/api/filter-schemes \
//   -H "Content-Type: application/json" \
//   -d '{"bankId":"SBI","age":65,"gender":"Any","category":"General","monthlyIncome":50000,"occupation":"Any","savingsGoal":"Retirement"}'
```

### Error Handling

```javascript
// Try-Catch for Error Handling
app.get('/api/schemes/:bankId', (req, res) => {
  try {
    const { bankId } = req.params;
    const schemes = schemesData[bankId];
    
    if (!schemes) {
      // Return 404 status code
      return res.status(404).json({ 
        error: 'Bank not found' 
      });
    }
    
    res.json({ bank: bankId, schemes });
    
  } catch (error) {
    // Catch any unexpected errors
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});
```

---

## 8. Styling System

### CSS Variables (Custom Properties)

```css
/* Define once in globals.css */
:root {
  --neon-cyan: #00f3ff;
}

/* Use anywhere */
.button {
  color: var(--neon-cyan);
}

/* Benefits:
   - Change color in one place, updates everywhere
   - Easy theme switching
   - Better maintainability
*/
```

### CSS Modules Workflow

```javascript
// 1. Create CSS file: Home.module.css
.container {
  padding: 2rem;
}

// 2. Import in component
import styles from './Home.module.css';

// 3. Use as JavaScript object
<div className={styles.container}>

// 4. Output HTML (Next.js generates unique names)
<div class="Home_container__x3k2l">

// 5. No conflicts with other components!
```

### Common CSS Patterns

#### **Flexbox Layout**

```css
/* Center content vertically and horizontally */
.center {
  display: flex;
  justify-content: center;  /* horizontal */
  align-items: center;      /* vertical */
  min-height: 100vh;
}

/* Space between items */
.spaceBetween {
  display: flex;
  justify-content: space-between;
}

/* Column layout */
.column {
  display: flex;
  flex-direction: column;
  gap: 1rem;  /* space between children */
}
```

#### **CSS Grid**

```css
/* Responsive grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Explanation:
   - repeat(): create multiple columns
   - auto-fit: fit as many columns as possible
   - minmax(300px, 1fr): min 300px, max equal width
   - gap: space between grid items
   
   Result: Automatically adjusts columns based on screen size
*/
```

#### **Hover Effects**

```css
.card {
  transition: all 0.3s ease;  /* smooth animation */
}

.card:hover {
  transform: translateY(-5px);  /* move up */
  box-shadow: 0 10px 30px rgba(0, 243, 255, 0.3);  /* glow */
}
```

#### **Gradient Backgrounds**

```css
.button {
  background: linear-gradient(
    135deg,  /* angle */
    #00f3ff 0%,  /* start color */
    #b400ff 100%  /* end color */
  );
}
```

#### **Text Shadow (Glow Effect)**

```css
.neonText {
  text-shadow: 
    0 0 10px #00f3ff,  /* inner glow */
    0 0 20px #00f3ff,  /* middle glow */
    0 0 30px #00f3ff;  /* outer glow */
}
```

#### **Animations**

```css
/* Define animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Apply animation */
.badge {
  animation: pulse 2s ease-in-out infinite;
  /*         name  duration timing  repeat */
}
```

#### **Responsive Design**

```css
/* Desktop first approach */
.container {
  padding: 3rem;
  font-size: 1.5rem;
}

/* Tablet */
@media (max-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1.2rem;
  }
}

/* Mobile */
@media (max-width: 480px) {
  .container {
    padding: 1rem;
    font-size: 1rem;
  }
}
```

---

## 9. Features Implementation

### 1. Dynamic Routing

**File:** `pages/schemes/[bankId].js`

**How it works:**
```
URL: /schemes/SBI
↓
Next.js sees [bankId] in filename
↓
Creates dynamic route with parameter
↓
Access via: router.query.bankId
↓
Value: "SBI"
```

**Code:**
```javascript
// File name: [bankId].js (square brackets = dynamic)
import { useRouter } from 'next/router';

const router = useRouter();
const { bankId } = router.query;  // "SBI"

// Use in API call
fetch(`http://localhost:5000/api/schemes/${bankId}`)
```

### 2. Query Parameters Navigation

**From:** Filter page  
**To:** Results page with data

```javascript
// Construct URL with parameters
const queryParams = new URLSearchParams({
  bank: 'SBI',
  age: 30,
  gender: 'Male'
});

// Navigate
router.push(`/results?${queryParams.toString()}`);
// URL: /results?bank=SBI&age=30&gender=Male

// Read on results page
const { bank, age, gender } = router.query;
```

### 3. Clickable Cards with Navigation

```javascript
// Make entire card clickable
<div 
  className={styles.schemeCard}
  onClick={() => router.push(`/scheme-details?schemeId=${scheme.id}&bankId=${bankId}`)}
  role="button"  // Accessibility: tells screen readers it's clickable
  tabIndex={0}   // Keyboard navigation: makes it focusable
>
  {/* Card content */}
</div>

// CSS for hover effect
.schemeCard {
  cursor: pointer;  /* Show hand cursor */
  transition: all 0.3s ease;
}

.schemeCard:hover {
  transform: translateY(-5px);  /* Lift up */
}
```

### 4. Best Match Highlighting

**Backend Logic:**
```javascript
// In filter-schemes endpoint
filteredSchemes.forEach((scheme) => {
  if (scheme.suitableFor && scheme.suitableFor.includes(savingsGoal)) {
    scheme.bestMatch = true;  // Add flag
  }
});

// Sort to show best matches first
filteredSchemes.sort((a, b) => {
  if (a.bestMatch && !b.bestMatch) return -1;
  return 0;
});
```

**Frontend Display:**
```javascript
// Conditional class name
<div className={scheme.bestMatch ? styles.bestMatch : styles.schemeCard}>
  
  {/* Show badge only for best matches */}
  {scheme.bestMatch && (
    <div className={styles.bestMatchBadge}>⭐ Best Match</div>
  )}
  
  {/* Highlight matching goal tag */}
  {scheme.suitableFor.map(goal => (
    <span className={goal === savingsGoal ? styles.matchedGoal : ''}>
      {goal} {goal === savingsGoal && '✓'}
    </span>
  ))}
</div>
```

**CSS Styling:**
```css
/* Normal card */
.schemeCard {
  border: 1px solid rgba(0, 243, 255, 0.2);
}

/* Best match card */
.bestMatch {
  border: 2px solid #ff006e;  /* Pink border */
  background: linear-gradient(
    135deg, 
    rgba(255, 0, 110, 0.05), 
    rgba(180, 0, 255, 0.05)
  );
}

/* Badge */
.bestMatchBadge {
  background: linear-gradient(135deg, #ff006e, #b400ff);
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  animation: pulse 2s ease-in-out infinite;
}
```

### 5. Loading States

```javascript
// Pattern used throughout app
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);
const [error, setError] = useState('');

const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch('...');
    const result = await response.json();
    setData(result);
  } catch (err) {
    setError('Failed to load');
  } finally {
    setLoading(false);  // Always runs, even if error
  }
};

// Render logic
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage />;
return <ActualContent data={data} />;
```

### 6. Form Validation

```javascript
// HTML5 validation
<input 
  type="number"
  min="10"
  max="100"
  required
/>

<select required>
  <option value="">Select...</option>
</select>

// JavaScript validation
const handleSubmit = (e) => {
  e.preventDefault();
  
  // Check if all fields filled
  if (!age || !gender || !category) {
    alert('Please fill all required fields');
    return;
  }
  
  // Validate age range
  if (age < 10 || age > 100) {
    alert('Age must be between 10 and 100');
    return;
  }
  
  // All valid, proceed
  submitForm();
};
```

### 7. Error Handling

```javascript
// Frontend
try {
  const response = await fetch('...');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  
} catch (error) {
  console.error('Fetch error:', error);
  setError('Failed to load data. Please try again.');
}

// Backend
app.get('/api/schemes/:bankId', (req, res) => {
  try {
    const schemes = schemesData[req.params.bankId];
    
    if (!schemes) {
      return res.status(404).json({ 
        error: 'Bank not found' 
      });
    }
    
    res.json({ schemes });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});
```

---

## 10. Setup & Installation

### Prerequisites

```bash
# Check if Node.js is installed
node --version  # Should show: v16.x.x or higher

# Check if npm is installed
npm --version   # Should show: 8.x.x or higher
```

### Installation Steps

```bash
# 1. Navigate to project folder
cd "/Users/snehamishra/AGENTIC AI BANK"

# 2. Install dependencies
npm install

# This installs:
# - next (Next.js framework)
# - react & react-dom (React library)
# - express (Backend framework)
# - cors (CORS middleware)
```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd "/Users/snehamishra/AGENTIC AI BANK"
node server/index.js

# Output:
# Server running on http://localhost:5000
# Available endpoints:
#   GET /
#   GET /api/banks
#   GET /api/schemes/:bankId
#   POST /api/filter-schemes
```

**Terminal 2 - Start Frontend:**
```bash
cd "/Users/snehamishra/AGENTIC AI BANK"
npm run dev

# Output:
# ready - started server on 0.0.0.0:3000
# event - compiled client and server successfully
```

**Access Application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Testing APIs

```bash
# 1. Health check
curl http://localhost:5000/

# 2. Get all banks
curl http://localhost:5000/api/banks

# 3. Get SBI schemes
curl http://localhost:5000/api/schemes/SBI

# 4. Filter schemes
curl -X POST http://localhost:5000/api/filter-schemes \
  -H "Content-Type: application/json" \
  -d '{
    "bankId":"SBI",
    "age":65,
    "gender":"Any",
    "category":"General",
    "monthlyIncome":50000,
    "occupation":"Any",
    "savingsGoal":"Retirement"
  }'
```

### Project Structure After Installation

```
AGENTIC AI BANK/
├── node_modules/        # Installed dependencies (don't modify)
├── .next/               # Next.js build files (auto-generated)
├── pages/               # Your code
├── styles/              # Your code
├── server/              # Your code
├── package.json         # Project config
└── package-lock.json    # Locked versions
```

### Common Issues & Solutions

**Issue 1: Port Already in Use**
```bash
Error: listen EADDRINUSE: address already in use :::5000

# Solution: Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Then restart server
node server/index.js
```

**Issue 2: Cannot find module**
```bash
Error: Cannot find module 'express'

# Solution: Install dependencies
npm install
```

**Issue 3: CORS Error**
```
Access to fetch at 'http://localhost:5000/api/banks' has been blocked by CORS policy

# Solution: Check CORS middleware in server/index.js
app.use(cors());  // Should be present
```

---

## 11. Interview Questions & Answers

### Basic Questions

**Q1: What is your project about?**

**Answer:**  
"I've built a Banking Scheme Guidance System that helps users find suitable banking schemes based on their eligibility criteria. It covers 5 major Indian banks - SBI, PNB, HDFC, ICICI, and Axis Bank - with 30 different schemes. The system uses a rule-based approach with if-else logic to filter schemes according to user's age, income, occupation, and savings goals. The frontend is built with Next.js and React, while the backend uses Node.js with Express. All data is stored in a JSON file, making it simple and fast."

---

**Q2: Why did you make this project?**

**Answer:**  
"I noticed that finding the right banking scheme is confusing for many people. Banks have complex websites with information scattered across multiple pages. My system provides a centralized platform where users can input their details once and immediately see which schemes they're eligible for, along with complete application guidance, required documents, and bank contact details. It simplifies the entire process."

---

**Q3: What technologies did you use and why?**

**Answer:**  
"For frontend, I used Next.js because it provides built-in routing, fast page loads through code splitting, and is SEO-friendly. React was chosen for its component-based architecture and hooks for state management.

For backend, I used Express.js because it's lightweight, perfect for creating REST APIs, and has excellent middleware support.

For data storage, I used a JSON file instead of a database because we have only 30 static schemes that don't change frequently, making JSON faster and simpler.

For styling, I used CSS Modules to avoid class name conflicts and maintain component-scoped styling with a custom neon theme for modern UI."

---

### Technical Deep-Dive

**Q4: Explain how the filtering logic works in your backend**

**Answer:**  
"The filtering happens in the `/api/filter-schemes` POST endpoint. When a user submits their criteria, I receive their age, gender, category, income, occupation, and savings goal.

I then iterate through all schemes for the selected bank and apply six checks:

1. **Age Range**: Check if user's age falls between minAge and maxAge
2. **Gender Match**: Verify if scheme accepts user's gender or accepts 'Any'
3. **Category Check**: Ensure user's category (General/SC/ST/OBC) is in scheme's accepted categories
4. **Income Limits**: Validate user's income is within maxIncome and minIncome bounds
5. **Occupation Match**: Check if user's occupation is in accepted occupations list
6. **Best Match**: If user's savings goal matches scheme's suitableFor array, mark as bestMatch

All checks use simple if-else conditions. If any check fails, that scheme is filtered out. The matched schemes are then sorted so best matches appear first."

**Example Code:**
```javascript
if (eligibility.minAge && age < eligibility.minAge) {
  return false;  // Too young
}
if (scheme.suitableFor.includes(savingsGoal)) {
  scheme.bestMatch = true;  // Perfect match
}
```

---

**Q5: How does dynamic routing work in Next.js?**

**Answer:**  
"In Next.js, you can create dynamic routes by using square brackets in file names. I have a file called `[bankId].js` in the pages/schemes folder.

When a user visits `/schemes/SBI`, Next.js automatically extracts 'SBI' as the `bankId` parameter. I can access it using the useRouter hook:

```javascript
const router = useRouter();
const { bankId } = router.query;
```

This bankId is then used to fetch schemes specific to that bank from my API. It's cleaner than having separate files for each bank and makes the codebase more maintainable. If I add a new bank, no code changes are needed - just add data to the JSON file."

---

**Q6: What's the difference between state and props in React?**

**Answer:**  
"**State** is data that a component manages internally. It can change over time based on user interactions. I use useState hook for this. For example, in my filter page, form inputs like age and gender are stored in state:

```javascript
const [age, setAge] = useState('');
```

**Props** are data passed from parent to child component. They're read-only and cannot be changed by the child. For example, if I had a SchemeCard component, I'd pass scheme data as props:

```javascript
<SchemeCard scheme={schemeData} />
```

In my project, I mostly use state since each page manages its own data, and I use URL query parameters to pass data between pages instead of props."

---

**Q7: Explain useEffect hook with an example from your code**

**Answer:**  
"useEffect is for side effects - operations that affect things outside the component, like API calls.

In my select-bank page, I use it to fetch banks when the component first loads:

```javascript
useEffect(() => {
  fetchBanks();
}, []);
```

The empty array `[]` means this effect runs only once when component mounts, like componentDidMount in class components.

In my schemes page, I use it with dependencies:

```javascript
useEffect(() => {
  if (bankId) {
    fetchSchemes();
  }
}, [bankId]);
```

This runs whenever `bankId` changes. So if user navigates from /schemes/SBI to /schemes/PNB, it automatically fetches new data.

The dependency array is crucial - without it, the effect would run on every render, causing infinite loops if it updates state."

---

**Q8: How do you handle CORS and why is it needed?**

**Answer:**  
"CORS stands for Cross-Origin Resource Sharing. It's a browser security feature that blocks requests from one domain to another.

In my project, the frontend runs on `localhost:3000` and backend on `localhost:5000`. These are considered different origins, so browser would block the API calls.

I solved this by adding CORS middleware in my Express server:

```javascript
const cors = require('cors');
app.use(cors());
```

This tells the server to accept requests from any origin. In production, I would configure it to only accept requests from my specific frontend domain:

```javascript
app.use(cors({
  origin: 'https://myapp.com'
}));
```

This prevents other websites from making unauthorized requests to my API."

---

**Q9: Why didn't you use a database? What would change if you did?**

**Answer:**  
"I used a JSON file because:
1. We have only 30 schemes - small, static dataset
2. No user data to store (privacy-focused)
3. Faster read operations for static data
4. Simpler deployment - no database setup needed
5. Easier for teammates to understand

If I used a database like MongoDB, I would:

**Benefits:**
- Handle thousands of schemes easily
- Support user accounts and saved preferences
- Track scheme views and analytics
- Enable admin panel to add/update schemes dynamically
- Better for concurrent user access

**Changes needed:**
```javascript
// Instead of:
const schemesData = require('./data/schemes.json');

// Would do:
const Scheme = require('./models/Scheme');
const schemes = await Scheme.find({ bankId: 'SBI' });
```

For this educational project, JSON is perfect. For a production app serving lakhs of users, I'd definitely use a database."

---

**Q10: How did you implement the Best Match feature?**

**Answer:**  
"Best Match is when a user's savings goal aligns perfectly with what a scheme is designed for.

**Backend logic:**
After filtering eligible schemes, I check each scheme's `suitableFor` array:

```javascript
filteredSchemes.forEach(scheme => {
  if (scheme.suitableFor && scheme.suitableFor.includes(savingsGoal)) {
    scheme.bestMatch = true;
  }
});
```

For example, if user selects 'Retirement' as goal:
- SBI WECARE (suitableFor: ['Savings', 'Retirement']) → bestMatch = true
- SBI Student Plus (suitableFor: ['Education']) → bestMatch = false

Then I sort arrays: best matches first:
```javascript
filteredSchemes.sort((a, b) => {
  if (a.bestMatch && !b.bestMatch) return -1;
  return 0;
});
```

**Frontend display:**
1. Apply special CSS class with pink border
2. Show animated star badge: ⭐ Best Match
3. Add checkmark ✓ next to matching goal tag

This helps users quickly identify the most suitable scheme without reading everything."

---

### Problem-Solving Questions

**Q11: What was the biggest challenge you faced?**

**Answer:**  
"The biggest challenge was getting real scheme data. Initially, I tried web scraping official bank websites, but:
- Most content was in Hindi
- Scheme details were in nested PDFs
- Complex navigation structures
- Data not in structured format

I spent 2 days on this before realizing it wasn't practical for this project timeframe.

**Solution:** I pivoted to creating realistic representative data based on publicly known scheme types. I researched common banking products - senior citizen accounts, women's schemes, student accounts, SC/ST schemes, farmer accounts - and structured them properly with all necessary fields like eligibility criteria, application process, and contact details.

This approach actually worked better because:
- Data is clean and structured
- All schemes follow same format (consistency)
- Easy to demonstrate filtering logic
- I could focus on building a great user experience

I documented all limitations in the About page and added disclaimers that users should verify with official sources."

---

**Q12: If you had more time, what would you add?**

**Answer:**  
"I would add:

1. **User Accounts** - Let users save favorite schemes, track applications, get personalized recommendations

2. **Scheme Comparison** - Select multiple schemes and see side-by-side comparison of interest rates, benefits, eligibility

3. **Document Checklist** - Interactive checklist where users can mark which documents they have ready

4. **Multi-Language Support** - Add Hindi, Tamil, Telugu using i18next library since many users prefer regional languages

5. **Notifications** - Email/SMS alerts when new schemes are added matching user's profile

6. **Bank Branch Locator** - Integration with Google Maps API to find nearest bank branch

7 **Live Chat** - Chatbot for quick queries about schemes using predefined Q&A, not AI

8. **Application Tracking** - Users could track their account opening status

9. **Mobile App** - React Native version for better mobile experience

10. **Admin Panel** - For updating schemes, managing content without touching code"

---

**Q13: How would you scale this application?**

**Answer:**  
"Currently it's designed for moderate traffic. To scale for lakhs of users:

**1. Database Migration**
- Move from JSON to MongoDB/PostgreSQL
- Implement database indexing on bankId, eligibility fields
- Use read replicas for heavy read operations

**2. Caching Layer**
- Add Redis for frequently accessed schemes
- Cache API responses for common queries
- Reduce database load by 70-80%

**3. Load Balancing**
- Deploy multiple server instances
- Use NGINX or AWS ALB to distribute traffic
- Handle 1000+ concurrent users

**4. CDN for Static Assets**
- Serve CSS, images from CDN (CloudFlare/AWS CloudFront)
- Reduce server load and improve page speed globally

**5. API Rate Limiting**
- Prevent abuse with rate limits (100 requests per IP per 15 min)
- Use express-rate-limit middleware

**6. Monitoring & Logging**
- Add APM tools (New Relic, Datadog)
- Log API errors and response times
- Set up alerts for downtime

**7. Database Optimization**
```javascript
// Add indexes
db.schemes.createIndex({ bankId: 1 });
db.schemes.createIndex({ 'eligibility.minAge': 1 });

// Pagination for large results
const schemes = await Scheme.find()
  .skip((page - 1) * 20)
  .limit(20);
```

**8. Horizontal Scaling**
- Deploy on Kubernetes
- Auto-scale pods based on CPU/memory usage
- Handle traffic spikes automatically"

---

**Q14: How do you handle security in your application?**

**Answer:**  
"Current security measures:

1. **No Data Storage** - We don't store user personal information, eliminating major security risk

2. **CORS Protection** - Only allow requests from specific origins in production

3. **Input Validation** - Age, income validated on both frontend (HTML5) and backend

4. **HTTPS in Production** - All data encrypted in transit

**Additional measures for production:**

1. **Input Sanitization**
```javascript
const sanitize = require('mongo-sanitize');
const age = sanitize(req.body.age);  // Prevent NoSQL injection
```

2. **Rate Limiting**
```javascript
const rateLimit = require('express-rate-limit');
app.use('/api/', rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 100  // 100 requests per IP
}));
```

3. **Helmet.js** - Sets secure HTTP headers
```javascript
const helmet = require('helmet');
app.use(helmet());
```

4. **Environment Variables** - Store sensitive data
```javascript
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DATABASE_URL;
```

5. **API Authentication** - If adding user accounts
```javascript
const jwt = require('jsonwebtoken');
// Verify JWT tokens for protected routes
```

6. **SQL Injection Prevention** - If using SQL database
- Use parameterized queries
- Never concatenate user input in SQL

7. **XSS Protection** - React automatically escapes output, but for user-generated content:
```javascript
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
```"

---

**Q15: Explain your code structure and why you organized it that way**

**Answer:**  
"I followed Next.js conventions and best practices:

**`/pages` folder** - Each file is auto-routed:
- `index.js` → `/` (home page)
- `about.js` → `/about`
- `schemes/[bankId].js` → `/schemes/:bankId` (dynamic)

This makes routing intuitive - just look at file structure to understand URLs.

**`/styles` folder** - CSS Modules:
- One CSS file per page component
- Scoped styles prevent conflicts
- Named clearly: `Home.module.css`, `Filter.module.css`

**`/server` folder** - Backend completely separate:
- `index.js` - API server
- `data/schemes.json` - Data layer
- Clear separation of concerns

**Benefits of this structure:**
1. **Easy to navigate** - Developers know where to find code
2. **Scalable** - Can easily add new pages/routes
3. **Maintainable** - Each file has single responsibility
4. **Collaborative** - Multiple people can work without conflicts

**If project grew bigger, I'd refactor to:**
```
/components
  /SchemeCard
    SchemeCard.js
    SchemeCard.module.css
  /FilterForm
    FilterForm.js
    FilterForm.module.css

/hooks
  useSchemes.js
  useFilter.js

/utils
  formatters.js
  validators.js

/api (custom API layer)
  schemes.js
  banks.js
```

This component-based approach would make code more reusable."

---

### Behavioral Questions

**Q16: How did you test your application?**

**Answer:**  
"I used manual testing throughout development:

**1. Frontend Testing:**
- Tested each page in browser (Chrome DevTools)
- Verified responsive design on different screen sizes
- Tested user flows: Home → Select Bank → Schemes → Filter → Results
- Checked error states (no internet, invalid input)

**2. API Testing:**
Used curl and Postman:
```bash
# Test banks endpoint
curl http://localhost:5000/api/banks

# Test filter with different criteria
curl -X POST http://localhost:5000/api/filter-schemes \
  -H "Content-Type: application/json" \
  -d '{"bankId":"SBI","age":65,...}'
```

**3. Edge Cases:**
- Age = 0, 150 (boundary testing)
- Empty form submissions
- Invalid bank IDs
- Network failures

**4. Cross-browser:**
- Tested on Chrome, Firefox, Safari
- Checked mobile browsers

**If I had more time, I'd add:**

**Unit Tests (Jest):**
```javascript
test('filters schemes by age correctly', () => {
  const schemes = filterByAge(65, mockSchemes);
  expect(schemes.every(s => s.minAge <= 65)).toBe(true);
});
```

**Integration Tests (Supertest):**
```javascript
const request = require('supertest');
test('GET /api/banks returns 200', async () => {
  const res = await request(app).get('/api/banks');
  expect(res.statusCode).toBe(200);
  expect(res.body.banks).toHaveLength(5);
});
```

**E2E Tests (Cypress):**
```javascript
cy.visit('/');
cy.contains('Explore Schemes').click();
cy.get('[data-testid="bank-sbi"]').click();
cy.url().should('include', '/schemes/SBI');
```"

---

**Q17: How do you debug issues in your code?**

**Answer:**  
"My debugging process:

**1. Browser DevTools:**
- Console tab for JavaScript errors
- Network tab to check API calls (status codes, response data)
- Elements tab to inspect CSS
- React DevTools to check component state and props

**2. Console logging:**
```javascript
console.log('Age:', age);
console.log('Filtered schemes:', filteredSchemes);
console.error('API Error:', error);
```

**3. Backend debugging:**
- Check terminal for server errors
- Add console.logs in API endpoints
- Verify JSON file is being read correctly

**4. Systematic approach:**
- Read error message carefully
- Identify which component/function has the issue
- Check if it's frontend (UI) or backend (API) problem
- Use console.log to trace data flow
- Fix and test

**Example real issue I faced:**
- **Problem:** Filtered results not displaying
- **Debug steps:**
  1. Checked Network tab - API returned 200 OK
  2. Console logged response data - it was there
  3. Checked if `setResults()` was called - yes
  4. Inspected component state - results was set correctly
  5. Found issue: conditional rendering logic was wrong
  ```javascript
  // Wrong:
  {results && results.schemes.length > 0 && ...}
  // Fixed:
  {results && results.schemes && results.schemes.length > 0 && ...}
  ```

**Tools I'd use in production:**
- Sentry for error tracking
- LogRocket for session replay
- New Relic for performance monitoring"

---

**Q18: What did you learn from this project?**

**Answer:**  
"Major learnings:

**1. Full-Stack Development:**
- How frontend and backend communicate via REST APIs
- Managing state in React
- Handling asynchronous operations with async/await

**2. Real-World Constraints:**
- Not all data is easily accessible (web scraping limitations)
- Need to pivot when original plan doesn't work
- Importance of documentation and data structure

**3. User Experience:**
- Helper text makes forms less intimidating
- Visual feedback (loading spinners, hover effects) is crucial
- Best match highlighting helps users make decisions faster

**4. Code Organization:**
- File structure matters for maintainability
- CSS Modules prevent styling conflicts
- Separating concerns (frontend/backend) makes code cleaner

**5. Technical Skills:**
- Next.js routing and file-based system
- Express middleware and API design
- CSS animations and responsive design
- JSON data manipulation

**6. Problem-Solving:**
- Breaking complex features into smaller tasks
- Finding alternative solutions when stuck
- Importance of testing edge cases

**7. Project Management:**
- Setting realistic scope (30 schemes, not 300)
- Documentation is as important as code
- Regular commits and version control

This project gave me confidence in building full-stack applications from scratch and deploying them end-to-end."

---

### Quick-Fire Questions

**Q19: What's the difference between GET and POST?**

**Answer:**  
"**GET:**
- Retrieves data from server
- Data sent in URL (query parameters)
- Can be cached and bookmarked
- Used for: Fetching banks list, getting schemes

Example: `GET /api/schemes/SBI`

**POST:**
- Sends data to server for processing
- Data sent in request body
- Cannot be cached
- Used for: Filtering schemes with multiple criteria

Example: `POST /api/filter-schemes` with body `{age: 30, ...}`

In my project, I use GET for simple data retrieval and POST for filtering because filter criteria is complex and shouldn't be in URL for privacy."

---

**Q20: What is React's Virtual DOM?**

**Answer:**  
"Virtual DOM is a lightweight copy of the actual DOM kept in memory. 

**How it works:**
1. When state changes, React creates new Virtual DOM
2. Compares new Virtual DOM with previous one (diffing)
3. Calculates minimal changes needed
4. Updates only changed parts in real DOM

**Benefits:**
- Faster than manipulating real DOM directly
- Batch updates - multiple changes in one rerender
- Automatic optimization

**Example from my project:**
```javascript
// State update
setSchemes(newSchemes);  // React triggers rerender

// React compares:
// Old Virtual DOM: 2 scheme cards
// New Virtual DOM: 6 scheme cards
// Real DOM update: Adds only 4 new cards, keeps existing 2
```

Manual DOM updates would require:
```javascript
document.getElementById('schemes').innerHTML = '';  // Remove all
schemes.forEach(s => {
  // Recreate all 6 cards from scratch
});
```

Virtual DOM makes React much more efficient."

---

**Q21: Explain async/await with an example**

**Answer:**  
"async/await makes asynchronous code look synchronous and easier to read.

**Without async/await (Promises):**
```javascript
fetch('http://localhost:5000/api/banks')
  .then(response => response.json())
  .then(data => {
    setBanks(data.banks);
  })
  .catch(error => {
    console.error(error);
  });
```

**With async/await:**
```javascript
const fetchBanks = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/banks');
    const data = await response.json();
    setBanks(data.banks);
  } catch (error) {
    console.error(error);
  }
};
```

**Key points:**
- `async` keyword makes function return a Promise
- `await` pauses execution until Promise resolves
- Must use `try-catch` for error handling
- Code is sequential and easier to debug

**Multiple API calls:**
```javascript
// Sequential (slower)
const banks = await fetch('/api/banks');
const schemes = await fetch('/api/schemes/SBI');

// Parallel (faster)
const [banks, schemes] = await Promise.all([
  fetch('/api/banks'),
  fetch('/api/schemes/SBI')
]);
```

In my project, all API calls use async/await because it's more readable than promise chains."

---

**Q22: What's the difference between CSS Grid and Flexbox?**

**Answer:**  
"**Flexbox:**
- One-dimensional (row OR column)
- Good for: Navigation bars, button groups
- Used in my project for: Header with back button and title side-by-side

```css
.header {
  display: flex;
  justify-content: space-between;  /* Space between items */
  align-items: center;  /* Vertical center */
}
```

**CSS Grid:**
- Two-dimensional (rows AND columns)
- Good for: Card layouts, complex page layouts
- Used in my project for: Scheme cards grid

```css
.schemesGrid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}
```

This automatically creates as many columns as fit, each at least 350px wide.

**When to use:**
- Flexbox for one-direction layouts
- Grid for two-direction layouts
- Can use both together (Grid for page, Flex inside cards)"

---

**Q23: What are middleware functions in Express?**

**Answer:**  
"Middleware functions run BEFORE route handlers. They have access to request (req), response (res), and next function.

**Syntax:**
```javascript
app.use((req, res, next) => {
  // Do something
  next();  // Pass to next middleware
});
```

**In my project:**

1. **CORS Middleware:**
```javascript
app.use(cors());
// Adds CORS headers to all responses
```

2. **JSON Parser:**
```javascript
app.use(express.json());
// Parses JSON request bodies
// Without this, req.body would be undefined
```

**Flow:**
```
Request
  ↓
CORS middleware (adds headers)
  ↓
JSON parser (parses body)
  ↓
Route handler (your code)
  ↓
Response
```

**Custom middleware example:**
```javascript
// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Auth middleware
const checkAuth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Not authorized' });
  }
  next();
};

// Use on specific route
app.get('/api/admin', checkAuth, (req, res) => {
  // Only runs if checkAuth passes
});
```

Middleware is like a chain of functions that process requests in order."

---

**Q24: Explain package.json**

**Answer:**  
"package.json is project metadata and configuration file.

**Key sections in my project:**

```json
{
  "name": "agentic-ai-bank",
  "version": "1.0.0",
  "description": "Banking Scheme Guidance System",
  
  "scripts": {
    "dev": "next dev",          // npm run dev
    "build": "next build",      // npm run build
    "start": "next start"       // npm start
  },
  
  "dependencies": {
    "next": "14.1.0",          // Production dependencies
    "react": "18.2.0",
    "express": "4.18.2",
    "cors": "2.8.5"
  },
  
  "devDependencies": {
    // Development only packages (testing tools, etc.)
  }
}
```

**Key concepts:**

1. **Dependencies vs DevDependencies:**
   - dependencies: Needed in production
   - devDependencies: Only for development (testing, building)

2. **Version Numbers:** `"react": "18.2.0"`
   - Major.Minor.Patch
   - ^18.2.0 = any 18.x.x version (compatible updates)
   - ~18.2.0 = any 18.2.x version (patch updates only)

3. **Scripts:** Custom commands
   ```bash
   npm run dev  # Runs "next dev"
   ```

4. **package-lock.json:**
   - Locks exact versions of all dependencies
   - Ensures same versions on all machines
   - Never edit manually

**Common commands:**
```bash
npm install           # Install all dependencies
npm install express   # Add new dependency
npm uninstall cors    # Remove dependency
npm update            # Update dependencies
```"

---

### Conceptual Understanding

**Q25: What makes your code maintainable?**

**Answer:**  
"Several practices make my code maintainable:

**1. Clear File Structure:**
```
pages/index.js          // Home page
pages/select-bank.js    // Bank selection
styles/Home.module.css  // Corresponding styles
```
Anyone can find relevant code quickly.

**2. Descriptive Naming:**
```javascript
// Good:
const fetchSchemes = async () => {};
const handleBankSelect = (bankId) => {};

// Bad:
const getData = async () => {};
const click = (id) => {};
```

**3. Component Separation:**
Each page handles one responsibility:
- select-bank.js → Only bank selection
- filter.js → Only form and criteria
- results.js → Only displaying filtered results

**4. Consistent Patterns:**
All API calls follow same structure:
```javascript
try {
  setLoading(true);
  const response = await fetch(...);
  const data = await response.json();
  setData(data);
} catch (error) {
  setError('...');
} finally {
  setLoading(false);
}
```

**5. Comments Where Needed:**
```javascript
// Filter schemes by eligibility criteria
// 1. Check age range
// 2. Verify gender
// 3. Validate category
```

**6. CSS Variables:**
```css
:root {
  --neon-cyan: #00f3ff;
}
/* Change color once, updates everywhere */
```

**7. Modular Code:**
```javascript
// Reusable function
const formatBankName = (id) => {
  // Can be used in multiple components
};
```

**8. Error Handling:**
Every API call has try-catch
Every form has validation

**Benefits:**
- New team member can understand code quickly
- Easy to add new features
- Easy to find and fix bugs
- Can reuse code components"

---

**Q26: How would you add user authentication?**

**Answer:**  
"I would implement JWT (JSON Web Token) based authentication:

**1. User Registration:**
```javascript
// Frontend
const handleRegister = async (email, password) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  const { token } = await response.json();
  localStorage.setItem('token', token);
};

// Backend
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user to database
  const user = await User.create({ email, password: hashedPassword });
  
  // Create JWT token
  const token = jwt.sign({ userId: user.id }, 'secret_key', { expiresIn: '7d' });
  
  res.json({ token });
});
```

**2. Protected Routes:**
```javascript
// Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }
  
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

// Protected endpoint
app.post('/api/save-favorite', authenticateToken, async (req, res) => {
  // req.userId available here
  const userId = req.userId;
  // Save favorite scheme
});
```

**3. Frontend Authorization:**
```javascript
// Store token
localStorage.setItem('token', token);

// Send with requests
const response = await fetch('/api/save-favorite', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Protected routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Redirect to="/login" />;
  }
  return children;
};
```

**4. Features enabled:**
- Save favorite schemes
- Track application status
- Personalized recommendations
- View application history

**Security considerations:**
- Use HTTPS in production
- Store token securely (httpOnly cookies better than localStorage)
- Implement token refresh mechanism
- Hash passwords with bcrypt
- Rate limit login attempts
- Add email verification"

---

## Final Tips for Interview

### Dos:
✅ Explain your thought process  
✅ Mention trade-offs and alternatives  
✅ Connect code to real-world use cases  
✅ Be honest if you don't know something  
✅ Show enthusiasm for learning  
✅ Ask clarifying questions  
✅ Use diagrams/code examples when explaining  

### Don'ts:
❌ Memorize answers word-for-word  
❌ Overcomplicate simple explanations  
❌ Say "I don't know" without trying  
❌ Criticize technologies without reason  
❌ Rush through explanations  
❌ Ignore edge cases  

### Example Strong Answer Pattern:

**Question:** "How does your application work?"

**Weak answer:** "It shows banking schemes."

**Strong answer:**  
"It's a full-stack web application with Next.js frontend and Express backend. User flows: First, they select a bank from 5 options. Then they can either browse all schemes or use our filter to find schemes matching their criteria - age, income, occupation, etc. The backend applies rule-based logic using if-else conditions to filter schemes. Matched schemes are sorted to show best matches first - where their savings goal aligns with scheme purpose. Finally, clicking any scheme shows complete details: application process, required documents, and bank contact info. The entire system is privacy-focused - no user data is stored. All 30 schemes are from real Indian banks based on publicly available information."

See the difference? The strong answer:
- Mentions tech stack upfront
- Describes complete user journey
- Explains key features (filtering, best match)
- Highlights important aspects (privacy, real data)
- Shows understanding of full system

---

## Conclusion

This documentation covers:
✅ Complete project overview  
✅ Every file explained in detail  
✅ Code snippets with explanations  
✅ Tech stack justifications  
✅ Data flow and architecture  
✅ Styling system  
✅ Common interview questions  
✅ Problem-solving discussions  

**Remember:** Interviews test not just what you built, but:
- How you think about problems
- Why you made specific choices
- What you learned
- How you'd improve it

**Your project strengths:**
- Full-stack implementation
- Real-world problem solving
- Clean code structure
- Modern tech stack
- Complete user experience
- Privacy-focused design
- Well-documented

Good luck with your interview! 🚀

---

**Document created by:** GitHub Copilot  
**Date:** February 8, 2026  
**Project:** Banking Scheme Guidance System  
**Version:** 1.0
