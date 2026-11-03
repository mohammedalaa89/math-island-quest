/* enVision Math Grade 3, Topic 4: Use multiplication to divide – division facts, fact families, 0 and 1 rules.
   Our own explanations and generated questions (3.OA.2, 3.OA.4, 3.OA.6, 3.OA.7). English + Arabic. */
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
  const GRP = (g, n, e) => `<div class="grps2">${Array.from({ length: g }, () => `<div class="plate">${e.repeat(n) || '&nbsp;'}</div>`).join('')}</div>`;
  const PILE = (t, e) => `<div class="chipsrow" style="font-size:1.5rem;gap:4px;max-width:280px">${Array.from({ length: t }, () => `<span>${e}</span>`).join('')}</div>`;

  /* quiz 1: division with pictures – sharing into rows, and making groups */
  const pics = [];
  for (let d = 2; d <= 6; d++) for (let q = 2; q <= 8; q++) {
    const t = d * q, e = em();
    pics.push({ q: `${t} things in ${d} equal rows. How many in each row? ${t} ÷ ${d} = ?`, qAr: `${t} قطعة في ${d} صفوف متساوية. كم في كل صف؟ ${t} ÷ ${d} = ؟`,
      pic: DOTS(d, q, e), opts: nums(q, [q + 1, q - 1, d, t - d, q + 2]), ans: String(q),
      why: `Each of the ${d} rows has <b>${q}</b>. So <b>${t} ÷ ${d} = ${q}</b>, because ${d} × ${q} = ${t}.`,
      whyAr: `في كل صف من الصفوف الـ ${d} يوجد <b>${q}</b>. إذن <b>${t} ÷ ${d} = ${q}</b>، لأن ${d} × ${q} = ${t}.`,
      hint: 'Count the things in ONE row.', hintAr: 'عدّي القطع في صف واحد فقط.' });
    if (q <= 6) pics.push({ q: `Put ${t} cookies in bags of ${q}. How many bags? ${t} ÷ ${q} = ?`, qAr: `ضعي ${t} كعكة في أكياس، في كل كيس ${q}. كم كيساً؟ ${t} ÷ ${q} = ؟`,
      pic: GRP(d, q, '🍪'), opts: nums(d, [d + 1, d - 1, q, d + 2]), ans: String(d),
      why: `Each bag (plate) holds ${q}. Count the bags: <b>${d}</b>. So <b>${t} ÷ ${q} = ${d}</b>, because ${d} × ${q} = ${t}.`,
      whyAr: `في كل كيس ${q}. عدّي الأكياس: <b>${d}</b>. إذن <b>${t} ÷ ${q} = ${d}</b>، لأن ${d} × ${q} = ${t}.`,
      hint: 'This time count the groups, not the cookies in a group.', hintAr: 'هذه المرة عدّي المجموعات، وليس الكعك داخل المجموعة.' });
  }

  /* quiz 2: think multiplication */
  const think = [];
  for (let d = 2; d <= 9; d++) for (let q = 2; q <= 10; q++) {
    const t = d * q;
    think.push({ q: `${t} ÷ ${d} = ?`, qAr: `${t} ÷ ${d} = ؟`, pic: `<p class="eqn">${d} × <b>?</b> = ${t}</p>`,
      opts: nums(q, [q + 1, q - 1, t - d, d, q + 2]), ans: String(q),
      why: `Think multiplication: ${d} × <b>${q}</b> = ${t}. So <b>${t} ÷ ${d} = ${q}</b>.`,
      whyAr: `فكّري في الضرب: ${d} × <b>${q}</b> = ${t}. إذن <b>${t} ÷ ${d} = ${q}</b>.`,
      hint: `Count by ${d}s until you reach ${t}. How many jumps?`, hintAr: `عدّي بالقفز ${d} حتى تصلي إلى ${t}. كم قفزة؟` });
  }

  /* quiz 3: fact families */
  const fam = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) if (a !== b) {
    const p = a * b, ans = Math.random() < .5 ? `${p} ÷ ${b} = ${a}` : `${p} ÷ ${a} = ${b}`;
    fam.push({ q: `Which fact is in the same fact family as ${a} × ${b} = ${p}?`, qAr: `أي حقيقة من نفس عائلة الحقائق (fact family) للعملية ${a} × ${b} = ${p}؟`,
      pic: DOTS(a, b, em()),
      opts: opts(ans, [`${p} ÷ ${a} = ${b + 1}`, `${p} − ${a} = ${p - a}`, `${b} ÷ ${a} = ${p}`, `${a} + ${b} = ${a + b}`], k => `${p} ÷ ${b} = ${a + k}`), ans,
      why: `A fact family uses the same three numbers: ${a}, ${b} and ${p}. ${a} × ${b} = ${p}, ${b} × ${a} = ${p}, ${p} ÷ ${a} = ${b}, ${p} ÷ ${b} = ${a}. So <b>${ans}</b>.`,
      whyAr: `عائلة الحقائق تستخدم نفس الأعداد الثلاثة: ${a} و ${b} و ${p}. ${a} × ${b} = ${p}، ${b} × ${a} = ${p}، ${p} ÷ ${a} = ${b}، ${p} ÷ ${b} = ${a}. إذن <b>${ans}</b>.`,
      hint: `Look for a division fact that uses only ${a}, ${b} and ${p}, and is true.`, hintAr: `ابحثي عن حقيقة قسمة صحيحة تستخدم الأعداد ${a} و ${b} و ${p} فقط.` });
  }

  /* quiz 4: 0 and 1 rules */
  const rules = [];
  for (let n = 2; n <= 10; n++) {
    rules.push({ q: `${n} ÷ 1 = ?`, qAr: `${n} ÷ 1 = ؟`, pic: `${PILE(n, '🍪')}<div style="font-size:2rem;text-align:center">⬇ 👧</div>`,
      opts: nums(n, [1, 0, n + 1, n - 1]), ans: String(n),
      why: `Share ${n} cookies with just 1 friend: she gets all <b>${n}</b>. Any number ÷ 1 = the same number.`,
      whyAr: `وزّعي ${n} كعكات على صديقة واحدة فقط: تأخذها كلها <b>${n}</b>. أي عدد ÷ 1 = العدد نفسه.`,
      hint: 'If only ONE friend shares, how many does she get?', hintAr: 'إذا كانت صديقة واحدة فقط، فكم تأخذ؟' });
    rules.push({ q: `${n} ÷ ${n} = ?`, qAr: `${n} ÷ ${n} = ؟`, pic: GRP(n, 1, '🍪'),
      opts: nums(1, [n, 0, 2, n + 1]), ans: '1',
      why: `Share ${n} cookies with ${n} friends: each friend gets <b>1</b>. A number divided by itself is 1 (not 0).`,
      whyAr: `وزّعي ${n} كعكات على ${n} صديقات: كل واحدة تأخذ <b>1</b>. العدد ÷ نفسه = 1 (وليس 0).`,
      hint: 'Same number of cookies and friends. How many does each friend get?', hintAr: 'عدد الكعك يساوي عدد الصديقات. كم تأخذ كل واحدة؟' });
    rules.push({ q: `0 ÷ ${n} = ?`, qAr: `0 ÷ ${n} = ؟`, pic: GRP(n, 0, '🍪'),
      opts: nums(0, [n, 1, n - 1]), ans: '0',
      why: `There are 0 cookies to share, so every friend gets <b>0</b>. 0 ÷ any number = 0.`,
      whyAr: `لا يوجد أي كعك للتوزيع، فكل صديقة تأخذ <b>0</b>. 0 ÷ أي عدد = 0.`,
      hint: 'How many cookies are there to share?', hintAr: 'كم كعكة يوجد للتوزيع؟' });
  }
  for (let n = 2; n <= 9; n++) rules.push({ q: `Which one can we NOT do?`, qAr: `أي عملية لا يمكننا حلّها؟`, pic: '🚫',
    opts: [`${n} ÷ 0`, `0 ÷ ${n}`, `${n} ÷ 1`, `${n} ÷ ${n}`], ans: `${n} ÷ 0`,
    why: `<b>${n} ÷ 0</b> means sharing ${n} things among 0 friends. Nobody is there to get them, so we can't divide by 0!`,
    whyAr: `<b>${n} ÷ 0</b> تعني توزيع ${n} أشياء على 0 صديقات. لا أحد ليأخذها، لذلك لا يمكن القسمة على 0!`,
    hint: 'Think about sharing with nobody.', hintAr: 'فكّري في التوزيع على لا أحد.' });

  addLesson({
    id: 'm-t4', island: 'm-t4', added: '2026-11-03', pic: '➗',
    title: 'Topic 4: Multiply to Divide', sub: 'Division facts and fact families',
    learn: [
      { title: 'Division is fair sharing', titleAr: 'القسمة توزيع بالتساوي',
        text: '12 cookies shared by 4 friends. Each friend gets 3. <b>12 ÷ 4 = 3</b>.',
        textAr: '١٢ كعكة نوزّعها على ٤ صديقات. كل واحدة تأخذ ٣. <b>12 ÷ 4 = 3</b>.',
        show: { kind: 'html', html: `<div class="pop">${PILE(12, '🍪')}</div><p class="eqn pop" style="animation-delay:.8s">⬇ share</p><div class="pop" style="animation-delay:1.4s">${GRP(4, 3, '🍪')}</div><p class="eqn pop" style="animation-delay:2.2s">12 ÷ 4 = <b>3</b></p>` } },
      { title: 'Division makes equal groups', titleAr: 'القسمة تصنع مجموعات متساوية',
        text: '15 stars, 5 in each group. How many groups? <b>15 ÷ 5 = 3</b> groups.',
        textAr: '١٥ نجمة، في كل مجموعة ٥. كم مجموعة؟ <b>15 ÷ 5 = 3</b> مجموعات.',
        show: { kind: 'groups', g: 3, n: 5, e: '⭐' } },
      { title: 'A fact family', titleAr: 'عائلة الحقائق (fact family)',
        text: '3, 5 and 15 make a family of four facts. Multiplication and division are friends!',
        textAr: 'الأعداد 3 و 5 و 15 تصنع عائلة من أربع حقائق. الضرب والقسمة صديقان!',
        show: { kind: 'html', html: `<div class="pop">${DOTS(3, 5, '🌸')}</div><div class="chipsrow">${['3 × 5 = 15', '5 × 3 = 15', '15 ÷ 3 = 5', '15 ÷ 5 = 3'].map((x, k) => `<span class="ochip pop" style="animation-delay:${.8 + k * .5}s">${x}</span>`).join('')}</div>` } },
      { title: 'Think multiplication', titleAr: 'فكّري في الضرب',
        text: '24 ÷ 6 = ? Ask: 6 times what is 24? 6 × <b>4</b> = 24, so 24 ÷ 6 = <b>4</b>.',
        textAr: '24 ÷ 6 = ؟ اسألي: 6 ضرب كم يساوي 24؟ 6 × <b>4</b> = 24، إذن 24 ÷ 6 = <b>4</b>.',
        show: { kind: 'html', html: '<p class="eqn pop">24 ÷ 6 = ?</p><p class="eqn pop" style="animation-delay:.9s">6 × ? = 24</p><p class="eqn pop" style="animation-delay:1.8s">6, 12, 18, 24 ➜ 4 jumps</p><p class="eqn pop" style="animation-delay:2.7s">24 ÷ 6 = <b>4</b></p>' } },
      { title: 'Rules for 0 and 1', titleAr: 'قواعد الصفر والواحد',
        text: '8 ÷ 1 = 8. 8 ÷ 8 = 1. 0 ÷ 8 = 0. But we can <b>never divide by 0</b>!',
        textAr: '8 ÷ 1 = 8. و 8 ÷ 8 = 1. و 0 ÷ 8 = 0. لكن <b>لا يمكن أبداً القسمة على 0</b>!',
        show: { kind: 'html', html: `<div class="chipsrow">${[['👧', '8 ÷ 1 = 8'], ['👭', '8 ÷ 8 = 1'], ['🫙', '0 ÷ 8 = 0'], ['🚫', '8 ÷ 0 ✗']].map((x, k) => `<span class="ochip pop" style="animation-delay:${k * .6}s"><i>${x[0]}</i>${x[1]}</span>`).join('')}</div>` } },
    ],
    acts: [
      { type: 'mc', title: 'Share and group', pick: 6, start: 'Look at the picture. Count one row, or count the groups!', startAr: 'انظري إلى الصورة. عدّي صفاً واحداً، أو عدّي المجموعات!', items: pics },
      { type: 'mc', title: 'Think multiplication', pick: 6, start: 'Turn each division into a times fact!', startAr: 'حوّلي كل قسمة إلى عملية ضرب!', items: think },
      { type: 'mc', title: 'Fact families', pick: 5, start: 'A fact family uses the same three numbers!', startAr: 'عائلة الحقائق تستخدم نفس الأعداد الثلاثة!', items: fam },
      { type: 'mc', title: '0 and 1 rules', pick: 6, start: 'Remember the rules for 0 and 1!', startAr: 'تذكّري قواعد الصفر والواحد!', items: rules },
    ],
  });
})();
