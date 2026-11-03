/* Grade 3 math (Common Core 3.OA.1–4): multiplication as equal groups and arrays, division as sharing. English + Arabic.
   Supports her school quiz on multiplication, division and fact families. */
(function () {
  const EM = ['🍎', '🍓', '⭐', '🐟', '🧁', '🌸', '🍪', '🚗', '🦋', '🍩'];
  const em = () => EM[Math.floor(Math.random() * EM.length)];
  const GRP = (g, n, e) => `<div class="grps2">${Array.from({ length: g }, () => `<div class="plate">${e.repeat(n)}</div>`).join('')}</div>`;
  const near = (p, xs) => [...new Set([p, ...xs.filter(x => x > 0 && x !== p)])].slice(0, 4).map(String);
  const combos = []; for (let r = 2; r <= 6; r++) for (let c = 2; c <= 6; c++) combos.push([r, c]);

  const howMany = combos.map(([r, c]) => {
    const e = em(), p = r * c, adds = Array(r).fill(c).join(' + ');
    return { q: 'How many in all?', qAr: 'كم العدد كله؟', pic: ARR(r, c, e), opts: near(p, [r + c, p + c, p - c, p + 1]), ans: String(p),
      why: `${r} rows with ${c} in each row: ${adds} = <b>${p}</b>. So <b>${r} × ${c} = ${p}</b>.`,
      whyAr: `${r} صفوف، في كل صف ${c}: ${adds} = <b>${p}</b>. إذن <b>${r} × ${c} = ${p}</b>.`,
      hint: `Count one row. Then count by that number for each row.`, hintAr: 'عدّي صفاً واحداً، ثم عدّي بالقفز بهذا العدد لكل صف.' };
  });
  const whichSentence = combos.filter(([g, n]) => g !== n).map(([g, n]) => {
    const e = em();
    return { q: 'Which number sentence matches the picture?', qAr: 'أي جملة عددية تناسب الصورة؟', pic: GRP(g, n, e),
      opts: [`${g} × ${n}`, `${g} + ${n}`, `${n} − ${g > n ? 1 : g}`, `${g} × ${g}`].filter((x, k, a) => a.indexOf(x) === k), ans: `${g} × ${n}`,
      why: `There are <b>${g}</b> groups and <b>${n}</b> in each group. Equal groups means multiply: <b>${g} × ${n} = ${g * n}</b>.`,
      whyAr: `يوجد <b>${g}</b> مجموعات، وفي كل مجموعة <b>${n}</b>. المجموعات المتساوية تعني الضرب: <b>${g} × ${n} = ${g * n}</b>.`,
      hint: 'Count the plates (groups). Then count what is on ONE plate.', hintAr: 'عدّي الأطباق (المجموعات)، ثم عدّي ما في طبق واحد.' };
  });
  const repeated = combos.map(([g, n]) => ({
    s: `${Array(g).fill(n).join(' + ')} is the same as ___ × ${n}`, ans: String(g),
    sAr: `جمع العدد ${n} عدد ${g} مرات هو نفسه ___ × ${n}`,
    why: `We added <b>${n}</b> again and again, <b>${g}</b> times. So it is <b>${g} × ${n}</b>.`,
    whyAr: `جمعنا العدد <b>${n}</b> مرة بعد مرة، <b>${g}</b> مرات. إذن هي <b>${g} × ${n}</b>.`,
  }));
  const share = combos.map(([g, n]) => {
    const e = em(), t = g * n;
    return { q: `${t} ${e} are shared equally by ${g} friends. How many does each friend get?`, qAr: `${t} قطعة توزّع بالتساوي على ${g} أصدقاء. كم يأخذ كل صديق؟`,
      pic: GRP(g, n, e), opts: near(n, [n + 1, n - 1, t - g, g]), ans: String(n),
      why: `Share them one by one into ${g} plates. Each plate gets <b>${n}</b>. So <b>${t} ÷ ${g} = ${n}</b>, because ${g} × ${n} = ${t}.`,
      whyAr: `نوزّعها واحدة واحدة على ${g} أطباق، فيصبح في كل طبق <b>${n}</b>. إذن <b>${t} ÷ ${g} = ${n}</b>، لأن ${g} × ${n} = ${t}.`,
      hint: 'Look at the picture: count what is on ONE plate.', hintAr: 'انظري إلى الصورة: عدّي ما في طبق واحد.' };
  });
  const facts = []; for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) if (a <= b) facts.push([`${a} × ${b}`, String(a * b)]);
  const uniqFacts = Object.values(Object.fromEntries(facts.map(f => [f[1], f])));

  addLesson({
    id: 'times-groups', island: 'times', added: '2026-11-03', pic: '🍉',
    title: 'Multiplication with Pictures', sub: 'Equal groups, arrays and sharing',
    learn: [
      { title: 'Multiplication means equal groups', titleAr: 'الضرب يعني مجموعات متساوية',
        text: '3 plates with 4 apples on each plate. That is <b>3 groups of 4</b>.', textAr: '٣ أطباق، في كل طبق ٤ تفاحات. هذه <b>٣ مجموعات من ٤</b>.',
        show: { kind: 'groups', g: 3, n: 4, e: '🍎' } },
      { title: 'It is fast adding', titleAr: 'الضرب هو جمع سريع',
        text: 'Instead of 4 + 4 + 4, we say <b>3 × 4</b>. Both make 12!', textAr: 'بدلاً من ٤ + ٤ + ٤ نقول <b>٣ × ٤</b>. والاثنان يساويان ١٢!',
        show: { kind: 'html', html: '<p class="eqn pop">4 + 4 + 4 = 12</p><p class="eqn pop" style="animation-delay:.8s">⬇</p><p class="eqn pop" style="animation-delay:1.4s">3 × 4 = <b>12</b></p>' } },
      { title: 'Arrays: rows and columns', titleAr: 'المصفوفة: صفوف وأعمدة',
        text: 'Put things in rows. <b>3 rows</b> with <b>5 in each row</b> is 3 × 5.', textAr: 'نرتّب الأشياء في صفوف. <b>٣ صفوف</b> في كل صف <b>٥</b> تساوي ٣ × ٥.',
        show: { kind: 'array', r: 3, c: 5, e: '⭐' } },
      { title: 'Turn it around, same answer', titleAr: 'اقلبيها، والجواب نفسه',
        text: '2 × 5 and 5 × 2 both make 10. You can swap the numbers!', textAr: '٢ × ٥ و ٥ × ٢ كلاهما يساوي ١٠. يمكنكِ تبديل الرقمين!',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:28px"><div class="pop">${ARR(2, 5, '🍓')}<p class="eqn">2 × 5 = <b>10</b></p></div><div class="pop" style="animation-delay:.9s">${ARR(5, 2, '🍓')}<p class="eqn">5 × 2 = <b>10</b></p></div></div>` } },
      { title: 'Division means sharing', titleAr: 'القسمة تعني التوزيع بالتساوي',
        text: '12 cookies shared by 3 friends: each friend gets 4. <b>12 ÷ 3 = 4</b>, because 3 × 4 = 12.', textAr: '١٢ كعكة نوزّعها على ٣ أصدقاء: كل صديق يأخذ ٤. <b>١٢ ÷ ٣ = ٤</b>، لأن ٣ × ٤ = ١٢.',
        show: { kind: 'groups', g: 3, n: 4, e: '🍪' } },
    ],
    acts: [
      { type: 'mc', title: 'How many in all?', pick: 6, start: 'Count the rows, then count in each row!', startAr: 'عدّي الصفوف، ثم عدّي ما في كل صف!', items: howMany },
      { type: 'mc', title: 'Match the picture', pick: 5, start: 'How many groups? How many in each group?', startAr: 'كم مجموعة؟ وكم في كل مجموعة؟', items: whichSentence },
      { type: 'fill', title: 'Adding to times', pick: 5, start: 'Count how many times the number is added!', startAr: 'عدّي كم مرة جمعنا العدد!',
        bank: ['2', '3', '4', '5', '6'], choices: 4, items: repeated,
        hint: 'Count how many numbers are being added together.', hintAr: 'عدّي كم عدداً نجمع.' },
      { type: 'mc', title: 'Share it out', pick: 5, start: 'Sharing equally is division!', startAr: 'التوزيع بالتساوي هو القسمة!', items: share },
      { type: 'match', title: 'Times facts', pick: 5, big: true, pairs: uniqFacts,
        ask: 'Tap a fact, then tap its answer.', askAr: 'اضغطي على العملية، ثم على ناتجها.', start: 'Match each fact to its answer!', startAr: 'صِلي كل عملية بناتجها!',
        why: p => `<b>${p[0]} = ${p[1]}</b>`, whyAr: p => `<b>${p[0]} = ${p[1]}</b>`,
        hint: p => `Try counting by the second number in <b>${p[0]}</b>.`, hintAr: p => `جرّبي العدّ بالقفز بالرقم الثاني في <b>${p[0]}</b>.`,
        sayL: p => p[0], sayR: p => p[1] },
    ],
  });
})();
