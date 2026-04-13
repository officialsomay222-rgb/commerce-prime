const { performance } = require('perf_hooks');

const subjects = [
  { id: 'Accountancy', color: 'bg-blue-500' },
  { id: 'Economics', color: 'bg-emerald-500' },
  { id: 'Mathematics', color: 'bg-indigo-500' },
  { id: 'Business Studies', color: 'bg-orange-500' },
  { id: 'AI Loki', color: 'bg-brand-primary' },
];

const subjectColorMap = {
  'Accountancy': 'bg-blue-500',
  'Economics': 'bg-emerald-500',
  'Mathematics': 'bg-indigo-500',
  'Business Studies': 'bg-orange-500',
  'AI Loki': 'bg-brand-primary',
};

const ITERATIONS = 10000000;
const activeSubject = 'AI Loki'; // worst case for array find (last element)

// Baseline: Array.find()
const startFind = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  const color = subjects.find(s => s.id === activeSubject)?.color;
}
const endFind = performance.now();
const timeFind = endFind - startFind;

// Optimized: Object lookup
const startLookup = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
  const color = subjectColorMap[activeSubject];
}
const endLookup = performance.now();
const timeLookup = endLookup - startLookup;

console.log(`Baseline (Array.find): ${timeFind.toFixed(2)} ms`);
console.log(`Optimized (Object lookup): ${timeLookup.toFixed(2)} ms`);
console.log(`Improvement: ${(timeFind / timeLookup).toFixed(2)}x faster`);
