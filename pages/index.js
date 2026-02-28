import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/select-bank?category=${encodeURIComponent(category)}`);
  };

  return (
    <>
      <Head>
        <title>Finagent - Banking Scheme Finder</title>
        <meta name="description" content="Discover banking schemes tailored to your needs" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🏦</span>
            <span className={styles.logoText}><span className={styles.highlight}>Finagent</span></span>
          </div>
        </header>

        <main className={styles.main}>
          <div className={styles.hero}>
            {/* Hero Section */}
            <div className={styles.heroContent}>
              <h1 className={styles.title}>
                Find the <span className={styles.neonText}>Perfect</span> Banking Scheme
              </h1>
              <p className={styles.subtitle}>
                Discover banking schemes tailored to your needs. Our rule-based matching system
                finds the best options across major banks in seconds.
              </p>
            </div>

            {/* Primary CTA */}
            <div className={styles.ctaSection}>
              <div className={styles.ctaContainer}>
                <Link href="/quick-filter">
                  <button className={styles.ctaButton}>
                    <span className={styles.ctaLabel}>Find Your Perfect Scheme</span>
                    <span className={styles.arrow}>→</span>
                  </button>
                </Link>
                <Link href="/select-bank">
                  <button className={styles.secondaryButton}>
                    Browse by Bank
                  </button>
                </Link>
              </div>
            </div>

            {/* Features Grid */}
            <div className={styles.features}>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>⚡</span>
                <h3>Instant Matching</h3>
                <p>Get personalized results in seconds based on your eligibility</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>🔒</span>
                <h3>100% Private</h3>
                <p>No data storage. Your information is never saved or shared</p>
              </div>
              <div className={styles.featureCard}>
                <span className={styles.featureIcon}>✅</span>
                <h3>Verified Data</h3>
                <p>All schemes are from official bank sources and updated regularly</p>
              </div>
            </div>

            {/* Categories Preview */}
            <div className={styles.categoriesSection}>
              <h2 className={styles.sectionTitle}>Browse by Category</h2>
              <div className={styles.categoriesGrid}>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Education Loans')}>📚 Education Loans</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Home Loans')}>🏠 Home Loans</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Personal Loans')}>💰 Personal Loans</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('MSME / Business Loans')}>🏢 Business Loans</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Agriculture Loans')}>🌾 Agriculture Loans</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Savings Accounts')}>💳 Savings Accounts</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Fixed Deposits')}>💎 Fixed Deposits</button>
                <button className={styles.categoryTag} onClick={() => handleCategoryClick('Government-backed schemes')}>🏛️ Government Schemes</button>
              </div>
            </div>

            {/* Disclaimer */}
            <div className={styles.disclaimer}>
              <p>
                <strong>⚠️ Educational Purpose:</strong> Scheme information is for informational use only. 
                Always verify with official bank sources before applying.
              </p>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <p>🏦 Banking Scheme Guidance • Secure • Private • Trusted</p>
        </footer>
      </div>
    </>
  );
}
