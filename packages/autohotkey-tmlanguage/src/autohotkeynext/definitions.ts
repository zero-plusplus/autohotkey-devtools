import * as definitions_v2 from '../autohotkey2/definitions';
import * as patterns_v2 from '../autohotkey2/patterns';
import {
  command,
  CommandParameterFlag,
  signature,
  type CommandDefinition,
  type CommandParameter,
} from '../definition';
import {
  anyChars1,
  seq,
  wordBound,
} from '../oniguruma';
import {
  RuleName,
  StyleName,
} from '../tmlanguage';

export const directiveDefinitions: CommandDefinition[] = [
  ...definitions_v2.directiveDefinitions,

  // [v2.1-alpha.11](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.11)
  // https://www.autohotkey.com/docs/alpha/lib/_Module.htm
  command('#Module', signature([ namespace() ])),
];

export function namespace(): CommandParameter {
  // e.g. `#Module ModuleName`
  //               ^^^^^^^^^^
  return {
    flags: CommandParameterFlag.None,
    itemMatchers: [
      {
        name: RuleName.Namespace,
        match: seq(wordBound(), patterns_v2.identifierPattern, wordBound()),
      },
      {
        name: [ RuleName.Namespace, StyleName.Invalid ],
        match: anyChars1(),
      },
    ],
  };
}
