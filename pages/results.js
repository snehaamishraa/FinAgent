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

  useEffect(() => {
    if (bank && age && gender && category && monthlyIncome && occupation && savingsGoal) {
      filterSchemes();
    }
  }, [bank, age, gender, category, monthlyIncome, occupation, savingsGoal]);

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
      setResults(data);
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
    router.push(`/filter?bank=${bank}`);
  };

  const handleViewAllSchemes = () => {
    router.push(`/schemes/${bank}`);
  };

  return (
    <>
      <Head>
        <title>Your Matches - Banking Scheme Guidance</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={handleTryAgain} className={styles.backButton}>
            ← Modify Criteria
          </button>
          <button onClick={handleViewAllSchemes} className={styles.viewAllButton}>
            View All Schemes
          </button>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Finding your best matches...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>⚠️ {error}</p>
                <button onClick={filterSchemes} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && results && (
              <>
                <div className={styles.resultsHeader}>
                  <h1 className={styles.title}>
                    Your <span className={styles.neonText}>Matched</span> Schemes
                  </h1>
                  <p className={styles.subtitle}>
                    Found <strong>{results.matchedSchemes}</strong> schemes matching your profile 
                    out of {results.totalSchemes} available schemes from {formatBankName(results.bank)}
                  </p>
                  
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
                </div>

                {results.schemes.length > 0 ? (
                  <div className={styles.schemesGrid}>
                    {results.schemes.map((scheme) => (
                      <div 
                        key={scheme.id} 
                        className={`${styles.schemeCard} ${scheme.bestMatch ? styles.bestMatch : ''}`}
                        onClick={() => router.push(`/scheme-details?schemeId=${scheme.id}&bankId=${bank}`)}
                        role="button"
                        tabIndex={0}
                      >
                        {scheme.bestMatch && (
                          <div className={styles.bestMatchBadge}>
                            ⭐ Best Match
                          </div>
                        )}
                        
                        <div className={styles.schemeHeader}>
                          <h3>{scheme.name}</h3>
                          <span className={styles.interest}>{scheme.interestRate}</span>
                        </div>
                        
                        <p className={styles.description}>{scheme.description}</p>
                        
                        <div className={styles.targetGroup}>
                          <strong>🎯 Target Group:</strong> {scheme.targetGroup}
                        </div>
                        
                        {scheme.suitableFor && scheme.suitableFor.length > 0 && (
                          <div className={styles.suitableFor}>
                            <strong>💡 Suitable For:</strong>
                            <div className={styles.tags}>
                              {scheme.suitableFor.map((goal, index) => (
                                <span 
                                  key={index} 
                                  className={`${styles.tag} ${
                                    goal === results.userCriteria.savingsGoal ? styles.matchedGoal : ''
                                  }`}
                                >
                                  {goal}
                                  {goal === results.userCriteria.savingsGoal && ' ✓'}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {scheme.benefits && scheme.benefits.length > 0 && (
                          <div className={styles.benefits}>
                            <strong>✨ Key Benefits:</strong>
                            <ul>
                              {scheme.benefits.map((benefit, index) => (
                                <li key={index}>{benefit}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        <div className={styles.eligibility}>
                          <strong>✓ Eligibility Details:</strong>
                          <ul>
                            {scheme.eligibility.minAge && (
                              <li>
                                Age: {scheme.eligibility.minAge}
                                {scheme.eligibility.maxAge ? ` - ${scheme.eligibility.maxAge}` : '+'} years
                              </li>
                            )}
                            {scheme.eligibility.gender !== 'Any' && (
                              <li>Gender: {scheme.eligibility.gender}</li>
                            )}
                            {scheme.eligibility.categories && 
                             scheme.eligibility.categories.length > 0 && 
                             !scheme.eligibility.categories.includes('All') && (
                              <li>Category: {scheme.eligibility.categories.join(', ')}</li>
                            )}
                            {scheme.eligibility.minIncome && (
                              <li>Min Income: ₹{scheme.eligibility.minIncome.toLocaleString()}/month</li>
                            )}
                            {scheme.eligibility.maxIncome && (
                              <li>Max Income: ₹{scheme.eligibility.maxIncome.toLocaleString()}/month</li>
                            )}
                          </ul>
                        </div>

                        <div className={styles.viewDetailsButton}>
                          Click for Complete Guide & How to Apply →
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <div className={styles.noResultsIcon}>😔</div>
                    <h2>No Matching Schemes Found</h2>
                    <p>
                      Unfortunately, we couldn't find any schemes from {formatBankName(results.bank)} 
                      that match your current eligibility criteria.
                    </p>
                    <div className={styles.suggestions}>
                      <h3>Suggestions:</h3>
                      <ul>
                        <li>Try adjusting your criteria</li>
                        <li>Explore schemes from other banks</li>
                        <li>View all available schemes to see what's offered</li>
                      </ul>
                    </div>
                    <div className={styles.noResultsActions}>
                      <button onClick={handleTryAgain} className={styles.primaryButton}>
                        Modify Criteria
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
                    Results are informational and based on simple if-else filtering logic. No AI or ML is used.
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
