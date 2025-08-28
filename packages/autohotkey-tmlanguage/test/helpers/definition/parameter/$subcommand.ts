import { name, RuleName, type ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createCommandExpectedData, type CommandPlaceholder } from '../helpers';

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
