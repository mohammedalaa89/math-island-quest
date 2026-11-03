/* enVision Mathematics Grade 3, Topic 14: Solve time, capacity and mass problems (Common Core 3.MD.1, 3.MD.2).
   Telling time to the nearest minute, elapsed time, liters, grams and kilograms. Our own explanations and questions. English + Arabic. */
(function () {
  const R = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const ANY = a => a[Math.floor(Math.random() * a.length)];
  const SOPTS = (ans, wrongs) => { const out = [ans]; for (const w of wrongs) if (out.length < 4 && w && !out.includes(w)) out.push(w); return out; };
  const pad = m => String(m).padStart(2, '0');
  const hr = t => (Math.floor(t / 60) % 12) || 12;
  const T = t => `${hr(t)}:${pad(t % 60)}`;  /* t = minutes after midnight */
  const INK = '#1E2A44';

  /* a clock face; anim = hands sweep into place */
  function CLOCK(h, m, o) {
    o = o || {}; const c = 60; let p = `<circle cx="60" cy="60" r="56" fill="#fff" stroke="${o.rim || '#2E9BF0'}" stroke-width="5"/>`;
    for (let i = 0; i < 60; i++) {
      const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 45 : 49;
      p += `<line x1="${(c + r1 * Math.sin(a)).toFixed(1)}" y1="${(c - r1 * Math.cos(a)).toFixed(1)}" x2="${(c + 52 * Math.sin(a)).toFixed(1)}" y2="${(c - 52 * Math.cos(a)).toFixed(1)}" stroke="${INK}" stroke-width="${big ? 2.2 : 1}"/>`;
    }
    for (let n = 1; n <= 12; n++) { const a = n * 30 * Math.PI / 180; p += `<text x="${(c + 37 * Math.sin(a)).toFixed(1)}" y="${(c - 37 * Math.cos(a) + 5).toFixed(1)}" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="13" fill="${INK}">${n}</text>`; }
    const ha = (h % 12) * 30 + m * .5, ma = m * 6;
    const hand = (ang, len, w, col, from) => `<line x1="60" y1="60" x2="60" y2="${60 - len}" stroke="${col}" stroke-width="${w}" stroke-linecap="round" transform="rotate(${ang} 60 60)">${o.anim ? `<animateTransform attributeName="transform" type="rotate" from="${from} 60 60" to="${ang} 60 60" dur="2.2s" begin=".3s" fill="freeze"/>` : ''}</line>`;
    p += hand(ha, 27, 5.5, '#F0466B', o.anim ? ha - 30 : 0) + hand(ma, 43, 3.5, INK, o.anim ? ma - 360 : 0) + '<circle cx="60" cy="60" r="4" fill="#1E2A44"/>';
    return `<svg viewBox="0 0 120 120" width="${o.size || 150}" style="max-width:100%;height:auto" role="img" aria-label="clock">${p}</svg>`;
  }
  const dur = d => d < 60 ? `${d} minutes` : `${Math.floor(d / 60)} hour${d >= 120 ? 's' : ''}${d % 60 ? ` ${d % 60} minutes` : ''}`;
  const durAr = d => d < 60 ? `${d} دقيقة` : `${d >= 120 ? Math.floor(d / 60) + ' ساعات' : 'ساعة واحدة'}${d % 60 ? ` و${d % 60} دقيقة` : ''}`;
  /* the jumps from start to end, written out */
  function jumps(s, d) {
    const en = [], ar = []; let t = s;
    if (d >= 60) { const H = Math.floor(d / 60); en.push(`${T(t)} + ${H} hour${H > 1 ? 's' : ''} → ${T(t + H * 60)}`); ar.push(`${T(t)} + ${H} ساعة ← ${T(t + H * 60)}`); t += H * 60; }
    const rem = d % 60;
    if (rem) {
      const toHour = 60 - t % 60;
      if (t % 60 && rem > toHour) { en.push(`${T(t)} → ${T(t + toHour)} is ${toHour} minutes`, `${T(t + toHour)} → ${T(s + d)} is ${rem - toHour} minutes`); ar.push(`من ${T(t)} إلى ${T(t + toHour)}: ${toHour} دقيقة`, `من ${T(t + toHour)} إلى ${T(s + d)}: ${rem - toHour} دقيقة`); }
      else { en.push(`${T(t)} → ${T(s + d)} is ${rem} minutes`); ar.push(`من ${T(t)} إلى ${T(s + d)}: ${rem} دقيقة`); }
    }
    return [en.join('<br>'), ar.join('<br>')];
  }

  /* quiz 1: what time is it? */
  const clocks = []; const seen = new Set();
  while (clocks.length < 48) {
    const h = R(1, 12), m = clocks.length % 3 === 0 ? R(0, 11) * 5 : R(0, 59), key = h + ':' + m; if (seen.has(key)) continue; seen.add(key);
    const f = (H, M) => `${((H - 1 + 12) % 12) + 1}:${pad((M + 60) % 60)}`, fives = Math.floor(m / 5) * 5, ones = m % 5;
    clocks.push({ q: 'What time is it?', qAr: 'كم الساعة؟', pic: CLOCK(h, m),
      opts: SOPTS(f(h, m), [f(m >= 30 ? h + 1 : h - 1, m), f(Math.floor(m / 5) || 12, h * 5), f(h, m + 5), f(h, m - 5), f(h, m + 1)]), ans: f(h, m),
      why: `The short red hand is ${m ? `just past the <b>${h}</b>` : `on the <b>${h}</b>`}, so the hour is ${h}. The long hand: count by 5s to <b>${fives}</b>${ones ? `, then ${ones} more little mark${ones > 1 ? 's' : ''} = <b>${m}</b>` : ''} minutes. It is <b>${f(h, m)}</b>.`,
      whyAr: `العقرب القصير الأحمر ${m ? `تجاوز العدد <b>${h}</b> قليلاً` : `على العدد <b>${h}</b>`}، إذن الساعة ${h}. العقرب الطويل: نعدّ بالخمسات حتى <b>${fives}</b>${ones ? `، ثم ${ones} ${ones > 1 ? 'علامات صغيرة' : 'علامة صغيرة'} = <b>${m}</b>` : ''} دقيقة. الوقت <b>${f(h, m)}</b>.`,
      hint: 'Short hand = hour (the number it has just passed). Long hand = minutes: count by 5s, then the little marks.', hintAr: 'العقرب القصير = الساعة (آخر عدد تجاوزه). العقرب الطويل = الدقائق: عدّي بالخمسات، ثم العلامات الصغيرة.' });
  }

  /* quiz 2: elapsed time */
  const NAMES = [['Noura', 'نورة'], ['Reem', 'ريم'], ['Lulu', 'لولو'], ['Huda', 'هدى'], ['Sara', 'سارة']];
  const ACTS = [['🏊', 'swimming class', 'درس السباحة'], ['🎂', 'the party', 'الحفلة'], ['⚽', 'the football game', 'مباراة كرة القدم'], ['🎬', 'the movie', 'الفيلم'], ['📚', 'homework', 'الواجب'], ['🧑‍🍳', 'baking cookies', 'خَبز الكعك']];
  const elapsed = [];
  for (let k = 0; k < 44; k++) {
    const s = R(8 * 12, 16 * 12) * 5 + (k % 3 === 0 ? R(1, 4) : 0), d = ANY([15, 20, 25, 35, 40, 45, 50, 55, 70, 85, 95, 105, 30 + R(1, 9), 60 + R(1, 50)]), e = s + d;
    const [pic, act, actAr] = ANY(ACTS), [w, wA] = jumps(s, d);
    if (k % 2 === 0) {
      elapsed.push({ q: `${act[0].toUpperCase() + act.slice(1)} starts at ${T(s)} and ends at ${T(e)}. How long is it?`, qAr: `يبدأ ${actAr} الساعة ${T(s)} وينتهي الساعة ${T(e)}. كم يستغرق؟`,
        pic: `<div class="row" style="justify-content:center;gap:10px">${CLOCK(hr(s), s % 60, { size: 110 })}<b style="font-size:1.6rem">➜</b>${CLOCK(hr(e), e % 60, { size: 110, rim: '#22B566' })}</div>`,
        opts: SOPTS(dur(d), [dur(d + 10), dur(Math.abs(d - 10) || 5), dur(d + 60 > 170 ? d - 5 : d + 60), dur(d + 5)]), ans: dur(d),
        why: `Jump from start to end:<br>${w}<br>Total: <b>${dur(d)}</b>.`, whyAr: `نقفز من البداية إلى النهاية:<br>${wA}<br>المجموع: <b>${durAr(d)}</b>.`,
        hint: 'Jump to the next whole hour first, then count the minutes that are left.', hintAr: 'اقفزي إلى الساعة الكاملة التالية أولاً، ثم عدّي الدقائق الباقية.' });
    } else {
      const [n, nA] = ANY(NAMES);
      elapsed.push({ q: `${n} starts ${act} at ${T(s)}. It takes ${dur(d)}. What time does she finish?`, qAr: `بدأت ${nA} ${actAr} الساعة ${T(s)}، ويستغرق ${durAr(d)}. متى تنتهي؟`, pic,
        opts: SOPTS(T(e), [T(e + 10), T(e - 10), T(e + 60), T(s + (d % 60)), T(e - 60)].filter(x => x !== T(s))), ans: T(e),
        why: `Start at ${T(s)} and jump forward ${dur(d)}:<br>${w}<br>She finishes at <b>${T(e)}</b>.`, whyAr: `نبدأ من ${T(s)} ونقفز إلى الأمام ${durAr(d)}:<br>${wA}<br>تنتهي الساعة <b>${T(e)}</b>.`,
        hint: 'Add the hours first, then the minutes. Remember: 60 minutes make 1 hour.', hintAr: 'أضيفي الساعات أولاً، ثم الدقائق. تذكّري: 60 دقيقة = ساعة واحدة.' });
    }
  }

  /* quiz 3: liters, grams, kilograms */
  const units = [];
  const U = { L: ['liters', 'لترات (liters)'], g: ['grams', 'غرامات (grams)'], kg: ['kilograms', 'كيلوغرامات (kilograms)'] };
  [['🛁', 'how much water a bathtub holds', 'كمية الماء في حوض الاستحمام', 'L'], ['🪣', 'how much water a bucket holds', 'كمية الماء في الدلو', 'L'], ['🫖', 'how much tea a teapot holds', 'كمية الشاي في إبريق الشاي', 'L'],
    ['🐟', 'how much water a fish tank holds', 'كمية الماء في حوض السمك', 'L'], ['⛽', 'how much fuel a car holds', 'كمية الوقود في السيارة', 'L'],
    ['🍓', 'the mass of a strawberry', 'كتلة حبة فراولة', 'g'], ['📎', 'the mass of a paper clip', 'كتلة مشبك ورق', 'g'], ['✏️', 'the mass of a pencil', 'كتلة قلم رصاص', 'g'], ['🔑', 'the mass of a key', 'كتلة مفتاح', 'g'], ['🥚', 'the mass of an egg', 'كتلة بيضة', 'g'],
    ['🍉', 'the mass of a watermelon', 'كتلة بطيخة', 'kg'], ['🐕', 'the mass of a dog', 'كتلة كلب', 'kg'], ['🚲', 'the mass of a bicycle', 'كتلة دراجة', 'kg'], ['🧒', 'the mass of a child', 'كتلة طفل', 'kg'], ['🍚', 'the mass of a big bag of rice', 'كتلة كيس أرز كبير', 'kg']]
    .forEach(([pic, en, ar, u]) => units.push({ q: `Which unit would you use for ${en}?`, qAr: `أي وحدة تستخدمين لقياس ${ar}؟`, pic, opts: ['liters', 'grams', 'kilograms'], keep: true, ans: U[u][0],
      why: u === 'L' ? `This is about how much liquid fits inside (capacity), so we use <b>liters</b>.` : u === 'g' ? `It is light and small, so we measure its mass in <b>grams</b>. A paper clip is about 1 gram.` : `It is heavy, so we measure its mass in <b>kilograms</b>. 1 kilogram = 1,000 grams.`,
      whyAr: u === 'L' ? `السؤال عن كمية السائل التي تتّسع لها (السعة capacity)، إذن نستخدم <b>${U.L[1]}</b>.` : u === 'g' ? `إنه خفيف وصغير، إذن نقيس كتلته بـ<b>${U.g[1]}</b>. مشبك الورق تقريباً 1 غرام.` : `إنه ثقيل، إذن نقيس كتلته بـ<b>${U.kg[1]}</b>. 1 كيلوغرام = 1000 غرام.`,
      hint: 'Liquid inside → liters. Light thing → grams. Heavy thing → kilograms.', hintAr: 'سائل بالداخل ← لترات. شيء خفيف ← غرامات. شيء ثقيل ← كيلوغرامات.' }));
  for (let k = 0; k < 24; k++) {
    const kind = k % 4; let q, qAr, pic, ans, wr, why, whyAr;
    if (kind === 0) { const a = R(2, 9), n = R(2, 5); pic = '🫙'; ans = a * n; wr = [a + n, ans + a, ans - a];
      q = `One jug holds ${a} liters. How many liters do ${n} jugs hold?`; qAr = `يتّسع الإبريق الواحد لـ${a} لترات. كم لتراً تتّسع له ${n} أباريق؟`;
      why = `${n} equal jugs of ${a} liters: ${n} × ${a} = <b>${ans} liters</b>.`; whyAr = `${n} أباريق متساوية، كل واحد ${a} لترات: ${n} × ${a} = <b>${ans} لتراً</b>.`; }
    else if (kind === 1) { const a = R(12, 40), b = R(3, a - 4); pic = '🪣'; ans = a - b; wr = [a + b, ans + 1, ans - 2];
      q = `A tank has ${a} liters of water. We use ${b} liters. How many liters are left?`; qAr = `في الخزان ${a} لتراً من الماء. استخدمنا ${b} لترات. كم لتراً بقي؟`;
      why = `Water is used up, so subtract: ${a} − ${b} = <b>${ans} liters</b>.`; whyAr = `استُخدم الماء، إذن نطرح: ${a} − ${b} = <b>${ans} لتراً</b>.`; }
    else if (kind === 2) { const a = R(2, 15), b = R(2, 15); pic = '🧺'; ans = a + b; wr = [Math.abs(a - b), a * b, ans + 1];
      q = `A bag of apples has a mass of ${a} kilograms. A bag of oranges has a mass of ${b} kilograms. What is the total mass?`; qAr = `كتلة كيس التفاح ${a} كيلوغرامات، وكتلة كيس البرتقال ${b} كيلوغرامات. ما الكتلة الكلية؟`;
      why = `Total means put together: ${a} + ${b} = <b>${ans} kilograms</b>.`; whyAr = `الكلية تعني نجمعهما معاً: ${a} + ${b} = <b>${ans} كيلوغراماً</b>.`; }
    else { const g = R(2, 9) * 5, n = R(2, 6); pic = '⚖️'; ans = g * n; wr = [g + n, ans + g, ans - 5];
      q = `One toy car has a mass of ${g} grams. What is the mass of ${n} toy cars?`; qAr = `كتلة سيارة لعبة واحدة ${g} غراماً. ما كتلة ${n} سيارات لعبة؟`;
      why = `${n} equal masses of ${g} grams: ${n} × ${g} = <b>${ans} grams</b>.`; whyAr = `${n} كتل متساوية، كل واحدة ${g} غراماً: ${n} × ${g} = <b>${ans} غراماً</b>.`; }
    units.push({ q, qAr, pic, opts: SOPTS(String(ans), wr.filter(x => x > 0).map(String).concat([String(ans + 2), String(ans + 3)])), ans: String(ans), why, whyAr,
      hint: 'Is it joining, taking away, or equal groups? Then keep the same unit in your answer.', hintAr: 'هل نجمع، أم نطرح، أم مجموعات متساوية؟ واكتبي الجواب بنفس الوحدة.' });
  }

  /* quiz 4: sort light (grams) and heavy (kilograms) */
  const mass = [['📎 paper clip', 0], ['🍇 grape', 0], ['🍓 strawberry', 0], ['✏️ pencil', 0], ['🥄 spoon', 0], ['🔑 key', 0], ['🪙 coin', 0], ['🥚 egg', 0], ['🍬 sweet', 0], ['🪶 feather', 0],
    ['🍉 watermelon', 1], ['🐕 dog', 1], ['🚲 bicycle', 1], ['🧒 child', 1], ['📺 TV', 1], ['🎒 full school bag', 1], ['🛋️ sofa', 1], ['🍚 sack of rice', 1], ['🐐 goat', 1]];

  /* a little elapsed-time line for the slide */
  const ELINE = `<svg viewBox="0 0 330 100" width="330" style="max-width:100%;height:auto" role="img" aria-label="elapsed time 2:15 to 3:40">
    <line x1="20" y1="70" x2="310" y2="70" stroke="${INK}" stroke-width="3"/>
    ${[[20, '2:15'], [210, '3:15'], [300, '3:40']].map(([x, l]) => `<line x1="${x}" y1="60" x2="${x}" y2="80" stroke="${INK}" stroke-width="2.5"/><text x="${x}" y="96" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="14" fill="${INK}">${l}</text>`).join('')}
    <path d="M20 64 Q115 0 210 64" fill="none" stroke="#FF8A3D" stroke-width="4" stroke-dasharray="230" stroke-dashoffset="230"><animate attributeName="stroke-dashoffset" from="230" to="0" begin=".5s" dur=".8s" fill="freeze"/></path>
    <text x="115" y="22" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="14" fill="#C9601F" opacity="0">+1 hour<animate attributeName="opacity" from="0" to="1" begin="1.2s" dur=".3s" fill="freeze"/></text>
    <path d="M210 64 Q255 30 300 64" fill="none" stroke="#7C4DFF" stroke-width="4" stroke-dasharray="110" stroke-dashoffset="110"><animate attributeName="stroke-dashoffset" from="110" to="0" begin="1.8s" dur=".6s" fill="freeze"/></path>
    <text x="255" y="36" text-anchor="middle" font-family="Nunito,sans-serif" font-weight="800" font-size="14" fill="#5631C9" opacity="0">+25 min<animate attributeName="opacity" from="0" to="1" begin="2.4s" dur=".3s" fill="freeze"/></text></svg>`;

  addLesson({
    id: 'm-t14', island: 'm-t14', added: '2026-11-03', pic: '⏰',
    title: 'Time, Liters and Grams', sub: 'Clocks to the minute, how long, capacity and mass',
    learn: [
      { title: 'The two hands', titleAr: 'العقربان',
        text: 'The <b>short</b> red hand shows the <b>hour</b>. The <b>long</b> hand shows the <b>minutes</b>. Each number is 5 minutes, and each little mark is 1 minute.',
        textAr: 'العقرب <b>القصير</b> الأحمر يشير إلى <b>الساعة</b>. والعقرب <b>الطويل</b> يشير إلى <b>الدقائق</b>. كل عدد يساوي 5 دقائق، وكل علامة صغيرة تساوي دقيقة واحدة.',
        show: { kind: 'html', html: CLOCK(3, 0, { anim: true, size: 180 }) + '<p class="eqn pop" style="animation-delay:2.6s"><b>3:00</b></p>' } },
      { title: 'To the nearest minute', titleAr: 'إلى أقرب دقيقة',
        text: 'The hour hand is past 4, so the hour is 4. Count the long hand by 5s: 5, 10, 15, 20, 25, 30, 35. Then 2 little marks: 36, 37. It is <b>4:37</b>.',
        textAr: 'عقرب الساعات تجاوز 4، إذن الساعة 4. نعدّ العقرب الطويل بالخمسات: 5، 10، 15، 20، 25، 30، 35. ثم علامتان صغيرتان: 36، 37. الوقت <b>4:37</b>.',
        show: { kind: 'html', html: CLOCK(4, 37, { anim: true, size: 180 }) + '<p class="eqn pop" style="animation-delay:2.6s"><b>4:37</b></p>' } },
      { title: 'How long? Elapsed time', titleAr: 'كم استغرق؟ الوقت المنقضي',
        text: 'A lesson starts at 2:15 and ends at 3:40. Jump 1 hour to 3:15, then 25 minutes to 3:40. It takes <b>1 hour 25 minutes</b>.',
        textAr: 'يبدأ الدرس الساعة 2:15 وينتهي الساعة 3:40. نقفز ساعة إلى 3:15، ثم 25 دقيقة إلى 3:40. استغرق <b>ساعة و25 دقيقة</b>.',
        show: { kind: 'html', html: ELINE } },
      { title: 'Liters measure liquid', titleAr: 'اللتر يقيس السوائل',
        text: '<b>Capacity</b> is how much liquid a container holds. We measure it in <b>liters</b>. A big water bottle holds about 1 liter. A bucket holds about 10 liters.',
        textAr: '<b>السعة (capacity)</b> هي كمية السائل التي يتّسع لها الوعاء. نقيسها <b>باللتر (liters)</b>. قارورة الماء الكبيرة تتّسع لحوالي 1 لتر. والدلو يتّسع لحوالي 10 لترات.',
        show: { kind: 'chips', items: [['🧴', '1 liter', 'about 1 liter'], ['🫖', '2 liters', 'about 2 liters'], ['🪣', '10 liters', 'about 10 liters'], ['🛁', '150 liters', 'about 150 liters']] } },
      { title: 'Grams and kilograms', titleAr: 'الغرام والكيلوغرام',
        text: '<b>Mass</b> is how heavy something is. Light things: <b>grams</b> (a paper clip is about 1 gram). Heavy things: <b>kilograms</b> (a big book is about 1 kilogram). 1 kilogram = 1,000 grams.',
        textAr: '<b>الكتلة (mass)</b> هي مدى ثقل الشيء. الأشياء الخفيفة: <b>غرام (grams)</b> (مشبك الورق تقريباً 1 غرام). الأشياء الثقيلة: <b>كيلوغرام (kilograms)</b> (الكتاب الكبير تقريباً 1 كيلوغرام). 1 كيلوغرام = 1000 غرام.',
        show: { kind: 'chips', items: [['📎', '1 gram', 'a paper clip is about 1 gram'], ['🍓', '15 grams', 'a strawberry is about 15 grams'], ['📘', '1 kilogram', 'a big book is about 1 kilogram'], ['🍉', '5 kilograms', 'a watermelon is about 5 kilograms']] } },
    ],
    acts: [
      { type: 'mc', title: 'Read the clock', pick: 6, start: 'Short hand for the hour, long hand for the minutes!', startAr: 'العقرب القصير للساعة، والطويل للدقائق!', items: clocks },
      { type: 'mc', title: 'How long?', pick: 5, start: 'Jump hours first, then minutes!', startAr: 'اقفزي بالساعات أولاً، ثم بالدقائق!', items: elapsed },
      { type: 'mc', title: 'Liters and grams', pick: 6, start: 'Liquid, light, or heavy? Then solve!', startAr: 'سائل، أم خفيف، أم ثقيل؟ ثم حلّي!', items: units },
      { type: 'sort', title: 'Grams or kilograms?', pick: 8, start: 'Is it light (grams) or heavy (kilograms)?', startAr: 'هل هو خفيف (غرامات) أم ثقيل (كيلوغرامات)؟',
        ask: 'Drag each thing into the right box. Or tap it, then tap a box.', askAr: 'اسحبي كل شيء إلى الصندوق الصحيح، أو اضغطي عليه ثم على الصندوق.',
        hint: 'Could you hold {w} easily on one finger? Then it is light.', hintAr: 'هل تستطيعين حمل {w} بسهولة على إصبع واحد؟ إذن هو خفيف.',
        buckets: [
          { label: 'grams (light)', labelAr: 'غرامات (خفيف)', pic: '🪶', why: '{w} is light, so we measure it in grams.', whyAr: '{w} خفيف، لذلك نقيسه بالغرامات.' },
          { label: 'kilograms (heavy)', labelAr: 'كيلوغرامات (ثقيل)', pic: '🏋️', why: '{w} is heavy, so we measure it in kilograms.', whyAr: '{w} ثقيل، لذلك نقيسه بالكيلوغرامات.' },
        ], items: mass },
    ],
  });
})();
