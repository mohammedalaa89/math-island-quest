/* لغتي G3 (her book, volume 1) – مراجعة المكتسبات السابقة: اللام الشمسية والقمرية، والتنوين. Arabic-only lessons. */
(function () {
  const SUN = 'ت ث د ذ ر ز س ش ص ض ط ظ ل ن'.split(' ');
  const MOON = 'أ ب ج ح خ ع غ ف ق ك م ه و ي'.split(' ');
  const SUNW = [['السماء', '🌌'], ['الصلاة', '🕌'], ['النمل', '🐜'], ['الطريق', '🛣️'], ['الليل', '🌃'], ['الشمس', '☀️'], ['التفاح', '🍎'], ['الثعلب', '🦊'], ['الدرس', '📖'],
    ['الذهب', '🥇'], ['الرياض', '🏙️'], ['الزهرة', '🌸'], ['الشجرة', '🌳'], ['الضوء', '💡'], ['الظل', '⛱️'], ['النجمة', '⭐'], ['السيارة', '🚗']];
  const MOONW = [['البيت', '🏠'], ['القمر', '🌙'], ['الكتاب', '📘'], ['الولد', '👦'], ['الباب', '🚪'], ['الجمل', '🐪'], ['الحديقة', '🌳'], ['الفيل', '🐘'], ['المدرسة', '🏫'],
    ['العين', '👁️'], ['الهاتف', '📱'], ['اليد', '✋'], ['الأرض', '🌍'], ['الخبز', '🍞'], ['الغيمة', '☁️'], ['الكرة', '⚽']];
  const third = w => w.replace(/^ال/, '')[0];

  addLesson({
    id: 'lam-shamsiya', island: 'shamsiya', lang: 'ar', added: '2026-11-03', pic: '☀️',
    title: 'اللام الشمسية واللام القمرية', sub: 'متى نقرأ اللام ومتى لا نقرؤها؟',
    learn: [
      { title: 'قبيلتان من الحروف', text: '«ال» تدخل على الكلمات. أحياناً <b>نقرأ</b> اللام، وأحياناً <b>لا نقرؤها</b>. السرّ في الحرف الذي بعد اللام!',
        show: { kind: 'html', html: '<div class="row" style="justify-content:center;gap:22px;font-size:2.2rem"><span class="pop">☀️ الشَّمس</span><span class="pop" style="animation-delay:.8s">🌙 القَمَر</span></div>' } },
      { title: 'اللام القمرية: نقرؤها 🌙', text: 'في <b>القَمَر</b> نقول «ال-قمر»: اللام <b>تُقرأ</b> وعليها سكون. وتأتي قبل هذه الحروف:',
        show: { kind: 'html', html: `<div class="chipsrow">${MOON.map((h, j) => `<span class="ochip pop" style="animation-delay:${j * .1}s;font-size:1.6rem">${h}</span>`).join('')}</div><p class="muted">ابغِ حجك وخف عقيمه</p>` } },
      { title: 'اللام الشمسية: لا نقرؤها ☀️', text: 'في <b>الشَّمس</b> نقول «اشّمس»: اللام <b>لا تُقرأ</b>، والحرف بعدها عليه <b>شدّة</b> ( ّ ). وتأتي قبل هذه الحروف:',
        show: { kind: 'html', html: `<div class="chipsrow">${SUN.map((h, j) => `<span class="ochip pop" style="animation-delay:${j * .1}s;font-size:1.6rem;color:#FF8A3D">${h}</span>`).join('')}</div>` } },
      { title: 'كيف أعرف؟', text: 'انظري إلى الحرف الذي <b>بعد اللام مباشرة</b>. إذا كان عليه شدّة فاللام <b>شمسية</b>، وإذا كانت اللام عليها سكون فهي <b>قمرية</b>.',
        show: { kind: 'chips', items: [['☀️', 'السَّماء ← شمسية'], ['☀️', 'النَّمل ← شمسية'], ['🌙', 'البَيت ← قمرية'], ['🌙', 'الكِتاب ← قمرية']] } },
    ],
    acts: [
      { type: 'sort', title: 'شمسية أم قمرية؟', pick: 10, big: true,
        ask: 'اسحبي كل كلمة إلى الصندوق الصحيح.', start: 'انظري إلى الحرف الذي بعد «ال». هل نقرأ اللام؟',
        hint: 'اقرئي {w} بصوت عالٍ. هل تسمعين اللام؟',
        buckets: [
          { label: 'لام شمسية ☀️', pic: '', why: 'في {w} لا نقرأ اللام، فهي <b>لام شمسية</b>.' },
          { label: 'لام قمرية 🌙', pic: '', why: 'في {w} نقرأ اللام، فهي <b>لام قمرية</b>.' },
        ],
        items: SUNW.map(w => [w[0], 0]).concat(MOONW.map(w => [w[0], 1])) },
      { type: 'mc', title: 'أين الحرف السرّي؟', pick: 6,
        start: 'ما الحرف الذي يأتي بعد «ال»؟ هو الذي يحدّد نوع اللام!',
        items: SUNW.concat(MOONW).map(([w, pic]) => { const sun = SUNW.some(x => x[0] === w); return {
          q: `اللام في كلمة <span class="hl">${w}</span>:`, pic, opts: ['شمسية ☀️', 'قمرية 🌙'], keep: true, ans: sun ? 'شمسية ☀️' : 'قمرية 🌙',
          why: sun ? `بعد «ال» حرف <b>${third(w)}</b>، وهو من الحروف الشمسية، فلا نقرأ اللام.` : `بعد «ال» حرف <b>${third(w)}</b>، وهو من الحروف القمرية، فنقرأ اللام.`,
          hint: `انظري إلى الحرف <b>${third(w)}</b> الذي بعد اللام، واقرئي الكلمة بصوت عالٍ.` }; }) },
    ],
  });

  const TAN = [['سبورة', '🧑‍🏫'], ['فناء', '🏫'], ['صيف', '☀️'], ['بدر', '🌕'], ['حديقة', '🌳'], ['كتاب', '📘'], ['قلم', '✏️'], ['ولد', '👦'], ['بيت', '🏠'], ['شجرة', '🌳'], ['باب', '🚪']];
  const endsTaa = w => /[ةء]$/.test(w);
  const forms = w => ({ damm: w + 'ٌ', kasr: w + 'ٍ', fath: endsTaa(w) ? w + 'ً' : w + 'اً' });

  addLesson({
    id: 'tanween', island: 'tanween', lang: 'ar', added: '2026-11-03', pic: '✨',
    title: 'التنوين', sub: 'ضمّتان، فتحتان، كسرتان',
    learn: [
      { title: 'ما التنوين؟', text: 'التنوين <b>نون ساكنة</b> نسمعها في آخر الكلمة <b>ولا نكتبها</b>. نكتب بدلها حركتين.',
        show: { kind: 'html', html: '<p class="eqn pop" style="font-size:2.4rem">كتابٌ</p><p class="eqn pop" style="animation-delay:.8s">نقرؤها: كتابُنْ</p>' } },
      { title: 'ثلاثة أنواع للتنوين', text: '<b>تنوين الضم</b> ( ٌ ) يُقرأ «ـُنْ»، و<b>تنوين الفتح</b> ( ً ) يُقرأ «ـَنْ»، و<b>تنوين الكسر</b> ( ٍ ) يُقرأ «ـِنْ».',
        show: { kind: 'html', html: '<div class="row" style="justify-content:center;gap:16px;font-size:2.2rem"><span class="ochip pop">كتابٌ</span><span class="ochip pop" style="animation-delay:.6s">كتاباً</span><span class="ochip pop" style="animation-delay:1.2s">كتابٍ</span></div>' } },
      { title: 'تنوين الفتح يحب الألف', text: 'نضيف <b>ألفاً</b> مع تنوين الفتح: كتاباً، قلماً. إلا إذا انتهت الكلمة بـ<b>تاء مربوطة</b> (ة) فلا نضيف ألفاً: حديقةً، سبورةً.',
        show: { kind: 'chips', items: [['📘', 'كتاباً'], ['✏️', 'قلماً'], ['🌳', 'حديقةً'], ['🧑‍🏫', 'سبورةً']] } },
      { title: 'التنوين لا يجتمع مع «ال»', text: 'نقول <b>كتابٌ</b> أو <b>الكتابُ</b>، لكن لا نقول «الكتابٌ». إذا دخلت «ال» ذهب التنوين!',
        show: { kind: 'html', html: '<div class="row" style="justify-content:center;gap:18px;font-size:2rem"><span class="ochip pop">✔️ كتابٌ</span><span class="ochip pop" style="animation-delay:.6s">✔️ الكتابُ</span><span class="ochip pop" style="animation-delay:1.2s;opacity:.6">✖️ الكتابٌ</span></div>' } },
    ],
    acts: [
      { type: 'mc', title: 'ما نوع التنوين؟', pick: 8, big: true,
        start: 'انظري إلى آخر الكلمة. ما نوع التنوين؟',
        items: TAN.flatMap(([w, pic]) => { const f = forms(w); return [
          { q: `ما نوع التنوين في <span class="hl">${f.damm}</span>؟`, pic, opts: ['تنوين الضم', 'تنوين الفتح', 'تنوين الكسر'], keep: true, ans: 'تنوين الضم', why: `<b>${f.damm}</b>: ضمّتان في آخرها، نقرؤها «ـُنْ».`, hint: 'انظري: هل الحركتان فوق الحرف أم تحته؟ وهل تشبهان الضمة؟' },
          { q: `ما نوع التنوين في <span class="hl">${f.fath}</span>؟`, pic, opts: ['تنوين الضم', 'تنوين الفتح', 'تنوين الكسر'], keep: true, ans: 'تنوين الفتح', why: `<b>${f.fath}</b>: فتحتان في آخرها، نقرؤها «ـَنْ».`, hint: 'انظري: هل الحركتان فوق الحرف أم تحته؟' },
          { q: `ما نوع التنوين في <span class="hl">${f.kasr}</span>؟`, pic, opts: ['تنوين الضم', 'تنوين الفتح', 'تنوين الكسر'], keep: true, ans: 'تنوين الكسر', why: `<b>${f.kasr}</b>: كسرتان تحت آخرها، نقرؤها «ـِنْ».`, hint: 'انظري: هل الحركتان تحت الحرف؟' },
        ]; }) },
      { type: 'mc', title: 'أنوّن الكلمة', pick: 6, big: true,
        start: 'اختاري الكتابة الصحيحة لتنوين الفتح.',
        items: TAN.map(([w, pic]) => { const f = forms(w), wrong = endsTaa(w) ? w + 'اً' : w + 'ً'; return {
          q: `اكتبي <span class="hl">${w}</span> بتنوين الفتح:`, pic, opts: [f.fath, wrong, f.damm], ans: f.fath,
          why: endsTaa(w) ? `<b>${w}</b> تنتهي بتاء مربوطة أو همزة، فلا نضيف ألفاً: <b>${f.fath}</b>.` : `مع تنوين الفتح نضيف ألفاً: <b>${f.fath}</b>.`,
          hint: 'تذكّري: تنوين الفتح يحتاج ألفاً، إلا مع التاء المربوطة.' }; }) },
      { type: 'mc', title: 'أين الخطأ؟', pick: 4,
        start: 'تذكّري: التنوين لا يجتمع مع «ال».',
        items: [['كتاب', 'الكتاب'], ['قلم', 'القلم'], ['ولد', 'الولد'], ['بيت', 'البيت'], ['باب', 'الباب']].map(([w, al]) => ({
          q: 'أيّ كلمة <span class="hl">خطأ</span>؟', opts: [al + 'ٌ', w + 'ٌ', al + 'ُ'], ans: al + 'ٌ',
          why: `<b>${al}ٌ</b> خطأ، لأن التنوين لا يجتمع مع «ال». الصواب: <b>${w}ٌ</b> أو <b>${al}ُ</b>.`, hint: 'ابحثي عن كلمة فيها «ال» وتنوين معاً.' })) },
    ],
  });
})();
