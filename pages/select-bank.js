import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/SelectBank.module.css';

export default function SelectBank() {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      const response = await fetch('/api/banks');
      const data = await response.json();
      setBanks(data.banks);
      setLoading(false);
    } catch (err) {
      setError('Failed to load banks. Please ensure the server is running.');
      setLoading(false);
    }
  };

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
  };

  const handleContinue = () => {
    if (selectedBank) {
      router.push(`/schemes/${encodeURIComponent(selectedBank)}`);
    }
  };

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

  return (
    <>
      <Head>
        <title>Select Bank - Banking Scheme Guidance</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            ← Back to Home
          </button>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Select Your <span className={styles.neonText}>Bank</span>
            </h1>
            <p className={styles.subtitle}>
              Choose a bank to explore their available schemes and plans
            </p>

            {loading && (
              <div className={styles.loading}>
                <div className={styles.spinner}></div>
                <p>Loading banks...</p>
              </div>
            )}

            {error && (
              <div className={styles.error}>
                <p>⚠️ {error}</p>
                <button onClick={fetchBanks} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className={styles.bankGrid}>
                  {banks.map((bank) => (
                    <div
                      key={bank}
                      className={`${styles.bankCard} ${
                        selectedBank === bank ? styles.selected : ''
                      }`}
                      onClick={() => handleBankSelect(bank)}
                    >
                      <div className={styles.bankIcon}>🏦</div>
                      <h3>{formatBankName(bank)}</h3>
                      <p>Explore schemes and benefits</p>
                      {selectedBank === bank && (
                        <div className={styles.checkmark}>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  className={styles.continueButton}
                  onClick={handleContinue}
                  disabled={!selectedBank}
                >
                  Continue to Schemes
                  <span className={styles.arrow}>→</span>
                </button>

                <div className={styles.info}>
                  <p>
                    💡 <strong>Note:</strong> Scheme information based on publicly available 
                    data from official Indian bank sources. For the most current details, 
                    please visit the official bank website or contact the bank directly.
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
