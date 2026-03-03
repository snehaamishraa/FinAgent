import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/SelectBank.module.css';

export default function FixedDepositCategories() {
  const router = useRouter();
  const fdTypes = [
    'Regular Fixed Deposit',
    'Senior Citizen Fixed Deposit',
    'Tax Saving Fixed Deposit',
    'Cumulative Fixed Deposit',
    'Non Cumulative Fixed Deposit',
    'Flexi Fixed Deposit',
    'Recurring Deposit'
  ];

  const [selectedType, setSelectedType] = useState('');

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleContinue = () => {
    if (selectedType) {
      router.push(
        `/category-details?category=${encodeURIComponent('Fixed Deposits')}&depositType=${encodeURIComponent(
          selectedType
        )}`
      );
    }
  };

  return (
    <>
      <Head>
        <title>Fixed Deposit Types | Finagent</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button
            onClick={() => router.push('/select-bank?mode=category')}
            className={styles.backButton}
          >
            ← Back to Categories
          </button>
          <h1 className={styles.headerTitle}>Fixed Deposit Types</h1>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.categoryGrid}>
              {fdTypes.map((type) => (
                <div
                  key={type}
                  className={`${styles.categoryCard} ${
                    selectedType === type ? styles.selected : ''
                  }`}
                  onClick={() => handleTypeSelect(type)}
                >
                  <h3>{type}</h3>
                  <p>Browse {type} options</p>
                  {selectedType === type && (
                    <div className={styles.checkmark}>✓</div>
                  )}
                </div>
              ))}
            </div>

            <button
              className={styles.continueButton}
              onClick={handleContinue}
              disabled={!selectedType}
            >
              Continue to Details
              <span className={styles.arrow}>→</span>
            </button>

            <div className={styles.info}>
              <p>
                💡 <strong>Tip:</strong> Select an FD type to narrow down the
                schemes. You can still modify deposit amount and other details on
                the next screen.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
