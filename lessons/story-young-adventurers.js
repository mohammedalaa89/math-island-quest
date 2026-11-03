/* From worksheet: Young Adventurers – Story Review (biography, main idea, details, inference, root words) */
addLesson({
  id: 'young-adventurers', island: 'story', added: '2026-11-03', pic: '📚',
  title: 'Young Adventurers', sub: 'Biography, main idea and clues',
  learn: [
    { title: 'This story is a biography', text: 'A <b>biography</b> is a <b>true</b> story about a <b>real</b> person\'s life, written by <b>another</b> person.',
      show: { kind: 'book', left: ['🧑', 'A REAL person'], right: ['✍️', 'written by someone else'], chips: ['bio = life', 'graph = writing', '✔ true story'] } },
    { title: 'Main idea and details', text: 'The <b>main idea</b> is what the whole story is about. <b>Details</b> hold it up, like poles hold up a tent!',
      show: { kind: 'tent', details: ['what they did', 'where they went', 'challenges'], caption: 'Main idea: young people complete extraordinary adventures.' } },
    { title: 'The big question', text: 'What <b>qualities</b> help young people complete extraordinary adventures?',
      show: { kind: 'scene', pic: '💡', items: [['🦁', 'bravery'], ['💪', 'determination'], ['🛠️', 'hard work'], ['🔍', 'curiosity'], ['🚀', 'never giving up']] } },
    { title: 'Root words help you read', text: 'Find the <b>root word</b> inside a long word. <b>friendly</b> has <b>friend</b> inside it!',
      show: { kind: 'split', word: 'friendly', root: 'friend', end: 'ly' } },
    { title: 'Be a clue detective', text: 'To <b>infer</b>, use clues you can see to work out what is happening. A backpack + a mountain = exploring!',
      show: { kind: 'scene', pic: '🎒 + ⛰️ = 🧗‍♀️', items: [['🎒', 'clue'], ['⛰️', 'clue'], ['🧗‍♀️', 'she is exploring!']] } },
  ],
  acts: [
    {
      type: 'mc', title: "Let's review", pick: 6,
      items: [
        { q: 'What is the genre of <i>Young Adventurers</i>?', opts: ['fantasy', 'fairy tale', 'biography', 'poem'], ans: 'biography', pic: '📚', why: 'The adventurers are real people and the story is true, so it is a <b>biography</b>.' },
        { q: 'What does a biography tell us?', opts: ['a make-believe story', "a real person's life", 'a story about animals', 'a book of poems'], ans: "a real person's life", why: 'A biography is a true story about a <b>real person\'s life</b>.' },
        { q: 'What is an adventurer?', opts: ['someone who stays at home', 'someone who enjoys taking risks and exploring new places', 'someone who writes books', 'someone who plays sports'], ans: 'someone who enjoys taking risks and exploring new places', pic: '🧗', why: 'An adventurer <b>explores new places</b> and is brave enough to take risks.' },
        { q: 'Which word means the same as <span class="hl">very special or amazing</span>?', opts: ['dangerous', 'ordinary', 'extraordinary', 'friendly'], ans: 'extraordinary', pic: '🌟', why: '<b>Extraordinary</b> means very special or amazing. (Ordinary means normal!)' },
        { q: 'What does the root word help you understand in <span class="hl">friendly</span>?', opts: ['friend', 'end', 'ly', 'ship'], ans: 'friend', why: '<span class="split2"><span class="r">friend</span><span class="x">ly</span></span> The root word is <b>friend</b>, so friendly means kind like a friend.' },
        { q: 'Which of these is a <span class="hl">challenge</span> an adventurer might face?', opts: ['easy game', 'dangerous weather', 'watching TV', 'eating lunch'], ans: 'dangerous weather', pic: '⛈️', why: 'A challenge is something hard. Storms and <b>dangerous weather</b> make an adventure hard.' },
        { q: 'Which quality would be MOST important for a young adventurer?', opts: ['bravery', 'laziness', 'being mean', 'giving up'], ans: 'bravery', pic: '🏆', why: 'Adventures can be scary, so <b>bravery</b> helps most.' },
        { q: 'Look at the picture. What can you infer?', pic: '🧗‍♀️🎒⛰️', opts: ['She is resting at home.', 'She is exploring a new place.', 'She is watching a movie.', 'She is cooking dinner.'], ans: 'She is exploring a new place.', why: 'Clues: a backpack and a mountain. So we can infer <b>she is exploring a new place</b>.' },
        { q: 'Which detail shows the young adventurers were <span class="hl">determined</span>?', opts: ['They kept going even when things were difficult.', 'They went home when it rained.', 'They gave up on the first day.', 'They stayed in bed all day.'], ans: 'They kept going even when things were difficult.', why: 'Determined means you <b>keep going</b>, even when it is hard.' },
        { q: 'Look at the picture. What can you infer?', pic: '🤿🐠🌊', opts: ['He is diving under the sea.', 'He is riding a bike.', 'He is sleeping.', 'He is at school.'], ans: 'He is diving under the sea.', why: 'Clues: a diving mask, fish and water. He is <b>diving under the sea</b>.' },
        { q: 'Look at the picture. What can you infer?', pic: '🪂☁️', opts: ['Someone is skydiving.', 'Someone is swimming.', 'Someone is baking.', 'Someone is reading.'], ans: 'Someone is skydiving.', why: 'Clues: a parachute up in the clouds. Someone is <b>skydiving</b>!' },
      ],
    },
    {
      type: 'sort', title: 'Adventurer qualities', pick: 8,
      start: 'Which qualities help an adventurer? Drag each one into a box!',
      hint: 'Would {w} help someone finish a hard adventure?',
      buckets: [
        { label: 'Helps', pic: '👍', why: '{w} helps an adventurer keep going!' },
        { label: 'Does not help', pic: '👎', why: '{w} would not help on an adventure.' },
      ],
      items: [['bravery', 0], ['curiosity', 0], ['determination', 0], ['hard work', 0], ['never giving up', 0], ['patience', 0], ['teamwork', 0], ['practice', 0],
        ['laziness', 1], ['being mean', 1], ['giving up', 1], ['being careless', 1], ['complaining', 1], ['not trying', 1]],
    },
    {
      type: 'mc', title: 'Root word detective', pick: 5,
      start: 'Find the small word hiding inside the big word!',
      hint: 'Cover the ending with your finger. What word is left?',
      items: [
        ['friendly', 'friend', 'ly'], ['helpful', 'help', 'ful'], ['blinding', 'blind', 'ing'], ['dangerous', 'danger', 'ous'], ['kindness', 'kind', 'ness'],
        ['careful', 'care', 'ful'], ['quickly', 'quick', 'ly'], ['teacher', 'teach', 'er'], ['sailing', 'sail', 'ing'], ['accomplished', 'accomplish', 'ed'],
      ].map(([w, r, e]) => ({
        q: `What is the root word in <span class="hl">${w}</span>?`, opts: [r, e, w.slice(0, 2)], ans: r,
        why: `<span class="split2"><span class="r">${r}</span><span class="x">${e}</span></span> The root word is <b>${r}</b>. The ending <b>${e}</b> was added.`,
      })),
    },
    {
      type: 'match', title: 'Vocabulary review', pick: 4,
      ask: 'Use the root word and the clues to match each word.',
      pairs: [
        ['accomplished', 'completed something important', '🏆'], ['blinding', 'very bright', '✨'], ['dangerous', 'not safe', '⚠️'], ['equipment', 'tools or supplies', '🎒'],
        ['extraordinary', 'very special or amazing', '🌟'], ['parachute', 'a device that helps someone float down', '🪂'], ['shipwreck', 'a broken ship in the water', '⚓'],
      ],
    },
  ],
});
