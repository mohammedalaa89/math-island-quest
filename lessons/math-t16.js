/* enVision Mathematics Grade 3, Topic 16: Solve perimeter problems (Common Core 3.MD.8).
   Perimeter as the distance around, adding side lengths, unknown side lengths, same perimeter with different areas. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const OPTS = (ans, wrongs) => { const out = [String(ans)]; for (const w of wrongs.concat([ans + 1, ans + 2, ans - 1, ans + 4])) { const s = String(w); if (out.length < 4 && w > 0 && !out.includes(s)) out.push(s); } return out; };
  const INK = '#1E2A44', COLS = ['#FFE7A3', '#C8F2D9', '#D6EBFF', '#FFD9D0', '#E6DCFF'];
  const UNITS = [['cm', 'سم'], ['m', 'م'], ['in.', 'إنش'], ['ft', 'قدم']];
  const lab = (x, y, t, col) => `<text x="${x.toFixed(1)}" y="${(y + 5).toFixed(1)}" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="14" fill="${col || INK}" paint-order="stroke" stroke="#fff" stroke-width="4">${t}</text>`;

  /* a polygon with a label beside every side (labels[i] = '' to leave one out) */
  function POLY(pts, labels, o) {
    o = o || {}; const n = pts.length, cx = pts.reduce((s, p) => s + p[0], 0) / n, cy = pts.reduce((s, p) => s + p[1], 0) / n;
    let p = `<polygon points="${pts.map(q => q.join(',')).join(' ')}" fill="${o.fill || ANY(COLS)}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
    pts.forEach((a, i) => {
      if (!labels[i]) return;
      const b = pts[(i + 1) % n], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]);
      let nx = -(b[1] - a[1]) / L, ny = (b[0] - a[0]) / L; if ((mx - cx) * nx + (my - cy) * ny < 0) { nx = -nx; ny = -ny; }
      p += lab(mx + nx * 16, my + ny * 14, labels[i], labels[i] === '?' ? '#F0466B' : INK);
    });
    return `<svg viewBox="-30 -24 230 172" width="${o.size || 220}" style="max-width:100%;height:auto" role="img" aria-label="shape with side lengths">${p}</svg>`;
  }
  /* a rectangle scaled to fit, with side labels */
  function RECT(w, h, u, two) {
    const s = Math.min(160 / w, 110 / h), W = w * s, H = h * s, x = 85 - W / 2, y = 62 - H / 2;
    return POLY([[x, y], [x + W, y], [x + W, y + H], [x, y + H]], two ? [`${w} ${u}`, `${h} ${u}`, '', ''] : [`${w} ${u}`, `${h} ${u}`, `${w} ${u}`, `${h} ${u}`]);
  }
  /* a rectangle on square grid paper */
  function GRID(w, h, c, tag, anim) {
    const s = 16; let p = '';
    for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) p += `<rect x="${i * s}" y="${j * s}" width="${s}" height="${s}" fill="${c}" stroke="#9AA8C2" stroke-width="1"/>`;
    p += `<rect x="0" y="0" width="${w * s}" height="${h * s}" fill="none" stroke="${INK}" stroke-width="3"/>`;
    if (anim) { const per = 2 * (w + h) * s; p += `<rect x="0" y="0" width="${w * s}" height="${h * s}" fill="none" stroke="#F0466B" stroke-width="4" stroke-dasharray="${per}" stroke-dashoffset="${per}"><animate attributeName="stroke-dashoffset" from="${per}" to="0" begin=".5s" dur="2.5s" fill="freeze"/></rect>`; }
    return `<div style="text-align:center">${tag ? `<b>${tag}</b><br>` : ''}<svg viewBox="-3 -3 ${w * s + 6} ${h * s + 6}" width="${w * s + 6}" style="max-width:100%;height:auto">${p}</svg></div>`;
  }
  const sumTxt = xs => xs.join(' + ');

  /* quiz 1: rectangles */
  const rects = []; const seen = new Set();
  while (rects.length < 40) {
    const w = R(3, 12), h = R(2, 9), [u, uA] = ANY(UNITS), two = rects.length % 2 === 1; if (w === h || seen.has(w + 'x' + h + two)) continue; seen.add(w + 'x' + h + two);
    const P = 2 * (w + h);
    rects.push({ q: 'What is the perimeter of the rectangle?', qAr: 'ما محيط المستطيل؟', pic: RECT(w, h, u, two),
      opts: OPTS(P, [w + h, w * h, 2 * w + h, P + 2]).map(x => x + ' ' + u), ans: `${P} ${u}`,
      why: `${two ? `Opposite sides of a rectangle are equal, so the sides are ${w}, ${h}, ${w} and ${h}. ` : ''}Add all 4 sides: ${w} + ${h} + ${w} + ${h} = <b>${P} ${u}</b>.`,
      whyAr: `${two ? `الأضلاع المتقابلة في المستطيل متساوية، إذن الأضلاع ${w} و${h} و${w} و${h}. ` : ''}نجمع الأضلاع الأربعة: ${w} + ${h} + ${w} + ${h} = <b>${P} ${uA}</b>.`,
      hint: two ? 'A rectangle has 4 sides, but only 2 are labelled. The sides across from each other are the same length.' : 'Perimeter is the distance all the way around. Add every side.',
      hintAr: two ? 'للمستطيل 4 أضلاع، لكن مكتوب طول ضلعين فقط. الأضلاع المتقابلة لها نفس الطول.' : 'المحيط هو المسافة حول الشكل كله. اجمعي كل الأضلاع.' });
  }

  /* shape outlines to label: triangle, quadrilateral, pentagon, hexagon, L-shape */
  const OUT = [
    [[85, 8], [165, 115], [5, 115]],
    [[30, 10], [150, 25], [165, 115], [10, 105]],
    [[85, 2], [165, 52], [138, 120], [32, 120], [5, 52]],
    [[45, 5], [125, 5], [165, 62], [125, 120], [45, 120], [5, 62]],
  ];
  /* quiz 2: add all the sides */
  const polys = [];
  for (let k = 0; k < 40; k++) {
    const pts = OUT[k % OUT.length], [u, uA] = ANY(UNITS), xs = pts.map(() => R(2, 15)), P = xs.reduce((s, x) => s + x, 0);
    polys.push({ q: 'What is the perimeter of this shape?', qAr: 'ما محيط هذا الشكل؟', pic: POLY(pts, xs.map(x => `${x} ${u}`)),
      opts: OPTS(P, [P - xs[0], P + xs[1], P - 2, P + 3]).map(x => x + ' ' + u), ans: `${P} ${u}`,
      why: `Add all ${xs.length} sides: ${sumTxt(xs)} = <b>${P} ${u}</b>.`, whyAr: `نجمع الأضلاع الـ${xs.length}: ${sumTxt(xs)} = <b>${P} ${uA}</b>.`,
      hint: `This shape has ${xs.length} sides. Did you add every one? Tick each side as you add it.`, hintAr: `لهذا الشكل ${xs.length} أضلاع. هل جمعتِها كلها؟ ضعي علامة على كل ضلع تجمعينه.` });
  }

  /* quiz 3: find the missing side */
  const miss = [];
  for (let k = 0; k < 40; k++) {
    const [u, uA] = ANY(UNITS);
    if (k % 3 === 2) {
      const w = R(3, 12), h = R(2, 9); if (w === h) { k--; continue; } const P = 2 * (w + h);
      miss.push({ q: `The perimeter of the rectangle is ${P} ${u}. How long is the missing side?`, qAr: `محيط المستطيل ${P} ${uA}. كم طول الضلع الناقص؟`,
        pic: (() => { const s = Math.min(160 / w, 110 / h), W = w * s, H = h * s, x = 85 - W / 2, y = 62 - H / 2; return POLY([[x, y], [x + W, y], [x + W, y + H], [x, y + H]], [`${w} ${u}`, '?', '', '']); })(),
        opts: OPTS(h, [P - w, P - 2 * w, w]).map(x => x + ' ' + u), ans: `${h} ${u}`,
        why: `The two sides of ${w} make ${w} + ${w} = ${2 * w}. ${P} − ${2 * w} = ${P - 2 * w} is left for the two other sides. ${P - 2 * w} ÷ 2 = <b>${h} ${u}</b>.`,
        whyAr: `الضلعان اللذان طول كل منهما ${w} يساويان ${w} + ${w} = ${2 * w}. يبقى ${P} − ${2 * w} = ${P - 2 * w} للضلعين الآخرين. ${P - 2 * w} ÷ 2 = <b>${h} ${uA}</b>.`,
        hint: 'Opposite sides are equal. Take away the two sides you know, then share what is left between the other two sides.', hintAr: 'الأضلاع المتقابلة متساوية. اطرحي الضلعين المعروفين، ثم قسّمي الباقي على الضلعين الآخرين.' });
    } else {
      const pts = OUT[k % OUT.length], xs = pts.map(() => R(2, 15)), P = xs.reduce((s, x) => s + x, 0), m = R(0, xs.length - 1), known = xs.filter((_, i) => i !== m), sk = known.reduce((s, x) => s + x, 0);
      miss.push({ q: `The perimeter is ${P} ${u}. What is the length of the side marked ?`, qAr: `المحيط ${P} ${uA}. كم طول الضلع المكتوب عليه ؟`,
        pic: POLY(pts, xs.map((x, i) => i === m ? '?' : `${x} ${u}`)),
        opts: OPTS(xs[m], [P + sk, sk, xs[m] + 2]).map(x => x + ' ' + u), ans: `${xs[m]} ${u}`,
        why: `Add the sides you know: ${sumTxt(known)} = ${sk}. The whole way around is ${P}, so the missing side is ${P} − ${sk} = <b>${xs[m]} ${u}</b>.`,
        whyAr: `نجمع الأضلاع المعروفة: ${sumTxt(known)} = ${sk}. المحيط كله ${P}، إذن الضلع الناقص = ${P} − ${sk} = <b>${xs[m]} ${uA}</b>.`,
        hint: 'Add the sides you know. How much more do you need to reach the perimeter?', hintAr: 'اجمعي الأضلاع المعروفة. كم ينقص لتصلي إلى المحيط؟' });
    }
  }

  /* quiz 4: stories and same-perimeter puzzles */
  const STORY = [
    ['🌱', (w, h) => `A garden is ${w} m long and ${h} m wide. How many meters of fence go all the way around it?`, (w, h) => `حديقة طولها ${w} م وعرضها ${h} م. كم متراً من السياج نحتاج حولها كلها؟`, 'm', 'م'],
    ['🖼️', (w, h) => `A photo is ${w} in. by ${h} in. How much frame goes around it?`, (w, h) => `صورة طولها ${w} إنش وعرضها ${h} إنش. كم إنشاً من الإطار نحتاج حولها؟`, 'in.', 'إنش'],
    ['🎀', (w, h) => `Lana puts ribbon around a card that is ${w} cm by ${h} cm. How much ribbon does she need?`, (w, h) => `تضع لانا شريطاً حول بطاقة طولها ${w} سم وعرضها ${h} سم. كم سنتيمتراً من الشريط تحتاج؟`, 'cm', 'سم'],
    ['🏊', (w, h) => `A pool is ${w} m long and ${h} m wide. Reem walks all the way around it once. How far does she walk?`, (w, h) => `مسبح طوله ${w} م وعرضه ${h} م. مشت ريم حوله مرة واحدة. كم متراً مشت؟`, 'm', 'م'],
  ];
  const mix = [];
  for (let k = 0; k < 24; k++) {
    const w = R(4, 20), h = R(2, 12); if (w === h) { k--; continue; }
    const [pic, en, ar, u, uA] = STORY[k % STORY.length], P = 2 * (w + h);
    mix.push({ q: en(w, h), qAr: ar(w, h), pic, opts: OPTS(P, [w + h, w * h, P + 2]).map(x => x + ' ' + u), ans: `${P} ${u}`,
      why: `All the way around means perimeter: ${w} + ${h} + ${w} + ${h} = <b>${P} ${u}</b>.`, whyAr: `حولها كلها يعني المحيط: ${w} + ${h} + ${w} + ${h} = <b>${P} ${uA}</b>.`,
      hint: 'Draw the rectangle and write a length on all 4 sides. Then add.', hintAr: 'ارسمي المستطيل واكتبي الطول على الأضلاع الأربعة، ثم اجمعي.' });
  }
  const grids = [];
  for (let half = 5; half <= 9; half++) for (let a = 1; a < half; a++) for (let b = a + 1; b < half; b++) {
    const [w1, w2] = [a, b], h1 = half - a, h2 = half - b; if (w1 * h1 === w2 * h2 || w1 > h1 + 4 || w2 > h2 + 6) continue;
    if (Math.max(w1, h1, w2, h2) > 8) continue;
    const big = w1 * h1 > w2 * h2 ? 'A' : 'B';
    grids.push({ q: `Both rectangles have a perimeter of ${2 * half} units. Which one has the bigger area?`, qAr: `محيط كل من المستطيلين ${2 * half} وحدة. أيهما مساحته أكبر؟`,
      pic: `<div class="row" style="justify-content:center;gap:16px;align-items:flex-end">${GRID(w1, h1, '#C8F2D9', 'A')}${GRID(w2, h2, '#E6DCFF', 'B')}</div>`,
      opts: ['A', 'B', 'They are the same'], keep: true, ans: big,
      why: `A: ${w1} + ${h1} + ${w1} + ${h1} = ${2 * half}, area ${w1} × ${h1} = ${w1 * h1}. B: ${w2} + ${h2} + ${w2} + ${h2} = ${2 * half}, area ${w2} × ${h2} = ${w2 * h2}. Same perimeter, but <b>${big}</b> covers more squares.`,
      whyAr: `A: ${w1} + ${h1} + ${w1} + ${h1} = ${2 * half}، والمساحة ${w1} × ${h1} = ${w1 * h1}. B: ${w2} + ${h2} + ${w2} + ${h2} = ${2 * half}، والمساحة ${w2} × ${h2} = ${w2 * h2}. المحيط نفسه، لكن <b>${big}</b> يغطي مربعات أكثر.`,
      hint: 'Area is the squares INSIDE. Count (or multiply) the squares in each rectangle.', hintAr: 'المساحة هي المربعات في الداخل. عدّي (أو اضربي) المربعات في كل مستطيل.' });
  }
  grids.sort(() => Math.random() - .5).slice(0, 16).forEach(g => mix.push(g));

  /* slide pictures */
  const ANT = `<svg viewBox="0 0 220 150" width="260" style="max-width:100%;height:auto" role="img" aria-label="an ant walks around a garden">
    <rect x="30" y="25" width="160" height="100" fill="#C8F2D9" stroke="#1E2A44" stroke-width="3"/><text x="110" y="82" text-anchor="middle" font-size="34">🌷🌼</text>
    <path d="M30 25H190V125H30Z" fill="none" stroke="#F0466B" stroke-width="5" stroke-dasharray="520" stroke-dashoffset="520"><animate attributeName="stroke-dashoffset" from="520" to="0" begin=".4s" dur="4s" fill="freeze"/></path>
    <text font-size="22" text-anchor="middle" dy="8">🐜<animateMotion path="M30 25H190V125H30Z" begin=".4s" dur="4s" fill="freeze"/></text></svg>`;

  addLesson({
    id: 'm-t16', island: 'm-t16', added: '2026-11-03', pic: '📏',
    title: 'Perimeter', sub: 'The distance around a shape, missing sides, same perimeter',
    learn: [
      { title: 'Perimeter is the distance around', titleAr: 'المحيط هو المسافة حول الشكل',
        text: 'Watch the ant walk all the way around the garden, back to where it started. That distance is the <b>perimeter</b>.',
        textAr: 'شاهدي النملة تمشي حول الحديقة كلها حتى تعود إلى حيث بدأت. هذه المسافة هي <b>المحيط (perimeter)</b>.',
        show: { kind: 'html', html: ANT } },
      { title: 'Add all the sides', titleAr: 'اجمعي كل الأضلاع',
        text: 'This rectangle is 5 cm long and 3 cm wide. Opposite sides are equal. 5 + 3 + 5 + 3 = <b>16 cm</b>.',
        textAr: 'هذا المستطيل طوله 5 سم وعرضه 3 سم. الأضلاع المتقابلة متساوية. 5 + 3 + 5 + 3 = <b>16 سم</b>.',
        show: { kind: 'html', html: `<div class="pop">${RECT(5, 3, 'cm')}</div><p class="eqn pop" style="animation-delay:1s">5 + 3 + 5 + 3 = <b>16 cm</b></p>` } },
      { title: 'Count units on grid paper', titleAr: 'عدّي الوحدات على ورق المربعات',
        text: 'Each square side is 1 unit. Count the units around the outside: 4 + 2 + 4 + 2 = <b>12 units</b>.',
        textAr: 'كل ضلع مربع صغير يساوي وحدة واحدة. عدّي الوحدات حول الخارج: 4 + 2 + 4 + 2 = <b>12 وحدة</b>.',
        show: { kind: 'html', html: `${GRID(4, 2, '#FFE7A3', '', true)}<p class="eqn pop" style="animation-delay:3s">4 + 2 + 4 + 2 = <b>12</b></p>` } },
      { title: 'Find a missing side', titleAr: 'جدي الضلع الناقص',
        text: 'The perimeter is 20 m. The sides we know are 6 + 4 + 6 = 16. So the missing side is 20 − 16 = <b>4 m</b>.',
        textAr: 'المحيط 20 م. الأضلاع المعروفة 6 + 4 + 6 = 16. إذن الضلع الناقص 20 − 16 = <b>4 م</b>.',
        show: { kind: 'html', html: `<div class="pop">${POLY([[20, 15], [150, 15], [165, 115], [5, 115]], ['6 m', '4 m', '6 m', '?'], { fill: '#D6EBFF' })}</div><p class="eqn pop" style="animation-delay:.8s">6 + 4 + 6 = 16</p><p class="eqn pop" style="animation-delay:1.6s">20 − 16 = <b>4 m</b></p>` } },
      { title: 'Same perimeter, different area', titleAr: 'نفس المحيط ومساحة مختلفة',
        text: 'All three rectangles have a perimeter of 12 units, but they cover different numbers of squares: 5, 8 and 9. Perimeter is the edge; <b>area</b> is the inside.',
        textAr: 'المستطيلات الثلاثة محيط كل منها 12 وحدة، لكنها تغطي أعداداً مختلفة من المربعات: 5 و8 و9. المحيط هو الحافة، و<b>المساحة (area)</b> هي الداخل.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:14px;align-items:flex-end"><div class="pop">${GRID(5, 1, '#FFD9D0', 'area 5')}</div><div class="pop" style="animation-delay:.8s">${GRID(4, 2, '#FFE7A3', 'area 8')}</div><div class="pop" style="animation-delay:1.6s">${GRID(3, 3, '#C8F2D9', 'area 9')}</div></div><p class="eqn pop" style="animation-delay:2.4s">perimeter = <b>12</b> for all</p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Rectangles', pick: 6, start: 'Add all 4 sides. Opposite sides are equal!', startAr: 'اجمعي الأضلاع الأربعة. الأضلاع المتقابلة متساوية!', items: rects },
      { type: 'mc', title: 'Any shape', pick: 5, start: 'Go all the way around and add every side!', startAr: 'دوري حول الشكل كله واجمعي كل الأضلاع!', items: polys },
      { type: 'mc', title: 'Missing side', pick: 5, start: 'Add what you know, then find what is missing!', startAr: 'اجمعي المعروف، ثم جدي الناقص!', items: miss },
      { type: 'mc', title: 'Stories and puzzles', pick: 5, start: 'Is it the edge (perimeter) or the inside (area)?', startAr: 'هل هي الحافة (المحيط) أم الداخل (المساحة)؟', items: mix },
    ],
  });
})();
