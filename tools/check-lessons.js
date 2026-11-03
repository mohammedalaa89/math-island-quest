/* Sanity-check lesson files without a browser:  node tools/check-lessons.js lessons/a.js lessons/b.js
   Catches answers missing from options, pools smaller than `pick`, bad bucket numbers, missing Arabic, etc. */
const fs = require('fs'), vm = require('vm');
const LESSONS = [];
const ctx = {
  addLesson: l => LESSONS.push(l), addTest: () => {}, console,
  linesSVG: c => `<svg>${c.join('')}</svg>`, ARR: (r, c, e) => `<div class="arr">${(e || 'x').repeat(r * c)}</div>`,
  LES: id => LESSONS.find(l => l.id === id),
};
vm.createContext(ctx);
let bad = 0;
const err = (l, m) => { bad++; console.log(`✖ ${l}: ${m}`); };
for (const f of process.argv.slice(2)) {
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); } catch (e) { err(f, 'does not run: ' + e.message); }
}
const SHOWS = 'scene html chips morph pairs capfix twins lines forms abc groups array patterns magic samesound flashgrid book tent split read'.split(' ');
const ar = /[؀-ۿ]/;
for (const l of LESSONS) {
  const n = l.id;
  for (const k of ['id', 'island', 'added', 'pic', 'title', 'sub', 'learn', 'acts']) if (!l[k]) err(n, `missing ${k}`);
  (l.learn || []).forEach((s, i) => {
    if (!s.show || !SHOWS.includes(s.show.kind)) err(n, `learn ${i}: unknown show kind ${s.show && s.show.kind}`);
    if (l.lang !== 'ar' && (!s.titleAr || !s.textAr)) err(n, `learn ${i}: needs titleAr and textAr`);
    if (s.show && s.show.kind === 'read' && !(s.show.lines || []).length) err(n, `learn ${i}: read needs lines`);
  });
  (l.acts || []).forEach((a, i) => {
    const where = `${n} quiz ${i} (${a.type})`;
    if (!a.title) err(where, 'missing title');
    if (a.type === 'mc') {
      if (!a.items || a.items.length < (a.pick || 1)) err(where, `pool ${a.items && a.items.length} smaller than pick ${a.pick}`);
      (a.items || []).forEach((it, j) => {
        if (!it.opts || !it.opts.map(String).includes(String(it.ans))) err(where, `item ${j}: answer "${it.ans}" not in options`);
        if (new Set(it.opts.map(String)).size !== it.opts.length) err(where, `item ${j}: duplicate options ${it.opts}`);
        if (!it.why) err(where, `item ${j}: missing why`);
        if (l.lang !== 'ar' && !it.whyAr) err(where, `item ${j}: missing whyAr`);
        if (l.lang === 'ar' && !ar.test(it.q)) err(where, `item ${j}: Arabic lesson question not in Arabic`);
      });
    } else if (a.type === 'sort') {
      if (!a.fromPatterns) {
        if (!a.items || a.items.length < (a.pick || 1)) err(where, 'pool smaller than pick');
        (a.items || []).forEach((x, j) => { if (!(x[1] >= 0 && x[1] < a.buckets.length)) err(where, `item ${j} bad bucket ${x[1]}`); });
        if (l.lang !== 'ar') a.buckets.forEach((b, j) => { if (!b.whyAr || !b.labelAr) err(where, `bucket ${j} needs labelAr and whyAr`); });
      }
    } else if (a.type === 'fill') {
      if (!a.items || a.items.length < (a.pick || 1)) err(where, 'pool smaller than pick');
      (a.items || []).forEach((it, j) => {
        if ((it.s.match(/___/g) || []).length !== 1) err(where, `item ${j}: sentence needs exactly one ___`);
        const bank = it.bank || a.bank; if (!bank || !bank.map(String).includes(String(it.ans))) err(where, `item ${j}: answer "${it.ans}" not in bank`);
        if (bank && bank.length < 2) err(where, `item ${j}: bank too small`);
      });
    } else if (a.type === 'match') {
      if (!a.pairs || a.pairs.length < (a.pick || 4)) err(where, 'fewer pairs than pick');
      const L = new Set((a.pairs || []).map(p => p[0])), R = new Set((a.pairs || []).map(p => p[1]));
      if (L.size !== a.pairs.length || R.size !== a.pairs.length) err(where, 'pairs must have unique left and right sides');
    } else if (a.type === 'caps' || a.type === 'tapletters') {
      if (!a.items || a.items.length < (a.pick || 1)) err(where, 'pool smaller than pick');
    } else if (!['pattern', 'samediff'].includes(a.type)) err(where, 'unknown game type');
  });
}
console.log(`${LESSONS.length} lesson(s) checked, ${bad} problem(s).`);
process.exit(bad ? 1 : 0);
