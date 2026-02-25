# ✅ Testing & Verification Guide

Complete guide to testing the Banking Scheme Guidance System.

---

## 🚀 Quick Tests (5 minutes)

### Test 1: Health Check
```bash
npm run health
```

**Expected Response:**
```json
{ "status": "ok" }
```

**What it tests**: Backend server is running and responding

---

### Test 2: List All Banks  
```bash
npm run list:banks
```

**Expected Response:**
```json
{
  "success": true,
  "data": [
    "State Bank of India (SBI)",
    "HDFC Bank",
    ...8 banks total
  ]
}
```

**What it tests**: API can read and return data

---

### Test 3: List Categories
```bash
npm run list:categories
```

**Expected Response:**
Lists 8 categories: Education, Home, Personal, MSME, Agriculture, Government, Fixed Deposits, Savings

**What it tests**: Category retrieval working

---

### Test 4: Count Schemes
```bash
npm run list:schemes
```

**Expected Response:**
```
45
```

**What it tests**: Database has expected number of schemes

---

### Test 5: Validate Database
```bash
npm run validate:json
```

**Expected Response:**
```
✓ JSON is valid
```

**What it tests**: Database file is valid JSON

---

### Test 6: Filter Example
```bash
npm run filter:example
```

**Expected Response:**
```json
{
  "success": true,
  "criteria": {...},
  "totalSchemes": 45,
  "matchedSchemes": 3,
  "schemes": [
    {
      "id": "...",
      "scheme_name": "...",
      "matchScore": 95,
      ...
    },
    ...
  ]
}
```

**What it tests**: Main filtering feature with match scoring

---

## 🧪 Full Test Suite (2 minutes)

```bash
npm run test
```

### Expected Output:
```
Running API Test Suite
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Test 1: GET /api/health - PASSED
✓ Test 2: GET /api/banks - PASSED
✓ Test 3: GET /api/categories - PASSED
✓ Test 4: GET /api/schemes - PASSED
✓ Test 5: GET /api/schemes?category=X - PASSED
✓ Test 6: GET /api/schemes/:id - PASSED
✓ Test 7: POST /api/filter - PASSED
✓ Test 8: POST /api/filter (error) - PASSED
✓ Test 9: POST /api/filter (by bank) - PASSED
✓ Test 10: POST /api/compare - PASSED
✓ Test 11: POST /api/compare (limit) - PASSED
✓ Test 12: POST /api/filter (agriculture) - PASSED

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Results: 12/12 tests passed ✓
Total time: ~2-3 seconds
```

---

## 📊 Individual Endpoint Testing

### Test GET /api/banks
```bash
curl -s http://localhost:5000/api/banks | jq .
```

**What to verify:**
- ✓ Response is valid JSON
- ✓ `success: true` field
- ✓ `data` array has 8 items
- ✓ Each item is a string (bank name)

---

### Test GET /api/categories
```bash
curl -s http://localhost:5000/api/categories | jq .
```

**What to verify:**
- ✓ Response is valid JSON
- ✓ 8 categories present
- ✓ Categories: Education, Home, Personal, MSME, Agriculture, Government, Fixed Deposits, Savings

---

### Test GET /api/schemes
```bash
curl -s http://localhost:5000/api/schemes | jq '.schemes | length'
```

**Expected Response:**
```
45
```

---

### Test GET /api/schemes with Filter
```bash
curl -s "http://localhost:5000/api/schemes?category=Home%20Loans" | jq '.schemes | length'
```

**What to verify:**
- ✓ Returns only Home Loans
- ✓ Result is a number > 0

---

### Test GET /api/schemes/:id
```bash
curl -s http://localhost:5000/api/schemes/sbi_education_1 | jq .data.scheme_name
```

**Expected Response:**
```
"SBI Education Loan"
```

**What to verify:**
- ✓ Scheme exists
- ✓ All required fields present
- ✓ Data is consistent

---

### Test POST /api/filter (Main Feature)
```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{
    "age": 28,
    "income": 600000,
    "purpose": "Home Loans",
    "loanAmount": 2000000,
    "limit": 3
  }' | jq .
```

**What to verify:**
- ✓ `success: true`
- ✓ `matchedSchemes` > 0
- ✓ Schemes array has results
- ✓ Each scheme has `matchScore` (0-100)
- ✓ Results sorted (highest score first)

---

### Test POST /api/compare
```bash
curl -X POST http://localhost:5000/api/compare \
  -H "Content-Type: application/json" \
  -d '{
    "schemeIds": ["sbi_education_1", "hdfc_education_1", "icici_education_1"]
  }' | jq .
```

**What to verify:**
- ✓ `success: true`
- ✓ `comparison` array has 3 items
- ✓ Each item has all scheme fields

---

## 🧐 Advanced Testing

### Test: Response Time
```bash
time curl -s http://localhost:5000/api/health > /dev/null
```

**Expected:** < 10ms

### Test: Concurrent Requests
```bash
for i in {1..10}; do
  curl -s http://localhost:5000/api/schemes &
done
wait
```

**Expected:** All requests complete successfully

### Test: Large Response
```bash
curl -s http://localhost:5000/api/schemes | jq '. | keys'
```

**Expected:** Response < 500 KB

### Test: Error Handling
```bash
curl -X POST http://localhost:5000/api/filter \
  -H "Content-Type: application/json" \
  -d '{"age": "invalid"}'
```

**Expected:** Error message (not crash)

---

## 🔍 Debugging

### If Tests Fail: Backend Not Running

**Check 1:**
```bash
npm run health
```

If error, start backend:
```bash
npm run server
```

### If Tests Fail: JSON Invalid

```bash
npm run validate:json
```

If error, check `server/data/bank_schemes.json` syntax.

### If Tests Fail: Port in Use

```bash
lsof -i :5000
```

Kill process:
```bash
kill -9 <PID>
```

### If Tests Fail: Module Not Found

```bash
npm install
npm install express cors
```

### If Tests Fail: Postman/cURL Not Found

**For macOS:**
```bash
brew install curl
brew install jq
```

**For Ubuntu:**
```bash
sudo apt-get install curl jq
```

---

## 📋 Test Checklist

After each change, verify:

- [ ] `npm run test` - All 12 tests pass
- [ ] `npm run health` - Returns status ok
- [ ] `npm run validate:json` - JSON is valid
- [ ] `npm run filter:example` - Filter works
- [ ] Frontend loads at http://localhost:3000
- [ ] Can click "Find Schemes" without errors
- [ ] API responses < 10ms

---

## 🚀 Pre-Deployment Testing

Before deploying to production:

### 1. Full Test Suite
```bash
npm run test
```
✓ All 12 tests pass

### 2. Performance Test
```bash
# Should respond < 50ms even under load
ab -n 100 -c 10 http://localhost:5000/api/schemes
```

### 3. Load Test
```bash
# Verify it handles concurrent requests
wrk -t4 -c100 -d30s http://localhost:5000/api/health
```

### 4. Database Integrity
```bash
npm run lint:schemes
```
✓ Shows correct bank/category counts

### 5. Frontend Test
- [ ] Open http://localhost:3000
- [ ] Click all navigation links
- [ ] Test filter with various inputs
- [ ] Test comparison feature
- [ ] Verify no console errors

### 6. API Documentation Test
- [ ] Follow examples in [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
- [ ] All examples work as documented

---

## ✅ Success Criteria

System is working when:

- ✓ All 12 automated tests pass
- ✓ API responds in < 5ms average
- ✓ Database loads < 2ms
- ✓ Frontend loads in < 3 seconds
- ✓ Can filter schemes successfully
- ✓ Can compare schemes
- ✓ Can view details
- ✓ No console errors
- ✓ No API errors
- ✓ All endpoints respond

---

## 📊 Performance Baselines

| Metric | Expected | Actual |
|--------|----------|--------|
| Health check | < 5ms | ___ |
| Get banks | < 3ms | ___ |
| Get categories | < 3ms | ___ |
| Get schemes | < 5ms | ___ |
| Filter (main) | < 10ms | ___ |
| Compare | < 8ms | ___ |
| Frontend load | < 3s | ___ |
| Database size | < 500KB | ___ |

---

## 🐛 Troubleshooting Tests

### Issue: "Cannot GET /api/health"
**Solution:** Backend not running. Run `npm run server`

### Issue: "Connection refused"
**Solution:** Backend on wrong port. Check it's port 5000: `lsof -i :5000`

### Issue: "CORS error"
**Solution:** Frontend on wrong port. Should be 3000. Check `npm run dev`

### Issue: "JSON parse error"
**Solution:** Database file corrupted. Run `npm run validate:json`

### Issue: "Tests timeout"
**Solution:** Backend too slow. Check CPU/Memory usage. Restart: `npm run server`

### Issue: "Wrong number of schemes"
**Solution:** Database modified. Check `server/data/bank_schemes.json` has 45 schemes

---

## 🎓 Understanding Test Output

### Sample Test Output Explained

```
✓ Test 7: POST /api/filter - PASSED
  • Criteria: age=28, income=600000, purpose=Home Loans
  • Total schemes searched: 45
  • Matched schemes: 3
  • Top result: SBI Home Loan (matchScore: 95)
  • Response time: 4.2ms
```

**What each part means:**
- `✓ PASSED` - Test succeeded
- `age=28` - Input criteria
- `Matched schemes: 3` - Found 3 schemes matching criteria
- `matchScore: 95` - How well scheme matches (0-100)
- `4.2ms` - How fast API responded

---

## 📈 Monitoring in Production

After deployment, monitor:

```bash
# Health endpoint (use in monitoring service)
curl -f http://yourserver.com/api/health || alert

# Response time
curl -w "Time: %{time_total}s\n" http://yourserver.com/api/banks

# Error rate
# Check logs for 5xx errors

# Database size
# Warn if > 1MB
```

---

## ✨ Final Verification

When everything works:

1. ✓ `npm run server` - Backend starts
2. ✓ `npm run dev` - Frontend starts  
3. ✓ Browser shows home page
4. ✓ `npm run test` - All 12 tests pass
5. ✓ Can search schemes
6. ✓ Can compare schemes
7. ✓ All pages load

**Congratulations! Your system is ready.**

---

## 🆘 Still Having Issues?

1. Check [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Troubleshooting section
2. Run `npm run test` for detailed error messages
3. Check console logs in both terminals
4. Verify database: `npm run validate:json`
5. Review [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for expected responses

---

**Testing is crucial. Run these checks regularly!** 🧪✅
