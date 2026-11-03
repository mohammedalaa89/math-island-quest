/* enVision Mathematics Grade 3, Topic 10: Multiply by multiples of 10 (Common Core 3.NBT.3).
   Tens as bundles, patterns, number lines, place-value reasoning. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const OPTS = (ans, wrongs) => {
    const out = [String(ans)];
    for (const w of wrongs.concat([ans + 10, ans - 10, ans + 20, ans * 10])) { const s = String(w); if (out.length < 4 && w > 0 && !out.includes(s)) out.push(s); }
    return out;
  };
  /* k green ten-sticks */
  const RODS = k => {
    let x = 3, p = '';
    for (let i = 0; i < k; i++) { let g = ''; for (let j = 1; j < 10; j++) g += `M${x} ${3 + j * 4}h6`; p += `<rect x="${x}" y="3" width="6" height="40" fill="#22B566" stroke="#168048" stroke-width="1.2"/><path d="${g}" stroke="#168048" stroke-width=".6"/>`; x += 9; }
    return `<svg viewBox="0 0 ${x + 2} 46" width="${(x + 2) * 1.5}" style="max-width:100%;height:auto">${p}</svg>`;
  };
  const PLATES = (n, k, anim) => `<div class="grps2">${Array.from({ length: n }, (_, j) => `<div class="plate${anim ? ' pop' : ''}" style="padding:10px;border-radius:18px${anim ? `;animation-delay:${j * .4}s` : ''}">${RODS(k)}</div>`).join('')}</div>`;
  /* number line from 0 with n jumps of s */
  function NL(n, s, anim, hideEnd) {
    const W = 330, x0 = 18, x1 = W - 18, step = (x1 - x0) / n; let p = '';
    p += `<line x1="${x0 - 8}" y1="70" x2="${x1 + 10}" y2="70" stroke="#1E2A44" stroke-width="2.5"/>`;
    for (let i = 0; i <= n; i++) {
      const x = x0 + i * step, lab = hideEnd && i === n ? '?' : i * s;
      p += `<line x1="${x}" y1="63" x2="${x}" y2="77" stroke="#1E2A44" stroke-width="2"/><text x="${x}" y="95" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="${n > 6 ? 11 : 13}" fill="${i === n ? '#F0466B' : '#1E2A44'}">${lab}</text>`;
      if (i < n) {
        const len = step * 1.6;
        p += `<path d="M${x} 66 Q${x + step / 2} ${22} ${x + step} 66" fill="none" stroke="#FF8A3D" stroke-width="3" stroke-linecap="round" stroke-dasharray="${len}" stroke-dashoffset="${anim ? len : 0}">${anim ? `<animate attributeName="stroke-dashoffset" from="${len}" to="0" begin="${.4 + i * .6}s" dur=".5s" fill="freeze"/>` : ''}</path>
          <text x="${x + step / 2}" y="34" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="12" fill="#C9601F" opacity="${anim ? 0 : 1}">+${s}${anim ? `<animate attributeName="opacity" from="0" to="1" begin="${.6 + i * .6}s" dur=".3s" fill="freeze"/>` : ''}</text>`;
      }
    }
    return `<svg viewBox="0 0 ${W} 104" width="330" style="max-width:100%;height:auto" role="img" aria-label="number line">${p}</svg>`;
  }

  /* quiz 1: groups of ten-sticks */
  const sticks = [];
  for (let n = 2; n <= 5; n++) for (let k = 2; k <= 9; k++) {
    const t = n * k, ans = t * 10;
    sticks.push({ q: `${n} groups of ${k * 10}. How many in all?`, qAr: `${n} مجموعات، في كل مجموعة ${k * 10}. كم العدد كله؟`, pic: PLATES(n, k),
      opts: OPTS(ans, [t, ans + 10, (n + k) * 10, ans - 10]), ans: String(ans),
      why: `Each stick is 10. ${n} groups of <b>${k} tens</b> = ${n} × ${k} = <b>${t} tens</b>. ${t} tens = <b>${ans}</b>. So ${n} × ${k * 10} = ${ans}.`,
      whyAr: `كل عود يساوي 10. ${n} مجموعات من <b>${k} عشرات</b> = ${n} × ${k} = <b>${t} عشرة</b>. و${t} عشرة = <b>${ans}</b>. إذن ${n} × ${k * 10} = ${ans}.`,
      hint: `Count the sticks in ONE group: that many tens. Then think ${n} × that number, and make it tens.`,
      hintAr: `عدّي الأعواد في مجموعة واحدة: هذه عشرات. ثم فكّري في ${n} × هذا العدد، واجعلي الناتج عشرات.` });
  }
  /* quiz 2: basic fact, then tens */
  const facts = [];
  for (let a = 2; a <= 9; a++) for (let b = 1; b <= 9; b++) {
    const f = a * b, ans = f * 10, sw = Math.random() < .4;
    facts.push({ q: sw ? `${b * 10} × ${a} = ?` : `${a} × ${b * 10} = ?`, qAr: sw ? `${b * 10} × ${a} = ؟` : `${a} × ${b * 10} = ؟`,
      opts: OPTS(ans, [f, f * 100, (a + b) * 10, ans + 10]), ans: String(ans),
      why: `${b * 10} is <b>${b} tens</b>. ${a} × ${b} = ${f}, so ${a} × ${b} tens = <b>${f} tens</b> = <b>${ans}</b>.${f % 10 === 0 ? ` (${f} already ends in 0, and we still add one more 0 for the tens!)` : ''}`,
      whyAr: `${b * 10} تساوي <b>${b} عشرات</b>. ${a} × ${b} = ${f}، إذن ${a} × ${b} عشرات = <b>${f} عشرة</b> = <b>${ans}</b>.${f % 10 === 0 ? ` (${f} فيه صفر أصلاً، ونضيف صفراً آخر للعشرات!)` : ''}`,
      hint: `Use the fact ${a} × ${b} first. Then remember you are counting tens.`, hintAr: `استخدمي الحقيقة ${a} × ${b} أولاً. ثم تذكّري أنكِ تعدّين عشرات.` });
  }
  /* quiz 3: missing factor */
  const missing = [];
  for (let a = 2; a <= 9; a++) for (let b = 1; b <= 9; b++) {
    const ans = a * b * 10;
    missing.push({ s: `${a} × ___ = ${ans}`, ans: String(b * 10),
      why: `${a} × ${b} = ${a * b}, so ${a} × <b>${b * 10}</b> = ${a * b} tens = <b>${ans}</b>.`,
      whyAr: `${a} × ${b} = ${a * b}، إذن ${a} × <b>${b * 10}</b> = ${a * b} عشرة = <b>${ans}</b>.`,
      hint: `How many tens is ${ans}? Then ask: ${a} times what makes that many?`, hintAr: `كم عشرة في ${ans}؟ ثم اسألي: ${a} ضرب كم يساوي هذا العدد؟` });
  }
  /* quiz 4: number lines and stories */
  const STORY = [
    ['🖍️', (n, s) => `There are ${n} boxes with ${s} crayons in each box. How many crayons?`, (n, s) => `هناك ${n} علب، في كل علبة ${s} قلم تلوين. كم قلماً؟`, 'boxes', 'علب'],
    ['🚌', (n, s) => `${n} buses each carry ${s} students. How many students?`, (n, s) => `${n} حافلات، في كل حافلة ${s} طالبة. كم طالبة؟`, 'buses', 'حافلات'],
    ['🍪', (n, s) => `Mama bakes ${n} trays with ${s} cookies on each tray. How many cookies?`, (n, s) => `خبزت ماما ${n} صوانٍ، في كل صينية ${s} كعكة. كم كعكة؟`, 'trays', 'صوانٍ'],
    ['💵', (n, s) => `Noura saves ${s} riyals every week for ${n} weeks. How many riyals?`, (n, s) => `توفّر نورة ${s} ريالاً كل أسبوع لمدة ${n} أسابيع. كم ريالاً؟`, 'weeks', 'أسابيع'],
    ['🌷', (n, s) => `A garden has ${n} rows with ${s} flowers in each row. How many flowers?`, (n, s) => `في الحديقة ${n} صفوف، في كل صف ${s} زهرة. كم زهرة؟`, 'rows', 'صفوف'],
  ];
  const lines = [];
  for (let k = 0; k < 40; k++) {
    const n = R(2, 6), s = R(1, 9) * 10, ans = n * s;
    if (k % 2 === 0) {
      lines.push({ q: `${n} jumps of ${s}. Where does it land?`, qAr: `${n} قفزات، كل قفزة ${s}. أين تقف؟`, pic: NL(n, s, false, true),
        opts: OPTS(ans, [ans - s, ans + s, n * s / 10]), ans: String(ans),
        why: `Count by ${s}s: ${Array.from({ length: n }, (_, i) => (i + 1) * s).join(', ')}. So ${n} × ${s} = <b>${ans}</b>.`,
        whyAr: `نعدّ بالقفز ${s}: ${Array.from({ length: n }, (_, i) => (i + 1) * s).join('، ')}. إذن ${n} × ${s} = <b>${ans}</b>.`,
        hint: `Each orange jump adds ${s}. Count the jumps and skip-count.`, hintAr: `كل قفزة برتقالية تضيف ${s}. عدّي القفزات وعدّي بالقفز.` });
    } else {
      const [pic, en, ar, w, wA] = ANY(STORY);
      lines.push({ q: en(n, s), qAr: ar(n, s), pic, opts: OPTS(ans, [n + s, ans + 10, n * s / 10]), ans: String(ans),
        why: `${n} equal groups of ${s}: ${n} × ${s} = ${n} × ${s / 10} tens = ${n * s / 10} tens = <b>${ans}</b>.`,
        whyAr: `${n} مجموعات متساوية من ${s}: ${n} × ${s} = ${n} × ${s / 10} عشرات = ${n * s / 10} عشرة = <b>${ans}</b>.`,
        hint: `Equal groups means multiply. How many ${w}? How many in each?`, hintAr: `المجموعات المتساوية تعني الضرب. كم عدد الـ${wA}؟ وكم في كل واحدة؟` });
    }
  }

  addLesson({
    id: 'm-t10', island: 'm-t10', added: '2026-11-03', pic: '🔟',
    title: 'Multiply by Multiples of 10', sub: '4 × 30, 6 × 50 and more, using tens',
    learn: [
      { title: '30 is 3 tens', titleAr: 'العدد 30 هو 3 عشرات',
        text: '4 × 30 means 4 groups of 30. Each group has <b>3 tens</b>. 4 groups of 3 tens = <b>12 tens</b> = <b>120</b>.',
        textAr: '4 × 30 تعني 4 مجموعات من 30. في كل مجموعة <b>3 عشرات</b>. 4 مجموعات من 3 عشرات = <b>12 عشرة</b> = <b>120</b>.',
        show: { kind: 'html', html: `${PLATES(4, 3, true)}<p class="eqn pop" style="animation-delay:1.9s">4 × 3 tens = 12 tens = <b>120</b></p>` } },
      { title: 'See the pattern', titleAr: 'لاحظي النمط',
        text: 'Know the fact, then make it tens. 4 × 3 = 12, so 4 × 30 = 120. 6 × 5 = 30, so 6 × 50 = 300.',
        textAr: 'اعرفي الحقيقة، ثم اجعليها عشرات. 4 × 3 = 12، إذن 4 × 30 = 120. و6 × 5 = 30، إذن 6 × 50 = 300.',
        show: { kind: 'html', html: `<p class="eqn pop">4 × 3 = 12</p><p class="eqn pop" style="animation-delay:.8s">4 × 3<span style="color:#F0466B">0</span> = <b>12<span style="color:#F0466B">0</span></b></p><p class="eqn pop" style="animation-delay:1.8s">6 × 5 = 30</p><p class="eqn pop" style="animation-delay:2.6s">6 × 5<span style="color:#F0466B">0</span> = <b>30<span style="color:#F0466B">0</span></b></p>` } },
      { title: 'Jump on a number line', titleAr: 'نقفز على خط الأعداد',
        text: '3 × 20: make 3 jumps of 20. 20, 40, <b>60</b>. So 3 × 20 = 60.',
        textAr: '3 × 20: نقفز 3 قفزات، كل قفزة 20. 20، 40، <b>60</b>. إذن 3 × 20 = 60.',
        show: { kind: 'html', html: NL(3, 20, true) } },
      { title: 'Watch out for zeros', titleAr: 'انتبهي للأصفار',
        text: '5 × 40 = 5 × 4 tens = 20 tens. 20 tens = <b>200</b>. The answer has two zeros, because 5 × 4 = 20 already ends in 0.',
        textAr: '5 × 40 = 5 × 4 عشرات = 20 عشرة. و20 عشرة = <b>200</b>. في الناتج صفران، لأن 5 × 4 = 20 فيه صفر أصلاً.',
        show: { kind: 'html', html: `<p class="eqn pop">5 × 40</p><p class="eqn pop" style="animation-delay:.8s">= 5 × 4 tens</p><p class="eqn pop" style="animation-delay:1.6s">= 20 tens</p><p class="eqn pop" style="animation-delay:2.4s">= <b>200</b></p>` } },
      { title: 'In a story', titleAr: 'في قصة',
        text: '6 boxes with 20 crayons in each box. Equal groups, so multiply: 6 × 20 = 6 × 2 tens = 12 tens = <b>120 crayons</b>.',
        textAr: '6 علب، في كل علبة 20 قلم تلوين. مجموعات متساوية، إذن نضرب: 6 × 20 = 6 × 2 عشرات = 12 عشرة = <b>120 قلماً</b>.',
        show: { kind: 'html', html: `<div class="grps2">${Array.from({ length: 6 }, (_, j) => `<div class="plate pop" style="animation-delay:${j * .3}s;font-size:1.3rem">🖍️ 20</div>`).join('')}</div><p class="eqn pop" style="animation-delay:2.2s">6 × 20 = <b>120</b></p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Groups of tens', pick: 5, start: 'Each stick is 10. Count the tens!', startAr: 'كل عود يساوي 10. عدّي العشرات!', items: sticks },
      { type: 'mc', title: 'Times tens', pick: 6, big: true, start: 'Use the fact you know, then make it tens!', startAr: 'استخدمي الحقيقة التي تعرفينها، ثم اجعليها عشرات!', items: facts },
      { type: 'fill', title: 'Missing number', pick: 5, start: 'Which multiple of 10 fits?', startAr: 'أي مضاعف للعدد 10 يناسب؟',
        bank: ['10', '20', '30', '40', '50', '60', '70', '80', '90'], choices: 4, items: missing,
        hint: 'Think of the times fact without the zero first.', hintAr: 'فكّري في حقيقة الضرب بدون الصفر أولاً.' },
      { type: 'mc', title: 'Jumps and stories', pick: 5, start: 'Count the jumps, or find the equal groups!', startAr: 'عدّي القفزات، أو جدي المجموعات المتساوية!', items: lines },
    ],
  });
})();
