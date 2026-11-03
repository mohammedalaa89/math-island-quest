'use strict';
/* Adventure Island engine. Lessons live in lessons/*.js (addLesson), uploaded school tests in tests.js (addTest).
   See CLAUDE.md for the formats. */

/* ---------- registry ---------- */
const LESSONS = [], TESTS = [];
function addLesson(l) { LESSONS.push(l); }
function addTest(t) { TESTS.push(t); }

/* Subjects on the home page. `units` is the grade 3 plan (American curriculum: Common Core, NGSS);
   a unit with an island id is playable, the rest show as "coming next". */
const SUBJECTS = [
  { id: 'math', name: 'Math', ar: 'الرياضيات', pic: '🔢', color: '#FF8A3D', shade: '#C9601F', units: [
    /* follows her book: enVision Mathematics Common Core, Grade 3 (Savvas), topics in book order */
    { sec: 'enVision Mathematics · Grade 3', secAr: 'كتاب الرياضيات · الصف الثالث', note: 'Topics in the same order as her book', noteAr: 'المواضيع بنفس ترتيب كتابها' },
    ['Topic 1: Understand multiplication and division', 'times'], ['Topic 1 game: Math Island quiz', 'mathgame'],
    ['Topic 2: Multiplication facts: use patterns'], ['Topic 3: Multiplication facts for 3, 4, 6, 7, 8'], ['Topic 4: Use multiplication to divide'],
    ['Topic 5: Multiply and divide within 100'], ['Topic 6: Area, multiplication and addition'], ['Topic 7: Represent and interpret data'],
    ['Topic 8: Strategies to add and subtract'], ['Topic 9: Add and subtract within 1,000'], ['Topic 10: Multiply by multiples of 10'],
    ['Topic 11: Solve problems with whole numbers'], ['Topic 12: Understand fractions as numbers'], ['Topic 13: Fraction equivalence and comparison'],
    ['Topic 14: Time, capacity and mass'], ['Topic 15: Two-dimensional shapes'], ['Topic 16: Perimeter'] ] },
  { id: 'english', name: 'English', ar: 'اللغة الإنجليزية', pic: '📖', color: '#7C4DFF', shade: '#5631C9', units: [
    /* follows her book: Our Literacy World G3 (Obelas, KSA edition) */
    { sec: 'Unit 3: Staying Healthy', secAr: 'الوحدة ٣: الحفاظ على الصحة', note: 'In class now · How do our bodies work?', noteAr: 'ندرسها الآن في الصف · كيف تعمل أجسامنا؟' },
    ['Kickoff: bodies, health and story types', 'healthy'], ['Anchor text: Training Days'], ['Lesson 1: Happy and Healthy'], ['Lesson 2: You and Your Brain'], ['Lesson 3: Amara’s Bicycle'],
    ['Lesson 4: Micro-Ray'], ['Lesson 5: Meet the Nanobots'], ['Lesson 6: The Race'], ['Finish Line: unit review'],
    { sec: 'Foundations and revision', secAr: 'الأساسيات والمراجعة', note: 'Letters, grammar, phonics and the Young Adventurers papers', noteAr: 'الحروف والقواعد والصوتيات وأوراق المغامرين الصغار' },
    ['Big and small letters', 'letters'], ['Nouns and capital letters', 'grammar'], ['Phonics: the long-a sound', 'phonics'], ['Vocabulary: adventure words', 'vocab'], ['Reading: Young Adventurers', 'story'] ] },
  { id: 'science', name: 'Science', ar: 'العلوم', pic: '🔬', color: '#22B566', shade: '#168048', units: [
    ['Living things and their needs', 'lifelab'], ['Life cycles'], ['Plants'], ['Animals and their habitats'], ['Forces and magnets'], ['Weather and climate'], ['Matter: solid, liquid, gas'], ['Fossils'] ] },
  { id: 'social', name: 'Social Studies', ar: 'الدراسات الاجتماعية', pic: '🗺️', color: '#2E9BF0', shade: '#1C6FB0', units: [['Maps and directions'], ['My community'], ['Saudi Arabia'], ['Jobs and money']] },
  { id: 'arabic', name: 'Arabic', ar: 'اللغة العربية', pic: '✍️', color: '#F0466B', shade: '#B82C4C', units: [
    /* follows her book: لغتي، الصف الثالث، الجزء الأول */
    { sec: 'مراجعة المكتسبات السابقة', secAr: 'مراجعة المكتسبات السابقة', note: 'Review', noteAr: 'مراجعة ما تعلّمناه' },
    ['اللام الشمسية واللام القمرية', 'shamsiya'], ['التنوين', 'tanween'], ['أتعلّم فنّ الخط'],
    { sec: 'الوحدة ١: التعامل مع الآخرين', secAr: 'الوحدة ١: التعامل مع الآخرين' }, ['الدرس ١: عادل في الطائرة'], ['الدرس ٢: عام دراسي جديد'], ['نموذج اختبار (١)'],
    { sec: 'الوحدة ٢: ربوع من بلادي', secAr: 'الوحدة ٢: ربوع من بلادي' }, ['الدرس ١: الرياض والملك الشجاع'], ['الدرس ٢: مصايفنا'], ['نموذج اختبار (٢)'],
    { sec: 'الوحدة ٣: أخلاق المسلم', secAr: 'الوحدة ٣: أخلاق المسلم' }, ['الدرس ١: التعاون'], ['الدرس ٢: الإيثار'], ['نموذج اختبار (٣)'],
    { sec: 'الوحدة ٤: وسائل الاتصالات', secAr: 'الوحدة ٤: وسائل الاتصالات' }, ['الدرس ١: الهاتف المحمول'], ['الدرس ٢: الأقمار الصناعية'], ['نموذج اختبار (٤)'] ] },
  { id: 'islamic', name: 'Islamic Studies', ar: 'التربية الإسلامية', pic: '🕌', color: '#13A89E', shade: '#0B7A72', units: [
    /* follows her book (Grade 3, volume 1) */
    { sec: 'التوحيد', secAr: 'التوحيد', note: 'Tawheed', noteAr: 'الوحدة الأولى: مراتب الدين · الوحدة الثانية: أركان الإسلام' },
    ['الدرس ١: مراتب الدين', 'deen'], ['الدرس ٢: أركان الإسلام', 'pillars'], ['الدرس ٣: شهادة أن لا إله إلا الله'], ['الدرس ٤: شهادة أن محمداً رسول الله'],
    ['الدرس ٥: إقام الصلاة'], ['الدرس ٦: إيتاء الزكاة'], ['الدرس ٧: صوم رمضان'], ['الدرس ٨: حج بيت الله الحرام'],
    { sec: 'الفقه والسلوك', secAr: 'الفقه والسلوك', note: 'Fiqh and good manners', noteAr: 'الطهارة والتيمم والصلاة والمسجد' },
    ['الدرس ١: آداب قضاء الحاجة (١)'], ['الدرس ٢: آداب قضاء الحاجة (٢)'], ['الدرس ٣: إزالة النجاسة عن البدن'], ['الدرس ٤: إزالة النجاسة عن الملابس ومكان الصلاة'],
    ['الدرس ٥: التيمم'], ['الدرس ٦: مكانة الصلاة'], ['الدرس ٧: شروط الصلاة (١)'], ['الدرس ٨: شروط الصلاة (٢)'], ['الدرس ٩: آداب دخول المسجد والخروج منه'], ['الدرس ١٠: صلاة الجماعة'],
    { sec: 'القرآن الكريم', secAr: 'القرآن الكريم', note: 'Quran plan', noteAr: 'خطة مقرر القرآن الكريم' }, ['السور المقررة'] ] },
];
/* Islands group lessons inside a subject */
const ISLANDS = [
  { id: 'mathgame', subject: 'math',    name: 'Math Island',   sub: 'Times and sharing game',        color: '#FF8A3D', shade: '#C9601F', pic: '🍎', href: 'math.html' },
  { id: 'times',    subject: 'math',    name: 'Times Tree',    sub: 'Multiplication with pictures', color: '#FF8A3D', shade: '#C9601F', pic: '🍉' },
  { id: 'healthy',  subject: 'english', name: 'Healthy Harbor', sub: 'Unit 3: Staying Healthy',     color: '#F0466B', shade: '#B82C4C', pic: '🏃' },
  { id: 'shamsiya', subject: 'arabic',  name: 'جزيرة الشمس والقمر', sub: 'اللام الشمسية والقمرية', color: '#F0466B', shade: '#B82C4C', pic: '☀️' },
  { id: 'tanween',  subject: 'arabic',  name: 'جزيرة التنوين', sub: 'ضمّتان وفتحتان وكسرتان', color: '#F0466B', shade: '#B82C4C', pic: '✨' },
  { id: 'deen',     subject: 'islamic', name: 'جزيرة مراتب الدين', sub: 'الإسلام والإيمان والإحسان', color: '#13A89E', shade: '#0B7A72', pic: '🕌' },
  { id: 'pillars',  subject: 'islamic', name: 'جزيرة أركان الإسلام', sub: 'الأركان الخمسة', color: '#13A89E', shade: '#0B7A72', pic: '🕋' },
  { id: 'letters',  subject: 'english', name: 'Letter Land',   sub: 'Big and small letters',        color: '#13A89E', shade: '#0B7A72', pic: '🔠' },
  { id: 'grammar',  subject: 'english', name: 'Grammar Grove', sub: 'Nouns and capital letters',    color: '#22B566', shade: '#168048', pic: '🌳' },
  { id: 'phonics',  subject: 'english', name: 'Phonics Falls', sub: 'Letter sounds and spelling',   color: '#2E9BF0', shade: '#1C6FB0', pic: '💧' },
  { id: 'vocab',    subject: 'english', name: 'Word Woods',    sub: 'New words and meanings',       color: '#7C4DFF', shade: '#5631C9', pic: '🦉' },
  { id: 'story',    subject: 'english', name: 'Story Summit',  sub: 'Reading and understanding',    color: '#F0466B', shade: '#B82C4C', pic: '⛰️' },
  { id: 'lifelab',  subject: 'science', name: 'Life Lab',      sub: 'Living things',                color: '#22B566', shade: '#168048', pic: '🌱' },
];
const TYPE_SUB = { mc: 'Pick the best answer', sort: 'Drag into the right box', caps: 'Tap words that need a capital', fill: 'Fly a word into the gap', match: 'Match the pairs', pattern: 'Find the letters that make the sound', samediff: 'Same letters or different?', tapletters: 'Tap the capital letters' };
const TYPE_PIC = { mc: '🤔', sort: '🧺', caps: '🔠', fill: '✏️', match: '🔗', pattern: '🔍', samediff: '👯', tapletters: '👆' };
const ISL = id => ISLANDS.find(i => i.id === id);
const LES = id => LESSONS.find(l => l.id === id);
const SUBJ = id => SUBJECTS.find(s => s.id === id);

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
let S = { name: '', read: true, sfx: true, lang: 'en', langChosen: false, voiceEn: '', voiceAr: '', prog: {} };
try { Object.assign(S, JSON.parse(localStorage.getItem(KEY) || '{}')); } catch (e) {}
if (S.lang !== 'en' && S.lang !== 'ar') S.lang = 'ar'; /* older saves had 'both' */
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

/* ---------- English + Arabic ---------- */
/* S.lang: 'en' = Pip explains in English, 'ar' = Pip explains in Arabic (she chooses; one language at a time) */
const LANG_LABEL = { en: 'English', ar: 'عربي' };
let LANG_OVR = null; /* set while inside an Arabic-only lesson */
const curLang = () => LANG_OVR || S.lang;
function useLessonLang(l) { LANG_OVR = l && l.lang === 'ar' ? 'ar' : null; document.body.classList.toggle('rtl', !!LANG_OVR); }
const arSpan = t => `<span class="ar" dir="rtl" lang="ar">${t}</span>`;
function bi(en, ar) { return ar && curLang() === 'ar' ? arSpan(ar) : en; }
/* Arabic for Pip's common phrases (feminine: she is a girl) */
const AR = {
  'Read the question, then tap the best answer.': 'اقرئي السؤال، ثم اضغطي على الإجابة الصحيحة.',
  'Here comes the next one!': 'هيا إلى السؤال التالي!',
  'Yes! Well done!': 'أحسنتِ! إجابة صحيحة!',
  'Not quite. Read it again and try another answer!': 'ليست هذه. اقرئي مرة أخرى وجرّبي إجابة ثانية!',
  'Drag each word into the right box. Or tap a word, then tap a box.': 'اسحبي كل كلمة إلى الصندوق الصحيح، أو اضغطي على الكلمة ثم على الصندوق.',
  'Pick up a word and drop it in the right box!': 'خذي كلمة وضعيها في الصندوق الصحيح!',
  'First pick up a word from the top!': 'أولاً اختاري كلمة من الأعلى!',
  'Yes!': 'صحيح!',
  'Hmm, not that box. Try another one!': 'لا، ليس هذا الصندوق. جرّبي صندوقاً آخر!',
  'Some words lost their capital letters! Tap each word that needs one.': 'بعض الكلمات فقدت حروفها الكبيرة! اضغطي على كل كلمة تحتاج حرفاً كبيراً.',
  'Here is the next sentence. Which words need a capital?': 'هذه الجملة التالية. أي كلمات تحتاج حرفاً كبيراً؟',
  'Which word fits the gap? Tap it and watch it fly in!': 'أي كلمة تناسب الفراغ؟ اضغطي عليها وشاهديها تطير إلى مكانها!',
  'Next sentence! Which word fits?': 'الجملة التالية! أي كلمة تناسب؟',
  '{w} fits the sentence!': '{w} تناسب الجملة!',
  'Read the sentence with {w} in the gap. Does it make sense?': 'اقرئي الجملة مع {w} في الفراغ. هل لها معنى؟',
  'Tap a word, then tap what it means.': 'اضغطي على كلمة، ثم على معناها.',
  'Find the meaning for each word!': 'جدي معنى كل كلمة!',
  'Tap the word to hear it. Then tap the letters that say /ā/.': 'اضغطي على الكلمة لتسمعيها، ثم اختاري الحروف التي تنطق صوت /ā/.',
  'Listen to the next word!': 'استمعي إلى الكلمة التالية!',
  'Tap each word to hear it. Then look closely at the letters!': 'اضغطي على كل كلمة لتسمعيها، ثم انظري جيداً إلى الحروف!',
  'Here are two more words!': 'هاتان كلمتان أخريان!',
  'Both words say /ā/. Now look closely at the letters. Do they match?': 'الكلمتان فيهما صوت /ā/. انظري جيداً إلى الحروف. هل هي نفس الحروف؟',
};

/* ---------- sound: the most natural voice on the device ---------- */
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
/* Rank voices: neural / premium / enhanced voices sound much more like a person than the default "compact" ones. */
function voiceScore(v) {
  const n = v.name.toLowerCase(); let s = 0;
  if (/premium|neural|natural|enhanced|siri/.test(n)) s += 50;
  if (/google|microsoft/.test(n)) s += 25;
  if (/(ava|zoe|samantha|allison|evan|nathan|joelle|nicky|aria|jenny|emma|serena|karen|moira|tessa|daniel|majed|maged|laila|tarik|hamed|salma|zariyah)/.test(n)) s += 15;
  if (/compact|eloquence|novelty|bad news|bells|boing|bubbles|cellos|jester|organ|trinoids|whisper|zarvox|albert|fred|junior|ralph|kathy|grandma|grandpa|rocko|shelley|flo|eddy|reed|sandy/.test(n)) s -= 80;
  if (v.localService === false) s += 5;
  return s;
}
let VOICES = [];
function loadVoices() { try { VOICES = speechSynthesis.getVoices() || []; } catch (e) { VOICES = []; } }
loadVoices(); try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
function voicesFor(lang) { return VOICES.filter(v => (v.lang || '').toLowerCase().replace('_', '-').startsWith(lang)).sort((a, b) => voiceScore(b) - voiceScore(a)); }
function bestVoice(lang) {
  const want = lang === 'ar' ? S.voiceAr : S.voiceEn, list = voicesFor(lang);
  return list.find(v => v.name === want) || (lang === 'en' ? list.find(v => /en-us/i.test(v.lang.replace('_', '-')) && voiceScore(v) >= 0) : null) || list[0] || null;
}
const SPEAK_FIX = [[/<br\s*\/?>/g, '. '], [/<[^>]+>/g, ''], [/_{2,}/g, ' blank '], [/\ba_e\b/g, 'a, consonant, e'], [/\/ā\//g, '"ay"'], [/&[a-z]+;/g, ' '], [/\p{Extended_Pictographic}|\uFE0F|\u200D/gu, ' '], [/[▶◀✓➜→←×÷]/g, m => ({ '×': ' times ', '÷': ' divided by ' }[m] || ' ')]];
const cleanSpeech = t => { let c = String(t); SPEAK_FIX.forEach(([a, b]) => { c = c.replace(a, b); }); return c.replace(/\s+/g, ' ').trim(); };
function speakOne(text, lang) {
  if (/[\u0600-\u06FF]/.test(text) && !/[A-Za-z]{3,}/.test(cleanSpeech(text))) lang = 'ar';
  const u = new SpeechSynthesisUtterance(cleanSpeech(text)); if (!u.text) return;
  const v = bestVoice(lang); if (v) u.voice = v;
  u.lang = v ? v.lang : (lang === 'ar' ? 'ar-SA' : 'en-US');
  u.rate = lang === 'ar' ? .92 : .95; u.pitch = 1.05;
  speechSynthesis.speak(u);
}
/* say English (and the Arabic version after it, when Arabic is switched on) */
function say(t, force, ar) {
  if (!S.read && !force) return;
  try {
    speechSynthesis.cancel();
    if (curLang() !== 'ar' || !ar) speakOne(t, 'en');
    if (ar && curLang() !== 'en') speakOne(ar, 'ar');
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
  return `<div class="top"><div class="l">${back ? `<a class="pill home" href="#home" aria-label="Home">🏠</a><a class="pill" href="#${back.to}">&#8592; ${esc(back.label)}</a>` : '<span class="brand">Adventure Island</span>'}</div>
  <div class="row"><button class="pill lang" id="lg" aria-label="Change explanation language">${S.lang === 'ar' ? 'عربي ⇄ English' : 'English ⇄ عربي'}</button><button class="pill${S.read ? ' on' : ''}" id="rd" aria-pressed="${S.read}" aria-label="Read aloud">${SPK} ${S.read ? 'On' : 'Off'}</button><span class="pill" aria-label="Stars">${STAR} <span id="tot">${totalStars()}</span></span></div></div>`;
}
function wireTop() {
  const b = $('#rd');
  if (b) b.onclick = () => {
    S.read = !S.read; save(); b.classList.toggle('on', S.read); b.innerHTML = SPK + (S.read ? ' On' : ' Off'); b.setAttribute('aria-pressed', S.read);
    if (S.read) say('Read aloud is on!', false, 'القراءة بصوت عالٍ تعمل!'); else try { speechSynthesis.cancel(); } catch (e) {}
  };
  const g = $('#lg');
  if (g) g.onclick = () => {
    S.lang = S.lang === 'ar' ? 'en' : 'ar'; save();
    say('I will explain in English.', true, 'سأشرح لكِ بالعربي.');
    route();
  };
}
function paint(html) { app().innerHTML = html; wireTop(); window.scrollTo(0, 0); }

/* ---------- router ---------- */
function go(h) { if (location.hash === '#' + h) route(); else location.hash = h; }
function route() {
  TOK++; try { speechSynthesis.cancel(); } catch (e) {}
  useLessonLang(null);
  const h = decodeURIComponent(location.hash.slice(1)); let m;
  if (!S.name) return nameScreen();
  if (!S.langChosen) return langScreen();
  if (h === 'voice') return voicePage();
  if ((m = /^t-(.+)$/.exec(h))) return testsPage(m[1]);
  if ((m = /^u-(.+)$/.exec(h))) return unitsPage(m[1]);
  if ((m = /^i-(.+)$/.exec(h))) return islandPage(m[1]);
  if ((m = /^l-(.+)$/.exec(h))) return lessonPage(m[1]);
  if ((m = /^learn-(.+)$/.exec(h))) return learnPage(m[1]);
  if ((m = /^a-(.+)-(\d+)$/.exec(h))) return actPage(m[1], +m[2]);
  home();
}
function boot() { window.addEventListener('hashchange', route); route(); }
const openTo = to => { if (/\.html/.test(to)) location.href = to; else go(to); };

/* ---------- screens ---------- */
function nameScreen() {
  setColor(SUBJECTS[1]);
  paint(topBar() + `<div class="card stack"><div class="hero"><div class="pipw">${PIP}</div><div class="t"><h1>Welcome, explorer!</h1><p class="muted">${bi("I'm Pip. I will help you learn with games, pictures and sounds.", 'أنا بيب. سأساعدكِ على التعلّم بالألعاب والصور والأصوات.')}</p></div></div>
    <label for="name"><b>${bi("What's your name?", 'ما اسمكِ؟')}</b></label><input id="name" maxlength="20" placeholder="Type your name" autocomplete="off"><button class="big" id="go">Let's go!</button></div>`);
  const goOn = () => { setName(($('#name').value.trim() || 'Explorer')); route(); };
  $('#go').onclick = goOn; $('#name').onkeydown = e => { if (e.key === 'Enter') goOn(); };
}
/* she picks how Pip explains: English or Arabic */
function langScreen() {
  setColor(SUBJECTS[1]);
  paint(`<div class="card stack" style="text-align:center;align-items:center"><div class="pipw" style="width:110px">${PIP}</div>
    <h1>How should Pip explain?</h1><p class="ar" dir="rtl" lang="ar" style="text-align:center;border:0">كيف تحبين أن يشرح لكِ بيب؟</p>
    <div class="langpick"><button class="big" id="pen">🇬🇧<br>English</button><button class="big" id="par" style="--c:#13A89E;--cs:#0B7A72">🇸🇦<br>عربي</button></div>
    <p class="muted">You can change this any time with the button at the top.<br>يمكنكِ التغيير في أي وقت من الزر في الأعلى.</p></div>`);
  const pickL = l => { S.lang = l; S.langChosen = true; save(); say('Great! I will explain in English.', true, 'رائع! سأشرح لكِ بالعربي.'); route(); };
  $('#pen').onclick = () => pickL('en'); $('#par').onclick = () => pickL('ar');
}
let greeted = false;
function suggestion() {
  const started = LESSONS.find(l => S.prog[l.id] && stepsDone(l) < stepsOf(l));
  if (started) return { l: started, label: 'Keep going: ' + started.title + ' ▶' };
  const fresh = LESSONS.find(isNew);
  if (fresh) return { l: fresh, label: 'New: ' + fresh.title + ' ▶' };
  return null;
}
const subjLessons = sid => LESSONS.filter(l => (ISL(l.island) || {}).subject === sid);
const subjTests = sid => TESTS.filter(t => t.subject === sid);
function home() {
  setColor(SUBJECTS[0]);
  const sug = suggestion();
  const cards = SUBJECTS.map((sj, k) => {
    const nt = subjTests(sj.id).length, ready = sj.units.filter(u => u[1]).length;
    const fresh = subjLessons(sj.id).some(isNew) || subjTests(sj.id).some(t => (Date.now() - new Date(t.added)) / 864e5 < 14);
    return `<div class="scard" style="--c:${sj.color};--cs:${sj.shade};animation-delay:${k * .07}s">${fresh ? '<span class="new">New!</span>' : ''}
      <div class="sh2"><span class="blob">${sj.pic}</span><div><b>${sj.name}</b>${curLang() === 'ar' ? `<span class="ar" dir="rtl" lang="ar">${sj.ar}</span>` : ''}</div></div>
      <div class="sbtns"><button class="big sb" data-to="t-${sj.id}">📝 Tests <span class="cnt">${nt}</span></button><button class="big sb alt2" data-to="u-${sj.id}">🏝️ Lessons <span class="cnt">${ready}</span></button></div></div>`;
  }).join('');
  paint(topBar() + `<div class="card hero"><div class="pipw">${PIP}</div><div class="t"><h1>Hi ${esc(S.name)}!</h1><p class="muted">${bi('What shall we learn today? Pick a subject.', 'ماذا سنتعلّم اليوم؟ اختاري مادة.')}</p>
    ${sug ? `<button class="big" id="sug" style="--c:${ISL(sug.l.island).color};--cs:${ISL(sug.l.island).shade}">${esc(sug.label)}</button>` : ''}</div></div><div class="subjects">${cards}</div>
    <p class="foot"><a href="#voice">🔈 Voice settings (for parents)</a></p>`);
  $$('.sb').forEach(b => b.onclick = () => go(b.dataset.to));
  if (sug) $('#sug').onclick = () => go('l-' + sug.l.id);
  if (!greeted) { greeted = true; say(`Hi ${S.name}! What shall we learn today?`, false, `مرحباً يا ${S.name}! ماذا سنتعلّم اليوم؟`); }
}
/* uploaded school tests for one subject: practise it, or open the lesson to study */
function testsPage(sid) {
  const sj = SUBJ(sid); if (!sj) return home(); setColor(sj);
  const ts = subjTests(sid);
  paint(topBar({ to: 'home', label: 'Subjects' }) + `<div class="banner"><span class="blob">📝</span><div><h1>${sj.name} tests</h1><p>${bi('Tests and worksheets from school. Study the lesson first, then practise!', 'اختبارات وأوراق عمل من المدرسة. ادرسي الدرس أولاً، ثم تدرّبي!')}</p></div></div>
    ${ts.length ? `<div class="lessons">${ts.map((t, k) => {
      const l = t.play && LES(t.play.replace(/^l-/, ''));
      return `<div class="lcard tcard" style="animation-delay:${k * .07}s"><span class="ic">${t.pic || '📝'}</span><span class="m"><b>${esc(t.title)}</b><span>${esc(t.sub || '')}</span>${l ? `<span class="stars">${lessonStars(l)} / ${l.acts.length * 3} ★</span>` : ''}
        <span class="row tb">${(t.ref || []).map(r => `<button class="pill rb" data-to="${r[1]}">📖 ${esc(r[0])}</button>`).join('')}<button class="big pb2" data-to="${t.play}">▶ Practice</button></span></span></div>`;
    }).join('')}</div>` : `<div class="soon">${bi('No tests yet. When a new test comes home from school, it will appear here.', 'لا توجد اختبارات بعد. عندما يأتي اختبار جديد من المدرسة سيظهر هنا.')}</div>`}`);
  $$('[data-to]').forEach(b => b.onclick = () => openTo(b.dataset.to));
  say(sj.name + ' tests.', false, 'اختبارات ' + sj.ar);
}
/* the grade 3 plan for one subject */
/* ---------- mastery: she must pass each quiz (2+ stars) to unlock what comes next ---------- */
const PASS = 2;
const quizPassed = (l, i) => (((S.prog[l.id] || {}).stars || {})[i] | 0) >= PASS;
const lessonPassed = l => { const p = S.prog[l.id]; return !!p && p.learn && l.acts.every((_, i) => quizPassed(l, i)); };
const islandLessons = I => LESSONS.filter(l => l.island === I.id);
const islandPassed = I => I.href ? true : islandLessons(I).length > 0 && islandLessons(I).every(lessonPassed);
/* an island is locked until every earlier island in the same section is passed */
function unitLockedBy(sj, idx) {
  let k0 = 0; for (let k = idx - 1; k >= 0; k--) if (sj.units[k].sec) { k0 = k + 1; break; }
  for (let k = k0; k < idx; k++) { const u = sj.units[k]; if (u[1] && !islandPassed(ISL(u[1]))) return k; } return -1;
}
/* island number inside its section */
function unitNum(sj, idx) { let n = 0; for (let k = idx; k >= 0 && !sj.units[k].sec; k--) n++; return n; }
function openIsland(I) { if (I.href) { location.href = I.href; return; } const ls = islandLessons(I); go(ls.length === 1 ? 'l-' + ls[0].id : 'i-' + I.id); }

/* the subject's island map, in school order */
function unitsPage(sid) {
  const sj = SUBJ(sid); if (!sj) return home(); setColor(sj);
  let cur = -1;
  const stops = sj.units.map((u, k) => {
    if (u.sec) return { sec: u, k };
    const I = u[1] && ISL(u[1]), lockBy = unitLockedBy(sj, k);
    const state = !I ? 'later' : lockBy >= 0 ? 'locked' : islandPassed(I) && !I.href ? 'done' : 'open';
    if (state === 'open' && cur < 0) cur = k;
    let info = '';
    if (state === 'done') info = bi('Passed! 🚩', 'نجحتِ! 🚩');
    else if (state === 'open' && I.href) info = bi('Play the game', 'العبي اللعبة');
    else if (state === 'open') { const ls = islandLessons(I); const got = ls.reduce((a, l) => a + l.acts.filter((_, i) => quizPassed(l, i)).length, 0), all = ls.reduce((a, l) => a + l.acts.length, 0); info = bi(`${got} of ${all} quizzes passed`, `اجتزتِ ${got} من ${all} اختبارات`); }
    else if (state === 'locked') info = bi(`Pass island ${unitNum(sj, lockBy)} to open`, `اجتازي الجزيرة ${unitNum(sj, lockBy)} لتفتح`);
    else info = bi('Coming soon', 'قريباً');
    return { u, k, I, state, info, lockBy };
  });
  let side = 0;
  const html = stops.map((st, n) => st.sec ? (side = 0, `<div class="msec"><b>${bi(esc(st.sec.sec), st.sec.secAr)}</b>${st.sec.note ? `<span>${bi(esc(st.sec.note), st.sec.noteAr)}</span>` : ''}</div>`) : `${side++ ? `<div class="wave ${side % 2 ? 'b' : 'a'}"></div>` : ''}<div class="mstop ${st.state} ${side % 2 ? 'l' : 'r'}">
    <button class="mi" data-k="${st.k}"><span class="iblob" style="--ic:${st.I ? st.I.color : '#9AA8C2'};animation-delay:${n * .08}s">${st.state === 'locked' ? '🔒' : st.state === 'later' ? '🌴' : st.I.pic}${st.state === 'done' ? '<i class="flag">🚩</i>' : ''}${st.k === cur ? `<span class="pipon">${PIP}</span>` : ''}</span>
    <span class="m"><span class="unum">Island ${unitNum(sj, st.k)}</span><b>${esc(st.u[0])}</b><span>${st.info}</span></span></button></div>`).join('');
  paint(topBar({ to: 'home', label: 'Subjects' }) + `<div class="banner"><span class="blob">${sj.pic}</span><div><h1>${sj.name} islands</h1><p>${bi('Pass each island’s quizzes with 2 stars or more to sail to the next island!', 'اجتازي اختبارات كل جزيرة بنجمتين أو أكثر لتبحري إلى الجزيرة التالية!')}</p></div></div>
    ${sj.units.length ? `<div class="sea"><div class="imap">${html}</div></div>` : `<div class="soon">${bi('Lessons for this subject are coming soon.', 'دروس هذه المادة قادمة قريباً.')}</div>`}`);
  $$('.mi').forEach(b => b.onclick = () => {
    const st = stops[+b.dataset.k];
    if (st.state === 'open' || st.state === 'done') openIsland(st.I);
    else if (st.state === 'locked') { shake(b); SFX.no(); say(`This island is locked. Pass island ${unitNum(sj, st.lockBy)} first!`, true, `هذه الجزيرة مقفلة. اجتازي الجزيرة ${unitNum(sj, st.lockBy)} أولاً!`); }
    else say('This island is coming soon!', true, 'هذه الجزيرة قادمة قريباً!');
  });
  const c0 = $('.mstop .pipon'); if (c0) setTimeout(() => { try { c0.closest('.mstop').scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'center' }); } catch (e) {} }, 300);
  say(sj.name + ' islands.', false, 'جزر ' + sj.ar);
}
function islandPage(id) {
  const I = ISL(id); if (!I) return home(); if (I.href) { location.href = I.href; return; }
  setColor(I);
  const ls = LESSONS.filter(l => l.island === id);
  paint(topBar({ to: 'u-' + I.subject, label: SUBJ(I.subject).name }) + `<div class="banner"><span class="blob">${I.pic}</span><div><h1>${I.name}</h1><p>${I.sub}</p></div></div>
    <div class="lessons">${ls.map((l, k) => `<button class="lcard" data-l="${l.id}" style="animation-delay:${k * .07}s">${isNew(l) ? '<span class="new">New!</span>' : ''}<span class="ic">${l.pic}</span>
      <span class="m"><b>${esc(l.title)}</b><span>${esc(l.sub)}</span><span class="stars">${lessonStars(l)} / ${l.acts.length * 3} ★</span></span></button>`).join('')}</div>`);
  $$('.lcard').forEach(b => b.onclick = () => go('l-' + b.dataset.l));
  say(I.name + '. Pick a lesson.');
}
function lessonPage(id) {
  const l = LES(id); if (!l) return home(); const I = ISL(l.island); setColor(I); useLessonLang(l);
  const p = S.prog[l.id] || { learn: false, stars: {} };
  const steps = [{ name: '1. Learn the lesson', sub: 'Watch, listen and tap', pic: '📖', to: 'learn-' + id, done: p.learn, stars: -1 }]
    .concat(l.acts.map((a, i) => ({ name: `${i + 2}. Quiz: ${a.title}`, sub: (p.stars[i] | 0) === 1 ? 'Score 2 stars to pass. Try again!' : (a.sub || TYPE_SUB[a.type]), pic: a.pic || TYPE_PIC[a.type], to: `a-${id}-${i}`, done: (p.stars[i] | 0) >= PASS, stars: p.stars[i] | 0 })));
  steps.forEach((s, k) => { s.locked = k > 0 && !steps[k - 1].done; });
  const ni = steps.findIndex(s => !s.done);
  const st = n => `<span class="stars">${[1, 2, 3].map(k => `<span class="${k <= n ? '' : 'off'}">★</span>`).join('')}</span>`;
  const back = islandLessons(I).length === 1 ? { to: 'u-' + I.subject, label: SUBJ(I.subject).name } : { to: 'i-' + I.id, label: I.name };
  paint(topBar(back) + `<div class="card stack"><span class="tag">${I.name}${lessonPassed(l) ? ' · 🚩 passed' : ''}</span><h1>${esc(l.title)}</h1><p class="muted">${esc(l.sub)}</p><p class="muted">${bi('Learn the lesson, then pass every quiz with 2 stars or more to pass this island.', 'تعلّمي الدرس، ثم اجتازي كل اختبار بنجمتين أو أكثر لتجتازي هذه الجزيرة.')}</p>
    <button class="big wide" id="go">${ni < 0 ? 'Play it all again ▶' : ni === 0 ? 'Start: Learn it ▶' : 'Next: ' + esc(steps[ni].name) + ' ▶'}</button></div>
    <div class="card"><div class="path">${steps.map((s, k) => `${k ? '<div class="link"></div>' : ''}<button class="stop${s.done ? ' done' : ''}${k === ni ? ' next' : ''}${s.locked ? ' locked' : ''}" data-to="${s.to}" data-k="${k}"><span class="dot">${s.done ? '✓' : s.locked ? '🔒' : s.pic}</span><span class="m"><b>${esc(s.name)}</b><span>${esc(s.sub)}</span>${s.stars >= 0 ? st(s.stars) : ''}</span></button>`).join('')}</div></div>`);
  $$('.stop').forEach(b => b.onclick = () => {
    if (b.classList.contains('locked')) { shake(b); SFX.no(); say('Finish the step before this one first!', true, 'أنهي الخطوة التي قبلها أولاً!'); return; }
    go(b.dataset.to);
  });
  $('#go').onclick = () => go(steps[ni < 0 ? 0 : ni].to);
  say(l.title);
}
/* parents: hear and choose the voices */
function voicePage() {
  setColor(SUBJECTS[1]); loadVoices();
  const row = (lang, v, cur) => `<div class="vrow${v.name === cur ? ' on' : ''}"><span class="m"><b>${esc(v.name)}</b><span>${esc(v.lang)}${voiceScore(v) >= 40 ? ' · natural' : ''}</span></span><button class="pill vt" data-l="${lang}" data-n="${esc(v.name)}">▶ Try</button><button class="pill vs${v.name === cur ? ' on' : ''}" data-l="${lang}" data-n="${esc(v.name)}">${v.name === cur ? '✓ Chosen' : 'Choose'}</button></div>`;
  const en = voicesFor('en'), ar = voicesFor('ar'), cEn = (bestVoice('en') || {}).name, cAr = (bestVoice('ar') || {}).name;
  paint(topBar({ to: 'home', label: 'Home' }) + `<div class="card stack"><h1>Voice settings</h1>
    <p>The site already picks the most natural voice on this device. For a voice that sounds like a real person on iPad, download a free <b>Premium</b> voice once:</p>
    <ol class="steps"><li>Open <b>Settings</b> → <b>Accessibility</b> → <b>Spoken Content</b> → <b>Voices</b>.</li><li>Tap <b>English</b>, pick <b>Ava (Premium)</b> or <b>Zoe (Premium)</b>, and tap the download icon.</li><li>Go back, tap <b>Arabic</b>, and download <b>Majed (Enhanced)</b>.</li><li>Close the site and open it again, then choose the new voice below.</li></ol>
    <h3>English voices</h3>${en.length ? en.slice(0, 12).map(v => row('en', v, cEn)).join('') : '<p class="muted">No English voices found on this device.</p>'}
    <h3>Arabic voices</h3>${ar.length ? ar.slice(0, 8).map(v => row('ar', v, cAr)).join('') : '<p class="muted">No Arabic voice found. Download one in Settings (step 3).</p>'}
    <label class="row"><input type="checkbox" id="sfx"${S.sfx ? ' checked' : ''}> Play little sound effects</label></div>`);
  $$('.vt').forEach(b => b.onclick = () => { const v = VOICES.find(x => x.name === b.dataset.n); try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(b.dataset.l === 'ar' ? 'مرحباً! أنا بيب. هيا نتعلّم معاً.' : 'Hi! I am Pip. Let\'s learn together.'); if (v) { u.voice = v; u.lang = v.lang; } u.rate = .95; speechSynthesis.speak(u); } catch (e) {} });
  $$('.vs').forEach(b => b.onclick = () => { if (b.dataset.l === 'ar') S.voiceAr = b.dataset.n; else S.voiceEn = b.dataset.n; save(); voicePage(); });
  $('#sfx').onchange = e => { S.sfx = e.target.checked; save(); };
  if (!VOICES.length) setTimeout(() => { loadVoices(); if (VOICES.length && location.hash === '#voice') voicePage(); }, 600);
}

/* ---------- learn slides ---------- */
function learnPage(id) {
  const l = LES(id); if (!l) return home(); const I = ISL(l.island); setColor(I); useLessonLang(l);
  const n = l.learn.length; let k = 0; const my = TOK;
  const show = () => {
    if (my !== TOK) return;
    const sl = l.learn[k];
    paint(topBar({ to: 'l-' + id, label: l.title }) + `<div class="card slide"><span class="tag">Learn it · ${k + 1} of ${n}</span><h2>${bi(sl.title, sl.titleAr)}</h2>${sl.text ? `<p>${bi(sl.text, sl.textAr)}</p>` : ''}
      <div class="stage" id="stg"></div><div class="row"><button class="hear" id="hr">${SPK} Hear it again</button><button class="hear" id="rp">↻ Play again</button></div>
      <div class="dots">${l.learn.map((_, j) => `<i class="${j === k ? 'on' : ''}"></i>`).join('')}</div>
      <div class="nav"><button class="big alt" id="pv"${k ? '' : ' hidden'}>◀ Back</button><button class="big" id="nx">${k < n - 1 ? 'Next ▶' : "Let's practice! ▶"}</button></div></div>`);
    const stg = $('#stg'), run = () => { stg.innerHTML = ''; (SHOW[sl.show.kind] || SHOW.scene)(stg, sl.show, l, my); };
    run(); $('#rp').onclick = run;
    const en = sl.say || (sl.title + '. ' + (sl.text || '')), ar = sl.sayAr || (sl.titleAr ? sl.titleAr + '. ' + (sl.textAr || '') : sl.textAr);
    say(en, false, ar); $('#hr').onclick = () => say(en, true, ar);
    $('#nx').onclick = () => { if (k < n - 1) { k++; show(); } else { lp(id).learn = true; save(); const q = l.acts.findIndex((_, i) => !quizPassed(l, i)); go(`a-${id}-${q < 0 ? 0 : q}`); } };
    $('#pv').onclick = () => { k--; show(); };
  };
  show();
}
const later = (my, ms, fn) => setTimeout(() => { if (my === TOK) fn(); }, RM ? 0 : ms);
const capHL = s => s.split(' ').map(w => `<b class="cap1">${esc(w[0])}</b>${esc(w.slice(1))}`).join(' ');

/* handwriting lines: capitals reach the top line, most small letters stop at the dashed middle line */
function linesSVG(chars, opt) {
  opt = opt || {}; const w = 62, W = chars.length * w + 20;
  const body = chars.map((ch, j) => {
    const big = /[A-Z]/.test(ch), col = ch === ' ' ? 'none' : big ? '#FF8A3D' : '#7C4DFF';
    return `<text x="${10 + j * w + w / 2}" y="72" text-anchor="middle" font-family="Andika,'Comic Sans MS',sans-serif" font-weight="700" font-size="80" fill="${col}" class="${opt.anim ? 'ldrop' : ''}" style="animation-delay:${(opt.delay || 0) + j * .45}s">${esc(ch)}</text>`;
  }).join('');
  return `<svg class="lines" viewBox="0 0 ${W} 100" style="max-width:${Math.min(W * 1.6, 560)}px" role="img" aria-label="${esc(chars.join(''))}">
    <line x1="4" x2="${W - 4}" y1="14" y2="14" stroke="#2E9BF0" stroke-width="2"/><line x1="4" x2="${W - 4}" y1="33" y2="33" stroke="#9BC3E8" stroke-width="2" stroke-dasharray="6 6"/>
    <line x1="4" x2="${W - 4}" y1="72" y2="72" stroke="#F0466B" stroke-width="2.5"/><line x1="4" x2="${W - 4}" y1="92" y2="92" stroke="#C9D6EA" stroke-width="2" stroke-dasharray="2 5"/>${body}</svg>`;
}
const SAME_SHAPE = 'CKOPSUVWXZ';

const SHOW = {
  scene(st, d) { st.innerHTML = `<div class="scene">${d.pic || ''}</div>${d.items ? `<div class="chipsrow">${d.items.map((x, j) => `<span class="ochip pop" style="animation-delay:${.4 + j * .3}s"><i>${x[0]}</i>${esc(x[1])}</span>`).join('')}</div>` : ''}`; },
  html(st, d) { st.innerHTML = d.html; },
  chips(st, d) {
    st.innerHTML = `<div class="chipsrow">${d.items.map((x, j) => `<button class="ochip pop" style="animation-delay:${j * .3}s" data-w="${esc(x[2] || x[1])}"><i>${x[0]}</i>${esc(x[1])}</button>`).join('')}</div>`;
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
      const lab = k === 0 ? 'start' : w.replace(/\W/g, '') === 'I' ? 'I' : 'name';
      later(my, t, () => { const el = $(`[data-k="${k}"]`, st); el.classList.add('fixed'); $('.f', el).textContent = w[0]; el.insertAdjacentHTML('beforeend', `<span class="why">${lab}</span>`); SFX.pop(); });
      t += 1100;
    });
  },
  /* letters: capital and small twins on handwriting lines */
  twins(st, d) {
    st.innerHTML = `<div class="twins">${d.pairs.map(([C, s], j) => `<button class="twin pop" style="animation-delay:${j * .6}s" data-c="${C}">${linesSVG([C, s])}<span class="tl"><b style="color:#FF8A3D">capital</b> · <b style="color:#7C4DFF">small</b></span></button>`).join('')}</div>`;
    $$('.twin', st).forEach(b => b.onclick = () => { SFX.pop(); say(`Capital ${b.dataset.c}. Small ${b.dataset.c.toLowerCase()}. Same letter, same sound.`, true, `حرف ${b.dataset.c} الكبير، وحرف ${b.dataset.c.toLowerCase()} الصغير. نفس الحرف ونفس الصوت.`); });
  },
  lines(st, d) { st.innerHTML = linesSVG(d.chars, { anim: true }) + (d.note ? `<p class="muted" style="text-align:center">${bi(d.note, d.noteAr)}</p>` : ''); },
  forms(st, d) {
    st.innerHTML = `<div class="forms"><div class="frow ar" dir="rtl" lang="ar">${d.ar.map((f, j) => `<span class="pop" style="animation-delay:${j * .4}s">${f}</span>`).join('')}</div>
      <p class="muted">${bi('One Arabic letter, many shapes', 'حرف عربي واحد، وأشكال كثيرة')}</p>
      <div class="frow">${d.en.map((f, j) => `<span class="pop" style="animation-delay:${1.6 + j * .4}s;color:${j ? '#7C4DFF' : '#FF8A3D'}">${f}</span>`).join('')}</div>
      <p class="muted">${bi('One English letter, two shapes', 'حرف إنجليزي واحد، وشكلان')}</p></div>`;
  },
  abc(st) {
    const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    st.innerHTML = `<div class="chipsrow" style="gap:8px"><span class="ochip" style="--k:#22B566"><i style="width:14px;height:14px;border-radius:50%;background:#22B566"></i>${bi('look the same, just bigger', 'نفس الشكل لكن أكبر')}</span><span class="ochip"><i style="width:14px;height:14px;border-radius:50%;background:#FF8A3D"></i>${bi('look different', 'شكل مختلف')}</span></div>
      <div class="abc">${[...A].map((C, j) => `<button class="ab pop${SAME_SHAPE.includes(C) ? ' same' : ''}" style="animation-delay:${j * .05}s" data-c="${C}">${C}<small>${C.toLowerCase()}</small></button>`).join('')}</div>`;
    $$('.ab', st).forEach(b => b.onclick = () => { b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); SFX.pop(); say(`Capital ${b.dataset.c}, small ${b.dataset.c.toLowerCase()}`, true); });
  },
  /* math: equal groups and arrays */
  groups(st, d) {
    st.innerHTML = `<div class="grps2">${Array.from({ length: d.g }, (_, j) => `<div class="plate pop" style="animation-delay:${j * .35}s">${(d.e || '🍎').repeat(d.n)}</div>`).join('')}</div><p class="eqn pop" style="animation-delay:${d.g * .35 + .3}s">${d.g} groups of ${d.n} = ${d.g} × ${d.n} = <b>${d.g * d.n}</b></p>`;
  },
  array(st, d) {
    st.innerHTML = `${ARR(d.r, d.c, d.e, true)}<p class="eqn pop" style="animation-delay:${d.r * .3 + .4}s">${d.r} rows × ${d.c} in each row = <b>${d.r * d.c}</b></p>`;
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
    st.innerHTML = `<p class="count">${bi('Tap each card to flip it!', 'اضغطي على كل بطاقة لتقلبيها!')}</p><div class="fgrid">${l.words.map((x, j) => `<button class="fcard" style="animation-delay:${j * .08}s" data-j="${j}"><div class="fr"><i>${x[1]}</i><b>${esc(x[0])}</b></div><div class="bk">${esc(x[2])}${x[4] && curLang() === 'ar' ? `<span class="ar" dir="rtl" lang="ar">${x[4]}</span>` : ''}</div></button>`).join('')}</div>`;
    $$('.fcard', st).forEach(b => b.onclick = () => { const x = l.words[b.dataset.j]; b.classList.toggle('on'); SFX.pop(); const on = b.classList.contains('on'); say(on ? `${x[0]} means ${x[2]}` : x[0], true, on ? x[4] : null); });
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
/* a grid of objects for multiplication */
function ARR(r, c, e, anim) {
  return `<div class="arr" style="grid-template-columns:repeat(${c},auto)">${Array.from({ length: r * c }, (_, k) => `<span class="${anim ? 'pop' : ''}" style="${anim ? `animation-delay:${Math.floor(k / c) * .3}s` : ''}">${e || '🍎'}</span>`).join('')}</div>`;
}

/* ---------- activities ---------- */
const PRAISE = { 3: ['Superstar!', 'نجمة رائعة!'], 2: ['Great job!', 'عمل رائع!'], 1: ['You did it!', 'لقد نجحتِ!'] };
function prep(a, l) {
  if (a.type === 'sort' && a.fromPatterns) {
    const P = l.patterns, keys = Object.keys(P);
    const pool = keys.flatMap((k, b) => P[k].words.map(x => [x[0], b]));
    return Object.assign({}, a, { buckets: keys.map(k => ({ label: P[k].label, color: P[k].color, why: `<b>{w}</b> uses <b>${P[k].label}</b> to say /ā/.`, whyAr: `كلمة <b>{w}</b> تستخدم <b>${P[k].label}</b> لصوت /ā/.` })), items: pool });
  }
  return a;
}
function actPage(id, i) {
  const l = LES(id); if (!l) return home(); const a0 = l.acts[i]; if (!a0) return lessonPage(id);
  const a = prep(a0, l), I = ISL(l.island); setColor(I); useLessonLang(l);
  const my = TOK; let miss = 0;
  paint(topBar({ to: 'l-' + id, label: l.title }) + `<div class="qhead"><span class="tag">${esc(a.title)}</span><div class="bar"><i id="pb" style="width:0%"></i></div></div>
    <div class="coach" id="coach"><div class="pipw">${PIP}</div><div class="bubble" id="bub"></div></div><div class="card play" id="area"></div>`);
  const area = $('#area'), coachEl = $('#coach'), bub = $('#bub');
  const c = {
    lesson: l, area, alive: () => my === TOK,
    progress: f => { $('#pb').style.width = Math.round(f * 100) + '%'; },
    /* Pip talks. ar is the Arabic version; when missing, common phrases are looked up in AR. */
    coach(html, mood, quiet, ar) {
      if (my !== TOK) return;
      if (ar === undefined || ar === null) ar = AR[html];
      bub.innerHTML = bi(html, ar); bub.classList.remove('pop'); void bub.offsetWidth; bub.classList.add('pop');
      coachEl.classList.remove('happy', 'think'); if (mood) { void coachEl.offsetWidth; coachEl.classList.add(mood); }
      if (!quiet) say(html, false, ar);
    },
    /* template a message pair: {w} becomes the word; functions are called */
    tell(en, ar, w, it, mood, quiet) { this.coach(tpl(en, w, it), mood, quiet, ar ? tpl(ar, w, it) : (typeof en === 'string' && AR[en] ? tpl(AR[en], w, it) : undefined)); },
    miss: () => { miss++; },
    next(btn, fn) { btn.hidden = false; btn.onclick = fn; setTimeout(() => { try { btn.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'nearest' }); } catch (e) {} }, 80); },
    finish() {
      if (my !== TOK) return;
      const stars = miss === 0 ? 3 : miss <= 2 ? 2 : 1, p = lp(id), wasPassed = lessonPassed(l);
      p.stars[i] = Math.max(p.stars[i] | 0, stars); save();
      $('#tot').textContent = totalStars(); c.progress(1);
      const passed = stars >= PASS, ni = i + 1 < l.acts.length ? i + 1 : null, islandDone = !wasPassed && lessonPassed(l);
      if (passed) SFX.win(); else SFX.pop();
      const I0 = ISL(l.island);
      area.innerHTML = `<div class="stack win"><div class="bigstars">${[1, 2, 3].map(k => STARBIG(k <= stars)).join('')}</div>
        <h1>${passed ? (islandDone ? bi('Island passed! 🚩', 'اجتزتِ الجزيرة! 🚩') : bi(PRAISE[stars][0], PRAISE[stars][1])) : bi('Almost there!', 'اقتربتِ كثيراً!')}</h1>
        <p class="muted">${passed ? (miss === 0 ? bi('No mistakes at all! Quiz passed.', 'بدون أي خطأ! نجحتِ في الاختبار.') : bi(`Quiz passed! You fixed ${miss} mistake${miss > 1 ? 's' : ''} along the way.`, `نجحتِ في الاختبار! وصحّحتِ ${miss} من الأخطاء.`))
          : bi('You need 2 stars to pass. Watch the lesson again if you like, then try again. You can do it!', 'تحتاجين نجمتين لتنجحي. شاهدي الدرس مرة أخرى إن أحببتِ، ثم حاولي من جديد. أنتِ تقدرين!')}</p>
        ${passed ? `<button class="big wide" id="nx">${LANG_OVR ? (ni != null ? 'الاختبار التالي: ' + esc(l.acts[ni].title) : islandDone ? 'أبحري إلى الجزيرة التالية ⛵' : 'العودة إلى الجزر') : ni != null ? 'Next quiz: ' + esc(l.acts[ni].title) + ' ▶' : islandDone ? 'Sail to the next island ⛵' : 'Back to the islands ▶'}</button>`
          : `<button class="big wide" id="ag2">${LANG_OVR ? 'حاولي مرة أخرى' : 'Try again ▶'}</button><button class="big alt wide" id="lr">📖 ${LANG_OVR ? 'شاهدي الدرس مرة أخرى' : 'Watch the lesson again'}</button>`}
        ${passed ? `<button class="big alt wide" id="ag">${LANG_OVR ? 'العبي مرة أخرى بأسئلة جديدة' : 'Play again with new questions'}</button>` : ''}</div>`;
      c.coach(passed ? (islandDone ? `You passed the whole island, ${esc(S.name)}! The next island is open!` : `Amazing, ${esc(S.name)}! You passed!`) : `Good try, ${esc(S.name)}! Two stars will pass it. Let's try again!`,
        passed ? 'happy' : 'think', false,
        passed ? (islandDone ? `اجتزتِ الجزيرة كلها يا ${esc(S.name)}! الجزيرة التالية مفتوحة الآن!` : `رائع يا ${esc(S.name)}! لقد نجحتِ!`) : `محاولة جيدة يا ${esc(S.name)}! نجمتان تكفيان للنجاح. هيا نحاول مرة أخرى!`);
      if (passed) confetti($('.bigstars', area), islandDone ? 60 : 28);
      const nx = $('#nx', area); if (nx) nx.onclick = () => go(ni != null ? `a-${id}-${ni}` : 'u-' + I0.subject);
      const ag = $('#ag', area); if (ag) ag.onclick = () => route();
      const ag2 = $('#ag2', area); if (ag2) ag2.onclick = () => route();
      const lr = $('#lr', area); if (lr) lr.onclick = () => go('learn-' + id);
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
      c.area.innerHTML = `${it.pic ? `<div class="scene${it.pic.startsWith('<') ? ' html' : ''}">${it.pic}</div>` : ''}<div class="q">${bi(it.q, it.qAr)}</div><div class="row"><button class="hear" id="hr">${SPK} Read to me</button></div>
        <div class="opts${long ? ' long' : ''}${a.big ? ' bigl' : ''}">${opts.map(o => `<button class="opt" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      const read = (it.read || it.q) + '. ' + opts.join(curLang() === 'ar' ? '، أو ' : '. Or, ') + '?';
      say(read, false, it.qAr); $('#hr', c.area).onclick = () => say(read, true, it.qAr);
      if (i === 0) c.tell(a.start || 'Read the question, then tap the best answer.', a.startAr, '', it, null, true);
      else c.coach('Here comes the next one!', null, true);
      $$('.opt', c.area).forEach(b => b.onclick = () => {
        if (b.disabled) return;
        if (b.dataset.v === String(it.ans)) {
          b.classList.add('ok'); $$('.opt', c.area).forEach(x => { x.disabled = true; }); SFX.ok(); sparkle(b);
          c.tell(it.why || 'Yes! Well done!', it.whyAr, b.dataset.v, it, 'happy');
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          b.classList.add('no'); b.disabled = true; SFX.no(); c.miss();
          c.tell(it.hint || a.hint || 'Not quite. Read it again and try another answer!', it.hintAr || a.hintAr, b.dataset.v, it, 'think');
        }
      });
    };
    show();
  },

  /* drag (or tap) words into boxes */
  sort(a, c) {
    const items = pick(a.items, a.pick).map(x => ({ w: x[0], b: x[1], why: x[2] }));
    let placed = 0, sel = null;
    const ask = a.ask || 'Drag each word into the right box. Or tap a word, then tap a box.';
    c.area.innerHTML = `<p class="count">${bi(ask, a.askAr || AR[ask])}</p>
      <div class="tray${a.big ? ' bigl' : ''}" id="tray">${items.map((it, k) => `<button class="chip" data-k="${k}">${esc(it.w)}</button>`).join('')}</div>
      <div class="bins${a.buckets.length > 4 ? ' six' : ''}">${a.buckets.map((b, k) => `<div class="bin" data-b="${k}"${b.color ? ` style="border-color:${b.color}"` : ''}><div class="lb"${b.color ? ` style="color:${b.color}"` : ''}>${b.pic ? `<i>${b.pic}</i>` : ''}${esc(b.label)}</div>${b.labelAr && curLang() === 'ar' ? `<div class="ar" dir="rtl" lang="ar">${b.labelAr}</div>` : ''}<div class="in"></div></div>`).join('')}</div>`;
    c.tell(a.start || 'Pick up a word and drop it in the right box!', a.startAr);
    const tray = $('#tray', c.area), bins = $$('.bin', c.area);
    const select = ch => {
      $$('.chip.sel', tray).forEach(x => x.classList.remove('sel')); sel = ch;
      bins.forEach(b => b.classList.toggle('pick', !!ch));
      if (ch) { ch.classList.add('sel'); SFX.pop(); say(items[ch.dataset.k].w, false); }
    };
    const drop = (ch, bin) => {
      const it = items[ch.dataset.k], b = +bin.dataset.b, B = a.buckets[b];
      ch.classList.remove('ghost');
      if (b === it.b) {
        ch.classList.remove('sel'); ch.disabled = true; fly(ch, $('.in', bin)); SFX.ok(); sparkle(bin);
        placed++; c.progress(placed / items.length); select(null);
        c.tell(it.why || B.why || 'Yes!', B.whyAr, it.w, it, 'happy');
        if (placed === items.length) setTimeout(() => c.finish(), 1700);
      } else {
        shake(bin); shake(ch); SFX.no(); c.miss();
        c.tell(a.hint || 'Hmm, not that box. Try another one!', a.hintAr, it.w, it, 'think');
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
      const cnt = () => bi(`Find <b>${left}</b> more word${left === 1 ? '' : 's'} that need${left === 1 ? 's' : ''} a capital letter.`, `باقي <b>${left}</b> ${left === 1 ? 'كلمة تحتاج' : 'كلمات تحتاج'} حرفاً كبيراً.`);
      c.area.innerHTML = `<p class="count" id="cnt">${cnt()}</p><div class="words">${ws.map((w, k) => `<button class="wd" data-k="${k}"><span class="f">${esc(w[0].toLowerCase())}</span>${esc(w.slice(1))}</button>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="hear" id="hr">${SPK} Read the sentence</button></div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(s); $('#hr', c.area).onclick = () => say(s, true);
      if (i === 0) c.tell(a.start || 'Some words lost their capital letters! Tap each word that needs one.', a.startAr, '', null, null, true);
      else c.coach('Here is the next sentence. Which words need a capital?', null, true);
      $$('.wd', c.area).forEach(el => el.onclick = () => {
        const k = +el.dataset.k, w = ws[k], clean = w.replace(/[^A-Za-z']/g, '');
        if (el.classList.contains('fixed')) return;
        if (need[k]) {
          const isI = clean === 'I' && k > 0;
          el.classList.add('fixed'); $('.f', el).textContent = w[0]; el.insertAdjacentHTML('beforeend', `<span class="why">${k === 0 ? 'start' : isI ? 'I' : 'special name'}</span>`);
          SFX.ok(); left--;
          let en = k === 0 ? `<b>${clean}</b> is the first word. Every sentence starts with a capital letter!` : isI ? 'The word <b>I</b> (me) is always a capital letter!' : `<b>${clean}</b> is a special name, so it starts with a capital letter!`;
          let ar = k === 0 ? `<b>${clean}</b> هي أول كلمة. كل جملة تبدأ بحرف كبير!` : isI ? 'كلمة <b>I</b> (أنا) تُكتب دائماً بحرف كبير!' : `<b>${clean}</b> اسم خاص، لذلك يبدأ بحرف كبير!`;
          if (left === 0) {
            $('#cnt', c.area).innerHTML = bi('All fixed! ✓', 'تم التصحيح! ✓'); sparkle($('.words', c.area));
            en += '<br>All fixed! Tap Next.'; ar += '<br>أحسنتِ! اضغطي التالي.';
            c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
          } else $('#cnt', c.area).innerHTML = cnt();
          c.coach(en, 'happy', false, ar);
        } else {
          shake(el); SFX.no(); c.miss();
          c.coach(`<b>${clean.toLowerCase()}</b> is not a special name, and it is not the first word. So it stays small.`, 'think', false,
            `<b>${clean.toLowerCase()}</b> ليست اسماً خاصاً وليست أول كلمة، لذلك تبقى بحرف صغير.`);
        }
      });
    };
    show();
  },

  /* tap every capital letter, one letter at a time */
  tapletters(a, c) {
    const items = pick(a.items, a.pick); let i = 0;
    const show = () => {
      if (!c.alive()) return; c.progress(i / items.length);
      const s = items[i], words = s.split(' ');
      let left = [...s].filter(ch => /[A-Z]/.test(ch)).length;
      const cnt = () => bi(`Tap every <b>capital</b> letter. <b>${left}</b> left to find!`, `اضغطي على كل حرف <b>كبير</b>. باقي <b>${left}</b>!`);
      c.area.innerHTML = `<p class="count" id="cnt">${cnt()}</p><div class="lwords">${words.map((w, wi) => `<span class="lw">${[...w].map((ch, k) => /[A-Za-z]/.test(ch) ? `<button class="ltr" data-w="${wi}" data-k="${k}">${esc(ch)}</button>` : `<span class="lp">${esc(ch)}</span>`).join('')}</span>`).join('')}</div>
        <div class="row" style="justify-content:center"><button class="hear" id="hr">${SPK} Read it</button></div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(s); $('#hr', c.area).onclick = () => say(s, true);
      if (i === 0) c.tell(a.start || 'Capital letters are the BIG letters. Can you find them all?', a.startAr || 'الحروف الكبيرة (Capital) هي الحروف الطويلة. هل تجدينها كلها؟', '', null, null, true);
      else c.coach('Here is the next one. Find the BIG letters!', null, true, 'هيا إلى التالية. جدي الحروف الكبيرة!');
      $$('.ltr', c.area).forEach(el => el.onclick = () => {
        if (el.classList.contains('found')) return;
        const ch = el.textContent, w = words[+el.dataset.w].replace(/[^A-Za-z]/g, '');
        if (/[A-Z]/.test(ch)) {
          el.classList.add('found'); SFX.ok(); left--;
          const first = +el.dataset.w === 0 && +el.dataset.k === 0, isI = w === 'I';
          let en = `<b>${ch}</b> is a capital letter. Its small twin is <b>${ch.toLowerCase()}</b>. ` + (first ? 'It starts the sentence.' : isI ? 'The word I is always capital.' : `<b>${w}</b> is a special name.`);
          let ar = `<b>${ch}</b> حرف كبير، وتوأمه الصغير هو <b>${ch.toLowerCase()}</b>. ` + (first ? 'إنه في بداية الجملة.' : isI ? 'كلمة I (أنا) دائماً كبيرة.' : `<b>${w}</b> اسم خاص.`);
          if (left === 0) {
            $('#cnt', c.area).innerHTML = bi('You found them all! ✓', 'وجدتِها كلها! ✓'); sparkle($('.lwords', c.area));
            c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
          } else $('#cnt', c.area).innerHTML = cnt();
          c.coach(en, 'happy', false, ar);
        } else {
          shake(el); SFX.no(); c.miss();
          const up = ch.toUpperCase();
          c.coach(`<b>${ch}</b> is a small letter. Its capital twin looks like <b>${up}</b>. Look for the big ones!`, 'think', false,
            `<b>${ch}</b> حرف صغير. توأمه الكبير هو <b>${up}</b>. ابحثي عن الحروف الكبيرة!`);
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
      c.area.innerHTML = `${it.pic ? `<div class="scene${it.pic.startsWith('<') ? ' html' : ''}">${it.pic}</div>` : ''}<div class="sent">${esc(p0)}<span class="slot" id="slot">?</span>${esc(p1 || '')}</div>${it.sAr && curLang() === 'ar' ? `<p class="ar" dir="rtl" lang="ar" style="text-align:center">${it.sAr}</p>` : ''}
        <div class="row" style="justify-content:center"><button class="hear" id="hr">${SPK} Read to me</button></div>
        <div class="tray" id="tray">${bank.map(w => `<button class="chip" data-w="${esc(w)}">${esc(w)}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(it.s); $('#hr', c.area).onclick = () => say(it.s, true);
      if (i === 0) c.tell(a.start || 'Which word fits the gap? Tap it and watch it fly in!', a.startAr, '', it, null, true);
      else c.coach('Next sentence! Which word fits?', null, true);
      $$('.chip', c.area).forEach(ch => ch.onclick = () => {
        const w = ch.dataset.w;
        if (w === String(it.ans)) {
          const slot = $('#slot', c.area); slot.textContent = ''; $$('.chip', c.area).forEach(x => { x.disabled = true; });
          fly(ch, slot); SFX.ok();
          setTimeout(() => { if (!c.alive()) return; slot.textContent = w; slot.classList.add('ok'); sparkle(slot); }, 480);
          const en = it.why || tpl(a.why || '{w} fits the sentence!', w, it);
          const ar = it.whyAr || (a.whyAr ? tpl(a.whyAr, w, it) : (!it.why && !a.why ? tpl(AR['{w} fits the sentence!'], w, it) : undefined));
          c.coach(en, 'happy', true, ar); say(en + '. ' + it.s.replace('___', w), false, ar);
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          shake(ch); setTimeout(() => ch.classList.add('used'), 380); SFX.no(); c.miss();
          c.tell(it.hint || a.hint || 'Read the sentence with {w} in the gap. Does it make sense?', it.hintAr || a.hintAr, w, it, 'think');
        }
      });
    };
    show();
  },

  /* match words to meanings (or capitals to small letters) */
  match(a, c) {
    const pairs = pick(a.pairs, a.pick || 4), cols = ['#FF8A3D', '#7C4DFF', '#22B566', '#F0466B', '#2E9BF0', '#E0A21A'];
    let done = 0, L = null, R = null;
    const ask = a.ask || 'Tap a word, then tap what it means.';
    c.area.innerHTML = `<p class="count">${bi(ask, a.askAr || AR[ask])}</p><div class="match${a.big ? ' bigl' : ''}"><div class="mcol">${shuffle(pairs.map((_, k) => k)).map(k => `<button class="mc w" data-k="${k}">${pairs[k][2] ? `<span class="e">${pairs[k][2]}</span>` : ''}${esc(pairs[k][0])}</button>`).join('')}</div>
      <div class="mcol">${shuffle(pairs.map((_, k) => k)).map(k => `<button class="mc m" data-k="${k}">${esc(pairs[k][1])}${pairs[k][4] && curLang() === 'ar' ? `<span class="ar" dir="rtl" lang="ar">${pairs[k][4]}</span>` : ''}</button>`).join('')}</div></div>`;
    c.tell(a.start || 'Find the meaning for each word!', a.startAr);
    const check = () => {
      if (!L || !R) return;
      const k = +L.dataset.k, pr = pairs[k];
      if (L.dataset.k === R.dataset.k) {
        const col = cols[done % cols.length];
        [L, R].forEach(el => { el.classList.remove('sel'); el.style.setProperty('--pc', col); el.classList.add('done'); });
        if (!RM) R.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-14px)' }, { transform: 'none' }], { duration: 400 });
        SFX.ok(); sparkle(R); done++; c.progress(done / pairs.length);
        if (a.why) c.coach(a.why(pr), 'happy', false, a.whyAr ? a.whyAr(pr) : undefined);
        else c.coach(`<b>${esc(pr[0])}</b> means ${esc(pr[1])}.${pr[3] ? `<br>“${esc(pr[3])}”` : ''}`, 'happy', false, pr[4] ? `<b>${esc(pr[0])}</b> معناها: ${pr[4]}` : undefined);
        if (done === pairs.length) setTimeout(() => c.finish(), 2200);
      } else {
        shake(L); shake(R); SFX.no(); c.miss();
        if (a.hint) c.coach(a.hint(pr), 'think', false, a.hintAr ? a.hintAr(pr) : undefined);
        else c.coach(`Not that one. Read the meanings again. Which one tells us what <b>${esc(pr[0])}</b> means?`, 'think', false, `ليست هذه. اقرئي المعاني مرة أخرى. أيها معنى <b>${esc(pr[0])}</b>؟`);
        [L, R].forEach(el => el.classList.remove('sel'));
      }
      L = R = null;
    };
    $$('.mc', c.area).forEach(el => el.onclick = () => {
      const isW = el.classList.contains('w'), k = +el.dataset.k;
      if (isW) { if (L) L.classList.remove('sel'); L = el; say(a.sayL ? a.sayL(pairs[k]) : pairs[k][0]); } else { if (R) R.classList.remove('sel'); R = el; say(a.sayR ? a.sayR(pairs[k]) : pairs[k][1]); }
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
      c.area.innerHTML = `<p class="count">${bi('Which letters make the long-a sound <b>/ā/</b>?', 'أي حروف تنطق صوت <b>/ā/</b> (اي)؟')}</p>${wordBox(it.w, it.pic, 'id="bw"')}
        <div class="opts">${opts.map(k => `<button class="pchip" data-p="${k}" style="--pc:${P[k].color}">${P[k].label}</button>`).join('')}</div><button class="big wide" id="nx" hidden>Next ▶</button>`;
      say(it.w); $('#bw', c.area).onclick = () => say(it.w, true);
      c.coach(i === 0 ? 'Tap the word to hear it. Then tap the letters that say /ā/.' : 'Listen to the next word!', null, true);
      $$('.pchip', c.area).forEach(b => b.onclick = () => {
        if (b.disabled) return;
        if (b.dataset.p === it.p) {
          b.classList.add('ok'); $$('.pchip', c.area).forEach(x => { x.disabled = true; }); lightUp($('#bw', c.area), it.w, it.p, P[it.p].color); SFX.ok();
          if (it.p === 'a_e') c.coach(`In <b>${it.w}</b>, the <b>a</b> and the magic <b>e</b> work together. The e is quiet, and it makes the a say its name: /ā/!`, 'happy', false,
            `في كلمة <b>${it.w}</b>، حرف <b>a</b> وحرف <b>e</b> السحري يعملان معاً. حرف e لا يُنطق، لكنه يجعل a يقول اسمه: /ā/!`);
          else c.coach(`In <b>${it.w}</b>, the letters <b>${P[it.p].label}</b> team up to say /ā/.`, 'happy', false, `في كلمة <b>${it.w}</b>، الحرفان <b>${P[it.p].label}</b> يتعاونان لنطق صوت /ā/.`);
          c.next($('#nx', c.area), () => { i++; i < items.length ? show() : c.finish(); });
        } else {
          b.classList.add('no'); b.disabled = true; SFX.no(); c.miss();
          c.coach(`Look again! Can you find the letters <b>${P[b.dataset.p].label}</b> in <b>${it.w}</b>? Tap the word to hear it.`, 'think', false,
            `انظري مرة أخرى! هل تجدين الحروف <b>${P[b.dataset.p].label}</b> في كلمة <b>${it.w}</b>؟ اضغطي على الكلمة لتسمعيها.`);
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
      c.area.innerHTML = `<div class="q">${bi('Both words say /ā/. Do they use the same letters to make it?', 'الكلمتان فيهما صوت /ā/. هل تستخدمان نفس الحروف؟')}</div>
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
          if (same) c.coach(`Both use <b>${P[p1].label}</b>. Same sound, same letters!`, 'happy', false, `الكلمتان تستخدمان <b>${P[p1].label}</b>. نفس الصوت ونفس الحروف!`);
          else c.coach(`Both say /ā/, but <b>${x1[0]}</b> uses <b>${P[p1].label}</b> and <b>${x2[0]}</b> uses <b>${P[p2].label}</b>. Same sound, different letters!`, 'happy', false,
            `الكلمتان فيهما صوت /ā/، لكن <b>${x1[0]}</b> تستخدم <b>${P[p1].label}</b> و<b>${x2[0]}</b> تستخدم <b>${P[p2].label}</b>. نفس الصوت بحروف مختلفة!`);
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
