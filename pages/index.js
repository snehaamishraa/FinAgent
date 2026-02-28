import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BookOpen, Home as HomeIcon, DollarSign, Briefcase, Leaf, TrendingUp, PiggyBank, Building, ArrowRight, Shield, Zap, Lock } from 'lucide-react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/select-bank?category=${encodeURIComponent(category)}`);
  };

  const categories = [
    { name: 'Education Loans', icon: BookOpen },
    { name: 'Home Loans', icon: HomeIcon },
    { name: 'Personal Loans', icon: DollarSign },
    { name: 'MSME / Business Loans', icon: Briefcase },
    { name: 'Agriculture Loans', icon: Leaf },
    { name: 'Savings Accounts', icon: PiggyBank },
    { name: 'Fixed Deposits', icon: TrendingUp },
    { name: 'Government-backed schemes', icon: Building },
  ];

  const features = [
    { 
      icon: Zap, 
      title: 'Instant Matching', 
      description: 'Get personalized recommendations in seconds'
    },
    { 
      icon: Shield, 
      title: '100% Secure', 
      description: 'Zero data collection, fully private'
    },
    { 
      icon: Lock, 
      title: 'Verified Schemes', 
      description: 'Official bank sources only'
    },
  ];

  const stats = [
    { number: '22+', label: 'Schemes Available' },
    { number: '9', label: 'Partner Banks' },
    { number: '8', label: 'Categories' },
  ];

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Entrepreneur',
      text: 'FinAgent helped me find the perfect business loan in minutes instead of days.'
    },
    {
      name: 'Priya Singh',
      role: 'Student',
      text: 'The education loan matching was spot on. Great service!'
    },
    {
      name: 'Amit Patel',
      role: 'Homebuyer',
      text: 'Finally, a platform that makes financial decisions easy and transparent.'
    },
  ];

  return (
    <>
      <Head>
        <title>FinAgent - Intelligent Financial Scheme Matching</title>
        <meta name="description" content="Find perfect financial schemes from 9+ banks in seconds" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <nav className={styles.navbar}>
            <div className={styles.logo}>
              <span className={styles.logoText}>Fin<span className={styles.highlight}>Agent</span></span>
            </div>
            <div className={styles.navLinks}>
              <a href="#features">Features</a>
              <a href="#schemes">Schemes</a>
              <a href="#about">About</a>
            </div>
          </nav>
        </header>

        <main className={styles.main}>
          {/* Hero Section */}
          <section className={styles.heroSection} id="home">
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                The <span className={styles.accent}>Next Generation</span> Financial Solution
              </h1>
              <p className={styles.heroSubtitle}>
                Discover and compare banking schemes tailored to your needs. Smart matching powered by transparent rules.
              </p>
              <div className={styles.heroCTA}>
                <Link href="/get-started">
                  <button className={styles.primaryBtn}>
                    Get Started
                    <ArrowRight size={20} />
                  </button>
                </Link>
                <Link href="/about">
                  <button className={styles.secondaryBtn}>
                    Learn More
                  </button>
                </Link>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className={styles.statsSection}>
            <div className={styles.statsContainer}>
              {stats.map((stat, idx) => (
                <div key={idx} className={styles.statCard}>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className={styles.featuresSection} id="features">
            <div className={styles.sectionHeader}>
              <h2>Why Choose FinAgent?</h2>
              <p>Smart financial guidance without the complexity</p>
            </div>
            <div className={styles.featuresGrid}>
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className={styles.featureCard}>
                    <div className={styles.featureIconBox}>
                      <Icon size={32} />
                    </div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Schemes Section */}
          <section className={styles.schemesSection} id="schemes">
            <div className={styles.sectionHeader}>
              <h2>Browse by Category</h2>
              <p>Find your perfect scheme in seconds</p>
            </div>
            <div className={styles.schemesGrid}>
              {categories.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <button
                    key={idx}
                    className={styles.schemeCard}
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    <div className={styles.schemeIcon}>
                      <Icon size={24} />
                    </div>
                    <h3>{category.name}</h3>
                    <ArrowRight size={16} />
                  </button>
                );
              })}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className={styles.testimonialsSection} id="testimonials">
            <div className={styles.sectionHeader}>
              <h2>What Users Say</h2>
              <p>Join thousands who found their perfect scheme</p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className={styles.testimonialCard}>
                  <p className={styles.testimonialText}>"{testimonial.text}"</p>
                  <div className={styles.testimonialAuthor}>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className={styles.ctaSection}>
            <h2>Ready to Find Your Perfect Scheme?</h2>
            <p>Join thousands of Indians discovering their ideal financial products</p>
            <Link href="/get-started">
              <button className={styles.ctaBigBtn}>
                Start Now
                <ArrowRight size={24} />
              </button>
            </Link>
          </section>
        </main>

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h4>FinAgent</h4>
              <p>Intelligent financial scheme guidance for everyone</p>
            </div>
            <div className={styles.footerSection}>
              <h5>Quick Links</h5>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#schemes">Schemes</a></li>
              </ul>
            </div>
            <div className={styles.footerSection}>
              <h5>Resources</h5>
              <ul>
                <li><Link href="/about">About</Link></li>
                <li><a href="#">Help</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>&copy; 2026 FinAgent. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
