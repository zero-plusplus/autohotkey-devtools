const typescriptPlugin = require('@typescript-eslint/eslint-plugin');

const globals = require('globals');
const typescriptParser = require('@typescript-eslint/parser');
const { rules: tsAllRules } = require('./all/typescript-eslint.js');
const { ruleNames: eslintAllRuleNames } = require('./all/eslint.js');
const { rules: myJsRules } = require('./js.js');
const common = require('./common.js');

module.exports.rules = {
  ...tsAllRules,

  // Turn off javscript rules overridden by typescript-eslint/eslint-plugin
  ...Object.fromEntries(eslintAllRuleNames.flatMap((ruleName) => {
    if (`@typescript-eslint/${ruleName}` in tsAllRules) {
      return [ [ ruleName, 'off' ] ];
    }
    return [];
  })),

  // Overridden rules by typescript-eslint are overridden by javascript my rule values
  // e.g. no-array-constructor -> @typescript-eslint/no-array-constructor
  ...Object.fromEntries(eslintAllRuleNames.flatMap((jsRuleName) => {
    const tsRuleName = `@typescript-eslint/${jsRuleName}`;
    if (tsRuleName in tsAllRules) {
      const jsRuleValue = myJsRules[jsRuleName];
      return [ [ tsRuleName, jsRuleValue ] ];
    }
    return [];
  })),

  '@typescript-eslint/array-type': [ 'error', { default: 'array-simple' } ],
  '@typescript-eslint/ban-tslint-comment': 'off',
  '@typescript-eslint/class-literal-property-style': [ 'error', 'fields' ],
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/consistent-type-imports': 'off',
  '@typescript-eslint/explicit-member-accessibility': [ 'error', { overrides: { constructors: 'no-public' } } ],
  '@typescript-eslint/explicit-module-boundary-types': [ 'error', { allowArgumentsExplicitlyTypedAsAny: true } ],
  '@typescript-eslint/naming-convention': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-floating-promises': 'off',
  '@typescript-eslint/no-invalid-void-type': 'off',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/no-unnecessary-condition': [ 'error', { allowConstantLoopConditions: true } ],
  '@typescript-eslint/no-unnecessary-type-parameters': 'off',
  '@typescript-eslint/no-unsafe-call': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-use-before-define': [ 'error', { functions: false, classes: false, enums: false } ],
  '@typescript-eslint/prefer-enum-initializers': 'off',
  '@typescript-eslint/prefer-readonly-parameter-types': 'off',
  '@typescript-eslint/prefer-regexp-exec': 'off',
  '@typescript-eslint/restrict-template-expressions': [ 'error', { allowNumber: true, allowBoolean: true } ],
  '@typescript-eslint/sort-type-constituents': 'off',
  '@typescript-eslint/strict-boolean-expressions': 'off',
  '@typescript-eslint/switch-exhaustiveness-check': 'off',
  '@typescript-eslint/typedef': 'off',
};
module.exports.config = (tsconfigRootDir) => {
  return [
    ...common.config(),
    {
      plugins: {
        '@typescript-eslint': typescriptPlugin,
      },
      languageOptions: {
        parser: typescriptParser,
        globals: globals.node,
        parserOptions: {
          project: true,
          tsconfigRootDir,
        },
      },
      files: [
        '**/*.ts',
        '**/*.cts',
        '**/*.mts',
      ],
      rules: {
        ...module.exports.rules,
      },
    },
  ];
};
