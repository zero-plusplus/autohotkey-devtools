const rules = require('eslint-style-rules');

module.exports = [
  ...rules.js.config(),
  ...rules.ts.config(__dirname),
];
