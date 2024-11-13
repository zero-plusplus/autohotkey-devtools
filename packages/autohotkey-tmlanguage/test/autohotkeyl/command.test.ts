import { dedent, hasFlag } from '@zero-plusplus/utilities/src';
import { commandDefinitions } from '../../src/autohotkeyl/definition';
import { CommandFlag, Repository, RuleName, StyleName } from '../../src/constants';
import type { ScopeName } from '../../src/types';
import { createUtilities } from '../../src/utils';
import { parse } from '../helpers/textmate-parser';

describe('command', () => {
  const scopeName: ScopeName = 'autohotkeyl';

  const { name } = createUtilities(scopeName);

  test('command name', async() => {
    const commandNames: string[] = [];
    const expected = commandDefinitions.flatMap((definition, i) => {
      commandNames.push(definition.name);

      // eslint-disable-next-line jest/no-conditional-in-test
      const scopes = hasFlag(definition.flags, CommandFlag.Deprecated)
        ? name(Repository.CommandStatement, RuleName.CommandName, StyleName.Strikethrough)
        : name(Repository.CommandStatement, RuleName.CommandName);

      // eslint-disable-next-line jest/no-conditional-in-test
      return i === 0
        ? [ { text: definition.name, scopes: scopes } ]
        : [ { text: '\n' }, { text: definition.name, scopes } ];
    });
    const actual = await parse(scopeName, commandNames.join('\n'));
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    // comma separator
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // space separator
    [
      'AutoTrim On', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString, StyleName.Strong) },
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
      'AutoTrim, abc', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: 'abc', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString) },
      ],
    ],
    [
      'AutoTrim, %true%', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.PercentBegin) },
        { text: 'true', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.PercentEnd) },
      ],
    ],
    [
      'AutoTrim, % true', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.PercentExpression, RuleName.PercentBegin) },
        { text: ' ' },
        { text: 'true', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.PercentExpression, RuleName.BuiltInVariable) },
      ],
    ],
  ])('unquoted argument', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });

  test.each([

    [
      dedent`
        AutoTrim
          , continuation argument
      `, [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: '\n' },
        { text: '  ' },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: 'continuation argument', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString) },
      ],
    ],
    [
      dedent`
        AutoTrim % continuation
          + expressionArgument, legacyText
      `, [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ' ' },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.PercentExpression, RuleName.PercentBegin) },
        { text: ' ' },
        { text: 'continuation', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.PercentExpression, RuleName.Variable) },
        { text: '\n' },
        { text: '  ' },
        { text: '+', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Operator) },
        { text: ' ' },
        { text: 'expressionArgument', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Variable) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: 'legacyText', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString) },
      ],
    ],
  ])('continuation arguments', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });

  test.each([
    [
      'AutoTrim, On', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Separator) },
        { text: ' ' },
        { text: 'On', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
  ])('arguments with special highlighting', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
