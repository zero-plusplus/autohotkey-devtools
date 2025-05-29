import * as definition_v2 from '../autohotkey2/definition';
import { command, signature } from '../autohotkeyl/definition';
import { CommandParameterFlag, HighlightType } from '../definitions';
import type { CommandDefinition, CommandParameter } from '../types';

export const directiveDefinitions: CommandDefinition[] = [
  ...definition_v2.directiveDefinitions,

  // [v2.1-alpha.11](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.11)
  // https://www.autohotkey.com/docs/alpha/lib/_Module.htm
  command('#Module', signature([ namespace() ])),
];

export function namespace(): CommandParameter {
  return {
    type: HighlightType.Namespace,
    flags: CommandParameterFlag.None,
    itemPatterns: [],
  };
}
