import * as rules_common from '../../../common/rules';
import type { CommandDefinition } from '../../../definition';
import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, lookbehind, seq } from '../../../oniguruma';
import {
  nameRule, patternsRule, RuleName,
  type PatternsRule, type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  definitions: CommandDefinition[];
  expressionOperators: readonly string[];
}
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    ...placeholder.definitions.flatMap((definition) => {
      return definition.signatures.map((signature) => {
        return rules_common.createSingleLineCommandLikeStatementRule(scopeName, definition, signature, {
          startAnchor: placeholder.startAnchor,
          endAnchor: placeholder.endAnchor,
          commandElementName: RuleName.ControlFlowKeyword,
          allowFirstComma: true,
        });
      });
    }),
    {
      match: seq(
        lookbehind(placeholder.startAnchor),
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
