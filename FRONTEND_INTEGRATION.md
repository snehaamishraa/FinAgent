# Frontend Integration Guide

Connect your React/Next.js components to the production-ready API endpoints.

## Overview

The backend provides 7 REST endpoints. This guide shows how to integrate them into your frontend components.

---

## 1. Simple API Client

Create `lib/apiClient.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const apiClient = {
  async health() {
    const res = await fetch(`${API_BASE_URL}/health`);
    return res.json();
  },

  async getBanks() {
    const res = await fetch(`${API_BASE_URL}/banks`);
    return res.json();
  },

  async getCategories() {
    const res = await fetch(`${API_BASE_URL}/categories`);
    return res.json();
  },

  async getSchemes(filters = {}) {
    const params = new URLSearchParams();
    if (filters.category) params.append('category', filters.category);
    if (filters.bank) params.append('bank', filters.bank);
    if (filters.limit) params.append('limit', filters.limit);

    const res = await fetch(`${API_BASE_URL}/schemes?${params}`);
    return res.json();
  },

  async getSchemeById(id) {
    const res = await fetch(`${API_BASE_URL}/schemes/${id}`);
    return res.json();
  },

  async filterSchemes(criteria) {
    const res = await fetch(`${API_BASE_URL}/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(criteria)
    });
    return res.json();
  },

  async compareSchemes(schemeIds) {
    const res = await fetch(`${API_BASE_URL}/compare`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ schemeIds })
    });
    return res.json();
  }
};
```

---

## 2. Hook for API Calls

Create `hooks/useApi.js`:

```javascript
import { useState, useEffect } from 'react';

export function useApi(apiFunction, params, autoFetch = true) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...(Array.isArray(params) ? params : [params]));
      if (result.success === false) {
        throw new Error(result.error || 'API Error');
      }
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch data');
      console.error('API Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetch();
    }
  }, []);

  return { data, loading, error, refetch: fetch };
}
```

---

## 3. Use in Components

### Example 1: List All Banks

**pages/select-bank.js:**

```javascript
import { apiClient } from '../lib/apiClient';
import { useApi } from '../hooks/useApi';
import styles from '../styles/SelectBank.module.css';

export default function SelectBankPage() {
  const { data, loading, error } = useApi(apiClient.getBanks);

  if (loading) return <div className={styles.loading}>Loading banks...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <h1>Select a Bank</h1>
      <div className={styles.banksGrid}>
        {data?.data?.map(bank => (
          <button key={bank} className={styles.bankCard}>
            {bank}
          </button>
        ))}
      </div>
    </div>
  );
}
```

---

### Example 2: Filter Schemes (Main Feature)

**pages/filter.js:**

```javascript
import { useState } from 'react';
import { apiClient } from '../lib/apiClient';
import Link from 'next/link';
import styles from '../styles/Filter.module.css';

export default function FilterPage() {
  const [criteria, setCriteria] = useState({
    age: 28,
    income: 500000,
    purpose: 'Home Loans',
    loanAmount: 2000000,
    limit: 10
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria(prev => ({
      ...prev,
      [name]: name === 'income' || name === 'loanAmount' || name === 'age' || name === 'limit' 
        ? parseInt(value) 
        : value
    }));
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.filterSchemes(criteria);
      
      if (!response.success) {
        throw new Error(response.error || 'Filter failed');
      }

      setResults(response);
      console.log(`Found ${response.matchedSchemes} matching schemes`);
    } catch (err) {
      setError(err.message);
      console.error('Filter error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Find Banking Schemes</h1>

      <form className={styles.form} onSubmit={handleFilter}>
        <div className={styles.inputGroup}>
          <label>Your Age</label>
          <input
            type="number"
            name="age"
            value={criteria.age}
            onChange={handleInputChange}
            min="18"
            max="75"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Annual Income (₹)</label>
          <input
            type="number"
            name="income"
            value={criteria.income}
            onChange={handleInputChange}
            min="0"
            step="10000"
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Loan Purpose</label>
          <select name="purpose" value={criteria.purpose} onChange={handleInputChange}>
            <option>Education Loans</option>
            <option>Home Loans</option>
            <option>Personal Loans</option>
            <option>MSME/Business Loans</option>
            <option>Agriculture Loans</option>
            <option>Government-backed Schemes</option>
            <option>Fixed Deposits</option>
            <option>Savings Accounts</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Loan Amount (₹)</label>
          <input
            type="number"
            name="loanAmount"
            value={criteria.loanAmount}
            onChange={handleInputChange}
            min="0"
            step="100000"
          />
        </div>

        <button type="submit" disabled={loading} className={styles.submitButton}>
          {loading ? 'Searching...' : 'Find Schemes'}
        </button>
      </form>

      {error && <div className={styles.error}>{error}</div>}

      {results && (
        <div className={styles.results}>
          <h2>Found {results.matchedSchemes} Matching Schemes</h2>

          {results.schemes.length === 0 ? (
            <p>No schemes found matching your criteria. Try adjusting your inputs.</p>
          ) : (
            <div className={styles.schemesList}>
              {results.schemes.map(scheme => (
                <div key={scheme.id} className={styles.schemeCard}>
                  <div className={styles.header}>
                    <h3>{scheme.scheme_name}</h3>
                    <span className={styles.matchScore}>{scheme.matchScore}% Match</span>
                  </div>

                  <div className={styles.details}>
                    <p><strong>Bank:</strong> {scheme.bank_name}</p>
                    <p><strong>Category:</strong> {scheme.scheme_category}</p>
                    <p><strong>Interest Rate:</strong> {scheme.interest_rate_range}</p>
                    <p><strong>Loan Amount:</strong> ₹{scheme.loan_amount_min} - ₹{scheme.loan_amount_max}</p>
                    <p><strong>Tenure:</strong> {scheme.repayment_tenure}</p>
                  </div>

                  <Link href={`/scheme-details?id=${scheme.id}`}>
                    <button className={styles.detailsButton}>View Details</button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

### Example 3: Scheme Details Page

**pages/scheme-details.js:**

```javascript
import { useRouter } from 'next/router';
import { apiClient } from '../lib/apiClient';
import { useApi } from '../hooks/useApi';
import styles from '../styles/SchemeDetails.module.css';

export default function SchemeDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: scheme, loading, error } = useApi(
    () => apiClient.getSchemeById(id),
    null,
    !!id  // Auto-fetch only when id is available
  );

  if (!id) return <div>Loading...</div>;
  if (loading) return <div className={styles.loading}>Loading scheme details...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  const schemeData = scheme?.data;

  return (
    <div className={styles.container}>
      <h1>{schemeData?.scheme_name}</h1>
      <p className={styles.bank}>{schemeData?.bank_name}</p>

      <div className={styles.section}>
        <h2>About</h2>
        <p>{schemeData?.description}</p>
      </div>

      <div className={styles.section}>
        <h2>Financial Terms</h2>
        <ul>
          <li><strong>Interest Rate:</strong> {schemeData?.interest_rate_range}</li>
          <li><strong>Loan Amount:</strong> ₹{schemeData?.loan_amount_min} - ₹{schemeData?.loan_amount_max}</li>
          <li><strong>Repayment Tenure:</strong> {schemeData?.repayment_tenure}</li>
          <li><strong>Processing Fee:</strong> {schemeData?.processing_fee}</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Eligibility</h2>
        <ul>
          {schemeData?.eligibility_criteria?.map((criterion, idx) => (
            <li key={idx}>{criterion}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Key Features</h2>
        <ul>
          {schemeData?.key_features?.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Pros</h2>
        <ul>
          {schemeData?.pros?.map((pro, idx) => (
            <li key={idx}>{pro}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Cons</h2>
        <ul>
          {schemeData?.cons?.map((con, idx) => (
            <li key={idx}>{con}</li>
          ))}
        </ul>
      </div>

      <div className={styles.section}>
        <h2>Required Documents</h2>
        <ul>
          {schemeData?.required_documents?.map((doc, idx) => (
            <li key={idx}>{doc}</li>
          ))}
        </ul>
      </div>

      <div className={styles.actions}>
        <button className={styles.primary} onClick={() => window.open(schemeData?.official_website_reference)}>
          Visit Official Website
        </button>
        <button className={styles.secondary} onClick={() => router.back()}>
          Back
        </button>
      </div>
    </div>
  );
}
```

---

### Example 4: Compare Schemes

**components/ComparisonTable.js:**

```javascript
import { useState } from 'react';
import { apiClient } from '../lib/apiClient';
import styles from '../styles/ComparisonTable.module.css';

export default function ComparisonTable({ selectedSchemeIds = [] }) {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCompare = async () => {
    if (selectedSchemeIds.length < 2 || selectedSchemeIds.length > 5) {
      setError('Select 2 to 5 schemes to compare');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.compareSchemes(selectedSchemeIds);

      if (!response.success) {
        throw new Error(response.error || 'Comparison failed');
      }

      setComparison(response.comparison);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!comparison) {
    return (
      <div>
        <button onClick={handleCompare} disabled={loading}>
          {loading ? 'Comparing...' : 'Compare Selected'}
        </button>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </div>
    );
  }

  return (
    <div className={styles.comparisonTable}>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {comparison.map(scheme => (
              <th key={scheme.id}>{scheme.scheme_name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Interest Rate</td>
            {comparison.map(scheme => (
              <td key={scheme.id}>{scheme.interest_rate_range}</td>
            ))}
          </tr>
          <tr>
            <td>Loan Amount</td>
            {comparison.map(scheme => (
              <td key={scheme.id}>₹{scheme.loan_amount_min} - ₹{scheme.loan_amount_max}</td>
            ))}
          </tr>
          <tr>
            <td>Processing Fee</td>
            {comparison.map(scheme => (
              <td key={scheme.id}>{scheme.processing_fee}</td>
            ))}
          </tr>
          <tr>
            <td>Repayment Tenure</td>
            {comparison.map(scheme => (
              <td key={scheme.id}>{scheme.repayment_tenure}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
```

---

## 4. Environment Configuration

Create `.env.local`:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api

# Development only - remove in production
DEBUG=true
```

Update `lib/apiClient.js` to use environment variable:

```javascript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';
```

---

## 5. Error Handling Best Practices

```javascript
const handleError = (err, context = '') => {
  console.error(`${context}:`, err);

  if (err.message.includes('Failed to fetch')) {
    return 'Cannot connect to server. Is it running?';
  }

  if (err instanceof TypeError) {
    return 'Network error. Check your connection.';
  }

  return err.message || 'Something went wrong';
};
```

---

## 6. Loading States

```javascript
// Show skeleton while loading
const SchemeCardSkeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.shimmer} />
  </div>
);

export function ResultsList({ schemes, loading }) {
  return (
    <div className={styles.list}>
      {loading ? (
        Array(3).fill(0).map((_, i) => <SchemeCardSkeleton key={i} />)
      ) : (
        schemes.map(scheme => <SchemeCard key={scheme.id} scheme={scheme} />)
      )}
    </div>
  );
}
```

---

## 7. Data Caching

```javascript
// Simple cache using useMemo
import { useMemo } from 'react';

export function useCachedApi(apiFunction, params, ttl = 5 * 60 * 1000) {
  const [cache, setCache] = useState({});
  const cacheKey = JSON.stringify(params);

  const cachedData = useMemo(() => {
    if (cache[cacheKey]?.timestamp > Date.now() - ttl) {
      return cache[cacheKey].data;
    }
    return null;
  }, [cache, cacheKey, ttl]);

  return cachedData;
}
```

---

## 8. Testing Integration

**__tests__/api.test.js:**

```javascript
import { apiClient } from '../lib/apiClient';

describe('API Integration', () => {
  test('should connect to health endpoint', async () => {
    const response = await apiClient.health();
    expect(response.status).toBe('ok');
  });

  test('should get banks', async () => {
    const response = await apiClient.getBanks();
    expect(response.data).toBeDefined();
    expect(Array.isArray(response.data)).toBe(true);
  });

  test('should filter schemes', async () => {
    const response = await apiClient.filterSchemes({
      age: 28,
      income: 600000,
      purpose: 'Home Loans'
    });

    expect(response.success).toBe(true);
    expect(Array.isArray(response.schemes)).toBe(true);
  });
});

```

---

## 9. Common Integration Patterns

### Pattern 1: Fetch on Mount

```javascript
useEffect(() => {
  fetchData();
}, []); // Run once on mount
```

### Pattern 2: Fetch on Dependency Change

```javascript
useEffect(() => {
  fetchData(selectedCategory);
}, [selectedCategory]); // Run when selectedCategory changes
```

### Pattern 3: Debounced Search

```javascript
import { useCallback, useRef } from 'react';

export function useDebounce(callback, delay) {
  const timeoutRef = useRef();

  return useCallback((...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => callback(...args), delay);
  }, [callback, delay]);
}

// Usage
const debouncedFilter = useDebounce(filterSchemes, 500);
```

---

## 10. Production Deployment Notes

### Update Environment for Production

```bash
# .env.local (production)
NEXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

### Configure CORS on Backend

Update `server/index.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://yourdomain.com',
    'https://www.yourdomain.com'
  ]
}));
```

### Add Request Timeout

```javascript
const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
};
```

---

## ✅ Integration Checklist

- [ ] Created `lib/apiClient.js` with all 7 endpoint wrappers
- [ ] Created `hooks/useApi.js` for API state management
- [ ] Updated `pages/filter.js` to use POST /api/filter
- [ ] Updated `pages/scheme-details.js` to use GET /api/schemes/:id
- [ ] Created comparison component using POST /api/compare
- [ ] Added error handling and loading states
- [ ] Tested all components with backend running
- [ ] Verified CORS configuration
- [ ] Set environment variables
- [ ] Tested with `npm run test` from backend

---

## 🚀 Ready to Deploy?

Once integration is complete:

1. Run full test suite: `npm run test`
2. Verify all API calls work: `npm run filter:example`
3. Build frontend: `npm run build`
4. Deploy with: `vercel` or `npm run start`

See [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) for deployment details.
