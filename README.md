# 🚀 Speedboat 471

### Interactive Bagrut Math Study App — 141 Questions from 18 Exams

[![Live Demo](https://img.shields.io/badge/LIVE-Speedboat%20471-c8983a?style=for-the-badge)](https://nikolasalta.github.io/SPEEDBOAT471/)
[![Questions](https://img.shields.io/badge/Questions-141-1a6e28?style=flat-square)]()
[![Exams](https://img.shields.io/badge/Exams-18-3a28b0?style=flat-square)]()
[![Images](https://img.shields.io/badge/PDF%20Images-535-c46010?style=flat-square)]()

---

## 📸 Screenshots

| Login | Question Card | Solution |
|-------|--------------|----------|
| Password protected | PDF question + hints + pattern | Full PDF solution pages |

---

## 🎯 What Is This?

A complete study tool for the Israeli Bagrut math exam **471 (4 units)**.

Every question from **18 real exams (2020–2026)** is turned into an interactive card with:

- 📄 **Original PDF** of the question (all sub-questions visible)
- 💡 **3 Progressive Hints** — from gentle nudge to specific formula
- 🧩 **Solution Pattern** — step-by-step method written by a math teacher, with examples
- 📖 **Story** — the question retold with the actual numbers
- 🧠 **Mnemonic** — color-coded Hebrew acronym to remember the method
- ✅ **Full Solution** — every sub-question with calculation steps
- 📄 **PDF Solution Pages** — all original solution pages displayed

---

## 📊 Exam Coverage

| Year | Winter | Summer A | Summer B | Special |
|------|--------|----------|----------|---------|
| 2026 | ✅ 7q | | | |
| 2025 | ✅ 8q | | ✅ 8q | |
| 2024 | ✅ 8q | | ✅ 8q | |
| 2023 | ✅ 8q | ✅ 8q | ✅ 8q | ✅ 8q (נבצרים) |
| 2022 | ✅ 7q (Jan) + ✅ 8q (Feb) | ✅ 8q | ✅ 7q | |
| 2021 | ✅ 8q | | ✅ 8q | ✅ 8q |
| 2020 | | ✅ 8q | ✅ 8q | |

**Total: 141 questions across 18 exams**

---

## 🧩 Solution Patterns by Topic

Every question has a teacher-written pattern — not generic "read/solve/check" but real math guidance with examples:

| Topic | Pattern Example |
|-------|----------------|
| 📊 **Normal Distribution** | Step 1: Find μ,s → Step 2: z=(x−μ)/s (example: μ=70,s=10,x=80→z=1) → Step 3: Table → Step 4: P×count |
| 🎲 **Probability** | Step 1: Draw tree → Step 2: Sum green paths → Step 3: P(A\|B)=P(A∩B)/P(B) ⚠️P(A\|B)≠P(B\|A)! → Step 4: Without replacement: n−1! |
| 📐 **Geometry** | Step 1: Draw + label → Step 2: Identify theorems → Step 3: slope/distance/midpoint → Step 4: Area + angle |
| ⭕ **Circle** | Step 1: (x−a)²+(y−b)²=R² → Step 2: Substitute line → Step 3: Tangent⊥radius! → Step 4: Inscribed=½central |
| 📈 **Function** | Step 1: Domain (denom≠0) → Step 2: Asymptotes → Step 3: f'=0 → extrema → Step 4: Sketch |
| 📉 **Calculus** | Step 1: Domain (√≥0) → Step 2: Derivative (product/quotient/chain) → Step 3: f'=0 → sign table → Step 4: Sketch + ∫area |
| 📊 **Statistics** | Step 1: Mean x̄=Σx/n → Step 2: Std dev → Step 3: Correlation r → Step 4: Regression y=mx+b |

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | Vanilla HTML/CSS/JS (zero dependencies) |
| Images | Base64 embedded PNG from PDF (pymupdf) |
| Font | Frank Ruhl Libre + IBM Plex Mono |
| Hosting | GitHub Pages |
| PWA | Inline manifest + service worker (blob URLs) |
| Auth | Client-side password gate |

---

## 📁 File Structure

```
SPEEDBOAT471/
├── index.html          # Password page (2 KB)
├── index_app.html      # Full app + 141 questions (380 KB)
├── images1.js          # PDF images chunk 1 (80 MB)
├── images2.js          # PDF images chunk 2 (33 MB)
├── PROMPT_2000.md      # 2000-word prompt to recreate this system
├── MASTER_PROMPT_TEMPLATE.md  # Detailed 10-step build guide
└── README.md           # This file
```

**Why split?** GitHub has a 100MB per-file limit. The app loads image chunks dynamically after the main page renders.

---

## 📱 iPhone / Mobile

The app is fully optimized for iPhone:

- ✅ **Add to Home Screen** → runs as standalone app
- ✅ **Safe area insets** for notch and home indicator
- ✅ **44px touch targets** — thumb-friendly buttons
- ✅ **Swipe navigation** — swipe left/right between questions
- ✅ **Bottom nav bar** on mobile (sidebar hidden)
- ✅ **No rubber-band scrolling**
- ✅ **Works offline** after first load (service worker cache)

---

## ♿ Accessibility

Designed for students with ADHD:

- **22px base font** — larger than standard
- **Bold everything** (font-weight: 600)
- **High contrast** dark header with gold accents
- **Progressive disclosure** — hints → pattern → story → solution
- **No image height limits** — PDFs display at full readable size
- **Color-coded sections** — green hints, purple pattern, orange story

---

## 🔄 How to Add More Exams

1. Create a folder with question PDFs (שאלה 1.pdf ... שאלה 8.pdf)
2. Run the conversion script (pymupdf → base64)
3. Add question objects to the QUESTIONS array
4. Add images to images1.js or images2.js
5. Update filter bar and EXAM_LABELS
6. Push to GitHub

See `PROMPT_2000.md` for the complete process.

---

## 📄 Recreate for Another Subject

The `MASTER_PROMPT_TEMPLATE.md` file contains a complete guide to build a similar app for any subject:

- **Physics** — mechanics / electricity / optics / waves
- **Chemistry** — organic / inorganic / calculations
- **English** — reading / writing / grammar
- **History** — periods / events / figures

Just change the topics, patterns, and PDF source files.

---

## 📜 License

This project is for educational purposes. Exam content is from publicly available Melumad (מלומד) solutions.

---

Built with ❤️ by [NikolaSalta](https://github.com/NikolaSalta) + [Claude](https://claude.ai)
