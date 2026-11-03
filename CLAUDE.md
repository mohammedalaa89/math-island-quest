# Adventure Island — how this site works

A learning website for a grade 3 child, served by GitHub Pages at
https://mohammedalaa89.github.io/math-island-quest/ (keep this URL: it is saved on her iPad home screen).
Plain HTML/CSS/JS, no build step. The parent sends photos of school worksheets; each worksheet becomes a lesson.

## Files
- `index.html` – home page. Loads `engine.js`, then one `<script>` per lesson file, then `boot()`.
- `engine.js` – everything shared: subjects, islands, router, saved progress, sounds, Pip the coach, learn-slide animations (`SHOW`), and game types (`ENG`).
- `style.css` – one bright theme. Island colour comes in as `--c` / `--cs`.
- `lessons/*.js` – one file per worksheet, each calls `addLesson({...})`.
- `math.html` – the older stand-alone math game (its own code; links back home).

## Adding a new worksheet
1. Pick the subject and island. Subjects live in `SUBJECTS` (math, english, science…); islands in `ISLANDS`
   (each has `subject`). Add a new island or subject there if needed; the home page groups islands under their subject automatically.
2. Create `lessons/<island>-<topic>.js` and add its `<script>` line to `index.html`.
3. Lesson shape:
```js
addLesson({
  id: 'unique-id', island: 'grammar', added: 'YYYY-MM-DD',   // "New!" badge shows for 21 days
  pic: '🔤', title: 'Short title', sub: 'One line',
  learn: [ { title, text, say?, show: { kind, ... } } ],      // animated teaching slides, shown first
  acts:  [ { type, title, pick, ...data } ],                  // games, in order
});
```
4. Learn slide kinds (`SHOW`): `chips` (items [[pic,word]]), `scene` (pic + items), `morph` (from→to flip card),
   `pairs` (common→proper rows), `capfix` (sentence capitals flip), `patterns` / `magic` / `samesound` (phonics; need `lesson.patterns`),
   `flashgrid` (needs `lesson.words` = [[word,pic,meaning,example]]), `book`, `tent`, `split`.
5. Game types (`ENG`): `mc` (q, opts, ans, why, hint?, pic?, keep?), `sort` (buckets[{label,pic,why}], items[[word,bucketIndex]], or `fromPatterns`),
   `caps` (correctly-capitalised sentences), `fill` (s with `___`, ans, bank?/lesson-level bank, why), `match` (pairs [[word,meaning,pic,example]]),
   `pattern` and `samediff` (phonics, use `lesson.patterns`).
6. Rules the parent asked for:
   - Explain WHY after every right answer (`why`), give a hint (not the answer) after a wrong one.
   - Use objects and pictures (emoji) wherever possible; she learns by seeing and doing.
   - Do not repeat the same questions every time: give each game a bigger pool than `pick`, so each play is different.
   - Add extra practice items beyond the worksheet, in the same style.
   - Keep the name prompt first-visit only (stored in localStorage).
7. Test with Playwright (play every game to the end at 820px and 390px wide), then commit and push to `main`.
   Commit with the GitHub noreply email (34958470+mohammedalaa89@users.noreply.github.com); pushes exposing a private email are blocked.
