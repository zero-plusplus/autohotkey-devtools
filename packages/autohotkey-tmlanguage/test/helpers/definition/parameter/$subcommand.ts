import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers.ts';

export function $subcommand(scopeName: ScopeName, subcommandOrSubcommands: string | string[], placeholder: CommandPlaceholder): ExpectedTestData[] {
  return (Array.isArray(subcommandOrSubcommands) ? subcommandOrSubcommands : [ subcommandOrSubcommands ]).map((subcommand): ExpectedTestData => {
    return createCommandExpectedData(
      scopeName,
      subcommand,
      [ { text: subcommand, scopes: name(scopeName, RuleName.SubCommandName) } ],
      placeholder,
    );
  });
}
