const rules = require('@zero-plusplus/eslint-style-rules');

module.exports = [
  ...rules.js.config(),
  ...rules.ts.config(__dirname),
];
