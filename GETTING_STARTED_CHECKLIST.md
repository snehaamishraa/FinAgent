# ✅ Getting Started Checklist

**Banking Scheme Guidance System**  
Use this checklist to ensure everything is set up correctly.

---

## 📋 Pre-Launch Checklist

### Step 1: Environment Setup ✓
- [ ] Node.js installed (v14+): `node -v`
- [ ] npm installed (v6+): `npm -v`
- [ ] Git installed: `git -v`
- [ ] VS Code or editor installed

### Step 2: Project Files ✓
- [ ] All files cloned/present in `/BANKSCHEMEFINDER`
- [ ] `package.json` exists
- [ ] `server/index.js` exists (433 lines)
- [ ] `server/data/bank_schemes.json` exists (45+ schemes)
- [ ] `pages/` folder has 8+ files
- [ ] `styles/` folder has 8 CSS files

### Step 3: Dependencies Installation ✓
```bash
npm install
```
- [ ] No errors during install
- [ ] `node_modules` folder created
- [ ] `express` module installed
- [ ] `cors` module installed
- [ ] `next` and `react` installed

### Step 4: Database Validation ✓
```bash
npm run validate:json
```
- [ ] Output shows: `✓ JSON is valid`
- [ ] No JSON syntax errors
- [ ] Database loads without issues

### Step 5: Backend Start ✓
**Terminal 1:**
```bash
npm run server
```
- [ ] Server starts without errors
- [ ] Shows: `Server running on http://localhost:5000`
- [ ] Shows all 7 endpoints listed
- [ ] No warnings or errors

### Step 6: Frontend Start ✓
**Terminal 2:**
```bash
npm run dev
```
- [ ] Frontend starts without errors
- [ ] Shows: `Local: http://localhost:3000`
- [ ] No build errors
- [ ] Ready indicator shows

### Step 7: Browser Access ✓
- [ ] Open: http://localhost:3000
- [ ] Home page loads
- [ ] Buttons visible and clickable
- [ ] No console errors (F12)
- [ ] Styling looks professional

### Step 8: API Connectivity ✓
**Terminal 3 (or new tab in terminal 1):**
```bash
npm run health
```
- [ ] Returns: `{ "status": "ok" }`
- [ ] No connection errors
- [ ] API is responsive

### Step 9: Test Suite ✓
```bash
npm run test
```
- [ ] All 12 tests pass (✓)
- [ ] No test failures
- [ ] Response times shown
- [ ] Takes ~2-3 seconds

### Step 10: Feature Testing ✓
- [ ] Can see home page
- [ ] "Find Schemes" button works
- [ ] Filter form displays
- [ ] Can enter age, income
- [ ] Can select loan purpose
- [ ] Results appear when filtering
- [ ] Can click scheme details
- [ ] Can compare schemes

---

## 🧪 Quick Verification Commands

### Health Check
```bash
npm run health
# Expected: { "status": "ok" }
```

### List Available Commands
```bash
npm run
# Shows all available scripts
```

### Test Everything
```bash
npm run test
# Expected: ✓ 12/12 tests pass
```

### Validate Database
```bash
npm run validate:json
# Expected: ✓ JSON is valid
```

### Database Stats
```bash
npm run lint:schemes
# Shows: Total schemes: 45, Banks: 8, Categories: 8
```

### Filter Example
```bash
npm run filter:example
# Shows example API response with matching schemes
```

---

## 🎯 Common Starting Issues & Solutions

### Issue: "npm: command not found"
**Solution:**
1. Install Node.js from nodejs.org
2. Restart terminal
3. Run: `npm -v` to verify

### Issue: "Cannot find module 'express'"
**Solution:**
1. Run: `npm install`
2. Wait for completion
3. Try again

### Issue: "Port 5000 already in use"
**Solution:**
1. Find process: `lsof -i :5000`
2. Kill it: `kill -9 <PID>`
3. Or use different port: `PORT=5001 npm run server`

### Issue: "Cannot GET /"
**Solution:**
1. Check frontend is running: `npm run dev` in terminal 2
2. Check port is 3000
3. Try: http://localhost:3000

### Issue: "CORS error" in browser
**Solution:**
1. Ensure backend is running on port 5000
2. Check CORS is configured in `server/index.js`
3. Frontend should be on port 3000 (localhost)

### Issue: "JSON parse error in database"
**Solution:**
1. Run: `npm run validate:json`
2. If error, check `server/data/bank_schemes.json`
3. Use JSON validator online if needed

### Issue: Tests timing out
**Solution:**
1. Check backend is running
2. Run: `npm run health` - verify connection
3. Increase timeout if needed
4. Check CPU/memory usage

---

## 📚 Documentation Quick Links

| Need | File | Read Time |
|------|------|-----------|
| Quick start | [START_HERE.md](START_HERE.md) | 2 min |
| Full setup | [QUICKSTART.md](QUICKSTART.md) | 5 min |
| API reference | [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | 15 min |
| React integration | [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) | 20 min |
| Deployment | [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) | 20 min |
| System overview | [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md) | 5 min |
| All docs index | [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) | 5 min |

---

## ✨ Success Indicators

System is working correctly when:

### ✓ Terminal Output
- Backend shows: `Server running on http://localhost:5000`
- Frontend shows: `Local: http://localhost:3000`
- No error messages
- No warnings about ports

### ✓ Browser
- Page loads in < 3 seconds
- Styling looks professional (dark theme)
- All buttons are clickable
- Navigation works
- No console errors (F12)

### ✓ API
- Health check responds
- All tests pass
- Filter feature works
- Results show match scores
- Details view works

### ✓ Database
- 45 schemes loaded
- 8 banks available
- 8 categories available
- Data valid JSON

---

## 🚀 Next Immediate Steps

After everything is working:

### Step 1: Explore the Code
- [ ] Open `server/index.js` - Understand API structure
- [ ] Open `server/data/bank_schemes.json` - See data format
- [ ] Browse `pages/` - Understand frontend structure
- [ ] Check `styles/` - See styling approach

### Step 2: Test Features
- [ ] Use filter feature with different inputs
- [ ] Compare different schemes
- [ ] Check all navigation links
- [ ] Try on mobile browser (responsive test)

### Step 3: Run All Tests
- [ ] `npm run test` - Verify all working
- [ ] `npm run validate:json` - Verify data
- [ ] `npm run lint:schemes` - Check stats

### Step 4: Choose Your Path
- **Going to Deploy?** → Read [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md)
- **Going to Develop?** → Read [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md)
- **Going to Add Data?** → Read [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md)
- **Need Full Understanding?** → Read [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md)

---

## 🎓 Understanding the Architecture

### Three Main Parts:

1. **Frontend (Port 3000)**
   - React/Next.js
   - User sees this
   - Makes API calls
   - Location: `/pages/` and `/styles/`

2. **Backend (Port 5000)**
   - Express.js server
   - Processes requests
   - Returns data
   - Location: `/server/index.js`

3. **Database**
   - JSON file with schemes
   - 45+ banking schemes
   - Location: `/server/data/bank_schemes.json`

### How It Works:
```
User → Frontend (3000) → API Call → Backend (5000) → Read JSON → Return Data → Show in Frontend
```

---

## 📊 Performance Expectations

| Operation | Expected Time |
|-----------|----------------|
| Page load | < 3 seconds |
| API call | < 5 ms |
| Database load | < 2 ms |
| Filter response | < 10 ms |
| Test suite | < 3 seconds |

---

## 💾 Backup & Recovery

### Create Backup
```bash
npm run backup
# Creates timestamped backup of schemes database
```

### Restore Backup
```bash
cp server/data/bank_schemes.backup.YYYYMMDD_HHMMSS.json server/data/bank_schemes.json
```

---

## 🔍 Debugging Tips

### Enable More Logging
```bash
# In server/index.js, near top:
process.env.DEBUG = 'true';
```

### Monitor Network Calls
- Open browser DevTools (F12)
- Go to Network tab
- Perform actions
- See API calls and responses

### Check Server Logs
- Look at terminal where `npm run server` runs
- See all incoming requests
- Check for errors

### Monitor Database
```bash
npm run lint:schemes
# Shows current database statistics
```

---

## ✅ Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests pass: `npm run test`
- [ ] Database valid: `npm run validate:json`
- [ ] No console errors
- [ ] API responds < 10ms
- [ ] Frontend loads < 3s
- [ ] All features work
- [ ] No hardcoded localhost URLs
- [ ] Environment variables set
- [ ] Security settings checked
- [ ] Documentation reviewed

---

## 🎯 You're Ready When...

✅ **All of these are true:**

1. Both frontend and backend running without errors
2. You can access http://localhost:3000
3. Health check returns success: `npm run health`
4. All 12 tests pass: `npm run test`
5. You can filter schemes and see results
6. You can view scheme details
7. You can compare schemes
8. Database validates: `npm run validate:json`
9. All pages load without console errors
10. Styling looks professional (dark theme)

---

## 📞 Still Stuck?

1. **Something won't start?** → Check [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Troubleshooting
2. **Tests failing?** → Check [TESTING_GUIDE.md](TESTING_GUIDE.md)
3. **Don't understand API?** → Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md)
4. **Need visual guide?** → Check [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md)
5. **Want full docs?** → Check [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

## 🎉 Final Notes

- Keep both terminals running (backend + frontend)
- Run tests regularly to catch issues
- Check logs when something behaves unexpectedly
- Documentation is comprehensive - use it!
- System is production-ready - you can deploy anytime

---

**When everything on this checklist is ✓:**

# 🚀 You're Ready to Launch!

---

**Total Setup Time:** 5-10 minutes  
**Expected Result:** Fully functional Banking Scheme Guidance System

Good luck! 🎊
