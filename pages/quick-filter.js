import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Filter.module.css';

export default function QuickFilter() {
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    purpose: 'Home Loans',
    loanAmount: ''
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Education Loans',
    'Home Loans',
    'Personal Loans',
    'MSME / Business Loans',
    'Agriculture Loans',
    'Government-backed schemes',
    'Fixed Deposits',
    'Savings Accounts'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.age || formData.age < 18 || formData.age > 100) {
        throw new Error('Age must be between 18 and 100');
      }

      if (!formData.income || formData.income < 0) {
        throw new Error('Please enter valid annual income');
      }

      const response = await fetch('/api/filter-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          age: parseInt(formData.age),
          income: parseInt(formData.income),
          purpose: formData.purpose,
          loanAmount: formData.loanAmount ? parseInt(formData.loanAmount) : 0
        })
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to filter schemes');
      }

      setResults(data.schemes);
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Find Your Perfect Scheme - Banking Scheme Finder</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <Link href="/">
            <button className={styles.backButton}>← Back to Home</button>
          </Link>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <h1 className={styles.title}>
                Find Your <span className={styles.neonText}>Perfect Scheme</span>
              </h1>
              <p className={styles.subtitle}>
                Answer a few simple questions to discover schemes tailored just for you
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {error && <div className={styles.errorBox}>{error}</div>}

              {/* Age Field */}
              <div className={styles.formGroup}>
                <label htmlFor="age">
                  Your Age <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age (18-100)"
                  min="18"
                  max="100"
                  required
                />
              </div>

              {/* Income Field */}
              <div className={styles.formGroup}>
                <label htmlFor="income">
                  Annual Income (₹) <span className={styles.required}>*</span>
                </label>
                <input
                  type="number"
                  id="income"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  placeholder="Enter annual income in rupees"
                  min="0"
                  step="10000"
                  required
                />
              </div>

              {/* Purpose/Category Field */}
              <div className={styles.formGroup}>
                <label htmlFor="purpose">
                  What are you looking for? <span className={styles.required}>*</span>
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Loan Amount Field (Optional) */}
              <div className={styles.formGroup}>
                <label htmlFor="loanAmount">
                  Desired Loan Amount (₹) <span className={styles.optional}>(Optional)</span>
                </label>
                <input
                  type="number"
                  id="loanAmount"
                  name="loanAmount"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  placeholder="Enter loan amount (optional)"
                  min="0"
                  step="100000"
                />
              </div>

              <button type="submit" disabled={loading} className={styles.submitButton}>
                {loading ? '🔍 Searching...' : '🔍 Find Schemes'}
              </button>
            </form>

            {/* Results Display */}
            {results && results.length > 0 && (
              <div className={styles.results}>
                <h2>Found {results.length} Matching Scheme{results.length !== 1 ? 's' : ''}</h2>
                <div className={styles.schemesList}>
                  {results.map(scheme => (
                    <div key={scheme.id} className={styles.schemeCard}>
                      <div className={styles.schemeHeader}>
                        <h3>{scheme.scheme_name}</h3>
                        <span className={styles.matchScore}>
                          {scheme.matchScore}% Match
                        </span>
                      </div>
                      <p className={styles.bank}>{scheme.bank_name}</p>
                      <div className={styles.schemeDetails}>
                        <p><strong>Interest Rate:</strong> {scheme.interest_rate_range}</p>
                        <p><strong>Loan Amount:</strong> ₹{new Intl.NumberFormat('en-IN').format(scheme.loan_amount_min)} - ₹{new Intl.NumberFormat('en-IN').format(scheme.loan_amount_max)}</p>
                        <p><strong>Tenure:</strong> {scheme.repayment_tenure}</p>
                      </div>
                      <a 
                        href={scheme.official_website_reference} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles.applyButton}
                      >
                        Learn More →
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results && results.length === 0 && (
              <div className={styles.noResults}>
                <p>😕 No schemes found matching your criteria.</p>
                <p>Try adjusting your filters and search again.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
