/* enVision Math Grade 3, Topic 3: Apply properties – multiplication facts for 3, 4, 6, 7, 8.
   Commutative property and "break apart" (distributive) strategies. Our own explanations and generated questions (3.OA.5, 3.OA.7). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k);
  const EM = ['🍎', '🍓', '⭐', '🐟', '🧁', '🌸', '🍪', '🦋', '🍩', '🌼'];
  const em = () => EM[R(0, EM.length - 1)];
  const DOTS = (r, c, e) => `<div class="arr" style="grid-template-columns:repeat(${c},auto);font-size:${c > 7 || r > 6 ? 1.05 : 1.4}rem">${Array.from({ length: r * c }, () => `<span>${e}</span>`).join('')}</div>`;
  /* an array split into two coloured parts, top rows and bottom rows */
  const SPLIT = (a, b, c) => `<div style="display:flex;flex-direction:column;align-items:center;gap:8px">${DOTS(a, c, '🟦')}${DOTS(b, c, '🟧')}</div>`;

  /* break-apart strategy for each factor */
  const STRAT = {
    3: n => [`3 × ${n} = 2 × ${n} + 1 × ${n} = ${2 * n} + ${n} = <b>${3 * n}</b>`, `3 × ${n} = 2 × ${n} + 1 × ${n} = ${2 * n} + ${n} = <b>${3 * n}</b>`, 'Find 2 groups, then add one more group.', 'أوجدي مجموعتين، ثم أضيفي مجموعة واحدة أخرى.'],
    4: n => [`4 × ${n} is double 2 × ${n}: ${2 * n} + ${2 * n} = <b>${4 * n}</b>`, `4 × ${n} هو ضِعف 2 × ${n}: ${2 * n} + ${2 * n} = <b>${4 * n}</b>`, `Find 2 × ${n}, then double it.`, `أوجدي 2 × ${n}، ثم ضاعفيه.`],
    6: n => [`6 × ${n} = 5 × ${n} + 1 × ${n} = ${5 * n} + ${n} = <b>${6 * n}</b>`, `6 × ${n} = 5 × ${n} + 1 × ${n} = ${5 * n} + ${n} = <b>${6 * n}</b>`, `Find 5 × ${n}, then add one more ${n}.`, `أوجدي 5 × ${n}، ثم أضيفي ${n} مرة أخرى.`],
    7: n => [`7 × ${n} = 5 × ${n} + 2 × ${n} = ${5 * n} + ${2 * n} = <b>${7 * n}</b>`, `7 × ${n} = 5 × ${n} + 2 × ${n} = ${5 * n} + ${2 * n} = <b>${7 * n}</b>`, `Break 7 into 5 + 2. Find 5 × ${n} and 2 × ${n}, then add.`, `جزّئي 7 إلى 5 + 2. أوجدي 5 × ${n} و 2 × ${n}، ثم اجمعي.`],
    8: n => [`8 × ${n} is double 4 × ${n}: ${4 * n} + ${4 * n} = <b>${8 * n}</b>`, `8 × ${n} هو ضِعف 4 × ${n}: ${4 * n} + ${4 * n} = <b>${8 * n}</b>`, `Find 4 × ${n}, then double it.`, `أوجدي 4 × ${n}، ثم ضاعفيه.`],
  };

  /* quiz 1: facts with pictures */
  const facts = [];
  for (const f of [3, 4, 6, 7, 8]) for (let n = 2; n <= 9; n++) {
    const p = f * n, [w, wa, h, ha] = STRAT[f](n);
    facts.push({ q: `${f} rows of ${n}. ${f} × ${n} = ?`, qAr: `${f} صفوف، في كل صف ${n}. ${f} × ${n} = ؟`, pic: DOTS(f, n, em()),
      opts: nums(p, [p + n, p - n, p + f, p - 1, (f + 1) * n]), ans: String(p), why: w, whyAr: wa, hint: h, hintAr: ha });
  }

  /* quiz 2: which break-apart is the same? */
  const brk = [];
  for (const f of [6, 7, 8]) for (let n = 3; n <= 9; n++) {
    const b = f - 5, ans = `5 × ${n} + ${b} × ${n}`;
    brk.push({ q: `Which is the same as ${f} × ${n}?`, qAr: `أيّها يساوي ${f} × ${n}؟`, pic: SPLIT(5, b, n),
      opts: opts(ans, [`5 × ${n} + ${b}`, `5 + ${b} × ${n}`, `5 × ${n} + ${b + 1} × ${n}`, `${f} + ${n}`, `5 × ${b} + ${n}`], k => `5 × ${n} + ${b + 1 + k} × ${n}`), ans,
      why: `Break the ${f} rows into 5 rows (blue) and ${b} rows (orange). 5 × ${n} = ${5 * n} and ${b} × ${n} = ${b * n}. ${5 * n} + ${b * n} = <b>${f * n}</b>, the same as ${f} × ${n}.`,
      whyAr: `جزّئي الصفوف الـ ${f} إلى 5 صفوف (أزرق) و ${b} صفوف (برتقالي). 5 × ${n} = ${5 * n} و ${b} × ${n} = ${b * n}. ${5 * n} + ${b * n} = <b>${f * n}</b>، وهو نفس ${f} × ${n}.`,
      hint: 'Both parts must still have the same number in each row. Count the rows in each colour.', hintAr: 'كل جزء يجب أن يبقى فيه نفس العدد في كل صف. عدّي الصفوف في كل لون.' });
  }
  for (const f of [3, 4]) for (let n = 3; n <= 9; n++) {
    const ans = `2 × ${n} + ${f - 2} × ${n}`;
    brk.push({ q: `Which is the same as ${f} × ${n}?`, qAr: `أيّها يساوي ${f} × ${n}؟`, pic: SPLIT(2, f - 2, n),
      opts: opts(ans, [`2 × ${n} + ${f - 2}`, `2 + ${f - 2} × ${n}`, `${f} + ${n}`, `2 × ${n} + ${f - 1} × ${n}`], k => `2 × ${n} + ${f + k} × ${n}`), ans,
      why: `Break the ${f} rows into 2 rows and ${f - 2} row${f - 2 > 1 ? 's' : ''}. 2 × ${n} = ${2 * n} and ${f - 2} × ${n} = ${(f - 2) * n}. Together: <b>${f * n}</b> = ${f} × ${n}.`,
      whyAr: `جزّئي الصفوف الـ ${f} إلى صفّين و ${f - 2} ${f - 2 > 1 ? 'صفوف' : 'صف'}. 2 × ${n} = ${2 * n} و ${f - 2} × ${n} = ${(f - 2) * n}. المجموع: <b>${f * n}</b> = ${f} × ${n}.`,
      hint: 'Count the blue rows and the orange rows. Each row still has the same number.', hintAr: 'عدّي الصفوف الزرقاء والبرتقالية. كل صف ما زال فيه العدد نفسه.' });
  }

  /* quiz 3: turn it around (commutative) */
  const swap = [];
  for (const a of [3, 4, 6, 7, 8]) for (let b = 2; b <= 9; b++) if (a !== b) {
    swap.push({ s: `${a} × ${b} = ${b} × ___`, ans: String(a),
      sAr: `خاصية الإبدال (commutative): نبدّل ترتيب العددين والناتج لا يتغيّر.`,
      bank: opts(a, [b, a + 1, a - 1, a * b, a + b], k => a + k + 1),
      why: `Turn the array around: ${a} rows of ${b} is the same as ${b} rows of ${a}. Both make <b>${a * b}</b>.`,
      whyAr: `أديري المصفوفة: ${a} صفوف من ${b} مثل ${b} صفوف من ${a}. كلاهما يساوي <b>${a * b}</b>.` });
  }

  /* quiz 4: match facts to products */
  const all = []; for (const f of [3, 4, 6, 7, 8]) for (let n = 3; n <= 9; n++) all.push([`${f} × ${n}`, String(f * n)]);
  const uniq = Object.values(Object.fromEntries(all.map(p => [p[1], p])));

  addLesson({
    id: 'm-t3', island: 'm-t3', added: '2026-11-03', pic: '🧩',
    title: 'Topic 3: Use Properties', sub: 'Facts for 3, 4, 6, 7 and 8',
    learn: [
      { title: 'Turn it around', titleAr: 'اقلبيها والناتج نفسه',
        text: '3 × 4 and 4 × 3 are the same array turned around. Both are <b>12</b>. This is the <b>commutative property</b>.',
        textAr: '3 × 4 و 4 × 3 هي نفس المصفوفة بعد تدويرها. كلاهما يساوي <b>12</b>. هذه <b>خاصية الإبدال (commutative property)</b>.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:24px"><div class="pop">${DOTS(3, 4, '🍓')}<p class="eqn">3 × 4 = <b>12</b></p></div><div class="pop" style="animation-delay:1s">${DOTS(4, 3, '🍓')}<p class="eqn">4 × 3 = <b>12</b></p></div></div>` } },
      { title: 'Break apart a hard fact', titleAr: 'جزّئي الحقيقة الصعبة',
        text: '7 × 6 is hard? Break the 7 rows into 5 rows and 2 rows. 5 × 6 = 30 and 2 × 6 = 12. 30 + 12 = <b>42</b>.',
        textAr: 'هل 7 × 6 صعبة؟ جزّئي الصفوف السبعة إلى 5 صفوف وصفّين. 5 × 6 = 30 و 2 × 6 = 12. إذن 30 + 12 = <b>42</b>.',
        show: { kind: 'html', html: `<div class="pop">${SPLIT(5, 2, 6)}</div><p class="eqn pop" style="animation-delay:1s">🟦 5 × 6 = 30 &nbsp; 🟧 2 × 6 = 12</p><p class="eqn pop" style="animation-delay:2s">7 × 6 = 30 + 12 = <b>42</b></p>` } },
      { title: '× 3: two groups and one more', titleAr: 'الضرب في 3: مجموعتان ومجموعة أخرى',
        text: '3 × 6: two groups of 6 make 12, one more group of 6 makes <b>18</b>.',
        textAr: '3 × 6: مجموعتان من 6 تساويان 12، ومجموعة أخرى من 6 تجعلها <b>18</b>.',
        show: { kind: 'groups', g: 3, n: 6, e: '🌸' } },
      { title: '× 4 and × 8: double, double!', titleAr: 'الضرب في 4 و 8: ضاعفي ثم ضاعفي!',
        text: '2 × 6 = 12. Double it: 4 × 6 = <b>24</b>. Double again: 8 × 6 = <b>48</b>.',
        textAr: '2 × 6 = 12. ضاعفيه: 4 × 6 = <b>24</b>. ضاعفيه مرة أخرى: 8 × 6 = <b>48</b>.',
        show: { kind: 'html', html: '<p class="eqn pop">2 × 6 = 12</p><p class="eqn pop" style="animation-delay:.9s">⬇ double</p><p class="eqn pop" style="animation-delay:1.5s">4 × 6 = 12 + 12 = <b>24</b></p><p class="eqn pop" style="animation-delay:2.3s">⬇ double</p><p class="eqn pop" style="animation-delay:2.9s">8 × 6 = 24 + 24 = <b>48</b></p>' } },
      { title: '× 6: five groups and one more', titleAr: 'الضرب في 6: خمس مجموعات ومجموعة أخرى',
        text: '6 × 7 = 5 × 7 + 1 × 7 = 35 + 7 = <b>42</b>. Use the 5s you already know!',
        textAr: '6 × 7 = 5 × 7 + 1 × 7 = 35 + 7 = <b>42</b>. استخدمي حقائق الضرب في 5 التي تعرفينها!',
        show: { kind: 'html', html: `<div class="pop">${SPLIT(5, 1, 7)}</div><p class="eqn pop" style="animation-delay:1s">35 + 7 = <b>42</b></p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Facts for 3, 4, 6, 7, 8', pick: 6, start: 'Break the hard fact into easy facts!', startAr: 'جزّئي الحقيقة الصعبة إلى حقائق سهلة!', items: facts },
      { type: 'mc', title: 'Break it apart', pick: 5, start: 'Look at the blue part and the orange part!', startAr: 'انظري إلى الجزء الأزرق والجزء البرتقالي!', items: brk },
      { type: 'fill', title: 'Turn it around', pick: 5, start: 'Swap the numbers, the answer stays the same!', startAr: 'بدّلي العددين، والناتج يبقى نفسه!', items: swap,
        hint: 'Look at the numbers on the left side. Which one is missing on the right?', hintAr: 'انظري إلى العددين في الجهة اليسرى. أيّهما ناقص في الجهة اليمنى؟' },
      { type: 'match', title: 'Fact match', pick: 5, big: true, pairs: uniq,
        ask: 'Tap a fact, then tap its answer.', askAr: 'اضغطي على العملية، ثم على ناتجها.', start: 'Match each fact to its product!', startAr: 'صِلي كل عملية بناتجها!',
        why: p => `<b>${p[0]} = ${p[1]}</b>`, whyAr: p => `<b>${p[0]} = ${p[1]}</b>`,
        hint: p => `Break apart <b>${p[0]}</b> into facts you know.`, hintAr: p => `جزّئي <b>${p[0]}</b> إلى حقائق تعرفينها.`,
        sayL: p => p[0], sayR: p => p[1] },
    ],
  });
})();
