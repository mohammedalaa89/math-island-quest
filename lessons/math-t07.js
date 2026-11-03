/* enVision Math Grade 3, Topic 7: Represent and interpret data – picture graphs with keys, bar graphs, reading scales.
   Our own explanations and generated graphs and questions (3.MD.3). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs, step) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k * (step || 1));
  const shuf = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = R(0, i); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  /* things children vote for: [emoji, English, Arabic] */
  const SETS = [
    [['🍎', 'apples', 'التفاح'], ['🍌', 'bananas', 'الموز'], ['🍇', 'grapes', 'العنب'], ['🍊', 'oranges', 'البرتقال'], ['🍉', 'watermelon', 'البطيخ']],
    [['🐱', 'cats', 'القطط'], ['🐶', 'dogs', 'الكلاب'], ['🐰', 'rabbits', 'الأرانب'], ['🐟', 'fish', 'الأسماك'], ['🐦', 'birds', 'الطيور']],
    [['⚽', 'soccer', 'كرة القدم'], ['🏊', 'swimming', 'السباحة'], ['🚴', 'cycling', 'ركوب الدراجة'], ['🏀', 'basketball', 'كرة السلة'], ['🎾', 'tennis', 'التنس']],
    [['🔴', 'red', 'الأحمر'], ['🔵', 'blue', 'الأزرق'], ['🟢', 'green', 'الأخضر'], ['🟣', 'purple', 'البنفسجي'], ['🟡', 'yellow', 'الأصفر']],
  ];
  const SYM = ['🙂', '⭐', '❤️', '🔷'];

  /* picture graph: rows of symbols with a key */
  const PG = (cats, vals, key, sym) => `<div style="direction:ltr;display:inline-flex;flex-direction:column;gap:4px;background:#fff;border-radius:14px;padding:10px 12px;box-shadow:0 3px 0 #D6E4F5">${
    cats.map((c, j) => `<div style="display:flex;align-items:center;gap:8px;min-height:30px"><span style="font-size:1.5rem;width:34px;text-align:center;border-right:2px solid #D6E4F5">${c[0]}</span><span style="font-size:1.25rem;letter-spacing:2px">${sym.repeat(vals[j] / key)}</span></div>`).join('')
  }<div style="font-weight:800;font-size:.95rem;margin-top:4px;border-top:2px dashed #D6E4F5;padding-top:4px">Key: ${sym} = ${key}</div></div>`;

  /* horizontal bar graph with a scale */
  const BG = (cats, vals, step, anim) => {
    const max = Math.ceil(Math.max(...vals) / step) * step, n = max / step, W = 200;
    const ticks = Array.from({ length: n + 1 }, (_, k) => `<span style="position:absolute;left:${k / n * 100}%;transform:translateX(-50%);font-size:.75rem;font-weight:800">${k * step}</span>`).join('');
    return `<div style="direction:ltr;display:inline-flex;flex-direction:column;gap:6px;background:#fff;border-radius:14px;padding:10px 18px 8px 10px;box-shadow:0 3px 0 #D6E4F5">${
      cats.map((c, j) => `<div style="display:flex;align-items:center;gap:6px"><span style="font-size:1.4rem;width:32px;text-align:center">${c[0]}</span><div style="position:relative;width:${W}px;height:24px;background:repeating-linear-gradient(90deg,#C9D6EA 0 1px,transparent 1px ${W / n}px)"><div class="${anim ? 'pop' : ''}" style="position:absolute;left:0;top:3px;bottom:3px;width:${vals[j] / max * 100}%;background:var(--c);border-radius:0 6px 6px 0;animation-delay:${j * .3}s"></div></div></div>`).join('')
    }<div style="display:flex;gap:6px"><span style="width:32px"></span><div style="position:relative;width:${W}px;height:16px">${ticks}</div></div></div>`;
  };

  /* make a random graph: 4 categories */
  const make = (kind) => {
    const set = SETS[R(0, SETS.length - 1)], cats = shuf(set).slice(0, 4);
    if (kind === 'pg') {
      const key = [2, 5, 10][R(0, 2)], sym = SYM[R(0, SYM.length - 1)];
      let cnt = cats.map(() => R(1, 6)); while (new Set(cnt).size < 4) cnt = cats.map(() => R(1, 6));
      return { cats, vals: cnt.map(s => s * key), key, sym, cnt, pic: PG(cats, cnt.map(s => s * key), key, sym) };
    }
    const step = [2, 5, 10][R(0, 2)], gen = () => step === 5 ? R(1, 8) * 5 : R(2, 16) * step / 2; /* some bars stop halfway between lines */
    let vals = cats.map(gen); while (new Set(vals).size < 4) vals = cats.map(gen);
    return { cats, vals, step, pic: BG(cats, vals, step) };
  };

  /* quiz 1: read a picture graph */
  const pgRead = [];
  for (let g = 0; g < 40; g++) {
    const G = make('pg'), j = R(0, 3), c = G.cats[j], s = G.cnt[j], v = G.vals[j];
    pgRead.push({ q: `How many children chose ${c[1]} ${c[0]}?`, qAr: `كم طفلاً اختار ${c[2]} ${c[0]}؟`, pic: G.pic,
      opts: nums(v, [s, v + G.key, v - G.key, s + G.key, v + 1], G.key), ans: String(v),
      why: `${c[0]} has ${s} ${G.sym}. The key says each ${G.sym} = ${G.key}. ${s} × ${G.key} = <b>${v}</b>.`,
      whyAr: `أمام ${c[0]} يوجد ${s} ${G.sym}. المفتاح (key) يقول إن كل ${G.sym} = ${G.key}. إذن ${s} × ${G.key} = <b>${v}</b>.`,
      hint: `Don't just count the pictures. Look at the key: each ${G.sym} stands for ${G.key}.`, hintAr: `لا تعدّي الصور فقط. انظري إلى المفتاح (key): كل ${G.sym} يساوي ${G.key}.` });
  }

  /* quiz 2: read a bar graph */
  const bgRead = [];
  for (let g = 0; g < 40; g++) {
    const G = make('bg'), j = R(0, 3), c = G.cats[j], v = G.vals[j], half = v % G.step !== 0;
    bgRead.push({ q: `How many children chose ${c[1]} ${c[0]}?`, qAr: `كم طفلاً اختار ${c[2]} ${c[0]}؟`, pic: G.pic,
      opts: nums(v, [v + G.step, v - G.step, v + G.step / 2, v - 1, v + 1].filter(x => Number.isInteger(x)), G.step), ans: String(v),
      why: half ? `The scale counts by ${G.step}s. The bar for ${c[0]} stops halfway between ${v - G.step / 2} and ${v + G.step / 2}, so it shows <b>${v}</b>.`
        : `The scale counts by ${G.step}s. The bar for ${c[0]} stops right on the line for <b>${v}</b>.`,
      whyAr: half ? `المقياس (scale) يعدّ بالقفز ${G.step}. عمود ${c[0]} يقف في منتصف المسافة بين ${v - G.step / 2} و ${v + G.step / 2}، إذن يمثّل <b>${v}</b>.`
        : `المقياس (scale) يعدّ بالقفز ${G.step}. عمود ${c[0]} يقف تماماً على خط <b>${v}</b>.`,
      hint: `Follow the end of the bar straight down to the numbers. The lines count by ${G.step}s.`, hintAr: `انزلي من نهاية العمود مباشرة إلى الأرقام. الخطوط تعدّ بالقفز ${G.step}.` });
  }

  /* quiz 3: compare and total, from either kind of graph */
  const comp = [];
  for (let g = 0; g < 48; g++) {
    const G = make(g % 2 ? 'pg' : 'bg'), ord = [0, 1, 2, 3].sort((x, y) => G.vals[y] - G.vals[x]);
    const [i, k] = [ord[R(0, 1)], ord[R(2, 3)]], A = G.cats[i], B = G.cats[k], va = G.vals[i], vb = G.vals[k], step = G.key || G.step;
    const read = G.key ? `Each ${G.sym} = ${G.key}. ` : '', readAr = G.key ? `كل ${G.sym} = ${G.key}. ` : '';
    if (g % 3 === 0) comp.push({ q: `How many children chose ${A[1]} ${A[0]} and ${B[1]} ${B[0]} in all?`, qAr: `كم طفلاً اختار ${A[2]} ${A[0]} و${B[2]} ${B[0]} معاً؟`, pic: G.pic,
      opts: nums(va + vb, [va - vb, va + vb + step, va + vb - step, va, vb]), ans: String(va + vb),
      why: `${read}${A[0]} = ${va} and ${B[0]} = ${vb}. In all: ${va} + ${vb} = <b>${va + vb}</b>.`,
      whyAr: `${readAr}${A[0]} = ${va} و ${B[0]} = ${vb}. المجموع: ${va} + ${vb} = <b>${va + vb}</b>.`,
      hint: '"In all" means add. Read both numbers from the graph first.', hintAr: 'كلمة "معاً" تعني الجمع. اقرئي العددين من الرسم أولاً.' });
    else if (g % 3 === 1) comp.push({ q: `How many more children chose ${A[1]} ${A[0]} than ${B[1]} ${B[0]}?`, qAr: `كم طفلاً اختار ${A[2]} ${A[0]} أكثر ممن اختار ${B[2]} ${B[0]}؟`, pic: G.pic,
      opts: nums(va - vb, [va + vb, va - vb + step, va - vb - step, va, vb]), ans: String(va - vb),
      why: `${read}${A[0]} = ${va} and ${B[0]} = ${vb}. How many more? Subtract: ${va} − ${vb} = <b>${va - vb}</b>.`,
      whyAr: `${readAr}${A[0]} = ${va} و ${B[0]} = ${vb}. كم أكثر؟ نطرح: ${va} − ${vb} = <b>${va - vb}</b>.`,
      hint: '"How many more" means subtract the smaller number from the bigger one.', hintAr: '"كم أكثر" تعني أن نطرح العدد الأصغر من العدد الأكبر.' });
    else { const top = G.cats[ord[0]], c4 = G.cats.map(c => `${c[0]} ${c[1]}`);
      comp.push({ q: 'Which one did the most children choose?', qAr: 'أي واحد اختاره أكثر عدد من الأطفال؟', pic: G.pic, opts: c4, ans: `${top[0]} ${top[1]}`,
        why: `${top[0]} has the ${G.key ? 'most pictures' : 'longest bar'}: <b>${G.vals[ord[0]]}</b> children.`,
        whyAr: `${top[0]} ${G.key ? 'عنده أكثر عدد من الصور' : 'عموده هو الأطول'}: <b>${G.vals[ord[0]]}</b> طفلاً.`,
        hint: G.key ? 'Find the row with the most pictures.' : 'Find the longest bar.', hintAr: G.key ? 'ابحثي عن الصف الذي فيه أكثر صور.' : 'ابحثي عن أطول عمود.' }); }
  }

  /* quiz 4: use the key */
  const keyQ = [];
  for (const key of [2, 3, 4, 5, 10]) for (let s = 2; s <= 7; s++) {
    const sym = SYM[(key + s) % SYM.length], v = s * key;
    keyQ.push({ s: `Key: ${sym} = ${key}.  ${sym.repeat(s)} means ___ votes.`, ans: String(v),
      sAr: `المفتاح (key): كل ${sym} = ${key}. كم صوتاً تمثّل هذه الصور؟`,
      bank: opts(v, [s, v + key, v - key, s + key], k => v + k * key),
      why: `${s} pictures and each one is ${key}: ${s} × ${key} = <b>${v}</b>.`, whyAr: `${s} صور، وكل واحدة تساوي ${key}: ${s} × ${key} = <b>${v}</b>.`,
      hint: `Count the pictures, then count by ${key}s.`, hintAr: `عدّي الصور، ثم عدّي بالقفز ${key}.` });
  }

  const demoC = SETS[0].slice(0, 4);
  addLesson({
    id: 'm-t7', island: 'm-t7', added: '2026-11-03', pic: '📊',
    title: 'Topic 7: Graphs and Data', sub: 'Picture graphs, keys and bar graphs',
    learn: [
      { title: 'A picture graph', titleAr: 'التمثيل بالصور (picture graph)',
        text: 'Children voted for their favorite fruit. Each row shows one fruit. The <b>key</b> tells what each picture is worth.',
        textAr: 'صوّت الأطفال لفاكهتهم المفضلة. كل صف يمثّل فاكهة. و<b>المفتاح (key)</b> يخبرنا كم تساوي كل صورة.',
        show: { kind: 'html', html: `<div class="pop">${PG(demoC, [8, 4, 10, 6], 2, '🙂')}</div>` } },
      { title: 'Use the key', titleAr: 'استخدمي المفتاح (key)',
        text: 'Key: 🙂 = 2. Apples have 4 🙂, so count by 2s: 2, 4, 6, 8. <b>8 children</b> chose apples.',
        textAr: 'المفتاح: 🙂 = 2. أمام التفاح 4 🙂، فنعدّ بالقفز 2: 2، 4، 6، 8. إذن <b>8 أطفال</b> اختاروا التفاح.',
        show: { kind: 'html', html: `<div class="chipsrow">${[2, 4, 6, 8].map((x, k) => `<span class="ochip pop" style="animation-delay:${k * .6}s;flex-direction:column"><i>🙂</i>${x}</span>`).join('')}</div><p class="eqn pop" style="animation-delay:2.6s">4 × 2 = <b>8</b> 🍎</p>` } },
      { title: 'A bar graph', titleAr: 'التمثيل بالأعمدة (bar graph)',
        text: 'A bar graph uses bars. Look where each bar ends, then read the number on the <b>scale</b> below it.',
        textAr: 'التمثيل بالأعمدة يستخدم أعمدة. انظري أين ينتهي كل عمود، ثم اقرئي العدد على <b>المقياس (scale)</b> تحته.',
        show: { kind: 'html', html: BG(demoC, [8, 4, 10, 6], 2, true) } },
      { title: 'Between the lines', titleAr: 'بين الخطّين',
        text: 'This scale counts by 10s. A bar that stops halfway between 20 and 30 shows <b>25</b>.',
        textAr: 'هذا المقياس يعدّ بالقفز 10. العمود الذي يقف في منتصف المسافة بين 20 و 30 يمثّل <b>25</b>.',
        show: { kind: 'html', html: `${BG(SETS[1].slice(0, 3), [25, 40, 10], 10, true)}<p class="eqn pop" style="animation-delay:1.2s">🐱 = <b>25</b></p>` } },
      { title: 'Compare the data', titleAr: 'قارني البيانات',
        text: 'Grapes 10, bananas 4. How many more chose grapes? 10 − 4 = <b>6</b>. How many in all? 10 + 4 = <b>14</b>.',
        textAr: 'العنب 10 والموز 4. كم أكثر اختاروا العنب؟ 10 − 4 = <b>6</b>. وكم معاً؟ 10 + 4 = <b>14</b>.',
        show: { kind: 'html', html: `${BG([demoC[2], demoC[1]], [10, 4], 2, true)}<p class="eqn pop" style="animation-delay:1s">10 − 4 = <b>6</b> more</p><p class="eqn pop" style="animation-delay:1.8s">10 + 4 = <b>14</b> in all</p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Picture graphs', pick: 5, start: 'Check the key before you count!', startAr: 'انظري إلى المفتاح (key) قبل أن تعدّي!', items: pgRead },
      { type: 'mc', title: 'Bar graphs', pick: 5, start: 'Read the scale under the bars!', startAr: 'اقرئي المقياس (scale) تحت الأعمدة!', items: bgRead },
      { type: 'mc', title: 'Compare the data', pick: 5, start: 'In all means add. How many more means subtract!', startAr: '"معاً" تعني الجمع، و"كم أكثر" تعني الطرح!', items: comp },
      { type: 'fill', title: 'Use the key', pick: 5, start: 'Each picture is worth the key number!', startAr: 'كل صورة تساوي العدد الذي في المفتاح!', items: keyQ },
    ],
  });
})();
