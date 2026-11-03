/* enVision Mathematics Grade 3, Topic 13: Fraction equivalence and comparison (Common Core 3.NF.3).
   Equivalent fractions with bars and number lines, whole numbers as fractions, comparing with the same numerator or the same denominator.
   Our own explanations and questions. English + Arabic. */
(function () {
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const SOPTS = (ans, wrongs) => { const out = [ans]; for (const w of wrongs) if (out.length < 4 && w && !/^0\/|^-/.test(w) && !out.includes(w)) out.push(w); return out; };
  const INK = '#1E2A44', COLS = ['#FF8A3D', '#7C4DFF', '#22B566', '#2E9BF0', '#F0466B'];
  const gcd = (x, y) => y ? gcd(y, x % y) : x;

  function FBAR(a, b, o) {
    o = o || {}; const W = o.w || 220, H = o.h || 34, col = o.col || '#FF8A3D', w = W / b;
    let p = '';
    for (let i = 0; i < b; i++) {
      const on = i < a;
      p += `<rect x="${i * w}" y="0" width="${w}" height="${H}" fill="${on && !o.anim ? col : '#fff'}" stroke="${INK}" stroke-width="2">${on && o.anim ? `<set attributeName="fill" to="${col}" begin="${(o.delay || .3) + i * (o.step || .4)}s" fill="freeze"/>` : ''}</rect>`;
    }
    if (o.label) p += `<text x="${W + 10}" y="${H / 2 + 7}" font-family="Nunito,sans-serif" font-weight="800" font-size="20" fill="${INK}">${o.label}</text>`;
    const VW = W + (o.label ? 56 : 0);
    return `<svg viewBox="-2 -2 ${VW + 4} ${H + 4}" width="${VW + 4}" style="max-width:100%;height:auto;display:block;margin:0 auto" role="img" aria-label="${a} of ${b} parts shaded">${p}</svg>`;
  }
  const STACK = (bars, gap) => `<div style="display:flex;flex-direction:column;gap:${gap || 6}px;align-items:center">${bars.join('')}</div>`;
  function FPIE(a, b, col, size) {
    const r = 48, c = 52; let st = -90, p = '';
    for (let i = 0; i < b; i++) {
      const e = st + 360 / b, rad = d => d * Math.PI / 180;
      p += `<path d="M${c} ${c}L${(c + r * Math.cos(rad(st))).toFixed(2)} ${(c + r * Math.sin(rad(st))).toFixed(2)}A${r} ${r} 0 0 1 ${(c + r * Math.cos(rad(e))).toFixed(2)} ${(c + r * Math.sin(rad(e))).toFixed(2)}Z" fill="${i < a ? col : '#fff'}" stroke="${INK}" stroke-width="2"/>`; st = e;
    }
    return `<svg viewBox="0 0 104 104" width="${size || 110}" style="max-width:100%;height:auto" role="img" aria-label="${a} of ${b}">${p}</svg>`;
  }
  /* two number lines 0..1, one above the other */
  function NL2(b1, a1, b2, a2) {
    const x0 = 46, x1 = 310; let p = '';
    [[b1, a1, 30], [b2, a2, 92]].forEach(([b, a, y], k) => {
      const sp = (x1 - x0) / b;
      p += `<line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="${INK}" stroke-width="3"/>`;
      for (let i = 0; i <= b; i++) {
        const x = x0 + i * sp, lab = i === 0 ? '0' : i === b ? '1' : `${i}/${b}`;
        p += `<line x1="${x}" y1="${y - 9}" x2="${x}" y2="${y + 9}" stroke="${INK}" stroke-width="2"/><text x="${x}" y="${y + 27}" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="12" fill="${INK}">${lab}</text>`;
      }
      p += `<circle cx="${x0 + a * sp}" cy="${y}" r="8" fill="${k ? '#7C4DFF' : '#FF8A3D'}" stroke="#fff" stroke-width="2"><animate attributeName="r" values="0;11;8" dur=".6s" begin="${.5 + k * .9}s" fill="freeze"/></circle>`;
    });
    const xm = x0 + a1 * (x1 - x0) / b1;
    p += `<line x1="${xm}" y1="14" x2="${xm}" y2="108" stroke="#F0466B" stroke-width="2.5" stroke-dasharray="5 5" opacity="0"><animate attributeName="opacity" from="0" to="1" begin="2.2s" dur=".4s" fill="freeze"/></line>`;
    return `<svg viewBox="0 0 340 128" width="340" style="max-width:100%;height:auto" role="img" aria-label="two number lines">${p}</svg>`;
  }

  const DENS = [2, 3, 4, 6, 8], FR = [];
  DENS.forEach(b => { for (let a = 1; a < b; a++) FR.push([a, b]); });

  /* quiz 1: equivalent fractions */
  const equiv = [];
  FR.forEach(([a, b]) => FR.forEach(([c, d]) => {
    if (b === d || a * d !== b * c) return;
    const col = ANY(COLS);
    equiv.push({ q: `${a}/${b} = ?/${d}`, qAr: `${a}/${b} = ؟/${d}`, read: `${a} over ${b} equals what over ${d}?`,
      pic: STACK([FBAR(a, b, { col, label: `${a}/${b}` }), FBAR(0, d, { label: `?/${d}` })]),
      opts: SOPTS(`${c}/${d}`, [`${a}/${d}`, `${c + 1}/${d}`, `${c - 1}/${d}`, `${c + 2}/${d}`]), ans: `${c}/${d}`,
      why: `Colour ${c} of the ${d} parts in the bottom bar: it covers exactly the same length as ${a}/${b}. So <b>${a}/${b} = ${c}/${d}</b>.`,
      whyAr: `لوّني ${c} من الأجزاء الـ${d} في الشريط السفلي: ستغطي نفس الطول تماماً مثل ${a}/${b}. إذن <b>${a}/${b} = ${c}/${d}</b>.`,
      hint: `Look where the coloured part of the top bar ends. How many of the ${d} parts fit under it?`, hintAr: `انظري أين ينتهي الجزء الملوّن في الشريط العلوي. كم جزءاً من الأجزاء الـ${d} يقع تحته؟` });
  }));

  /* quiz 2: compare with <, >, = */
  const cmp = [];
  const addCmp = (a, b, c, d, kind) => {
    const v = a * d - c * b, s = v > 0 ? '>' : v < 0 ? '<' : '=', big = v > 0 ? `${a}/${b}` : `${c}/${d}`, small = v > 0 ? `${c}/${d}` : `${a}/${b}`, col = ANY(COLS);
    let why, whyAr;
    if (s === '=') { why = `Both bars are coloured to the same length. <b>${a}/${b} = ${c}/${d}</b>: they are equivalent.`; whyAr = `الشريطان ملوّنان بنفس الطول. <b>${a}/${b} = ${c}/${d}</b>: كسران متكافئان (equivalent).`; }
    else if (kind === 'den') { why = `Same bottom number, so the parts are the same size. More parts means more: <b>${big}</b> is greater. So ${a}/${b} <b>${s}</b> ${c}/${d}.`; whyAr = `الأجزاء بنفس الحجم (نفس المقام). عدد أجزاء أكثر يعني كمية أكبر: <b>${big}</b> أكبر. إذن ${a}/${b} <b>${s}</b> ${c}/${d}.`; }
    else { why = `Same number of parts (${a}). Fewer pieces in the whole means BIGGER pieces, so <b>${big}</b> is greater than ${small}. So ${a}/${b} <b>${s}</b> ${c}/${d}.`; whyAr = `نفس عدد الأجزاء (${a}). كلما قلّ عدد القطع في الكل كبرت القطعة، إذن <b>${big}</b> أكبر من ${small}. إذن ${a}/${b} <b>${s}</b> ${c}/${d}.`; }
    cmp.push({ q: `${a}/${b}  ?  ${c}/${d}`, qAr: `${a}/${b}  ؟  ${c}/${d}`, read: `Compare ${a} over ${b} and ${c} over ${d}.`,
      pic: STACK([FBAR(a, b, { col, label: `${a}/${b}` }), FBAR(c, d, { col, label: `${c}/${d}` })]),
      opts: ['<', '>', '='], keep: true, ans: s, why, whyAr,
      hint: kind === 'den' ? 'The bottom numbers are the same, so the pieces are the same size. Which has more pieces?' : kind === 'num' ? 'The top numbers are the same. Which whole is cut into fewer, bigger pieces?' : 'Compare how long the coloured part of each bar is.',
      hintAr: kind === 'den' ? 'المقامان متساويان، إذن القطع بنفس الحجم. أيهما فيه قطع أكثر؟' : kind === 'num' ? 'البسطان متساويان. أي كلٍّ مقسوم إلى قطع أقل وأكبر؟' : 'قارني طول الجزء الملوّن في كل شريط.' });
  };
  [3, 4, 6, 8].forEach(b => { for (let a = 1; a < b; a++) for (let c = 1; c < b; c++) if (a !== c && Math.random() < .5) addCmp(a, b, c, b, 'den'); });
  [1, 2, 3].forEach(a => DENS.forEach(b => DENS.forEach(d => { if (b !== d && a < b && a < d) addCmp(a, b, a, d, 'num'); })));
  FR.forEach(([a, b]) => FR.forEach(([c, d]) => { if (b < d && a * d === b * c) addCmp(a, b, c, d, 'eq'); }));

  /* quiz 3: whole numbers as fractions */
  const whole = [];
  [2, 3, 4, 6, 8].forEach(b => {
    whole.push({ q: 'Which fraction is equal to 1 whole?', qAr: 'أي كسر يساوي 1 (واحداً صحيحاً)؟', pic: FBAR(b, b, { col: ANY(COLS) }),
      opts: SOPTS(`${b}/${b}`, [`1/${b}`, `${b - 1}/${b}`, `${b}/1`]), ans: `${b}/${b}`,
      why: `The whole is cut into ${b} equal parts and ALL ${b} are coloured. <b>${b}/${b} = 1</b>. When the top and bottom are the same, the fraction is 1 whole.`,
      whyAr: `الكل مقسوم إلى ${b} أجزاء متساوية، وكل الأجزاء الـ${b} ملوّنة. <b>${b}/${b} = 1</b>. عندما يتساوى البسط والمقام يكون الكسر واحداً صحيحاً.`,
      hint: 'A whole means every part is coloured. Look for a top number that equals the bottom number.', hintAr: 'الكل يعني أن كل الأجزاء ملوّنة. ابحثي عن كسر بسطه يساوي مقامه.' });
    whole.push({ q: `${b}/${b} = ?`, qAr: `${b}/${b} = ؟`, pic: FBAR(b, b, { col: ANY(COLS) }),
      opts: SOPTS('1', [String(b), '0', String(b * 2)]), ans: '1',
      why: `${b} parts out of ${b} parts is everything: <b>${b}/${b} = 1</b> whole.`, whyAr: `${b} أجزاء من ${b} أجزاء هي الكل: <b>${b}/${b} = 1</b>.`,
      hint: 'Is every part coloured?', hintAr: 'هل كل الأجزاء ملوّنة؟' });
  });
  for (let n = 2; n <= 8; n++) whole.push({ q: `${n} = ?`, qAr: `${n} = ؟`, pic: `<div class="row" style="justify-content:center;gap:6px">${Array.from({ length: n }, () => FBAR(1, 1, { w: 34, h: 34, col: '#22B566' })).join('')}</div>`,
    opts: SOPTS(`${n}/1`, [`1/${n}`, `${n}/${n}`, `${n + 1}/1`]), ans: `${n}/1`,
    why: `There are ${n} wholes, and each whole is 1 part (not cut). ${n} parts of size 1 = <b>${n}/1</b> = ${n}.`, whyAr: `يوجد ${n} أشياء كاملة، وكل واحد جزء واحد (غير مقسوم). ${n} أجزاء حجم كل منها 1 = <b>${n}/1</b> = ${n}.`,
    hint: 'Each square is a whole that is not cut. How many wholes? The bottom number is 1.', hintAr: 'كل مربع شيء كامل غير مقسوم. كم عدد الأشياء الكاملة؟ المقام هو 1.' });
  [2, 3, 4].forEach(b => [2, 3].forEach(k => whole.push({ q: `${k * b}/${b} = ?`, qAr: `${k * b}/${b} = ؟`,
    pic: STACK(Array.from({ length: k }, () => FBAR(b, b, { w: 140, h: 26, col: '#7C4DFF' })), 4),
    opts: SOPTS(String(k), [String(k * b), String(b), String(k + 1)]), ans: String(k),
    why: `Each whole has ${b} parts. ${k * b} parts fill ${k} wholes, because ${k} × ${b} = ${k * b}. So <b>${k * b}/${b} = ${k}</b>.`,
    whyAr: `كل واحد صحيح فيه ${b} أجزاء. ${k * b} جزءاً تملأ ${k} أشياء كاملة، لأن ${k} × ${b} = ${k * b}. إذن <b>${k * b}/${b} = ${k}</b>.`,
    hint: `Count the full bars. Each bar is ${b}/${b} = 1.`, hintAr: `عدّي الأشرطة الممتلئة. كل شريط هو ${b}/${b} = 1.` })));

  /* quiz 4: sort against one half */
  const half = FR.map(([a, b]) => [`${a}/${b}`, 2 * a < b ? 0 : 2 * a === b ? 1 : 2]);

  addLesson({
    id: 'm-t13', island: 'm-t13', added: '2026-11-03', pic: '⚖️',
    title: 'Equal Fractions and Comparing', sub: 'Equivalent fractions, wholes, and which is bigger',
    learn: [
      { title: 'Same amount, different names', titleAr: 'نفس الكمية بأسماء مختلفة',
        text: 'Colour 1/2, 2/4 and 4/8 of the same bar. They cover the same length! They are <b>equivalent fractions</b>.',
        textAr: 'لوّني 1/2 و2/4 و4/8 من نفس الشريط. كلها تغطي نفس الطول! إنها <b>كسور متكافئة (equivalent fractions)</b>.',
        say: 'Colour one half, two fourths and four eighths of the same bar. They cover the same length! They are equivalent fractions.',
        show: { kind: 'html', html: STACK([FBAR(1, 2, { anim: true, label: '1/2', col: '#FF8A3D' }), FBAR(2, 4, { anim: true, delay: 1, label: '2/4', col: '#7C4DFF' }), FBAR(4, 8, { anim: true, delay: 2, step: .25, label: '4/8', col: '#22B566' })]) } },
      { title: 'Same point on the number line', titleAr: 'نفس النقطة على خط الأعداد',
        text: '1/2 on the halves line and 2/4 on the fourths line are at the <b>same point</b>. So 1/2 = 2/4.',
        textAr: '1/2 على خط الأنصاف و2/4 على خط الأرباع في <b>نفس النقطة</b>. إذن 1/2 = 2/4.',
        say: 'One half on the halves line and two fourths on the fourths line are at the same point. So one half equals two fourths.',
        show: { kind: 'html', html: NL2(2, 1, 4, 2) } },
      { title: 'Whole numbers as fractions', titleAr: 'الأعداد الكاملة على شكل كسور',
        text: 'All parts coloured is one whole: <b>4/4 = 1</b>. Three wholes that are not cut: <b>3/1 = 3</b>.',
        textAr: 'كل الأجزاء ملوّنة تعني واحداً صحيحاً: <b>4/4 = 1</b>. وثلاثة أشياء كاملة غير مقسومة: <b>3/1 = 3</b>.',
        say: 'All parts coloured is one whole: four fourths equals 1. Three wholes that are not cut: three over one equals 3.',
        show: { kind: 'html', html: `<div class="pop">${FBAR(4, 4, { label: '= 1', col: '#22B566', w: 200 })}</div><div class="row pop" style="justify-content:center;gap:6px;animation-delay:1.2s">${[1, 2, 3].map(() => FBAR(1, 1, { w: 50, h: 34, col: '#2E9BF0' })).join('')}<b class="eqn">= 3/1 = 3</b></div>` } },
      { title: 'Same bottom number', titleAr: 'نفس المقام',
        text: '3/8 and 5/8: the pieces are the same size. 5 pieces is more than 3 pieces, so <b>5/8 > 3/8</b>.',
        textAr: '3/8 و5/8: القطع بنفس الحجم. 5 قطع أكثر من 3 قطع، إذن <b>5/8 > 3/8</b>.',
        say: 'Three eighths and five eighths: the pieces are the same size. 5 pieces is more than 3 pieces, so five eighths is greater than three eighths.',
        show: { kind: 'html', html: STACK([FBAR(3, 8, { anim: true, step: .3, label: '3/8', col: '#FF8A3D' }), FBAR(5, 8, { anim: true, delay: 1.2, step: .3, label: '5/8', col: '#7C4DFF' })]) + '<p class="eqn pop" style="animation-delay:2.8s">5/8 <b>></b> 3/8</p>' } },
      { title: 'Same top number', titleAr: 'نفس البسط',
        text: '1/3 or 1/6 of the same pizza? Cutting into fewer pieces makes <b>bigger</b> pieces. So <b>1/3 > 1/6</b>.',
        textAr: '1/3 أم 1/6 من نفس البيتزا؟ كلما قسمنا إلى قطع أقل كانت القطعة <b>أكبر</b>. إذن <b>1/3 > 1/6</b>.',
        say: 'One third or one sixth of the same pizza? Cutting into fewer pieces makes bigger pieces. So one third is greater than one sixth.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:24px"><div class="pop" style="text-align:center">${FPIE(1, 3, '#FF8A3D')}<p class="eqn">1/3</p></div><div class="pop" style="text-align:center;animation-delay:.9s">${FPIE(1, 6, '#7C4DFF')}<p class="eqn">1/6</p></div></div><p class="eqn pop" style="animation-delay:1.8s">1/3 <b>></b> 1/6</p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Equal fractions', pick: 5, start: 'Find the fraction that covers the same length!', startAr: 'جدي الكسر الذي يغطي نفس الطول!', items: equiv },
      { type: 'mc', title: 'Compare', pick: 6, big: true, start: 'Is it less than (<), greater than (>) or equal (=)?', startAr: 'هل هو أصغر من (<)، أم أكبر من (>)، أم يساوي (=)؟', items: cmp },
      { type: 'mc', title: 'Wholes as fractions', pick: 5, start: 'When does a fraction make a whole?', startAr: 'متى يكون الكسر واحداً صحيحاً؟', items: whole },
      { type: 'sort', title: 'Compare to one half', pick: 9, big: true, start: 'Is it less than 1/2, equal to 1/2, or more than 1/2?', startAr: 'هل الكسر أصغر من 1/2، أم يساوي 1/2، أم أكبر من 1/2؟',
        ask: 'Drag each fraction into the right box. Or tap it, then tap a box.', askAr: 'اسحبي كل كسر إلى الصندوق الصحيح، أو اضغطي عليه ثم على الصندوق.',
        hint: 'Half of the bottom number: is the top number less, the same, or more?', hintAr: 'نصف المقام: هل البسط أقل منه، أم يساويه، أم أكثر منه؟',
        buckets: [
          { label: 'Less than 1/2', labelAr: 'أصغر من 1/2', pic: '⬅️', why: '{w}: the top number is less than half of the bottom number, so it is less than 1/2.', whyAr: '{w}: البسط أقل من نصف المقام، إذن الكسر أصغر من 1/2.' },
          { label: 'Equal to 1/2', labelAr: 'يساوي 1/2', pic: '🟰', why: '{w}: the top number is exactly half of the bottom number, so it equals 1/2.', whyAr: '{w}: البسط نصف المقام تماماً، إذن الكسر يساوي 1/2.' },
          { label: 'More than 1/2', labelAr: 'أكبر من 1/2', pic: '➡️', why: '{w}: the top number is more than half of the bottom number, so it is more than 1/2.', whyAr: '{w}: البسط أكثر من نصف المقام، إذن الكسر أكبر من 1/2.' },
        ], items: half },
    ],
  });
})();
