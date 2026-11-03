/* enVision Mathematics Grade 3, Topic 11: Use operations with whole numbers to solve problems (Common Core 3.OA.8).
   Choosing the operation, letters for unknown numbers, two-step word problems with bar models. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const OPTS = (ans, wrongs) => {
    const out = [String(ans)];
    for (const w of wrongs.concat([ans + 1, ans - 1, ans + 2, ans + 10])) { const s = String(w); if (out.length < 4 && w >= 0 && !out.includes(s)) out.push(s); }
    return out;
  };
  const SOPTS = (ans, wrongs) => [...new Set([ans, ...wrongs])].slice(0, 4);
  /* bar model: segments [[label, flex, colour]] with an optional total brace on top */
  const BAR = (segs, total, delay) => `<div class="pop" style="width:min(100%,360px);animation-delay:${delay || 0}s">${total ? `<div style="text-align:center;font-weight:800;border:2px solid #1E2A44;border-bottom:0;border-radius:10px 10px 0 0;padding:2px;margin-bottom:4px">${total}</div>` : ''}
    <div style="display:flex;gap:3px">${segs.map(s => `<div style="flex:${s[1]};background:${s[2] || '#FFC83D'};border-radius:8px;padding:8px 2px;text-align:center;font-weight:800;color:#1E2A44;min-width:0">${s[0]}</div>`).join('')}</div></div>`;
  const GIRLS = [['Noura', 'نورة'], ['Reem', 'ريم'], ['Lulu', 'لولو'], ['Huda', 'هدى'], ['Sara', 'سارة'], ['Lana', 'لانا'], ['Jana', 'جنى']];
  const LET = ['n', 'm', 'k', 'x', 'b', 'p'];

  /* quiz 1: which operation? */
  const OPS = [
    { label: 'Add +', labelAr: 'الجمع +', pic: '➕', why: '<b>{w}</b>: groups join together, so we add.', whyAr: '<b>{w}</b>: مجموعات تجتمع معاً، إذن نجمع (add).' },
    { label: 'Subtract −', labelAr: 'الطرح −', pic: '➖', why: '<b>{w}</b>: some are taken away or we compare, so we subtract.', whyAr: '<b>{w}</b>: يُؤخذ بعضها أو نقارن، إذن نطرح (subtract).' },
    { label: 'Multiply ×', labelAr: 'الضرب ×', pic: '✖️', why: '<b>{w}</b>: equal groups, and we want the total, so we multiply.', whyAr: '<b>{w}</b>: مجموعات متساوية ونريد المجموع، إذن نضرب (multiply).' },
    { label: 'Divide ÷', labelAr: 'القسمة ÷', pic: '➗', why: '<b>{w}</b>: we share a total into equal groups, so we divide.', whyAr: '<b>{w}</b>: نوزّع المجموع على مجموعات متساوية، إذن نقسم (divide).' },
  ];
  const opItems = [
    ['8 red cars and 6 blue cars', 0], ['had 12, got 5 more', 0], ['9 girls and 7 boys in all', 0], ['25 shells, found 10 more', 0], ['3 cats, 4 dogs: how many pets?', 0],
    ['had 15, ate 6', 1], ['20 birds, 8 flew away', 1], ['14 is how many more than 9?', 1], ['30 balloons, 12 popped', 1], ['50 riyals, spent 18', 1],
    ['4 bags with 6 apples each', 2], ['5 rows of 3 chairs', 2], ['3 boxes, 8 pens in each', 2], ['7 weeks, 2 books a week', 2], ['6 plates, 5 dates on each', 2],
    ['18 cookies shared by 3', 3], ['24 kids in teams of 4', 3], ['12 eggs, 2 in each cup', 3], ['20 riyals split by 5 girls', 3], ['35 flowers in 5 equal vases', 3],
  ];

  /* quiz 2: a letter stands for the unknown */
  const unknown = []; const seen = new Set();
  while (unknown.length < 48) {
    const L = ANY(LET), a = R(2, 9), b = R(2, 9), kind = unknown.length % 4; let q, ans, why, whyAr, hint, hintAr;
    if (kind === 0) { q = `${L} × ${a} = ${a * b}`; ans = b; why = `What times ${a} makes ${a * b}? ${b} × ${a} = ${a * b}, so <b>${L} = ${b}</b>.`; whyAr = `ما العدد الذي إذا ضربناه في ${a} يعطي ${a * b}؟ ${b} × ${a} = ${a * b}، إذن <b>${L} = ${b}</b>.`; hint = `Think of the ${a} times table.`; hintAr = `فكّري في جدول ضرب العدد ${a}.`; }
    else if (kind === 1) { q = `${a * b} ÷ ${a} = ${L}`; ans = b; why = `Use multiplication: ${a} × ${b} = ${a * b}, so ${a * b} ÷ ${a} = <b>${b}</b>. <b>${L} = ${b}</b>.`; whyAr = `نستخدم الضرب: ${a} × ${b} = ${a * b}، إذن ${a * b} ÷ ${a} = <b>${b}</b>. <b>${L} = ${b}</b>.`; hint = `Ask: ${a} times what makes ${a * b}?`; hintAr = `اسألي: ${a} ضرب كم يساوي ${a * b}؟`; }
    else if (kind === 2) { const x = R(12, 60), y = R(5, 40); q = `${x} + ${L} = ${x + y}`; ans = y; why = `The missing part is the whole minus the part: ${x + y} − ${x} = ${y}. So <b>${L} = ${y}</b>.`; whyAr = `الجزء الناقص = الكل − الجزء: ${x + y} − ${x} = ${y}. إذن <b>${L} = ${y}</b>.`; hint = `Start at ${x}. How much more to reach ${x + y}?`; hintAr = `ابدئي من ${x}. كم نحتاج لنصل إلى ${x + y}؟`; }
    else { const x = R(30, 90), y = R(5, x - 10); q = `${x} − ${L} = ${x - y}`; ans = y; why = `How much was taken from ${x} to leave ${x - y}? ${x} − ${x - y} = ${y}. So <b>${L} = ${y}</b>.`; whyAr = `كم أخذنا من ${x} ليبقى ${x - y}؟ ${x} − ${x - y} = ${y}. إذن <b>${L} = ${y}</b>.`; hint = `Check each choice: put it in place of ${L}. Does the sentence work?`; hintAr = `جرّبي كل خيار مكان ${L}. هل تصبح الجملة صحيحة؟`; }
    if (seen.has(q)) continue; seen.add(q);
    unknown.push({ q: `${q}<br><small>What is <b>${L}</b>?</small>`, qAr: `${q}<br><small>ما قيمة <b>${L}</b>؟</small>`, read: `${q}. What is ${L}?`,
      opts: OPTS(ans, [ans + a, Math.abs(ans - a), ans * 2]), ans: String(ans), why, whyAr, hint, hintAr });
  }

  /* quiz 3: two-step problems */
  const two = [];
  for (let k = 0; k < 48; k++) {
    const [n, nA] = ANY(GIRLS), g = R(2, 6), e = R(3, 9), kind = k % 6; let q, qAr, ans, s1, why, whyAr, pic, wrong;
    if (kind === 0) { const r = R(2, g * e - 2); s1 = g * e; ans = s1 - r; pic = '⭐';
      q = `${n} has ${g} packs of stickers with ${e} in each pack. She gives away ${r}. How many stickers are left?`; qAr = `مع ${nA} ${g} علب ملصقات، في كل علبة ${e}. أعطت ${r} منها. كم ملصقاً بقي؟`;
      why = `Step 1: ${g} × ${e} = ${s1} stickers.<br>Step 2: ${s1} − ${r} = <b>${ans}</b> left.`; whyAr = `الخطوة 1: ${g} × ${e} = ${s1} ملصقاً.<br>الخطوة 2: ${s1} − ${r} = <b>${ans}</b> بقيت.`; wrong = [s1, s1 + r, g * e + e]; }
    else if (kind === 1) { const r = R(2, 9); s1 = g * e; ans = s1 + r; pic = '✏️';
      q = `There are ${g} boxes with ${e} pencils in each, and ${r} loose pencils. How many pencils in all?`; qAr = `هناك ${g} علب، في كل علبة ${e} أقلام، و${r} أقلام خارج العلب. كم قلماً كلها؟`;
      why = `Step 1: ${g} × ${e} = ${s1} pencils in boxes.<br>Step 2: ${s1} + ${r} = <b>${ans}</b>.`; whyAr = `الخطوة 1: ${g} × ${e} = ${s1} قلماً في العلب.<br>الخطوة 2: ${s1} + ${r} = <b>${ans}</b>.`; wrong = [s1, s1 - r, g + e + r]; }
    else if (kind === 2) { const a = R(20, 45), b = R(5, 15), c = R(4, 18); s1 = a + b; ans = s1 - c; pic = '🚌';
      q = `A bus has ${a} people. At a stop, ${b} get on and ${c} get off. How many people are on the bus now?`; qAr = `في الحافلة ${a} شخصاً. في المحطة صعد ${b} ونزل ${c}. كم شخصاً في الحافلة الآن؟`;
      why = `Step 1: ${a} + ${b} = ${s1} (people got on).<br>Step 2: ${s1} − ${c} = <b>${ans}</b> (people got off).`; whyAr = `الخطوة 1: ${a} + ${b} = ${s1} (صعد ناس).<br>الخطوة 2: ${s1} − ${c} = <b>${ans}</b> (نزل ناس).`; wrong = [s1, a - b + c, a + b + c]; }
    else if (kind === 3) { const r = R(2, 8), t = g * e + r; s1 = t - r; ans = e; pic = '🧁';
      q = `Mama made ${t} cupcakes. The family ate ${r}. She puts the rest equally on ${g} plates. How many on each plate?`; qAr = `صنعت ماما ${t} كعكة. أكلت العائلة ${r}. وضعت الباقي بالتساوي على ${g} أطباق. كم كعكة في كل طبق؟`;
      why = `Step 1: ${t} − ${r} = ${s1} cupcakes left.<br>Step 2: ${s1} ÷ ${g} = <b>${ans}</b> on each plate.`; whyAr = `الخطوة 1: ${t} − ${r} = ${s1} كعكة بقيت.<br>الخطوة 2: ${s1} ÷ ${g} = <b>${ans}</b> في كل طبق.`; wrong = [s1, e + 1, r + g]; }
    else if (kind === 4) { const t = g * e, a = R(3, t - 3), b = t - a; s1 = t; ans = e; pic = '📿';
      q = `${n} has ${a} beads and her sister has ${b}. They put all the beads into ${g} equal bags. How many beads in each bag?`; qAr = `مع ${nA} ${a} خرزة ومع أختها ${b} خرزة. وضعتا كل الخرز في ${g} أكياس بالتساوي. كم خرزة في كل كيس؟`;
      why = `Step 1: ${a} + ${b} = ${s1} beads.<br>Step 2: ${s1} ÷ ${g} = <b>${ans}</b> in each bag.`; whyAr = `الخطوة 1: ${a} + ${b} = ${s1} خرزة.<br>الخطوة 2: ${s1} ÷ ${g} = <b>${ans}</b> في كل كيس.`; wrong = [s1, e + 2, e - 1]; }
    else { const p = R(2, 5), m = R(10, 40); s1 = g * p; ans = m - s1; pic = '💵';
      if (ans < 1) { k--; continue; }
      q = `${n} has ${m} riyals. She buys ${g} notebooks that cost ${p} riyals each. How many riyals does she have left?`; qAr = `مع ${nA} ${m} ريالاً. اشترت ${g} دفاتر، ثمن الدفتر ${p} ريالات. كم ريالاً بقي معها؟`;
      why = `Step 1: ${g} × ${p} = ${s1} riyals spent.<br>Step 2: ${m} − ${s1} = <b>${ans}</b> riyals left.`; whyAr = `الخطوة 1: ${g} × ${p} = ${s1} ريالاً صرفتها.<br>الخطوة 2: ${m} − ${s1} = <b>${ans}</b> ريالاً بقيت.`; wrong = [s1, m - p, m - g]; }
    two.push({ q, qAr, pic, opts: OPTS(ans, wrong), ans: String(ans), why, whyAr,
      hint: 'This needs two steps. What do you need to find out first?', hintAr: 'هذه المسألة تحتاج خطوتين. ماذا تحتاجين أن تعرفي أولاً؟' });
  }

  /* quiz 4: which equation matches the story? */
  const eqs = [];
  for (let k = 0; k < 40; k++) {
    const [n, nA] = ANY(GIRLS), kind = k % 4; let q, qAr, ans, wr, why, whyAr, pic;
    if (kind === 0) { const b = R(3, 12), c = R(b + 5, 40); pic = '🐚';
      q = `${n} had some shells (<b>s</b>). She found ${b} more. Now she has ${c}.`; qAr = `كان مع ${nA} بعض الأصداف (<b>s</b>). وجدت ${b} أخرى. الآن معها ${c}.`;
      ans = `s + ${b} = ${c}`; wr = [`s − ${b} = ${c}`, `${b} × s = ${c}`, `s ÷ ${b} = ${c}`];
      why = `She found MORE, so we add ${b} to s. s = ${c} − ${b} = <b>${c - b}</b>.`; whyAr = `وجدت المزيد، إذن نجمع ${b} إلى s. و s = ${c} − ${b} = <b>${c - b}</b>.`; }
    else if (kind === 1) { const a = R(15, 40), c = R(3, a - 4); pic = '🐦';
      q = `There were ${a} birds. Some flew away (<b>b</b>). ${c} birds are left.`; qAr = `كان هناك ${a} طائراً. طار بعضها (<b>b</b>). بقي ${c} طيور.`;
      ans = `${a} − b = ${c}`; wr = [`${a} + b = ${c}`, `${a} × b = ${c}`, `b − ${a} = ${c}`];
      why = `Birds flew AWAY, so we subtract b from ${a}. b = ${a} − ${c} = <b>${a - c}</b>.`; whyAr = `طارت طيور، إذن نطرح b من ${a}. و b = ${a} − ${c} = <b>${a - c}</b>.`; }
    else if (kind === 2) { const g = R(2, 9), e = R(2, 9); pic = '🍏';
      q = `${g} bags each have the same number of apples (<b>a</b>). There are ${g * e} apples in all.`; qAr = `${g} أكياس، في كل كيس نفس العدد من التفاح (<b>a</b>). يوجد ${g * e} تفاحة كلها.`;
      ans = `${g} × a = ${g * e}`; wr = [`${g} + a = ${g * e}`, `a − ${g} = ${g * e}`, `${g * e} × ${g} = a`];
      why = `${g} equal groups of a make ${g * e}, so ${g} × a = ${g * e}. a = <b>${e}</b>.`; whyAr = `${g} مجموعات متساوية من a تساوي ${g * e}، إذن ${g} × a = ${g * e}. و a = <b>${e}</b>.`; }
    else { const g = R(2, 9), e = R(2, 9); pic = '🍪';
      q = `${g * e} cookies are shared equally by ${g} friends. Each friend gets <b>c</b> cookies.`; qAr = `${g * e} كعكة توزّع بالتساوي على ${g} صديقات. كل صديقة تأخذ <b>c</b> كعكة.`;
      ans = `${g * e} ÷ ${g} = c`; wr = [`${g * e} × ${g} = c`, `${g * e} − ${g} = c`, `${g} ÷ ${g * e} = c`];
      why = `Sharing equally is dividing: ${g * e} ÷ ${g} = c. c = <b>${e}</b>.`; whyAr = `التوزيع بالتساوي هو القسمة: ${g * e} ÷ ${g} = c. و c = <b>${e}</b>.`; }
    eqs.push({ q: q + '<br>Which equation matches?', qAr: qAr + '<br>أي معادلة تناسب القصة؟', pic, opts: SOPTS(ans, wr), ans, why, whyAr,
      hint: 'Is something joined, taken away, put in equal groups, or shared?', hintAr: 'هل نضيف شيئاً، أم نأخذ، أم مجموعات متساوية، أم نوزّع؟' });
  }

  addLesson({
    id: 'm-t11', island: 'm-t11', added: '2026-11-03', pic: '🧩',
    title: 'Solve Word Problems', sub: 'Pick the operation, letters for unknowns, two-step problems',
    learn: [
      { title: 'Read, then plan', titleAr: 'اقرئي، ثم خطّطي',
        text: 'Ask: What do I <b>know</b>? What do I need to <b>find</b>? Which <b>operation</b> fits? Then solve and check.',
        textAr: 'اسألي نفسكِ: ماذا <b>أعرف</b>؟ ماذا أريد أن <b>أجد</b>؟ أي <b>عملية (operation)</b> تناسب؟ ثم حلّي وتحقّقي.',
        show: { kind: 'chips', items: [['📖', 'Read'], ['🔎', 'What do I know?'], ['❓', 'What do I find?'], ['🧮', 'Solve'], ['✅', 'Check']] } },
      { title: 'Choose the operation', titleAr: 'اختاري العملية',
        text: '<b>Join</b> → add. <b>Take away</b> or compare → subtract. <b>Equal groups</b> → multiply. <b>Share equally</b> → divide.',
        textAr: '<b>نضمّ</b> ← نجمع. <b>نأخذ</b> أو نقارن ← نطرح. <b>مجموعات متساوية</b> ← نضرب. <b>نوزّع بالتساوي</b> ← نقسم.',
        show: { kind: 'chips', items: [['➕', 'join'], ['➖', 'take away'], ['✖️', 'equal groups'], ['➗', 'share']] } },
      { title: 'A letter for the unknown', titleAr: 'حرف مكان العدد المجهول',
        text: 'When we do not know a number, we use a letter. 4 × <b>n</b> = 28. What times 4 is 28? 4 × 7 = 28, so <b>n = 7</b>.',
        textAr: 'عندما لا نعرف عدداً نضع مكانه حرفاً. 4 × <b>n</b> = 28. أربعة ضرب كم يساوي 28؟ 4 × 7 = 28، إذن <b>n = 7</b>.',
        show: { kind: 'html', html: `${BAR([['n', 1], ['n', 1], ['n', 1], ['n', 1]], '28')}<p class="eqn pop" style="animation-delay:1s">4 × n = 28</p><p class="eqn pop" style="animation-delay:2s">n = <b>7</b></p>` } },
      { title: 'Two-step problems', titleAr: 'مسائل من خطوتين',
        text: 'Reem has 3 packs with 6 stickers in each. She gives away 5. <b>Step 1</b>: 3 × 6 = 18. <b>Step 2</b>: 18 − 5 = <b>13</b> left.',
        textAr: 'مع ريم 3 علب، في كل علبة 6 ملصقات. أعطت 5. <b>الخطوة 1</b>: 3 × 6 = 18. <b>الخطوة 2</b>: 18 − 5 = <b>13</b> بقيت.',
        show: { kind: 'html', html: `${BAR([['6', 1], ['6', 1], ['6', 1]], '18')}<p class="eqn pop" style="animation-delay:.6s">Step 1: 3 × 6 = 18</p>${BAR([['13 left', 13, '#7FE0A8'], ['5', 5, '#FFB0A0']], '18', 1.6)}<p class="eqn pop" style="animation-delay:2.2s">Step 2: 18 − 5 = <b>13</b></p>` } },
      { title: 'Does it make sense?', titleAr: 'هل الجواب منطقي؟',
        text: 'Estimate to check. 18 is about 20, and 20 − 5 = 15. Our answer 13 is close to 15, so it makes sense! ✓',
        textAr: 'نقدّر لنتحقّق. 18 تقريباً 20، و20 − 5 = 15. جوابنا 13 قريب من 15، إذن هو منطقي! ✓',
        show: { kind: 'html', html: '<p class="eqn pop">18 ≈ 20</p><p class="eqn pop" style="animation-delay:.9s">20 − 5 = 15</p><p class="eqn pop" style="animation-delay:1.8s">13 is close to 15 ✓</p>' } },
    ],
    acts: [
      { type: 'sort', title: 'Which operation?', pick: 8, start: 'Read each story. Join, take away, equal groups or share?', startAr: 'اقرئي كل قصة. نضمّ، نأخذ، مجموعات متساوية، أم نوزّع؟',
        ask: 'Drag each story into the right box. Or tap a story, then tap a box.', askAr: 'اسحبي كل قصة إلى الصندوق الصحيح، أو اضغطي على القصة ثم على الصندوق.',
        hint: 'Does <b>{w}</b> join, take away, make equal groups, or share?', hintAr: 'هل <b>{w}</b> فيها ضمّ، أم أخذ، أم مجموعات متساوية، أم توزيع؟',
        buckets: OPS, items: opItems },
      { type: 'mc', title: 'Find the letter', pick: 6, big: true, start: 'The letter hides a number. Find it!', startAr: 'الحرف يخبّئ عدداً. جديه!', items: unknown },
      { type: 'mc', title: 'Two-step problems', pick: 5, start: 'Solve step 1 first, then step 2!', startAr: 'حلّي الخطوة الأولى أولاً، ثم الخطوة الثانية!', items: two },
      { type: 'mc', title: 'Match the equation', pick: 5, start: 'Which equation tells the same story?', startAr: 'أي معادلة تحكي نفس القصة؟', items: eqs },
    ],
  });
})();
