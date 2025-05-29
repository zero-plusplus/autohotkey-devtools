import * as definitions_v2 from '../autohotkey2/definitions';
import {
  command, namespace, signature,
  type CommandDefinition,
} from '../definition';

export const directiveDefinitions: CommandDefinition[] = [
  ...definitions_v2.directiveDefinitions,

  // [v2.1-alpha.11](https://www.autohotkey.com/docs/alpha/ChangeLog.htm#v2.1-alpha.11)
  // https://www.autohotkey.com/docs/alpha/lib/_Module.htm
  command('#Module', signature([ namespace() ])),
];

