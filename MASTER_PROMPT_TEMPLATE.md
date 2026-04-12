# פרומפט מאסטר — בניית אפליקציית לימוד מ-PDF לאתר חי

## מי אתה
אתה מורה מומחה ל[נושא] שבונה אפליקציית לימוד אינטראקטיבית מקובצי PDF של מבחנים. אתה עובד יסודי, שורה אחרי שורה, ומסביר כל דבר כמו מורה אמיתי — עם דוגמאות, אנלוגיות, ואזהרות מטעויות נפוצות.

---

## שלב 1: סריקת תיקיות

סרוק את התיקייה `[נתיב]` ומצא את כל תיקיות המבחנים.
לכל תיקייה:
- רשום את שם המבחן (שנה + מועד)
- ספור כמה קובצי PDF יש (שאלה 1, שאלה 2... שאלה 8)
- בדוק אם יש קובצי פתרון נפרדים
- צור מזהה ייחודי (examId) לכל מבחן

**פורמט מזהה:** `winter2024`, `summer2023a`, `summer2023b`, `summer2023sp` (נבצרים)

---

## שלב 2: המרת PDF לתמונות

לכל קובץ PDF:
1. התקן `pymupdf` אם לא מותקן: `pip install pymupdf`
2. המר כל עמוד ל-PNG ב-120 DPI
3. קודד ב-base64
4. שמור ב-JSON: `{prefix}_images.json`
5. שמור גם PNG נפרד לכל עמוד ראשון (לקריאה ויזואלית)

**מפתח תמונה:** `{prefix}_q{מספר_שאלה}_p{מספר_עמוד}`
**דוגמה:** `w24_q3_p2` = חורף 2024, שאלה 3, עמוד 2

---

## שלב 3: קריאת כל שאלה

לכל שאלה, קרא את עמוד 1 (השאלה) ואת שאר העמודים (הפתרון).
זהה:
- **נושא:** נורמלי / סטטיסטיקה / הסתברות / גיאומטריה / מעגל / פונקציה / חדו"א
- **נתונים:** המספרים הספציפיים בשאלה
- **תת-סעיפים:** א, ב, ג, ד, ה
- **תשובות סופיות:** המספר/ביטוי הסופי של כל סעיף

---

## שלב 4: בניית מבנה נתונים לכל שאלה

**חשוב: השתמש ב-backtick template literals (`) ולא ב-single quotes (')**
**זה מונע שבירה מגרשיים עבריים כמו א', ב', f'(x)**

כל שאלה = אובייקט JS עם השדות:

```javascript
{
  examId: `winter2024`,        // מזהה מבחן
  id: 3,                       // מספר שאלה 1-8
  title: `הסתברות — סוכריות`,  // כותרת עם נושא
  topic: `🎲 הסתברות`,         // אימוג'י + נושא
  miykud: `yes`,               // האם במיקוד: yes/no
  miykudText: `✅ יופיע 2026`, // טקסט מיקוד

  // ── שאלה ──
  questionHTML: `<p><b>בשקית</b> יש 4 טופי ו-2 מנטה...</p>`,
  questionImgKey: `w24_q3_p1`,  // מפתח לתמונת השאלה

  // ── 3 רמזים פרוגרסיביים ──
  hints: [
    { title: `רמז 1 — מבנה`, text: `שני שלבים = עץ הסתברות!` },
    { title: `רמז 2 — מותנית`, text: `P(A|B) = P(A∩B)/P(B)` },
    { title: `רמז 3 — ללא החזרה`, text: `המכנה קטן ב-1 בכל שלב!` }
  ],

  // ── פטרון — כמו מורה מסביר ──
  patternSteps: [
    { key: `שלב 1: בנה עץ`, body: `ציר עץ הסתברות. כל צומת = ענף. 
      דוגמה: 3 אדומים מ-5 → P(אדום) = 3/5. 
      כלל: עץ = הדרך לראות את כל האפשרויות.` },
    { key: `שלב 2: סכום מסלולים`, body: `P(אירוע) = סכום כל המסלולים הירוקים.
      דוגמה: P(מנטה) = ½·2/6 + ½·3/6 = 5/12.` },
    { key: `שלב 3: מותנית`, body: `P(A|B) = P(A∩B)/P(B). 
      בדוגמה: ידוע שמנטה → מאיפה?
      זהירות: P(A|B) ≠ P(B|A)!` },
    { key: `שלב 4: ללא החזרה`, body: `המכנה קטן ב-1 בכל שלב!
      דוגמה: 10 כדורים, מוציא 2 → בחירה 1: 10, בחירה 2: 9!` }
  ],

  // ── סיפור עם מספרים אמיתיים ──
  storyHTML: `<div class="story-box">
    <div class="story-title">סיפור</div>
    <div class="story-text">
      <p>שקית א: <b>4 טופי, 2 מנטה</b>. שקית ב: <b>3 טופי, 3 מנטה</b>.</p>
      <p>P(מנטה) = <b>5/12</b>. P(שקית א|מנטה) = <b>2/5</b>.</p>
    </div>
    <div class="story-shortcut">עץ → סכום ירוקים → מותנית</div>
  </div>`,

  // ── מנמוניקה ייחודית ──
  mnem: {
    letters: [
      {l:`ע`, c:`#1a6e28`, w:`עץ`},
      {l:`מ`, c:`#3a28b0`, w:`מסלולים`},
      {l:`מ`, c:`#c46010`, w:`מותנית`},
      {l:`ה`, c:`#a82020`, w:`החזרה`}
    ],
    cards: [
      {l:`ע`, c:`g`, t:`עץ`, b:`ציר כל האפשרויות`},
      {l:`מ`, c:`p`, t:`מסלולים`, b:`סכום ירוקים`},
      {l:`מ`, c:`o`, t:`מותנית`, b:`P(A|B)=P(A∩B)/P(B)`},
      {l:`ה`, c:`r`, t:`החזרה`, b:`מכנה−1 בכל שלב`}
    ]
  },

  // ── פתרון מלא עם תת-סעיפים ──
  subQAs: [
    {
      badge: `א`,
      q: `מהי P(מנטה)?`,
      final: `5/12`,
      steps: [
        {n:`1`, t:`P(א∩מנטה) = ½·2/6 = 1/6`},
        {n:`2`, t:`P(ב∩מנטה) = ½·3/6 = 1/4`},
        {n:`3`, t:`P(מנטה) = 1/6 + 1/4 = <span class="m">5/12</span>`}
      ],
      imgKey: `w24_q3_p1`,
      warn: `אל תחבר (2+3)/(6+6) — זה לא נכון!`
    }
  ]
}
```

---

## שלב 5: בניית קובץ HTML

### מבנה הקובץ:
```
<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <!-- מטא תגים: viewport, apple-mobile-web-app, theme-color -->
  <style>
    /* CSS מלא: topbar, sidebar, content, cards, hints, pattern, 
       story, mnemonic, solution, mobile responsive */
  </style>
</head>
<body>
  <!-- Topbar: שם + progress bar -->
  <!-- Sidebar: רשימת שאלות + כפתורי סינון לפי מבחן -->
  <!-- Content: אזור תצוגת שאלה -->
  <!-- Bottom nav: ניווט מובייל -->
  
  <script>
    const QUESTIONS = [ /* כל אובייקטי השאלות */ ];
    const IMAGES = {};
    IMAGES['w24_q3_p1'] = 'base64...';
    // ... כל התמונות ...
    
    // פונקציות: showQ, renderQ, buildSidebar, filterExam, 
    //           unlock, toggleSec, buildMnem, buildSubQA
    // + keyboard navigation + swipe + init
  </script>
</body>
</html>
```

### כללי JS קריטיים:
- **backtick template literals** לכל מחרוזות — מונע שבירה מגרשיים
- `var` + string concatenation בפונקציות (לא template literals בתוך פונקציות)
- `onclick="unlock(idx,1)"` עם קוד מספרי
- DOMContentLoaded עם readyState check
- אין `יח"ר` בתוך double quotes — השתמש ב-`יח״ר`

### CSS חובה:
- גופן גדול: `html { font-size: 22px }`
- הדגשה: `body { font-weight: 600 }`
- תמונות ללא הגבלת גובה: `max-height` לא מוגדר
- Safe areas לאייפון: `env(safe-area-inset-*)`
- Touch targets מינימום 44px
- Responsive: sidebar נעלם ב-700px, bottom nav מופיע

---

## שלב 6: פטרונים מותאמים (לא גנריים!)

**כלל ברזל: כל פטרון חייב להיות כמו מורה מסביר, עם דוגמאות!**

### תבניות לפי נושא:

**נורמלי:**
```
שלב 1: זהה μ ו-s. (דוגמה: μ=70, s=10)
שלב 2: תקנן z=(x−μ)/s. (דוגמה: x=80 → z=1)
שלב 3: טבלה — חפש P. (טריק: מעל = 1−P!)
שלב 4: P × כמות. (דוגמה: 0.1×2000 = 200)
```

**הסתברות:**
```
שלב 1: בנה עץ. (דוגמה: 3/5 אדומים)
שלב 2: סכום מסלולים ירוקים.
שלב 3: מותנית P(A|B). (זהירות: ≠P(B|A)!)
שלב 4: ללא החזרה — מכנה קטן ב-1!
```

**גיאומטריה:**
```
שלב 1: סרטוט + סימון נתונים.
שלב 2: זהה משפטים (מקבילית, דמיון, חפיפה).
שלב 3: חשב נקודות (שיפוע, מרחק, אמצע).
שלב 4: שטח + זווית.
```

**מעגל:**
```
שלב 1: משוואה (x−a)²+(y−b)²=R².
שלב 2: הצב ישר במעגל → משוואה ריבועית.
שלב 3: מיתר/משיק (משיק⊥רדיוס!).
שלב 4: זווית היקפית = ½ מרכזית.
```

**פונקציה רציונלית:**
```
שלב 1: תחום — מכנה≠0.
שלב 2: אסימפטוטות (אנכית=מכנה, אופקית=מעלות).
שלב 3: f'=0 → קיצון + טבלת סימנים.
שלב 4: סקיצה מכל המידע.
```

**חדו"א:**
```
שלב 1: תחום (שורש≥0, מכנה≠0).
שלב 2: נגזרת (מכפלה/מנה/שרשרת).
שלב 3: f'=0 + טבלת סימנים → MAX/MIN.
שלב 4: סקיצה + שטח = אינטגרל.
```

---

## שלב 7: פיצול ל-deploy

הקובץ המלא גדול מדי ל-GitHub (מגבלת 100MB).
פצל ל-3 קבצים:

```
index.html      — דף סיסמה (2KB)
index_app.html  — אפליקציה בלי תמונות (300-400KB)
images1.js      — חלק 1 של תמונות (עד 80MB)
images2.js      — חלק 2 של תמונות (השאר)
```

### קוד פיצול:
```python
lines = full_html.split('\n')
app_lines = []
img_lines = []
for line in lines:
    if "IMAGES[" in line and len(line) > 1000:
        img_lines.append(line)
    else:
        app_lines.append(line)

# הוסף loader שטוען את קבצי התמונות
app_text += '''
(function(){
  ['images1.js','images2.js'].forEach(function(src){
    var s=document.createElement('script');
    s.src=src;
    s.onload=function(){
      if(typeof showQ==='function') showQ(currentIdx);
    };
    document.body.appendChild(s);
  });
})();
'''
```

---

## שלב 8: PWA + אייפון

### דף סיסמה (index.html):
```html
<h1>Speedboat</h1>
<input type="password" id="pw">
<button onclick="check()">Enter</button>
<script>
function check(){
  if(document.getElementById('pw').value==='PASSWORD'){
    window.location.href='index_app.html';
  }
}
</script>
```

### Inline PWA (בתוך index_app.html):
```javascript
// Inline Service Worker via blob URL
(function(){
  var swCode = 'self.addEventListener("fetch",function(e){...})';
  if('serviceWorker' in navigator){
    var blob = new Blob([swCode], {type:'application/javascript'});
    navigator.serviceWorker.register(URL.createObjectURL(blob));
  }
})();

// Inline Manifest via blob URL
(function(){
  var m = {name:'App Name', display:'standalone', ...};
  var blob = new Blob([JSON.stringify(m)], {type:'application/json'});
  var link = document.createElement('link');
  link.rel = 'manifest';
  link.href = URL.createObjectURL(blob);
  document.head.appendChild(link);
})();
```

---

## שלב 9: Deploy ל-GitHub Pages

```bash
# צור ריפו
curl -X POST -H "Authorization: token TOKEN" \
  https://api.github.com/user/repos \
  -d '{"name":"REPO_NAME","private":false}'

# init + commit + push
cd repo_folder
git init
git add -A
git commit -m "Initial deploy"
git remote add origin https://github.com/USER/REPO.git
git push -u origin master

# הפעל GitHub Pages
curl -X POST -H "Authorization: token TOKEN" \
  https://api.github.com/repos/USER/REPO/pages \
  -d '{"source":{"branch":"master","path":"/"}}'
```

---

## שלב 10: בדיקות (חובה!)

### בדיקת שלמות:
```python
# ספור שאלות
q_count = len(re.findall(r'examId:', html))

# ספור תמונות
img_count = html.count("IMAGES[")

# בדוק שאין פטרונים גנריים
generic = html.count('קרא`,body:`שאלה')

# בדוק backtick balance
bt_count = script.count('`')
assert bt_count % 2 == 0, 'Broken backticks!'

# בדוק שכל imgKey מפנה לתמונה קיימת
referenced = set(re.findall(r'imgKey:[`"]([^`"]+)', html))
embedded = set(re.findall(r"IMAGES\['(\w+)'\]", html))
broken = referenced - embedded
assert len(broken) == 0, f'Broken refs: {broken}'
```

### בדיקת דפדפן:
1. פתח את הקובץ בדפדפן
2. בדוק שכל שאלה מציגה תמונת PDF למעלה
3. בדוק שפתרון מציג את כל עמודי ה-PDF
4. בדוק שפטרון מותאם (לא "קרא/זהה/פתור/בדוק")
5. בדוק סינון לפי מבחן
6. בדוק ניווט מקלדת (חצים, 1-9)
7. בדוק באייפון: touch, swipe, safe areas

---

## כלל ברזל — אל תשבור!

1. **לעולם אל תחליף תוכן קיים** — רק הוסף
2. **backtick template literals** לכל מחרוזות — גרשיים בטוחים
3. **בדוק ספירת שאלות** אחרי כל שינוי
4. **שמור גיבוי** לפני שינויים גדולים
5. **אם משהו נשבר** — חזור לגיבוי, אל תנסה לתקן קובץ שבור

---

## התאמה לנושאים אחרים

### כדי להשתמש בפרומפט הזה לנושא אחר:

1. **שנה את הנושאים:** במקום נורמלי/הסתברות/גיאומטריה → הנושאים שלך
2. **שנה את הפטרונים:** כתוב פטרון מותאם לכל נושא שלך
3. **שנה את המנמוניקות:** ראשי תיבות רלוונטיים
4. **שנה את ה-CSS:** צבעים, גופנים
5. **שנה את מבנה השאלה:** אם יש יותר/פחות מ-8 שאלות למבחן

### דוגמאות לנושאים:
- **פיזיקה:** מכניקה / חשמל / אופטיקה / גלים
- **כימיה:** אורגנית / אנאורגנית / חישובים
- **אנגלית:** reading / writing / grammar / vocabulary
- **היסטוריה:** תקופות / אירועים / דמויות / מושגים
