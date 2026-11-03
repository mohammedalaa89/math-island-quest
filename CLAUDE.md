# Adventure Island — how this site works

A learning website for a grade 3 girl at Al Forsan International School, Riyadh (American curriculum: Common Core for Math/ELA, NGSS for Science).
Served by GitHub Pages at https://mohammedalaa89.github.io/math-island-quest/ (keep this URL: it is saved on her iPad home screen).
Plain HTML/CSS/JS, no build step. Her family speaks Arabic at home; she picks whether Pip explains in English or Arabic.

## Files
- `index.html` – loads `engine.js`, one `<script>` per lesson file, then `tests.js`, then `boot()`.
- `engine.js` – subjects + grade 3 unit order (`SUBJECTS`), islands (`ISLANDS`), router, saved progress, voices, English/Arabic (`bi`, `AR`), Pip the coach, learn-slide animations (`SHOW`), game types (`ENG`), mastery rules.
- `style.css` – one bright theme. Island colour comes in as `--c` / `--cs`. Letter tiles use the Andika reading font (`--abc`).
- `lessons/*.js` – one file per lesson, each calls `addLesson({...})`.
- `tests.js` – school tests/worksheets the parent uploaded, `addTest({...})`, each with a Practice route and "📖 Lesson" reference buttons.
- `math.html` – the older stand-alone math game (its own code; links back home).

## Her school books (unit lists in `SUBJECTS` follow them, in book order)
- Math: enVision Mathematics Common Core, Grade 3 (Savvas), Topics 1–16.
- English: Our Literacy World G3 (Obelas, KSA edition). Unit 3 "Staying Healthy": Kickoff, Training Days, Lessons 1–6 (+ checkpoints), Finish Line.
- Arabic: لغتي الصف الثالث الجزء الأول: مراجعة المكتسبات، ثم ٤ وحدات (درسان + نموذج اختبار لكل وحدة).
- Islamic Studies: التوحيد (٨ دروس)، الفقه والسلوك (١٠ دروس)، خطة القرآن الكريم.
Unit lists can contain section headers `{ sec, secAr, note, noteAr }`; islands lock only within their own section.
Never copy book text: write our own explanations and questions on the same skills. For story lessons, ask the parent for photos of the lesson pages.
Arabic and Islamic Studies lessons set `lang: 'ar'`: everything shows and speaks in Arabic, right-to-left, whatever she picked.

## Navigation
Home → subject card → **📝 Tests** (uploaded papers) or **🏝️ Lessons** (island map of grade 3 units in school order).
Island map: a unit unlocks only when every earlier unit's lessons are passed. Lesson: "1. Learn the lesson", then "2. Quiz…", "3. Quiz…";
each quiz unlocks after the one before it is passed. **Pass = 2+ stars** (≤2 mistakes). Below that she gets "Almost there! Try again" + "Watch the lesson again".
🏠 button on every inner page.

## Adding content
1. **New school test/worksheet** → build its practice as a lesson (or reuse one), then add an `addTest` line in `tests.js` with `ref` buttons pointing at the lesson(s) to study.
2. **New curriculum lesson** → put it in the right unit of `SUBJECTS[..].units` (keep school order; `['Title', 'islandId']` makes it playable), add the island to `ISLANDS` if new, create `lessons/<subject>-<topic>.js`, and add its `<script>` line.
3. Lesson shape:
```js
addLesson({
  id: 'unique-id', island: 'grammar', added: 'YYYY-MM-DD',   // "New!" badge for 21 days
  pic: '🔤', title: 'Short title', sub: 'One line',
  learn: [ { title, titleAr, text, textAr, say?, sayAr?, show: { kind, ... } } ],
  acts:  [ { type, title, pick, start, startAr, hint, hintAr, ...data } ],   // the quizzes, in order
});
```
4. **Arabic**: every explanation needs an Arabic twin: `titleAr`, `textAr`, `whyAr`, `hintAr`, `startAr`, `askAr`, `qAr`, bucket `labelAr`/`whyAr`; vocab words get an Arabic meaning.
   Use simple Modern Standard Arabic addressed to a girl (اضغطي، اقرئي، أحسنتِ). Keep the English key word in the Arabic sentence, e.g. `الاسم (noun)`.
   `bi(en, ar)` shows one language; `say(en, force, ar)` speaks the chosen one. Common Pip phrases live in `AR`.
5. Learn slide kinds (`SHOW`): `chips`, `scene`, `html`, `morph`, `pairs`, `capfix`, `twins`, `lines`, `forms`, `abc`, `groups`, `array`,
   `patterns` / `magic` / `samesound` (need `lesson.patterns`), `flashgrid` (needs `lesson.words` = [[word,pic,meaning,example,arabic]]), `book`, `tent`, `split`.
   Helpers usable in lesson files: `linesSVG([chars])`, `ARR(rows, cols, emoji)`.
6. Game types (`ENG`): `mc` (q, qAr, opts, ans, why, whyAr, hint, pic (emoji or HTML), keep, big), `sort` (buckets [{label,labelAr,pic,why,whyAr}], items [[word,bucket]], or `fromPatterns`),
   `caps`, `tapletters`, `fill` (s with `___`, ans, bank, why), `match` (pairs [[left,right,pic,example,arabic]]; optional why/hint/sayL/sayR functions), `pattern`, `samediff`.
7. Rules the parent asked for:
   - Explain WHY after every right answer; give a hint (not the answer) after a wrong one. Both in English and Arabic.
   - Use objects and pictures wherever possible; animate the idea (she learns by seeing and doing).
   - Never the same questions every time: a pool bigger than `pick`, or generated numbers.
   - Add extra practice beyond the worksheet, in the same style. Follow the school's unit order.
   - Name and language are asked only on the first visit (localStorage).
8. Bump the `?v=` number on every `<script>`/`<link>` in `index.html` when files change, so the iPad loads the new version at once.
9. Test with Playwright: play every quiz to the end at 820px and 390px wide, in both languages; check no horizontal overflow and no console errors.
   Then commit and push to `main` with the GitHub noreply email (34958470+mohammedalaa89@users.noreply.github.com).
