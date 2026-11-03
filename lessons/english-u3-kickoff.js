/* Our Literacy World G3, Unit 3 "Staying Healthy" – Kickoff island.
   Written from the unit's big idea (How do our bodies work?) and its genres; no text copied from the book. English + Arabic. */
(function () {
  const BODY = [
    ['heart', 'pumps blood around your body', '❤️', 'Your heart beats faster when you run.', 'القلب'],
    ['lungs', 'help you breathe in air', '🫁', 'Your lungs fill with air when you breathe in.', 'الرئتان'],
    ['brain', 'helps you think, learn and remember', '🧠', 'Your brain helps you solve problems.', 'الدماغ'],
    ['muscles', 'help your body move', '💪', 'Exercise makes your muscles strong.', 'العضلات'],
    ['bones', 'hold your body up and protect it', '🦴', 'Milk helps build strong bones.', 'العظام'],
    ['stomach', 'breaks down the food you eat', '🍽️', 'Your stomach starts working after you eat.', 'المعدة'],
    ['exercise', 'moving your body to keep it strong', '🏃', 'We exercise at school every day.', 'التمارين الرياضية'],
    ['energy', 'the power your body needs to move and play', '⚡', 'Healthy food gives you energy.', 'الطاقة'],
    ['germs', 'tiny living things that can make you sick', '🦠', 'Washing your hands washes germs away.', 'الجراثيم'],
    ['healthy', 'strong and well, not sick', '💚', 'Fruit and water keep you healthy.', 'صحّي / بصحة جيدة'],
  ];
  const GENRES = {
    'realistic fiction': ['a made-up story that COULD really happen', 'قصة خيالية لكنها يمكن أن تحدث في الواقع'],
    'informational text': ['true facts that teach you about a topic', 'نص معلوماتي فيه حقائق صحيحة عن موضوع'],
    'science article': ['true facts about science, like how the body works', 'مقالة علمية فيها حقائق عن العلوم مثل كيف يعمل الجسم'],
    'fantasy': ['a story that could NOT really happen, with magic or impossible things', 'قصة خيالية لا يمكن أن تحدث في الواقع، فيها سحر أو أشياء مستحيلة'],
    'narrative poetry': ['a poem that tells a story', 'شعر قصصي: قصيدة تحكي قصة'],
  };
  const g = (q, qAr, ans, why, whyAr, pic) => ({ q, qAr, pic, opts: Object.keys(GENRES), ans, why, whyAr,
    hint: 'Ask yourself: Is it true? Could it really happen? Does it rhyme like a poem?', hintAr: 'اسألي نفسكِ: هل هو حقيقي؟ هل يمكن أن يحدث فعلاً؟ هل له قافية مثل القصيدة؟' });

  addLesson({
    id: 'u3-kickoff', island: 'healthy', added: '2026-11-03', pic: '🏃',
    title: 'Unit 3 Kickoff: Staying Healthy', sub: 'How do our bodies work? Story types in this unit',
    words: BODY.map(w => [w[0], w[2], w[1], w[3], w[4]]),
    learn: [
      { title: 'Big idea: How do our bodies work?', titleAr: 'الفكرة الكبيرة: كيف تعمل أجسامنا؟',
        text: 'In this unit you will read stories and articles about your body and how to keep it healthy. Tap each body part!',
        textAr: 'في هذه الوحدة ستقرئين قصصاً ومقالات عن جسمكِ وكيف تحافظين على صحته. اضغطي على كل جزء من الجسم!',
        show: { kind: 'chips', items: [['❤️', 'heart'], ['🫁', 'lungs'], ['🧠', 'brain'], ['💪', 'muscles'], ['🦴', 'bones']] } },
      { title: 'Body words', titleAr: 'كلمات عن الجسم',
        text: 'Tap each card to flip it and learn what the word means.', textAr: 'اضغطي على كل بطاقة لتقلبيها وتعرفي معنى الكلمة بالعربي.',
        show: { kind: 'flashgrid' } },
      { title: 'How to stay healthy', titleAr: 'كيف نحافظ على صحتنا',
        text: 'Eat healthy food, drink water, exercise, sleep well and wash your hands.',
        textAr: 'كُلي طعاماً صحياً، واشربي الماء، ومارسي الرياضة، ونامي جيداً، واغسلي يديكِ.',
        show: { kind: 'chips', items: [['🥦', 'healthy food'], ['💧', 'water'], ['🏃', 'exercise'], ['😴', 'sleep'], ['🧼', 'wash hands']] } },
      { title: 'Story types in this unit', titleAr: 'أنواع النصوص في هذه الوحدة',
        text: '<b>Realistic fiction</b>: made up, but it could happen. <b>Fantasy</b>: it could NOT happen. <b>Informational text</b> and <b>science articles</b>: true facts. <b>Narrative poetry</b>: a poem that tells a story.',
        textAr: '<b>Realistic fiction</b>: قصة من الخيال لكن يمكن أن تحدث. <b>Fantasy</b>: لا يمكن أن تحدث أبداً. <b>Informational text</b> و<b>science article</b>: حقائق صحيحة. <b>Narrative poetry</b>: قصيدة تحكي قصة.',
        show: { kind: 'chips', items: [['🚲', 'realistic fiction'], ['🤖', 'fantasy'], ['📊', 'informational text'], ['🔬', 'science article'], ['🎵', 'narrative poetry']] } },
      { title: 'Could it really happen?', titleAr: 'هل يمكن أن يحدث فعلاً؟',
        text: 'A girl learns to ride her bike: that could happen, so it is <b>realistic fiction</b>. Tiny robots swim inside your body and talk: that could NOT happen, so it is <b>fantasy</b>.',
        textAr: 'بنت تتعلّم ركوب الدراجة: هذا يمكن أن يحدث، إذن هي <b>realistic fiction</b>. روبوتات صغيرة تسبح داخل الجسم وتتكلّم: هذا لا يمكن أن يحدث، إذن هي <b>fantasy</b>.',
        show: { kind: 'html', html: '<div class="row" style="justify-content:center;gap:22px"><div class="ochip pop" style="flex-direction:column"><i>🚲👧</i>could happen<br><b style="color:#22B566">realistic fiction</b></div><div class="ochip pop" style="flex-direction:column;animation-delay:.9s"><i>🤖🫀</i>could NOT happen<br><b style="color:#7C4DFF">fantasy</b></div></div>' } },
    ],
    acts: [
      { type: 'match', title: 'Body words', pick: 5, pairs: BODY },
      {
        type: 'sort', title: 'Healthy or not?', pick: 10,
        ask: 'Drag each habit into the right box.', askAr: 'اسحبي كل عادة إلى الصندوق الصحيح.',
        start: 'Which habits keep your body healthy?', startAr: 'أي العادات تحافظ على صحة جسمكِ؟',
        hint: 'Does {w} make your body stronger, or could it make you tired or sick?', hintAr: 'هل {w} تجعل جسمكِ أقوى، أم قد تجعلكِ متعبة أو مريضة؟',
        buckets: [
          { label: 'Healthy', labelAr: 'عادة صحية', pic: '💚', why: '{w} keeps your body healthy!', whyAr: '{w} تحافظ على صحة جسمكِ!' },
          { label: 'Not healthy', labelAr: 'عادة غير صحية', pic: '🚫', why: '{w} is not good for your body.', whyAr: '{w} ليست جيدة لجسمكِ.' },
        ],
        items: [['🥦 eat vegetables', 0], ['💧 drink water', 0], ['😴 sleep early', 0], ['🏃 play outside', 0], ['🧼 wash hands', 0], ['🪥 brush teeth', 0], ['🍎 eat fruit', 0], ['🚴 ride a bike', 0],
          ['🍬 lots of candy', 1], ['📺 TV all day', 1], ['🌙 stay up late', 1], ['🥤 sugary drinks', 1], ['🍟 only fast food', 1], ['⏭️ skip breakfast', 1]],
      },
      {
        type: 'mc', title: 'What kind of text?', pick: 6,
        start: 'Read the clue and choose the story type.', startAr: 'اقرئي الوصف واختاري نوع النص.',
        items: [
          g('A boy practices football every day to get better.', 'ولد يتمرّن على كرة القدم كل يوم ليتحسّن.', 'realistic fiction', 'This could really happen, but it is a made-up story. That is <b>realistic fiction</b>.', 'هذا يمكن أن يحدث فعلاً لكنها قصة مؤلَّفة، إذن هي <b>realistic fiction</b>.', '⚽'),
          g('A tiny robot shrinks and travels inside a girl\'s body.', 'روبوت صغير ينكمش ويسافر داخل جسم بنت.', 'fantasy', 'A robot cannot really shrink and travel inside a body. It could NOT happen, so it is <b>fantasy</b>.', 'الروبوت لا يمكنه أن ينكمش ويسافر داخل الجسم. هذا لا يحدث في الواقع، إذن هي <b>fantasy</b>.', '🤖'),
          g('Facts about how your brain helps you learn, with diagrams.', 'حقائق عن كيف يساعدكِ الدماغ على التعلّم، مع رسومات.', 'science article', 'True facts about science (the brain) are a <b>science article</b>.', 'حقائق صحيحة عن العلوم (الدماغ) هي <b>science article</b>.', '🧠'),
          g('A poem with rhyming lines that tells about two friends in a race.', 'قصيدة لها قافية تحكي عن صديقتين في سباق.', 'narrative poetry', 'It is a poem AND it tells a story. That is <b>narrative poetry</b>.', 'إنها قصيدة وتحكي قصة أيضاً، إذن هي <b>narrative poetry</b>.', '🎵'),
          g('Facts and photos about why sleep and food keep kids healthy.', 'حقائق وصور عن لماذا يحافظ النوم والطعام على صحة الأطفال.', 'informational text', 'True facts that teach about a topic make <b>informational text</b>.', 'الحقائق الصحيحة التي تعلّمنا عن موضوع هي <b>informational text</b>.', '📊'),
          g('A girl saves money and fixes up an old bicycle with her grandpa.', 'بنت توفّر المال وتصلح دراجة قديمة مع جدّها.', 'realistic fiction', 'This could really happen, but the story is made up: <b>realistic fiction</b>.', 'هذا يمكن أن يحدث لكن القصة مؤلَّفة: <b>realistic fiction</b>.', '🚲'),
          g('A talking cat flies to the moon on a magic carpet.', 'قطة تتكلّم تطير إلى القمر على بساط سحري.', 'fantasy', 'Cats cannot talk or fly on magic carpets. It is <b>fantasy</b>.', 'القطط لا تتكلّم ولا تطير على بساط سحري، إذن هي <b>fantasy</b>.', '🐱'),
          g('An article that explains how your heart pumps blood.', 'مقالة تشرح كيف يضخّ القلب الدم.', 'science article', 'It explains real science about the heart: a <b>science article</b>.', 'تشرح علوماً حقيقية عن القلب: <b>science article</b>.', '❤️'),
        ].map(it => Object.assign(it, { q: `<span class="hl">${it.q}</span><br>What kind of text is this?`, qAr: `«${it.qAr}» ما نوع هذا النص؟` })),
      },
      {
        type: 'fill', title: 'Healthy words', pick: 6,
        start: 'Which body word fits the gap?', startAr: 'أي كلمة تناسب الفراغ؟',
        bank: BODY.map(w => w[0]),
        items: [
          { s: 'My ___ beats fast after I run.', ans: 'heart', pic: '❤️', sAr: 'قلبي يدقّ بسرعة بعد الركض.' },
          { s: 'I breathe in air with my ___.', ans: 'lungs', pic: '🫁', sAr: 'أتنفّس الهواء برئتيّ.' },
          { s: 'My ___ helps me think and remember.', ans: 'brain', pic: '🧠', sAr: 'دماغي يساعدني على التفكير والتذكّر.' },
          { s: 'Lifting and running make my ___ strong.', ans: 'muscles', pic: '💪', sAr: 'الرفع والركض يقوّيان عضلاتي.' },
          { s: 'Wash your hands to get rid of ___.', ans: 'germs', pic: '🧼', sAr: 'اغسلي يديكِ لتتخلّصي من الجراثيم.' },
          { s: 'A good breakfast gives me ___ to play.', ans: 'energy', pic: '⚡', sAr: 'الفطور الجيد يعطيني طاقة لألعب.' },
          { s: 'We ___ every day to stay strong.', ans: 'exercise', pic: '🏃', sAr: 'نمارس الرياضة كل يوم لنبقى أقوياء.' },
          { s: 'Milk helps build strong ___.', ans: 'bones', pic: '🥛', sAr: 'الحليب يساعد على بناء عظام قوية.' },
          { s: 'Fruit, water and sleep keep me ___.', ans: 'healthy', pic: '🍎', sAr: 'الفاكهة والماء والنوم تحافظ على صحتي.' },
        ].map(it => { const w = BODY.find(b => b[0] === it.ans); return Object.assign(it, { why: `<b>${w[0]}</b>: ${w[1]}.`, whyAr: `<b>${w[0]}</b> تعني: ${w[4]}.` }); }),
      },
    ],
  });
})();
