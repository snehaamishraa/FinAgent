import schemes from '../../server/data/schemes.json';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const banks = Object.keys(schemes);
    res.status(200).json({ banks });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load banks' });
  }
}
