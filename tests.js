/* School tests and worksheets the parent uploaded.
   play: where "Practice" goes (a lesson route like 'l-nouns', or a page like 'math.html').
   ref:  [button label, route] for the lessons she should study first. */
addTest({ id: 'math-quiz-1', subject: 'math', added: '2026-10-31', pic: '✖️', title: 'Grade 3 Math Practice Quiz', sub: 'Multiplication, division, fact families, word problems',
  play: 'math.html', ref: [['Lesson: multiplication with pictures', 'l-times-groups']] });

addTest({ id: 'grammar-revision', subject: 'english', added: '2026-11-03', pic: '🔤', title: 'Grammar Revision', sub: 'Common nouns, proper nouns, capital letters',
  play: 'l-nouns', ref: [['Lesson: big and small letters', 'l-big-small-letters'], ['Lesson: nouns', 'learn-nouns']] });
addTest({ id: 'phonics-revision', subject: 'english', added: '2026-11-03', pic: '🐌', title: 'Phonics Revision', sub: 'Long-a: a_e, ai, ay, ey, ea, eigh',
  play: 'l-long-a', ref: [['Lesson: the long-a sound', 'learn-long-a']] });
addTest({ id: 'vocab-review', subject: 'english', added: '2026-11-03', pic: '🪂', title: 'Vocabulary Review', sub: 'Young Adventurers words',
  play: 'l-adventure-words', ref: [['Lesson: adventure words', 'learn-adventure-words']] });
addTest({ id: 'story-review', subject: 'english', added: '2026-11-03', pic: '📚', title: 'Story Review', sub: 'Young Adventurers: biography, main idea, clues',
  play: 'l-young-adventurers', ref: [['Lesson: reading the story', 'learn-young-adventurers']] });
