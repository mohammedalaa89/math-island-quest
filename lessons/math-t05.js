/* enVision Math Grade 3, Topic 5: Fluently multiply and divide within 100 – mixed facts, missing numbers, even/odd patterns, word problems.
   Our own explanations and generated questions (3.OA.3, 3.OA.4, 3.OA.7, 3.OA.9). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k);
  const GRP = (g, n, e) => `<div class="grps2">${Array.from({ length: g }, () => `<div class="plate">${e.repeat(n)}</div>`).join('')}</div>`;
  /* multiplication table 1–10; even products coloured */
  const TABLE = (hl) => `<div style="direction:ltr;display:inline-grid;grid-template-columns:repeat(11,22px);gap:1px;font-size:.7rem;font-weight:800;text-align:center;line-height:22px">${
    Array.from({ length: 121 }, (_, k) => { const r = Math.floor(k / 11), c = k % 11;
      if (!r && !c) return '<span style="background:#1E2A44;color:#fff;border-radius:4px">×</span>';
      if (!r || !c) return `<span style="background:#FFE7A8;border-radius:4px">${r || c}</span>`;
      const p = r * c, ev = p % 2 === 0;
      return `<span class="${hl ? 'pop' : ''}" style="border-radius:4px;background:${ev ? '#CFE8FF' : '#FFD6E0'};animation-delay:${(r + c) * .06}s">${p}</span>`; }).join('')}</div>`;

  /* quiz 1: mixed facts */
  const mixed = [];
  for (let a = 2; a <= 10; a++) for (let b = 2; b <= 10; b++) {
    const p = a * b;
    if (a <= b) mixed.push({ q: `${a} × ${b} = ?`, qAr: `${a} × ${b} = ؟`, pic: '✖️', opts: nums(p, [p + a, p - a, p + b, p - b, p + 1]), ans: String(p),
      why: `${a} groups of ${b}: count by ${b}s ${a} times and you reach <b>${p}</b>. So <b>${a} × ${b} = ${p}</b>.`,
      whyAr: `${a} مجموعات من ${b}: عدّي بالقفز ${b}، عدد ${a} مرات فتصلين إلى <b>${p}</b>. إذن <b>${a} × ${b} = ${p}</b>.`,
      hint: `Use a fact you know. What is ${a} × ${b - 1}? Then add one more ${a}.`, hintAr: `استخدمي حقيقة تعرفينها. كم ${a} × ${b - 1}؟ ثم أضيفي ${a} مرة أخرى.` });
    mixed.push({ q: `${p} ÷ ${a} = ?`, qAr: `${p} ÷ ${a} = ؟`, pic: '➗', opts: nums(b, [b + 1, b - 1, a, b + 2]), ans: String(b),
      why: `Think: ${a} × <b>${b}</b> = ${p}. So <b>${p} ÷ ${a} = ${b}</b>.`, whyAr: `فكّري: ${a} × <b>${b}</b> = ${p}. إذن <b>${p} ÷ ${a} = ${b}</b>.`,
      hint: `${a} times what number makes ${p}?`, hintAr: `${a} ضرب أي عدد يساوي ${p}؟` });
  }

  /* quiz 2: find the missing number */
  const miss = [];
  const bankFor = x => opts(x, [x + 1, x - 1, x + 2, x - 2].filter(v => v >= 1 && v <= 10), k => x + k + 2);
  for (let a = 2; a <= 10; a++) for (let b = 2; b <= 10; b++) {
    const p = a * b, kind = (a + b) % 3;
    if (kind === 0) miss.push({ s: `${a} × ___ = ${p}`, ans: String(b), bank: bankFor(b), sAr: `أي عدد نضربه في ${a} ليصبح ${p}؟`,
      why: `${a} × <b>${b}</b> = ${p}. You can check with division: ${p} ÷ ${a} = ${b}.`, whyAr: `${a} × <b>${b}</b> = ${p}. تحقّقي بالقسمة: ${p} ÷ ${a} = ${b}.`,
      hint: `Count by ${a}s up to ${p}. How many jumps?`, hintAr: `عدّي بالقفز ${a} حتى ${p}. كم قفزة؟` });
    else if (kind === 1) miss.push({ s: `___ × ${b} = ${p}`, ans: String(a), bank: bankFor(a), sAr: `أي عدد نضربه في ${b} ليصبح ${p}؟`,
      why: `<b>${a}</b> × ${b} = ${p}, because ${p} ÷ ${b} = ${a}.`, whyAr: `<b>${a}</b> × ${b} = ${p}، لأن ${p} ÷ ${b} = ${a}.`,
      hint: `Think: ${p} ÷ ${b} = ?`, hintAr: `فكّري: ${p} ÷ ${b} = ؟` });
    else miss.push({ s: `${p} ÷ ___ = ${b}`, ans: String(a), bank: bankFor(a), sAr: `قسمنا ${p} على عدد فكان الناتج ${b}. ما العدد؟`,
      why: `${p} ÷ <b>${a}</b> = ${b}, because ${a} × ${b} = ${p}.`, whyAr: `${p} ÷ <b>${a}</b> = ${b}، لأن ${a} × ${b} = ${p}.`,
      hint: `Think: ${b} times what number makes ${p}?`, hintAr: `فكّري: ${b} ضرب أي عدد يساوي ${p}؟` });
  }

  /* quiz 3: even or odd product */
  const eo = [];
  for (let a = 2; a <= 9; a++) for (let b = a; b <= 9; b++) eo.push([`${a} × ${b}`, (a * b) % 2]);
  const parse = w => w.split(' × ').map(Number);
  const eoWhy = (w) => { const [a, b] = parse(w), p = a * b;
    return a % 2 && b % 2 ? `${w} = ${p}. Odd × odd is always <b>odd</b>.` : `${w} = ${p}. If one number is even, the product is always <b>even</b>.`; };
  const eoWhyAr = (w) => { const [a, b] = parse(w), p = a * b;
    return a % 2 && b % 2 ? `${w} = ${p}. فردي × فردي = دائماً <b>فردي (odd)</b>.` : `${w} = ${p}. إذا كان أحد العددين زوجياً، فالناتج دائماً <b>زوجي (even)</b>.`; };

  /* quiz 4: word problems */
  const THINGS = [['🍪', 'cookies', 'كعكات'], ['🖍️', 'crayons', 'أقلام تلوين'], ['🌷', 'flowers', 'زهور'], ['📚', 'books', 'كتب'], ['🧁', 'cupcakes', 'كعكات صغيرة'], ['🎈', 'balloons', 'بالونات']];
  const BOX = [['boxes', 'صناديق'], ['vases', 'مزهريات'], ['shelves', 'رفوف'], ['bags', 'أكياس'], ['trays', 'صوانٍ'], ['bunches', 'باقات']];
  const story = [];
  for (let g = 2; g <= 9; g++) for (let n = 2; n <= 9; n++) {
    const k = (g + n) % THINGS.length, [e, th, thAr] = THINGS[k], [bx, bxAr] = BOX[k], t = g * n;
    if ((g * 7 + n) % 2) story.push({ q: `There are ${g} ${bx} with ${n} ${th} in each. How many ${th} in all?`, qAr: `يوجد ${g} ${bxAr}، في كل منها ${n} ${thAr}. كم العدد كله؟`,
      pic: g * n <= 30 ? GRP(g, n, e) : e, opts: nums(t, [g + n, t + n, t - n, t + g]), ans: String(t),
      why: `Equal groups, find the total: multiply. <b>${g} × ${n} = ${t}</b>.`, whyAr: `مجموعات متساوية ونريد العدد الكلي: نضرب. <b>${g} × ${n} = ${t}</b>.`,
      hint: 'Are you finding the total of equal groups, or sharing? Total means multiply.', hintAr: 'هل تبحثين عن العدد الكلي لمجموعات متساوية أم توزّعين؟ العدد الكلي يعني الضرب.' });
    else story.push({ q: `${t} ${th} are put equally into ${g} ${bx}. How many in each?`, qAr: `وُضعت ${t} ${thAr} بالتساوي في ${g} ${bxAr}. كم في كل واحد؟`,
      pic: e, opts: nums(n, [n + 1, n - 1, t - g, g, t + g]), ans: String(n),
      why: `Sharing equally means divide. <b>${t} ÷ ${g} = ${n}</b>, because ${g} × ${n} = ${t}.`, whyAr: `التوزيع بالتساوي يعني القسمة. <b>${t} ÷ ${g} = ${n}</b>، لأن ${g} × ${n} = ${t}.`,
      hint: `You are sharing ${t} into ${g} equal groups. That is division.`, hintAr: `أنتِ توزّعين ${t} على ${g} مجموعات متساوية. هذه قسمة.` });
  }

  addLesson({
    id: 'm-t5', island: 'm-t5', added: '2026-11-03', pic: '⚡',
    title: 'Topic 5: Fluent Facts', sub: 'Multiply and divide within 100',
    learn: [
      { title: 'The multiplication table', titleAr: 'جدول الضرب',
        text: 'Find a row and a column; where they meet is the product. 6 × 7: row 6, column 7 = <b>42</b>.',
        textAr: 'اختاري صفاً وعموداً؛ حيث يلتقيان تجدين الناتج. 6 × 7: الصف 6 والعمود 7 = <b>42</b>.',
        show: { kind: 'html', html: `<div class="pop">${TABLE(false)}</div><p class="eqn pop" style="animation-delay:.6s">6 × 7 = <b>42</b></p>` } },
      { title: 'Even and odd patterns', titleAr: 'أنماط الزوجي والفردي',
        text: 'Blue = <b>even</b>, pink = <b>odd</b>. Even × any number = even. Only odd × odd = odd.',
        textAr: 'الأزرق = <b>زوجي (even)</b>، والوردي = <b>فردي (odd)</b>. زوجي × أي عدد = زوجي. فقط فردي × فردي = فردي.',
        show: { kind: 'html', html: TABLE(true) } },
      { title: 'Even means pairs', titleAr: 'الزوجي يعني أزواجاً',
        text: 'An even number can be put in pairs with none left over. 3 × 2 = 6 is even. 3 × 3 = 9 is odd: one is left alone!',
        textAr: 'العدد الزوجي يمكن ترتيبه في أزواج بلا باقٍ. 3 × 2 = 6 زوجي. 3 × 3 = 9 فردي: يبقى واحد وحده!',
        show: { kind: 'html', html: `<div class="chipsrow"><span class="ochip pop">🧦🧦 🧦🧦 🧦🧦</span><span class="ochip pop" style="animation-delay:.6s">6 even ✓</span></div><div class="chipsrow"><span class="ochip pop" style="animation-delay:1.3s">🧦🧦 🧦🧦 🧦🧦 🧦🧦 🧦</span><span class="ochip pop" style="animation-delay:1.9s">9 odd</span></div>` } },
      { title: 'Find the missing number', titleAr: 'أوجدي العدد الناقص',
        text: '6 × ? = 42. Think: 42 ÷ 6 = 7. So the missing number is <b>7</b>.',
        textAr: '6 × ؟ = 42. فكّري: 42 ÷ 6 = 7. إذن العدد الناقص هو <b>7</b>.',
        show: { kind: 'html', html: '<p class="eqn pop">6 × <b>?</b> = 42</p><p class="eqn pop" style="animation-delay:1s">42 ÷ 6 = 7</p><p class="eqn pop" style="animation-delay:2s">6 × <b>7</b> = 42 ✓</p>' } },
      { title: 'Multiply or divide?', titleAr: 'نضرب أم نقسم؟',
        text: 'Know the groups and want the total? <b>Multiply</b>. Know the total and share it? <b>Divide</b>.',
        textAr: 'تعرفين المجموعات وتريدين العدد الكلي؟ <b>اضربي</b>. تعرفين العدد الكلي وتريدين التوزيع؟ <b>اقسمي</b>.',
        show: { kind: 'html', html: `<div class="pop">${GRP(3, 4, '🧁')}</div><p class="eqn pop" style="animation-delay:1s">3 × 4 = <b>12</b> &nbsp; 12 ÷ 3 = <b>4</b></p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Mixed facts', pick: 8, start: 'Multiply and divide. Use facts you know!', startAr: 'اضربي واقسمي. استخدمي الحقائق التي تعرفينها!', items: mixed },
      { type: 'fill', title: 'Missing number', pick: 5, start: 'Which number is hiding?', startAr: 'أي عدد مختبئ؟', items: miss },
      { type: 'sort', title: 'Even or odd?', pick: 8, items: eo,
        ask: 'Is the product even or odd? Drag each fact into a box.', askAr: 'هل الناتج زوجي أم فردي؟ اسحبي كل عملية إلى صندوقها.',
        start: 'Even × anything is even. Odd × odd is odd!', startAr: 'زوجي × أي عدد = زوجي. فردي × فردي = فردي!',
        hint: w => `Look at the two numbers in <b>${w}</b>. Is either one even?`, hintAr: w => `انظري إلى العددين في <b>${w}</b>. هل أحدهما زوجي؟`,
        buckets: [
          { label: 'Even product', labelAr: 'ناتج زوجي', pic: '🧦', why: eoWhy, whyAr: eoWhyAr },
          { label: 'Odd product', labelAr: 'ناتج فردي', pic: '1️⃣', why: eoWhy, whyAr: eoWhyAr },
        ] },
      { type: 'mc', title: 'Story problems', pick: 5, start: 'Multiply for the total. Divide to share!', startAr: 'اضربي لتجدي العدد الكلي، واقسمي للتوزيع!', items: story },
    ],
  });
})();
