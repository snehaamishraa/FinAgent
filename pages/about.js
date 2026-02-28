import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/About.module.css';

export default function About() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>About & Ethics - Banking Scheme Guidance</title>
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
              About & <span className={styles.neonText}>Ethics</span>
            </h1>

            <section className={styles.section}>
              <h2>📋 Purpose</h2>
              <p>
                This Banking Scheme Guidance System is an <strong>educational project</strong> designed 
                to help users discover banking schemes that match their eligibility criteria. The system 
                uses a <strong>purely rule-based approach</strong> with if-else conditional logic—no 
                artificial intelligence, machine learning, or agentic systems are involved.
              </p>
            </section>

            <section className={styles.section}>
              <h2>🔍 Data Sources</h2>
              <p>
                All scheme information is based on publicly available data from official Indian bank 
                websites and government portals. The banks featured in this system include:
              </p>
              <ul className={styles.bankList}>
                <li>
                  <strong>State Bank of India (SBI)</strong>
                  <br />
                  <a href="https://sbi.bank.in/" target="_blank" rel="noopener noreferrer">
                    https://sbi.bank.in/
                  </a>
                </li>
                <li>
                  <strong>Punjab National Bank (PNB)</strong>
                  <br />
                  <a href="https://pnb.bank.in/" target="_blank" rel="noopener noreferrer">
                    https://pnb.bank.in/
                  </a>
                </li>
                <li>
                  <strong>HDFC Bank</strong>
                  <br />
                  <a href="https://www.hdfcbank.com/" target="_blank" rel="noopener noreferrer">
                    https://www.hdfcbank.com/
                  </a>
                </li>
                <li>
                  <strong>ICICI Bank</strong>
                  <br />
                  <a href="https://www.icicibank.com/" target="_blank" rel="noopener noreferrer">
                    https://www.icicibank.com/
                  </a>
                </li>
                <li>
                  <strong>Axis Bank</strong>
                  <br />
                  <a href="https://www.axisbank.com/" target="_blank" rel="noopener noreferrer">
                    https://www.axisbank.com/
                  </a>
                </li>
              </ul>
              <p className={styles.note}>
                <strong>Note:</strong> Scheme details presented here are representative of common banking 
                products offered in India. For the most current and accurate information, interest rates, 
                terms, and conditions, please visit the official bank websites or contact the banks directly.
              </p>
            </section>

            <section className={styles.section}>
              <h2>🛡️ Privacy & Data Usage</h2>
              <p>
                We take your privacy seriously. This system operates with the following principles:
              </p>
              <ul>
                <li><strong>No Data Storage:</strong> Your personal information (age, income, occupation, etc.) 
                is NOT stored in any database or server</li>
                <li><strong>Client-Side Processing:</strong> Your eligibility criteria are processed in real-time 
                and discarded immediately after results are displayed</li>
                <li><strong>No Tracking:</strong> We do not use cookies, analytics, or any tracking mechanisms 
                to monitor your activity</li>
                <li><strong>No Third-Party Sharing:</strong> No information is shared with banks or third parties</li>
                <li><strong>Educational Purpose Only:</strong> This tool is for informational guidance, not for 
                actual account opening or banking transactions</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2>⚖️ Ethical Considerations</h2>
              <div className={styles.ethicsGrid}>
                <div className={styles.ethicsCard}>
                  <h3>🎯 Transparency</h3>
                  <p>
                    All filtering logic is based on simple rule-based conditions. There are no hidden 
                    algorithms or AI models influencing the results you see.
                  </p>
                </div>
                <div className={styles.ethicsCard}>
                  <h3>⚠️ No Financial Advice</h3>
                  <p>
                    This system provides informational guidance only. It does not constitute financial advice. 
                    Consult with qualified financial advisors before making banking decisions.
                  </p>
                </div>
                <div className={styles.ethicsCard}>
                  <h3>📊 Data Accuracy</h3>
                  <p>
                    While we strive for accuracy, banking schemes change frequently. Always verify details 
                    with official sources before taking any action.
                  </p>
                </div>
                <div className={styles.ethicsCard}>
                  <h3>🤝 Inclusivity</h3>
                  <p>
                    The eligibility categories (SC, ST, OBC, Minority, General) follow official government 
                    classifications and are used solely for scheme matching purposes.
                  </p>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>🔧 How It Works</h2>
              <div className={styles.howItWorks}>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>1</div>
                  <div className={styles.stepContent}>
                    <h3>User Input</h3>
                    <p>You provide your age, gender, category, income, occupation, and savings goal</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>2</div>
                  <div className={styles.stepContent}>
                    <h3>Rule-Based Filtering</h3>
                    <p>The system uses if-else conditions to match your profile against scheme eligibility criteria</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>3</div>
                  <div className={styles.stepContent}>
                    <h3>Best Match Detection</h3>
                    <p>Schemes aligned with your savings goal are marked as "Best Match"</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <div className={styles.stepNumber}>4</div>
                  <div className={styles.stepContent}>
                    <h3>Results Display</h3>
                    <p>You see eligible schemes with details to help you make informed decisions</p>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.section}>
              <h2>⚠️ Disclaimer</h2>
              <div className={styles.disclaimer}>
                <p>
                  This Banking Scheme Guidance System is provided "as is" for educational and informational 
                  purposes only. The creators and operators of this system:
                </p>
                <ul>
                  <li>Make no warranties or guarantees about the accuracy, completeness, or timeliness of the 
                  information provided</li>
                  <li>Are not affiliated with any of the banks mentioned in this system</li>
                  <li>Do not endorse or recommend any specific banking product or scheme</li>
                  <li>Are not responsible for any decisions made based on the information provided by this system</li>
                  <li>Recommend that users independently verify all information with official bank sources before 
                  making any financial decisions</li>
                </ul>
                <p>
                  <strong>Banking products and schemes are subject to change.</strong> Interest rates, eligibility 
                  criteria, benefits, and terms can be modified by banks at any time without notice. Always consult 
                  official bank websites or visit bank branches for the most current information.
                </p>
              </div>
            </section>

            <section className={styles.section}>
              <h2>📞 Additional Resources</h2>
              <div className={styles.resources}>
                <a href="https://rbi.org.in/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  Reserve Bank of India (RBI)
                </a>
                <a href="https://www.india.gov.in/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  National Portal of India
                </a>
                <a href="https://pmjdy.gov.in/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  PM Jan Dhan Yojana
                </a>
                <a href="https://www.cersai.org.in/" target="_blank" rel="noopener noreferrer" className={styles.resourceLink}>
                  CERSAI - Banking Security
                </a>
              </div>
            </section>

            <div className={styles.footer}>
              <p>
                For questions, feedback, or to report inaccuracies, please contact your respective bank directly 
                or visit official government banking portals.
              </p>
              <button onClick={() => router.push('/')} className={styles.homeButton}>
                Return to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
