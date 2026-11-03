/* enVision Mathematics Grade 3, Topic 15: Attributes of two-dimensional shapes (Common Core 3.G.1).
   Polygons, sides and angles, right angles, quadrilaterals: square, rectangle, rhombus, trapezoid, parallelogram. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const OPTS = (ans, wrongs) => { const out = [String(ans)]; for (const w of wrongs.concat([ans + 1, ans + 2, ans - 1])) { const s = String(w); if (out.length < 4 && w >= 0 && !out.includes(s)) out.push(s); } return out; };
  const INK = '#1E2A44', COLS = ['#FFC83D', '#7FE0A8', '#A8D4FF', '#FFB0A0', '#C9B6FF', '#FFD199'];

  /* draw a polygon; o.right = corner indexes to mark with a right-angle box; o.ticks = side indexes to mark as equal; o.par = side indexes to colour as parallel */
  function SHAPE(pts, o) {
    o = o || {}; const n = pts.length;
    let p = `<polygon points="${pts.map(q => q.map(v => v.toFixed(1)).join(',')).join(' ')}" fill="${o.fill || ANY(COLS)}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    (o.par || []).forEach(i => { const [a, b] = [pts[i], pts[(i + 1) % n]]; p += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="#F0466B" stroke-width="5" stroke-linecap="round"${o.anim ? ' opacity="0"><animate attributeName="opacity" from="0" to="1" begin="1s" dur=".4s" fill="freeze"/></line>' : '/>'}`; });
    (o.right || []).forEach(i => {
      const c = pts[i], a = pts[(i + n - 1) % n], b = pts[(i + 1) % n], u = v => { const L = Math.hypot(v[0], v[1]); return [v[0] / L * 11, v[1] / L * 11]; };
      const ua = u([a[0] - c[0], a[1] - c[1]]), ub = u([b[0] - c[0], b[1] - c[1]]);
      p += `<path d="M${c[0] + ua[0]} ${c[1] + ua[1]} L${c[0] + ua[0] + ub[0]} ${c[1] + ua[1] + ub[1]} L${c[0] + ub[0]} ${c[1] + ub[1]}" fill="none" stroke="#F0466B" stroke-width="2.5"${o.anim ? ' opacity="0"><animate attributeName="opacity" from="0" to="1" begin="1s" dur=".4s" fill="freeze"/></path>' : '/>'}`;
    });
    (o.ticks || []).forEach(i => {
      const a = pts[i], b = pts[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]), nx = -(b[1] - a[1]) / L * 7, ny = (b[0] - a[0]) / L * 7;
      p += `<line x1="${mx - nx}" y1="${my - ny}" x2="${mx + nx}" y2="${my + ny}" stroke="${INK}" stroke-width="2.5"/>`;
    });
    return `<svg viewBox="-6 -6 182 132" width="${o.size || 170}" style="max-width:100%;height:auto" role="img" aria-label="shape">${p}</svg>`;
  }
  const reg = (k, r, rot) => Array.from({ length: k }, (_, i) => { const a = (rot || -90) * Math.PI / 180 + i * 2 * Math.PI / k; return [85 + r * Math.cos(a), 60 + r * Math.sin(a)]; });
  /* random shapes of each kind, roughly centred in 170 × 120 */
  const MAKE = {
    square: () => { const s = R(70, 100), x = 85 - s / 2, y = 60 - s / 2; return { pts: [[x, y], [x + s, y], [x + s, y + s], [x, y + s]], right: [0, 1, 2, 3], ticks: [0, 1, 2, 3] }; },
    rectangle: () => { let w, h; do { w = R(80, 160); h = R(40, 105); } while (Math.abs(w - h) < 30); const x = 85 - w / 2, y = 60 - h / 2; return { pts: [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], right: [0, 1, 2, 3] }; },
    rhombus: () => {
      if (Math.random() < .5) { const w = R(62, 80), h = R(40, 54); return { pts: [[85, 60 - h], [85 + w, 60], [85, 60 + h], [85 - w, 60]], ticks: [0, 1, 2, 3] }; }
      const s = R(70, 95), ang = R(50, 65) * Math.PI / 180, dx = s * Math.cos(ang), dy = s * Math.sin(ang), x = 85 - (s + dx) / 2, y = 60 - dy / 2;
      return { pts: [[x + dx, y], [x + dx + s, y], [x + s, y + dy], [x, y + dy]], ticks: [0, 1, 2, 3] };
    },
    trapezoid: () => {
      const b = R(130, 165), t = R(50, 100), h = R(60, 95), x = 85 - b / 2, y = 60 + h / 2;
      if (Math.random() < .4) return { pts: [[x, y - h], [x + t, y - h], [x + b, y], [x, y]], right: [0, 3], par: [0, 2] };
      const off = R(-15, 15), tx = 85 - t / 2 + off; return { pts: [[tx, y - h], [tx + t, y - h], [x + b, y], [x, y]], par: [0, 2] };
    },
    parallelogram: () => { const s = R(100, 130), dx = R(25, 40), h = R(55, 85), x = 85 - (s + dx) / 2, y = 60 - h / 2; return { pts: [[x + dx, y], [x + dx + s, y], [x + s, y + h], [x, y + h]] }; },
    triangle: () => Math.random() < .5 ? { pts: [[20, 110], [20, 15], [150, 110]], right: [0] } : { pts: [[85, 8], [155, 112], [15, 112]] },
    pentagon: () => ({ pts: reg(5, 58) }),
    hexagon: () => ({ pts: reg(6, 58, 0) }),
    octagon: () => ({ pts: reg(8, 58, 22.5) }),
  };
  const AR = { square: 'مربع', rectangle: 'مستطيل', rhombus: 'معيّن', trapezoid: 'شبه منحرف', parallelogram: 'متوازي أضلاع', triangle: 'مثلث', pentagon: 'خماسي', hexagon: 'سداسي', octagon: 'ثماني' };
  const SIDES = { square: 4, rectangle: 4, rhombus: 4, trapezoid: 4, parallelogram: 4, triangle: 3, pentagon: 5, hexagon: 6, octagon: 8 };
  const WHY = {
    square: ['4 equal sides AND 4 right angles. It is also a rectangle and a rhombus, but <b>square</b> is its best name.', '4 أضلاع متساوية و4 زوايا قائمة. هو أيضاً مستطيل ومعيّن، لكن أفضل اسم له <b>مربع (square)</b>.'],
    rectangle: ['4 right angles (square corners), and the sides are not all equal. It is a <b>rectangle</b>.', '4 زوايا قائمة، والأضلاع ليست كلها متساوية. إنه <b>مستطيل (rectangle)</b>.'],
    rhombus: ['4 equal sides (see the little marks), but no square corners. It is a <b>rhombus</b>.', '4 أضلاع متساوية (انظري العلامات الصغيرة)، لكن بلا زوايا قائمة. إنه <b>معيّن (rhombus)</b>.'],
    trapezoid: ['It has exactly <b>one pair</b> of parallel sides (the red ones). It is a <b>trapezoid</b>.', 'له <b>زوج واحد</b> فقط من الأضلاع المتوازية (الحمراء). إنه <b>شبه منحرف (trapezoid)</b>.'],
    parallelogram: ['Two pairs of parallel sides, no square corners, and the sides are not all equal. It is a <b>parallelogram</b>.', 'زوجان من الأضلاع المتوازية، بلا زوايا قائمة، والأضلاع ليست كلها متساوية. إنه <b>متوازي أضلاع (parallelogram)</b>.'],
  };

  /* quiz 1: best name for a quadrilateral */
  const QUADS = ['square', 'rectangle', 'rhombus', 'trapezoid', 'parallelogram'];
  const names = [];
  QUADS.forEach(t => { for (let k = 0; k < 8; k++) {
    const s = MAKE[t]();
    names.push({ q: 'What is the best name for this shape?', qAr: 'ما أفضل اسم لهذا الشكل؟', pic: SHAPE(s.pts, s),
      opts: [t, ...shuffle(QUADS.filter(x => x !== t)).slice(0, 3)], ans: t, why: WHY[t][0], whyAr: WHY[t][1],
      hint: 'Check: are there square corners (red boxes)? Are all 4 sides equal (little marks)? Which sides are parallel?', hintAr: 'تحقّقي: هل توجد زوايا قائمة (المربعات الحمراء)؟ هل الأضلاع الأربعة متساوية (العلامات الصغيرة)؟ أي الأضلاع متوازية؟' });
  } });

  /* quiz 2: count sides, angles and right angles */
  const counts = [];
  const RIGHT = s => (s.right || []).length;
  Object.keys(MAKE).forEach(t => { for (let k = 0; k < 4; k++) {
    const s = MAKE[t](), n = SIDES[t], ask = k % 3;
    if (ask === 2 && SIDES[t] > 4) continue;
    const plain = Object.assign({}, s, { right: [], ticks: [], par: [] }), rr = RIGHT(s);
    if (ask === 0) counts.push({ q: 'How many sides does this shape have?', qAr: 'كم ضلعاً لهذا الشكل؟', pic: SHAPE(s.pts, plain), opts: OPTS(n, [n + 1, n - 1, n * 2]), ans: String(n),
      why: `Count the straight sides all the way around: <b>${n}</b>. A ${n}-sided shape is called a ${t === 'triangle' ? 'triangle' : n === 4 ? 'quadrilateral' : t}.`,
      whyAr: `عدّي الأضلاع المستقيمة حول الشكل كله: <b>${n}</b>. الشكل الذي له ${n} أضلاع اسمه ${n === 4 ? 'رباعي الأضلاع (quadrilateral)' : AR[t] + ' (' + t + ')'}.`,
      hint: 'Put your finger on one side and count each side as you go around. Stop when you get back to the start.', hintAr: 'ضعي إصبعكِ على ضلع، وعدّي كل ضلع وأنتِ تدورين حول الشكل. توقّفي عندما تعودين إلى البداية.' });
    else if (ask === 1) counts.push({ q: 'How many angles (corners) does this shape have?', qAr: 'كم زاوية (ركناً) لهذا الشكل؟', pic: SHAPE(s.pts, plain), opts: OPTS(n, [n + 1, n - 1, n * 2]), ans: String(n),
      why: `Every corner is an angle. There are <b>${n}</b> corners. A polygon always has the same number of angles as sides.`,
      whyAr: `كل ركن هو زاوية. يوجد <b>${n}</b> أركان. للمضلّع دائماً عدد زوايا يساوي عدد أضلاعه.`,
      hint: 'Count the pointy corners where two sides meet.', hintAr: 'عدّي الأركان التي يلتقي فيها ضلعان.' });
    else counts.push({ q: 'How many right angles (square corners) does this shape have?', qAr: 'كم زاوية قائمة (ركن مربع) في هذا الشكل؟', pic: SHAPE(s.pts, plain), opts: OPTS(rr, [0, 1, 2, 4]), ans: String(rr),
      why: rr ? `<b>${rr}</b> corner${rr > 1 ? 's are' : ' is'} exactly like the corner of a book: ${rr > 1 ? 'those are' : 'that is a'} right angle${rr > 1 ? 's' : ''}.` : 'No corner is a square corner. Some are wider and some are narrower. So there are <b>0</b> right angles.',
      whyAr: rr ? `<b>${rr}</b> ${rr > 1 ? 'أركان تشبه' : 'ركن يشبه'} ركن الكتاب تماماً: ${rr > 1 ? 'هذه زوايا قائمة' : 'هذه زاوية قائمة'}.` : 'لا يوجد ركن مربع. بعض الزوايا أوسع وبعضها أضيق. إذن عدد الزوايا القائمة <b>0</b>.',
      hint: 'Imagine putting the corner of a book in each corner. Does it fit exactly?', hintAr: 'تخيّلي أنكِ تضعين ركن كتاب في كل ركن. هل يناسبه تماماً؟' });
  } });

  /* quiz 3: quadrilateral or not? */
  const quadSort = [['square', 0], ['rectangle', 0], ['rhombus', 0], ['trapezoid', 0], ['parallelogram', 0], ['📄 sheet of paper', 0], ['🚪 door', 0], ['🖼️ picture frame', 0], ['📱 phone screen', 0], ['🪁 kite', 0],
    ['triangle', 1], ['pentagon', 1], ['hexagon', 1], ['octagon', 1], ['⚪ circle', 1], ['🛑 stop sign', 1], ['🍕 pizza slice', 1], ['⚽ ball', 1], ['🔺 triangle sign', 1]];

  /* quiz 4: riddles */
  const RID = [
    ['I have 4 equal sides and 4 right angles.', 'لي 4 أضلاع متساوية و4 زوايا قائمة.', 'square', 'All sides equal AND all corners square: that is a square.', 'كل الأضلاع متساوية وكل الزوايا قائمة: هذا هو المربع.'],
    ['I have 4 right angles, but my sides are not all equal.', 'لي 4 زوايا قائمة، لكن أضلاعي ليست كلها متساوية.', 'rectangle', '4 square corners with a long side and a short side: a rectangle.', '4 زوايا قائمة مع ضلع طويل وضلع قصير: مستطيل.'],
    ['I have 4 equal sides, but no right angles.', 'لي 4 أضلاع متساوية، لكن بلا زوايا قائمة.', 'rhombus', 'Equal sides but slanted corners: a rhombus.', 'أضلاع متساوية لكن الزوايا مائلة: معيّن.'],
    ['I have 4 sides and exactly one pair of parallel sides.', 'لي 4 أضلاع، وزوج واحد فقط من الأضلاع المتوازية.', 'trapezoid', 'Only one pair of parallel sides: a trapezoid.', 'زوج واحد فقط من الأضلاع المتوازية: شبه منحرف.'],
    ['I have 3 sides and 3 angles.', 'لي 3 أضلاع و3 زوايا.', 'triangle', '"Tri" means 3: a triangle.', 'كلمة "tri" تعني 3: مثلث.'],
    ['I have 5 sides and 5 angles.', 'لي 5 أضلاع و5 زوايا.', 'pentagon', '"Penta" means 5: a pentagon.', 'كلمة "penta" تعني 5: خماسي.'],
    ['I have 6 sides. Bees build their homes in my shape.', 'لي 6 أضلاع. النحل يبني بيوته على شكلي.', 'hexagon', '"Hexa" means 6: a hexagon.', 'كلمة "hexa" تعني 6: سداسي.'],
    ['I have 8 sides. You see me on a stop sign.', 'لي 8 أضلاع. ترينني على إشارة قف.', 'octagon', '"Octo" means 8 (like an octopus with 8 arms): an octagon.', 'كلمة "octo" تعني 8 (مثل الأخطبوط له 8 أذرع): ثماني.'],
    ['I have 2 pairs of parallel sides, no right angles, and my sides are not all equal.', 'لي زوجان من الأضلاع المتوازية، بلا زوايا قائمة، وأضلاعي ليست كلها متساوية.', 'parallelogram', 'Two pairs of parallel sides with slanted corners: a parallelogram.', 'زوجان من الأضلاع المتوازية مع زوايا مائلة: متوازي أضلاع.'],
    ['I am a rectangle AND a rhombus at the same time.', 'أنا مستطيل ومعيّن في نفس الوقت.', 'square', 'A rectangle has 4 right angles, a rhombus has 4 equal sides. Only a square has both!', 'المستطيل له 4 زوايا قائمة، والمعيّن له 4 أضلاع متساوية. المربع وحده له الصفتان!'],
    ['I am a polygon with 4 sides and 4 angles. My general name is…', 'أنا مضلّع لي 4 أضلاع و4 زوايا. اسمي العام هو…', 'quadrilateral', '"Quad" means 4. Every 4-sided polygon is a quadrilateral.', 'كلمة "quad" تعني 4. كل مضلّع له 4 أضلاع هو رباعي أضلاع.'],
    ['I have 4 sides. My top and bottom are parallel, but my two other sides lean in.', 'لي 4 أضلاع. ضلعاي العلوي والسفلي متوازيان، والضلعان الآخران مائلان إلى الداخل.', 'trapezoid', 'One pair of parallel sides (top and bottom): a trapezoid.', 'زوج واحد من الأضلاع المتوازية (العلوي والسفلي): شبه منحرف.'],
  ];
  const ALLN = ['square', 'rectangle', 'rhombus', 'trapezoid', 'parallelogram', 'triangle', 'pentagon', 'hexagon', 'octagon', 'quadrilateral'];
  const riddles = [];
  RID.forEach(([en, ar, ans, w, wA]) => {
    const pool = ans === 'quadrilateral' ? ['triangle', 'pentagon', 'hexagon', 'octagon'] : ans === 'square' ? ALLN.filter(x => x !== 'square' && x !== 'quadrilateral' && x !== 'rectangle' && x !== 'rhombus') : ALLN.filter(x => x !== ans && x !== 'quadrilateral');
    riddles.push({ q: `${en}<br>Which shape am I?`, qAr: `${ar}<br>ما الشكل؟`, pic: '🤔', opts: [ans, ...shuffle(pool).slice(0, 3)], ans, why: `${w} (<b>${ans}</b>)`, whyAr: `${wA} (<b>${AR[ans] || 'رباعي أضلاع'}</b>)`,
      hint: 'Count the sides first. Then think about right angles, equal sides and parallel sides.', hintAr: 'عدّي الأضلاع أولاً. ثم فكّري في الزوايا القائمة والأضلاع المتساوية والمتوازية.' });
  });

  const sq = MAKE.square(), rc = MAKE.rectangle(), rh = { pts: [[85, 4], [160, 60], [85, 116], [10, 60]], ticks: [0, 1, 2, 3] }, tz = { pts: [[45, 15], [125, 15], [165, 105], [5, 105]], par: [0, 2] };
  const fig = (s, label, d, o) => `<div class="pop" style="text-align:center;animation-delay:${d}s">${SHAPE(s.pts, Object.assign({ size: 130, anim: true }, s, o || {}))}<p class="eqn" style="font-size:1.1rem">${label}</p></div>`;

  addLesson({
    id: 'm-t15', island: 'm-t15', added: '2026-11-03', pic: '🔷',
    title: 'Shapes with 4 Sides', sub: 'Sides, angles, right angles and quadrilaterals',
    learn: [
      { title: 'Polygons', titleAr: 'المضلّعات (polygons)',
        text: 'A <b>polygon</b> is a closed shape with straight sides. Count its sides: 3 = triangle, 4 = quadrilateral, 5 = pentagon, 6 = hexagon.',
        textAr: '<b>المضلّع (polygon)</b> شكل مغلق أضلاعه مستقيمة. عدّي أضلاعه: 3 = مثلث (triangle)، 4 = رباعي (quadrilateral)، 5 = خماسي (pentagon)، 6 = سداسي (hexagon).',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:8px">${fig({ pts: [[85, 8], [155, 112], [15, 112]] }, '3 sides', 0)}${fig({ pts: [[20, 20], [150, 20], [150, 100], [20, 100]] }, '4 sides', .5)}${fig({ pts: reg(5, 58) }, '5 sides', 1)}${fig({ pts: reg(6, 58, 0) }, '6 sides', 1.5)}</div>` } },
      { title: 'Right angles', titleAr: 'الزوايا القائمة (right angles)',
        text: 'A <b>right angle</b> is a square corner, like the corner of a book. We mark it with a little red box. A rectangle has 4 right angles.',
        textAr: '<b>الزاوية القائمة (right angle)</b> ركن مربع، مثل ركن الكتاب. نضع عليها مربعاً صغيراً أحمر. للمستطيل 4 زوايا قائمة.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:18px">${fig(rc, 'rectangle: 4 right angles', 0)}<div class="pop" style="font-size:4rem;animation-delay:1s">📘</div></div>` } },
      { title: 'Square and rectangle', titleAr: 'المربع والمستطيل',
        text: 'Both have 4 right angles. A <b>square</b> also has 4 <b>equal</b> sides (the little marks show equal sides).',
        textAr: 'كلاهما له 4 زوايا قائمة. و<b>المربع (square)</b> له أيضاً 4 أضلاع <b>متساوية</b> (العلامات الصغيرة تعني أضلاعاً متساوية).',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:14px">${fig(sq, 'square', 0)}${fig(rc, 'rectangle', .8)}</div>` } },
      { title: 'Rhombus and trapezoid', titleAr: 'المعيّن وشبه المنحرف',
        text: 'A <b>rhombus</b> has 4 equal sides, but its corners lean. A <b>trapezoid</b> has exactly one pair of <b>parallel</b> sides (red): lines that never meet, like train tracks.',
        textAr: '<b>المعيّن (rhombus)</b> له 4 أضلاع متساوية، لكن زواياه مائلة. و<b>شبه المنحرف (trapezoid)</b> له زوج واحد فقط من الأضلاع <b>المتوازية (parallel)</b> (الحمراء): خطوط لا تلتقي أبداً، مثل سكة القطار.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:14px">${fig(rh, 'rhombus', 0)}${fig(tz, 'trapezoid', .8)}</div>` } },
      { title: 'One shape, many names', titleAr: 'شكل واحد وأسماء كثيرة',
        text: 'A square is a quadrilateral, a rectangle AND a rhombus! But its <b>best</b> name is square, because that tells the most about it.',
        textAr: 'المربع رباعي أضلاع، ومستطيل، ومعيّن أيضاً! لكن <b>أفضل</b> اسم له هو المربع، لأنه يخبرنا بأكثر شيء عنه.',
        show: { kind: 'html', html: `${fig(sq, 'square', 0)}<div class="chipsrow"><span class="ochip pop" style="animation-delay:.8s">✅ quadrilateral</span><span class="ochip pop" style="animation-delay:1.3s">✅ rectangle</span><span class="ochip pop" style="animation-delay:1.8s">✅ rhombus</span><span class="ochip pop" style="animation-delay:2.4s">⭐ square</span></div>` } },
    ],
    acts: [
      { type: 'mc', title: 'Name the shape', pick: 6, start: 'Look at the corners and the sides. What is the best name?', startAr: 'انظري إلى الزوايا والأضلاع. ما أفضل اسم؟', items: names },
      { type: 'mc', title: 'Sides and angles', pick: 6, start: 'Count carefully, going all the way around!', startAr: 'عدّي بانتباه، ودوري حول الشكل كله!', items: counts },
      { type: 'sort', title: 'Quadrilateral or not?', pick: 8, start: 'Does it have exactly 4 straight sides?', startAr: 'هل له 4 أضلاع مستقيمة بالضبط؟',
        ask: 'Drag each one into the right box. Or tap it, then tap a box.', askAr: 'اسحبي كل واحد إلى الصندوق الصحيح، أو اضغطي عليه ثم على الصندوق.',
        hint: 'Count the straight sides of {w}. Is it exactly 4?', hintAr: 'عدّي الأضلاع المستقيمة في {w}. هل هي 4 بالضبط؟',
        buckets: [
          { label: 'Quadrilateral (4 sides)', labelAr: 'رباعي أضلاع (4 أضلاع)', pic: '🔷', why: '{w} has 4 straight sides and 4 angles: a quadrilateral.', whyAr: '{w} له 4 أضلاع مستقيمة و4 زوايا: رباعي أضلاع.' },
          { label: 'Not a quadrilateral', labelAr: 'ليس رباعي أضلاع', pic: '🚫', why: '{w} does not have exactly 4 straight sides.', whyAr: '{w} ليس له 4 أضلاع مستقيمة بالضبط.' },
        ], items: quadSort },
      { type: 'mc', title: 'Shape riddles', pick: 5, start: 'Read the clues. Which shape is it?', startAr: 'اقرئي الأدلّة. ما الشكل؟', items: riddles },
    ],
  });
})();
