/* Foundation lesson (not from a worksheet): capital and small letters. English + Arabic.
   Built because she mixes up capital and small letters. */
(function () {
  const AZ = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  /* look-alike letters she might confuse */
  const SMALL_TRAPS = { A: 'eod', B: 'dpq', D: 'bpq', E: 'aco', F: 'tlk', G: 'qyj', H: 'nkb', I: 'ljt', J: 'igy', L: 'itj', M: 'nwu', N: 'mhu', P: 'qbd', Q: 'pgd', R: 'nht', T: 'fli', Y: 'gvj' };
  const BIG_TRAPS = { a: 'RHV', b: 'DPR', d: 'BOP', e: 'FBL', g: 'CQO', h: 'NKM', n: 'MHZ', q: 'OGP', r: 'PBK', t: 'FLI', m: 'NWH', l: 'ITJ', f: 'TEP' };
  const findSmall = Object.keys(SMALL_TRAPS).map(C => {
    const c = C.toLowerCase();
    return { q: `Which is the <span class="hl">small</span> letter for <span class="hl">${C}</span>?`, qAr: `ما هو الحرف الصغير لحرف <b>${C}</b>؟`, read: `Which is the small letter for capital ${C}?`,
      opts: [c, ...SMALL_TRAPS[C].split('')], ans: c,
      why: `<b>${C}</b> and <b>${c}</b> are twins. Same letter, same sound!`, whyAr: `<b>${C}</b> و <b>${c}</b> توأمان: نفس الحرف ونفس الصوت!` };
  });
  const findBig = Object.keys(BIG_TRAPS).map(c => {
    const C = c.toUpperCase();
    return { q: `Which is the <span class="hl">capital</span> letter for <span class="hl">${c}</span>?`, qAr: `ما هو الحرف الكبير لحرف <b>${c}</b>؟`, read: `Which is the capital letter for small ${c}?`,
      opts: [C, ...BIG_TRAPS[c].split('')], ans: C,
      why: `Small <b>${c}</b> grows up into capital <b>${C}</b>. Same letter, same sound!`, whyAr: `الحرف الصغير <b>${c}</b> يكبر فيصبح <b>${C}</b>. نفس الحرف ونفس الصوت!` };
  });
  const SHOW_LETTERS = 'AaBbDdEeGgHhNnQqRrTtMmFf'.split('');
  const bigOrSmall = SHOW_LETTERS.map(ch => {
    const big = ch === ch.toUpperCase(), twin = big ? ch.toLowerCase() : ch.toUpperCase();
    return { q: 'Is this a <span class="hl">capital</span> letter or a <span class="hl">small</span> letter?', qAr: 'هل هذا حرف كبير أم حرف صغير؟', read: `Is this letter ${ch}, a capital letter, or a small letter?`,
      pic: linesSVG([ch]), opts: ['capital', 'small'], keep: true, ans: big ? 'capital' : 'small',
      why: big ? `<b>${ch}</b> is a capital letter. It is tall and touches the top line. Its small twin is <b>${twin}</b>.` : `<b>${ch}</b> is a small letter. Its capital twin is <b>${twin}</b>.`,
      whyAr: big ? `<b>${ch}</b> حرف كبير. إنه طويل ويلمس الخط العلوي. توأمه الصغير هو <b>${twin}</b>.` : `<b>${ch}</b> حرف صغير. توأمه الكبير هو <b>${twin}</b>.`,
      hint: 'Look at the blue top line. Does the letter touch it? Is it the big shape or the little shape?', hintAr: 'انظري إلى الخط الأزرق في الأعلى. هل يلمسه الحرف؟ هل هو الشكل الكبير أم الصغير؟' };
  });

  addLesson({
    id: 'big-small-letters', island: 'letters', added: '2026-11-03', pic: '🔠',
    title: 'Big and Small Letters', sub: 'Capital letters and their small twins',
    learn: [
      { title: 'Every letter has two shapes', titleAr: 'لكل حرف إنجليزي شكلان',
        text: 'A <b>capital</b> letter is the BIG shape. A <b>small</b> letter is the little shape. They are twins: same letter, same sound! Tap a card.',
        textAr: 'الحرف الكبير (capital) هو الشكل الكبير، والحرف الصغير (small) هو الشكل الصغير. هما توأمان: نفس الحرف ونفس الصوت! اضغطي على البطاقة.',
        show: { kind: 'twins', pairs: [['A', 'a'], ['B', 'b'], ['G', 'g'], ['R', 'r']] } },
      { title: 'Just like Arabic letters!', titleAr: 'تماماً مثل الحروف العربية!',
        text: 'In Arabic, <b>ب</b> changes its shape at the start, middle and end of a word, but it is still the same letter. English letters have two shapes too: <b>B</b> and <b>b</b>.',
        textAr: 'حرف الباء يتغيّر شكله في أول الكلمة ووسطها وآخرها، لكنه يبقى حرف الباء. كذلك الحرف الإنجليزي له شكلان: <b>B</b> الكبير و <b>b</b> الصغير.',
        show: { kind: 'forms', ar: ['ب', 'بـ', 'ـبـ', 'ـب'], en: ['B', 'b'] } },
      { title: 'Capital letters are tall', titleAr: 'الحروف الكبيرة طويلة',
        text: 'Capital letters touch the <b>blue top line</b>. Most small letters stop at the <b>dashed middle line</b>.',
        textAr: 'الحروف الكبيرة تلمس <b>الخط الأزرق العلوي</b>. ومعظم الحروف الصغيرة تقف عند <b>الخط المتقطّع في الوسط</b>.',
        show: { kind: 'lines', chars: ['A', 'a', 'E', 'e', 'R', 'r', 'M', 'm'] } },
      { title: 'Some small letters are tricky', titleAr: 'بعض الحروف الصغيرة صعبة قليلاً',
        text: 'Small <b>b, d, h</b> are tall too. Small <b>g, p, y</b> have tails that hang below the red line. But they are still small letters!',
        textAr: 'الحروف الصغيرة <b>b و d و h</b> طويلة أيضاً. والحروف <b>g و p و y</b> لها ذيل ينزل تحت الخط الأحمر. لكنها تبقى حروفاً صغيرة!',
        show: { kind: 'lines', chars: ['b', 'd', 'h', 'g', 'p', 'y'] } },
      { title: 'Meet all 26 twins', titleAr: 'تعرّفي على التوائم الستة والعشرين',
        text: 'Green twins look the same, just bigger. Orange twins look different, so learn them well! Tap each one to hear it.',
        textAr: 'التوائم الخضراء شكلها واحد لكن أكبر. والتوائم البرتقالية شكلها مختلف، فتعلّميها جيداً! اضغطي على كل حرف لتسمعيه.',
        show: { kind: 'abc' } },
      { title: "Don't mix up b, d, p and q!", titleAr: 'لا تخلطي بين b و d و p و q!',
        text: 'They look like mirror letters. Remember a word for each one. Tap them!',
        textAr: 'تبدو مثل حروف في المرآة. تذكّري كلمة لكل حرف. اضغطي عليها!',
        show: { kind: 'chips', items: [['🦇', 'b  bat', 'b, for bat'], ['🐶', 'd  dog', 'd, for dog'], ['🐷', 'p  pig', 'p, for pig'], ['👑', 'q  queen', 'q, for queen']] } },
      { title: 'When do we write a capital?', titleAr: 'متى نكتب الحرف الكبير؟',
        text: '1. At the <b>start</b> of a sentence. 2. For <b>special names</b> (Sara, Riyadh). 3. For the word <b>I</b>.',
        textAr: '١. في <b>بداية</b> الجملة. ٢. في <b>أسماء الأعلام</b> مثل Sara و Riyadh. ٣. في كلمة <b>I</b> (أنا).',
        show: { kind: 'capfix', sentence: 'My name is Sara and I live in Riyadh.' } },
    ],
    acts: [
      {
        type: 'match', title: 'Match the twins', pick: 5, big: true,
        ask: 'Tap a capital letter, then tap its small twin.', askAr: 'اضغطي على الحرف الكبير، ثم على توأمه الصغير.',
        start: 'Find the small twin for each big letter!', startAr: 'جدي التوأم الصغير لكل حرف كبير!',
        pairs: AZ.map(C => [C, C.toLowerCase()]),
        sayL: p => 'capital ' + p[0], sayR: p => 'small ' + p[1],
        why: p => `Capital <b>${p[0]}</b> and small <b>${p[1]}</b> are twins. Same letter, same sound!`,
        whyAr: p => `<b>${p[0]}</b> الكبير و <b>${p[1]}</b> الصغير توأمان: نفس الحرف ونفس الصوت!`,
        hint: p => `Say the name of <b>${p[0]}</b>. Find the small letter with the same name.`,
        hintAr: p => `قولي اسم الحرف <b>${p[0]}</b>. ابحثي عن الحرف الصغير الذي له نفس الاسم.`,
      },
      {
        type: 'mc', title: 'Capital or small?', pick: 8,
        start: 'Look at the lines. Is the letter big or small?', startAr: 'انظري إلى الخطوط. هل الحرف كبير أم صغير؟',
        items: bigOrSmall,
      },
      {
        type: 'mc', title: 'Find the twin', pick: 8, big: true,
        start: 'Careful! Some letters look alike. Find the real twin.', startAr: 'انتبهي! بعض الحروف متشابهة. جدي التوأم الحقيقي.',
        hint: 'Say the letter name out loud. Which one has the same name?', hintAr: 'قولي اسم الحرف بصوت عالٍ. أي حرف له نفس الاسم؟',
        items: findSmall.concat(findBig),
      },
      {
        type: 'sort', title: 'Sort big and small', pick: 10, big: true,
        ask: 'Drag each letter into the right box.', askAr: 'اسحبي كل حرف إلى الصندوق الصحيح.',
        start: 'Big letters go in one box, small letters in the other!', startAr: 'الحروف الكبيرة في صندوق، والحروف الصغيرة في الصندوق الآخر!',
        hint: 'Is {w} the big shape or the little shape? Compare it with its twin.', hintAr: 'هل {w} هو الشكل الكبير أم الصغير؟ قارنيه بتوأمه.',
        buckets: [
          { label: 'Capital letters', labelAr: 'حروف كبيرة', pic: '🐘', why: '{w} is a capital letter!', whyAr: '{w} حرف كبير!' },
          { label: 'small letters', labelAr: 'حروف صغيرة', pic: '🐭', why: '{w} is a small letter!', whyAr: '{w} حرف صغير!' },
        ],
        items: 'ABDEFGHLMNQRTY'.split('').flatMap(C => [[C, 0], [C.toLowerCase(), 1]]),
      },
      {
        type: 'tapletters', title: 'Capital letter hunt', pick: 5,
        items: ['My name is Sara.', 'I live in Riyadh.', 'Ali and Omar play football.', 'We went to Jeddah on Friday.', 'My cat Milo likes milk.', 'Laura sailed to India.',
          'Today is Sunday.', 'Noura has a red bike.', 'I love my school.', 'The Red Sea is blue.', 'Faisal and I read a book.'],
      },
      {
        type: 'caps', title: 'Fix the sentence', pick: 4,
        start: 'These sentences forgot their capitals. Tap each word that needs one!', startAr: 'هذه الجمل نسيت حروفها الكبيرة. اضغطي على كل كلمة تحتاج حرفاً كبيراً!',
        items: ['My sister and I like to read.', 'Sara and I went to the park.', 'We live in Riyadh.', 'On Friday I visit my grandma.', 'Ali has a dog named Max.', 'I can see the Red Sea.', 'Noura plays with Huda.'],
      },
    ],
  });
})();
