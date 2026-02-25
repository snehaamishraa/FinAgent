# 👋 START HERE

Welcome to the Banking Scheme Guidance System!

This file will get you started in **less than 5 minutes**.

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install
```bash
cd /Users/snehamishra/BANKSCHEMEFINDER
npm install
```

### Step 2: Start (2 terminals)

**Terminal 1: Backend**
```bash
npm run server
```
✅ When you see: `Server running on http://localhost:5000`

**Terminal 2: Frontend**
```bash
npm run dev
```
✅ When you see: `Local: http://localhost:3000`

### Step 3: Open Browser
Visit: **http://localhost:3000**

🎉 **Done! You're running the system.**

---

## 🧪 Test It

```bash
npm run test
```

Should show: `✓ 12 tests passed`

---

## 📚 Next: Pick Your Role

### 👨‍💼 Manager / Non-Technical?
→ Read [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md) (5 min)

### 🎨 Frontend Developer?
→ Read [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) (20 min)

### ⚙️ Backend / DevOps?
→ Read [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) (20 min)

### 💾 Data Manager?
→ Read [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md) (15 min)

### 🔍 Need Full Overview?
→ Read [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) (5 min)

---

## ❓ Common Questions

**Q: Nothing works**  
A: Run `npm run health` - if you get an error, server isn't running

**Q: Frontend can't connect to API**  
A: Make sure backend is running on port 5000

**Q: I want to see the API**  
A: Run `npm run filter:example` - shows actual API call

**Q: How do I add new schemes?**  
A: Edit `server/data/bank_schemes.json` (format in [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md))

**Q: How do I deploy?**  
A: See [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) - Deployment section

---

## 📚 All Documentation

| File | For | Time |
|------|-----|------|
| 👈 You are here | Everyone | - |
| [QUICKSTART.md](QUICKSTART.md) | Developers | 5 min |
| [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md) | Navigation | 5 min |
| [SYSTEM_SUMMARY.md](SYSTEM_SUMMARY.md) | Managers | 5 min |
| [SETUP_DEPLOYMENT.md](SETUP_DEPLOYMENT.md) | DevOps | 20 min |
| [API_DOCUMENTATION.md](API_DOCUMENTATION.md) | Backend | 15 min |
| [FRONTEND_INTEGRATION.md](FRONTEND_INTEGRATION.md) | Frontend | 20 min |
| [DATASET_DOCUMENTATION.md](DATASET_DOCUMENTATION.md) | Data | 15 min |

---

## ✅ When It's Working

You should see:

1. **Backend** (Terminal 1):
```
🚀 Banking Scheme Guidance System Server
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Server running on http://localhost:5000
```

2. **Frontend** (Terminal 2):
```
▲ Next.js 14.1.0
✓ Compiled successfully
Local: http://localhost:3000
```

3. **Browser**: Beautiful home page with "Find Schemes" button

---

## 🚀 What's Connected

✅ Frontend (React) → Backend (Express) → Database (JSON)
✅ 7 API endpoints working
✅ 45+ banking schemes loaded
✅ Filtering & comparison ready

---

## 🎯 What This Does

- 👱‍♂️ User enters: age, income, loan amount, loan type
- 🔍 System searches: 45 banking schemes
- ⭐ Results ranked: By match score (best first)
- 📋 Details shown: Full scheme info, pros/cons, documents
- 🔄 Can compare: Any 2-5 schemes side-by-side

---

**Ready to explore?** Pick your role above or just start editing `pages/` and `server/` files!

**Need help?** Each documentation file has a troubleshooting section.

🎉 **Welcome aboard!**
