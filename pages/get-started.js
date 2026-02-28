import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ArrowRight, Building2, Layers, User, Target, ArrowLeft } from 'lucide-react';
import styles from '../styles/GetStarted.module.css';

export default function GetStarted() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [browseType, setBrowseType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    employmentType: 'employed',
    loanType: 'education',
    existingLoans: false,
    cibilScore: 'above700',
  });

  const categories = [
    'Education Loans',
    'Home Loans',
    'Personal Loans',
    'MSME / Business Loans',
    'Agriculture Loans',
    'Savings Accounts',
    'Fixed Deposits',
    'Government-backed schemes',
  ];

  const banks = [
    'HDFC Bank',
    'ICICI Bank',
    'State Bank of India',
    'Axis Bank',
    'Kotak Mahindra Bank',
    'IDBI Bank',
    'Bank of India',
    'Central Bank of India',
    'Punjab National Bank',
  ];

  const handleFormChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProceed = () => {
    if (browseType === 'categories') {
      // Navigate with form data to results
      router.push(`/results?type=category&prefs=${encodeURIComponent(JSON.stringify(formData))}`);
    } else {
      // Navigate to bank selection with form data
      router.push(`/select-bank?type=bank&prefs=${encodeURIComponent(JSON.stringify(formData))}`);
    }
  };

  const isFormValid = formData.name && formData.age && formData.income;

  return (
    <>
      <Head>
        <title>Get Started - FinAgent</title>
        <meta name="description" content="Discover your perfect financial schemes" />
      </Head>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <Link href="/">
              <span className={styles.logo}>
                Fin<span className={styles.highlight}>Agent</span>
              </span>
            </Link>
            <p className={styles.tagline}>Personalized Financial Guidance</p>
          </div>
          <Link href="/">
            <button className={styles.backBtn}>
              <ArrowLeft size={20} />
              Home
            </button>
          </Link>
        </header>

        <main className={styles.main}>
          {/* Step 1: Choose Browse Type */}
          {step === 1 && !browseType && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <h1>How do you want to explore?</h1>
                <p>Choose the best way to find schemes tailored for you</p>
              </div>

              <div className={styles.choiceGrid}>
                <button
                  className={styles.choiceCard}
                  onClick={() => setBrowseType('categories')}
                >
                  <div className={styles.choiceIcon}>
                    <Layers size={48} />
                  </div>
                  <h3>Browse by Category</h3>
                  <p>Explore schemes grouped by type. Perfect if you know what you need.</p>
                  <div className={styles.schemesCount}>
                    <strong>8</strong> <span>Categories</span>
                  </div>
                  <div className={styles.cta}>
                    Explore<ArrowRight size={18} />
                  </div>
                </button>

                <button
                  className={styles.choiceCard}
                  onClick={() => setBrowseType('banks')}
                >
                  <div className={styles.choiceIcon}>
                    <Building2 size={48} />
                  </div>
                  <h3>Browse by Banks</h3>
                  <p>Discover all schemes from your preferred banks. Compare offers easily.</p>
                  <div className={styles.schemesCount}>
                    <strong>9</strong> <span>Top Banks</span>
                  </div>
                  <div className={styles.cta}>
                    Explore<ArrowRight size={18} />
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personalization Form */}
          {browseType && step === 1 && (
            <div className={styles.stepContainer}>
              <div className={styles.stepHeader}>
                <button
                  className={styles.backStep}
                  onClick={() => setBrowseType(null)}
                >
                  <ArrowLeft size={20} />
                </button>
                <h1>
                  {browseType === 'categories'
                    ? 'Find Schemes by Category'
                    : 'Find Schemes by Banks'}
                </h1>
                <p>Tell us about yourself for personalized recommendations</p>
              </div>

              <form className={styles.form}>
                <div className={styles.formSection}>
                  <h3>
                    <User size={20} />
                    Personal Information
                  </h3>

                  <div className={styles.formGroup}>
                    <label htmlFor="name">Name *</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleFormChange('name', e.target.value)}
                    />
                  </div>

                  <div className={styles.twoCol}>
                    <div className={styles.formGroup}>
                      <label htmlFor="age">Age *</label>
                      <input
                        id="age"
                        type="number"
                        placeholder="18-75"
                        value={formData.age}
                        onChange={(e) => handleFormChange('age', e.target.value)}
                        min="18"
                        max="75"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="employment">Employment Type *</label>
                      <select
                        id="employment"
                        value={formData.employmentType}
                        onChange={(e) => handleFormChange('employmentType', e.target.value)}
                      >
                        <option value="employed">Salaried</option>
                        <option value="self-employed">Self-Employed</option>
                        <option value="business">Business Owner</option>
                        <option value="student">Student</option>
                        <option value="retired">Retired</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className={styles.formSection}>
                  <h3>
                    <Target size={20} />
                    Financial Profile
                  </h3>

                  <div className={styles.formGroup}>
                    <label htmlFor="income">Annual Income (in ₹) *</label>
                    <select
                      id="income"
                      value={formData.income}
                      onChange={(e) => handleFormChange('income', e.target.value)}
                    >
                      <option value="">Select income range</option>
                      <option value="below-3l">Below 3 Lakhs</option>
                      <option value="3l-10l">3L - 10L</option>
                      <option value="10l-25l">10L - 25L</option>
                      <option value="25l-50l">25L - 50L</option>
                      <option value="above-50l">Above 50L</option>
                    </select>
                  </div>

                  <div className={styles.twoCol}>
                    <div className={styles.formGroup}>
                      <label htmlFor="loanType">Interest Area *</label>
                      <select
                        id="loanType"
                        value={formData.loanType}
                        onChange={(e) => handleFormChange('loanType', e.target.value)}
                      >
                        <option value="education">Education</option>
                        <option value="home">Home</option>
                        <option value="personal">Personal</option>
                        <option value="business">Business</option>
                        <option value="agriculture">Agriculture</option>
                        <option value="savings">Savings</option>
                        <option value="deposits">Fixed Deposits</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="cibil">CIBIL Score Estimate *</label>
                      <select
                        id="cibil"
                        value={formData.cibilScore}
                        onChange={(e) => handleFormChange('cibilScore', e.target.value)}
                      >
                        <option value="above700">Above 700</option>
                        <option value="600-700">600-700</option>
                        <option value="below600">Below 600</option>
                        <option value="no-score">No Score Yet</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.checkbox}>
                    <input
                      id="loans"
                      type="checkbox"
                      checked={formData.existingLoans}
                      onChange={(e) => handleFormChange('existingLoans', e.target.checked)}
                    />
                    <label htmlFor="loans">I have existing loans</label>
                  </div>
                </div>

                <div className={styles.buttonGroup}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={handleProceed}
                    disabled={!isFormValid}
                  >
                    Show Me Schemes
                    <ArrowRight size={20} />
                  </button>
                  <button
                    type="button"
                    className={styles.secondaryBtn}
                    onClick={() => setBrowseType(null)}
                  >
                    Change Browse Type
                  </button>
                </div>
              </form>

              <div className={styles.infoBox}>
                <p>
                  <strong>💡 Tip:</strong> Your information helps us show schemes you're most likely
                  to qualify for. No data is stored.
                </p>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <p>&copy; 2026 FinAgent. Your personalized financial companion.</p>
        </footer>
      </div>
    </>
  );
}