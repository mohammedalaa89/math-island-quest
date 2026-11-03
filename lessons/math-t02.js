/* enVision Math Grade 3, Topic 2: Multiplication facts – use patterns (×2, ×5, ×10, ×9, ×0, ×1, patterns in the table).
   Our own explanations and generated questions (Common Core 3.OA.7, 3.OA.9). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  /* 4 different options, the answer exactly once; more(k) fills any gap */
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k);
  const ICONS = (n, e) => `<div class="chipsrow" style="font-size:1.9rem;gap:6px;max-width:290px">${Array.from({ length: n }, () => `<span>${e}</span>`).join('')}</div>`;
  const GRP = (g, n, e) => `<div class="grps2">${Array.from({ length: g }, () => `<div class="plate">${e.repeat(n) || '&nbsp;'}</div>`).join('')}</div>`;
  const skip = (f, n) => Array.from({ length: n }, (_, i) => f * (i + 1)).join(', ');
  const ICON = { 2: '🧦', 5: '🖐️', 10: '🔟' };
  const UNIT = { 2: ['pair of socks', 'زوج جوارب'], 5: ['hand with 5 fingers', 'يد فيها ٥ أصابع'], 10: ['card worth 10', 'بطاقة قيمتها ١٠'] };

  /* quiz 1: ×2, ×5, ×10 */
  const easy = [];
  for (const f of [2, 5, 10]) for (let n = 1; n <= 10; n++) {
    const p = n * f;
    easy.push({ q: `${n} × ${f} = ?`, qAr: `${n} × ${f} = ؟`, pic: ICONS(n, ICON[f]), opts: nums(p, [p + f, p - f, n + f, p + 1, p + 10]), ans: String(p),
      why: `Count by ${f}s, ${n} time${n > 1 ? 's' : ''}: ${skip(f, n)}. So <b>${n} × ${f} = ${p}</b>.` + (f === 2 ? ` It is a double: ${n} + ${n} = ${p}.` : f === 10 ? ` Put a 0 after ${n}!` : ''),
      whyAr: `عدّي بالقفز ${f}، عدد ${n} مرات: ${skip(f, n)}. إذن <b>${n} × ${f} = ${p}</b>.` + (f === 2 ? ` إنها ضعف العدد: ${n} + ${n} = ${p}.` : f === 10 ? ` ضعي 0 بعد ${n}!` : ''),
      hint: `Each picture is one ${UNIT[f][0]}. Count by ${f}s for each picture.`, hintAr: `كل صورة هي ${UNIT[f][1]}. عدّي بالقفز ${f} لكل صورة.` });
  }

  /* quiz 2: ×9, ×0, ×1 */
  const tricky = [];
  for (let n = 1; n <= 10; n++) {
    const p = 9 * n, [a, b] = Math.random() < .5 ? [9, n] : [n, 9];
    tricky.push({ q: `${a} × ${b} = ?`, qAr: `${a} × ${b} = ؟`, pic: ICONS(n, '9️⃣'), opts: nums(p, [p + 9, p - 9, 10 * n, p + 1, p - 1]), ans: String(p),
      why: `Use the 10s trick: ${n} × 10 = ${10 * n}, then take away one ${n}: ${10 * n} − ${n} = <b>${p}</b>.` + (n > 1 && n < 11 ? ` Check: the digits ${String(p).split('').join(' + ')} = 9.` : ''),
      whyAr: `استخدمي حيلة العشرة: ${n} × 10 = ${10 * n}، ثم اطرحي ${n} واحدة: ${10 * n} − ${n} = <b>${p}</b>.` + (n > 1 ? ` تحقّقي: الأرقام ${String(p).split('').join(' + ')} = 9.` : ''),
      hint: `Find ${n} × 10 first. Then take ${n} away.`, hintAr: `أوجدي ${n} × 10 أولاً، ثم اطرحي منه ${n}.` });
  }
  for (let n = 2; n <= 10; n++) {
    const e = ['🍪', '🍎', '🧁', '🍩'][n % 4];
    tricky.push({ q: `${n} plates with 0 on each plate. ${n} × 0 = ?`, qAr: `${n} أطباق، في كل طبق 0. ${n} × 0 = ؟`, pic: GRP(n, 0, e), opts: nums(0, [n, 1, n + 1, 10]), ans: '0',
      why: `Every plate is empty. ${n} groups of nothing is nothing: <b>${n} × 0 = 0</b>. Any number times 0 is 0.`,
      whyAr: `كل الأطباق فارغة. ${n} مجموعات من لا شيء = لا شيء: <b>${n} × 0 = 0</b>. أي عدد × 0 = 0.`,
      hint: 'Look at the plates. How many treats can you see?', hintAr: 'انظري إلى الأطباق. كم قطعة ترين؟' });
    tricky.push({ q: `0 × ${n} = ?`, qAr: `0 × ${n} = ؟`, pic: '🫙', opts: nums(0, [n, 1, n - 1, 10]), ans: '0',
      why: `0 groups of ${n} means no groups at all, so there is nothing: <b>0 × ${n} = 0</b>.`,
      whyAr: `0 مجموعات من ${n} تعني أنه لا توجد أي مجموعة، فلا يوجد شيء: <b>0 × ${n} = 0</b>.`,
      hint: 'If you have zero groups, how many things do you have?', hintAr: 'إذا لم يكن عندكِ أي مجموعة، فكم شيئاً عندكِ؟' });
    tricky.push({ q: `${n} plates with 1 on each plate. ${n} × 1 = ?`, qAr: `${n} أطباق، في كل طبق 1. ${n} × 1 = ؟`, pic: GRP(n, 1, e), opts: nums(n, [1, n + 1, 0, n - 1]), ans: String(n),
      why: `One on each of ${n} plates makes ${n}. <b>${n} × 1 = ${n}</b>. Times 1 keeps the number the same.`,
      whyAr: `واحدة في كل طبق من ${n} أطباق تساوي ${n}. <b>${n} × 1 = ${n}</b>. الضرب في 1 يُبقي العدد كما هو.`,
      hint: 'Count the treats. There is one on each plate.', hintAr: 'عدّي القطع. في كل طبق قطعة واحدة.' });
    tricky.push({ q: `1 × ${n} = ?`, qAr: `1 × ${n} = ؟`, pic: GRP(1, n, e), opts: nums(n, [1, n + 1, 0, n - 1]), ans: String(n),
      why: `1 group of ${n} is just ${n}. <b>1 × ${n} = ${n}</b>.`, whyAr: `مجموعة واحدة فيها ${n} تساوي ${n}. <b>1 × ${n} = ${n}</b>.`,
      hint: 'There is only one plate. Count what is on it.', hintAr: 'يوجد طبق واحد فقط. عدّي ما عليه.' });
  }

  /* quiz 3: patterns in the multiplication table */
  const rowQ = [];
  const ROWS = {
    2: { test: x => x % 2 === 0, en: 'Products of 2 are always even: they end in 0, 2, 4, 6 or 8.', ar: 'نواتج الضرب في 2 دائماً زوجية (even): تنتهي بـ 0 أو 2 أو 4 أو 6 أو 8.' },
    5: { test: x => x % 5 === 0, en: 'Products of 5 always end in 0 or 5.', ar: 'نواتج الضرب في 5 تنتهي دائماً بـ 0 أو 5.' },
    10: { test: x => x % 10 === 0, en: 'Products of 10 always end in 0.', ar: 'نواتج الضرب في 10 تنتهي دائماً بـ 0.' },
    9: { test: x => x % 9 === 0, en: 'In the ×9 row the digits add up to 9 (like 3 + 6 = 9 in 36).', ar: 'في صف الضرب × 9 مجموع الرقمين يساوي 9 (مثل 3 + 6 = 9 في العدد 36).' },
  };
  for (const f of [2, 5, 10, 9]) for (let n = 2; n <= 10; n++) {
    const p = f * n, bad = [];
    while (bad.length < 3) { const x = R(Math.max(3, p - 15), p + 15); if (!ROWS[f].test(x) && !bad.includes(x)) bad.push(x); }
    rowQ.push({ q: `Which number is in the × ${f} row of the multiplication table?`, qAr: `أي عدد موجود في صف الضرب × ${f} في جدول الضرب؟`, pic: '🔢',
      opts: opts(p, bad, k => p + k * f + 1), ans: String(p),
      why: `<b>${p}</b> = ${n} × ${f}. ${ROWS[f].en}`, whyAr: `<b>${p}</b> = ${n} × ${f}. ${ROWS[f].ar}`,
      hint: ROWS[f].en.replace(/^Products/, 'Remember: products'), hintAr: 'تذكّري: ' + ROWS[f].ar });
  }

  /* quiz 4: skip-counting patterns */
  const seq = [];
  for (const f of [2, 5, 10, 9]) for (let st = 1; st <= 6; st++) {
    const xs = [0, 1, 2, 3, 4].map(k => f * (st + k)), gap = R(1, 4), ans = xs[gap];
    const bank = opts(ans, [ans + 1, ans - 1, ans + f, ans + 10, ans - f].filter(x => x > 0 && !xs.includes(x)), k => ans + k * 3 + 1);
    seq.push({ s: xs.map((x, k) => k === gap ? '___' : x).join(', '), ans: String(ans), bank,
      sAr: `أكملي النمط: نعدّ بالقفز ${f} في كل مرة.`,
      why: `The numbers go up by <b>${f}</b> each time. ${xs[gap - 1]} + ${f} = <b>${ans}</b>.`,
      whyAr: `الأعداد تزيد <b>${f}</b> في كل مرة. ${xs[gap - 1]} + ${f} = <b>${ans}</b>.`,
      hint: 'How much bigger is each number than the one before it?', hintAr: 'كم يزيد كل عدد عن العدد الذي قبله؟' });
  }

  addLesson({
    id: 'm-t2', island: 'm-t2', added: '2026-11-03', pic: '🔟',
    title: 'Topic 2: Facts with Patterns', sub: 'Multiply by 2, 5, 10, 9, 0 and 1',
    learn: [
      { title: '× 2 means doubles', titleAr: 'الضرب في 2 يعني الضِّعف',
        text: '4 pairs of socks: 4 × 2 = 4 + 4 = <b>8</b>. Times 2 answers are always <b>even</b>.',
        textAr: '٤ أزواج من الجوارب: 4 × 2 = 4 + 4 = <b>8</b>. نواتج الضرب في 2 دائماً أعداد <b>زوجية (even)</b>.',
        show: { kind: 'groups', g: 4, n: 2, e: '🧦' } },
      { title: '× 5: count by fives', titleAr: 'الضرب في 5: العدّ بالقفز خمسة خمسة',
        text: 'Each hand has 5 fingers: 5, 10, 15, 20, 25, 30. Times 5 answers end in <b>0 or 5</b>.',
        textAr: 'في كل يد ٥ أصابع: 5، 10، 15، 20، 25، 30. نواتج الضرب في 5 تنتهي بـ <b>0 أو 5</b>.',
        show: { kind: 'html', html: `<div class="chipsrow">${[1, 2, 3, 4, 5, 6].map(k => `<span class="ochip pop" style="animation-delay:${k * .4}s;flex-direction:column"><i>🖐️</i>${5 * k}</span>`).join('')}</div><p class="eqn pop" style="animation-delay:3s">6 × 5 = <b>30</b></p>` } },
      { title: '× 10: add a zero', titleAr: 'الضرب في 10: أضيفي صفراً',
        text: '7 cards worth 10 each: 10, 20, 30 … 70. To multiply by 10, write the number and put a <b>0</b> at the end: 7 × 10 = <b>70</b>.',
        textAr: '٧ بطاقات، قيمة كل واحدة 10: 10، 20، 30 … 70. للضرب في 10 اكتبي العدد وضعي <b>0</b> في آخره: 7 × 10 = <b>70</b>.',
        show: { kind: 'html', html: `<div class="chipsrow">${Array.from({ length: 7 }, (_, k) => `<span class="ochip pop" style="animation-delay:${k * .3}s;flex-direction:column"><i>🔟</i>${10 * (k + 1)}</span>`).join('')}</div><p class="eqn pop" style="animation-delay:2.6s">7 × 10 = 7<b>0</b></p>` } },
      { title: '× 9: the tens trick', titleAr: 'الضرب في 9: حيلة العشرة',
        text: '9 is one less than 10. So 6 × 9 = 6 × 10 − 6 = 60 − 6 = <b>54</b>. In the ×9 row the tens go up, the ones go down, and the digits add to 9!',
        textAr: '9 أقل من 10 بواحد. إذن 6 × 9 = 6 × 10 − 6 = 60 − 6 = <b>54</b>. في صف × 9 تزيد العشرات وتنقص الآحاد، ومجموع الرقمين 9!',
        show: { kind: 'html', html: `<div class="chipsrow" style="max-width:300px">${Array.from({ length: 10 }, (_, k) => `<span class="ochip pop" style="animation-delay:${k * .3}s;font-size:1rem">${k + 1} × 9 = <b style="color:var(--c)">${9 * (k + 1)}</b></span>`).join('')}</div>` } },
      { title: '× 0 and × 1', titleAr: 'الضرب في 0 والضرب في 1',
        text: '3 empty plates: 3 × 0 = <b>0</b>. 3 plates with 1 cookie each: 3 × 1 = <b>3</b>. Times 0 is always 0. Times 1 keeps the number the same.',
        textAr: '٣ أطباق فارغة: 3 × 0 = <b>0</b>. ٣ أطباق في كل منها كعكة واحدة: 3 × 1 = <b>3</b>. أي عدد × 0 = 0، وأي عدد × 1 = العدد نفسه.',
        show: { kind: 'html', html: `<div class="pop">${GRP(3, 0, '🍪')}<p class="eqn">3 × 0 = <b>0</b></p></div><div class="pop" style="animation-delay:1.2s">${GRP(3, 1, '🍪')}<p class="eqn">3 × 1 = <b>3</b></p></div>` } },
    ],
    acts: [
      { type: 'mc', title: '2s, 5s and 10s', pick: 6, start: 'Count by 2s, 5s or 10s!', startAr: 'عدّي بالقفز 2 أو 5 أو 10!', items: easy },
      { type: 'mc', title: '9s, 0s and 1s', pick: 6, start: 'Use the tens trick for 9. Remember the 0 and 1 rules!', startAr: 'استخدمي حيلة العشرة مع 9، وتذكّري قاعدتَي 0 و 1!', items: tricky },
      { type: 'mc', title: 'Table patterns', pick: 5, start: 'Use the patterns of each row!', startAr: 'استخدمي نمط كل صف في جدول الضرب!', items: rowQ },
      { type: 'fill', title: 'Skip-count patterns', pick: 5, start: 'Find the missing number in the pattern!', startAr: 'أوجدي العدد الناقص في النمط!', items: seq,
        hint: 'How much bigger is each number than the one before it?', hintAr: 'كم يزيد كل عدد عن العدد الذي قبله؟' },
    ],
  });
})();
