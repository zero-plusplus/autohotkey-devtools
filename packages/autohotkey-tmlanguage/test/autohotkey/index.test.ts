import { dedent } from '@zero-plusplus/utilities/src';
import { RuleDescriptor, RuleName } from '../../src/constants';
import { name } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('autohotkey', () => {
  test('if #Requires is not used, treat as "autohotkey2".', async() => {
    const actual = await parse('autohotkey', dedent`
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkey2', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.End) },
    ]);
  });

  test('treat as "autohotkeynext" using #Requires', async() => {
    const actual = await parse('autohotkey', dedent`
      #Requires AutoHotkey v2.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name('autohotkeynext', RuleName.DirectiveName) },
      { text: `AutoHotkey v2.1`, scopes: name('autohotkeynext', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkeynext', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkeynext', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkeynext', RuleName.DoubleString, RuleDescriptor.End) },
    ]);
  });

  test('treat as "autohotkey2" using #Requires', async() => {
    const actual = await parse('autohotkey', dedent`
      #Requires AutoHotkey v2.0
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name('autohotkey2', RuleName.DirectiveName) },
      { text: `AutoHotkey v2.0`, scopes: name('autohotkey2', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkey2', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.End) },
    ]);
  });

  test('treat as "autohotkeyl" using #Requires', async() => {
    const actual = await parse('autohotkey', dedent`
      #Requires AutoHotkey v1.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name('autohotkeyl', RuleName.DirectiveName) },
      { text: `AutoHotkey v1.1`, scopes: name('autohotkeyl', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkeyl', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkeyl', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkeyl', RuleName.DoubleString, RuleDescriptor.End) },
    ]);
  });

  test('treat as "autohotkeynext", "autohotkey2", "autohotkeyl" using #Requires', async() => {
    const actual = await parse('autohotkey', dedent`
      #Requires AutoHotkey v2.1
      "string"
      #Requires AutoHotkey v2.0
      "string"
      #Requires AutoHotkey v1.1
      "string"
    `);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual([
      { text: `#Requires`, scopes: name('autohotkeynext', RuleName.DirectiveName) },
      { text: `AutoHotkey v2.1`, scopes: name('autohotkeynext', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkeynext', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkeynext', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkeynext', RuleName.DoubleString, RuleDescriptor.End) },

      { text: `#Requires`, scopes: name('autohotkey2', RuleName.DirectiveName) },
      { text: `AutoHotkey v2.0`, scopes: name('autohotkey2', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkey2', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkey2', RuleName.DoubleString, RuleDescriptor.End) },

      { text: `#Requires`, scopes: name('autohotkeyl', RuleName.DirectiveName) },
      { text: `AutoHotkey v1.1`, scopes: name('autohotkeyl', RuleName.UnquotedString) },
      { text: `"`, scopes: name('autohotkeyl', RuleName.DoubleString, RuleDescriptor.Begin) },
      { text: 'string', scopes: name('autohotkeyl', RuleName.DoubleString) },
      { text: `"`, scopes: name('autohotkeyl', RuleName.DoubleString, RuleDescriptor.End) },
    ]);
  });
});
