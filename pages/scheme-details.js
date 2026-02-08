import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/SchemeDetails.module.css';

export default function SchemeDetails() {
  const router = useRouter();
  const { schemeId, bankId } = router.query;
  
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (schemeId && bankId) {
      fetchSchemeDetails();
    }
  }, [schemeId, bankId]);

  const fetchSchemeDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/schemes/${bankId}`);
      if (!response.ok) throw new Error('Failed to fetch scheme');
      const data = await response.json();
      const foundScheme = data.schemes.find(s => s.id === schemeId);
      if (foundScheme) {
        setScheme(foundScheme);
      } else {
        setError('Scheme not found');
      }
      setLoading(false);
    } catch (err) {
      setError('Failed to load scheme details');
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

  const getBankContact = () => {
    const contacts = {
      'SBI': {
        customerCare: '1800 11 2211 (Toll-Free) / 1800 425 3800',
        email: 'customercare@sbi.co.in',
        website: 'https://sbi.bank.in/',
        smsService: 'SMS "CARE" to 9223440000'
      },
      'PNB': {
        customerCare: '1800 180 2222 (Toll-Free) / 0120-2490000',
        email: 'care@pnb.co.in',
        website: 'https://www.pnbindia.in/',
        smsService: 'SMS "PNB" to 5607040'
      },
      'HDFC_Bank': {
        customerCare: '1800 267 8777 (Toll-Free) / 1860 267 6161',
        email: 'customer.service@hdfcbank.com',
        website: 'https://www.hdfcbank.com/',
        smsService: 'SMS "HDFC" to 7308080808'
      },
      'ICICI_Bank': {
        customerCare: '1860 120 7777 (Toll-Free) / 1800 200 3344',
        email: 'customer.care@icicibank.com',
        website: 'https://www.icicibank.com/',
        smsService: 'SMS "ICICI" to 5676766'
      },
      'Axis_Bank': {
        customerCare: '1860 500 5555 (Toll-Free) / 1800 419 5555',
        email: 'customer.care@axisbank.com',
        website: 'https://www.axisbank.com/',
        smsService: 'SMS "AXIS" to 5676757'
      }
    };
    return contacts[bankId] || scheme?.bankContact || contacts['SBI'];
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading scheme details...</p>
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>⚠️ {error || 'Scheme not found'}</h2>
          <button onClick={() => router.back()} className={styles.backButton}>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const bankContact = scheme.bankContact || getBankContact();

  return (
    <>
      <Head>
        <title>{scheme.name} - Complete Guide</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button onClick={() => router.back()} className={styles.backButton}>
            ← Back to Schemes
          </button>
          <div className={styles.bankBadge}>{formatBankName(bankId)}</div>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            {/* Scheme Header */}
            <div className={styles.schemeHeader}>
              <h1 className={styles.title}>
                {scheme.name}
              </h1>
              <div className={styles.interestBadge}>
                <span className={styles.rateLabel}>Interest Rate:</span>
                <span className={styles.rateValue}>{scheme.interestRate}</span>
              </div>
              <p className={styles.description}>{scheme.description}</p>
              <div className={styles.targetGroup}>
                <span className={styles.icon}>🎯</span>
                <strong>Target Group:</strong> {scheme.targetGroup}
              </div>
            </div>

            {/* Eligibility Criteria */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.icon}>✅</span>
                Eligibility Criteria
              </h2>
              <div className={styles.eligibilityGrid}>
                <div className={styles.eligibilityCard}>
                  <h3>Age</h3>
                  <p>
                    {scheme.eligibility.minAge ? `${scheme.eligibility.minAge}+ years` : 'Any age'}
                    {scheme.eligibility.maxAge ? ` to ${scheme.eligibility.maxAge} years` : ''}
                  </p>
                </div>
                <div className={styles.eligibilityCard}>
                  <h3>Gender</h3>
                  <p>{scheme.eligibility.gender}</p>
                </div>
                <div className={styles.eligibilityCard}>
                  <h3>Category</h3>
                  <p>{scheme.eligibility.categories.join(', ')}</p>
                </div>
                {scheme.eligibility.minIncome && (
                  <div className={styles.eligibilityCard}>
                    <h3>Minimum Income</h3>
                    <p>₹{scheme.eligibility.minIncome.toLocaleString()}/month</p>
                  </div>
                )}
                {scheme.eligibility.maxIncome && (
                  <div className={styles.eligibilityCard}>
                    <h3>Maximum Income</h3>
                    <p>₹{scheme.eligibility.maxIncome.toLocaleString()}/month</p>
                  </div>
                )}
                <div className={styles.eligibilityCard}>
                  <h3>Occupation</h3>
                  <p>{scheme.eligibility.occupations.join(', ')}</p>
                </div>
              </div>
            </section>

            {/* How to Apply */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.icon}>📝</span>
                How to Apply
              </h2>
              <div className={styles.howToApply}>
                {scheme.howToApply ? (
                  <p className={styles.applyDescription}>{scheme.howToApply}</p>
                ) : (
                  <p className={styles.applyDescription}>
                    Visit your nearest {formatBankName(bankId)} branch with the required documents listed below. 
                    You can also check the bank's official website for online account opening options. 
                    For assistance, contact the customer care numbers provided at the bottom of this page.
                  </p>
                )}
              </div>
            </section>

            {/* Application Process */}
            {scheme.applicationProcess && scheme.applicationProcess.length > 0 && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.icon}>🔄</span>
                  Application Process (Step-by-Step)
                </h2>
                <div className={styles.processSteps}>
                  {scheme.applicationProcess.map((step, index) => (
                    <div key={index} className={styles.processStep}>
                      <div className={styles.stepNumber}>{index + 1}</div>
                      <div className={styles.stepContent}>{step}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Documents Required */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.icon}>📄</span>
                Documents Required
              </h2>
              <div className={styles.documentsList}>
                {scheme.documentsRequired && scheme.documentsRequired.length > 0 ? (
                  scheme.documentsRequired.map((doc, index) => (
                    <div key={index} className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>{doc}</span>
                    </div>
                  ))
                ) : (
                  <>
                    <div className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>Identity Proof: Aadhaar Card / PAN Card / Passport / Voter ID</span>
                    </div>
                    <div className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>Address Proof: Aadhaar / Utility Bill / Rent Agreement</span>
                    </div>
                    <div className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>PAN Card (mandatory for financial transactions)</span>
                    </div>
                    <div className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>Recent passport-size photographs (2-3 copies)</span>
                    </div>
                    <div className={styles.documentItem}>
                      <span className={styles.checkmark}>✓</span>
                      <span>Income proof documents (if applicable)</span>
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Benefits */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.icon}>🎁</span>
                Key Benefits
              </h2>
              <div className={styles.benefitsList}>
                {scheme.benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <span className={styles.star}>★</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Bank Contact Details */}
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.icon}>📞</span>
                Bank Contact Details
              </h2>
              <div className={styles.contactGrid}>
                <div className={styles.contactCard}>
                  <h3>📞 Customer Care</h3>
                  <p>{bankContact.customerCare}</p>
                  <small>Available 24x7</small>
                </div>
                <div className={styles.contactCard}>
                  <h3>✉️ Email Support</h3>
                  <p>{bankContact.email}</p>
                  <small>Response within 24-48 hours</small>
                </div>
                <div className={styles.contactCard}>
                  <h3>🌐 Official Website</h3>
                  <p>
                    <a href={bankContact.website} target="_blank" rel="noopener noreferrer">
                      {bankContact.website}
                    </a>
                  </p>
                  <small>For online applications</small>
                </div>
                <div className={styles.contactCard}>
                  <h3>💬 SMS Banking</h3>
                  <p>{bankContact.smsService}</p>
                  <small>For quick queries</small>
                </div>
              </div>
            </section>

            {/* Important Notes */}
            <section className={styles.disclaimerSection}>
              <h3>⚠️ Important Information</h3>
              <ul>
                <li>Interest rates and terms are subject to change. Please verify current rates at the time of application.</li>
                <li>All eligibility criteria must be met for successful account opening.</li>
                <li>Processing time may vary based on document verification.</li>
                <li>For NRI applicants, additional documentation may be required.</li>
                <li>This is informational content only. Always verify details with official bank sources.</li>
              </ul>
            </section>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                onClick={() => window.open(bankContact.website, '_blank')} 
                className={styles.applyButton}
              >
                Visit Bank Website
              </button>
              <button 
                onClick={() => router.push(`/filter?bank=${bankId}`)} 
                className={styles.filterButton}
              >
                Check Other Schemes
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
