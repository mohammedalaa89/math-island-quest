/* Our Literacy World G3, Unit 3 "Staying Healthy" – Lesson 2 "You and Your Brain" (science article).
   Our own article (not the book's): "Your Amazing Brain". Skills: science words (brain, nerves, signal, memory...),
   reading a diagram, cause and effect. English + Arabic. */
(function () {
  const Q = (q, qAr, opts, ans, why, whyAr, hint, hintAr, pic) => ({ q, qAr, opts, ans, why, whyAr, hint, hintAr, pic });
  const WORDS = [
    ['brain', '🧠', 'the body part in your head that thinks and controls your body', 'Your brain helps you learn.', 'الدماغ'],
    ['nerves', '〰️', 'tiny wire-like paths that carry messages in your body', 'Nerves go to your fingers and toes.', 'الأعصاب'],
    ['signal', '⚡', 'a message sent very fast through the nerves', 'A signal tells your hand to move.', 'إشارة'],
    ['memory', '💭', 'something your brain keeps so you can remember it', 'I have a happy memory of my birthday.', 'ذكرى / الذاكرة'],
    ['skull', '💀', 'the hard bone that protects your brain', 'Your skull is like a helmet.', 'الجمجمة'],
    ['spinal cord', '🦴', 'a thick bundle of nerves inside your backbone', 'The spinal cord connects the brain to the body.', 'الحبل الشوكي'],
    ['senses', '👀', 'seeing, hearing, smelling, tasting and touching', 'We use our senses to learn about the world.', 'الحواس'],
    ['diagram', '🗺️', 'a picture with labels that shows how something works', 'The diagram shows the parts of the brain.', 'رسم توضيحي'],
    ['protect', '🛡️', 'to keep something safe', 'A helmet protects your head.', 'يحمي'],
  ];
  const DIAGRAM = `<svg viewBox="0 0 300 230" style="width:100%;max-width:330px" role="img" aria-label="Diagram of brain, spinal cord and nerves">
    <circle cx="110" cy="45" r="32" fill="#FFD9C2" stroke="#C9601F" stroke-width="3"/><text x="110" y="56" text-anchor="middle" font-size="30">🧠</text>
    <rect x="104" y="78" width="12" height="100" rx="6" fill="#F0466B"/>
    <path d="M110 100 L60 135 M110 100 L160 135 M110 178 L80 222 M110 178 L140 222 M60 135 L40 165 M160 135 L180 165" stroke="#7C4DFF" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g font-family="Nunito,sans-serif" font-weight="800" font-size="14" fill="#1E2A44">
      <line x1="142" y1="40" x2="196" y2="30" stroke="#1E2A44"/><text x="200" y="34">brain</text>
      <line x1="118" y1="150" x2="196" y2="110" stroke="#1E2A44"/><text x="200" y="114">spinal cord</text>
      <line x1="170" y1="150" x2="196" y2="170" stroke="#1E2A44"/><text x="200" y="174">nerves</text>
      <line x1="82" y1="30" x2="40" y2="14" stroke="#1E2A44"/><text x="4" y="12">skull</text></g></svg>`;

  addLesson({
    id: 'e-l2', island: 'e-l2', added: '2026-11-03', pic: '🧠',
    title: 'Lesson 2: You and Your Brain', sub: 'Science words, diagrams, cause and effect',
    words: WORDS,
    learn: [
      { title: 'Read: Your Amazing Brain', titleAr: 'اقرئي: دماغكِ المدهش',
        text: 'This is a <b>science article</b>: true facts about how your body works. Tap each sentence to hear it.',
        textAr: 'هذه مقالة علمية (<b>science article</b>): حقائق صحيحة عن كيف يعمل جسمكِ. اضغطي على كل جملة لتسمعيها.',
        show: { kind: 'read', pic: '🧠⚡🖐️', lines: [
          'Your <b>brain</b> is inside your head.',
          'A hard bone called the <b>skull</b> protects it.',
          'Your brain is the boss of your whole body.',
          'It is connected to your body by <b>nerves</b>.',
          'Nerves are like tiny wires that carry messages called <b>signals</b>.',
          'When you touch something hot, a signal races up to your brain.',
          'Your brain quickly sends a signal back: "Move your hand!"',
          'Because signals are so fast, you pull your hand away in less than a second.',
          'Your brain also keeps <b>memories</b>, like your best friend\'s name.',
          'When you learn something new, your brain makes new connections.',
          'Sleep helps your brain save what you learned.',
          'So sleep well, eat healthy food and keep learning!',
        ], linesAr: [
          'دماغكِ موجود داخل رأسكِ.',
          'عظمة صلبة اسمها الجمجمة تحميه.',
          'دماغكِ هو مدير جسمكِ كله.',
          'إنه متّصل بجسمكِ عن طريق الأعصاب.',
          'الأعصاب مثل أسلاك صغيرة جداً تحمل رسائل اسمها الإشارات.',
          'عندما تلمسين شيئاً ساخناً، تسرع إشارة إلى دماغكِ.',
          'يرسل دماغكِ إشارة بسرعة: «حرّكي يدكِ!»',
          'لأن الإشارات سريعة جداً، تسحبين يدكِ في أقل من ثانية.',
          'دماغكِ يحفظ الذكريات أيضاً، مثل اسم صديقتكِ المفضّلة.',
          'عندما تتعلّمين شيئاً جديداً، يصنع دماغكِ روابط جديدة.',
          'النوم يساعد دماغكِ على حفظ ما تعلّمتِه.',
          'لذلك نامي جيداً، وكُلي طعاماً صحياً، واستمرّي في التعلّم!',
        ] } },
      { title: 'Science words', titleAr: 'كلمات علمية (science words)',
        text: 'Science articles use special words. Tap each card to flip it and learn the word.',
        textAr: 'المقالات العلمية فيها كلمات خاصة. اضغطي على كل بطاقة لتقلبيها وتتعلّمي معناها.',
        show: { kind: 'flashgrid' } },
      { title: 'Read the diagram', titleAr: 'اقرئي الرسم التوضيحي (diagram)',
        text: 'A <b>diagram</b> is a picture with <b>labels</b>. The lines point to each part. Find the brain, the spinal cord and the nerves.',
        textAr: 'الرسم التوضيحي (<b>diagram</b>) صورة فيها أسماء (<b>labels</b>). الخطوط تشير إلى كل جزء. جدي الدماغ والحبل الشوكي والأعصاب.',
        show: { kind: 'html', html: DIAGRAM } },
      { title: 'Cause and effect', titleAr: 'السبب (cause) والنتيجة (effect)',
        text: 'A <b>cause</b> is WHY something happens. The <b>effect</b> is WHAT happens. Clue words: <b>because</b>, <b>so</b>, <b>when</b>.',
        textAr: 'السبب (<b>cause</b>) هو لماذا حدث الشيء. والنتيجة (<b>effect</b>) هي ماذا حدث. كلمات تساعدكِ: <b>because</b> (لأن)، <b>so</b> (لذلك)، <b>when</b> (عندما).',
        show: { kind: 'html', html: '<div class="stack" style="gap:10px;align-items:center">' + [['🔥🖐️', 'You touch something hot.', '🖐️💨', 'You pull your hand away.'], ['😴', 'You sleep well.', '🧠💾', 'Your brain saves what you learned.'], ['📚', 'You learn something new.', '🔗', 'Your brain makes new connections.']].map((r, j) => `<div class="row pop" style="justify-content:center;animation-delay:${j * .9}s"><span class="ochip" style="max-width:150px"><i>${r[0]}</i><span><b style="color:#F0466B">Cause</b><br>${r[1]}</span></span><b>➜</b><span class="ochip" style="max-width:150px"><i>${r[2]}</i><span><b style="color:#22B566">Effect</b><br>${r[3]}</span></span></div>`).join('') + '</div>' } },
    ],
    acts: [
      {
        type: 'mc', title: 'Brain facts', pick: 7,
        start: 'Think about "Your Amazing Brain". Pick the best answer.', startAr: 'فكّري في مقالة «دماغكِ المدهش». اختاري أفضل إجابة.',
        items: [
          Q('What protects your brain?', 'ما الذي يحمي دماغكِ؟', ['the skull', 'the nerves', 'a signal', 'a memory'], 'the skull',
            '"A hard bone called the <b>skull</b> protects it."', '«عظمة صلبة اسمها <b>الجمجمة</b> تحميه».',
            'Look for a hard bone in the article.', 'ابحثي عن عظمة صلبة في المقالة.', '🛡️'),
          Q('What do nerves carry?', 'ماذا تحمل الأعصاب؟', ['signals', 'food', 'water', 'bones'], 'signals',
            '"Nerves are like tiny wires that carry messages called <b>signals</b>."', '«الأعصاب مثل أسلاك صغيرة تحمل رسائل اسمها <b>الإشارات</b>».',
            'Nerves are like tiny wires. What do wires carry?', 'الأعصاب مثل الأسلاك. ماذا تحمل الأسلاك؟', '〰️'),
          Q('Why does the article call the brain "the boss"?', 'لماذا تسمّي المقالة الدماغ «المدير»؟', ['It controls the whole body.', 'It is the biggest bone.', 'It pumps blood.', 'It helps you breathe air.'], 'It controls the whole body.',
            '"Your brain is the boss of <b>your whole body</b>." It tells the body what to do.', '«دماغكِ مدير <b>جسمكِ كله</b>». إنه يخبر الجسم ماذا يفعل.',
            'What does a boss do?', 'ماذا يفعل المدير؟', '👑'),
          Q('<b>Cause:</b> You touch something hot. What is the <span class="hl">effect</span>?', 'السبب: تلمسين شيئاً ساخناً. ما النتيجة (effect)؟', ['You pull your hand away fast.', 'You fall asleep.', 'You remember a friend.', 'Your skull gets hard.'], 'You pull your hand away fast.',
            'The brain sends a signal back, so <b>you pull your hand away</b> in less than a second.', 'يرسل الدماغ إشارة، <b>فتسحبين يدكِ</b> في أقل من ثانية.',
            'What does the brain tell your hand to do?', 'ماذا يطلب الدماغ من يدكِ أن تفعل؟', '🔥'),
          Q('<b>Effect:</b> Your brain saves what you learned. What is the <span class="hl">cause</span>?', 'النتيجة: دماغكِ يحفظ ما تعلّمتِه. ما السبب (cause)؟', ['You sleep well.', 'You touch something hot.', 'You eat candy.', 'You stay up all night.'], 'You sleep well.',
            '"<b>Sleep</b> helps your brain save what you learned."', '«<b>النوم</b> يساعد دماغكِ على حفظ ما تعلّمتِه».',
            'Which healthy habit helps your brain at night?', 'أي عادة صحية تساعد دماغكِ في الليل؟', '😴'),
          Q('Why can you pull your hand away in less than a second?', 'لماذا تستطيعين سحب يدكِ في أقل من ثانية؟', ['because signals are very fast', 'because your hand is cold', 'because the skull is hard', 'because you are sleeping'], 'because signals are very fast',
            '"<b>Because signals are so fast</b>, you pull your hand away in less than a second."', '«<b>لأن الإشارات سريعة جداً</b>، تسحبين يدكِ في أقل من ثانية».',
            'Find the clue word "Because" in the article.', 'ابحثي عن كلمة "Because" في المقالة.', '⚡'),
          Q('What happens when you learn something new?', 'ماذا يحدث عندما تتعلّمين شيئاً جديداً؟', ['Your brain makes new connections.', 'Your nerves fall asleep.', 'Your skull gets bigger.', 'You forget your name.'], 'Your brain makes new connections.',
            '"When you learn something new, your brain <b>makes new connections</b>."', '«عندما تتعلّمين شيئاً جديداً، <b>يصنع دماغكِ روابط جديدة</b>».',
            'Find the sentence that starts with "When you learn".', 'جدي الجملة التي تبدأ بـ "When you learn".', '🔗'),
          Q('Which is a <span class="hl">memory</span>?', 'أي من هذه ذكرى (memory)؟', ['your best friend\'s name', 'a hot pan', 'your skull', 'a nerve'], 'your best friend\'s name',
            '"Your brain also keeps memories, like <b>your best friend\'s name</b>."', '«دماغكِ يحفظ الذكريات، مثل <b>اسم صديقتكِ المفضّلة</b>».',
            'A memory is something you remember.', 'الذكرى شيء تتذكّرينه.', '💭'),
          Q('Look at the diagram. What connects the brain to the nerves in the body?', 'انظري إلى الرسم. ما الذي يصل الدماغ بالأعصاب في الجسم؟', ['the spinal cord', 'the skull', 'the heart', 'the stomach'], 'the spinal cord',
            'The long line under the brain is labelled <b>spinal cord</b>. The nerves branch out from it.', 'الخط الطويل تحت الدماغ اسمه <b>spinal cord</b> (الحبل الشوكي)، والأعصاب تتفرّع منه.',
            'Follow the long red line down from the brain. Read its label.', 'تتبّعي الخط الأحمر الطويل تحت الدماغ، واقرئي اسمه.', DIAGRAM),
          Q('Look at the diagram. What are the thin purple lines?', 'انظري إلى الرسم. ما الخطوط البنفسجية الرفيعة؟', ['nerves', 'bones', 'blood', 'hair'], 'nerves',
            'The label points to the thin lines: they are <b>nerves</b>.', 'الاسم يشير إلى الخطوط الرفيعة: إنها <b>nerves</b> (الأعصاب).',
            'Read the label next to the thin lines.', 'اقرئي الاسم بجانب الخطوط الرفيعة.', DIAGRAM),
          Q('What does a <span class="hl">diagram</span> show?', 'ماذا يُظهر الرسم التوضيحي (diagram)؟', ['a picture with labels that shows the parts', 'a list of rhyming words', 'a story with a problem', 'a page of questions'], 'a picture with labels that shows the parts',
            'A diagram is <b>a picture with labels</b> that shows the parts of something.', 'الرسم التوضيحي <b>صورة فيها أسماء</b> تُظهر أجزاء الشيء.',
            'Think about the brain picture in the lesson.', 'تذكّري صورة الدماغ في الدرس.', '🗺️'),
        ],
      },
      {
        type: 'sort', title: 'Brain, nerves or skull?', pick: 8,
        ask: 'Which body part does each job? Drag it there.', askAr: 'أي جزء من الجسم يقوم بكل عمل؟ اسحبيه إليه.',
        start: 'Use the article and the diagram to sort each job.', startAr: 'استخدمي المقالة والرسم لترتيب كل عمل.',
        hint: 'Does "{w}" think, carry messages, or keep something safe?', hintAr: 'هل «{w}» يفكّر، أم يحمل الرسائل، أم يحفظ شيئاً بأمان؟',
        buckets: [
          { label: 'Brain', labelAr: 'الدماغ', pic: '🧠', why: '"{w}": that is the <b>brain</b>, the boss of the body.', whyAr: '«{w}»: هذا هو <b>الدماغ</b>، مدير الجسم.' },
          { label: 'Nerves', labelAr: 'الأعصاب', pic: '〰️', why: '"{w}": those are the <b>nerves</b>, the body\'s tiny wires.', whyAr: '«{w}»: هذه هي <b>الأعصاب</b>، أسلاك الجسم الصغيرة.' },
          { label: 'Skull', labelAr: 'الجمجمة', pic: '💀', why: '"{w}": that is the <b>skull</b>, the hard bone around the brain.', whyAr: '«{w}»: هذه هي <b>الجمجمة</b>، العظمة الصلبة حول الدماغ.' },
        ],
        items: [['thinks and solves problems', 0], ['keeps memories', 0], ['is the boss of the body', 0], ['makes new connections', 0],
          ['carry signals', 1], ['go to fingers and toes', 1], ['are like tiny wires', 1], ['tell the brain "hot!"', 1],
          ['is a hard bone', 2], ['protects the brain', 2], ['is like a helmet', 2]],
      },
      { type: 'match', title: 'Science words', pick: 5, start: 'Match each science word to its meaning.', startAr: 'صِلي كل كلمة علمية بمعناها.',
        pairs: WORDS.map(w => [w[0], w[2], w[1], w[3], w[4]]) },
      {
        type: 'fill', title: 'Because and so', pick: 6,
        start: 'Find the word that completes the cause and effect.', startAr: 'جدي الكلمة التي تكمل السبب والنتيجة.',
        hint: 'Read it with "{w}". Does the cause really lead to that effect?', hintAr: 'اقرئيها مع «{w}». هل يؤدّي السبب فعلاً إلى هذه النتيجة؟',
        bank: ['brain', 'nerves', 'signal', 'skull', 'sleep', 'memory', 'hot'],
        items: [
          { s: 'I touched a hot pan, so a ___ raced to my brain.', ans: 'signal', pic: '⚡', sAr: 'لمستُ قدراً ساخناً، فأسرعت إشارة إلى دماغي.', why: 'A message in the nerves is a <b>signal</b>.', whyAr: 'الرسالة في الأعصاب هي <b>signal</b> (إشارة).' },
          { s: 'I wear a helmet because my ___ needs extra protection.', ans: 'brain', bank: ['brain', 'memory', 'signal', 'sleep'], pic: '🪖', sAr: 'ألبس خوذة لأن دماغي يحتاج حماية إضافية.', why: 'Helmets keep your head and your <b>brain</b> safe.', whyAr: 'الخوذة تحمي رأسكِ و<b>brain</b> (الدماغ).' },
          { s: 'Messages travel fast because ___ are like tiny wires.', ans: 'nerves', pic: '〰️', sAr: 'الرسائل تنتقل بسرعة لأن الأعصاب مثل أسلاك صغيرة.', why: '<b>Nerves</b> carry messages like wires.', whyAr: '<b>Nerves</b> (الأعصاب) تحمل الرسائل مثل الأسلاك.' },
          { s: 'The ___ is hard, so it protects the brain.', ans: 'skull', pic: '💀', sAr: 'الجمجمة صلبة، لذلك تحمي الدماغ.', why: 'The <b>skull</b> is the hard bone around the brain.', whyAr: '<b>skull</b> (الجمجمة) هي العظمة الصلبة حول الدماغ.' },
          { s: 'I got enough ___, so my brain saved what I learned.', ans: 'sleep', pic: '😴', sAr: 'نمتُ جيداً، فحفظ دماغي ما تعلّمتُه.', why: 'The article says <b>sleep</b> helps your brain save what you learned.', whyAr: 'تقول المقالة إن <b>sleep</b> (النوم) يساعد الدماغ على الحفظ.' },
          { s: 'I remember my first day of school. It is a happy ___.', ans: 'memory', pic: '💭', sAr: 'أتذكّر أول يوم في المدرسة. إنه ذكرى سعيدة.', why: 'Something you remember is a <b>memory</b>.', whyAr: 'الشيء الذي تتذكّرينه هو <b>memory</b> (ذكرى).' },
          { s: 'The soup was very ___, so I pulled my spoon away.', ans: 'hot', pic: '🍲', sAr: 'كان الحساء ساخناً جداً، فأبعدتُ ملعقتي.', why: 'Something <b>hot</b> is the cause. Pulling away is the effect.', whyAr: 'الشيء <b>hot</b> (الساخن) هو السبب، والابتعاد هو النتيجة.' },
          { s: 'My ___ is the boss of my whole body.', ans: 'brain', pic: '🧠', sAr: 'دماغي هو مدير جسمي كله.', why: 'The <b>brain</b> tells the whole body what to do.', whyAr: '<b>brain</b> (الدماغ) يخبر الجسم كله ماذا يفعل.' },
        ],
      },
    ],
  });
})();
