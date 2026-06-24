export const ruleNames = [
  // 'perfectionist/sort-array-includes',
  // 'perfectionist/sort-arrays',
  // 'perfectionist/sort-classes',
  // 'perfectionist/sort-decorators',
  // 'perfectionist/sort-enums',
  'perfectionist/sort-export-attributes',
  'perfectionist/sort-exports',
  'perfectionist/sort-heritage-clauses',
  'perfectionist/sort-import-attributes',
  'perfectionist/sort-imports',
  // 'perfectionist/sort-interfaces',
  // 'perfectionist/sort-intersection-types',
  // 'perfectionist/sort-jsx-props',
  // 'perfectionist/sort-maps',
  // 'perfectionist/sort-modules',
  'perfectionist/sort-named-exports',
  'perfectionist/sort-named-imports',
  // 'perfectionist/sort-object-types',
  // 'perfectionist/sort-objects',
  // 'perfectionist/sort-sets',
  // 'perfectionist/sort-switch-case',
  // 'perfectionist/sort-union-types',
  // 'perfectionist/sort-variable-declarations',
];

const defaultRuleValue = 'error';
export const rules = Object.fromEntries(ruleNames.map((ruleName) => [ ruleName, defaultRuleValue ]));
