import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import styles from '../styles/CategoryDetails.module.css';
import InfoIcon from '../components/InfoIcon';
import { categoryFieldExplanations, schemeExplanations } from '../utils/explanations';

const categoryQuestions = {
  'Education Loans': {
    title: 'Education Loan Details',
    hint: 'Share your student profile so we can show eligible education schemes.',
    fields: [
      { key: 'age', label: 'Student Age', type: 'number', min: 16, max: 45, required: true },
      { key: 'income', label: 'Co-applicant Monthly Income (₹)', type: 'number', min: 0, required: true },
      {
        key: 'educationLevel',
        label: 'Course Level',
        type: 'select',
        required: true,
        options: ['Undergraduate', 'Postgraduate', 'Professional Course']
      }
    ]
  },
  'Home Loans': {
    title: 'Home Loan Details',
    hint: 'Provide basic property and income details for relevant home loan schemes.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 70, required: true },
      { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true },
      { key: 'loanAmount', label: 'Required Loan Amount (₹)', type: 'number', min: 100000, required: true }
    ]
  },
  'Personal Loans': {
    title: 'Personal Loan Details',
    hint: 'Enter loan requirement and profile for better personal loan matches.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 65, required: true },
      { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true },
      { key: 'loanAmount', label: 'Required Loan Amount (₹)', type: 'number', min: 50000, required: true }
    ]
  },
  'MSME / Business Loans': {
    title: 'Business Loan Details',
    hint: 'Share business profile to find suitable MSME and business loan schemes.',
    fields: [
      { key: 'age', label: 'Applicant Age', type: 'number', min: 18, max: 70, required: true },
      { key: 'income', label: 'Business Monthly Income (₹)', type: 'number', min: 0, required: true },
      {
        key: 'businessType',
        label: 'Business Type',
        type: 'select',
        required: true,
        options: ['Manufacturing', 'Services', 'Trading', 'Startup']
      }
    ]
  },
  'Agriculture Loans': {
    title: 'Agriculture Loan Details',
    hint: 'Provide farm profile details to find relevant agriculture schemes.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 75, required: true },
      { key: 'income', label: 'Monthly Household Income (₹)', type: 'number', min: 0, required: true },
      {
        key: 'farmingType',
        label: 'Farming Type',
        type: 'select',
        required: true,
        options: ['Crop Farming', 'Dairy', 'Poultry', 'Mixed Farming']
      }
    ]
  },
  'Savings Accounts': {
    title: 'Savings Profile Details',
    hint: 'Tell us your savings profile to get suitable account options.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 90, required: true },
      { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true },
      {
        key: 'accountType',
        label: 'Preferred Account Type',
        type: 'select',
        required: true,
        options: ['Regular Savings', 'Salary Account', 'Senior Citizen Account']
      }
    ]
  },
  'Fixed Deposits': {
    title: 'Fixed Deposit Details',
    hint: 'Enter deposit requirement so we can show suitable FD schemes.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 95, required: true },
      { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true },
      { key: 'loanAmount', label: 'Deposit Amount (₹)', type: 'number', min: 1000, required: true }
    ]
  },
  'Government-backed schemes': {
    title: 'Government Scheme Details',
    hint: 'Provide your profile to match eligible government-backed schemes.',
    fields: [
      { key: 'age', label: 'Age', type: 'number', min: 18, max: 90, required: true },
      { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true },
      {
        key: 'beneficiaryType',
        label: 'Beneficiary Type',
        type: 'select',
        required: true,
        options: ['General', 'Women', 'Senior Citizen', 'Farmer', 'Student']
      }
    ]
  }
};

export default function CategoryDetails() {
  const router = useRouter();
  const category = router.query.category ? decodeURIComponent(router.query.category) : '';
  const depositType = router.query.depositType ? decodeURIComponent(router.query.depositType) : '';

  const config = useMemo(() => {
    return categoryQuestions[category] || {
      title: 'Category Details',
      hint: 'Enter your details to see relevant schemes.',
      fields: [
        { key: 'age', label: 'Age', type: 'number', min: 18, max: 90, required: true },
        { key: 'income', label: 'Monthly Income (₹)', type: 'number', min: 0, required: true }
      ]
    };
  }, [category]);

  const [formData, setFormData] = useState({});

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const isFormValid = config.fields.every((field) => {
    if (!field.required) return true;
    const value = formData[field.key];
    return value !== undefined && value !== null && String(value).trim() !== '';
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const query = new URLSearchParams({
      category,
      depositType: depositType || '',
      age: formData.age || '',
      income: formData.income || '',
      loanAmount: formData.loanAmount || '',
      occupation: formData.businessType || formData.farmingType || formData.accountType || formData.educationLevel || formData.beneficiaryType || '',
      savingsGoal: category
    });

    router.push(`/results?${query.toString()}`);
  };

  return (
    <>
      <Head>
        <title>{category ? `${category} - Details` : 'Category Details'} | FinAgent</title>
      </Head>

      <div className={styles.container}>
        <div className={styles.card}>
          <button className={styles.backButton} onClick={() => router.push('/select-bank?mode=category')}>
            ← Back to Categories
          </button>

          <div>
            <h1>{config.title}</h1>
            {depositType && <p className={styles.subtitle}>Type: {depositType}</p>}
            <p className={styles.subtitle}>{config.hint}</p>
            
            {/* Scheme explanation */}
            {schemeExplanations[category] && (
              <div className={styles.schemeExplainer}>
                <div className={styles.explainerContent}>
                  <h3>📖 What is {category}?</h3>
                  <p className={styles.simpleExplainer}>{schemeExplanations[category].simple}</p>
                  <p className={styles.detailedExplainer}>{schemeExplanations[category].detailed}</p>
                  
                  <div className={styles.benefitsRow}>
                    <div className={styles.benefitItem}>
                      <strong>✨ Benefits:</strong>
                      <p>{schemeExplanations[category].benefits}</p>
                    </div>
                    <div className={styles.benefitItem}>
                      <strong>👥 Best For:</strong>
                      <p>{schemeExplanations[category].whoNeeds}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {config.fields.map((field) => {
              const fieldExplain = categoryFieldExplanations[category]?.[field.key];
              
              return (
                <div className={styles.formGroup} key={field.key}>
                  <div className={styles.labelRow}>
                    <label htmlFor={field.key}>
                      {field.label}
                      {field.required && <span className={styles.required}>*</span>}
                    </label>
                    {fieldExplain && (
                      <InfoIcon 
                        title={fieldExplain.title}
                        description={fieldExplain.description}
                      >
                        <span></span>
                      </InfoIcon>
                    )}
                  </div>
                  
                  {field.type === 'select' ? (
                    <select
                      id={field.key}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={field.key}
                      type={field.type}
                      min={field.min}
                      max={field.max}
                      value={formData[field.key] || ''}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      placeholder={`Enter ${field.label.toLowerCase()}`}
                      required={field.required}
                    />
                  )}
                </div>
              );
            })}

            <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
              Show Relevant Schemes →
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
