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
  const [activeTab, setActiveTab] = useState('all');

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

  const categorizeBank = (bankName) => {
    if (bankName.includes('Government')) return 'government';
    if (bankName.includes('SBI') || bankName.includes('PNB') || bankName.includes('Union') || bankName.includes('Baroda')) return 'public';
    return 'private';
  };

  const getBankIcon = (bankName) => {
    const icons = {
      'State Bank of India': '🏛️',
      'HDFC Bank': '🏦',
      'ICICI Bank': '💳',
      'Axis Bank': '⚙️',
      'Kotak': '🎯',
      'Punjab National': '🇮🇳',
      'Bank of Baroda': '🌟',
      'Union Bank': '🤝',
      'Government': '📋'
    };
    for (const [key, icon] of Object.entries(icons)) {
      if (bankName.includes(key)) return icon;
    }
    return '🏦';
  };

  const filterBanks = (banks) => {
    if (activeTab === 'all') return banks;
    return banks.filter(b => categorizeBank(b) === activeTab);
  };

  const filteredBanks = filterBanks(banks);

  return (
    <>
      <Head>
        <title>Browse Banks - Banking Scheme Guidance</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            ← Back to Home
          </button>
          <h1 className={styles.headerTitle}>Browse Banks</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
              <h2 className={styles.title}>
                Explore <span className={styles.neonText}>Banking Schemes</span>
              </h2>
              <p className={styles.subtitle}>
                Choose a bank to discover all available schemes and benefits
              </p>
            </div>

            {/* Tabs */}
            {!loading && !error && (
              <div className={styles.tabsContainer}>
                <button
                  className={`${styles.tab} ${activeTab === 'all' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('all')}
                >
                  <span className={styles.tabIcon}>📊</span>
                  All Banks
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'public' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('public')}
                >
                  <span className={styles.tabIcon}>🏛️</span>
                  Public Sector
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'private' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('private')}
                >
                  <span className={styles.tabIcon}>💼</span>
                  Private Sector
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'government' ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab('government')}
                >
                  <span className={styles.tabIcon}>🏵️</span>
                  Government
                </button>
              </div>
            )}

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
                  {filteredBanks.map((bank) => (
                    <div
                      key={bank}
                      className={`${styles.bankCard} ${
                        selectedBank === bank ? styles.selected : ''
                      }`}
                      onClick={() => handleBankSelect(bank)}
                    >
                      <div className={styles.bankIcon}>{getBankIcon(bank)}</div>
                      <h3>{bank}</h3>
                      <p>Explore schemes & benefits</p>
                      {selectedBank === bank && (
                        <div className={styles.checkmark}>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredBanks.length === 0 && (
                  <div className={styles.noResults}>
                    <p>No banks found in this category</p>
                  </div>
                )}

                <button
                  className={styles.continueButton}
                  onClick={handleContinue}
                  disabled={!selectedBank}
                >
                  View Selected Bank's Schemes
                  <span className={styles.arrow}>→</span>
                </button>

                <div className={styles.info}>
                  <p>
                    💡 <strong>Tip:</strong> Select a bank above to browse all available schemes. 
                    Click the scheme card to view detailed eligibility and application information.
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
