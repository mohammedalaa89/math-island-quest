/* From worksheet: Young Adventurers – Vocabulary Review */
const ADV_WORDS = [
  ['adventure', '🧗', 'an exciting and often risky experience', 'Trying a new sport can be an adventure.', 'مغامرة'],
  ['extraordinary', '🌟', 'very special or amazing', 'The view from the mountain was extraordinary.', 'رائع ومميّز جداً'],
  ['courage', '🦁', 'being brave when something is hard or scary', 'She showed courage and climbed the tall mountain.', 'شجاعة'],
  ['practice', '🎯', 'doing something again and again to get better', 'You must practice to get better.', 'تمرين وتدريب'],
  ['equipment', '🎒', 'the tools or supplies you need', 'Divers wear equipment like tanks and masks.', 'معدّات وأدوات'],
  ['dangerous', '⚠️', 'likely to cause harm or injury', 'Climbing a high mountain can be dangerous.', 'خطير'],
  ['parachute', '🪂', 'helps a person fall slowly from the sky', 'A parachute helps a skydiver land safely.', 'مظلّة هبوط'],
  ['shipwreck', '⚓', 'a broken ship in the water', 'The divers found an old shipwreck.', 'حطام سفينة'],
  ['explore', '🧭', 'to travel to a place to discover or learn about it', 'We love to explore new places.', 'يستكشف'],
  ['accomplished', '🏆', 'completed something important or difficult', 'Laura accomplished something amazing.', 'أنجز'],
];

addLesson({
  id: 'adventure-words', island: 'vocab', added: '2026-11-03', pic: '🪂',
  title: 'Adventure Words', sub: '10 brave new words',
  words: ADV_WORDS,
  learn: [
    { title: 'Meet 10 adventure words', titleAr: 'تعرّفي على ١٠ كلمات مغامرة', textAr: 'اضغطي على كل بطاقة لتقلبيها وتسمعي معنى الكلمة بالعربي.', text: 'Tap each card to flip it and hear what the word means.', show: { kind: 'flashgrid' } },
    { title: 'Words that go together', titleAr: 'كلمات تأتي معاً', textAr: 'المغامرة (<b>adventure</b>) قد تكون خطيرة (<b>dangerous</b>)، لذلك تحتاجين الشجاعة (<b>courage</b>) والمعدّات (<b>equipment</b>)!', text: 'An <b>adventure</b> can be <b>dangerous</b>, so you need <b>courage</b> and the right <b>equipment</b>!',
      show: { kind: 'scene', pic: '🧗⛰️', items: [['🧗', 'adventure'], ['⚠️', 'dangerous'], ['🦁', 'courage'], ['🎒', 'equipment']] } },
    { title: 'Adventures in the sky and sea', titleAr: 'مغامرات في السماء والبحر', textAr: 'القافز من الطائرة يحتاج مظلّة (<b>parachute</b>). والغوّاص قد يستكشف (<b>explore</b>) حطام سفينة (<b>shipwreck</b>).', text: 'A skydiver needs a <b>parachute</b>. A diver might <b>explore</b> a <b>shipwreck</b>.',
      show: { kind: 'scene', pic: '🪂☁️ 🤿⚓', items: [['🪂', 'parachute'], ['🧭', 'explore'], ['⚓', 'shipwreck']] } },
    { title: 'After the adventure', titleAr: 'بعد المغامرة', textAr: 'مع التمرين الكثير (<b>practice</b>) تفعلين شيئاً رائعاً (<b>extraordinary</b>)، وعندها تكونين قد أنجزتِه (<b>accomplished</b>)!', text: 'With lots of <b>practice</b>, you can do something <b>extraordinary</b>. Then you have <b>accomplished</b> it!',
      show: { kind: 'scene', pic: '🎯➜🌟➜🏆', items: [['🎯', 'practice'], ['🌟', 'extraordinary'], ['🏆', 'accomplished']] } },
  ],
  acts: [
    { type: 'match', title: 'Match the meaning', pick: 5, pairs: ADV_WORDS.map(w => [w[0], w[2], w[1], w[3], w[4]]) },
    {
      type: 'fill', title: 'Fill in the blanks', pick: 6,
      start: 'Which adventure word fits the gap?', startAr: 'أي كلمة تناسب الفراغ؟',
      bank: ADV_WORDS.map(w => w[0]),
      items: [
        { s: 'She felt nervous, but showed ___ and climbed the tall mountain.', ans: 'courage', pic: '🧗‍♀️', why: '<b>Courage</b> means being brave even when you feel scared. She was nervous, but brave!' },
        { s: 'The divers wore special ___ like tanks and masks.', ans: 'equipment', pic: '🤿', why: 'Tanks and masks are tools divers need. That is <b>equipment</b>.' },
        { s: 'A ___ helps a skydiver land safely.', ans: 'parachute', pic: '🪂', why: 'A <b>parachute</b> opens up and slows the skydiver down.' },
        { s: 'The divers found an old ___ on the ocean floor.', ans: 'shipwreck', pic: '🐠', why: 'A broken ship under the water is a <b>shipwreck</b>.' },
        { s: 'Climbing a high mountain can be very ___.', ans: 'dangerous', pic: '🏔️', why: 'You could get hurt, so it is <b>dangerous</b>.' },
        { s: 'We need to ___ new places to learn more about the world.', ans: 'explore', pic: '🧭', why: 'To <b>explore</b> means to go and discover new places.' },
        { s: 'You must ___ again and again to get better.', ans: 'practice', pic: '🎯', why: 'Doing something again and again is <b>practice</b>.' },
        { s: 'Laura ___ something amazing when she sailed around the world.', ans: 'accomplished', pic: '⛵', why: 'She finished something hard. She <b>accomplished</b> it!' },
        { s: 'Trying a new sport can be an ___.', ans: 'adventure', pic: '🏄', why: 'Something new and exciting is an <b>adventure</b>.' },
        { s: 'The view from the top of the mountain was ___.', ans: 'extraordinary', pic: '🌄', why: 'Very special and amazing means <b>extraordinary</b>.' },
        { s: 'It takes ___ to try something new.', ans: 'courage', pic: '🦁', why: 'Trying something new can feel scary, so you need <b>courage</b>.' },
        { s: 'You need the right ___ to sail a boat safely.', ans: 'equipment', pic: '⛵', why: 'Life jackets and ropes are <b>equipment</b>.' },
      ],
    },
    {
      type: 'mc', title: 'Which word means the same?', pick: 5,
      start: 'Words that mean the same are called synonyms. Find the match!', startAr: 'الكلمات التي لها نفس المعنى تسمّى مترادفات. جدي المرادف!',
      items: [
        { q: 'Which word means the same as <span class="hl">brave</span>?', opts: ['courage', 'equipment', 'shipwreck'], ans: 'courage', why: 'Being brave is having <b>courage</b>. 🦁' },
        { q: 'Which word means the same as <span class="hl">amazing</span>?', opts: ['extraordinary', 'dangerous', 'practice'], ans: 'extraordinary', why: 'Amazing and <b>extraordinary</b> both mean very special. 🌟' },
        { q: 'Which word means the same as <span class="hl">tools and supplies</span>?', opts: ['equipment', 'adventure', 'explore'], ans: 'equipment', why: 'Tools and supplies are <b>equipment</b>. 🎒' },
        { q: 'Which word means the same as <span class="hl">not safe</span>?', opts: ['dangerous', 'accomplished', 'parachute'], ans: 'dangerous', why: 'Something not safe is <b>dangerous</b>. ⚠️' },
        { q: 'Which word means <span class="hl">finished something hard</span>?', opts: ['accomplished', 'explore', 'courage'], ans: 'accomplished', why: 'When you finish something hard, you <b>accomplished</b> it. 🏆' },
        { q: 'Which word means <span class="hl">go and discover new places</span>?', opts: ['explore', 'practice', 'shipwreck'], ans: 'explore', why: 'To <b>explore</b> is to go and discover. 🧭' },
        { q: 'Which word means <span class="hl">an exciting, risky trip</span>?', opts: ['adventure', 'equipment', 'dangerous'], ans: 'adventure', why: 'An exciting, risky experience is an <b>adventure</b>. 🧗' },
      ],
    },
    {
      type: 'mc', title: 'Use the word', pick: 4,
      start: 'Only one sentence uses the word the right way. Find it!', startAr: 'جملة واحدة فقط تستخدم الكلمة بشكل صحيح. جديها!',
      hint: 'Think about what the word means. Does that sentence make sense?', hintAr: 'فكّري في معنى الكلمة. هل لهذه الجملة معنى؟',
      items: [
        { q: 'Which sentence uses <span class="hl">dangerous</span> correctly?', opts: ['It can be dangerous to swim in a storm.', 'I wore my dangerous to school.', 'We dangerous the cake with candles.'], ans: 'It can be dangerous to swim in a storm.', why: 'Swimming in a storm could hurt you. That is <b>dangerous</b>!' },
        { q: 'Which sentence uses <span class="hl">parachute</span> correctly?', opts: ['The parachute slowed him down.', 'I ate a parachute for breakfast.', 'She parachute her homework.'], ans: 'The parachute slowed him down.', why: 'A <b>parachute</b> slows a person down as they fall.' },
        { q: 'Which sentence uses <span class="hl">explore</span> correctly?', opts: ['We love to explore new places.', 'My explore is red and blue.', 'I explore my teeth every night.'], ans: 'We love to explore new places.', why: 'To <b>explore</b> is to go and discover new places.' },
        { q: 'Which sentence uses <span class="hl">equipment</span> correctly?', opts: ['Pack your equipment for the camping trip.', 'The equipment barked at the cat.', 'I feel very equipment today.'], ans: 'Pack your equipment for the camping trip.', why: 'A tent and a torch are camping <b>equipment</b>.' },
        { q: 'Which sentence uses <span class="hl">courage</span> correctly?', opts: ['It takes courage to try something new.', 'Pour some courage into my cup.', 'The courage is a yellow fruit.'], ans: 'It takes courage to try something new.', why: 'Trying new things needs bravery, which is <b>courage</b>.' },
        { q: 'Which sentence uses <span class="hl">shipwreck</span> correctly?', opts: ['Fish swim around the old shipwreck.', 'I brushed my hair with a shipwreck.', 'We shipwreck happy songs.'], ans: 'Fish swim around the old shipwreck.', why: 'A <b>shipwreck</b> is a broken ship under the water, where fish can swim.' },
      ],
    },
  ],
});
/* Arabic: after each answer, also say what the word means in Arabic */
LES('adventure-words').acts.forEach(a => (a.items || []).forEach(it => {
  if (it.whyAr) return;
  const w = ADV_WORDS.find(x => String(it.ans).toLowerCase().includes(x[0]) || (it.q || '').includes('>' + x[0] + '<'));
  if (w) it.whyAr = `<b>${w[0]}</b> ${w[1]} معناها: <b>${w[4]}</b>`;
}));
