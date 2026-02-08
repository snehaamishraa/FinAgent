import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Schemes.module.css';

export default function Schemes() {
  const router = useRouter();
  const { bankId } = router.query;
  const [schemes, setSchemes] = useState([]);
  const [bankName, setBankName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (bankId) {
      fetchSchemes();
    }
  }, [bankId]);

  const fetchSchemes = async () => {
    try {
      const response = await fetch(`/api/schemes/${bankId}`);
      if (!response.ok) throw new Error('Failed to fetch schemes');
      const data = await response.json();
      setSchemes(data.schemes);
      setBankName(formatBankName(data.bank));
      setLoading(false);
    } catch (err) {
      setError('Failed to load schemes. Please ensure the server is running.');
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

  const handleFilterSchemes = () => {
    router.push(`/filter?bank=${bankId}`);
  };

  return (
    <>
      <Head>
        <title>{bankName} Schemes - Banking Scheme Guidance</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => router.push('/select-bank')} className={styles.backButton}>
            ← Change Bank
          </button>
          <h2 className={styles.bankTitle}>{bankName}</h2>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <h1 className={styles.title}>
                Available <span className={styles.neonText}>Schemes</span>
              </h1>
              <p className={styles.subtitle}>
                Explore {bankName}'s banking schemes or filter them based on your eligibility
              </p>
              <button onClick={handleFilterSchemes} className={styles.filterButton}>
                🎯 Find My Best Match
              </button>
            </div>

            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading schemes...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>⚠️ {error}</p>
              </div>
            )}

            {!loading && !error && (
              <div className={styles.schemesGrid}>
                {schemes.map((scheme) => (
                  <div 
                    key={scheme.id} 
                    className={styles.schemeCard}
                    onClick={() => router.push(`/scheme-details?schemeId=${scheme.id}&bankId=${bankId}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.schemeHeader}>
                      <h3>{scheme.name}</h3>
                      <span className={styles.interest}>{scheme.interestRate}</span>
                    </div>
                    
                    <p className={styles.description}>{scheme.description}</p>
                    
                    <div className={styles.targetGroup}>
                      <strong>🎯 Target Group:</strong> {scheme.targetGroup}
                    </div>
                    
                    <div className={styles.eligibility}>
                      <strong>✓ Eligibility Summary:</strong>
                      <ul>
                        {scheme.eligibility.minAge && (
                          <li>Age: {scheme.eligibility.minAge}
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
                    
                    {scheme.suitableFor && scheme.suitableFor.length > 0 && (
                      <div className={styles.suitableFor}>
                        <strong>💡 Suitable For:</strong>
                        <div className={styles.tags}>
                          {scheme.suitableFor.map((goal, index) => (
                            <span key={index} className={styles.tag}>{goal}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {scheme.benefits && scheme.benefits.length > 0 && (
                      <div className={styles.benefits}>
                        <strong>✨ Key Benefits:</strong>
                        <ul>
                          {scheme.benefits.slice(0, 3).map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className={styles.viewDetailsButton}>
                      Click for Complete Details & How to Apply →
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && !error && schemes.length === 0 && (
              <div className={styles.noSchemes}>
                <p>No schemes available for this bank.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
