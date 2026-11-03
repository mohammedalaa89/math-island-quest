/* enVision Mathematics Grade 3, Topic 9: Fluently add and subtract within 1,000 (Common Core 3.NBT.2).
   Place value blocks, partial sums, regrouping, subtracting with trades. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  /* options: the answer once, then distinct wrong ones (no negatives) */
  const OPTS = (ans, wrongs) => {
    const out = [String(ans)];
    for (const w of wrongs.concat([ans + 10, ans - 10, ans + 1, ans + 100, ans - 1])) { const s = String(w); if (out.length < 4 && w >= 0 && !out.includes(s)) out.push(s); }
    return out;
  };
  const dig = n => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10];

  /* place-value blocks: hundreds = blue flats, tens = green rods, ones = orange cubes */
  function BLK(h, t, o, anim) {
    let x = 4, d = 0; const p = [];
    const pop = () => anim ? ` class="pop" style="animation-delay:${(d++) * .18}s;transform-origin:center;transform-box:fill-box"` : '';
    for (let i = 0; i < h; i++) {
      let g = ''; for (let k = 1; k < 10; k++) g += `M${x + k * 4} 4v40M${x} ${4 + k * 4}h40`;
      p.push(`<g${pop()}><rect x="${x}" y="4" width="40" height="40" fill="#2E9BF0" stroke="#1C6FB0" stroke-width="1.5"/><path d="${g}" stroke="#1C6FB0" stroke-width=".6"/></g>`); x += 44;
    }
    if (h) x += 4;
    for (let i = 0; i < t; i++) {
      let g = ''; for (let k = 1; k < 10; k++) g += `M${x} ${4 + k * 4}h6`;
      p.push(`<g${pop()}><rect x="${x}" y="4" width="6" height="40" fill="#22B566" stroke="#168048" stroke-width="1.2"/><path d="${g}" stroke="#168048" stroke-width=".6"/></g>`); x += 9;
    }
    if (t) x += 4;
    for (let i = 0; i < o; i++) {
      const cx = x + Math.floor(i / 5) * 9, cy = 38 - (i % 5) * 8;
      p.push(`<rect${pop()} x="${cx}" y="${cy}" width="6.5" height="6.5" fill="#FF8A3D" stroke="#C9601F" stroke-width="1.2"/>`);
    }
    if (o) x += Math.ceil(o / 5) * 9;
    const W = Math.max(x + 2, 20);
    return `<svg viewBox="0 0 ${W} 48" width="${Math.min(W * 2.4, 330)}" style="max-width:100%;height:auto" role="img" aria-label="${h} hundreds, ${t} tens, ${o} ones">${p.join('')}</svg>`;
  }
  /* a column sum: rows of 3 cells each; the answer pops in from the ones place */
  const cell = v => `<td style="width:1.3em">${v}</td>`;
  function COL(notes, top, bot, op, res) {
    return `<table style="font-family:var(--display);font-weight:700;font-size:2rem;border-collapse:collapse;margin:0 auto;text-align:center;line-height:1.25">
      <tr style="font-size:1rem;color:#F0466B">${cell('')}${notes.map(cell).join('')}</tr>
      <tr>${cell('')}${top.map(cell).join('')}</tr><tr>${cell(op)}${bot.map(cell).join('')}</tr>
      <tr style="border-top:3px solid #1E2A44">${cell('')}${res.map((v, k) => cell(`<span class="pop" style="display:inline-block;animation-delay:${.8 + (2 - k) * .8}s;color:var(--c)">${v}</span>`)).join('')}</tr></table>`;
  }
  const PV = ['hundreds', 'tens', 'ones'], PVA = ['المئات', 'العشرات', 'الآحاد'];

  function addWork(a, b) {
    const A = dig(a), B = dig(b), en = [], ar = []; let c = 0;
    for (let k = 2; k >= 0; k--) {
      const s = A[k] + B[k] + c, ex = `${c ? c + ' + ' : ''}${A[k]} + ${B[k]} = ${s}`; c = s >= 10 ? 1 : 0;
      en.push(`<b>${PV[k]}</b>: ${ex}${c ? ` → write ${s - 10}, regroup 1 to the ${PV[k - 1]}` : ''}`);
      ar.push(`<b>${PVA[k]} (${PV[k]})</b>: ${ex}${c ? ` ← نكتب ${s - 10} ونحمل 1 إلى ${PVA[k - 1]}` : ''}`);
    }
    return [en.join('<br>') + `<br>So ${a} + ${b} = <b>${a + b}</b>.`, ar.join('<br>') + `<br>إذن ${a} + ${b} = <b>${a + b}</b>.`];
  }
  function subWork(a, b) {
    let [h, t, o] = dig(a); const [bh, bt, bo] = dig(b), en = [], ar = [];
    if (o < bo) {
      if (t === 0) { h--; t = 10; en.push('There are 0 tens, so first trade 1 hundred for 10 tens.'); ar.push('لا توجد عشرات، فنفكّ 1 مئة إلى 10 عشرات أولاً.'); }
      t--; o += 10;
      en.push(`<b>ones</b>: ${o - 10} is less than ${bo}, so trade 1 ten for 10 ones. ${o} − ${bo} = ${o - bo}`);
      ar.push(`<b>الآحاد (ones)</b>: ${o - 10} أصغر من ${bo}، فنفكّ 1 عشرة إلى 10 آحاد. ${o} − ${bo} = ${o - bo}`);
    } else { en.push(`<b>ones</b>: ${o} − ${bo} = ${o - bo}`); ar.push(`<b>الآحاد (ones)</b>: ${o} − ${bo} = ${o - bo}`); }
    if (t < bt) {
      h--; t += 10;
      en.push(`<b>tens</b>: ${t - 10} is less than ${bt}, so trade 1 hundred for 10 tens. ${t} − ${bt} = ${t - bt}`);
      ar.push(`<b>العشرات (tens)</b>: ${t - 10} أصغر من ${bt}، فنفكّ 1 مئة إلى 10 عشرات. ${t} − ${bt} = ${t - bt}`);
    } else { en.push(`<b>tens</b>: ${t} − ${bt} = ${t - bt}`); ar.push(`<b>العشرات (tens)</b>: ${t} − ${bt} = ${t - bt}`); }
    en.push(`<b>hundreds</b>: ${h} − ${bh} = ${h - bh}`); ar.push(`<b>المئات (hundreds)</b>: ${h} − ${bh} = ${h - bh}`);
    return [en.join('<br>') + `<br>So ${a} − ${b} = <b>${a - b}</b>. Check: ${a - b} + ${b} = ${a} ✓`, ar.join('<br>') + `<br>إذن ${a} − ${b} = <b>${a - b}</b>. نتحقّق: ${a - b} + ${b} = ${a} ✓`];
  }

  /* quiz 1: read the blocks */
  const seen = new Set(), blocks = [];
  while (blocks.length < 40) {
    const h = R(1, 6), t = R(0, 9), o = R(0, 9), n = h * 100 + t * 10 + o; if (seen.has(n)) continue; seen.add(n);
    blocks.push({ q: 'What number do the blocks show?', qAr: 'ما العدد الذي تمثّله القطع؟', pic: BLK(h, t, o),
      opts: OPTS(n, [o * 100 + t * 10 + h, h * 100 + o * 10 + t, h + t + o, n + 100]), ans: String(n),
      why: `<b>${h}</b> hundreds = ${h * 100}, <b>${t}</b> tens = ${t * 10}, <b>${o}</b> ones = ${o}.<br>${h * 100} + ${t * 10} + ${o} = <b>${n}</b>.`,
      whyAr: `<b>${h}</b> مئات = ${h * 100}، و<b>${t}</b> عشرات = ${t * 10}، و<b>${o}</b> آحاد = ${o}.<br>${h * 100} + ${t * 10} + ${o} = <b>${n}</b>.`,
      hint: 'Count the big squares first (hundreds), then the sticks (tens), then the little cubes (ones).',
      hintAr: 'عدّي المربعات الكبيرة أولاً (المئات)، ثم الأعواد (العشرات)، ثم المكعبات الصغيرة (الآحاد).' });
  }

  /* quiz 2: add with regrouping */
  const adds = []; seen.clear();
  while (adds.length < 40) {
    const a = R(105, 689), b = R(105, 899 - a + 100); if (a + b > 999 || b < 100 || seen.has(a + '+' + b)) continue;
    if ((a % 10) + (b % 10) < 10 && (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) < 10) continue; /* make her regroup */
    seen.add(a + '+' + b);
    const s = a + b, A = dig(a), B = dig(b), noCarry = ((A[0] + B[0]) % 10) * 100 + ((A[1] + B[1]) % 10) * 10 + (A[2] + B[2]) % 10, [w, wA] = addWork(a, b);
    adds.push({ q: `${a} + ${b} = ?`, qAr: `${a} + ${b} = ؟`, opts: OPTS(s, [noCarry, s + 10, s - 10, s + 100]), ans: String(s), why: w, whyAr: wA,
      hint: 'Line up the places. Add the ones first. If you get 10 or more, regroup 10 ones as 1 ten.',
      hintAr: 'رتّبي الخانات تحت بعضها. اجمعي الآحاد أولاً. إذا كان الناتج 10 أو أكثر، حوّلي 10 آحاد إلى عشرة واحدة.' });
  }

  /* quiz 3: subtract with trades (some across a zero) */
  const subs = []; seen.clear();
  while (subs.length < 40) {
    let a = R(201, 999); if (subs.length % 4 === 0) a = R(2, 9) * 100 + R(1, 9); /* zero in the tens */
    const b = R(101, a - 20); if (seen.has(a + '-' + b)) continue;
    if (a % 10 >= b % 10 && Math.floor(a / 10) % 10 >= Math.floor(b / 10) % 10) continue; /* needs a trade */
    seen.add(a + '-' + b);
    const d = a - b, A = dig(a), B = dig(b), flip = Math.abs(A[0] - B[0]) * 100 + Math.abs(A[1] - B[1]) * 10 + Math.abs(A[2] - B[2]), [w, wA] = subWork(a, b);
    subs.push({ q: `${a} − ${b} = ?`, qAr: `${a} − ${b} = ؟`, opts: OPTS(d, [flip, d + 10, d - 10, d + 100]), ans: String(d), why: w, whyAr: wA,
      hint: 'Start with the ones. If the top digit is smaller, trade 1 from the next place to the left.',
      hintAr: 'ابدئي بالآحاد. إذا كان الرقم في الأعلى أصغر، فكّي 1 من الخانة التي على اليسار.' });
  }

  /* quiz 4: word problems (join or take away) */
  const NAMES = [['Noura', 'نورة'], ['Reem', 'ريم'], ['Lulu', 'لولو'], ['Huda', 'هدى'], ['Sara', 'سارة'], ['Lana', 'لانا']];
  const STORIES = [
    [1, '📚', (a, b) => `A library has ${a} books. It buys ${b} more. How many books does it have now?`, (a, b) => `في المكتبة ${a} كتاباً. اشترت ${b} كتاباً آخر. كم كتاباً فيها الآن؟`, 'More books join the library', 'كتب جديدة تنضمّ إلى المكتبة'],
    [1, '🎮', (a, b, n) => `${n[0]} scored ${a} points, then ${b} more points. How many points in all?`, (a, b, n) => `حصلت ${n[1]} على ${a} نقطة، ثم على ${b} نقطة أخرى. كم نقطة معها كلها؟`, 'The points are put together', 'نضع النقاط معاً'],
    [1, '🐔', (a, b) => `A farm has ${a} chickens and ${b} ducks. How many birds are there in all?`, (a, b) => `في المزرعة ${a} دجاجة و${b} بطة. كم طائراً فيها كلها؟`, 'Chickens and ducks are put together', 'نجمع الدجاج والبط معاً'],
    [1, '🚌', (a, b) => `${a} people rode the train in the morning and ${b} in the evening. How many people rode it that day?`, (a, b) => `ركب القطار ${a} شخصاً في الصباح و${b} في المساء. كم شخصاً ركبه في ذلك اليوم؟`, 'Morning and evening riders are put together', 'نجمع ركّاب الصباح والمساء'],
    [0, '🎈', (a, b) => `A shop had ${a} balloons. It sold ${b}. How many balloons are left?`, (a, b) => `كان في المحل ${a} بالوناً. باع ${b}. كم بالوناً بقي؟`, 'Balloons are taken away (sold)', 'بالونات تُؤخذ (بِيعت)'],
    [0, '🏫', (a, b) => `A school has ${a} students. ${b} go on a trip. How many stay at school?`, (a, b) => `في المدرسة ${a} طالبة. ذهبت ${b} في رحلة. كم طالبة بقيت في المدرسة؟`, 'Students leave, so the group gets smaller', 'طالبات يذهبن، فتصغر المجموعة'],
    [0, '✈️', (a, b) => `A plane has ${a} seats. ${b} seats are full. How many seats are empty?`, (a, b) => `في الطائرة ${a} مقعداً. ${b} مقعداً مشغولة. كم مقعداً فارغاً؟`, 'We take the full seats away from all the seats', 'نطرح المقاعد المشغولة من كل المقاعد'],
    [0, '🌴', (a, b, n) => `${n[0]} picked ${a} dates. She gave ${b} to her neighbours. How many dates does she have now?`, (a, b, n) => `قطفت ${n[1]} ${a} تمرة، وأعطت جيرانها ${b} تمرة. كم تمرة بقي معها؟`, 'Dates are given away', 'تمرات تُعطى للجيران'],
  ];
  const words = [];
  for (let k = 0; k < 48; k++) {
    const [isAdd, pic, en, ar, whyE, whyA] = STORIES[k % STORIES.length], n = ANY(NAMES);
    const a = isAdd ? R(120, 560) : R(300, 950), b = isAdd ? R(110, 990 - a) : R(105, a - 50), ans = isAdd ? a + b : a - b, other = isAdd ? a - b : a + b;
    words.push({ q: en(a, b, n), qAr: ar(a, b, n), pic, opts: OPTS(ans, [other, ans + 10, ans - 100]), ans: String(ans),
      why: `${whyE}, so we <b>${isAdd ? 'add' : 'subtract'}</b>: ${a} ${isAdd ? '+' : '−'} ${b} = <b>${ans}</b>.`,
      whyAr: `${whyA}، لذلك <b>${isAdd ? 'نجمع (add)' : 'نطرح (subtract)'}</b>: ${a} ${isAdd ? '+' : '−'} ${b} = <b>${ans}</b>.`,
      hint: 'Do things join together (add), or are some taken away (subtract)?', hintAr: 'هل تجتمع الأشياء معاً (نجمع)، أم يُؤخذ بعضها (نطرح)؟' });
  }

  addLesson({
    id: 'm-t9', island: 'm-t9', added: '2026-11-03', pic: '➕',
    title: 'Add and Subtract within 1,000', sub: 'Hundreds, tens and ones, regrouping and trading',
    learn: [
      { title: 'Hundreds, tens and ones', titleAr: 'المئات والعشرات والآحاد',
        text: 'A big square is <b>100</b>. A stick is <b>10</b>. A little cube is <b>1</b>. 2 hundreds, 4 tens and 6 ones make <b>246</b>.',
        textAr: 'المربع الكبير يساوي <b>100</b>. العود يساوي <b>10</b>. المكعب الصغير يساوي <b>1</b>. مئتان و4 عشرات و6 آحاد تساوي <b>246</b>.',
        show: { kind: 'html', html: `${BLK(2, 4, 6, true)}<p class="eqn pop" style="animation-delay:2.4s"><span style="color:#2E9BF0">200</span> + <span style="color:#22B566">40</span> + <span style="color:#FF8A3D">6</span> = <b>246</b></p>` } },
      { title: 'Add place by place', titleAr: 'نجمع كل خانة وحدها',
        text: 'To add 246 + 138, add the hundreds, the tens and the ones. Then put them together. These are called <b>partial sums</b>.',
        textAr: 'لنجمع 246 + 138، نجمع المئات، ثم العشرات، ثم الآحاد، ثم نضعها معاً. هذه تُسمّى <b>المجاميع الجزئية (partial sums)</b>.',
        show: { kind: 'html', html: `<p class="eqn pop"><span style="color:#2E9BF0">200 + 100 = 300</span></p><p class="eqn pop" style="animation-delay:.8s"><span style="color:#22B566">40 + 30 = 70</span></p><p class="eqn pop" style="animation-delay:1.6s"><span style="color:#FF8A3D">6 + 8 = 14</span></p><p class="eqn pop" style="animation-delay:2.6s">300 + 70 + 14 = <b>384</b></p>` } },
      { title: 'Regroup: 10 ones make 1 ten', titleAr: 'إعادة التجميع: 10 آحاد تصبح عشرة واحدة',
        text: '6 ones + 8 ones = 14 ones. That is too many for the ones place! Swap <b>10 ones</b> for <b>1 ten</b>. Write 4 and carry the 1.',
        textAr: '6 آحاد + 8 آحاد = 14 آحاد. هذا كثير على خانة الآحاد! نبدّل <b>10 آحاد</b> بـ<b>عشرة واحدة</b>. نكتب 4 ونحمل 1 إلى العشرات.',
        show: { kind: 'html', html: `<div class="row" style="justify-content:center;gap:14px"><div class="pop">${BLK(0, 0, 14)}</div><b class="pop eqn" style="animation-delay:.8s">➜</b><div class="pop" style="animation-delay:1.3s">${BLK(0, 1, 4)}</div></div>${COL(['1', '1', ''], [2, 4, 6], [1, 3, 8], '+', [3, 8, 4])}` } },
      { title: 'Subtract: trade when you need to', titleAr: 'الطرح: نفكّ عندما نحتاج',
        text: '352 − 127. We cannot take 7 from 2, so trade 1 ten for 10 ones: now there are 4 tens and 12 ones. 12 − 7 = 5, 4 − 2 = 2, 3 − 1 = 2.',
        textAr: '352 − 127. لا نستطيع أن نطرح 7 من 2، فنفكّ عشرة واحدة إلى 10 آحاد: يصبح عندنا 4 عشرات و12 آحاداً. 12 − 7 = 5، و4 − 2 = 2، و3 − 1 = 2.',
        show: { kind: 'html', html: COL(['', '4', '12'], [3, '<s style="color:#9AA8C2">5</s>', '<s style="color:#9AA8C2">2</s>'], [1, 2, 7], '−', [2, 2, 5]) } },
      { title: 'Check with adding', titleAr: 'نتحقّق بالجمع',
        text: 'Adding is the opposite of subtracting. 352 − 127 = 225, so 225 + 127 must make 352. It does! ✓',
        textAr: 'الجمع عكس الطرح. 352 − 127 = 225، إذن 225 + 127 يجب أن يساوي 352. وهذا صحيح! ✓',
        show: { kind: 'html', html: `<p class="eqn pop">352 − 127 = <b>225</b></p><p class="eqn pop" style="animation-delay:1s">🔁</p><p class="eqn pop" style="animation-delay:1.8s">225 + 127 = <b>352</b> ✓</p>` } },
    ],
    acts: [
      { type: 'mc', title: 'Read the blocks', pick: 6, start: 'Hundreds, tens, ones: count each kind of block!', startAr: 'المئات، العشرات، الآحاد: عدّي كل نوع من القطع!', items: blocks },
      { type: 'mc', title: 'Add and regroup', pick: 6, big: true, start: 'Add the ones first. Do you need to regroup?', startAr: 'اجمعي الآحاد أولاً. هل تحتاجين إلى إعادة التجميع؟', items: adds },
      { type: 'mc', title: 'Subtract and trade', pick: 6, big: true, start: 'Start with the ones. Trade if the top is smaller!', startAr: 'ابدئي بالآحاد. فكّي إذا كان الرقم في الأعلى أصغر!', items: subs },
      { type: 'mc', title: 'Story problems', pick: 5, start: 'Join together, or take away? Read carefully!', startAr: 'هل نجمع أم نطرح؟ اقرئي جيداً!', items: words },
    ],
  });
})();
