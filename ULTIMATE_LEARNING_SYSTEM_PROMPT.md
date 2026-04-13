# ULTIMATE LEARNING SYSTEM — Complete Build Prompt

Copy this ENTIRE prompt into a new Claude Code conversation.
Replace [BRACKETS] with your values.

---

## WHO YOU ARE

You are a master [SUBJECT] tutor AND a full-stack developer. You build a complete interactive learning application that:

1. Converts PDF exam files into interactive flashcards
2. Forces active recall before showing answers
3. Validates 100% coverage of every sub-question
4. Diagnoses errors and adapts learning strategy
5. Uses spaced repetition, interleaving, and the Feynman technique
6. Deploys as a live website on GitHub Pages
7. Works offline on iPhone

---

## MY INPUT

PDF exam files are in: `[PATH_TO_FOLDER]`

Each PDF: page 1 = question with all sub-questions, pages 2+ = full worked solution.

Folder structure:
```
[ROOT]/
├── [Exam Folder 1]/ (שאלה 1.pdf ... שאלה 8.pdf)
├── [Exam Folder 2]/
└── ...
```

---

## WHAT YOU BUILD

### A. The Application (HTML/CSS/JS)

A single-file PWA with these screens per question:

```
┌─────────────────────────────────────────┐
│  FLASHCARD MODE                          │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  FRONT: Question PDF image       │   │
│  │  + Full question text            │   │
│  │  + All sub-questions (א,ב,ג,ד)  │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  YOUR ANSWER: [text input area]  │   │  ← ACTIVE RECALL
│  │  [Submit Answer] button          │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ── LOCKED UNTIL ANSWER SUBMITTED ──    │
│                                          │
│  🔒 Hint 1 (click to reveal)           │
│  🔒 Hint 2 (click to reveal)           │
│  🔒 Hint 3 (click to reveal)           │
│                                          │
│  🔒 Pattern (step-by-step method)      │  ← TEACHER EXPLANATION
│                                          │
│  🔒 Story (real numbers + analogy)     │  ← FEYNMAN TECHNIQUE
│                                          │
│  🔒 Full Solution                       │
│     ├── סעיף א: steps + answer         │
│     ├── סעיף ב: steps + answer         │
│     ├── סעיף ג: steps + answer         │
│     └── PDF solution images (p2,p3...)  │
│                                          │
│  ── COVERAGE CHECK ──                   │
│  ✅ Section א — solved                  │
│  ✅ Section ב — solved                  │
│  ❌ Section ג — MISSING! Click to see   │
│  ⚠️ Hidden requirement found            │
│                                          │
│  ── ERROR DIAGNOSIS ──                  │
│  Your answer: 5/12                       │
│  Correct answer: 5/12 ✅                │
│  OR                                      │
│  Your answer: 1/3                        │
│  Correct answer: 5/12 ❌                │
│  Error type: CALCULATION MISTAKE         │
│  Fix: You added 2/6+3/6 instead of      │
│       ½·2/6 + ½·3/6                     │
│                                          │
│  ── NEXT ACTION ──                      │
│  [✅ Got it — Next] [🔄 Retry]          │
│  [📅 Review later (spaced repetition)]  │
│                                          │
│  ── RECOMMENDED METHOD ──               │
│  🧠 Feynman: Explain this in your       │
│     own words to test understanding     │
└─────────────────────────────────────────┘
```

### B. The Data Structure

Each question object:

```javascript
{
  examId: `winter2024`,
  id: 3,
  title: `הסתברות — סוכריות`,
  topic: `🎲 הסתברות`,

  // FRONT OF FLASHCARD
  questionHTML: `<p><b>בשקית</b> יש 4 טופי ו-2 מנטה...</p>`,
  questionImgKey: `w24_q3_p1`,

  // ACTIVE RECALL — expected answer format
  expectedAnswers: {
    a: { value: `5/12`, type: `fraction`, tolerance: 0 },
    b: { value: `2/5`, type: `fraction`, tolerance: 0 },
    c: { value: `1/15`, type: `fraction`, tolerance: 0 }
  },

  // 3 PROGRESSIVE HINTS (revealed one at a time)
  hints: [
    {title: `רמז 1 — מבנה`, text: `שני שלבים = עץ!`},
    {title: `רמז 2 — מותנית`, text: `P(A|B) = P(A∩B)/P(B)`},
    {title: `רמז 3 — ללא החזרה`, text: `מכנה−1 בכל שלב!`}
  ],

  // PATTERN — teacher explanation with examples
  patternSteps: [
    {key: `שלב 1: בנה עץ`, body: `דוגמא: 3/5 אדומים...`},
    {key: `שלב 2: סכום`, body: `P = סכום מסלולים ירוקים...`},
    {key: `שלב 3: מותנית`, body: `P(A|B) = P(A∩B)/P(B)...`},
    {key: `שלב 4: ללא החזרה`, body: `מכנה−1!`}
  ],

  // STORY — Feynman technique (explain simply)
  storyHTML: `<div class="story-box">...</div>`,

  // MNEMONIC — memory anchor
  mnem: { letters: [...], cards: [...] },

  // FULL SOLUTION with coverage validation
  subQAs: [
    {
      badge: `א`, q: `P(מנטה)?`, final: `5/12`,
      steps: [{n:`1`, t:`...`}, {n:`2`, t:`...`}],
      imgKey: `w24_q3_p2`,
      warn: `אל תחבר (2+3)/(6+6)!`,
      errorPatterns: [
        { wrong: `5/6`, reason: `שכחת לכפול בהסתברות הבחירה ½` },
        { wrong: `1/2`, reason: `חיברת הסתברויות במקום לכפול` }
      ]
    }
  ],

  // COVERAGE CHECKLIST
  coverage: [
    { section: `א`, description: `P(מנטה)`, required: true },
    { section: `ב`, description: `P(שקית א|מנטה)`, required: true },
    { section: `ג`, description: `ללא החזרה`, required: true },
    { hidden: `ודא שהבנת למה ½ ולא ⅓` }
  ],

  // LEARNING METHOD RECOMMENDATION
  bestMethod: `active-recall`,
  methodReason: `שאלת הסתברות — חייב לתרגל בנייה של עץ בעצמך`,

  // SPACED REPETITION STATE
  interval: 1,        // days until next review
  easeFactor: 2.5,    // SM-2 ease factor
  repetitions: 0,     // times reviewed
  nextReview: null,    // date
  lastResult: null     // correct/wrong/partial
}
```

### C. The Learning Engine (JavaScript)

```javascript
// ══════════════════════════════════════════
// SPACED REPETITION (SM-2 Algorithm)
// ══════════════════════════════════════════
function updateSpacedRepetition(question, quality) {
  // quality: 0-5 (0=total fail, 5=perfect)
  if (quality >= 3) {
    // Correct
    if (question.repetitions === 0) question.interval = 1;
    else if (question.repetitions === 1) question.interval = 6;
    else question.interval = Math.round(question.interval * question.easeFactor);
    question.repetitions++;
  } else {
    // Failed — reset
    question.repetitions = 0;
    question.interval = 1;
  }
  question.easeFactor = Math.max(1.3,
    question.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  );
  question.nextReview = addDays(new Date(), question.interval);
  question.lastResult = quality >= 3 ? 'correct' : 'wrong';
  saveState(); // localStorage
}

// ══════════════════════════════════════════
// ERROR DIAGNOSIS
// ══════════════════════════════════════════
function diagnoseError(question, userAnswer, subQuestion) {
  var sq = question.subQAs.find(s => s.badge === subQuestion);
  if (!sq) return { type: 'unknown', suggestion: 'Review the full solution' };

  // Check against known error patterns
  for (var i = 0; i < (sq.errorPatterns || []).length; i++) {
    var ep = sq.errorPatterns[i];
    if (normalize(userAnswer) === normalize(ep.wrong)) {
      return {
        type: 'known-error',
        reason: ep.reason,
        suggestion: 'Re-read hint 2 and try again with the correct formula'
      };
    }
  }

  // Generic diagnosis
  if (isClose(userAnswer, sq.final, 0.1)) {
    return {
      type: 'calculation-mistake',
      reason: 'Your answer is close but not exact — check your arithmetic',
      suggestion: 'Redo the calculation step by step'
    };
  }

  return {
    type: 'conceptual-error',
    reason: 'Your approach may be wrong',
    suggestion: 'Study the pattern steps and try a different method'
  };
}

// ══════════════════════════════════════════
// COVERAGE VALIDATION
// ══════════════════════════════════════════
function checkCoverage(question, userAnswers) {
  var results = [];
  question.coverage.forEach(function(item) {
    if (item.hidden) {
      results.push({ status: 'warning', text: item.hidden });
    } else {
      var answered = userAnswers[item.section] !== undefined;
      results.push({
        status: answered ? 'done' : 'missing',
        section: item.section,
        description: item.description
      });
    }
  });
  return results;
}

// ══════════════════════════════════════════
// LEARNING METHOD SELECTOR
// ══════════════════════════════════════════
function selectMethod(question, lastResult) {
  var methods = {
    'active-recall': {
      name: 'Active Recall',
      icon: '🧠',
      description: 'Try to solve without looking at hints',
      when: 'Default for all questions'
    },
    'feynman': {
      name: 'Feynman Technique',
      icon: '👨‍🏫',
      description: 'Explain the solution in your own words',
      when: 'When you got the right answer but can\'t explain WHY'
    },
    'interleaving': {
      name: 'Interleaving',
      icon: '🔀',
      description: 'Mix this with a different topic',
      when: 'When you keep getting the same type right — mix it up'
    },
    'error-based': {
      name: 'Error-Based Learning',
      icon: '🎯',
      description: 'Focus on WHY you got it wrong',
      when: 'When you made a specific, identifiable mistake'
    },
    'pattern-recognition': {
      name: 'Pattern Recognition',
      icon: '🧩',
      description: 'Compare with 3 similar questions',
      when: 'When you don\'t recognize what type of question this is'
    },
    'spaced-repetition': {
      name: 'Spaced Repetition',
      icon: '📅',
      description: 'Come back to this in N days',
      when: 'When you got it right — schedule for later review'
    }
  };

  // Decision tree
  if (lastResult === 'correct') {
    if (question.repetitions < 2) return methods['feynman'];
    return methods['spaced-repetition'];
  }

  if (lastResult === 'calculation-mistake') return methods['error-based'];
  if (lastResult === 'conceptual-error') return methods['pattern-recognition'];
  if (lastResult === 'partial') return methods['active-recall'];

  return methods['active-recall']; // default
}

// ══════════════════════════════════════════
// INTERLEAVING — mix topics
// ══════════════════════════════════════════
function getInterleavedQueue() {
  // Group by topic, then alternate
  var byTopic = {};
  QUESTIONS.forEach(function(q) {
    var t = q.topic;
    if (!byTopic[t]) byTopic[t] = [];
    byTopic[t].push(q);
  });
  
  var queue = [];
  var topics = Object.keys(byTopic);
  var maxLen = Math.max(...topics.map(t => byTopic[t].length));
  
  for (var i = 0; i < maxLen; i++) {
    topics.forEach(function(t) {
      if (byTopic[t][i]) queue.push(byTopic[t][i]);
    });
  }
  return queue; // topic1-q1, topic2-q1, topic3-q1, topic1-q2, ...
}

// ══════════════════════════════════════════
// DUE QUESTIONS — what to study today
// ══════════════════════════════════════════
function getDueQuestions() {
  var today = new Date();
  return QUESTIONS.filter(function(q) {
    if (!q.nextReview) return true; // never reviewed
    return new Date(q.nextReview) <= today;
  }).sort(function(a, b) {
    // Priority: never reviewed > overdue > everything else
    if (!a.nextReview) return -1;
    if (!b.nextReview) return 1;
    return new Date(a.nextReview) - new Date(b.nextReview);
  });
}
```

### D. The UI Components

```javascript
// ══════════════════════════════════════════
// ACTIVE RECALL INPUT
// ══════════════════════════════════════════
function renderAnswerInput(question) {
  var h = '<div class="answer-input-area">';
  h += '<h3>📝 Your Answer</h3>';
  
  question.coverage.forEach(function(c) {
    if (c.section) {
      h += '<div class="answer-row">';
      h += '<label>סעיף ' + c.section + ':</label>';
      h += '<input type="text" id="ans_' + c.section + '" placeholder="הקלד תשובה...">';
      h += '</div>';
    }
  });
  
  h += '<button class="submit-btn" onclick="submitAnswers(' + question.id + ')">✅ בדוק תשובות</button>';
  h += '</div>';
  return h;
}

// ══════════════════════════════════════════
// RESULT DISPLAY
// ══════════════════════════════════════════
function showResults(question, userAnswers) {
  var h = '<div class="results">';
  var totalCorrect = 0;
  var totalQuestions = 0;
  
  question.subQAs.forEach(function(sq) {
    totalQuestions++;
    var userAns = userAnswers[sq.badge] || '';
    var correct = normalize(userAns) === normalize(sq.final);
    if (correct) totalCorrect++;
    
    h += '<div class="result-row ' + (correct ? 'correct' : 'wrong') + '">';
    h += '<span class="badge">' + sq.badge + '</span>';
    h += '<span>' + (correct ? '✅' : '❌') + '</span>';
    h += '<span>Your: ' + userAns + '</span>';
    if (!correct) {
      h += '<span>Correct: <b>' + sq.final + '</b></span>';
      var diag = diagnoseError(question, userAns, sq.badge);
      h += '<div class="error-diagnosis">';
      h += '<b>Error type:</b> ' + diag.type + '<br>';
      h += '<b>Reason:</b> ' + diag.reason + '<br>';
      h += '<b>Fix:</b> ' + diag.suggestion;
      h += '</div>';
    }
    h += '</div>';
  });
  
  // Score
  var pct = Math.round(totalCorrect / totalQuestions * 100);
  var quality = Math.round(pct / 20); // 0-5 scale
  h += '<div class="score">Score: ' + totalCorrect + '/' + totalQuestions + ' (' + pct + '%)</div>';
  
  // Update spaced repetition
  updateSpacedRepetition(question, quality);
  
  // Coverage check
  var coverage = checkCoverage(question, userAnswers);
  h += '<div class="coverage-check"><h4>📋 Coverage Check</h4>';
  coverage.forEach(function(c) {
    if (c.status === 'done') h += '<div>✅ ' + c.section + ': ' + c.description + '</div>';
    else if (c.status === 'missing') h += '<div>❌ ' + c.section + ': ' + c.description + ' — MISSING!</div>';
    else if (c.status === 'warning') h += '<div>⚠️ ' + c.text + '</div>';
  });
  h += '</div>';
  
  // Recommended method
  var method = selectMethod(question, quality >= 3 ? 'correct' : 'conceptual-error');
  h += '<div class="method-recommendation">';
  h += '<h4>' + method.icon + ' Recommended: ' + method.name + '</h4>';
  h += '<p>' + method.description + '</p>';
  h += '<p><i>' + method.when + '</i></p>';
  h += '</div>';
  
  // Next action buttons
  h += '<div class="next-actions">';
  h += '<button class="btn-next" onclick="nextQuestion()">✅ הבנתי — הבא</button>';
  h += '<button class="btn-retry" onclick="retryQuestion()">🔄 נסה שוב</button>';
  h += '<button class="btn-later" onclick="reviewLater()">📅 חזור מאוחר יותר</button>';
  h += '</div>';
  
  return h;
}

// ══════════════════════════════════════════
// DASHBOARD — study progress
// ══════════════════════════════════════════
function renderDashboard() {
  var due = getDueQuestions();
  var mastered = QUESTIONS.filter(q => q.repetitions >= 3);
  var struggling = QUESTIONS.filter(q => q.lastResult === 'wrong');
  var untouched = QUESTIONS.filter(q => q.repetitions === 0);
  
  var h = '<div class="dashboard">';
  h += '<h2>📊 Learning Dashboard</h2>';
  h += '<div class="stats-row">';
  h += '<div class="stat"><div class="stat-num">' + due.length + '</div><div>Due Today</div></div>';
  h += '<div class="stat"><div class="stat-num">' + mastered.length + '</div><div>Mastered</div></div>';
  h += '<div class="stat"><div class="stat-num">' + struggling.length + '</div><div>Struggling</div></div>';
  h += '<div class="stat"><div class="stat-num">' + untouched.length + '</div><div>Not Started</div></div>';
  h += '</div>';
  
  // Topic breakdown
  h += '<h3>By Topic</h3>';
  var topics = {};
  QUESTIONS.forEach(function(q) {
    if (!topics[q.topic]) topics[q.topic] = {total:0, mastered:0, due:0};
    topics[q.topic].total++;
    if (q.repetitions >= 3) topics[q.topic].mastered++;
    if (!q.nextReview || new Date(q.nextReview) <= new Date()) topics[q.topic].due++;
  });
  
  for (var t in topics) {
    var pct = Math.round(topics[t].mastered / topics[t].total * 100);
    h += '<div class="topic-row">';
    h += '<span>' + t + '</span>';
    h += '<div class="progress-bar"><div style="width:' + pct + '%"></div></div>';
    h += '<span>' + pct + '% (' + topics[t].due + ' due)</span>';
    h += '</div>';
  }
  
  h += '</div>';
  return h;
}
```

---

## STEP-BY-STEP BUILD PROCESS

### Step 1: Scan folders
Scan `[PATH]` for all exam PDFs. List every folder with exam name and question count.

### Step 2: Convert PDFs to base64
Use pymupdf at 120 DPI. Key: `{prefix}_q{n}_p{page}`. Save to JSON.

### Step 3: Read every question
View each PDF. Identify topic, numbers, sub-questions, answers. This drives quality.

### Step 4: Build question objects
Use **backtick template literals** for ALL strings (prevents Hebrew geresh breakage).
Include: questionHTML, hints, patternSteps, storyHTML, mnem, subQAs, coverage, errorPatterns, expectedAnswers.

### Step 5: Build HTML with learning engine
Include all CSS, JS functions, SM-2 algorithm, error diagnosis, coverage validation, dashboard.

### Step 6: Write topic-specific patterns
**NEVER generic "read/identify/solve/check"!**
Each pattern: 4 steps with examples and common mistakes.

### Step 7: Add active recall
- Text inputs per sub-question
- Submit button that locks/unlocks sections
- Answer comparison with error diagnosis
- Score + spaced repetition update

### Step 8: Add spaced repetition
- SM-2 algorithm
- localStorage persistence
- Dashboard with due/mastered/struggling counts
- Topic progress bars

### Step 9: Add coverage validation
- Checklist per question
- Auto-detect missing sections
- Hidden requirements warnings

### Step 10: Split and deploy
- Split for GitHub 100MB limit
- Password page
- GitHub Pages deployment
- iPhone optimization (safe areas, touch targets, standalone mode)

### Step 11: Verify
- Question count correct
- Image count correct
- Zero generic content
- All sub-questions covered
- Spaced repetition saves to localStorage
- Dashboard renders
- Active recall inputs work
- Error diagnosis fires on wrong answers

---

## IRON RULES

1. **BACKTICKS ONLY** — single quotes break on Hebrew geresh
2. **NEVER generic patterns** — every hint must include real math examples
3. **EVERY card shows PDF images** — question at top, solution at bottom
4. **ACTIVE RECALL ENFORCED** — must attempt answer before seeing solution
5. **100% COVERAGE** — every sub-question validated
6. **ERROR DIAGNOSIS** — known error patterns per question
7. **SPACED REPETITION** — SM-2 with localStorage persistence
8. **VERIFY AFTER EVERY CHANGE** — count questions, images, generic content
9. **BACKUP BEFORE BIG CHANGES** — restore from backup if broken
10. **NEVER REPLACE EXISTING CONTENT** — only add

---

## ADAPT TO ANY SUBJECT

Replace topics with yours. Replace patterns with subject-specific teacher explanations.
The learning engine (SM-2, error diagnosis, coverage) works for ANY subject.

Examples:
- **Physics**: mechanics / electricity / optics / waves
- **Chemistry**: organic / inorganic / calculations
- **English**: reading / writing / grammar
- **History**: periods / events / figures
- **Biology**: cell / genetics / ecology
- **Computer Science**: algorithms / data structures / complexity
