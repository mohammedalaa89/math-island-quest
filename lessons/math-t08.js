/* enVision Math Grade 3, Topic 8: Use strategies and properties to add and subtract – properties of addition, rounding, estimating, mental math.
   Our own explanations and generated questions (3.NBT.1, 3.NBT.2, 3.OA.9). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs, step) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k * (step || 1));
  const r10 = n => Math.round(n / 10) * 10, r100 = n => Math.round(n / 100) * 100;
  /* a number line from lo to hi with the halfway mark and a pin at n */
  const NL = (lo, hi, n, anim) => {
    const pos = (n - lo) / (hi - lo) * 100;
    return `<div style="direction:ltr;position:relative;width:250px;height:76px;margin:0 auto">
      <div style="position:absolute;left:0;right:0;top:40px;height:4px;background:#1E2A44;border-radius:2px"></div>
      ${[[0, lo], [50, (lo + hi) / 2], [100, hi]].map(([p, v]) => `<div style="position:absolute;left:${p}%;top:32px;transform:translateX(-50%);text-align:center"><div style="width:3px;height:20px;background:#1E2A44;margin:0 auto"></div><b style="font-size:.85rem">${v}</b></div>`).join('')}
      <div class="${anim ? 'pop' : ''}" style="position:absolute;left:${pos}%;top:0;transform:translateX(-50%);text-align:center;animation-delay:.6s"><b style="color:var(--c);font-size:1.05rem">${n}</b><div style="font-size:1rem;line-height:1">📍</div></div></div>`;
  };

  /* quiz 1: rounding */
  const round = [];
  for (let k = 0; k < 40; k++) {
    let n; do n = R(11, 989); while (n % 10 === 0);
    const lo = Math.floor(n / 10) * 10, hi = lo + 10, ans = r10(n), d = n % 10, up = d >= 5;
    round.push({ q: `Round ${n} to the nearest ten.`, qAr: `قرّبي العدد ${n} إلى أقرب عشرة.`, pic: NL(lo, hi, n),
      opts: nums(ans, [up ? lo : hi, r100(n), lo - 10, hi + 10, n]), ans: String(ans),
      why: `${n} is between ${lo} and ${hi}. The ones digit is ${d}, ${up ? `5 or more, so round <b>up</b>` : `less than 5, so round <b>down</b>`} to <b>${ans}</b>.`,
      whyAr: `${n} يقع بين ${lo} و ${hi}. رقم الآحاد هو ${d}، ${up ? `وهو 5 أو أكثر، فنقرّب <b>للأعلى</b>` : `وهو أقل من 5، فنقرّب <b>للأسفل</b>`} إلى <b>${ans}</b>.`,
      hint: 'Look at the ones digit. 5 or more goes up; less than 5 goes down.', hintAr: 'انظري إلى رقم الآحاد: 5 أو أكثر نقرّب للأعلى، وأقل من 5 نقرّب للأسفل.' });
  }
  for (let k = 0; k < 40; k++) {
    let n; do n = R(101, 949); while (n % 100 === 0 || n % 100 === 50 && k % 4);
    const lo = Math.floor(n / 100) * 100, hi = lo + 100, ans = r100(n), t = Math.floor(n / 10) % 10, up = t >= 5;
    round.push({ q: `Round ${n} to the nearest hundred.`, qAr: `قرّبي العدد ${n} إلى أقرب مئة.`, pic: NL(lo, hi, n),
      opts: nums(ans, [up ? lo : hi, r10(n), lo - 100, hi + 100], 100), ans: String(ans),
      why: `${n} is between ${lo} and ${hi}. The tens digit is ${t}, ${up ? `5 or more, so round <b>up</b>` : `less than 5, so round <b>down</b>`} to <b>${ans}</b>.`,
      whyAr: `${n} يقع بين ${lo} و ${hi}. رقم العشرات هو ${t}، ${up ? `وهو 5 أو أكثر، فنقرّب <b>للأعلى</b>` : `وهو أقل من 5، فنقرّب <b>للأسفل</b>`} إلى <b>${ans}</b>.`,
      hint: 'For hundreds, look at the tens digit. 5 or more goes up.', hintAr: 'عند التقريب لأقرب مئة انظري إلى رقم العشرات: 5 أو أكثر نقرّب للأعلى.' });
  }

  /* quiz 2: estimate */
  const est = [];
  for (let k = 0; k < 30; k++) {
    const a = R(12, 89), b = R(11, 89), add = k % 2 === 0, [x, y] = add ? [a, b] : [Math.max(a, b), Math.min(a, b)];
    if (!add && r10(x) === r10(y)) continue;
    const ra = r10(x), rb = r10(y), ans = add ? ra + rb : ra - rb, exact = add ? x + y : x - y, op = add ? '+' : '−';
    est.push({ q: `Estimate ${x} ${op} ${y} by rounding each number to the nearest ten.`, qAr: `قدّري ناتج ${x} ${op} ${y} بتقريب كل عدد إلى أقرب عشرة.`, pic: '🤔',
      opts: nums(ans, [exact, ans + 10, ans - 10, ans + 20], 10), ans: String(ans),
      why: `${x} rounds to ${ra} and ${y} rounds to ${rb}. ${ra} ${op} ${rb} = <b>${ans}</b>. (The exact answer is ${exact}, close to ${ans}!)`,
      whyAr: `${x} يُقرَّب إلى ${ra} و ${y} يُقرَّب إلى ${rb}. ${ra} ${op} ${rb} = <b>${ans}</b>. (الناتج الدقيق ${exact}، وهو قريب من ${ans}!)`,
      hint: 'Round each number first, then use the easy tens.', hintAr: 'قرّبي كل عدد أولاً، ثم احسبي بالعشرات السهلة.' });
  }
  for (let k = 0; k < 30; k++) {
    const a = R(120, 680), b = R(110, 390), add = k % 2 === 0, [x, y] = add ? [a, b] : [Math.max(a, b), Math.min(a, b)];
    if (!add && r100(x) === r100(y)) continue;
    const ra = r100(x), rb = r100(y), ans = add ? ra + rb : ra - rb, exact = add ? x + y : x - y, op = add ? '+' : '−';
    est.push({ q: `Estimate ${x} ${op} ${y} by rounding each number to the nearest hundred.`, qAr: `قدّري ناتج ${x} ${op} ${y} بتقريب كل عدد إلى أقرب مئة.`, pic: '🤔',
      opts: nums(ans, [exact, ans + 100, ans - 100, ans + 200], 100), ans: String(ans),
      why: `${x} rounds to ${ra} and ${y} rounds to ${rb}. ${ra} ${op} ${rb} = <b>${ans}</b>. (The exact answer is ${exact}.)`,
      whyAr: `${x} يُقرَّب إلى ${ra} و ${y} يُقرَّب إلى ${rb}. ${ra} ${op} ${rb} = <b>${ans}</b>. (الناتج الدقيق ${exact}.)`,
      hint: 'Look at the tens digit of each number to round to hundreds.', hintAr: 'انظري إلى رقم العشرات في كل عدد لتقرّبي لأقرب مئة.' });
  }

  /* quiz 3: sort the properties */
  const props = new Map();
  while (props.size < 36) {
    const a = R(2, 49), b = R(2, 19), c = R(2, 9), kind = props.size % 3;
    if (kind === 0 && a !== b) props.set(`${a} + ${b} = ${b} + ${a}`, 0);
    else if (kind === 1) props.set(`(${a} + ${b}) + ${c} = ${a} + (${b} + ${c})`, 1);
    else if (kind === 2) props.set(Math.random() < .5 ? `${a} + 0 = ${a}` : `0 + ${a} = ${a}`, 2);
  }

  /* quiz 4: mental math */
  const mental = [];
  for (let k = 0; k < 24; k++) {
    const a = R(21, 79), b = R(1, 6) * 10 + [7, 8, 9][k % 3], up = 10 - b % 10, s = a + b;
    if (s >= 100 && k % 2) continue;
    mental.push({ q: `${a} + ${b} = ?`, qAr: `${a} + ${b} = ؟`, pic: '🧠', opts: nums(s, [s + 10, s - 10, s - 1, s + 1, s - 2]), ans: String(s),
      why: `${b} is close to ${b + up}. ${a} + ${b + up} = ${a + b + up}, then take back ${up}: ${a + b + up} − ${up} = <b>${s}</b>.`,
      whyAr: `${b} قريب من ${b + up}. ${a} + ${b + up} = ${a + b + up}، ثم نطرح ${up} التي زدناها: ${a + b + up} − ${up} = <b>${s}</b>.`,
      hint: `Make ${b} a ten first: add ${up}. Remember to take ${up} away at the end.`, hintAr: `اجعلي ${b} عشرة كاملة بإضافة ${up}، وتذكّري أن تطرحي ${up} في النهاية.` });
  }
  for (let k = 0; k < 24; k++) {
    const b = R(1, 5) * 10 + [8, 9][k % 2], a = R(b + 12, 99), up = 10 - b % 10, d = a - b;
    mental.push({ q: `${a} − ${b} = ?`, qAr: `${a} − ${b} = ؟`, pic: '🧠', opts: nums(d, [d + 10, d - 10, d + 2, d - 2, d + 1]), ans: String(d),
      why: `${b} is close to ${b + up}. ${a} − ${b + up} = ${a - b - up}. We took away ${up} too many, so add ${up} back: <b>${d}</b>.`,
      whyAr: `${b} قريب من ${b + up}. ${a} − ${b + up} = ${a - b - up}. طرحنا ${up} زيادة، فنعيدها: <b>${d}</b>.`,
      hint: `Subtract ${b + up} instead, then add ${up} back.`, hintAr: `اطرحي ${b + up} بدلاً منه، ثم أضيفي ${up}.` });
  }
  for (let k = 0; k < 16; k++) {
    const a = R(1, 7) * 100 + R(1, 9) * 10 + R(0, 9), t = R(2, 9) * 10, s = a + t;
    mental.push({ q: `${a} + ${t} = ?`, qAr: `${a} + ${t} = ؟`, pic: '🧠', opts: nums(s, [s + 100, s - 10, a + t / 10, s + 10]), ans: String(s),
      why: `Add the tens: ${a} + ${t} = <b>${s}</b>. Count on by tens: ${Array.from({ length: t / 10 + 1 }, (_, j) => a + 10 * j).join(', ')}.`,
      whyAr: `اجمعي العشرات: ${a} + ${t} = <b>${s}</b>. عدّي بالقفز عشرة عشرة: ${Array.from({ length: t / 10 + 1 }, (_, j) => a + 10 * j).join('، ')}.`,
      hint: `${t} is ${t / 10} tens. Count on by tens from ${a}.`, hintAr: `${t} هي ${t / 10} عشرات. عدّي بالقفز عشرة من ${a}.` });
  }

  addLesson({
    id: 'm-t8', island: 'm-t8', added: '2026-11-03', pic: '🧮',
    title: 'Topic 8: Add and Subtract Smart', sub: 'Properties, rounding, estimating, mental math',
    learn: [
      { title: 'Properties of addition', titleAr: 'خصائص الجمع',
        text: '<b>Commutative</b>: change the order, same sum. <b>Associative</b>: change the grouping, same sum. <b>Identity</b>: add 0, the number stays the same.',
        textAr: '<b>الإبدال (commutative)</b>: نغيّر الترتيب والمجموع نفسه. <b>التجميع (associative)</b>: نغيّر طريقة التجميع والمجموع نفسه. <b>المحايد (identity)</b>: نجمع 0 فيبقى العدد كما هو.',
        show: { kind: 'html', html: `<div class="chipsrow" style="flex-direction:column;align-items:center">${[['🔄', '23 + 6 = 6 + 23'], ['🤝', '(8 + 2) + 5 = 8 + (2 + 5)'], ['0️⃣', '47 + 0 = 47']].map((x, k) => `<span class="ochip pop" style="animation-delay:${k * .8}s"><i>${x[0]}</i>${x[1]}</span>`).join('')}</div>` } },
      { title: 'Round to the nearest ten', titleAr: 'التقريب لأقرب عشرة',
        text: '47 is between 40 and 50. It is closer to 50. The ones digit 7 is 5 or more, so 47 rounds <b>up to 50</b>.',
        textAr: '47 يقع بين 40 و 50، وهو أقرب إلى 50. رقم الآحاد 7 هو 5 أو أكثر، لذلك نقرّب 47 <b>للأعلى إلى 50</b>.',
        show: { kind: 'html', html: `${NL(40, 50, 47, true)}<p class="eqn pop" style="animation-delay:1.2s">47 ➜ <b>50</b></p>` } },
      { title: 'Round to the nearest hundred', titleAr: 'التقريب لأقرب مئة',
        text: '362 is between 300 and 400. The tens digit 6 is 5 or more, so 362 rounds <b>up to 400</b>.',
        textAr: '362 يقع بين 300 و 400. رقم العشرات 6 هو 5 أو أكثر، لذلك نقرّب 362 <b>للأعلى إلى 400</b>.',
        show: { kind: 'html', html: `${NL(300, 400, 362, true)}<p class="eqn pop" style="animation-delay:1.2s">362 ➜ <b>400</b></p>` } },
      { title: 'Estimate', titleAr: 'التقدير (estimate)',
        text: 'To estimate 48 + 31, round first: 50 + 30 = <b>80</b>. The exact answer, 79, is close!',
        textAr: 'لتقدير 48 + 31 نقرّب أولاً: 50 + 30 = <b>80</b>. والناتج الدقيق 79 قريب جداً!',
        show: { kind: 'html', html: '<p class="eqn pop">48 + 31</p><p class="eqn pop" style="animation-delay:.9s">⬇ round</p><p class="eqn pop" style="animation-delay:1.6s">50 + 30 = <b>80</b></p><p class="eqn pop" style="animation-delay:2.4s">exact: 79 ✓ close!</p>' } },
      { title: 'Mental math: make a ten', titleAr: 'الحساب الذهني: كوّني عشرة',
        text: '36 + 29: 29 is close to 30. 36 + 30 = 66, then take back 1: <b>65</b>.',
        textAr: '36 + 29: العدد 29 قريب من 30. 36 + 30 = 66، ثم نطرح 1: <b>65</b>.',
        show: { kind: 'html', html: '<p class="eqn pop">36 + 29</p><p class="eqn pop" style="animation-delay:.9s">36 + 30 = 66</p><p class="eqn pop" style="animation-delay:1.8s">66 − 1 = <b>65</b></p>' } },
    ],
    acts: [
      { type: 'mc', title: 'Rounding', pick: 6, start: 'Which ten or hundred is closer?', startAr: 'أي عشرة أو مئة أقرب؟', items: round },
      { type: 'mc', title: 'Estimate', pick: 5, start: 'Round first, then add or subtract!', startAr: 'قرّبي أولاً، ثم اجمعي أو اطرحي!', items: est },
      { type: 'sort', title: 'Which property?', pick: 6, items: [...props.entries()],
        ask: 'Drag each number sentence to its property.', askAr: 'اسحبي كل جملة عددية إلى الخاصية المناسبة.',
        start: 'Order, grouping, or adding zero?', startAr: 'تغيير الترتيب، أم التجميع، أم جمع الصفر؟',
        hint: 'Did the order change? Did the brackets move? Is there a 0?', hintAr: 'هل تغيّر الترتيب؟ هل تحرّكت الأقواس؟ هل يوجد 0؟',
        buckets: [
          { label: 'Commutative', labelAr: 'الإبدال', pic: '🔄', why: '{w}: the numbers swapped places. Same sum!', whyAr: '{w}: العددان تبادلا مكانيهما، والمجموع نفسه!' },
          { label: 'Associative', labelAr: 'التجميع', pic: '🤝', why: '{w}: the brackets moved to group different numbers. Same sum!', whyAr: '{w}: الأقواس تحرّكت لتجمع أعداداً مختلفة، والمجموع نفسه!' },
          { label: 'Identity (+ 0)', labelAr: 'المحايد (+ 0)', pic: '0️⃣', why: '{w}: adding 0 keeps the number the same.', whyAr: '{w}: جمع الصفر يُبقي العدد كما هو.' },
        ] },
      { type: 'mc', title: 'Mental math', pick: 6, start: 'Use a friendly ten to help!', startAr: 'استعيني بعشرة سهلة!', items: mental },
    ],
  });
})();
