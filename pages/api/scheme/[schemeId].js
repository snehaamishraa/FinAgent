import schemesData from '../../../server/data/bank_schemes.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { schemeId } = req.query;
  if (!schemeId) {
    return res.status(400).json({ success: false, error: 'Scheme ID is required' });
  }

  try {
    const normalizedId = schemeId.toString().toLowerCase();

    // iterate through all schemes and return the first match
    for (const scheme of schemesData.schemes) {
      if (scheme.id && scheme.id.toString().toLowerCase() === normalizedId) {
        // attach a simple bankId derived from bank_name if possible
        let bankId = '';
        if (scheme.bank_name) {
          const match = scheme.bank_name.match(/\(([^)]+)\)/);
          bankId = match ? match[1] : scheme.bank_name.replace(/\s+/g, '_');
        }
        // Normalize fields so frontend detail page can rely on consistent names
        const parseNumber = (val) => {
          if (typeof val === 'number') return val;
          if (!val || typeof val !== 'string') return undefined;
          const digits = val.replace(/[^0-9]/g, '');
          if (!digits) return undefined;
          return parseInt(digits, 10);
        };

        const normalized = {
          // basic identifiers
          id: scheme.id,
          name: scheme.scheme_name || scheme.name || scheme.scheme_title || '',
          bank_name: scheme.bank_name || '',
          bankId,

          // descriptive fields
          description: scheme.description || scheme.summary || '',
          interestRate: scheme.interest_rate_range || scheme.interestRate || scheme.interest || '',

          // eligibility object expected by UI
          eligibility: {
            minAge: scheme.minimum_age || scheme.min_age || null,
            maxAge: scheme.maximum_age || scheme.max_age || null,
            gender: scheme.gender || 'Any',
            categories: Array.isArray(scheme.eligibility_criteria) ? scheme.eligibility_criteria : (scheme.eligibility || []).map?.(String) || [],
            minIncome: parseNumber(scheme.minimum_income_required) || null,
            maxIncome: parseNumber(scheme.maximum_income_required) || null,
            occupations: Array.isArray(scheme.eligible_occupations) ? scheme.eligible_occupations : []
          },

          // documents / benefits / process
          documentsRequired: Array.isArray(scheme.required_documents) ? scheme.required_documents : (scheme.documentsRequired || []),
          benefits: Array.isArray(scheme.pros) ? scheme.pros : (scheme.benefits || scheme.key_features || []),
          applicationProcess: Array.isArray(scheme.application_process) ? scheme.application_process : (scheme.applicationProcess || []),

          // other helpful fields
          loan_amount_min: scheme.loan_amount_min || scheme.loanAmountMin || null,
          loan_amount_max: scheme.loan_amount_max || scheme.loanAmountMax || null,
          interest_rate_range: scheme.interest_rate_range || scheme.interestRate || null,
          repayment_tenure: scheme.repayment_tenure || scheme.tenure || null,
          bankContact: scheme.bankContact || null
        };

        return res.status(200).json({ success: true, scheme: normalized });
      }
    }

    return res.status(404).json({ success: false, error: 'Scheme not found' });
  } catch (error) {
    console.error('Error in /api/scheme/[schemeId]:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch scheme', message: error.message });
  }
}