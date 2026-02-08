import schemes from '../../../server/data/schemes.json';

export default function handler(req, res) {
  const { bankId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!bankId || !schemes[bankId]) {
      return res.status(404).json({ error: 'Bank not found' });
    }

    res.status(200).json({ 
      bank: bankId, 
      schemes: schemes[bankId] 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load schemes' });
  }
}
