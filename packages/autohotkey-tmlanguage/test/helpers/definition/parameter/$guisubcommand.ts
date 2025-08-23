import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createExpectedData, type Placeholder } from '../helpers';

export function $guisubcommand(scopeName: ScopeName, subcommandOrSubcommands: string | string[], placeholder: Placeholder): ExpectedTestData[] {
  return (Array.isArray(subcommandOrSubcommands) ? subcommandOrSubcommands : [ subcommandOrSubcommands ]).flatMap((subcommand): ExpectedTestData[] => {
    return [
      createExpectedData(
        scopeName,
        subcommand,
        [ { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) } ],
        placeholder,
      ),
      createExpectedData(
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
