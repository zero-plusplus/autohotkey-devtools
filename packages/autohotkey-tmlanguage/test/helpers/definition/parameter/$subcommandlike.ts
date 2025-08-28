import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
