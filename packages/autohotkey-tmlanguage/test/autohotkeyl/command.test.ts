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

      return { text: definition.name, scopes: scopes };
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
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Comma) },
        { text: 'On', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
    // space separator
    [
      'AutoTrim On', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
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
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Comma) },
        { text: 'abc', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString) },
      ],
    ],
    [
      'AutoTrim, %true%', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Comma) },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.PercentBegin) },
        { text: 'true', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.BuiltInVariable) },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.Dereference, RuleName.PercentEnd) },
      ],
    ],
    [
      'AutoTrim, % true', [
        { text: 'AutoTrim', scopes: name(Repository.CommandStatement, RuleName.CommandName) },
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Comma) },
        { text: '%', scopes: name(Repository.CommandStatement, Repository.CommandArgument, Repository.PercentExpression, RuleName.PercentBegin) },
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
        { text: ',', scopes: name(Repository.CommandStatement, RuleName.Comma) },
        { text: 'continuation argument', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString) },
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
        { text: ',', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.Comma) },
        { text: 'On', scopes: name(Repository.CommandStatement, Repository.CommandArgument, RuleName.UnquotedString, StyleName.Strong) },
      ],
    ],
  ])('arguments with special highlighting', async(text, expected) => {
    const actual = await parse(scopeName, text);
    // console.log(JSON.stringify(actual, undefined, 2));

    expect(actual).toStrictEqual(expected);
  });
});
