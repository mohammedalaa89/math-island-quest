'use strict';
/* Adventure Island engine. Lessons live in lessons/*.js and call addLesson({...}).
   See CLAUDE.md for the lesson format. */

/* ---------- registry ---------- */
const LESSONS = [];
function addLesson(l) { LESSONS.push(l); }
/* Subjects group the islands on the home page. Add a subject here, then give islands its id. */
const SUBJECTS = [
  { id: 'math',    name: 'Math',    pic: '🔢', color: '#FF8A3D' },
  { id: 'english', name: 'English', pic: '📖', color: '#7C4DFF' },
  { id: 'science', name: 'Science', pic: '🔬', color: '#22B566' },
];
const ISLANDS = [
  { id: 'math',    name: 'Math Island',   sub: 'Times tables and sharing',  color: '#FF8A3D', shade: '#C9601F', subject: 'math', pic: '🍎', href: 'math.html' },
  { id: 'grammar', name: 'Grammar Grove', sub: 'Nouns and capital letters', color: '#22B566', shade: '#168048', subject: 'english', pic: '🌳' },
  { id: 'phonics', name: 'Phonics Falls', sub: 'Letter sounds and spelling', color: '#2E9BF0', shade: '#1C6FB0', subject: 'english', pic: '💧' },
  { id: 'vocab',   name: 'Word Woods',    sub: 'New words and meanings',     color: '#7C4DFF', shade: '#5631C9', subject: 'english', pic: '🦉' },
  { id: 'story',   name: 'Story Summit',  sub: 'Reading and understanding',  color: '#F0466B', shade: '#B82C4C', subject: 'english', pic: '⛰️' },
];
const TYPE_SUB = { mc: 'Pick the best answer', sort: 'Drag words into the right box', caps: 'Tap words that need a capital', fill: 'Fly a word into the gap', match: 'Match words to meanings', pattern: 'Find the letters that make the sound', samediff: 'Same letters or different?' };
const TYPE_PIC = { mc: '🤔', sort: '🧺', caps: '🔠', fill: '✏️', match: '🔗', pattern: '🔍', samediff: '👯' };
const ISL = id => ISLANDS.find(i => i.id === id);
const LES = id => LESSONS.find(l => l.id === id);

/* ---------- helpers ---------- */
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const app = () => document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = (a, n) => shuffle(a).slice(0, n == null ? a.length : Math.min(n, a.length));
const tpl = (t, w, it) => typeof t === 'function' ? t(w, it) : String(t).replace(/\{w\}/g, '<b>' + esc(w) + '</b>');
let TOK = 0; // changes on every screen, so timers from an old screen stop

/* ---------- saved progress (this device only) ---------- */
const KEY = 'adventureIsland';
let S = { name: '', read: true, sfx: true, prog: {} };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
function mathState() { try { return JSON.parse(localStorage.getItem('mathIsland') || 'null') || {}; } catch (e) { return {}; } }
if (!S.name && mathState().name) S.name = mathState().name;
function setName(n) {
  S.name = n; save();
  try { const m = mathState(); m.name = n; if (!Array.isArray(m.done)) m.done = [0, 0, 0, 0]; localStorage.setItem('mathIsland', JSON.stringify(m)); } catch (e) {}
}
const lp = id => S.prog[id] || (S.prog[id] = { learn: false, stars: {} });
const lessonStars = l => { const p = S.prog[l.id]; return p ? Object.values(p.stars).reduce((a, b) => a + b, 0) : 0; };
const totalStars = () => LESSONS.reduce((a, l) => a + lessonStars(l), 0) + (mathState().stars | 0);
const stepsOf = l => 1 + l.acts.length;
const stepsDone = l => { const p = S.prog[l.id]; return p ? (p.learn ? 1 : 0) + l.acts.filter((_, i) => p.stars[i] > 0).length : 0; };
const isNew = l => !S.prog[l.id] && (Date.now() - new Date(l.added)) / 864e5 < 21;
function mathFrac() { const d = mathState().done || [0, 0, 0, 0], n = [6, 4, 15, 19]; return n.reduce((a, x, k) => a + Math.min(d[k] | 0, x), 0) / 44; }

/* ---------- sound: speech + little chimes ---------- */
let AC = null, unlocked = false;
document.addEventListener('pointerdown', () => {
  if (unlocked) return; unlocked = true;
  try { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } catch (e) {}
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); if (AC.resume) AC.resume(); } catch (e) {}
}, { capture: true });
function tone(fs, d, type, vol) {
  if (!S.sfx || !AC) return;
  try {
    const t = AC.currentTime + .01;
    fs.forEach((f, i) => {
      const o = AC.createOscillator(), g = AC.createGain(), s = t + i * d;
      o.type = type || 'triangle'; o.frequency.value = f;
      g.gain.setValueAtTime(.0001, s); g.gain.exponentialRampToValueAtTime(vol || .16, s + .015); g.gain.exponentialRampToValueAtTime(.0001, s + d * 1.8);
      o.connect(g); g.connect(AC.destination); o.start(s); o.stop(s + d * 2);
    });
  } catch (e) {}
}
const SFX = { ok: () => tone([660, 880, 1175], .08), no: () => tone([280, 210], .13, 'sine', .1), pop: () => tone([700], .05, 'triangle', .07), win: () => tone([523, 659, 784, 1047, 1319], .11) };
const SPEAK_FIX = [[/<br\s*\/?>/g, '. '], [/<[^>]+>/g, ''], [/_{2,}/g, ' blank '], [/\ba_e\b/g, 'a, consonant, e'], [/\/ā\//g, '"ay"'], [/&[a-z]+;/g, ' '], [/[▶◀✓]/g, '']];
function say(t, force) {
  if (!S.read && !force) return;
  try {
    let c = String(t); SPEAK_FIX.forEach(([a, b]) => { c = c.replace(a, b); });
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(c.replace(/\s+/g, ' ').trim()); u.rate = .88; u.lang = 'en-US';
    speechSynthesis.speak(u);
  } catch (e) {}
}

/* ---------- pictures ---------- */
const STARP = 'M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.5l1.3-6.6L2.5 9.3l6.6-.8z';
const STAR = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${STARP}" fill="#FFC83D" stroke="#E0A21A" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
const STARBIG = on => `<svg viewBox="0 0 24 24" class="${on ? '' : 'off'}" aria-hidden="true"><path d="${STARP}" fill="#FFC83D" stroke="#E0A21A" stroke-width="1.2" stroke-linejoin="round"/></svg>`;
const SPK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>';
/* Pip, the explorer bird who helps her */
const PIP = `<svg class="pip" viewBox="0 0 100 104" aria-hidden="true"><ellipse cx="50" cy="99" rx="26" ry="4" fill="rgba(30,42,68,.13)"/><g class="pb">
<path d="M19 64 Q6 70 16 82" stroke="#E0A21A" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M81 64 Q94 70 84 82" stroke="#E0A21A" stroke-width="7" fill="none" stroke-linecap="round"/>
<circle cx="50" cy="62" r="32" fill="#FFC83D"/><ellipse cx="50" cy="74" rx="19" ry="15" fill="#FFE7A3"/>
<circle cx="39" cy="56" r="8.5" fill="#fff"/><circle cx="61" cy="56" r="8.5" fill="#fff"/><circle cx="40.5" cy="57" r="4.3" fill="#1E2A44"/><circle cx="62.5" cy="57" r="4.3" fill="#1E2A44"/><circle cx="42" cy="55.5" r="1.4" fill="#fff"/><circle cx="64" cy="55.5" r="1.4" fill="#fff"/>
<ellipse class="lid" cx="39" cy="56" rx="9" ry="9" fill="#FFC83D"/><ellipse class="lid" cx="61" cy="56" rx="9" ry="9" fill="#FFC83D"/>
<path d="M45 64 L55 64 L50 71 Z" fill="#FF8A3D"/><circle cx="30" cy="67" r="4" fill="#FFB0A0" opacity=".7"/><circle cx="70" cy="67" r="4" fill="#FFB0A0" opacity=".7"/>
<ellipse cx="50" cy="33" rx="38" ry="7" fill="#A0703C"/><path d="M30 33 Q30 10 50 10 Q70 10 70 33 Z" fill="#C98F52"/><rect x="30" y="26" width="40" height="5" fill="#7A5228"/></g></svg>`;

/* ---------- motion helpers ---------- */
function fly(el, target) {
  const r1 = el.getBoundingClientRect(); target.appendChild(el); const r2 = el.getBoundingClientRect();
  if (!RM) el.animate([{ transform: `translate(${r1.left - r2.left}px,${r1.top - r2.top}px) scale(1.15)` }, { transform: 'none' }], { duration: 480, easing: 'cubic-bezier(.3,.7,.4,1)' });
}
function confetti(el, n) {
  if (RM || !el) return;
  const r = el.getBoundingClientRect(), cs = ['#FF8A3D', '#7C4DFF', '#22B566', '#F0466B', '#FFC83D', '#2E9BF0'];
  const x = r.left + r.width / 2, y = r.top + Math.min(r.height / 2, 160);
  for (let i = 0; i < (n || 28); i++) {
    const d = document.createElement('div'); d.className = 'burst'; d.style.background = cs[i % 6];
    d.style.left = x + 'px'; d.style.top = y + 'px'; if (i % 3 === 0) d.style.borderRadius = '50%';
    document.body.appendChild(d);
    const a = Math.random() * Math.PI * 2, v = 60 + Math.random() * (n && n < 14 ? 70 : 160);
    d.animate([{ transform: 'translate(0,0) rotate(0)', opacity: 1 }, { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v + 90}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }],
      { duration: 900 + Math.random() * 600, easing: 'cubic-bezier(.2,.7,.4,1)' }).onfinish = () => d.remove();
  }
}
const sparkle = el => confetti(el, 10);
function shake(el) { el.classList.remove('no'); void el.offsetWidth; el.classList.add('no'); }

/* phonics: which letters make the pattern in a word */
function patIdx(w, p) {
  w = w.toLowerCase();
  if (p === 'a_e') { const m = /a[^aeiou]e/.exec(w); return m ? [m.index, m.index + 2] : []; }
  const i = w.indexOf(p); return i < 0 ? [] : Array.from({ length: p.length }, (_, k) => i + k);
}
const letters = w => [...w].map((ch, j) => `<span class="lt" data-j="${j}">${esc(ch)}</span>`).join('');
function lightUp(box, w, p, color) {
  const idx = patIdx(w, p);
  $$('.lt', box).forEach((el, j) => {
    el.style.setProperty('--pc', color);
    if (idx.includes(j)) { el.classList.add('hl'); el.style.animationDelay = (idx.indexOf(j) * .15) + 's'; }
    else if (p === 'a_e' && j > idx[0] && j < idx[1]) el.classList.add('gap');
  });
}
const wordBox = (w, pic, tag) => `<button class="bigword" ${tag || ''}>${pic ? `<span class="pic">${pic}</span>` : ''}<span class="w">${letters(w)}</span><small>tap to hear</small></button>`;

/* ---------- shared bits ---------- */
function setColor(I) { const r = document.documentElement.style; r.setProperty('--c', I.color); r.setProperty('--cs', I.shade); }
function topBar(back) {
  return `<div class="top"><div class="l">${back ? `<a class="pill" href="#${back.to}">&#8592; ${esc(back.label)}</a>` : '<span class="brand">Adventure Island</span>'}</div>
  <div class="row"><button class="pill${S.read ? ' on' : ''}" id="rd" aria-pressed="${S.read}" aria-label="Read aloud">${SPK} ${S.read ? 'On' : 'Off'}</button><span class="pill" aria-label="Stars">${STAR} <span id="tot">${totalStars()}</span></span></div></div>`;
}
function wireTop() {
  const b = $('#rd'); if (!b) return;
  b.onclick = () => {
    S.read = !S.read; save(); b.classList.toggle('on', S.read); b.innerHTML = SPK + (S.read ? ' On' : ' Off'); b.setAttribute('aria-pressed', S.read);
    if (S.read) say('Read aloud is on!'); else try { speechSynthesis.cancel(); } catch (e) {}
  };
}
function paint(html) { app().innerHTML = html; wireTop(); window.scrollTo(0, 0); }

/* ---------- router ---------- */
function go(h) { if (location.hash === '#' + h) route(); else location.hash = h; }
function route() {
  TOK++; try { speechSynthesis.cancel(); } catch (e) {}
  const h = decodeURIComponent(location.hash.slice(1)); let m;
  if (!S.name) return nameScreen();
  if ((m = /^i-(.+)$/.exec(h))) return islandPage(m[1]);
  if ((m = /^l-(.+)$/.exec(h))) return lessonPage(m[1]);
  if ((m = /^learn-(.+)$/.exec(h))) return learnPage(m[1]);
  if ((m = /^a-(.+)-(\d+)$/.exec(h))) return actPage(m[1], +m[2]);
  home();
}
function boot() { window.addEventListener('hashchange', route); route(); }

/* ---------- screens ---------- */
function nameScreen() {
  setColor(ISLANDS[1]);
  paint(topBar() + `<div class="card stack"><div class="hero"><div class="pipw">${PIP}</div><div class="t"><h1>Welcome, explorer!</h1><p class="muted">I'm Pip. I will help you learn with games, pictures and sounds.</p></div></div>
    <label for="name"><b>What's your name?</b></label><input id="name" maxlength="20" placeholder="Type your name" autocomplete="off"><button class="big" id="go">Let's go!</button></div>`);
  const goOn = () => { setName(($('#name').value.trim() || 'Explorer')); route(); };
  $('#go').onclick = goOn; $('#name').onkeydown = e => { if (e.key === 'Enter') goOn(); };
}
let greeted = false;
function suggestion() {
  const started = LESSONS.find(l => S.prog[l.id] && stepsDone(l) < stepsOf(l));
  if (started) return { l: started, label: 'Keep going: ' + started.title + ' ▶' };
  const fresh = LESSONS.find(isNew);
  if (fresh) return { l: fresh, label: 'New: ' + fresh.title + ' ▶' };
  return null;
}
function home() {
  setColor(ISLANDS[0]);
  const sug = suggestion();
  const tiles = ISLANDS.map((I, k) => {
    const ls = LESSONS.filter(l => l.island === I.id);
    if (!I.href && !ls.length) return '';
    const frac = I.href ? mathFrac() : ls.reduce((a, l) => a + stepsDone(l), 0) / ls.reduce((a, l) => a + stepsOf(l), 0);
    const fresh = ls.some(isNew);
    return `<button class="isl" data-i="${I.id}" style="--c:${I.color};--cs:${I.shade};animation-delay:${k * .07}s">${fresh ? '<span class="new">New!</span>' : ''}
      <span class="blob">${I.pic}</span><span class="m"><b>${I.name}</b><span>${I.sub}</span><span class="meter"><i style="width:${Math.round(frac * 100)}%"></i></span></span></button>`;
  });
  const tileOf = id => tiles[ISLANDS.findIndex(I => I.id === id)];
  const sections = SUBJECTS.map(sj => {
    const its = ISLANDS.filter(I => I.subject === sj.id).map(I => tileOf(I.id)).filter(Boolean).join('');
    return `<section class="subj" style="--sc:${sj.color}"><h2 class="sh"><span class="si">${sj.pic}</span>${sj.name}</h2>
      ${its ? `<div class="islands">${its}</div>` : '<div class="soon">Coming soon! New adventures are on the way.</div>'}</section>`;
  }).join('');
  paint(topBar() + `<div class="card hero"><div class="pipw">${PIP}</div><div class="t"><h1>Hi ${esc(S.name)}!</h1><p class="muted">What shall we learn today? Pick a subject, then tap an island.</p>
    ${sug ? `<button class="big" id="sug" style="--c:${ISL(sug.l.island).color};--cs:${ISL(sug.l.island).shade}">${esc(sug.label)}</button>` : ''}</div></div>${sections}`);
  $$('.isl').forEach(b => b.onclick = () => { const I = ISL(b.dataset.i); if (I.href) location.href = I.href; else go('i-' + I.id); });
  if (sug) $('#sug').onclick = () => go('l-' + sug.l.id);
  if (!greeted) { greeted = true; say(`Hi ${S.name}! What shall we learn today? Math, English, or Science?`); }
}
function islandPage(id) {
  const I = ISL(id); if (!I) return home(); if (I.href) { location.href = I.href; return; }
  setColor(I);
  const ls = LESSONS.filter(l => l.island === id);
  paint(topBar({ to: 'home', label: 'Islands' }) + `<div class="banner"><span class="blob">${I.pic}</span><div><h1>${I.name}</h1><p>${I.sub}</p></div></div>
    <div class="lessons">${ls.map((l, k) => `<button class="lcard" data-l="${l.id}" style="animation-delay:${k * .07}s">${isNew(l) ? '<span class="new">New!</span>' : ''}<span class="ic">${l.pic}</span>
      <span class="m"><b>${esc(l.title)}</b><span>${esc(l.sub)}</span><span class="stars">${lessonStars(l)} / ${l.acts.length * 3} ★</span></span></button>`).join('')}</div>`);
  $$('.lcard').forEach(b => b.onclick = () => go('l-' + b.dataset.l));
  say(I.name + '. Pick a lesson.');
}
function lessonPage(id) {
  const l = LES(id); if (!l) return home(); const I = ISL(l.island); setColor(I);
  const p = S.prog[l.id] || { learn: false, stars: {} };
  const steps = [{ name: 'Learn it', sub: 'Watch, listen and tap', pic: '📖', to: 'learn-' + id, done: p.learn, stars: -1 }]
    .concat(l.acts.map((a, i) => ({ name: a.title, sub: a.sub || TYPE_SUB[a.type], pic: a.pic || TYPE_PIC[a.type], to: `a-${id}-${i}`, done: p.stars[i] > 0, stars: p.stars[i] | 0 })));
  const ni = steps.findIndex(s => !s.done);
  const st = n => `<span class="stars">${[1, 2, 3].map(k => `<span class="${k <= n ? '' : 'off'}">★</span>`).join('')}</span>`;
  paint(topBar({ to: 'i-' + I.id, label: I.name }) + `<div class="card stack"><span class="tag">${I.name}</span><h1>${esc(l.title)}</h1><p class="muted">${esc(l.sub)}</p>
    <button class="big wide" id="go">${ni < 0 ? 'Play it all again ▶' : ni === 0 ? 'Start: Learn it ▶' : 'Next: ' + esc(steps[ni].name) + ' ▶'}</button></div>
    <div class="card"><div class="path">${steps.map((s, k) => `${k ? '<div class="link"></div>' : ''}<button class="stop${s.done ? ' done' : ''}${k === ni ? ' next' : ''}" data-to="${s.to}"><span class="dot">${s.done ? '✓' : s.pic}</span><span class="m"><b>${esc(s.name)}</b><span>${esc(s.sub)}</span>${s.stars >= 0 ? st(s.stars) : ''}</span></button>`).join('')}</div></div>`);
  $$('.stop').forEach(b => b.onclick = () => go(b.dataset.to));
  $('#go').onclick = () => go(steps[ni < 0 ? 0 : ni].to);
  say(l.title);
}

/* ---------- learn slides ---------- */
function learnPage(id) {
  const l = LES(id); if (!l) return home(); const I = ISL(l.island); setColor(I);
  const n = l.learn.length; let k = 0; const my = TOK;
  const show = () => {
    if (my !== TOK) return;
    const sl = l.learn[k];
    paint(topBar({ to: 'l-' + id, label: l.title }) + `<div class="card slide"><span class="tag">Learn it · ${k + 1} of ${n}</span><h2>${sl.title}</h2>${sl.text ? `<p>${sl.text}</p>` : ''}
      <div class="stage" id="stg"></div><div class="row"><button class="hear" id="hr">${SPK} Hear it again</button><button class="hear" id="rp">↻ Play again</button></div>
      <div class="dots">${l.learn.map((_, j) => `<i class="${j === k ? 'on' : ''}"></i>`).join('')}</div>
      <div class="nav"><button class="big alt" id="pv"${k ? '' : ' hidden'}>◀ Back</button><button class="big" id="nx">${k < n - 1 ? 'Next ▶' : "Let's practice! ▶"}</button></div></div>`);
    const stg = $('#stg'), run = () => { stg.innerHTML = ''; (SHOW[sl.show.kind] || SHOW.scene)(stg, sl.show, l, my); };
    run(); $('#rp').onclick = run;
    const txt = sl.say || (sl.title + '. ' + (sl.text || ''));
    say(txt); $('#hr').onclick = () => say(txt, true);
    $('#nx').onclick = () => { if (k < n - 1) { k++; show(); } else { lp(id).learn = true; save(); go(`a-${id}-0`); } };
    $('#pv').onclick = () => { k--; show(); };
  };
  show();
}
const later = (my, ms, fn) => setTimeout(() => { if (my === TOK) fn(); }, RM ? 0 : ms);
const capHL = s => s.split(' ').map(w => `<b class="cap1">${esc(w[0])}</b>${esc(w.slice(1))}`).join(' ');
const SHOW = {
  scene(st, d) { st.innerHTML = `<div class="scene">${d.pic || ''}</div>${d.items ? `<div class="chipsrow">${d.items.map((x, j) => `<span class="ochip pop" style="animation-delay:${.4 + j * .3}s"><i>${x[0]}</i>${esc(x[1])}</span>`).join('')}</div>` : ''}`; },
  chips(st, d) {
    st.innerHTML = `<div class="chipsrow">${d.items.map((x, j) => `<button class="ochip pop" style="animation-delay:${j * .3}s" data-w="${esc(x[1])}"><i>${x[0]}</i>${esc(x[1])}</button>`).join('')}</div>`;
    $$('.ochip', st).forEach(b => b.onclick = () => { SFX.pop(); say(b.dataset.w, true); });
  },
  morph(st, d, l, my) {
    st.innerHTML = `<div class="morph"><div class="pic pop">${d.pic}</div><button class="flipc" id="fc" aria-label="Flip"><div class="fr">${esc(d.from)}</div><div class="bk"><span>${capHL(d.to)}</span></div></button><div class="mlabel" id="ml">${esc(d.fromLabel)}</div></div>`;
    const fc = $('#fc', st), ml = $('#ml', st);
    const flip = on => { fc.classList.toggle('go', on); ml.textContent = on ? d.toLabel : d.fromLabel; ml.style.color = on ? 'var(--c)' : ''; SFX.pop(); };
    later(my, 1800, () => flip(true));
    fc.onclick = () => { const on = !fc.classList.contains('go'); flip(on); say(on ? d.to : d.from, true); };
  },
  pairs(st, d) {
    st.innerHTML = d.items.map((x, j) => `<div class="prow" style="animation-delay:${j * .45}s"><span>${x[2] || ''} ${esc(x[0])}</span><em>➜</em><span class="pn">${capHL(x[1])}</span></div>`).join('');
  },
  capfix(st, d, l, my) {
    const ws = d.sentence.split(' ');
    st.innerHTML = `<div class="words">${ws.map((w, k) => `<span class="wd" data-k="${k}"><span class="f">${esc(w[0].toLowerCase())}</span>${esc(w.slice(1))}</span>`).join('')}</div>`;
    let t = 900;
    ws.forEach((w, k) => {
      if (!/^[A-Z]/.test(w)) return;
      later(my, t, () => { const el = $(`[data-k="${k}"]`, st); el.classList.add('fixed'); $('.f', el).textContent = w[0]; el.insertAdjacentHTML('beforeend', `<span class="why">${k ? 'name' : 'start'}</span>`); SFX.pop(); });
      t += 1100;
    });
  },
  patterns(st, d, l) {
    const P = l.patterns;
    st.innerHTML = `<div class="patgrid">${Object.keys(P).map((k, j) => `<button class="pcard" style="--pc:${P[k].color};animation-delay:${j * .3}s" data-w="${P[k].words[0][0]}"><b>${P[k].label}</b><span>${P[k].words[0][1]} ${P[k].words[0][0]}</span></button>`).join('')}</div>`;
    $$('.pcard', st).forEach(b => b.onclick = () => say(b.dataset.w, true));
  },
  magic(st, d, l, my) {
    const pairs = d.pairs; SHOW._m = ((SHOW._m | 0) + 1) % pairs.length; const [from, to] = pairs[SHOW._m];
    const ai = from.indexOf('a');
    st.innerHTML = `<div class="magic" id="mg">${[...from].map((c, j) => `<span class="${j === ai ? 'a' : ''}">${c}</span>`).join('')}<span class="e">e</span><span class="spark" style="left:${ai * 0.55}em">✨</span></div><p class="muted"><b>${from}</b> ➜ <b>${to}</b></p>`;
    later(my, 2100, () => { $('#mg', st).classList.add('done'); say(to, true); });
  },
  samesound(st, d, l) {
    const P = l.patterns;
    st.innerHTML = `<div class="pair2" style="width:100%;max-width:440px">${d.words.map(([w, p]) => `<div class="stack" style="align-items:center;gap:8px">${wordBox(w, '', `data-w="${w}" style="min-width:0;width:100%"`)}<span class="plabel" style="--pc:${P[p].color}">${P[p].label}</span></div>`).join('')}</div>`;
    d.words.forEach(([w, p], j) => setTimeout(() => lightUp($$('.bigword', st)[j], w, p, P[p].color), 500 + j * 700));
    $$('.bigword', st).forEach(b => b.onclick = () => say(b.dataset.w, true));
  },
  flashgrid(st, d, l) {
    st.innerHTML = `<p class="count">Tap each card to flip it!</p><div class="fgrid">${l.words.map((x, j) => `<button class="fcard" style="animation-delay:${j * .08}s" data-j="${j}"><div class="fr"><i>${x[1]}</i><b>${esc(x[0])}</b></div><div class="bk">${esc(x[2])}</div></button>`).join('')}</div>`;
    $$('.fcard', st).forEach(b => b.onclick = () => { const x = l.words[b.dataset.j]; b.classList.toggle('on'); SFX.pop(); say(b.classList.contains('on') ? `${x[0]} means ${x[2]}` : x[0], true); });
  },
  book(st, d) {
    st.innerHTML = `<div class="book"><div class="pg"><i>${d.left[0]}</i>${esc(d.left[1])}</div><div class="pg"><i>${d.right[0]}</i>${esc(d.right[1])}</div></div>
      <div class="chipsrow">${d.chips.map((c, j) => `<span class="ochip pop" style="animation-delay:${1.3 + j * .5}s">${c}</span>`).join('')}</div>`;
  },
  tent(st, d) {
    const xs = [70, 140, 210];
    st.innerHTML = `<svg class="tent" viewBox="0 0 280 230" role="img" aria-label="Main idea tent">
      <path class="rf" d="M20 110 L140 20 L260 110 Z" fill="#F0466B" stroke="#B82C4C" stroke-width="4" stroke-linejoin="round"/>
      <text x="140" y="86" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="20" fill="#fff" class="rf">MAIN IDEA</text>
      ${xs.map((x, j) => `<g class="pole" style="animation-delay:${.9 + j * .45}s"><rect x="${x - 4}" y="110" width="8" height="70" rx="3" fill="#A0703C"/><rect x="${x - 34}" y="184" width="68" height="34" rx="8" fill="#fff" stroke="#D6E4F5" stroke-width="2"/><text x="${x}" y="206" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="12" fill="#1E2A44">${esc(d.details[j])}</text></g>`).join('')}
    </svg><p class="muted" style="text-align:center">${esc(d.caption)}</p>`;
  },
  split(st, d, l, my) {
    st.innerHTML = `<div class="wsplit"><span class="r">${esc(d.root)}</span><span class="x">${esc(d.end)}</span></div><p class="muted">Root word: <b>${esc(d.root)}</b> + ending <b>${esc(d.end)}</b></p>`;
    later(my, 1200, () => say(`${d.word}. The root word is ${d.root}.`, true));
  },
};

/* ---------- activities ---------- */
const PRAISE = { 3: 'Superstar!', 2: 'Great job!', 1: 'You did it!' };
function prep(a, l) {
  if (a.type === 'sort' && a.fromPatterns) {
    const P = l.patterns, keys = Object.keys(P);
    const pool = keys.flatMap((k, b) => P[k].words.map(x => [x[0], b]));
    return Object.assign({}, a, { buckets: keys.map(k => ({ label: P[k].label, color: P[k].color, why: `<b>{w}</b> uses <b>${P[k].label}</b> to say /ā/.` })), items: pool });
  }
  return a;
}
function actPage(id, i) {
  const l = LES(id); if (!l) return home(); const a0 = l.acts[i]; if (!a0) return lessonPage(id);
  const a = prep(a0, l), I = ISL(l.island); setColor(I);
  const my = TOK; let miss = 0;
  paint(topBar({ to: 'l-' + id, label: l.title }) + `<div class="qhead"><span class="tag">${esc(a.title)}</span><div class="bar"><i id="pb" style="width:0%"></i></div></div>
    <div class="coach" id="coach"><div class="pipw">${PIP}</div><div class="bubble" id="bub"></div></div><div class="card play" id="area"></div>`);
  const area = $('#area'), coachEl = $('#coach'), bub = $('#bub');
  const c = {
    lesson: l, area, alive: () => my === TOK,
    progress: f => { $('#pb').style.width = Math.round(f * 100) + '%'; },
    coach(html, mood, quiet) {
      if (my !== TOK) return;
      bub.innerHTML = html; bub.classList.remove('pop'); void bub.offsetWidth; bub.classList.add('pop');
      coachEl.classList.remove('happy', 'think'); if (mood) { void coachEl.offsetWidth; coachEl.classList.add(mood); }
      if (!quiet) say(html);
    },
    miss: () => { miss++; },
    next(btn, fn) { btn.hidden = false; btn.onclick = fn; setTimeout(() => { try { btn.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); } catch (e) {} }, 80); },
    finish() {
      if (my !== TOK) return;
      const stars = miss === 0 ? 3 : miss <= 2 ? 2 : 1, p = lp(id); p.stars[i] = Math.max(p.stars[i] | 0, stars); save();
      $('#tot').textContent = totalStars(); c.progress(1); SFX.win();
      const ni = i + 1 < l.acts.length ? i + 1 : null;
      area.innerHTML = `<div class="stack win"><div class="bigstars">${[1, 2, 3].map(k => STARBIG(k <= stars)).join('')}</div><h1>${PRAISE[stars]}</h1>
        <p class="muted">${miss === 0 ? 'No mistakes at all!' : `You fixed ${miss} mistake${miss > 1 ? 's' : ''} and kept going. That is how we learn!`}</p>
        <button class="big wide" id="nx">${ni != null ? 'Next: ' + esc(l.acts[ni].title) + ' ▶' : 'Lesson finished! Back to the island ▶'}</button>
        <button class="big alt wide" id="ag">Play again with new questions</button></div>`;
      c.coach(ni != null ? `Amazing, ${esc(S.name)}! Ready for the next one?` : `You finished the whole lesson, ${esc(S.name)}! I'm so proud of you!`, 'happy');
      confetti($('.bigstars', area));
      $('#nx', area).onclick = () => go(ni != null ? `a-${id}-${ni}` : 'i-' + l.island);
      $('#ag', area).onclick = () => route();
    },
  };
  ENG[a.type](a, c);
}

const ENG = {
  /* multiple choice with a "why" after the right answer */
  mc(a, c) {
    const items = pick(a.items, a.pick); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const it = items[i], opts = (it.keep || a.keep) ? it.opts : shuffle(it.opts), long = opts.some(o => String(o).length > 16);
      c.area.innerHTML = `${it.pic ? `<div class="scene">${it.pic}</div>` : ''}<div class="q">${it.q}</div><div class="row"><button class="hear" id="hr">${SPK} Read to me</button></div>
        <div class="opts${long ? ' long' : ''}">${opts.map(o => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      const read = (it.read || it.q) + '. ' + opts.join('. Or, ') + '?';
      say(read); $('#hr', c.area).onclick = () => say(read, true);
      c.coach(i === 0 ? (a.start || 'Read the question, then tap the best answer.') : 'Here comes the next one!', null, true);
      $$('.opt', c.area).forEach(b => b.onclick = () => {
        if (b.disabled) return;
        if (b.dataset.v === String(it.ans)) {
          b.classList.add('ok'); $$('.opt', c.area).forEach(x => { x.disabled = true; }); SFX.ok(); sparkle(b);
          c.coach(it.why || 'Yes! Well done!', 'happy');
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          b.classList.add('no'); b.disabled = true; SFX.no(); c.miss();
          c.coach(tpl(it.hint || a.hint || 'Not quite. Read it again and try another answer!', b.dataset.v, it), 'think');
        }
      });
    };
    show();
  },

  /* drag (or tap) words into boxes */
  sort(a, c) {
    const items = pick(a.items, a.pick).map(x => ({ w: x[0], b: x[1], why: x[2] }));
    let placed = 0, sel = null;
    c.area.innerHTML = `<p class="count">${a.ask || 'Drag each word into the right box. Or tap a word, then tap a box.'}</p>
      <div class="tray" id="tray">${items.map((it, k) => `<button class="chip" data-k="${k}">${esc(it.w)}</button>`).join('')}</div>
      <div class="bins${a.buckets.length > 4 ? ' six' : ''}">${a.buckets.map((b, k) => `<div class="bin" data-b="${k}"${b.color ? ` style="border-color:${b.color}"` : ''}><div class="lb"${b.color ? ` style="color:${b.color}"` : ''}>${b.pic ? `<i>${b.pic}</i>` : ''}${esc(b.label)}</div><div class="in"></div></div>`).join('')}</div>`;
    c.coach(a.start || 'Pick up a word and drop it in the right box!');
    const tray = $('#tray', c.area), bins = $$('.bin', c.area);
    const select = ch => {
      $$('.chip.sel', tray).forEach(x => x.classList.remove('sel')); sel = ch;
      bins.forEach(b => b.classList.toggle('pick', !!ch));
      if (ch) { ch.classList.add('sel'); SFX.pop(); say(items[ch.dataset.k].w); }
    };
    const drop = (ch, bin) => {
      const it = items[ch.dataset.k], b = +bin.dataset.b;
      ch.classList.remove('ghost');
      if (b === it.b) {
        ch.classList.remove('sel'); ch.disabled = true; fly(ch, $('.in', bin)); SFX.ok(); sparkle(bin);
        placed++; c.progress(placed / items.length); select(null);
        c.coach(tpl(it.why || a.buckets[b].why || 'Yes!', it.w, it), 'happy');
        if (placed === items.length) setTimeout(() => c.finish(), 1700);
      } else {
        shake(bin); shake(ch); SFX.no(); c.miss();
        c.coach(tpl(a.hint || 'Hmm, not that box. Try another one!', it.w, it), 'think');
      }
    };
    bins.forEach(bin => bin.onclick = () => { if (sel) drop(sel, bin); else c.coach('First pick up a word from the top!', 'think'); });
    $$('.chip', tray).forEach(ch => {
      ch.addEventListener('click', e => { if (e.detail === 0 && !ch.disabled) select(sel === ch ? null : ch); });
      ch.addEventListener('pointerdown', e => {
        if (ch.disabled) return;
        const sx = e.clientX, sy = e.clientY; let ghost = null;
        const mv = ev => {
          if (!ghost && Math.hypot(ev.clientX - sx, ev.clientY - sy) > 8) {
            ghost = ch.cloneNode(true); ghost.classList.remove('sel'); ghost.classList.add('drag'); document.body.appendChild(ghost); ch.classList.add('ghost'); select(ch);
          }
          if (ghost) {
            ghost.style.left = ev.clientX + 'px'; ghost.style.top = ev.clientY + 'px';
            const t = document.elementFromPoint(ev.clientX, ev.clientY); bins.forEach(b => b.classList.toggle('hot', !!t && b.contains(t)));
          }
        };
        const up = ev => {
          window.removeEventListener('pointermove', mv); window.removeEventListener('pointerup', up); window.removeEventListener('pointercancel', up);
          if (ghost) {
            ghost.remove(); bins.forEach(b => b.classList.remove('hot'));
            const t = document.elementFromPoint(ev.clientX, ev.clientY), bin = t && t.closest('.bin');
            if (bin && c.area.contains(bin)) drop(ch, bin); else ch.classList.remove('ghost');
          } else select(sel === ch ? null : ch);
        };
        window.addEventListener('pointermove', mv); window.addEventListener('pointerup', up); window.addEventListener('pointercancel', up);
      });
    });
  },

  /* tap the words that need a capital letter */
  caps(a, c) {
    const items = pick(a.items, a.pick); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const s = items[i], ws = s.split(' '), need = ws.map(w => /^[A-Z]/.test(w)); let left = need.filter(Boolean).length;
      const cnt = () => `Find <b>${left}</b> more word${left === 1 ? '' : 's'} that need${left === 1 ? 's' : ''} a capital letter.`;
      c.area.innerHTML = `<p class="count" id="cnt">${cnt()}</p><div class="words">${ws.map((w, k) => `<button class="wd" data-k="${k}"><span class="f">${esc(w[0].toLowerCase())}</span>${esc(w.slice(1))}</button>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="hear" id="hr">${SPK} Read the sentence</button></div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(s); $('#hr', c.area).onclick = () => say(s, true);
      c.coach(i === 0 ? (a.start || 'Some words lost their capital letters! Tap each word that needs one.') : 'Here is the next sentence. Which words need a capital?', null, true);
      $$('.wd', c.area).forEach(el => el.onclick = () => {
        const k = +el.dataset.k, w = ws[k], clean = w.replace(/[^A-Za-z']/g, '');
        if (el.classList.contains('fixed')) return;
        if (need[k]) {
          el.classList.add('fixed'); $('.f', el).textContent = w[0]; el.insertAdjacentHTML('beforeend', `<span class="why">${k ? 'special name' : 'start'}</span>`);
          SFX.ok(); left--;
          let msg = k === 0 ? `<b>${clean}</b> is the first word. Every sentence starts with a capital letter!` : `<b>${clean}</b> is a special name, so it starts with a capital letter!`;
          if (left === 0) { $('#cnt', c.area).innerHTML = 'All fixed! ✓'; sparkle($('.words', c.area)); msg += '<br>All fixed! Tap Next.'; c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); }); }
          else $('#cnt', c.area).innerHTML = cnt();
          c.coach(msg, 'happy');
        } else {
          shake(el); SFX.no(); c.miss();
          c.coach(`<b>${clean.toLowerCase()}</b> is not a special name, and it is not the first word. So it stays small.`, 'think');
        }
      });
    };
    show();
  },

  /* pick a word from the bank; it flies into the gap */
  fill(a, c) {
    const items = pick(a.items, a.pick); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const it = items[i], bank = it.bank ? shuffle(it.bank) : shuffle([it.ans, ...pick(a.bank.filter(w => w !== it.ans), (a.choices || 4) - 1)]);
      const [p0, p1] = it.s.split('___');
      c.area.innerHTML = `${it.pic ? `<div class="scene">${it.pic}</div>` : ''}<div class="sent">${esc(p0)}<span class="slot" id="slot">?</span>${esc(p1 || '')}</div>
        <div class="row" style="justify-content:center"><button class="hear" id="hr">${SPK} Read to me</button></div>
        <div class="tray" id="tray">${bank.map(w => `<button class="chip" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(it.s); $('#hr', c.area).onclick = () => say(it.s, true);
      c.coach(i === 0 ? (a.start || 'Which word fits the gap? Tap it and watch it fly in!') : 'Next sentence! Which word fits?', null, true);
      $$('.chip', c.area).forEach(ch => ch.onclick = () => {
        const w = ch.dataset.w;
        if (w === it.ans) {
          const slot = $('#slot', c.area); slot.textContent = ''; $$('.chip', c.area).forEach(x => { x.disabled = true; });
          fly(ch, slot); SFX.ok();
          setTimeout(() => { if (!c.alive()) return; slot.textContent = w; slot.classList.add('ok'); sparkle(slot); }, 480);
          const why = it.why || tpl(a.why || '{w} fits the sentence!', w, it);
          c.coach(why, 'happy', true); say(why + '. ' + it.s.replace('___', w));
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          shake(ch); setTimeout(() => ch.classList.add('used'), 380); SFX.no(); c.miss();
          c.coach(tpl(it.hint || a.hint || 'Read the sentence with {w} in the gap. Does it make sense?', w, it), 'think');
        }
      });
    };
    show();
  },

  /* match words to meanings */
  match(a, c) {
    const pairs = pick(a.pairs, a.pick || 4), cols = ['#FF8A3D', '#7C4DFF', '#22B566', '#F0466B', '#2E9BF0', '#E0A21A'];
    let done = 0, L = null, R = null;
    c.area.innerHTML = `<p class="count">${a.ask || 'Tap a word, then tap what it means.'}</p><div class="match"><div class="mcol">${shuffle(pairs.map((_, k) => k)).map(k => `<button class="mc w" data-k="${k}">${pairs[k][2] ? `<span class="e">${pairs[k][2]}</span>` : ''}${esc(pairs[k][0])}</button>`).join('')}</div>
      <div class="mcol">${shuffle(pairs.map((_, k) => k)).map(k => `<button class="mc m" data-k="${k}">${esc(pairs[k][1])}</button>`).join('')}</div></div>`;
    c.coach(a.start || 'Find the meaning for each word!');
    const check = () => {
      if (!L || !R) return;
      const k = +L.dataset.k, pr = pairs[k];
      if (L.dataset.k === R.dataset.k) {
        const col = cols[done % cols.length];
        [L, R].forEach(el => { el.classList.remove('sel'); el.style.setProperty('--pc', col); el.classList.add('done'); });
        if (!RM) R.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-14px)' }, { transform: 'none' }], { duration: 400 });
        SFX.ok(); sparkle(R); done++; c.progress(done / pairs.length);
        c.coach(`<b>${esc(pr[0])}</b> means ${esc(pr[1])}.${pr[3] ? `<br>“${esc(pr[3])}”` : ''}`, 'happy');
        if (done === pairs.length) setTimeout(() => c.finish(), 2200);
      } else {
        shake(L); shake(R); SFX.no(); c.miss();
        c.coach(`Not that one. Read the meanings again. Which one tells us what <b>${esc(pr[0])}</b> means?`, 'think');
        [L, R].forEach(el => el.classList.remove('sel'));
      }
      L = R = null;
    };
    $$('.mc', c.area).forEach(el => el.onclick = () => {
      const isW = el.classList.contains('w'), k = +el.dataset.k;
      if (isW) { if (L) L.classList.remove('sel'); L = el; say(pairs[k][0]); } else { if (R) R.classList.remove('sel'); R = el; say(pairs[k][1]); }
      el.classList.add('sel'); SFX.pop(); check();
    });
  },

  /* phonics: which letters make the sound? */
  pattern(a, c) {
    const P = c.lesson.patterns, keys = Object.keys(P);
    const items = pick(keys.flatMap(k => P[k].words.map(x => ({ w: x[0], pic: x[1], p: k }))), a.pick || 6); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const it = items[i], opts = shuffle([it.p, ...pick(keys.filter(k => k !== it.p), 2)]);
      c.area.innerHTML = `<p class="count">Which letters make the long-a sound <b>/ā/</b>?</p>${wordBox(it.w, it.pic, 'id="bw"')}
        <div class="opts">${opts.map(k => `<button class="pchip" data-p="${k}" style="--pc:${P[k].color}">${P[k].label}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(it.w); $('#bw', c.area).onclick = () => say(it.w, true);
      c.coach(i === 0 ? 'Tap the word to hear it. Then tap the letters that say /ā/.' : 'Listen to the next word!', null, true);
      $$('.pchip', c.area).forEach(b => b.onclick = () => {
        if (b.disabled) return;
        if (b.dataset.p === it.p) {
          b.classList.add('ok'); $$('.pchip', c.area).forEach(x => { x.disabled = true; }); lightUp($('#bw', c.area), it.w, it.p, P[it.p].color); SFX.ok();
          c.coach(it.p === 'a_e' ? `In <b>${it.w}</b>, the <b>a</b> and the magic <b>e</b> work together. The e is quiet, and it makes the a say its name: /ā/!`
            : `In <b>${it.w}</b>, the letters <b>${P[it.p].label}</b> team up to say /ā/.`, 'happy');
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          b.classList.add('no'); b.disabled = true; SFX.no(); c.miss();
          c.coach(`Look again! Can you find the letters <b>${P[b.dataset.p].label}</b> in <b>${it.w}</b>? Tap the word to hear it.`, 'think');
        }
      });
    };
    show();
  },

  /* phonics: same letters or different letters? */
  samediff(a, c) {
    const P = c.lesson.patterns, keys = Object.keys(P), n = a.pick || 4, rounds = [];
    for (let r = 0; r < n; r++) {
      if (r % 2 === 0) { const k = pick(keys.filter(x => P[x].words.length > 1), 1)[0], ws = pick(P[k].words, 2); rounds.push([[ws[0], k], [ws[1], k]]); }
      else { const [k1, k2] = pick(keys, 2); rounds.push([[pick(P[k1].words, 1)[0], k1], [pick(P[k2].words, 1)[0], k2]]); }
    }
    const items = shuffle(rounds); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const [[x1, p1], [x2, p2]] = items[i], same = p1 === p2;
      c.area.innerHTML = `<div class="q">${a.q || 'Both words say /ā/. Do they use the same letters to make it?'}</div>
        <div class="pair2">${[[x1, p1], [x2, p2]].map(([x], j) => `<div class="stack" style="align-items:center;gap:8px" id="w${j}">${wordBox(x[0], x[1], `data-w="${x[0]}" style="min-width:0;width:100%"`)}</div>`).join('')}</div>
        <div class="opts"><button class="opt" data-v="same">Same letters</button><button class="opt" data-v="diff">Different letters</button></div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      const read = `${x1[0]}, and ${x2[0]}. Same letters, or different letters?`;
      say(read); $$('.bigword', c.area).forEach(b => b.onclick = () => say(b.dataset.w, true));
      c.coach(i === 0 ? 'Tap each word to hear it. Then look closely at the letters!' : 'Here are two more words!', null, true);
      $$('.opt', c.area).forEach(b => b.onclick = () => {
        if (b.disabled) return;
        if ((b.dataset.v === 'same') === same) {
          b.classList.add('ok'); $$('.opt', c.area).forEach(x => { x.disabled = true; }); SFX.ok();
          [[x1, p1], [x2, p2]].forEach(([x, p], j) => { const box = $('#w' + j, c.area); lightUp($('.bigword', box), x[0], p, P[p].color); box.insertAdjacentHTML('beforeend', `<span class="plabel" style="--pc:${P[p].color}">${P[p].label}</span>`); });
          c.coach(same ? `Both use <b>${P[p1].label}</b>. Same sound, same letters!` : `Both say /ā/, but <b>${x1[0]}</b> uses <b>${P[p1].label}</b> and <b>${x2[0]}</b> uses <b>${P[p2].label}</b>. Same sound, different letters!`, 'happy');
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          b.classList.add('no'); b.disabled = true; SFX.no(); c.miss();
          c.coach('Both words say /ā/. Now look closely at the letters. Do they match?', 'think');
        }
      });
    };
    show();
  },
};
