const jestPlugin = require('eslint-plugin-jest');
const stylisticPlugin = require('@stylistic/eslint-plugin');
const styles = require('./all/stylistic');
const jest = require('./all/jest');

const indentSize = 2;
module.exports.config = (indent = indentSize) => {
  return [
    {
      plugins: {
        '@stylistic': stylisticPlugin,
      },
      rules: {
        ...styles.rules,

        '@stylistic/array-bracket-newline': [ 'error', 'consistent' ],
        '@stylistic/array-bracket-spacing': [ 'error', 'always' ],
        '@stylistic/array-element-newline': [ 'error', 'consistent' ],
        '@stylistic/brace-style': [ 'error', 'stroustrup' ],
        '@stylistic/comma-dangle': [ 'error', 'always-multiline' ],
        '@stylistic/comma-spacing': [ 'error', { before: false, after: true } ],
        '@stylistic/comma-style': [ 'error', 'last' ],
        '@stylistic/computed-property-spacing': [ 'error', 'never' ],
        '@stylistic/dot-location': [ 'error', 'property' ],
        '@stylistic/eol-last': [ 'error', 'always' ],
        '@stylistic/func-call-spacing': [ 'error', 'never' ],
        '@stylistic/function-call-argument-newline': [ 'error', 'consistent' ],
        '@stylistic/function-paren-newline': [ 'error', 'consistent' ],
        '@stylistic/generator-star-spacing': [ 'error', { before: false, after: true } ],
        '@stylistic/implicit-arrow-linebreak': [ 'error', 'beside' ],
        '@stylistic/indent': [ 'error', indent, { SwitchCase: 1 } ],
        '@stylistic/indent-binary-ops': [ 'error', indent ],
        '@stylistic/jsx-indent-props': [ 'error', indent ],
        '@stylistic/jsx-indent': [ 'error', indent ],
        '@stylistic/line-comment-position': 'off',
        '@stylistic/linebreak-style': [ 'error', 'windows' ],
        '@stylistic/lines-around-comment': 'off',
        '@stylistic/lines-between-class-members': 'off',
        '@stylistic/max-len': 'off',
        '@stylistic/max-statements-per-line': 'off',
        '@stylistic/multiline-comment-style': 'off',
        '@stylistic/multiline-ternary': 'off',
        '@stylistic/newline-per-chained-call': 'off',
        '@stylistic/no-extra-parens': 'off',
        '@stylistic/no-multi-spaces': [ 'error', { ignoreEOLComments: true } ],
        '@stylistic/no-multiple-empty-lines': [ 'error', { max: 2 } ],
        '@stylistic/no-trailing-spaces': 'off',
        '@stylistic/object-curly-newline': [ 'error', { multiline: true, consistent: true } ],
        '@stylistic/object-curly-spacing': [ 'error', 'always' ],
        '@stylistic/object-property-newline': [ 'error', { allowMultiplePropertiesPerLine: true } ],
        '@stylistic/one-var-declaration-per-line': 'off',
        '@stylistic/operator-linebreak': [ 'error', 'before' ],
        '@stylistic/padded-blocks': [ 'error', 'never' ],
        '@stylistic/padding-line-between-statements': 'off',
        '@stylistic/quote-props': [ 'error', 'consistent' ],
        '@stylistic/quotes': [ 'error', 'single', { allowTemplateLiterals: true } ],
        '@stylistic/semi': [ 'error', 'always' ],
        '@stylistic/space-before-function-paren': [ 'error', 'never' ],
        '@stylistic/type-annotation-spacing': 'error',
      },
    },
    {
      plugins: {
        'jest': jestPlugin,
      },
      rules: {
        ...jest.rules,

        'jest/consistent-test-it': [ 'error', { fn: 'test', withinDescribe: 'test' } ],
        'jest/max-expects': 'off',
        'jest/prefer-expect-assertions': 'off',
        'jest/prefer-importing-jest-globals': 'off',
      },
    },
  ];
};
