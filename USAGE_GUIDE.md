# Banking Scheme Guidance System - Usage Guide

## 1. Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the app:
   ```bash
   npm run dev
   ```

3. Open the app:
   - http://localhost:3000

## 2. Main User Flows

### A. Quick Filter (Recommended)
Path: `/quick-filter`

1. Enter age and annual income.
2. Choose a category (Education, Home, Personal, MSME/Business, Agriculture, Government-backed, FD, Savings, Single Child, Girl Child).
3. Optional: add desired loan amount.
4. Click "Find Schemes" to see ranked results.

### B. Bank-wise Browse
Path: `/select-bank`

1. Select a bank from the list.
2. Browse all schemes for that bank at `/schemes/[bankId]`.
3. Click a scheme card to view full details.

## 3. Categories (User-visible)

- Education Loans
- Home Loans
- Personal Loans
- MSME / Business Loans
- Agriculture Loans
- Government-backed schemes
- Fixed Deposits
- Savings Accounts
- Single Child (tag-based)
- Girl Child (tag-based)

## 4. Data Source

All schemes are stored in:
```
server/data/bank_schemes.json
```

Each scheme includes:

- Bank name and scheme name
- Category and tags (for Single Child/Girl Child)
- Eligibility rules (age, income)
- Loan amount range and interest rate range
- Documents, benefits, pros/cons

## 5. API Endpoints Used by the UI

```
GET  /api/banks
GET  /api/schemes/[bankId]
POST /api/filter-schemes
```

## 6. FAQ

**Q: Is this AI-based?**
A: No. It is rule-based filtering only.

**Q: Does it store user data?**
A: No. Input is used only to filter results.

**Q: Are these official bank offers?**
A: This is an informational/demo system. Always verify with official sources.

## 7. Troubleshooting

- If the page shows an error, hard refresh and retry.
- If filtering returns no results, try removing optional fields.
- For bank-specific pages, ensure the URL is correctly encoded.
npm run server
```

Terminal 2 (Frontend):
```bash
cd "/Users/snehamishra/AGENTIC AI BANK"
npm run dev
```

### To stop the servers:
- Press `Ctrl + C` in the terminal running the servers

---

## 🐛 Troubleshooting

### Port Already in Use?
```bash
# Kill process on port 5000 (Backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (Frontend)
lsof -ti:3000 | xargs kill -9
```

### Dependencies Issues?
```bash
rm -rf node_modules
npm install
```

### Build Issues?
```bash
rm -rf .next
npm run dev
```

---

## 📝 Code Quality

- ✅ Clean, commented code
- ✅ Consistent naming conventions
- ✅ Modular CSS (CSS Modules)
- ✅ Reusable components
- ✅ Error handling
- ✅ Loading states
- ✅ User feedback (validation, errors)

---

## 🎓 Learning Highlights

### This project demonstrates:
1. **Full-stack development** (React + Node.js)
2. **RESTful API design** (Express endpoints)
3. **Modern React patterns** (Hooks, functional components)
4. **CSS animations & effects** (Neon theme, transitions)
5. **Responsive design** (Mobile-first approach)
6. **Form handling & validation** (Client-side)
7. **Rule-based systems** (Eligibility filtering)
8. **Next.js features** (File-based routing, SSR-ready)

---

## 🎉 Next Steps

### Potential Enhancements (Optional):
- Add more banks and schemes
- Implement scheme comparison feature
- Add scheme favorites/bookmarking
- Export results as PDF
- Add scheme search functionality
- Implement dark/light theme toggle
- Add multi-language support
- Create admin panel for scheme management

---

## ⚠️ Important Reminders

1. **This is a demonstration system** - Not for production use
2. **All data is dummy** - Banks and schemes are fictional
3. **Educational purpose only** - Not actual financial advice
4. **No real banking integration** - Standalone application
5. **Rule-based only** - No AI/ML algorithms used

---

## 📞 Support

For any issues or questions about this implementation:
- Review the code comments
- Check console logs for errors
- Verify both servers are running
- Test API endpoints directly (use Postman or curl)

---

## ✅ Completion Checklist

- [x] Home Page with neon theme
- [x] Bank Selection Page
- [x] Scheme Listing Page
- [x] Filter & Eligibility Form with helper text
- [x] Results Page with Best Match highlighting
- [x] Backend API with filtering logic
- [x] Static JSON scheme data (19 total schemes)
- [x] Responsive design (mobile/tablet/desktop)
- [x] Neon-themed UI with glow effects
- [x] Rule-based filtering (no AI/ML)
- [x] Privacy-focused (no data storage)
- [x] Educational disclaimers
- [x] Beginner-friendly interface
- [x] Accessible design
- [x] Working application - READY TO USE!

---

## 🎊 Congratulations!

Your Banking Scheme Guidance System is complete and running!

**Access it now at: http://localhost:3000**

Enjoy exploring the schemes! 🚀
