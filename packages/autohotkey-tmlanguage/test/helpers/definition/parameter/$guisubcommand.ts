import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

export function $guisubcommand(scopeName: ScopeName, subcommandOrSubcommands: string | string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return (Array.isArray(subcommandOrSubcommands) ? subcommandOrSubcommands : [ subcommandOrSubcommands ]).flatMap((subcommand): ExpectedTestData[] => {
    return [
      createCommandExpectedData(
        scopeName,
        subcommand,
        [ { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) } ],
        placeholder,
      ),
      createCommandExpectedData(
        scopeName,
        `label:${subcommand}`,
        [
          { text: 'label', scopes: name(scopeName, RuleName.LabelName) },
          { text: ':', scopes: name(scopeName, RuleName.Colon) },
          { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) },
        ],
        placeholder,
      ),
    ];
  });
}
