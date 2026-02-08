import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../styles/Filter.module.css';

export default function Filter() {
  const router = useRouter();
  const { bank } = router.query;
  
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    category: '',
    monthlyIncome: '',
    occupation: '',
    savingsGoal: ''
  });

  const [errors, setErrors] = useState({});
  const [bankName, setBankName] = useState('');

  useEffect(() => {
    if (bank) {
      setBankName(formatBankName(bank));
    }
  }, [bank]);

  const formatBankName = (id) => {
    return id ? id.replace(/_/g, ' ') : '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.age || formData.age < 1 || formData.age > 120) {
      newErrors.age = 'Please enter a valid age between 1 and 120';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select your gender';
    }
    
    if (!formData.category) {
      newErrors.category = 'Please select your category';
    }
    
    if (!formData.monthlyIncome || formData.monthlyIncome < 0) {
      newErrors.monthlyIncome = 'Please enter a valid monthly income';
    }
    
    if (!formData.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }
    
    if (!formData.savingsGoal) {
      newErrors.savingsGoal = 'Please select your savings goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Navigate to results page with form data
      const queryParams = new URLSearchParams({
        bank: bank,
        age: formData.age,
        gender: formData.gender,
        category: formData.category,
        monthlyIncome: formData.monthlyIncome,
        occupation: formData.occupation,
        savingsGoal: formData.savingsGoal
      });
      
      router.push(`/results?${queryParams.toString()}`);
    }
  };

  return (
    <>
      <Head>
        <title>Find Your Match - Banking Scheme Guidance</title>
      </Head>

      <div className={styles.container}>
        <header className={styles.header}>
          <button 
            onClick={() => router.push(`/schemes/${bank}`)} 
            className={styles.backButton}
          >
            ← Back to Schemes
          </button>
        </header>

        <main className={styles.main}>
          <div className={styles.content}>
            <div className={styles.intro}>
              <h1 className={styles.title}>
                Find Your <span className={styles.neonText}>Best Match</span>
              </h1>
              <p className={styles.subtitle}>
                Tell us about yourself to discover schemes from {bankName} that match your profile
              </p>
              <div className={styles.infoBox}>
                <p>
                  🔒 <strong>Privacy First:</strong> Your information is used only for filtering 
                  and is never stored or shared. This is a client-side rule-based system.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Age Field */}
              <div className={styles.formGroup}>
                <label htmlFor="age">
                  Age <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Many schemes have age-specific eligibility criteria. 
                  For example, youth schemes for 18-30, senior citizen benefits for 60+, etc.
                </p>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  min="1"
                  max="120"
                  className={errors.age ? styles.inputError : ''}
                />
                {errors.age && <span className={styles.error}>{errors.age}</span>}
              </div>

              {/* Gender Field */}
              <div className={styles.formGroup}>
                <label htmlFor="gender">
                  Gender <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Some schemes specifically target women's empowerment 
                  or provide gender-specific benefits. This helps us show you relevant options.
                </p>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={errors.gender ? styles.inputError : ''}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <span className={styles.error}>{errors.gender}</span>}
              </div>

              {/* Category Field */}
              <div className={styles.formGroup}>
                <label htmlFor="category">
                  Category <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Banks offer special schemes for SC/ST/OBC/Minority 
                  communities to promote financial inclusion with subsidized rates and benefits.
                </p>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={errors.category ? styles.inputError : ''}
                >
                  <option value="">Select category</option>
                  <option value="General">General</option>
                  <option value="SC">SC (Scheduled Caste)</option>
                  <option value="ST">ST (Scheduled Tribe)</option>
                  <option value="OBC">OBC (Other Backward Class)</option>
                  <option value="Minority">Minority</option>
                </select>
                {errors.category && <span className={styles.error}>{errors.category}</span>}
              </div>

              {/* Monthly Income Field */}
              <div className={styles.formGroup}>
                <label htmlFor="monthlyIncome">
                  Monthly Income (₹) <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Income determines eligibility for various schemes. 
                  Low-income schemes offer subsidies, while premium schemes require minimum income.
                </p>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleChange}
                  placeholder="Enter monthly income in rupees"
                  min="0"
                  className={errors.monthlyIncome ? styles.inputError : ''}
                />
                {errors.monthlyIncome && <span className={styles.error}>{errors.monthlyIncome}</span>}
              </div>

              {/* Occupation Field */}
              <div className={styles.formGroup}>
                <label htmlFor="occupation">
                  Occupation <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Specific schemes exist for students, farmers, 
                  salaried professionals, entrepreneurs, etc., each with tailored benefits.
                </p>
                <select
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={errors.occupation ? styles.inputError : ''}
                >
                  <option value="">Select occupation</option>
                  <option value="Student">Student</option>
                  <option value="Salaried">Salaried Employee</option>
                  <option value="Self-Employed">Self-Employed</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Farmer">Farmer</option>
                  <option value="Agricultural Worker">Agricultural Worker</option>
                  <option value="Retired">Retired</option>
                  <option value="Veteran">Veteran</option>
                  <option value="Other">Other</option>
                </select>
                {errors.occupation && <span className={styles.error}>{errors.occupation}</span>}
              </div>

              {/* Savings Goal Field */}
              <div className={styles.formGroup}>
                <label htmlFor="savingsGoal">
                  Primary Savings Goal <span className={styles.required}>*</span>
                </label>
                <p className={styles.helperText}>
                  <strong>Why we ask:</strong> Your goal helps us prioritize schemes. For example, 
                  education loans for students, home loans for buyers, retirement plans for seniors.
                </p>
                <select
                  id="savingsGoal"
                  name="savingsGoal"
                  value={formData.savingsGoal}
                  onChange={handleChange}
                  className={errors.savingsGoal ? styles.inputError : ''}
                >
                  <option value="">Select your goal</option>
                  <option value="Savings">General Savings</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business / Entrepreneurship</option>
                  <option value="Home">Home Purchase</option>
                  <option value="Investment">Investment / Wealth Building</option>
                  <option value="Retirement">Retirement Planning</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Wedding">Wedding Planning</option>
                  <option value="Environment">Green / Environment</option>
                </select>
                {errors.savingsGoal && <span className={styles.error}>{errors.savingsGoal}</span>}
              </div>

              <div className={styles.formActions}>
                <button type="submit" className={styles.submitButton}>
                  Find Matching Schemes
                  <span className={styles.arrow}>→</span>
                </button>
              </div>
            </form>

            <div className={styles.disclaimer}>
              <p>
                ℹ️ Results are based on rule-based filtering only. No AI or machine learning is used. 
                Always verify scheme details with the actual bank before making decisions.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
