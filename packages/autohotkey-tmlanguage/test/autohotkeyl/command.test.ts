import { RuleName, ScopeName } from '../../src/types';
import { createUtilities, getCommandInfos } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('command', () => {
  const scopeName: ScopeName = 'autohotkeyl';
  const { name } = createUtilities(scopeName);
  const commandInfos = getCommandInfos();

  test('command name', async() => {
    const commandNames = commandInfos.map(([ commandName ]) => commandName);
    const actual = await parse(scopeName, commandNames.join('\n'));
    // console.log(JSON.stringify(actual, undefined, 2));

    const expected = commandNames.flatMap((commandName, i) => {
      // eslint-disable-next-line jest/no-conditional-in-test
      return i === 0
        ? [ { text: commandName, scopes: name(RuleName.Command, RuleName.CommandName) } ]
        : [ { text: '\n' }, { text: commandName, scopes: name(RuleName.Command, RuleName.CommandName) } ];
    });

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    // comma separator
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: 'On', scopes: name(RuleName.Command, RuleName.CommandArgumentKeyword) },
      ],
    ],
    // space separator
    [
      'AutoTrim On', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ' ' },
        { text: 'On', scopes: name(RuleName.Command, RuleName.CommandArgumentKeyword) },
      ],
    ],
  ])('first separator', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    // valid
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: 'On', scopes: name(RuleName.Command, RuleName.CommandArgumentKeyword) },
      ],
    ],
    [
      'AutoTrim, %true% ; comment', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: '%', scopes: name(RuleName.Command, RuleName.Dereference, RuleName.DereferencePercentBegin) },
        { text: 'true', scopes: name(RuleName.Command, RuleName.Dereference, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(RuleName.Command, RuleName.Dereference, RuleName.DereferencePercentEnd) },
        { text: ' ' },
        { text: '; comment', scopes: name(RuleName.InLineComment) },
      ],
    ],
    [
      'AutoTrim, % true', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: '%', scopes: name(RuleName.Command, RuleName.ForceExpression, RuleName.ForceExpressionPercent) },
        { text: ' ' },
        { text: 'true', scopes: name(RuleName.Command, RuleName.ForceExpression, RuleName.BuiltInVariable) },
      ],
    ],
    // invalid
    [
      'AutoTrim, No keyword', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: 'No keyword', scopes: name(RuleName.Command, RuleName.InvalidCommandArgument) },
      ],
    ],
  ])('enum argument', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    [
      'AutoTrim, On, Overflow, arguments', [
        { text: 'AutoTrim', scopes: name(RuleName.Command, RuleName.CommandName) },
        { text: ',', scopes: name(RuleName.Command, RuleName.CommandArgumentSeparator) },
        { text: ' ' },
        { text: 'On', scopes: name(RuleName.Command, RuleName.CommandArgumentKeyword) },
        { text: ', Overflow, arguments', scopes: name(RuleName.Command, RuleName.InvalidCommandArgument) },
      ],
    ],
  ])('too many arguments', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
