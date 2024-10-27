import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('autohotkey', () => {
  const scopeName: ScopeName = 'autohotkey';
  const { name } = createUtilities(scopeName);
  const { name: name_ahkl } = createUtilities('autohotkeyl');
  const { name: name_ahk2 } = createUtilities('autohotkey2');
  const { name: name_ahknext } = createUtilities('autohotkeynext');

  test('if #Requires is not used, treat as "autohotkey2".', async() => {
    const actual = await parse(scopeName, `"string"`);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringEnd) },
    ]);
  });

  test('treat as "autohotkeynext" using #Requires', async() => {
    const actual = await parse(scopeName, dedent`
      #Requires AutoHotkey v2.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v2.1`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahknext(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahknext(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahknext(RuleName.DoubleString, RuleName.StringEnd) },
    ]);
  });

  test('treat as "autohotkey2" using #Requires', async() => {
    const actual = await parse(scopeName, dedent`
      #Requires AutoHotkey v2.0
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v2.0`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringEnd) },
    ]);
  });

  test('treat as "autohotkeyl" using #Requires', async() => {
    const actual = await parse(scopeName, dedent`
      #Requires AutoHotkey v1.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v1.1`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahkl(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahkl(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahkl(RuleName.DoubleString, RuleName.StringEnd) },
    ]);
  });

  test('treat as "autohotkeynext", "autohotkey2", "autohotkeyl" using #Requires', async() => {
    const actual = await parse(scopeName, dedent`
      #Requires AutoHotkey v2.1
      "string"
      #Requires AutoHotkey v2.0
      "string"
      #Requires AutoHotkey v1.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v2.1`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahknext(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahknext(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahknext(RuleName.DoubleString, RuleName.StringEnd) },
      { text: `\n` },

      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v2.0`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahk2(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahk2(RuleName.DoubleString, RuleName.StringEnd) },
      { text: `\n` },

      { text: `#Requires`, scopes: name(Repository.DirecitiveStatement, RuleName.DirectiveName, RuleName.Emphasis) },
      { text: ` ` },
      { text: `AutoHotkey v1.1`, scopes: name(Repository.DirecitiveStatement, RuleName.UnquotedString, RuleName.Emphasis) },
      { text: `\n` },
      { text: `"`, scopes: name_ahkl(RuleName.DoubleString, RuleName.StringBegin) },
      { text: 'string', scopes: name_ahkl(RuleName.DoubleString) },
      { text: `"`, scopes: name_ahkl(RuleName.DoubleString, RuleName.StringEnd) },
    ]);
  });
});
