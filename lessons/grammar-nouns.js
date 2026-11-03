/* From worksheet: Young Adventurers – Grammar Revision (Common Nouns, Proper Nouns, Capital Letters) */
addLesson({
  id: 'nouns', island: 'grammar', added: '2026-11-03', pic: '🔤',
  title: 'Common & Proper Nouns', sub: 'Naming words and capital letters',
  learn: [
    { title: 'A noun is a naming word', text: 'It names a <b>person</b>, a <b>place</b>, an <b>animal</b> or a <b>thing</b>. Tap each one!',
      show: { kind: 'chips', items: [['👧', 'girl'], ['🏙️', 'city'], ['🐪', 'camel'], ['⛵', 'boat'], ['🏔️', 'mountain'], ['👨‍🏫', 'teacher']] } },
    { title: 'Common noun = ANY one', text: '<b>girl</b> could be any girl in the world. It starts with a small letter.',
      show: { kind: 'scene', pic: '👧👧🏽👧🏻👧🏾', items: [['👧', 'girl'], ['👦', 'boy'], ['🌊', 'ocean']] } },
    { title: 'Proper noun = a SPECIAL name', text: 'Watch the card flip! <b>Laura</b> is one special girl. Special names start with a <b>capital letter</b>.',
      show: { kind: 'morph', pic: '👧', from: 'girl', to: 'Laura', fromLabel: 'common noun', toLabel: 'proper noun ⭐' } },
    { title: 'Every common noun can have a special name', text: 'Look at the big capital letters on the special names.',
      show: { kind: 'pairs', items: [['boy', 'Parth', '👦'], ['country', 'India', '🗺️'], ['city', 'Riyadh', '🏙️'], ['mountain', 'Mount Everest', '🏔️'], ['ocean', 'Pacific Ocean', '🌊'], ['boat', 'Sea Explorer', '⛵']] } },
    { title: 'Two jobs for capital letters', text: 'A capital letter goes at the <b>start of a sentence</b> and at the start of a <b>special name</b>. Watch!',
      show: { kind: 'capfix', sentence: 'Laura sailed from Jeddah to India.' } },
  ],
  acts: [
    {
      type: 'sort', title: 'Common or Proper?', pick: 8,
      start: 'Is it ANY one, or a SPECIAL name? Drag each word into its box!',
      buckets: [
        { label: 'Common noun', pic: '📦', why: '{w} could be any one. It is a common noun.' },
        { label: 'Proper noun', pic: '⭐', why: '{w} is a special name with a capital letter. It is a proper noun!' },
      ],
      hint: 'Look at {w}. Is it a special name with a capital letter, or could it be ANY one?',
      items: [['sailor', 0], ['Krish', 1], ['city', 0], ['Riyadh', 1], ['river', 0], ['Nile River', 1], ['girl', 0], ['Laura', 1], ['country', 0], ['India', 1],
        ['mountain', 0], ['Mount Everest', 1], ['boat', 0], ['Sea Explorer', 1], ['teacher', 0], ['school', 0], ['Jeddah', 1], ['Red Sea', 1], ['camel', 0], ['Sunday', 1], ['ocean', 0], ['Parth', 1]],
    },
    {
      type: 'mc', title: 'Choose the best answer', pick: 5,
      items: [
        { q: 'Which word is a <span class="hl">proper noun</span>?', opts: ['teacher', 'school', 'Laura', 'mountain'], ans: 'Laura', why: '<b>Laura</b> is the name of one special girl, so it is a proper noun with a capital L.' },
        { q: 'Which word is a <span class="hl">common noun</span>?', opts: ['India', 'Krish', 'ocean', 'Everest'], ans: 'ocean', why: '<b>ocean</b> could be any ocean. It is a common noun, so it starts with a small letter.' },
        { q: 'Which word is a <span class="hl">proper noun</span>?', opts: ['city', 'Riyadh', 'river', 'park'], ans: 'Riyadh', why: '<b>Riyadh</b> is the name of one special city.' },
        { q: 'Which word is a <span class="hl">common noun</span>?', opts: ['Sunday', 'Jeddah', 'camel', 'Nile River'], ans: 'camel', why: '<b>camel</b> could be any camel. The others are special names.' },
        { q: 'Which word needs a <span class="hl">capital letter</span>?', opts: ['sara', 'apple', 'chair', 'happy'], ans: 'sara', why: 'Sara is a girl\'s name, so it needs a capital S: <b>Sara</b>.' },
        { q: 'Which word needs a <span class="hl">capital letter</span>?', opts: ['tree', 'riyadh', 'book', 'cat'], ans: 'riyadh', why: 'Riyadh is the name of a city, so it needs a capital R: <b>Riyadh</b>.' },
        { q: 'What is the special name for this <span class="hl">mountain</span>? 🏔️', opts: ['Mount Everest', 'hill', 'rock', 'tall'], ans: 'Mount Everest', why: '<b>Mount Everest</b> is the name of one special mountain. Both words get capital letters.' },
        { q: 'Which sentence uses capital letters correctly?', opts: ['parth sailed with his family.', 'Parth sailed with his family.', 'Parth Sailed With His Family.', 'parth Sailed with his family.'], ans: 'Parth sailed with his family.', keep: true, why: '<b>P</b>arth gets a capital because it starts the sentence AND it is a name. The other words are not names, so they stay small.' },
        { q: 'Which sentence uses capital letters correctly?', opts: ['we went to jeddah.', 'We went to Jeddah.', 'We Went To Jeddah.', 'We went to jeddah.'], ans: 'We went to Jeddah.', keep: true, why: '<b>W</b>e starts the sentence. <b>J</b>eddah is a special name. Only those two get capitals.' },
      ],
    },
    {
      type: 'caps', title: 'Fix the capitals', pick: 4,
      items: ['Laura sailed around the world.', 'Krish likes skydiving.', 'Parth explored the Indian Ocean.', 'We visited Mount Everest in a book.', 'My family lives in Riyadh.',
        'On Sunday we swam in the Red Sea.', 'Sara has a cat named Milo.', 'The Nile River is very long.', 'Ali and Omar played football.', 'Our boat is called Sea Explorer.'],
    },
    {
      type: 'fill', title: 'Write the proper noun', pick: 4,
      start: 'Pick the special name. Watch out for the capital letter!',
      hint: (w, it) => w.toLowerCase() === it.ans.toLowerCase()
        ? `Close! <b>${w}</b> is the right name, but special names need a <b>capital letter</b>.`
        : `<b>${w}</b> could be ANY one. We need the special name!`,
      items: [
        { s: "The boy's name is ___.", ans: 'Parth', bank: ['Parth', 'parth', 'boy'], pic: '👦', why: 'A name needs a capital letter: <b>P</b>arth.' },
        { s: "The girl's name is ___.", ans: 'Laura', bank: ['Laura', 'laura', 'girl'], pic: '👧', why: 'A name needs a capital letter: <b>L</b>aura.' },
        { s: 'The country is ___.', ans: 'India', bank: ['India', 'india', 'country'], pic: '🗺️', why: 'India is a special place, so it starts with a capital <b>I</b>.' },
        { s: 'The mountain is ___.', ans: 'Mount Everest', bank: ['Mount Everest', 'mount everest', 'mountain'], pic: '🏔️', why: 'Both words in <b>Mount Everest</b> get a capital letter.' },
        { s: 'The city is ___.', ans: 'Riyadh', bank: ['Riyadh', 'riyadh', 'city'], pic: '🏙️', why: 'Riyadh is a special city, so it starts with a capital <b>R</b>.' },
        { s: 'The longest river is the ___.', ans: 'Nile River', bank: ['Nile River', 'nile river', 'river'], pic: '🏞️', why: 'Both words in <b>Nile River</b> get a capital letter.' },
        { s: 'Our boat is called ___.', ans: 'Sea Explorer', bank: ['Sea Explorer', 'sea explorer', 'boat'], pic: '⛵', why: 'A boat\'s name is special, so <b>Sea Explorer</b> gets capitals.' },
        { s: 'The day after Saturday is ___.', ans: 'Sunday', bank: ['Sunday', 'sunday', 'day'], pic: '📅', why: 'Days of the week are special names: <b>S</b>unday.' },
      ],
    },
  ],
});
