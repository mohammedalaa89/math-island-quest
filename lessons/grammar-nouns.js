/* From worksheet: Young Adventurers – Grammar Revision (Common Nouns, Proper Nouns, Capital Letters) */
addLesson({
  id: 'nouns', island: 'grammar', added: '2026-11-03', pic: '🔤',
  title: 'Common & Proper Nouns', sub: 'Naming words and capital letters',
  learn: [
    { title: 'A noun is a naming word', titleAr: 'الاسم (noun) كلمة نسمّي بها الأشياء', textAr: 'الاسم يسمّي <b>شخصاً</b> أو <b>مكاناً</b> أو <b>حيواناً</b> أو <b>شيئاً</b>. اضغطي على كل واحد!', text: 'It names a <b>person</b>, a <b>place</b>, an <b>animal</b> or a <b>thing</b>. Tap each one!',
      show: { kind: 'chips', items: [['👧', 'girl'], ['🏙️', 'city'], ['🐪', 'camel'], ['⛵', 'boat'], ['🏔️', 'mountain'], ['👨‍🏫', 'teacher']] } },
    { title: 'Common noun = ANY one', titleAr: 'الاسم العام = أيّ واحد', textAr: 'كلمة <b>girl</b> (بنت) تعني أيّ بنت في العالم. لذلك تبدأ بحرف صغير.', text: '<b>girl</b> could be any girl in the world. It starts with a small letter.',
      show: { kind: 'scene', pic: '👧👧🏽👧🏻👧🏾', items: [['👧', 'girl'], ['👦', 'boy'], ['🌊', 'ocean']] } },
    { title: 'Proper noun = a SPECIAL name', titleAr: 'اسم العلم = اسم خاص', textAr: 'شاهدي البطاقة تنقلب! <b>Laura</b> بنت واحدة مميّزة. أسماء الأعلام تبدأ دائماً <b>بحرف كبير</b>.', text: 'Watch the card flip! <b>Laura</b> is one special girl. Special names start with a <b>capital letter</b>.',
      show: { kind: 'morph', pic: '👧', from: 'girl', to: 'Laura', fromLabel: 'common noun', toLabel: 'proper noun ⭐' } },
    { title: 'Every common noun can have a special name', titleAr: 'لكل اسم عام اسم خاص', textAr: 'انظري إلى الحروف الكبيرة في أوّل الأسماء الخاصة.', text: 'Look at the big capital letters on the special names.',
      show: { kind: 'pairs', items: [['boy', 'Parth', '👦'], ['country', 'India', '🗺️'], ['city', 'Riyadh', '🏙️'], ['mountain', 'Mount Everest', '🏔️'], ['ocean', 'Pacific Ocean', '🌊'], ['boat', 'Sea Explorer', '⛵']] } },
    { title: 'Two jobs for capital letters', titleAr: 'متى نستخدم الحرف الكبير؟', textAr: 'نكتب الحرف الكبير في <b>بداية الجملة</b> وفي بداية <b>الاسم الخاص</b>. شاهدي!', text: 'A capital letter goes at the <b>start of a sentence</b> and at the start of a <b>special name</b>. Watch!',
      show: { kind: 'capfix', sentence: 'Laura sailed from Jeddah to India.' } },
  ],
  acts: [
    {
      type: 'sort', title: 'Common or Proper?', pick: 8,
      start: 'Is it ANY one, or a SPECIAL name? Drag each word into its box!', startAr: 'هل هو أيّ واحد، أم اسم خاص؟ اسحبي كل كلمة إلى صندوقها!',
      buckets: [
        { label: 'Common noun', labelAr: 'اسم عام', pic: '📦', why: '{w} could be any one. It is a common noun.', whyAr: '{w} يمكن أن يكون أيّ واحد، فهو اسم عام.' },
        { label: 'Proper noun', labelAr: 'اسم علم', pic: '⭐', why: '{w} is a special name with a capital letter. It is a proper noun!', whyAr: '{w} اسم خاص يبدأ بحرف كبير، فهو اسم علم!' },
      ],
      hint: 'Look at {w}. Is it a special name with a capital letter, or could it be ANY one?', hintAr: 'انظري إلى {w}. هل هو اسم خاص يبدأ بحرف كبير، أم يمكن أن يكون أيّ واحد؟',
      items: [['sailor', 0], ['Krish', 1], ['city', 0], ['Riyadh', 1], ['river', 0], ['Nile River', 1], ['girl', 0], ['Laura', 1], ['country', 0], ['India', 1],
        ['mountain', 0], ['Mount Everest', 1], ['boat', 0], ['Sea Explorer', 1], ['teacher', 0], ['school', 0], ['Jeddah', 1], ['Red Sea', 1], ['camel', 0], ['Sunday', 1], ['ocean', 0], ['Parth', 1]],
    },
    {
      type: 'mc', title: 'Choose the best answer', pick: 5,
      items: [
        { q: 'Which word is a <span class="hl">proper noun</span>?', opts: ['teacher', 'school', 'Laura', 'mountain'], ans: 'Laura', why: '<b>Laura</b> is the name of one special girl, so it is a proper noun with a capital L.', whyAr: '<b>Laura</b> اسم بنت معيّنة، لذلك هو اسم علم يبدأ بحرف L كبير.' },
        { q: 'Which word is a <span class="hl">common noun</span>?', opts: ['India', 'Krish', 'ocean', 'Everest'], ans: 'ocean', why: '<b>ocean</b> could be any ocean. It is a common noun, so it starts with a small letter.', whyAr: '<b>ocean</b> (محيط) يمكن أن يكون أيّ محيط، فهو اسم عام يبدأ بحرف صغير.' },
        { q: 'Which word is a <span class="hl">proper noun</span>?', opts: ['city', 'Riyadh', 'river', 'park'], ans: 'Riyadh', why: '<b>Riyadh</b> is the name of one special city.', whyAr: '<b>Riyadh</b> (الرياض) اسم مدينة معيّنة، فهو اسم علم.' },
        { q: 'Which word is a <span class="hl">common noun</span>?', opts: ['Sunday', 'Jeddah', 'camel', 'Nile River'], ans: 'camel', why: '<b>camel</b> could be any camel. The others are special names.', whyAr: '<b>camel</b> (جمل) يمكن أن يكون أيّ جمل. أما الباقي فأسماء خاصة.' },
        { q: 'Which word needs a <span class="hl">capital letter</span>?', opts: ['sara', 'apple', 'chair', 'happy'], ans: 'sara', why: 'Sara is a girl\'s name, so it needs a capital S: <b>Sara</b>.', whyAr: 'سارة اسم بنت، لذلك نكتبه بحرف S كبير: <b>Sara</b>.' },
        { q: 'Which word needs a <span class="hl">capital letter</span>?', opts: ['tree', 'riyadh', 'book', 'cat'], ans: 'riyadh', why: 'Riyadh is the name of a city, so it needs a capital R: <b>Riyadh</b>.', whyAr: 'الرياض اسم مدينة، لذلك نكتبها بحرف R كبير: <b>Riyadh</b>.' },
        { q: 'What is the special name for this <span class="hl">mountain</span>? 🏔️', opts: ['Mount Everest', 'hill', 'rock', 'tall'], ans: 'Mount Everest', why: '<b>Mount Everest</b> is the name of one special mountain. Both words get capital letters.', whyAr: '<b>Mount Everest</b> اسم جبل معيّن، لذلك الكلمتان تبدآن بحرف كبير.' },
        { q: 'Which sentence uses capital letters correctly?', opts: ['parth sailed with his family.', 'Parth sailed with his family.', 'Parth Sailed With His Family.', 'parth Sailed with his family.'], ans: 'Parth sailed with his family.', keep: true, why: '<b>P</b>arth gets a capital because it starts the sentence AND it is a name. The other words are not names, so they stay small.', whyAr: '<b>P</b>arth بحرف كبير لأنها أول الجملة وهي اسم أيضاً. باقي الكلمات ليست أسماء فتبقى صغيرة.' },
        { q: 'Which sentence uses capital letters correctly?', opts: ['we went to jeddah.', 'We went to Jeddah.', 'We Went To Jeddah.', 'We went to jeddah.'], ans: 'We went to Jeddah.', keep: true, why: '<b>W</b>e starts the sentence. <b>J</b>eddah is a special name. Only those two get capitals.', whyAr: '<b>W</b>e أول الجملة، و<b>J</b>eddah (جدة) اسم خاص. هاتان فقط بحرف كبير.' },
      ],
    },
    {
      type: 'caps', title: 'Fix the capitals', pick: 4,
      items: ['Laura sailed around the world.', 'Krish likes skydiving.', 'Parth explored the Indian Ocean.', 'We visited Mount Everest in a book.', 'My family lives in Riyadh.',
        'On Sunday we swam in the Red Sea.', 'Sara has a cat named Milo.', 'The Nile River is very long.', 'Ali and Omar played football.', 'Our boat is called Sea Explorer.'],
    },
    {
      type: 'fill', title: 'Write the proper noun', pick: 4,
      start: 'Pick the special name. Watch out for the capital letter!', startAr: 'اختاري الاسم الخاص. انتبهي للحرف الكبير!',
      hint: (w, it) => w.toLowerCase() === it.ans.toLowerCase()
        ? `Close! <b>${w}</b> is the right name, but special names need a <b>capital letter</b>.`
        : `<b>${w}</b> could be ANY one. We need the special name!`,
      hintAr: (w, it) => w.toLowerCase() === it.ans.toLowerCase()
        ? `قريبة! <b>${w}</b> هو الاسم الصحيح، لكن الأسماء الخاصة تحتاج <b>حرفاً كبيراً</b>.`
        : `<b>${w}</b> يمكن أن يكون أيّ واحد. نحتاج الاسم الخاص!`,
      items: [
        { s: "The boy's name is ___.", ans: 'Parth', bank: ['Parth', 'parth', 'boy'], pic: '👦', why: 'A name needs a capital letter: <b>P</b>arth.', whyAr: 'الاسم يحتاج حرفاً كبيراً: <b>P</b>arth.' },
        { s: "The girl's name is ___.", ans: 'Laura', bank: ['Laura', 'laura', 'girl'], pic: '👧', why: 'A name needs a capital letter: <b>L</b>aura.', whyAr: 'الاسم يحتاج حرفاً كبيراً: <b>L</b>aura.' },
        { s: 'The country is ___.', ans: 'India', bank: ['India', 'india', 'country'], pic: '🗺️', why: 'India is a special place, so it starts with a capital <b>I</b>.', whyAr: 'India (الهند) مكان معيّن، لذلك تبدأ بحرف <b>I</b> كبير.' },
        { s: 'The mountain is ___.', ans: 'Mount Everest', bank: ['Mount Everest', 'mount everest', 'mountain'], pic: '🏔️', why: 'Both words in <b>Mount Everest</b> get a capital letter.', whyAr: 'الكلمتان في <b>Mount Everest</b> تبدآن بحرف كبير.' },
        { s: 'The city is ___.', ans: 'Riyadh', bank: ['Riyadh', 'riyadh', 'city'], pic: '🏙️', why: 'Riyadh is a special city, so it starts with a capital <b>R</b>.', whyAr: 'الرياض مدينة معيّنة، لذلك تبدأ بحرف <b>R</b> كبير.' },
        { s: 'The longest river is the ___.', ans: 'Nile River', bank: ['Nile River', 'nile river', 'river'], pic: '🏞️', why: 'Both words in <b>Nile River</b> get a capital letter.', whyAr: 'الكلمتان في <b>Nile River</b> تبدآن بحرف كبير.' },
        { s: 'Our boat is called ___.', ans: 'Sea Explorer', bank: ['Sea Explorer', 'sea explorer', 'boat'], pic: '⛵', why: 'A boat\'s name is special, so <b>Sea Explorer</b> gets capitals.', whyAr: 'اسم القارب اسم خاص، لذلك <b>Sea Explorer</b> بحروف كبيرة.' },
        { s: 'The day after Saturday is ___.', ans: 'Sunday', bank: ['Sunday', 'sunday', 'day'], pic: '📅', why: 'Days of the week are special names: <b>S</b>unday.', whyAr: 'أيام الأسبوع أسماء خاصة: <b>S</b>unday (الأحد).' },
      ],
    },
  ],
});
