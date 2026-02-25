# 🚀 Quick Start Guide

Get the Banking Scheme Guidance System running in 5 minutes.

## Step 1: Install Dependencies (1 minute)

```bash
cd /path/to/BANKSCHEMEFINDER
npm install
```

## Step 2: Start the Backend Server (in Terminal 1)

```bash
npm run server
```

Expected output:
```
🚀 Banking Scheme Guidance System Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on http://localhost:5000
```

## Step 3: Start the Frontend (in Terminal 2)

```bash
npm run dev
```

Expected output:
```
> next dev
  ▲ Next.js 14.1.0

  ✓ Local:        http://localhost:3000
```

## Step 4: Open Browser

Visit: **http://localhost:3000**

---

## ✅ Verify Everything Works

### Test 1: Health Check
```bash
npm run health
```
Should return: `{ "status": "ok" }`

### Test 2: List All Banks
```bash
npm run list:banks
```
Should return array of 8 banks.

### Test 3: Run Full Test Suite
```bash
npm run test
```
Should show 12 tests passing ✓

### Test 4: Filter Schemes (Example)
```bash
npm run filter:example
```
Should return 3 schemes sorted by match score.

---

## 📚 Common Commands

| Command | Purpose |
|---------|---------|
| `npm run dev:all` | Run frontend + backend together |
| `npm run test` | Run comprehensive API test suite |
| `npm run validate:json` | Check dataset JSON validity |
| `npm run lint:schemes` | Show dataset statistics |
| `npm run backup` | Backup schemes database |
| `npm run start` | Production mode (frontend) |
| `npm run server:prod` | Production mode (backend) |

---

## 🎯 Quick Tasks

### Task 1: View Available Schemes
```bash
curl -s http://localhost:5000/api/schemes | jq '.schemes | length'
```

### Task 2: Filter by Age & Income
```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{"age": 28, "income": 600000, "purpose": "Home Loans"}'
```

### Task 3: Compare Top Schemes
```bash
curl -X POST http://localhost:5000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"schemeIds": ["sbi_home_1", "hdfc_home_1", "axis_home_1"]}'
```

---

## 🐛 Troubleshooting

### Issue: Port 5000 Already in Use
```bash
# Kill existing process
lsof -i :5000
kill -9 <PID>

# Or use different port
PORT=5001 npm run server
```

### Issue: "Cannot find module 'express'"
```bash
npm install express cors
```

### Issue: Frontend Can't Connect to API
- Ensure backend is running on port 5000
- Check CORS configuration in `server/index.js`
- Verify API call URL in frontend code

### Issue: Tests Failing
```bash
# Validate dataset
npm run validate:json

# Check server is running
npm run health

# Restart everything
npm install
npm run server  # in separate terminal
npm run test
```

---

## 📖 Learn More

- **API Reference**: See [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- **Dataset Structure**: See [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md)
- **Deployment**: See [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md)
- **Project Structure**: See [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)

---

## 🎓 Understanding the System

### Architecture Overview

```
┌─────────────────────┐
│   Frontend (3000)   │
│  React/Next.js      │
└──────────┬──────────┘
           │ HTTP/JSON
           ↓
┌─────────────────────┐
│  Backend (5000)     │
│  Express + Node.js  │
└──────────┬──────────┘
           │ Read JSON
           ↓
┌─────────────────────┐
│  Database           │
│  bank_schemes.json  │
│  (45+ schemes)      │
└─────────────────────┘
```

### Data Flow: Finding a Scheme

1. **User enters criteria** (age, income, loan amount, purpose)
2. **Frontend sends POST** to `/api/filter`
3. **Backend reads** `bank_schemes.json`
4. **Backend filters** schemes matching eligibility
5. **Backend calculates** match score (0-100)
6. **Backend returns** sorted schemes
7. **Frontend displays** results with details

---

## 🔍 API Endpoints

Before using the frontend, the backend provides 7 REST endpoints:

```
GET  /api/health        → {status: "ok"}
GET  /api/banks         → [bank1, bank2, ...]
GET  /api/categories    → [category1, category2, ...]
GET  /api/schemes       → {schemes: [...], total: 45}
GET  /api/schemes/:id   → {id, scheme_name, ...}
POST /api/filter        → {schemes: [...], matchedSchemes: n}
POST /api/compare       → {comparison: [...]}
```

---

## 📊 Dataset Info

- **Total Schemes**: 45+
- **Banks**: 8 major Indian banks
- **Categories**: 8 loan types (Education, Home, Personal, MSME, Agriculture, Gov-backed, Deposits, Savings)
- **Fields per Scheme**: 20+ (name, description, interest rate, tenure, etc.)
- **Language**: Simple, non-technical for regular users
- **Last Updated**: When you created the system

---

## 🚀 Next Steps

1. ✅ **Run the system** locally (you're here!)
2. 📝 **Add more schemes** to `server/data/bank_schemes.json`
3. 🎨 **Customize** the UI in `/styles/`
4. 🌐 **Deploy** to Vercel, Heroku, or AWS (see SETUP_DEPLOYMENT.md)
5. 📱 **Connect** frontend components to API endpoints
6. 🧪 **Add tests** for new features

---

## 💡 Tips

- Keep terminal windows side-by-side for frontend + backend
- Use `npm run test` regularly to catch issues early
- Check `server/api-tests.js` to see how API is used
- Review `server/data/bank_schemes.json` to understand data structure
- Use `jq` command-line tool to pretty-print JSON responses

---

## ⚡ Production Ready?

This system is production-ready with:
- ✅ Async/await architecture
- ✅ Error handling & validation
- ✅ CORS enabled
- ✅ Comprehensive tests (12 test cases)
- ✅ Complete documentation
- ✅ Deployment guides for 4 platforms

See [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) for deployment instructions.

---

**Need help?** Check the documentation files or review the test suite (`npm run test`) to see working examples.
