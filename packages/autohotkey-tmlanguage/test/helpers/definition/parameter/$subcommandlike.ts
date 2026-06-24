import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $subcommandlike(scopeName: ScopeName, subcommandOrSubcommands: string | string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return (Array.isArray(subcommandOrSubcommands) ? subcommandOrSubcommands : [ subcommandOrSubcommands ]).flatMap((subcommand): ExpectedTestData[] => {
    return [
      createCommandExpectedData(
        scopeName,
        subcommand,
        [ { text: subcommand, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
        placeholder,
      ),

      ...(
        placeholder.isLastParameter
          ? [
            createCommandExpectedData(
              scopeName,
              `${subcommand},`,
              [
                { text: subcommand, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) },
                { text: `,`, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) },
              ],
              placeholder,
            ),
          ]
          : []
      ),
    ];
  });
}
