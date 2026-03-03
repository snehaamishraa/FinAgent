import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/SelectBank.module.css';

export default function SelectBank() {
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBank, setSelectedBank] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [browseMode, setBrowseMode] = useState('bank'); // 'bank' or 'category'

  useEffect(() => {
    fetchBanksAndCategories();
  }, []);

  useEffect(() => {
    if (router.query.mode === 'category') {
      setBrowseMode('category');
      setSelectedBank('');
      setSelectedCategory('');
      return;
    }

    // Check if category is passed from home page
    if (router.query.category) {
      setBrowseMode('category');
      setSelectedCategory(decodeURIComponent(router.query.category));
    }
  }, [router.query.category, router.query.mode]);

  const fetchBanksAndCategories = async () => {
    try {
      const [banksRes, schemesRes] = await Promise.all([
        fetch('/api/banks'),
        fetch('/api/filter-schemes')
      ]);
      const banksData = await banksRes.json();
      const schemesData = await schemesRes.json();
      
      setBanks(banksData.banks);
      
      // Extract unique categories from schemes
      const uniqueCategories = [...new Set(schemesData.schemes.map(s => s.scheme_category))].sort();
      setCategories(uniqueCategories);
      setLoading(false);
    } catch (err) {
      setError('Failed to load data. Please ensure the server is running.');
      setLoading(false);
    }
  };

  const handleBankSelect = (bankId) => {
    setSelectedBank(bankId);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleContinue = () => {
    if (browseMode === 'bank' && selectedBank) {
      router.push(`/schemes/${encodeURIComponent(selectedBank)}`);
    } else if (browseMode === 'category' && selectedCategory) {
      router.push(`/category-details?category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Education Loans': '🎓',
      'Home Loans': '🏠',
      'Personal Loans': '💰',
      'MSME / Business Loans': '🏢',
      'Agriculture Loans': '🌾',
      'Savings Accounts': '💳',
      'Fixed Deposits': '💎',
      'Government-backed schemes': '🏛️',
      'Government': '🏵️',
      'Investment': '📈',
      'Insurance': '🛡️',
      'Loans': '💸'
    };
    return icons[category] || '💼';
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

  // split categories into loan-related and others so we can show a single "Loans" box
  const loanCategories = categories.filter(c => c.toLowerCase().includes('loan'));
  const fixedDepositPresent = categories.includes('Fixed Deposits');
  const otherCategories = categories.filter(
    (c) => !c.toLowerCase().includes('loan') && c !== 'Fixed Deposits'
  );

  return (
    <>
      <Head>
        <title>Browse Banks - Finagent</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => router.push('/')} className={styles.backButton}>
            ← Back to Home
          </button>
          <h1 className={styles.headerTitle}>{browseMode === 'category' ? 'Browse Categories' : 'Browse Banks'}</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            {/* Hero Section */}
            <div className={styles.heroSection}>
              <h2 className={styles.title}>
                Explore <span className={styles.neonText}>Banking Schemes</span>
              </h2>
              <p className={styles.subtitle}>
                {browseMode === 'bank' ? 'Choose a bank to discover all available schemes and benefits' : 'Browse schemes by category'}
              </p>
            </div>

            {/* Mode Switcher */}
            {!loading && !error && router.query.mode !== 'category' && (
              <div className={styles.modeSwitcher}>
                <button
                  className={`${styles.modeButton} ${browseMode === 'bank' ? styles.activeModeButton : ''}`}
                  onClick={() => {
                    setBrowseMode('bank');
                    setSelectedBank('');
                    setSelectedCategory('');
                    setActiveTab('all');
                  }}
                >
                  <span className={styles.modeIcon}>🏦</span>
                  Browse by Bank
                </button>
                <button
                  className={`${styles.modeButton} ${browseMode === 'category' ? styles.activeModeButton : ''}`}
                  onClick={() => {
                    setBrowseMode('category');
                    setSelectedBank('');
                    setSelectedCategory('');
                  }}
                >
                  <span className={styles.modeIcon}>📂</span>
                  Browse by Category
                </button>
              </div>
            )}

            {/* Tabs - Bank Mode */}
            {!loading && !error && browseMode === 'bank' && (
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
                <button onClick={fetchBanksAndCategories} className={styles.retryButton}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && browseMode === 'bank' && (
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

            {!loading && !error && browseMode === 'category' && (
              <>
                <div className={styles.categoryGrid}>
                  {/* if there are any loan-related categories, show a single 'Loans' box */}
                  {loanCategories.length > 0 && (
                    <div
                      key="Loans"
                      className={styles.categoryCard}
                      onClick={() => router.push('/loan-categories')}
                    >
                      <div className={styles.categoryIcon}>{getCategoryIcon('Loans')}</div>
                      <h3>Loans</h3>
                      <p>Browse all loan schemes</p>
                    </div>
                  )}

                  {/* special fixed deposit card linking to its own type selector */}
                  {fixedDepositPresent && (
                    <div
                      key="Fixed Deposits"
                      className={styles.categoryCard}
                      onClick={() => router.push('/fixed-deposit-categories')}
                    >
                      <div className={styles.categoryIcon}>{getCategoryIcon('Fixed Deposits')}</div>
                      <h3>Fixed Deposits</h3>
                      <p>Browse all fixed deposit types</p>
                    </div>
                  )}

                  {otherCategories.map((category) => (
                    <div
                      key={category}
                      className={`${styles.categoryCard} ${
                        selectedCategory === category ? styles.selected : ''
                      }`}
                      onClick={() => handleCategorySelect(category)}
                    >
                      <div className={styles.categoryIcon}>{getCategoryIcon(category)}</div>
                      <h3>{category}</h3>
                      <p>Browse all schemes in this category</p>
                      {selectedCategory === category && (
                        <div className={styles.checkmark}>✓</div>
                      )}
                    </div>
                  ))}
                </div>

                {categories.length === 0 && (
                  <div className={styles.noResults}>
                    <p>No categories found</p>
                  </div>
                )}

                <button
                  className={styles.continueButton}
                  onClick={handleContinue}
                  disabled={!selectedCategory}
                >
                  Continue to Category Details
                  <span className={styles.arrow}>→</span>
                </button>

                <div className={styles.info}>
                  <p>
                    💡 <strong>Tip:</strong> Select a category to see all available schemes. 
                    Compare schemes across different banks within the same category.
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
