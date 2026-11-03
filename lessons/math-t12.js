/* enVision Mathematics Grade 3, Topic 12: Understand fractions as numbers (Common Core 3.NF.1, 3.NF.2, 3.G.2).
   Equal parts, unit fractions 1/b, fractions a/b, fractions on a number line, the whole. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const SOPTS = (ans, wrongs) => { const out = [ans]; for (const w of wrongs) if (out.length < 4 && w && !/\/0$|^0\//.test(w) && !out.includes(w)) out.push(w); return out; };
  const COLS = ['#FF8A3D', '#7C4DFF', '#22B566', '#2E9BF0', '#F0466B'];
  const INK = '#1E2A44';

  /* a bar cut into parts (widths = weights); the first `a` parts coloured; anim = colour them one by one */
  function FBAR(a, b, o) {
    o = o || {}; const W = o.w || 160, H = o.h || 46, col = o.col || '#FF8A3D', ws = o.weights || Array(b).fill(1), tot = ws.reduce((s, x) => s + x, 0);
    let x = 0, p = '';
    ws.forEach((wt, i) => {
      const w = W * wt / tot, on = i < a;
      p += `<rect x="${x}" y="0" width="${w}" height="${H}" fill="${on && !o.anim ? col : '#fff'}" stroke="${INK}" stroke-width="2">${on && o.anim ? `<set attributeName="fill" to="${col}" begin="${(o.delay || .4) + i * .7}s" fill="freeze"/>` : ''}</rect>`; x += w;
    });
    return `<svg viewBox="-2 -2 ${W + 4} ${H + 4}" width="${W + 4}" style="max-width:100%;height:auto" role="img" aria-label="${a} of ${b} parts shaded">${p}</svg>`;
  }
  /* a round pizza/pie: angles in degrees for each slice (equal by default) */
  function FPIE(a, b, o) {
    o = o || {}; const r = 48, c = 52, col = o.col || '#FF8A3D', angs = o.angles || Array(b).fill(360 / b), size = o.size || 130;
    let st = -90, p = '';
    angs.forEach((ang, i) => {
      const e = st + ang, rad = d => d * Math.PI / 180, x1 = c + r * Math.cos(rad(st)), y1 = c + r * Math.sin(rad(st)), x2 = c + r * Math.cos(rad(e)), y2 = c + r * Math.sin(rad(e));
      const on = i < a;
      p += `<path d="M${c} ${c}L${x1.toFixed(2)} ${y1.toFixed(2)}A${r} ${r} 0 ${ang > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}Z" fill="${on && !o.anim ? col : '#fff'}" stroke="${INK}" stroke-width="2" stroke-linejoin="round">${on && o.anim ? `<set attributeName="fill" to="${col}" begin="${(o.delay || .4) + i * .7}s" fill="freeze"/>` : ''}</path>`;
      st = e;
    });
    return `<svg viewBox="0 0 104 104" width="${size}" style="max-width:100%;height:auto" role="img" aria-label="${a} of ${b} parts shaded">${p}</svg>`;
  }
  /* number line 0 to 1 cut into b equal spaces, a dot at a/b (dot = null for none) */
  function NLF(b, a, o) {
    o = o || {}; const x0 = 22, x1 = 308, sp = (x1 - x0) / b;
    let p = `<line x1="${x0}" y1="40" x2="${x1}" y2="40" stroke="${INK}" stroke-width="3"/>`;
    for (let i = 0; i <= b; i++) {
      const x = x0 + i * sp, end = i === 0 || i === b, lab = i === 0 ? '0' : i === b ? '1' : o.labels ? `${i}/${b}` : '';
      p += `<line x1="${x}" y1="${end ? 28 : 32}" x2="${x}" y2="${end ? 52 : 48}" stroke="${INK}" stroke-width="${end ? 3 : 2}"/>`;
      if (lab) p += `<text x="${x}" y="74" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="${end ? 18 : 13}" fill="${INK}">${lab}</text>`;
    }
    if (a != null) {
      if (o.anim) {
        const xs = Array.from({ length: a + 1 }, (_, i) => (x0 + i * sp).toFixed(1));
        p += `<circle cx="${x0}" cy="40" r="9" fill="#F0466B" stroke="#fff" stroke-width="2"><animate attributeName="cx" values="${xs.join(';')}" keyTimes="${xs.map((_, i) => (i / (xs.length - 1)).toFixed(3)).join(';')}" calcMode="discrete" dur="${a * .8}s" begin=".6s" fill="freeze"/></circle>`;
      } else p += `<circle cx="${x0 + a * sp}" cy="40" r="9" fill="#F0466B" stroke="#fff" stroke-width="2"/>`;
    }
    return `<svg viewBox="0 0 330 84" width="330" style="max-width:100%;height:auto" role="img" aria-label="number line from 0 to 1">${p}</svg>`;
  }
  /* a stacked fraction for slides */
  const SF = (n, d, cn, cd) => `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1.05;vertical-align:middle;font-family:var(--display);font-weight:700;font-size:2.4rem"><span style="color:${cn || '#FF8A3D'}">${n}</span><span style="border-top:4px solid ${INK};padding:0 6px;color:${cd || '#2E9BF0'}">${d}</span></span>`;

  const DENS = [2, 3, 4, 6, 8];
  const NAME = { 2: ['half', 'halves', 'نصف', 'أنصاف'], 3: ['third', 'thirds', 'ثلث', 'أثلاث'], 4: ['fourth', 'fourths', 'ربع', 'أرباع'], 6: ['sixth', 'sixths', 'سدس', 'أسداس'], 8: ['eighth', 'eighths', 'ثمن', 'أثمان'] };
  const NUM = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  const NUMAR = ['صفر', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية'];
  const word = (a, b) => `${NUM[a]} ${a === 1 ? NAME[b][0] : NAME[b][1]}`;
  const wordAr = (a, b) => a === 1 ? `${NAME[b][2]} واحد` : a === 2 ? `${NAME[b][2]}ان` : `${NUMAR[a]} ${NAME[b][3]}`;

  /* quiz 1: what fraction is shaded? */
  const shaded = [];
  DENS.forEach(b => { for (let a = 1; a < b; a++) [0, 1].forEach(sh => {
    const col = ANY(COLS), f = `${a}/${b}`;
    shaded.push({ q: 'What fraction is shaded?', qAr: 'ما الكسر الملوّن؟', pic: sh ? FPIE(a, b, { col }) : FBAR(a, b, { col }),
      opts: SOPTS(f, [`${b - a}/${b}`, `${a}/${b - a}`, `${b}/${a}`, `${a}/${b + 1}`, `${a + 1}/${b}`]), ans: f,
      why: `The whole has <b>${b}</b> equal parts, so the bottom number (denominator) is ${b}. <b>${a}</b> ${a === 1 ? 'part is' : 'parts are'} shaded, so the top number (numerator) is ${a}. That is <b>${f}</b>.`,
      whyAr: `الكل مقسوم إلى <b>${b}</b> أجزاء متساوية، إذن العدد في الأسفل (المقام denominator) هو ${b}. والملوّن <b>${a}</b>، إذن العدد في الأعلى (البسط numerator) هو ${a}. الكسر هو <b>${f}</b>.`,
      hint: 'Count ALL the equal parts first: that is the bottom number. Then count the coloured parts.', hintAr: 'عدّي كل الأجزاء المتساوية أولاً: هذا هو العدد في الأسفل. ثم عدّي الأجزاء الملوّنة.' });
  }); });

  /* quiz 2: equal parts? and their names */
  const unevenW = b => { let w; do { w = Array.from({ length: b }, () => R(1, 4)); } while (new Set(w).size < 2); return w; };
  const unevenA = b => { let w; do { w = Array.from({ length: b }, () => R(2, 6)); } while (new Set(w).size < 2); const t = w.reduce((s, x) => s + x, 0); return w.map(x => x * 360 / t); };
  const parts = [];
  [2, 3, 4, 6, 8].forEach(b => [0, 1].forEach(sh => {
    const pic = sh ? FPIE(0, b, { angles: undefined }) : FBAR(0, b);
    parts.push({ q: 'These are equal parts. What are they called?', qAr: 'هذه أجزاء متساوية. ما اسمها؟', pic,
      opts: DENS.map(d => NAME[d][1]), ans: NAME[b][1], keep: true,
      why: `The whole is cut into <b>${b}</b> equal parts. ${b} equal parts are called <b>${NAME[b][1]}</b>. Each part is 1/${b}.`,
      whyAr: `الكل مقسوم إلى <b>${b}</b> أجزاء متساوية. ${b} أجزاء متساوية اسمها <b>${NAME[b][3]} (${NAME[b][1]})</b>. كل جزء هو 1/${b}.`,
      hint: 'Count the parts. 2 = halves, 3 = thirds, 4 = fourths, 6 = sixths, 8 = eighths.', hintAr: 'عدّي الأجزاء. 2 = أنصاف، 3 = أثلاث، 4 = أرباع، 6 = أسداس، 8 = أثمان.' });
  }));
  for (let k = 0; k < 16; k++) {
    const b = ANY([2, 3, 4]), eq = k % 2 === 0, sh = k % 4 < 2;
    const pic = sh ? FPIE(0, b, eq ? {} : { angles: unevenA(b) }) : FBAR(0, b, eq ? {} : { weights: unevenW(b) });
    parts.push({ q: 'Are these equal parts?', qAr: 'هل هذه أجزاء متساوية؟', pic, keep: true,
      opts: ['Yes, equal parts', 'No, not equal'], ans: eq ? 'Yes, equal parts' : 'No, not equal',
      why: eq ? `All ${b} parts are exactly the same size, so they are <b>equal parts</b>.` : 'Some parts are bigger than others. Fractions need parts that are all the <b>same size</b>.',
      whyAr: eq ? `كل الأجزاء الـ${b} لها نفس الحجم تماماً، إذن هي <b>أجزاء متساوية</b>.` : 'بعض الأجزاء أكبر من غيرها. الكسور تحتاج أجزاء لها <b>نفس الحجم</b>.',
      hint: 'Look closely: is every part the same size? Would each friend get a fair share?', hintAr: 'انظري جيداً: هل كل الأجزاء بنفس الحجم؟ هل تأخذ كل صديقة حصة عادلة؟' });
  }

  /* quiz 3: fractions on a number line */
  const lines = [];
  DENS.forEach(b => { for (let a = 1; a < b; a++) {
    const f = `${a}/${b}`;
    lines.push({ q: 'What fraction is at the red dot?', qAr: 'ما الكسر عند النقطة الحمراء؟', pic: NLF(b, a),
      opts: SOPTS(f, [`${a}/${b + 1}`, `${b - a}/${b}`, `${a + 1}/${b}`, `1/${a + 1}`]), ans: f,
      why: `From 0 to 1 there are <b>${b}</b> equal spaces, so each jump is 1/${b}. The dot is <b>${a}</b> jump${a > 1 ? 's' : ''} from 0, so it is at <b>${f}</b>.`,
      whyAr: `من 0 إلى 1 توجد <b>${b}</b> مسافات متساوية، إذن كل قفزة هي 1/${b}. النقطة تبعد <b>${a}</b> ${a > 1 ? 'قفزات' : 'قفزة'} عن 0، إذن هي عند <b>${f}</b>.`,
      hint: 'Count the SPACES between 0 and 1, not the little lines. Then count jumps from 0 to the dot.', hintAr: 'عدّي المسافات بين 0 و1، وليس الخطوط الصغيرة. ثم عدّي القفزات من 0 إلى النقطة.' });
  } });

  /* quiz 4: match fraction and its name */
  const named = [];
  DENS.forEach(b => { for (let a = 1; a < b; a++) named.push([`${a}/${b}`, word(a, b), FBAR(a, b, { w: 56, h: 22 }), '', wordAr(a, b)]); });

  addLesson({
    id: 'm-t12', island: 'm-t12', added: '2026-11-03', pic: '🍕',
    title: 'Fractions as Numbers', sub: 'Equal parts, 1/4, 3/4 and fractions on a number line',
    learn: [
      { title: 'Fractions need equal parts', titleAr: 'الكسور تحتاج أجزاء متساوية',
        text: 'To share a pizza fairly, every slice must be the <b>same size</b>. The first pizza has 4 equal parts. The second does not.',
        textAr: 'لنقسم البيتزا بعدل، يجب أن تكون كل القطع <b>بنفس الحجم</b>. البيتزا الأولى فيها 4 أجزاء متساوية. والثانية ليست كذلك.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:26px"><div class="pop" style="text-align:center">${FPIE(0, 4, { size: 120 })}<p class="eqn">✅ equal</p></div><div class="pop" style="text-align:center;animation-delay:1s">${FPIE(0, 4, { size: 120, angles: [150, 60, 100, 50] })}<p class="eqn">❌ not equal</p></div></div>` } },
      { title: 'One part: a unit fraction', titleAr: 'جزء واحد: كسر الوحدة',
        text: 'Cut a whole into 4 equal parts. One part is <b>1/4</b> (one fourth). The bottom number tells how many equal parts. The top number tells how many we take.',
        textAr: 'نقسم الكل إلى 4 أجزاء متساوية. الجزء الواحد هو <b>1/4</b> (ربع). العدد في الأسفل (denominator) يخبرنا كم جزءاً متساوياً. والعدد في الأعلى (numerator) يخبرنا كم جزءاً أخذنا.',
        say: 'One part: a unit fraction. Cut a whole into 4 equal parts. One part is one fourth. The bottom number tells how many equal parts. The top number tells how many we take.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:22px">${FPIE(1, 4, { anim: true, size: 120 })}<div class="pop" style="animation-delay:1.2s">${SF(1, 4)}</div></div><p class="pop muted" style="animation-delay:1.8s;text-align:center"><b style="color:#FF8A3D">1</b> = parts we take · <b style="color:#2E9BF0">4</b> = equal parts in the whole</p>` } },
      { title: 'More parts: 3/4', titleAr: 'أجزاء أكثر: 3/4',
        text: '3/4 means 3 parts of size 1/4. Watch them fill in: 1/4, 2/4, 3/4.',
        textAr: '3/4 تعني 3 أجزاء، كل جزء 1/4. شاهدي كيف تتلوّن: 1/4، 2/4، 3/4.',
        say: 'Three fourths means 3 parts of size one fourth. One fourth, two fourths, three fourths.',
        show: { kind: 'html', html: `${FBAR(3, 4, { anim: true, w: 260, h: 60, col: '#7C4DFF' })}<div class="pop" style="animation-delay:2.6s">${SF(3, 4, '#7C4DFF')}</div>` } },
      { title: 'Fractions on a number line', titleAr: 'الكسور على خط الأعداد',
        text: 'Split the line from 0 to 1 into 4 equal spaces. Each jump is 1/4. Three jumps land on <b>3/4</b>.',
        textAr: 'نقسم الخط من 0 إلى 1 إلى 4 مسافات متساوية. كل قفزة تساوي 1/4. ثلاث قفزات تصل إلى <b>3/4</b>.',
        say: 'Split the line from 0 to 1 into 4 equal spaces. Each jump is one fourth. Three jumps land on three fourths.',
        show: { kind: 'html', html: NLF(4, 3, { labels: true, anim: true }) } },
      { title: 'The whole', titleAr: 'الكل (الواحد الصحيح)',
        text: 'When every part is coloured, we have the whole: <b>4/4 = 1</b>. In the same way 2/2 = 1 and 8/8 = 1.',
        textAr: 'عندما تتلوّن كل الأجزاء يصبح عندنا الكل: <b>4/4 = 1</b>. وكذلك 2/2 = 1 و8/8 = 1.',
        say: 'When every part is coloured, we have the whole. Four fourths equals 1. Two halves equals 1, and eight eighths equals 1.',
        show: { kind: 'html', html: `${FBAR(4, 4, { anim: true, w: 260, h: 50, col: '#22B566' })}<p class="eqn pop" style="animation-delay:3.4s">4/4 = <b>1 whole</b></p>` } },
    ],
    acts: [
      { type: 'mc', title: 'What is shaded?', pick: 6, start: 'Count all the equal parts, then the coloured ones!', startAr: 'عدّي كل الأجزاء المتساوية، ثم الملوّنة!', items: shaded },
      { type: 'mc', title: 'Equal parts', pick: 6, start: 'Are the parts fair? What are they called?', startAr: 'هل الأجزاء متساوية؟ ما اسمها؟', items: parts },
      { type: 'mc', title: 'Number line', pick: 5, start: 'Count the spaces from 0 to 1!', startAr: 'عدّي المسافات من 0 إلى 1!', items: lines },
      { type: 'match', title: 'Fraction names', pick: 4, pairs: named, ask: 'Tap a fraction, then tap its name.', askAr: 'اضغطي على الكسر، ثم على اسمه.',
        start: 'Match each fraction to its name!', startAr: 'صِلي كل كسر باسمه!',
        why: p => `<b>${p[0]}</b> is <b>${p[1]}</b>.`, whyAr: p => `<b>${p[0]}</b> تُقرأ <b>${p[4]}</b>.`,
        hint: p => `Look at the bottom number of <b>${p[0]}</b>: it names the parts. The top number says how many.`, hintAr: p => `انظري إلى العدد في الأسفل في <b>${p[0]}</b>: هو اسم الأجزاء. والعدد في الأعلى يقول كم جزءاً.`,
        sayL: p => p[1], sayR: p => p[1] },
    ],
  });
})();
