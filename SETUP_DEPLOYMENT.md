# Banking Scheme Guidance System - Setup & Deployment Guide

## Quick Start

### Prerequisites
- **Node.js** version 14.0 or higher
- **npm** version 6.0 or higher
- **Git** (for version control)

### Installation Steps

#### 1. Install Dependencies
```bash
cd /path/to/BANKSCHEMEFINDER
npm install
```

Required packages:
```json
{
  "express": "^4.17.1",
  "cors": "^2.8.5"
}
```

#### 2. Start the Server

**Development Mode:**
```bash
npm run dev
# or
node server/index.js
```

**Production Mode:**
```bash
npm start
```

Expected output:
```
🚀 Banking Scheme Guidance System Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on http://localhost:5000
Environment: development

📊 Available Endpoints:

  ✓ GET  /api/health              - Server health check
  ✓ GET  /api/banks               - Get all banks
  ✓ GET  /api/categories          - Get all loan categories
  ✓ GET  /api/schemes             - Get all schemes
  ✓ GET  /api/schemes/:id         - Get specific scheme
  ✓ POST /api/filter              - Filter schemes by criteria
  ✓ POST /api/compare             - Compare multiple schemes
```

#### 3. Verify Setup

**Test Health:**
```bash
curl http://localhost:5000/api/health
```

**Run Full Test Suite:**
```bash
node server/api-tests.js
```

---

## Project Structure

```
BANKSCHEMEFINDER/
├── server/
│   ├── index.js                 ← Main server file (PRODUCTION-READY)
│   ├── api-tests.js            ← Comprehensive API test suite
│   └── data/
│       ├── bank_schemes.json    ← Central dataset (45+ schemes)
│       └── schemes_backup.json  ← Backup (legacy)
├── pages/                       ← Next.js frontend pages
├── styles/                      ← CSS modules for UI
├── API_DOCUMENTATION.md         ← Complete API reference
├── DATASET_DOCUMENTATION.md     ← Data structure guide
├── package.json                 ← Dependencies
└── README.md                    ← Project README
```

---

## Environment Variables

Create a `.env` file in the project root:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000,http://localhost:3001

# Optional
DEBUG=true
LOG_LEVEL=info
```

---

## API Endpoints Summary

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| GET | `/api/health` | Server health check | No |
| GET | `/api/banks` | Get all banks | No |
| GET | `/api/categories` | Get all loan categories | No |
| GET | `/api/schemes` | Get all schemes with filters | No |
| GET | `/api/schemes/:id` | Get specific scheme | No |
| POST | `/api/filter` | Filter schemes (Core feature) | No |
| POST | `/api/compare` | Compare schemes | No |

---

## Common Operations

### 1. Filter Schemes for an Individual

**Use Case**: Find best personal loan for 30-year-old with ₹6 LPA income

```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "age": 30,
    "income": 600000,
    "purpose": "Personal Loans",
    "limit": 5
  }'
```

**Expected Response**:
```json
{
  "success": true,
  "criteria": {
    "age": 30,
    "income": 600000,
    "loanAmount": 0,
    "purpose": "Personal Loans",
    "bank": null
  },
  "totalSchemes": 45,
  "matchedSchemes": 3,
  "schemes": [
    {
      "id": "sbi_personal_1",
      "scheme_name": "SBI Personal Loan",
      "bank_name": "State Bank of India (SBI)",
      "interest_rate_range": "9.0% - 13.0%",
      "matchScore": 95,
      ...
    }
  ]
}
```

### 2. Find Schemes Without Collateral

```bash
curl -X GET "http://localhost:5000/api/schemes" \
  -H "Accept: application/json"
```

Then filter in client-side code where `collateral_required` contains "No collateral".

### 3. Compare Top 3 Personal Loans

```bash
curl -X POST http://localhost:5000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "schemeIds": ["sbi_personal_1", "hdfc_personal_1", "axis_personal_1"]
  }'
```

### 4. Get All Education Loans

```bash
curl -X GET "http://localhost:5000/api/schemes?category=Education%20Loans"
```

---

## Frontend Integration

### Using in React/Next.js

```javascript
// pages/filter.js
import { useState } from 'react';

export default function FilterPage() {
  const [criteria, setCriteria] = useState({
    age: 28,
    income: 500000,
    purpose: 'Home Loans',
    loanAmount: 2000000
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(criteria)
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.schemes);
        console.log(`Found ${data.matchedSchemes} matching schemes`);
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleFilter} disabled={loading}>
        {loading ? 'Searching...' : 'Find Schemes'}
      </button>
      
      <div>
        {results.map(scheme => (
          <div key={scheme.id}>
            <h3>{scheme.scheme_name}</h3>
            <p>{scheme.bank_name}</p>
            <p>Interest: {scheme.interest_rate_range}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Production Deployment

### Option 1: Deploy to Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# For production
vercel --prod
```

**Vercel Configuration** (`vercel.json`):
```json
{
  "version": 2,
  "builds": [
    { "src": "server/index.js", "use": "@vercel/node" },
    { "src": "pages/**/*.js", "use": "@vercel/next" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "server/index.js" },
    { "src": "/(.*)", "dest": "pages/$1" }
  ]
}
```

### Option 2: Deploy to Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Create Heroku app
heroku create your-app-name

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

**Procfile**:
```
web: node server/index.js
```

### Option 3: Deploy to AWS EC2

```bash
# 1. Connect to EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# 2. Install Node.js
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs

# 3. Clone repository
git clone https://github.com/your-repo.git
cd your-repo

# 4. Install dependencies
npm install

# 5. Start server (use PM2 for process management)
npm install -g pm2
pm2 start server/index.js --name "banking-scheme-api"
pm2 save
pm2 startup
```

### Option 4: Docker Deployment

**Dockerfile**:
```dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "server/index.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'

services:
  api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
    restart: unless-stopped
```

**Build and run**:
```bash
docker build -t banking-scheme-api .
docker run -p 5000:5000 banking-scheme-api
```

---

## Performance Optimization

### 1. Enable Caching
```javascript
// Add to server/index.js
app.use((req, res, next) => {
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  next();
});
```

### 2. Enable GZIP Compression
```bash
npm install compression
```

```javascript
const compression = require('compression');
app.use(compression());
```

### 3. Rate Limiting
```bash
npm install express-rate-limit
```

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

---

## Monitoring & Logging

### Using PM2 for Production

```bash
# Install PM2
npm install -g pm2

# Start app
pm2 start server/index.js --name "banking-api"

# Monitor
pm2 monit

# Logs
pm2 logs

# Auto-restart on reboot
pm2 startup
pm2 save
```

### PM2 Ecosystem File (`ecosystem.config.js`)
```javascript
module.exports = {
  apps: [
    {
      name: 'banking-scheme-api',
      script: './server/index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 5000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 5000
      }
    }
  ]
};
```

### Health Check Monitoring

```bash
# Add to crontab for periodic health checks
* * * * * curl -f http://localhost:5000/api/health || systemctl restart banking-api
```

---

## Troubleshooting

### Issue: "Port 5000 already in use"

```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different port
PORT=5001 node server/index.js
```

### Issue: "Cannot find module 'express'"

```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: CORS Errors

```javascript
// Ensure CORS is configured correctly
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

### Issue: Slow Responses

```bash
# Check memory usage
node --max-old-space-size=4096 server/index.js

# Profile with Node.js inspector
node --inspect server/index.js
# Open chrome://inspect in Chrome
```

---

## Testing

### Run Test Suite
```bash
node server/api-tests.js
```

### Manual Testing with cURL

```bash
# Test health
curl -X GET http://localhost:5000/api/health

# Test banks
curl -X GET http://localhost:5000/api/banks

# Test filter with real data
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "age": 28,
    "income": 500000,
    "purpose": "Home Loans"
  }'
```

### API Response Validation

```bash
# Pipe to jq for pretty printing
curl -X GET http://localhost:5000/api/banks | jq .

# Validate JSON
curl -X GET http://localhost:5000/api/schemes | jq . > /dev/null && echo "Valid"
```

---

## Database Updates

### Adding New Schemes

1. Edit `server/data/bank_schemes.json`
2. Add new scheme object to `schemes` array
3. Verify JSON validity: `node -e "require('./server/data/bank_schemes.json')"`
4. Restart server
5. Test new scheme: `curl http://localhost:5000/api/schemes/new_scheme_id`

### Updating Interest Rates

```bash
# Edit file
nano server/data/bank_schemes.json

# Find and update interest_rate_range field
# Update last_updated timestamp

# Verify changes
npm run test
```

---

## Backup & Recovery

### Backup Strategy
```bash
# Create backup
cp server/data/bank_schemes.json server/data/bank_schemes.backup.$(date +%Y%m%d).json

# Restore from backup
cp server/data/bank_schemes.backup.20260225.json server/data/bank_schemes.json
```

### Git Workflow
```bash
git add server/data/bank_schemes.json
git commit -m "Update schemes - Feb 2026"
git tag -a v1.1.0 -m "Version 1.1.0"
git push origin main --tags
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-25 | Initial release with 45 schemes |
| TBD | TBD | Future updates |

---

## Support Resources

- **API Documentation**: See `API_DOCUMENTATION.md`
- **Dataset Documentation**: See `DATASET_DOCUMENTATION.md`
- **Test Suite**: Run `node server/api-tests.js`
- **Official Banks**: Refer to individual bank websites for latest updates

---

## License

This project is for educational and informational purposes. Banking scheme information should be verified from official bank websites before use.

---

**Last Updated**: February 25, 2026  
**Maintained By**: Banking Scheme Guidance System Team
