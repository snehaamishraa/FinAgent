# 🎴 Quick Reference Card

**Banking Scheme Guidance System** - One-page reference for common tasks.

---

## ⚡ Quick Commands

### Starting the System
```bash
npm install                    # First time only
npm run dev:all               # Start both frontend & backend
# OR:
npm run server                # Terminal 1: Start backend
npm run dev                   # Terminal 2: Start frontend
```

### Opening in Browser
```
Frontend: http://localhost:3000
Backend:  http://localhost:5000
API Docs: http://localhost:5000/api/health
```

### Testing
```bash
npm run test              # Run all 12 tests
npm run health            # Check if backend is running
npm run validate:json     # Check database validity
npm run filter:example    # See API in action
```

### Common API Calls
```bash
# List all banks
npm run list:banks

# List all categories
npm run list:categories

# Count schemes
npm run list:schemes

# Show database stats
npm run lint:schemes

# Backup database
npm run backup
```

---

## 🔌 API Endpoints (Quick Reference)

| Method | Endpoint | Purpose | Response |
|--------|----------|---------|----------|
| GET | `/api/health` | Status | `{status: "ok"}` |
| GET | `/api/banks` | Banks | `{data: [banks]}` |
| GET | `/api/categories` | Categories | `{data: [cats]}` |
| GET | `/api/schemes` | All schemes | `{schemes: [...]}` |
| GET | `/api/schemes/:id` | One scheme | `{data: {...}}` |
| POST | `/api/filter` | Filter schemes | `{schemes: [...]}` |
| POST | `/api/compare` | Compare | `{comparison: [...]}` |

---

## 📝 API Examples (cURL)

### List Banks
```bash
curl http://localhost:5000/api/banks | jq .
```

### Filter Schemes
```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "age": 28,
    "income": 600000,
    "purpose": "Home Loans",
    "limit": 3
  }' | jq .
```

### Get Scheme by ID
```bash
curl http://localhost:5000/api/schemes/sbi_education_1 | jq .
```

### Compare Schemes
```bash
curl -X POST http://localhost:5000/api/compare \
  -H "Content-Type: application/json" \
  -d '{"schemeIds": ["sbi_home_1", "hdfc_home_1"]}' | jq .
```

---

## 📁 Important Files

| File | Purpose | Edit for |
|------|---------|----------|
| `/server/index.js` | API server | API logic |
| `/server/data/bank_schemes.json` | Database | Add/update schemes |
| `/pages/*.js` | Frontend pages | Frontend features |
| `/styles/*.css` | Styling | Theme changes |
| `package.json` | Config | Dependencies/scripts |
| `.env` | Environment | Settings |

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check if port 5000 is free: `lsof -i :5000` |
| Frontend won't start | Check if port 3000 is free: `lsof -i :3000` |
| "Cannot find module" | Run: `npm install` |
| CORS error | Ensure backend is on port 5000 |
| JSON error | Run: `npm run validate:json` |
| Tests failing | Run: `npm run health` to check backend |
| API not responding | Verify backend is running: `npm run server` |

---

## 🚀 Frontend Integration (React)

### Simple API Call
```javascript
const response = await fetch('http://localhost:5000/api/filter', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    age: 28,
    income: 600000,
    purpose: 'Home Loans'
  })
});

const data = await response.json();
console.log(data.schemes); // See results
```

### Full Integration Example
See: [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)

---

## 📊 Database Schema (JSON)

```json
{
  "schemes": [
    {
      "id": "sbi_home_1",
      "scheme_name": "SBI Home Loan",
      "bank_name": "State Bank of India (SBI)",
      "scheme_category": "Home Loans",
      "description": "Simple description",
      "interest_rate_range": "7.2% - 9.5%",
      "loan_amount_min": 300000,
      "loan_amount_max": 25000000,
      "minimum_age": 21,
      "maximum_age": 65,
      "minimum_income_required": 300000,
      "repayment_tenure": "5-20 years",
      "processing_fee": "0-1%",
      "collateral_required": "No collateral",
      "key_features": ["Feature 1"],
      "pros": ["Pro 1"],
      "cons": ["Con 1"],
      "eligibility_criteria": ["Criterion 1"],
      "required_documents": ["Document 1"],
      "official_website_reference": "https://...",
      "last_updated": "2026-02-25"
    }
  ]
}
```

---

## 🎯 Common Workflow

### Adding a New Scheme
1. Edit: `server/data/bank_schemes.json`
2. Add object to `schemes` array
3. Run: `npm run validate:json` (verify)
4. Restart: `npm run server`
5. Test: `npm run test`

### Fixing a Scheme
1. Find scheme in: `server/data/bank_schemes.json`
2. Edit fields
3. Save file
4. Run: `npm run validate:json`
5. Restart: `npm run server`

### Testing an Endpoint
1. Backend running: `npm run server`
2. Run test: `npm run test` (all tests)
3. Or test specific: `curl http://localhost:5000/api/health`

### Deploying to Production
1. See: [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Deployment section
2. Choose platform (Vercel/Heroku/AWS/Docker)
3. Follow platform-specific steps
4. Deploy: `git push heroku main` (example)

---

## 🔍 Debugging Commands

```bash
# Check if backend running
npm run health

# Test all endpoints
npm run test

# Validate database
npm run validate:json

# Show database stats
npm run lint:schemes

# See all available commands
npm run

# Manual endpoint test
curl -X GET http://localhost:5000/api/banks

# Pretty print JSON response
curl http://localhost:5000/api/banks | jq .

# Monitor API calls (in another terminal)
tail -f server/access.log  # if logging enabled

# Check process on port 5000
lsof -i :5000

# Kill process on port 5000
kill -9 <PID>

# Use different port
PORT=5001 npm run server
```

---

## 📚 Documentation Quick Access

| When You Need | Read This |
|---------------|-----------|
| Quick overview | [START_HERE.md](START_HERE.md) |
| 5-min setup | [QUICKSTART.md](QUICKSTART.md) |
| All docs index | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) |
| Full setup guide | [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) |
| API details | [API_DOCUMENTATION.md](API_DOCUMENTATION.md) |
| React integration | [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) |
| Data structure | [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md) |
| Testing guide | [TESTING_GUIDE.md](TESTING_GUIDE.md) |
| System summary | [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md) |
| Getting started | [GETTING_STARTED_CHECKLIST.md](GETTING_STARTED_CHECKLIST.md) |

---

## ⚙️ Configuration

### Environment Variables (`.env`)
```
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
DEBUG=true
```

### Enable in code:
```javascript
const PORT = process.env.PORT || 5000;
const isDev = process.env.NODE_ENV === 'development';
```

---

## 📈 Performance Targets

| Metric | Target | Actual |
|--------|--------|--------|
| API response | < 5ms | ___ |
| Frontend load | < 3s | ___ |
| Database load | < 2ms | ___ |
| Test suite | < 5s | ___ |
| Memory usage | < 100MB | ___ |
| CPU at idle | < 5% | ___ |

---

## ✅ Health Check

System is healthy when:

```bash
✓ npm run health           # Returns {status: "ok"}
✓ npm run test             # All 12 tests pass
✓ npm run validate:json    # JSON is valid
✓ browser loads            # No errors
✓ filters work             # Results appear
✓ compare works            # Can select schemes
```

---

## 🎯 Most Used Tips

### Tip 1: Keep Terminals Open
- Terminal 1: `npm run server` (backend)
- Terminal 2: `npm run dev` (frontend)
- Terminal 3: Run commands/tests

### Tip 2: Use npm run Scripts
Instead of: `curl http://...`  
Use: `npm run list:banks` (easier)

### Tip 3: Check Logs First
- Backend errors → Terminal 1
- Frontend errors → Terminal 2
- Browser console → F12

### Tip 4: Validate Before Committing
Run: `npm run test` (verify everything works)

### Tip 5: Use jq for JSON
```bash
curl http://localhost:5000/api/banks | jq .
# Much prettier than raw JSON!
```

---

## 🚀 Deploy Quickly

### To Vercel (Easiest)
```bash
npm install -g vercel
vercel --prod
```

### To Heroku
```bash
git push heroku main
```

### To Docker
```bash
docker build -t banking-api .
docker run -p 5000:5000 banking-api
```

See [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) for details.

---

## 📞 Quick Help

| Question | Command |
|----------|---------|
| Is it working? | `npm run health` |
| Do tests pass? | `npm run test` |
| Database OK? | `npm run validate:json` |
| Show stats? | `npm run lint:schemes` |
| See API? | `npm run filter:example` |
| List commands? | `npm run` |

---

## 🎓 Learning Path

1. **Day 1:** [START_HERE.md](START_HERE.md) (2 min)
2. **Day 2:** [QUICKSTART.md](QUICKSTART.md) (5 min)
3. **Day 3:** Code exploration + testing
4. **Day 4:** [Role-specific doc](DOCUMENTATION_INDEX.md)
5. **Day 5:** Deploy

---

## 🎉 Success!

Your system is working when you:

1. ✓ Can start both frontend and backend
2. ✓ Open browser to http://localhost:3000
3. ✓ Enter filter criteria and see results
4. ✓ Run tests and all pass
5. ✓ Can compare schemes

---

**Print this page for quick reference!** 📄

---

*Last Updated: February 25, 2026*  
*Version: 1.0.0*
