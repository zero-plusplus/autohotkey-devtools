import { dedent } from '@zero-plusplus/utilities/src';
import { Repository, RuleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
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
        ? [ { text: commandName, scopes: name(Repository.Command, RuleName.CommandName) } ]
        : [ { text: '\n' }, { text: commandName, scopes: name(Repository.Command, RuleName.CommandName) } ];
    });

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    // comma separator
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Keyword) },
      ],
    ],
    // space separator
    [
      'AutoTrim On', [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Keyword) },
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
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Keyword) },
      ],
    ],
    [
      'AutoTrim, %true%', [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Dereference, RuleName.DereferencePercentBegin) },
        { text: 'true', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Dereference, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Dereference, RuleName.DereferencePercentEnd) },
      ],
    ],
    [
      'AutoTrim, % true', [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.ForceExpression, RuleName.ForceExpressionPercent) },
        { text: ' ' },
        { text: 'true', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.ForceExpression, RuleName.BuiltInVariable) },
      ],
    ],
    [
      dedent`
        AutoTrim
          , continuation argument
      `, [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: '\n' },
        { text: '  ' },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'continuation argument', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.LegacyText) },
      ],
    ],
    [
      dedent`
        AutoTrim % continuation
          + expressionArgument, legacyText
      `, [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.ForceExpression, RuleName.ForceExpressionPercent) },
        { text: ' ' },
        { text: 'continuation', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.ForceExpression, RuleName.Variable) },
        { text: '\n' },
        { text: '  ' },
        { text: '+', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Operator) },
        { text: ' ' },
        { text: 'expressionArgument', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Variable) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'legacyText', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.LegacyText) },
      ],
    ],
    // invalid
    [
      'AutoTrim, No keyword', [
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'No keyword', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.LegacyText, RuleName.Invalid) },
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
        { text: 'AutoTrim', scopes: name(Repository.Command, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Comma) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.Keyword) },
        { text: ', Overflow, arguments', scopes: name(Repository.Command, Repository.CommandArgument, RuleName.LegacyText, RuleName.Invalid) },
      ],
    ],
  ])('too many arguments', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
