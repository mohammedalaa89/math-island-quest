/* enVision Math Grade 3, Topic 6: Connect area to multiplication and addition – unit squares, rows × columns, adding areas.
   Our own explanations and generated questions (3.MD.5, 3.MD.6, 3.MD.7). English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const opts = (ans, cands, more) => {
    const out = [String(ans)];
    for (const x of cands) { const v = String(x); if (x != null && v !== '' && !out.includes(v)) out.push(v); if (out.length === 4) break; }
    for (let k = 1; out.length < 4 && k < 99; k++) { const v = String(more(k)); if (!out.includes(v)) out.push(v); }
    return out;
  };
  const nums = (ans, xs) => opts(ans, xs.filter(x => Number.isInteger(x) && x >= 0), k => ans + k);
  const BLUE = '#5BB8FF', ORNG = '#FFB060', GRN = '#6FD08C';
  /* a grid of unit squares; col(r, c) gives the colour of each square, or null for an empty spot */
  const GRID = (rows, cols, col, anim, sz) => {
    sz = sz || (cols > 8 ? 20 : 26);
    return `<div style="direction:ltr;display:inline-grid;grid-template-columns:repeat(${cols},${sz}px);gap:2px;margin:0 auto">${Array.from({ length: rows * cols }, (_, k) => {
      const r = Math.floor(k / cols), c = k % cols, bg = col(r, c);
      return bg ? `<span class="${anim ? 'pop' : ''}" style="width:${sz}px;height:${sz}px;background:${bg};border:1px solid rgba(0,0,0,.25);border-radius:3px;animation-delay:${anim ? r * .35 : 0}s"></span>` : `<span style="width:${sz}px;height:${sz}px"></span>`;
    }).join('')}</div>`;
  };
  const RECT = (r, c, anim) => GRID(r, c, () => BLUE, anim);
  const TWO = (r, a, b, anim) => GRID(r, a + b, (_, c) => c < a ? BLUE : ORNG, anim);
  /* an L shape: top part h1 × w1, bottom-left part h2 × w2 */
  const ELL = (h1, w1, h2, w2) => GRID(h1 + h2, w1, (r, c) => r < h1 ? BLUE : c < w2 ? GRN : null);

  /* quiz 1: count the unit squares */
  const count = [];
  for (let r = 2; r <= 6; r++) for (let c = 2; c <= 8; c++) {
    const p = r * c;
    count.push({ q: 'Each square is 1 square unit. What is the area?', qAr: 'كل مربع = 1 وحدة مربعة. ما المساحة (area)؟', pic: RECT(r, c),
      opts: nums(p, [r + c, 2 * (r + c), p + c, p - r, p + 1]), ans: String(p),
      why: `${r} rows with ${c} squares in each row: ${r} × ${c} = <b>${p}</b> square units.`,
      whyAr: `${r} صفوف، في كل صف ${c} مربعات: ${r} × ${c} = <b>${p}</b> وحدة مربعة.`,
      hint: 'Count the squares in one row, then count the rows. Multiply!', hintAr: 'عدّي المربعات في صف واحد، ثم عدّي الصفوف، ثم اضربي!' });
  }

  /* quiz 2: length × width, with units */
  const UNITS = [['cm', 'square centimeters', 'سنتيمتر مربع', 'سم'], ['m', 'square meters', 'متر مربع', 'م'], ['ft', 'square feet', 'قدم مربع', 'قدم'], ['in.', 'square inches', 'بوصة مربعة', 'بوصة']];
  const THINGS = [['🖼️', 'picture', 'صورة'], ['🧶', 'rug', 'سجادة'], ['🌱', 'garden', 'حديقة'], ['📒', 'notebook cover', 'غلاف دفتر'], ['🏠', 'room floor', 'أرضية غرفة'], ['🟫', 'table top', 'سطح طاولة']];
  const sides = [];
  for (let L = 3; L <= 9; L++) for (let W = 2; W < L; W++) {
    const [u, uu, uuAr, uAr] = UNITS[(L + W) % 4], [e, th, thAr] = THINGS[(L * W) % 6], p = L * W, ans = `${p} ${uu}`;
    sides.push({ q: `A ${th} is ${L} ${u} long and ${W} ${u} wide. What is its area?`, qAr: `${thAr} طولها ${L} ${uAr} وعرضها ${W} ${uAr}. ما مساحتها (area)؟`, pic: e,
      opts: opts(ans, [`${L + W} ${uu}`, `${2 * (L + W)} ${uu}`, `${p} ${u}`, `${p + L} ${uu}`], k => `${p + k} ${uu}`), ans,
      why: `Area = length × width = ${L} × ${W} = <b>${p}</b>. Area is counted in <b>square</b> units, so it is ${p} ${uu}.`,
      whyAr: `المساحة = الطول × العرض = ${L} × ${W} = <b>${p}</b>. نقيس المساحة بالوحدات <b>المربعة</b>، فهي ${p} ${uuAr} (${uu}).`,
      hint: 'Multiply the length by the width. Area uses square units.', hintAr: 'اضربي الطول في العرض. المساحة تُقاس بالوحدات المربعة.' });
  }

  /* quiz 3: add the areas (split rectangles and L shapes) */
  const add = [];
  for (let r = 2; r <= 5; r++) for (let a = 2; a <= 5; a++) for (let b = 1; b <= 3; b++) {
    const x = r * a, y = r * b, t = x + y;
    add.push({ q: 'The rectangle is split into two parts. What is the total area?', qAr: 'المستطيل مقسوم إلى جزأين. ما المساحة الكلية؟', pic: TWO(r, a, b),
      opts: nums(t, [x, y, r * (a + b + 1), t + 1, t - r]), ans: String(t),
      why: `Blue: ${r} × ${a} = ${x}. Orange: ${r} × ${b} = ${y}. Add: ${x} + ${y} = <b>${t}</b>. That is the same as ${r} × ${a + b} = ${t}!`,
      whyAr: `الأزرق: ${r} × ${a} = ${x}. البرتقالي: ${r} × ${b} = ${y}. نجمع: ${x} + ${y} = <b>${t}</b>. وهو نفس ${r} × ${a + b} = ${t}!`,
      hint: 'Find the area of the blue part and the orange part, then add them.', hintAr: 'أوجدي مساحة الجزء الأزرق ومساحة الجزء البرتقالي، ثم اجمعيهما.' });
  }
  for (let h1 = 2; h1 <= 3; h1++) for (let w1 = 4; w1 <= 7; w1++) for (let h2 = 1; h2 <= 3; h2++) {
    const w2 = Math.max(1, w1 - 3 + (h2 % 2)), x = h1 * w1, y = h2 * w2, t = x + y;
    add.push({ q: 'Find the area of this shape.', qAr: 'أوجدي مساحة هذا الشكل.', pic: ELL(h1, w1, h2, w2),
      opts: nums(t, [x, (h1 + h2) * w1, t + 1, t - 2, y + w1]), ans: String(t),
      why: `Break it into two rectangles. Blue: ${h1} × ${w1} = ${x}. Green: ${h2} × ${w2} = ${y}. ${x} + ${y} = <b>${t}</b> square units.`,
      whyAr: `قسّمي الشكل إلى مستطيلين. الأزرق: ${h1} × ${w1} = ${x}. الأخضر: ${h2} × ${w2} = ${y}. ${x} + ${y} = <b>${t}</b> وحدة مربعة.`,
      hint: 'Break the shape into two rectangles. Find each area, then add.', hintAr: 'قسّمي الشكل إلى مستطيلين، وأوجدي مساحة كل واحد، ثم اجمعي.' });
  }

  /* quiz 4: missing side */
  const side = [];
  for (let r = 2; r <= 9; r++) for (let c = 2; c <= 9; c++) if (r !== c) {
    const p = r * c;
    side.push({ s: `Area = ${p} square units. ${r} rows of ___ squares`, ans: String(c),
      sAr: `المساحة = ${p} وحدة مربعة، وفيها ${r} صفوف. كم مربعاً في كل صف؟`,
      bank: opts(c, [c + 1, c - 1, p - r, r, c + 2].filter(v => v > 0 && v !== c), k => c + k + 2),
      why: `${r} × <b>${c}</b> = ${p}. We can check: ${p} ÷ ${r} = ${c}.`, whyAr: `${r} × <b>${c}</b> = ${p}. نتحقّق: ${p} ÷ ${r} = ${c}.`,
      hint: `${r} times what number makes ${p}?`, hintAr: `${r} ضرب أي عدد يساوي ${p}؟` });
  }

  addLesson({
    id: 'm-t6', island: 'm-t6', added: '2026-11-03', pic: '🟦',
    title: 'Topic 6: Area', sub: 'Unit squares, rows × columns, adding areas',
    learn: [
      { title: 'What is area?', titleAr: 'ما هي المساحة (area)؟',
        text: 'Area is how many <b>unit squares</b> cover a flat shape with no gaps and no overlaps. Count them: <b>12 square units</b>.',
        textAr: 'المساحة هي عدد <b>المربعات الوحدة (unit squares)</b> التي تغطي الشكل بلا فراغات وبلا تداخل. عدّيها: <b>12 وحدة مربعة</b>.',
        show: { kind: 'html', html: `${RECT(3, 4, true)}<p class="eqn pop" style="animation-delay:1.4s">Area = <b>12</b> square units</p>` } },
      { title: 'Rows × columns', titleAr: 'الصفوف × الأعمدة',
        text: 'No need to count one by one! 4 rows with 5 squares in each row: 4 × 5 = <b>20</b> square units.',
        textAr: 'لا داعي للعدّ واحداً واحداً! 4 صفوف في كل صف 5 مربعات: 4 × 5 = <b>20</b> وحدة مربعة.',
        show: { kind: 'array', r: 4, c: 5, e: '🟦' } },
      { title: 'Square units', titleAr: 'الوحدات المربعة',
        text: 'Small things: square centimeters or square inches. Big things like a room: square meters or square feet.',
        textAr: 'للأشياء الصغيرة: سنتيمتر مربع أو بوصة مربعة. وللأشياء الكبيرة مثل الغرفة: متر مربع أو قدم مربع.',
        show: { kind: 'chips', items: [['📒', 'square centimeters'], ['🖼️', 'square inches'], ['🏠', 'square meters'], ['🧶', 'square feet']] } },
      { title: 'Same area, different shapes', titleAr: 'نفس المساحة وأشكال مختلفة',
        text: '2 × 6, 3 × 4 and 1 × 12 all cover <b>12</b> square units!',
        textAr: '2 × 6 و 3 × 4 و 1 × 12 كلها تغطي <b>12</b> وحدة مربعة!',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:16px;align-items:flex-end"><div class="pop">${GRID(2, 6, () => BLUE, false, 16)}<p class="eqn" style="font-size:1rem">2 × 6</p></div><div class="pop" style="animation-delay:.8s">${GRID(3, 4, () => ORNG, false, 16)}<p class="eqn" style="font-size:1rem">3 × 4</p></div><div class="pop" style="animation-delay:1.6s">${GRID(1, 12, () => GRN, false, 16)}<p class="eqn" style="font-size:1rem">1 × 12</p></div></div>` } },
      { title: 'Break apart and add', titleAr: 'جزّئي ثم اجمعي',
        text: 'A big rectangle 4 × 7 can be split: 4 × 5 = 20 and 4 × 2 = 8. 20 + 8 = <b>28</b>. An L shape is two rectangles added together.',
        textAr: 'المستطيل الكبير 4 × 7 يمكن تقسيمه: 4 × 5 = 20 و 4 × 2 = 8. ثم 20 + 8 = <b>28</b>. والشكل L هو مستطيلان نجمع مساحتيهما.',
        show: { kind: 'html', html: `<div class="pop">${TWO(4, 5, 2)}</div><p class="eqn pop" style="animation-delay:1s">20 + 8 = <b>28</b></p><div class="pop" style="animation-delay:1.8s">${ELL(2, 6, 2, 3)}</div><p class="eqn pop" style="animation-delay:2.4s">12 + 6 = <b>18</b></p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Count the area', pick: 6, start: 'Rows times squares in each row!', startAr: 'الصفوف × عدد المربعات في كل صف!', items: count },
      { type: 'mc', title: 'Length × width', pick: 5, start: 'Multiply the sides. Use square units!', startAr: 'اضربي الطول في العرض، واستخدمي الوحدات المربعة!', items: sides },
      { type: 'mc', title: 'Add the areas', pick: 5, start: 'Find each part, then add!', startAr: 'أوجدي مساحة كل جزء، ثم اجمعي!', items: add },
      { type: 'fill', title: 'Missing side', pick: 5, start: 'Use division to find the missing side!', startAr: 'استخدمي القسمة لتجدي الضلع الناقص!', items: side },
    ],
  });
})();
