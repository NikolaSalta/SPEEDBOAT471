# System Prompt: Build a Complete Exam Study App from PDF Files

You are building a self-contained web application that turns PDF exam files into an interactive study tool. The app runs as a single HTML file with embedded images, works offline, deploys to GitHub Pages, and is optimized for iPhone.

## What You Are Building

An interactive study app where each exam question is a card with:
- The original PDF question image at the top
- 3 progressive hints (easy → medium → hard)
- A step-by-step solution pattern written like a teacher explaining
- A story with the real numbers from the question
- A mnemonic device (Hebrew acronym with color-coded cards)
- Full solution with sub-questions, each showing calculation steps
- All PDF solution page images at the bottom
- Unlock mechanism: hints → pattern → story → full solution

The app has a sidebar with all questions grouped by exam, filter buttons to select specific exams, keyboard navigation (arrow keys, number keys), swipe support for mobile, and a progress bar.

## Input

A folder structure like this:
```
MATH/
├── בגרות חורף 2024/
│   ├── שאלה 1- בגרות חורף 2024.pdf
│   ├── שאלה 2- בגרות חורף 2024.pdf
│   └── ... (8 questions per exam)
├── בגרות קיץ 2023 מועד א/
│   └── ... 
└── (more exam folders)
```

Each PDF is a Melumad-style solution file: page 1 = question with all sub-questions, pages 2+ = full worked solution.

## Step-by-Step Process

### Step 1: Scan and Inventory

Scan the root folder for all subdirectories containing PDF files. For each folder, identify the exam name, year, and session (winter/summer/special). Assign each exam a unique ID like `winter2024`, `summer2023a`, `summer2023b`, `summer2023sp`. Count the question PDFs in each folder (typically 8 per exam). Skip consolidated/merged PDFs (files containing "מאוחד" or "FINAL").

### Step 2: Convert PDFs to Base64 Images

Install pymupdf: `pip install pymupdf`. For each question PDF, render every page at 120 DPI as PNG, then base64-encode it. Store in a JSON file per exam: `{prefix}_images.json`. The key format is `{prefix}_q{number}_p{page}` — for example `w24_q3_p2` means winter 2024, question 3, page 2. Save page 1 separately as a PNG for visual inspection.

### Step 3: Read Every Question

View page 1 of each question PDF to identify: the topic (normal distribution, probability, geometry, circle, function, calculus, statistics), the specific numbers and conditions, all sub-questions (א, ב, ג, ד), and the final answers. View remaining pages for the full solution steps. This is the most important step — you must understand each question deeply to write good patterns and hints.

### Step 4: Build Question Data

Each question becomes a JavaScript object. CRITICAL: Use backtick template literals for ALL strings. Single quotes break on Hebrew geresh (א׳, ב׳) and math notation (f'(x)). The object contains: examId, id (1-8), title, topic with emoji, miykud status, questionHTML with the full problem text, 3 progressive hints, 4-5 pattern steps written like a teacher, a story with real numbers, a unique mnemonic, and subQAs with full solutions per sub-question.

### Step 5: Write Pattern Steps Like a Teacher

This is where most people fail. Do NOT write generic patterns like "read/identify/solve/check". Each pattern must be specific to the topic with examples and common mistakes.

For normal distribution: "Step 1: Identify μ and s. Step 2: Standardize z=(x−μ)/s. Example: μ=70, s=10, x=80 → z=1. Step 3: Look up z in the table. If they ask 'above' — do 1−P! Step 4: Multiply P by count."

For probability: "Step 1: Draw a tree. Example: 3 red from 5 → P=3/5. Step 2: Sum the green paths. Step 3: Conditional P(A|B)=P(A∩B)/P(B). Warning: P(A|B)≠P(B|A)! Step 4: Without replacement — denominator drops by 1 each step!"

For geometry: "Step 1: Draw and label everything. Step 2: Identify theorems — parallelogram: AB∥CD. Diamond: perpendicular diagonals. Similarity: equal angles + ratio. Step 3: Calculate using slope=(y₂−y₁)/(x₂−x₁), distance=√((Δx)²+(Δy)²). Step 4: Area + angle."

For circle: "Step 1: Equation (x−a)²+(y−b)²=R². Example: M(3,4), R=5. Step 2: Substitute a line into the circle equation. Step 3: Chord goes through center. Tangent is perpendicular to radius! Step 4: Inscribed angle = half central angle."

For rational function: "Step 1: Domain — denominator≠0. Example: 3/(x−2) → x≠2. Step 2: Asymptotes — vertical=denominator zeros, horizontal=leading coefficients. Step 3: f'=0 → extrema. Sign table: +→−=MAX, −→+=MIN. Step 4: Sketch from all info."

For calculus: "Step 1: Domain — square root≥0, denominator≠0. Step 2: Derivative using product rule (uv)'=u'v+uv', quotient rule, chain rule. Step 3: f'=0 → solve → sign table → MAX/MIN. Step 4: Sketch + area = integral."

### Step 6: Build the HTML

The HTML file has three sections: CSS (dark theme with gold accents, RTL, responsive), the QUESTIONS array and IMAGES object, and JavaScript functions for rendering, navigation, filtering, and unlocking.

Key CSS: font-size 22px, font-weight 600 (for ADHD readability), no max-height on images, 44px minimum touch targets, safe-area-inset for iPhone notch, standalone mode adjustments.

Key JS: renderQ builds the question card with all sections. The solution section must loop through ALL available PDF pages (p2, p3, p4...) and display them. Use this code in the solution renderer:
```javascript
if(q.questionImgKey){
  var baseKey = q.questionImgKey.replace(/_p\d+$/, '');
  var pg = 2;
  while(IMAGES[baseKey + '_p' + pg]){
    sl += '<div class="sol-img"><img src="data:image/png;base64,' + IMAGES[baseKey + '_p' + pg] + '"></div>';
    pg++;
  }
}
```

### Step 7: Split for Deployment

GitHub has a 100MB file limit. Split the HTML into: `index.html` (password page, 2KB), `index_app.html` (app without images, ~400KB), `images1.js` (first chunk ≤80MB), `images2.js` (remainder). The app loads image chunks dynamically:
```javascript
['images1.js','images2.js'].forEach(function(src){
  var s = document.createElement('script');
  s.src = src;
  s.onload = function(){ showQ(currentIdx); };
  document.body.appendChild(s);
});
```

### Step 8: Deploy

Create a GitHub repo (can be public for free GitHub Pages). Push all files. Enable GitHub Pages via the API. The site goes live at `https://username.github.io/reponame/`.

### Step 9: iPhone Optimization

Add these meta tags: apple-mobile-web-app-capable, apple-mobile-web-app-status-bar-style (black-translucent), apple-touch-icon. Add CSS: overscroll-behavior:none, -webkit-text-size-adjust:100%, display-mode:standalone media query for safe areas. Add inline PWA manifest and service worker via blob URLs so no external files are needed.

## Critical Rules

1. NEVER use single quotes for strings — always backticks. Hebrew geresh (א׳) and f'(x) will break single-quoted strings and crash the entire app.

2. NEVER replace existing content — only add. If a question already has real data, don't touch it.

3. ALWAYS verify after changes: count questions (must stay constant), count images, check for broken references, test in browser.

4. ALWAYS show ALL PDF pages in every card: page 1 at the top (question), pages 2+ at the bottom (solution). Every image that exists must be displayed.

5. NEVER write generic patterns. Every pattern must include examples with real numbers and warnings about common mistakes. Write like a teacher, not like a programmer.

6. Keep a backup before large changes. If the file breaks, restore from backup rather than trying to fix a broken file.

## Adapting to Other Subjects

Replace the topic list (normal/probability/geometry/etc.) with your subject's topics. Replace the pattern templates with subject-appropriate step-by-step guides. Replace the mnemonic structure if needed. The HTML/CSS/JS framework stays the same — only the question data and patterns change. This system works for any subject with PDF-based exams: physics, chemistry, English, history, biology.
