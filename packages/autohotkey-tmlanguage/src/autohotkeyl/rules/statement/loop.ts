import * as rules_common from '../../../common/rules';
import type { CommandDefinition } from '../../../definition';
import {
  alt,
  capture,
  char,
  inlineSpace,
  inlineSpaces0,
  keyword,
  lookahead,
  lookbehind,
  seq,
} from '../../../oniguruma';
import {
  nameRule,
  patternsRule,
  RuleName,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
  endPattern: string;
  definitions: CommandDefinition[];
}
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): Rule {
  return patternsRule(
    ...placeholder.definitions.flatMap((definition) => {
      return definition.signatures.map((signature) => {
        return rules_common.createSingleLineCommandLikeStatementRule(scopeName, definition, signature, {
          startPattern: placeholder.startPattern,
          endPattern: placeholder.endPattern,
          commandElementName: RuleName.ControlFlowKeyword,
          legacyMode: true,
        });
      });
    }),
    {
      match: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(keyword('Loop')),
        lookahead(alt(
          char(',', '{'),
          inlineSpace(),
        )),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.ControlFlowKeyword),
      },
    },
  );
}
