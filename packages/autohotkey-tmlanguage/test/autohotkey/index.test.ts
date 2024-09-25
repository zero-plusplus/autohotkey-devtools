import { RuleName, ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('autohotkey', () => {
  const scopeName: ScopeName = 'autohotkey';
  const { name } = createUtilities(scopeName);
  const { name: name_ahk2 } = createUtilities('autohotkey2');
  const { name: name_ahknext } = createUtilities('autohotkeynext');

  test('if #Requires is not used, treat as "autohotkey2".', async() => {
    const actual = await parse(scopeName, `'string'`);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.SingleString) },
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringEnd) },
    ]);
  });

  test('treat as "autohotkeynext" using #Requires', async() => {
    const actual = await parse(scopeName, `
      #Requires AutoHotkey v2.1
      'string'
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v2.1`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `'`, scopes: name_ahknext(RuleName.SingleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahknext(RuleName.SingleString) },
      { text: `'`, scopes: name_ahknext(RuleName.SingleString, RuleName.StringEnd) },
      { text: `\n`, scopes: '' },
      { text: `    `, scopes: '' },
    ]);
  });

  test('treat as "autohotkey2" using #Requires', async() => {
    const actual = await parse(scopeName, `
      #Requires AutoHotkey v2.0
      'string'
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v2.0`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.SingleString) },
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringEnd) },
      { text: `\n`, scopes: '' },
      { text: `    `, scopes: '' },
    ]);
  });

  test('treat as "autohotkeyl" using #Requires', async() => {
    const actual = await parse(scopeName, `
      #Requires AutoHotkey v1.1
      'string'
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v1.1`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      'string'`, scopes: '' },
      { text: `\n`, scopes: '' },
      { text: `    `, scopes: '' },
    ]);
  });

  test('treat as "autohotkeynext", "autohotkey2", "autohotkeyl" using #Requires', async() => {
    const actual = await parse(scopeName, `
      #Requires AutoHotkey v2.1
      'string'
      #Requires AutoHotkey v2.0
      'string'
      #Requires AutoHotkey v1.1
      'string'
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v2.1`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `'`, scopes: name_ahknext(RuleName.SingleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahknext(RuleName.SingleString) },
      { text: `'`, scopes: name_ahknext(RuleName.SingleString, RuleName.StringEnd) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },

      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v2.0`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.SingleString) },
      { text: `'`, scopes: name_ahk2(RuleName.SingleString, RuleName.StringEnd) },
      { text: `\n`, scopes: '' },
      { text: `      `, scopes: '' },

      { text: `#Requires`, scopes: name(RuleName.Emphasis, RuleName.Directive) },
      { text: ` `, scopes: '' },
      { text: `AutoHotkey v1.1`, scopes: name(RuleName.Emphasis, RuleName.LegacyExpressionContent) },
      { text: `\n`, scopes: '' },
      { text: `      'string'`, scopes: '' },
      { text: `\n`, scopes: '' },
      { text: `    `, scopes: '' },
    ]);
  });
});
