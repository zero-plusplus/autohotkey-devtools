import * as constants_v2 from '../autohotkey2/constants';

const additionalBuiltinVaribles = [
  // [v2.1-alpha.7](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.7)
  'A_KeybdHookInstalled',
  'A_MouseHookInstalled',

  // [v2.1-alpha.14](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.14)
  'A_HotIf',
] as const;
export const builtinVaribles: [ ...(typeof constants_v2.builtinVaribles), ...(typeof additionalBuiltinVaribles) ] = [
  ...constants_v2.builtinVaribles,
  ...additionalBuiltinVaribles,
];

const additionalBuiltInFunctionNames = [
  // [v2.1-alpha.1](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.1)
  'WinGetEnabled',
  'WinGetAlwaysOnTop',
  'ATan2',

  // [v2.1-alpha.9](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.9)
  'StructFromPtr',
] as const;
export const builtInFunctionNames: [ ...(typeof constants_v2.builtInFunctionNames), ...(typeof additionalBuiltInFunctionNames) ] = [
  ...constants_v2.builtInFunctionNames,
  ...additionalBuiltInFunctionNames,
];

const additionalDeprecatedBuiltinFunctionNames = [] as const;
export const deprecatedBuiltinFunctionNames: [ ...(typeof constants_v2.deprecatedBuiltinFunctionNames), ...(typeof additionalDeprecatedBuiltinFunctionNames) ] = [
  ...constants_v2.deprecatedBuiltinFunctionNames,
  ...additionalDeprecatedBuiltinFunctionNames,
];

const additionalDirectiveNames = [
  // [v2.1-alpha.11](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.11)
  '#Module',
] as const;
export const directiveNames: [ ...(typeof constants_v2.directiveNames), ...(typeof additionalDirectiveNames)] = [
  ...constants_v2.directiveNames,
  ...additionalDirectiveNames,
] as const;

const additionalBuiltInClassNames = [] as const;
export const builtInClassNames: [...(typeof constants_v2.builtInClassNames), ...(typeof additionalBuiltInClassNames) ] = [
  ...constants_v2.builtInClassNames,
  ...additionalBuiltInClassNames,
];
