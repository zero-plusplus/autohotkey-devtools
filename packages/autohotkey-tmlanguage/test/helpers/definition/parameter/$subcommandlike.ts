import { name, RuleName, StyleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function $subcommandlike(scopeName: ScopeName, subcommandOrSubcommands: string | string[], placeholder: Placeholder): ExpectedTestData[] {
  return (Array.isArray(subcommandOrSubcommands) ? subcommandOrSubcommands : [ subcommandOrSubcommands ]).flatMap((subcommand): ExpectedTestData[] => {
    return [
      createExpectedData(
        scopeName,
        subcommand,
        [ { text: subcommand, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Strong) } ],
        placeholder,
      ),

      ...(
        placeholder.isLastParameter
          ? [
            createExpectedData(
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
