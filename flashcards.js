/* ═══════════════════════════════════════════════════════════════
   SPEEDBOAT 471 — FLASHCARD LEARNING SYSTEM
   Loaded as separate file — does NOT modify existing app
   Features: Active Recall + Audio TTS + Spaced Repetition + Dashboard
═══════════════════════════════════════════════════════════════ */

(function(){
  'use strict';

  // Wait for app to load
  function whenReady(callback){
    if(typeof QUESTIONS !== 'undefined' && QUESTIONS.length > 0){
      callback();
    } else {
      setTimeout(function(){ whenReady(callback); }, 500);
    }
  }

  whenReady(function(){
    initFlashcards();
  });

  function initFlashcards(){
    injectStyles();
    injectFlashcardButton();
    injectDashboardButton();
  }

  // ═══════════════════════════════════════════════════════════════
  // STYLES
  // ═══════════════════════════════════════════════════════════════
  function injectStyles(){
    var css = [
      '.fc-fab{position:fixed;bottom:80px;left:14px;z-index:300;width:56px;height:56px;border:none;border-radius:50%;font-size:24px;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.3);transition:all .2s}',
      '.fc-fab:hover{transform:scale(1.1)}',
      '.fc-fab.flash{background:#c8983a;color:#1a1208}',
      '.fc-fab.dash{background:#3a28b0;color:#fff;bottom:150px}',
      '.fc-overlay{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(26,18,8,0.95);z-index:500;display:none;overflow-y:auto;padding:20px}',
      '.fc-overlay.open{display:block}',
      '.fc-card{max-width:600px;margin:30px auto;background:#f5f2ed;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.4)}',
      '.fc-header{background:#1a1208;color:#f5e6c8;padding:16px 20px;display:flex;justify-content:space-between;align-items:center}',
      '.fc-title{font-size:18px;font-weight:900}',
      '.fc-close{background:#c43030;color:#fff;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;cursor:pointer;font-weight:900}',
      '.fc-body{padding:20px}',
      '.fc-question{font-size:18px;line-height:1.8;color:#1a1208;font-weight:600;background:#fff;padding:16px;border-radius:10px;border:2px solid #c8983a;margin-bottom:16px}',
      '.fc-question img{max-width:100%;border-radius:6px;margin:10px 0}',
      '.fc-input-group{margin:12px 0}',
      '.fc-input-label{font-size:15px;font-weight:700;color:#5a3000;margin-bottom:6px;display:block}',
      '.fc-input{width:100%;padding:12px 16px;border:2px solid #e0d8d0;border-radius:8px;font-size:16px;font-weight:600;background:#fff;color:#1a1208;outline:none;text-align:right;direction:rtl;font-family:inherit}',
      '.fc-input:focus{border-color:#c8983a;box-shadow:0 0 12px rgba(200,152,58,.2)}',
      '.fc-btn{display:block;width:100%;padding:14px;margin:8px 0;border:none;border-radius:10px;font-size:16px;font-weight:900;cursor:pointer;font-family:inherit}',
      '.fc-btn-check{background:#1a6e28;color:#fff}',
      '.fc-btn-check:hover{background:#0a4a18}',
      '.fc-btn-show{background:#c8983a;color:#1a1208}',
      '.fc-btn-show:hover{background:#a07020}',
      '.fc-btn-next{background:#3a28b0;color:#fff}',
      '.fc-btn-skip{background:#8a7a60;color:#fff}',
      '.fc-result{padding:14px;border-radius:10px;margin:10px 0;font-size:15px;font-weight:700}',
      '.fc-result.ok{background:#e8f7e9;border:2px solid #1a6e28;color:#0a4a18}',
      '.fc-result.bad{background:#fdf0f0;border:2px solid #c43030;color:#a82020}',
      '.fc-audio{display:inline-flex;align-items:center;gap:6px;padding:8px 14px;background:#3a28b0;color:#fff;border:none;border-radius:20px;font-size:13px;font-weight:700;cursor:pointer;margin:4px}',
      '.fc-audio:hover{background:#2a1890}',
      '.fc-audio.play{background:#c43030;animation:fcpulse 1s infinite}',
      '@keyframes fcpulse{0%,100%{opacity:1}50%{opacity:.6}}',
      '.fc-progress{padding:8px 16px;background:#f0ede8;font-size:13px;color:#6b5e4a;font-weight:700}',
      '.fc-rating{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin:10px 0}',
      '.fc-rate-btn{padding:14px;border:none;border-radius:10px;font-size:14px;font-weight:900;cursor:pointer;font-family:inherit}',
      '.fc-rate-easy{background:#1a6e28;color:#fff}',
      '.fc-rate-med{background:#c8983a;color:#1a1208}',
      '.fc-rate-hard{background:#c43030;color:#fff}',
      '.fc-solution{margin-top:14px;padding:14px;background:#fffef5;border:2px solid #c8983a;border-radius:10px}',
      '.fc-sol-row{padding:10px 0;border-bottom:1px dotted #c8983a}',
      '.fc-sol-row:last-child{border-bottom:none}',
      '.fc-sol-badge{display:inline-block;background:#8a6820;color:#fff;padding:2px 8px;border-radius:4px;font-size:13px;font-weight:900;margin-left:6px}',
      '.fc-sol-final{display:inline-block;background:#1a6e28;color:#fff;padding:3px 10px;border-radius:6px;font-size:14px;font-weight:900}',
      '.fc-dash{background:#1a1208;color:#f5e6c8;padding:30px}',
      '.fc-dash-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:20px 0}',
      '.fc-stat{background:#2a1a08;border:2px solid #c8983a;border-radius:12px;padding:16px;text-align:center}',
      '.fc-stat-num{font-size:32px;font-weight:900;color:#c8983a}',
      '.fc-stat-lbl{font-size:11px;color:#b8965a;font-family:monospace;margin-top:4px}',
      '.fc-topic-row{display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px dotted #6a5a40}',
      '.fc-topic-name{flex:1;font-size:14px;font-weight:700;color:#f5e6c8}',
      '.fc-topic-bar{flex:2;height:10px;background:#2a1a08;border-radius:5px;overflow:hidden}',
      '.fc-topic-fill{height:100%;background:#c8983a;border-radius:5px;transition:width .3s}',
      '.fc-topic-pct{font-size:13px;font-weight:900;color:#c8983a;min-width:50px;text-align:left;font-family:monospace}',
      '@media(max-width:600px){.fc-dash-stats{grid-template-columns:repeat(2,1fr)}.fc-card{margin:10px}}'
    ].join('');

    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ═══════════════════════════════════════════════════════════════
  // INJECTION
  // ═══════════════════════════════════════════════════════════════
  function injectFlashcardButton(){
    var btn = document.createElement('button');
    btn.className = 'fc-fab flash';
    btn.textContent = '🎴';
    btn.title = 'Flashcards — תרגול פעיל';
    btn.onclick = openFlashcards;
    document.body.appendChild(btn);
  }

  function injectDashboardButton(){
    var btn = document.createElement('button');
    btn.className = 'fc-fab dash';
    btn.textContent = '📊';
    btn.title = 'Dashboard — התקדמות';
    btn.onclick = openDashboard;
    document.body.appendChild(btn);
  }

  // ═══════════════════════════════════════════════════════════════
  // STATE & STORAGE
  // ═══════════════════════════════════════════════════════════════
  function getSR(){
    try {
      return JSON.parse(localStorage.getItem('sr471') || '{}');
    } catch(e) { return {}; }
  }

  function saveSR(state){
    try {
      localStorage.setItem('sr471', JSON.stringify(state));
    } catch(e){}
  }

  function getQuestionSR(idx){
    var state = getSR();
    if(!state[idx]) state[idx] = { interval: 1, ease: 2.5, reps: 0, next: null, last: null };
    return state[idx];
  }

  function updateSR(idx, quality){
    var state = getSR();
    var s = state[idx] || { interval: 1, ease: 2.5, reps: 0, next: null, last: null };

    if(quality >= 3){
      if(s.reps === 0) s.interval = 1;
      else if(s.reps === 1) s.interval = 6;
      else s.interval = Math.round(s.interval * s.ease);
      s.reps++;
    } else {
      s.reps = 0;
      s.interval = 1;
    }
    s.ease = Math.max(1.3, s.ease + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    var d = new Date();
    d.setDate(d.getDate() + s.interval);
    s.next = d.toISOString().slice(0,10);
    s.last = quality >= 3 ? 'correct' : 'wrong';

    state[idx] = s;
    saveSR(state);
  }

  // ═══════════════════════════════════════════════════════════════
  // AUDIO TTS
  // ═══════════════════════════════════════════════════════════════
  var ttsPlaying = false;

  function speak(text, btn){
    if(ttsPlaying){
      window.speechSynthesis.cancel();
      ttsPlaying = false;
      if(btn) btn.classList.remove('play');
      return;
    }
    if(!('speechSynthesis' in window)){
      alert('הדפדפן לא תומך ב-TTS');
      return;
    }
    var clean = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    if(clean.length === 0) return;

    var u = new SpeechSynthesisUtterance(clean);
    u.lang = 'he-IL';
    u.rate = 0.9;
    u.onend = function(){
      ttsPlaying = false;
      if(btn) btn.classList.remove('play');
    };
    ttsPlaying = true;
    if(btn) btn.classList.add('play');
    window.speechSynthesis.speak(u);
  }

  // ═══════════════════════════════════════════════════════════════
  // FLASHCARD SESSION
  // ═══════════════════════════════════════════════════════════════
  var session = null;

  function openFlashcards(){
    // Build queue: prioritize due questions, then never-reviewed
    var sr = getSR();
    var today = new Date().toISOString().slice(0,10);

    var due = [];
    var fresh = [];
    var reviewed = [];

    QUESTIONS.forEach(function(q, i){
      var s = sr[i];
      if(!s || s.reps === 0){
        fresh.push(i);
      } else if(!s.next || s.next <= today){
        due.push(i);
      } else {
        reviewed.push(i);
      }
    });

    var queue = due.concat(fresh).concat(reviewed);

    if(queue.length === 0){
      alert('אין שאלות לתרגל!');
      return;
    }

    session = {
      queue: queue,
      pos: 0,
      revealed: false,
      answers: {}
    };

    showOverlay();
    renderCard();
  }

  function showOverlay(){
    var ov = document.getElementById('fcOverlay');
    if(!ov){
      ov = document.createElement('div');
      ov.id = 'fcOverlay';
      ov.className = 'fc-overlay';
      document.body.appendChild(ov);
    }
    ov.classList.add('open');
  }

  function closeOverlay(){
    var ov = document.getElementById('fcOverlay');
    if(ov) ov.classList.remove('open');
    if(window.speechSynthesis) window.speechSynthesis.cancel();
    ttsPlaying = false;
  }

  function renderCard(){
    if(session.pos >= session.queue.length){
      renderComplete();
      return;
    }

    var idx = session.queue[session.pos];
    var q = QUESTIONS[idx];
    var sr = getQuestionSR(idx);

    var h = '';
    h += '<div class="fc-card">';
    h += '  <div class="fc-header">';
    h += '    <div class="fc-title">🎴 ' + escapeHtml(q.title) + '</div>';
    h += '    <button class="fc-close" onclick="window.fcClose()">✕</button>';
    h += '  </div>';
    h += '  <div class="fc-progress">';
    h += '    📋 ' + (session.pos + 1) + ' / ' + session.queue.length;
    h += '    | ' + (EXAM_LABELS[q.examId] || q.examId);
    h += '    | חזרות: ' + sr.reps;
    h += '    | ' + (sr.next ? 'הבא: ' + sr.next : 'חדש');
    h += '  </div>';
    h += '  <div class="fc-body">';

    // FRONT: Question
    h += '<div class="fc-question">';
    h += '<div style="font-size:14px;color:#8a6820;margin-bottom:8px">' + escapeHtml(q.topic) + '</div>';
    h += stripDangerous(q.questionHTML || '');
    if(q.questionImgKey && IMAGES[q.questionImgKey]){
      h += '<img src="data:image/png;base64,' + IMAGES[q.questionImgKey] + '" alt="">';
    }
    h += '</div>';

    // Audio button
    h += '<button class="fc-audio" onclick="window.fcSpeak(this, ' + idx + ')">🔊 השמע שאלה</button>';

    // Active Recall inputs
    if(!session.revealed){
      h += '<div style="margin-top:14px;padding:14px;background:#fffef5;border:2px solid #c8983a;border-radius:10px">';
      h += '<div style="font-weight:900;color:#8a6820;margin-bottom:10px">📝 נסה לפתור לבד:</div>';

      if(q.subQAs && q.subQAs.length > 0){
        q.subQAs.forEach(function(sq, i){
          h += '<div class="fc-input-group">';
          h += '<label class="fc-input-label">סעיף ' + escapeHtml(sq.badge) + ': ' + escapeHtml(sq.q || '') + '</label>';
          h += '<input class="fc-input" id="fcAns_' + i + '" placeholder="הקלד תשובה...">';
          h += '</div>';
        });
      } else {
        h += '<input class="fc-input" id="fcAns_0" placeholder="הקלד תשובה...">';
      }

      h += '</div>';
      h += '<button class="fc-btn fc-btn-check" onclick="window.fcCheck()">✅ בדוק תשובות</button>';
      h += '<button class="fc-btn fc-btn-show" onclick="window.fcReveal()">👁️ הצג תשובה</button>';
      h += '<button class="fc-btn fc-btn-skip" onclick="window.fcSkip()">⏭️ דלג</button>';
    } else {
      // BACK: Solution
      h += renderSolution(q, idx);
    }

    h += '  </div>';
    h += '</div>';

    document.getElementById('fcOverlay').innerHTML = h;
  }

  function renderSolution(q, idx){
    var h = '<div class="fc-solution">';
    h += '<div style="font-size:16px;font-weight:900;color:#8a6820;margin-bottom:10px">✅ פתרון מלא + ניתוח</div>';

    var totalAttempted = 0;
    var totalCorrect = 0;
    var failureType = null;
    var firstWrong = null;

    if(q.subQAs && q.subQAs.length > 0){
      q.subQAs.forEach(function(sq, i){
        var userAns = session.answers[i] || '';
        var correct = isCorrect(userAns, sq.final);
        if(userAns) totalAttempted++;
        if(correct) totalCorrect++;
        if(userAns && !correct && !firstWrong) firstWrong = { user: userAns, correct: sq.final, badge: sq.badge };
        var icon = userAns ? (correct ? '✅' : '❌') : '⏭️';

        h += '<div class="fc-sol-row">';
        h += '<span class="fc-sol-badge">' + escapeHtml(sq.badge) + '</span> ';
        h += icon + ' ';
        if(userAns){
          h += '<span style="color:#6b5e4a">תשובה שלך: <b>' + escapeHtml(userAns) + '</b></span> → ';
        }
        h += '<span class="fc-sol-final">' + escapeHtml(sq.final) + '</span>';

        if(sq.steps && sq.steps.length > 0){
          h += '<div style="margin-top:8px;font-size:14px;line-height:1.7;color:#3a3028;background:#fff;padding:10px;border-radius:6px">';
          h += '<div style="font-weight:900;color:#3a28b0;margin-bottom:6px">📚 הסבר שלב-שלב (כמו מורה פרטי):</div>';
          sq.steps.forEach(function(st){
            h += '<div style="padding:4px 0">' + (st.n ? '<b style="color:#3a28b0">שלב ' + escapeHtml(st.n) + ':</b> ' : '') + stripDangerous(st.t || '') + '</div>';
          });
          h += '</div>';
        }

        if(sq.warn){
          h += '<div style="margin-top:8px;padding:8px;background:#fffef5;border:1px solid #b89010;border-radius:6px;font-size:13px;color:#5a4000"><b>⚠️ טעות נפוצה:</b> ' + escapeHtml(sq.warn) + '</div>';
        }
        h += '</div>';
      });
    }

    // === COVERAGE CHECK (Missing Parts) ===
    h += '<div style="margin-top:14px;padding:12px;background:#f0faf2;border:2px solid #1a6e28;border-radius:8px">';
    h += '<div style="font-weight:900;color:#0a4a18;margin-bottom:8px">📋 בדיקת כיסוי מלא:</div>';
    if(q.subQAs){
      q.subQAs.forEach(function(sq, i){
        var userAns = session.answers[i] || '';
        var correct = isCorrect(userAns, sq.final);
        var status = !userAns ? '⚪ לא נענה' : (correct ? '✅ נכון' : '❌ שגוי');
        var color = !userAns ? '#8a7a60' : (correct ? '#0a4a18' : '#a82020');
        h += '<div style="padding:3px 0;color:' + color + '">' + status + ' — סעיף ' + escapeHtml(sq.badge) + ': ' + escapeHtml(sq.q || '') + '</div>';
      });
    }
    h += '</div>';

    // === ERROR ANALYSIS (if failed) ===
    if(firstWrong || (totalAttempted > 0 && totalCorrect < totalAttempted)){
      var diagType, diagText, diagFix;
      if(firstWrong){
        var u = firstWrong.user.replace(/\s/g,'');
        var c = firstWrong.correct.replace(/\s/g,'');
        // Try to detect error type
        if(u.length > 0 && c.length > 0 && Math.abs(u.length - c.length) <= 2){
          diagType = '🧮 טעות חישוב';
          diagText = 'התשובה קרובה אבל לא מדויקת — ככל הנראה טעות אריתמטית.';
          diagFix = 'חזור על החישוב שלב-שלב לאט. השתמש במחשבון לבדיקה.';
          failureType = 'calculation';
        } else if(u.length === 0){
          diagType = '⏭️ דילגת';
          diagText = 'לא ניסית לענות על סעיף זה.';
          diagFix = 'נסה לענות גם אם אתה לא בטוח — Active Recall עובד גם עם ניחוש.';
          failureType = 'skipped';
        } else {
          diagType = '🧠 טעות מושגית';
          diagText = 'הגישה שלך כנראה לא נכונה — אולי לא זיהית את סוג השאלה.';
          diagFix = 'קרא שוב את הפטרון וההסבר. נסה לזהות אילו נוסחאות שייכות לסוג זה.';
          failureType = 'conceptual';
        }
      } else {
        diagType = '⚠️ פתרון חלקי';
        diagText = 'ענית רק על חלק מהסעיפים.';
        diagFix = 'חשוב להשלים את כל הסעיפים — כל תת-סעיף נותן נקודות.';
        failureType = 'incomplete';
      }

      h += '<div style="margin-top:14px;padding:12px;background:#fdf0f0;border:2px solid #c43030;border-radius:8px">';
      h += '<div style="font-weight:900;color:#a82020;margin-bottom:8px">🔍 ניתוח טעות:</div>';
      h += '<div style="font-weight:700;color:#a82020">' + diagType + '</div>';
      h += '<div style="margin:6px 0;color:#5a2020">' + diagText + '</div>';
      h += '<div style="background:#fffef5;padding:8px;border-radius:6px;color:#5a4000;border:1px solid #b89010"><b>💡 איך לתקן:</b> ' + diagFix + '</div>';
      h += '</div>';
    }

    // === RECOMMENDED LEARNING METHOD ===
    var method = recommendMethod(q, totalCorrect, totalAttempted, failureType);
    h += '<div style="margin-top:14px;padding:12px;background:#eeedfb;border:2px solid #5340c4;border-radius:8px">';
    h += '<div style="font-weight:900;color:#3a28b0;margin-bottom:8px">' + method.icon + ' שיטת למידה מומלצת: ' + method.name + '</div>';
    h += '<div style="margin:6px 0;color:#3a28b0;font-weight:700">' + method.description + '</div>';
    h += '<div style="background:#fff;padding:8px;border-radius:6px;color:#3a3028;font-size:13px;border:1px solid #c4bbf0"><b>למה זה מתאים כאן:</b> ' + method.why + '</div>';
    h += '</div>';

    // Show solution PDF pages
    if(q.questionImgKey){
      var baseKey = q.questionImgKey.replace(/_p\d+$/, '');
      var pg = 2;
      while(IMAGES[baseKey + '_p' + pg]){
        h += '<div style="margin:10px 0"><img src="data:image/png;base64,' + IMAGES[baseKey + '_p' + pg] + '" style="max-width:100%;border-radius:6px"></div>';
        pg++;
        if(pg > 10) break;
      }
    }
    h += '</div>';

    // Audio for solution
    h += '<button class="fc-audio" onclick="window.fcSpeakSol(this, ' + idx + ')">🔊 השמע פתרון</button>';

    // Rating buttons
    h += '<div style="margin-top:16px;font-weight:900;color:#1a1208;text-align:center">איך הלך?</div>';
    h += '<div class="fc-rating">';
    h += '<button class="fc-rate-btn fc-rate-hard" onclick="window.fcRate(1)">😓 קשה<br><small>חזרה היום</small></button>';
    h += '<button class="fc-rate-btn fc-rate-med" onclick="window.fcRate(3)">🤔 בינוני<br><small>חזרה בקרוב</small></button>';
    h += '<button class="fc-rate-btn fc-rate-easy" onclick="window.fcRate(5)">😎 קל<br><small>חזרה בעוד הרבה</small></button>';
    h += '</div>';

    return h;
  }

  function renderComplete(){
    var h = '';
    h += '<div class="fc-card">';
    h += '<div class="fc-header"><div class="fc-title">🎉 סיימת!</div><button class="fc-close" onclick="window.fcClose()">✕</button></div>';
    h += '<div class="fc-body" style="text-align:center;padding:40px 20px">';
    h += '<div style="font-size:64px">🏆</div>';
    h += '<div style="font-size:24px;font-weight:900;margin:14px 0">סיימת את כל הסשן</div>';
    h += '<div style="font-size:16px;color:#6b5e4a;margin-bottom:20px">' + session.queue.length + ' שאלות תורגלו</div>';
    h += '<button class="fc-btn fc-btn-check" onclick="window.fcStart()">🔄 סשן חדש</button>';
    h += '<button class="fc-btn fc-btn-skip" onclick="window.fcClose()">סיום</button>';
    h += '</div></div>';
    document.getElementById('fcOverlay').innerHTML = h;
  }

  // ═══════════════════════════════════════════════════════════════
  // ACTIONS (exposed as window.fc*)
  // ═══════════════════════════════════════════════════════════════
  window.fcClose = closeOverlay;
  window.fcStart = openFlashcards;

  window.fcCheck = function(){
    var idx = session.queue[session.pos];
    var q = QUESTIONS[idx];
    var nSubs = (q.subQAs && q.subQAs.length) || 1;
    for(var i = 0; i < nSubs; i++){
      var inp = document.getElementById('fcAns_' + i);
      if(inp) session.answers[i] = inp.value.trim();
    }
    session.revealed = true;
    renderCard();
  };

  window.fcReveal = function(){
    var idx = session.queue[session.pos];
    var q = QUESTIONS[idx];
    var nSubs = (q.subQAs && q.subQAs.length) || 1;
    for(var i = 0; i < nSubs; i++){
      var inp = document.getElementById('fcAns_' + i);
      if(inp) session.answers[i] = inp.value.trim();
    }
    session.revealed = true;
    renderCard();
  };

  window.fcSkip = function(){
    session.pos++;
    session.revealed = false;
    session.answers = {};
    renderCard();
  };

  window.fcRate = function(quality){
    var idx = session.queue[session.pos];
    updateSR(idx, quality);
    session.pos++;
    session.revealed = false;
    session.answers = {};
    renderCard();
  };

  window.fcSpeak = function(btn, idx){
    var q = QUESTIONS[idx];
    var text = stripHtml(q.questionHTML || '') + '. ' + (q.title || '');
    speak(text, btn);
  };

  window.fcSpeakSol = function(btn, idx){
    var q = QUESTIONS[idx];
    var text = '';
    if(q.subQAs){
      q.subQAs.forEach(function(sq){
        text += 'סעיף ' + sq.badge + '. תשובה: ' + sq.final + '. ';
        if(sq.steps){
          sq.steps.forEach(function(st){
            text += stripHtml(st.t || '') + '. ';
          });
        }
      });
    }
    speak(text, btn);
  };

  // ═══════════════════════════════════════════════════════════════
  // DASHBOARD
  // ═══════════════════════════════════════════════════════════════
  function openDashboard(){
    showOverlay();
    var sr = getSR();
    var today = new Date().toISOString().slice(0,10);

    var due = 0, mastered = 0, struggling = 0, untouched = 0;
    var topics = {};

    QUESTIONS.forEach(function(q, i){
      var s = sr[i];
      if(!s || s.reps === 0) untouched++;
      else if(s.reps >= 3) mastered++;
      else if(s.last === 'wrong') struggling++;

      if(!s || !s.next || s.next <= today) due++;

      var t = q.topic || 'אחר';
      if(!topics[t]) topics[t] = { total: 0, mastered: 0 };
      topics[t].total++;
      if(s && s.reps >= 3) topics[t].mastered++;
    });

    var h = '';
    h += '<div class="fc-card" style="background:#1a1208;color:#f5e6c8">';
    h += '<div class="fc-header"><div class="fc-title">📊 התקדמות</div><button class="fc-close" onclick="window.fcClose()">✕</button></div>';
    h += '<div class="fc-dash">';

    h += '<div class="fc-dash-stats">';
    h += '<div class="fc-stat"><div class="fc-stat-num">' + due + '</div><div class="fc-stat-lbl">לחזרה היום</div></div>';
    h += '<div class="fc-stat"><div class="fc-stat-num" style="color:#3a8c42">' + mastered + '</div><div class="fc-stat-lbl">נשלטו</div></div>';
    h += '<div class="fc-stat"><div class="fc-stat-num" style="color:#e05252">' + struggling + '</div><div class="fc-stat-lbl">קשים</div></div>';
    h += '<div class="fc-stat"><div class="fc-stat-num" style="color:#b8965a">' + untouched + '</div><div class="fc-stat-lbl">לא התחלתי</div></div>';
    h += '</div>';

    h += '<div style="font-size:18px;font-weight:900;margin:20px 0 10px;color:#c8983a">לפי נושא:</div>';
    Object.keys(topics).sort().forEach(function(t){
      var pct = Math.round(topics[t].mastered / topics[t].total * 100);
      h += '<div class="fc-topic-row">';
      h += '<span class="fc-topic-name">' + escapeHtml(t) + '</span>';
      h += '<div class="fc-topic-bar"><div class="fc-topic-fill" style="width:' + pct + '%"></div></div>';
      h += '<span class="fc-topic-pct">' + topics[t].mastered + '/' + topics[t].total + '</span>';
      h += '</div>';
    });

    h += '<button class="fc-btn fc-btn-check" style="margin-top:24px" onclick="window.fcStart()">🎴 התחל סשן תרגול</button>';
    h += '<button class="fc-btn fc-btn-skip" onclick="window.fcClose()">סגור</button>';
    h += '</div></div>';

    document.getElementById('fcOverlay').innerHTML = h;
  }

  // ═══════════════════════════════════════════════════════════════
  // HELPERS
  // ═══════════════════════════════════════════════════════════════
  function escapeHtml(s){
    if(!s) return '';
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function stripHtml(s){
    if(!s) return '';
    return String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function stripDangerous(s){
    // Allow basic HTML tags but block scripts
    if(!s) return '';
    return String(s).replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '').replace(/on\w+\s*=/gi, '');
  }

  function isCorrect(user, correct){
    if(!user || !correct) return false;
    var u = String(user).replace(/\s/g, '').toLowerCase();
    var c = String(correct).replace(/\s/g, '').toLowerCase();
    return u === c;
  }

  // ═══════════════════════════════════════════════════════════════
  // LEARNING METHOD RECOMMENDATION
  // ═══════════════════════════════════════════════════════════════
  function recommendMethod(q, correct, attempted, failType){
    // All correct → spaced repetition
    if(attempted > 0 && correct === attempted){
      return {
        name: 'Spaced Repetition (חזרה מרווחת)',
        icon: '📅',
        description: 'פתרת נכון — חזור על השאלה בעוד כמה ימים',
        why: 'מחקרים מראים שחזרה במרווחים גדלים מחזקת את הזיכרון לטווח ארוך. אל תתרגל מיד שוב — חכה.'
      };
    }

    // Skipped → Active Recall
    if(failType === 'skipped'){
      return {
        name: 'Active Recall (השלמה פעילה)',
        icon: '🧠',
        description: 'נסה לענות גם אם אתה לא בטוח',
        why: 'גם ניחוש שגוי מחזק את הזיכרון יותר מקריאה פסיבית. המוח לומד טוב יותר מטעות מאשר מהסבר.'
      };
    }

    // Calculation mistake → Error-Based Learning
    if(failType === 'calculation'){
      return {
        name: 'Error-Based Learning (למידה מטעות)',
        icon: '🎯',
        description: 'התמקד בדיוק איפה טעית בחישוב',
        why: 'טעות חישוב מתוקנת על-ידי תרגול מודע ואיטי, לא על-ידי לימוד מחדש. עבור על אותה שאלה שוב וזהה את הטעות.'
      };
    }

    // Conceptual error → Pattern Recognition + Feynman
    if(failType === 'conceptual'){
      return {
        name: 'Feynman Technique (הסבר במילים שלך)',
        icon: '👨‍🏫',
        description: 'הסבר את הפתרון בקול רם כאילו אתה מלמד מישהו אחר',
        why: 'אם אתה לא יכול להסביר את זה פשוט — אתה לא באמת מבין. כתוב/הקלט את ההסבר שלך לשאלה הזו.'
      };
    }

    // Partial → Interleaving
    if(failType === 'incomplete' || (correct > 0 && correct < attempted)){
      return {
        name: 'Interleaving (ערבוב נושאים)',
        icon: '🔀',
        description: 'ערבב את השאלה הזו עם 2 שאלות אחרות מנושאים שונים',
        why: 'תרגול מעורב מחזק את היכולת לזהות איזו שיטה לבחור. לא רק "איך לפתור" אלא גם "מתי לפתור ככה".'
      };
    }

    // Default → Active Recall
    return {
      name: 'Active Recall (תרגול פעיל)',
      icon: '🧠',
      description: 'נסה לענות לבד לפני שאתה רואה את הפתרון',
      why: 'הדרך הכי יעילה ללמוד — לאלץ את המוח לחפש את התשובה במקום רק לקרוא אותה.'
    };
  }

  console.log('🎴 Flashcards loaded — click 🎴 button to start!');
})();
