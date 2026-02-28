import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Results.module.css';

export default function Results() {
  const router = useRouter();
  const { bank, age, gender, category, monthlyIncome, occupation, savingsGoal } = router.query;
  
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [browseMode, setBrowseMode] = useState('filter'); // 'filter' or 'category'

  useEffect(() => {
    if (router.query.category && !bank) {
      // Category browsing mode
      setBrowseMode('category');
      filterByCategory();
    } else if (bank && age && gender && category && monthlyIncome && occupation && savingsGoal) {
      // Filter mode (from quick filter)
      setBrowseMode('filter');
      filterSchemes();
    }
  }, [router.query]);

  const parseCurrency = (amount) => {
    if (typeof amount === 'number') return amount;
    if (typeof amount !== 'string') return 0;
    return parseInt(amount.replace(/[₹,\s]/g, '')) || 0;
  };

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return '₹' + (amount / 10000000).toFixed(1) + ' Cr';
    } else if (amount >= 100000) {
      return '₹' + (amount / 100000).toFixed(1) + ' Lakh';
    } else if (amount >= 1000) {
      return '₹' + (amount / 1000).toFixed(0) + 'K';
    }
    return '₹' + amount.toLocaleString();
  };

  const formatSchemeData = (scheme) => {
    return {
      ...scheme,
      loanAmountMin: parseCurrency(scheme.loan_amount_min),
      loanAmountMax: parseCurrency(scheme.loan_amount_max),
      loanAmountFormatted: {
        min: formatCurrency(parseCurrency(scheme.loan_amount_min)),
        max: formatCurrency(parseCurrency(scheme.loan_amount_max))
      }
    };
  };

  const filterSchemes = async () => {
    try {
      const response = await fetch('/api/filter-schemes', {
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

      if (!response.ok) throw new Error('Failed to filter schemes');
      
      const data = await response.json();
      const formattedSchemes = data.schemes.map(formatSchemeData);
      setResults({ ...data, schemes: formattedSchemes });
      setLoading(false);
    } catch (err) {
      setError('Failed to load results. Please ensure the server is running.');
      setLoading(false);
    }
  };

  const filterByCategory = async () => {
    try {
      const response = await fetch('/api/filter-schemes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: router.query.category
        }),
      });

      if (!response.ok) throw new Error('Failed to filter schemes');
      
      const data = await response.json();
      const formattedSchemes = data.schemes.map(formatSchemeData);
      setResults({ ...data, schemes: formattedSchemes });
      setLoading(false);
    } catch (err) {
      setError('Failed to load results. Please ensure the server is running.');
      setLoading(false);
    }
  };

  const formatBankName = (id) => {
    const bankNames = {
      'SBI': 'State Bank of India (SBI)',
      'PNB': 'Punjab National Bank (PNB)',
      'HDFC_Bank': 'HDFC Bank',
      'ICICI_Bank': 'ICICI Bank',
      'Axis_Bank': 'Axis Bank'
    };
    return bankNames[id] || (id ? id.replace(/_/g, ' ') : '');
  };

  const handleTryAgain = () => {
    if (browseMode === 'category') {
      router.push('/select-bank');
    } else {
      router.push(`/filter?bank=${bank}`);
    }
  };

  const handleViewAllSchemes = () => {
    if (bank) {
      router.push(`/schemes/${bank}`);
    } else {
      router.push('/select-bank');
    }
  };

  return (
    <>
      <Head>
        <title>{browseMode === 'category' ? router.query.category + ' Schemes' : 'Your Matches'} - Finagent</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={handleTryAgain} className={styles.backButton}>
            ← {browseMode === 'category' ? 'Back' : 'Modify Criteria'}
          </button>
          {bank && (
            <button onClick={handleViewAllSchemes} className={styles.viewAllButton}>
              View All Schemes
            </button>
          )}
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Finding schemes...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>⚠️ {error}</p>
                <button onClick={browseMode === 'category' ? filterByCategory : filterSchemes} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && results && (
              <>
                <div className={styles.resultsHeader}>
                  <h1 className={styles.title}>
                    {browseMode === 'category' 
                      ? router.query.category 
                      : 'Your Matched Schemes'
                    }
                  </h1>
                  <p className={styles.subtitle}>
                    Found <strong>{results.schemes.length}</strong> schemes
                    {browseMode === 'filter' && results.totalSchemes && ` out of ${results.totalSchemes} available`}
                  </p>
                  
                  {browseMode === 'filter' && results.userCriteria && (
                    <div className={styles.criteriaCard}>
                      <h3>Your Eligibility Profile:</h3>
                      <div className={styles.criteriaGrid}>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Age:</span>
                          <span className={styles.criteriaValue}>{results.userCriteria.age} years</span>
                        </div>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Gender:</span>
                          <span className={styles.criteriaValue}>{results.userCriteria.gender}</span>
                        </div>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Category:</span>
                          <span className={styles.criteriaValue}>{results.userCriteria.category}</span>
                        </div>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Monthly Income:</span>
                          <span className={styles.criteriaValue}>₹{parseInt(results.userCriteria.monthlyIncome).toLocaleString()}</span>
                        </div>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Occupation:</span>
                          <span className={styles.criteriaValue}>{results.userCriteria.occupation}</span>
                        </div>
                        <div className={styles.criteriaItem}>
                          <span className={styles.criteriaLabel}>Goal:</span>
                          <span className={styles.criteriaValue}>{results.userCriteria.savingsGoal}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {results.schemes.length > 0 ? (
                  <div className={styles.schemesGrid}>
                    {results.schemes.map((scheme) => (
                      <div 
                        key={scheme.id} 
                        className={styles.schemeCard}
                      >
                        <div className={styles.schemeHeader}>
                          <div>
                            <h3>{scheme.scheme_name || scheme.name}</h3>
                            <p className={styles.bankName}>{scheme.bank_name}</p>
                          </div>
                          {scheme.scheme_category && (
                            <span className={styles.matchBadge}>{scheme.scheme_category}</span>
                          )}
                        </div>
                        
                        <div className={styles.schemeDetails}>
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>💰 Loan Amount:</span>
                            <span className={styles.detailValue}>
                              {scheme.loanAmountFormatted && scheme.loanAmountFormatted.min && scheme.loanAmountFormatted.max
                                ? `${scheme.loanAmountFormatted.min} - ${scheme.loanAmountFormatted.max}`
                                : 'Not specified'
                              }
                            </span>
                          </div>

                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>📊 Interest Rate:</span>
                            <span className={styles.detailValue}>
                              {scheme.interest_rate_range || scheme.interestRate || 'Not specified'}
                            </span>
                          </div>

                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>⏱️ Tenure:</span>
                            <span className={styles.detailValue}>
                              {scheme.repayment_tenure || scheme.tenure || '5 to 30 years'}
                            </span>
                          </div>
                        </div>

                        {scheme.description && (
                          <p className={styles.description}>{scheme.description}</p>
                        )}

                        {scheme.bestFitExplanation && scheme.bestFitExplanation.length > 0 && (
                          <div className={styles.explanations}>
                            <strong>💡 Why this fits you:</strong>
                            <ul>
                              {scheme.bestFitExplanation.map((point, idx) => (
                                <li key={idx}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <button
                          className={styles.learnMoreButton}
                          onClick={() => {
                            // only schemeId is needed; details page will locate the correct bank
                            router.push(`/scheme-details?schemeId=${scheme.id}`);
                          }}
                        >
                          Learn More Details
                          <span className={styles.arrow}>→</span>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>😔</div>
                    <h2>No Matching Schemes Found</h2>
                    <p>
                      {browseMode === 'category'
                        ? `No schemes found for ${router.query.category}`
                        : `No schemes found matching your eligibility criteria`
                      }
                    </p>
                    <div className={styles.suggestions}>
                      <h3>Try:</h3>
                      <ul>
                        <li>Adjusting your eligibility criteria</li>
                        <li>Exploring other categories</li>
                        <li>Browsing all available schemes</li>
                      </ul>
                    </div>
                    <div className={styles.noResultsActions}>
                      <button onClick={handleTryAgain} className={styles.primaryButton}>
                        {browseMode === 'category' ? 'Browse Other Categories' : 'Modify Criteria'}
                      </button>
                      <button onClick={handleViewAllSchemes} className={styles.secondaryButton}>
                        View All Schemes
                      </button>
                    </div>
                  </div>
                )}

                <div className={styles.disclaimer}>
                  <h3>⚠️ Important Disclaimer</h3>
                  <p>
                    <strong>Educational Purpose Only:</strong> This is a rule-based demonstration system. 
                    Results are informational and based on filtering logic.
                  </p>
                  <p>
                    For actual banking services, always consult with real financial institutions. 
                    Verify all scheme details, eligibility criteria, and terms directly with the bank.
                  </p>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
