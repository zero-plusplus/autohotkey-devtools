import rules from '@zero-plusplus/eslint-style-rules';

export default [
  ...rules.js.config(),
  ...rules.ts.config(import.meta.dirname),
];
