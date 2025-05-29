import * as rules_common from '../../../common/rules';
import { RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, lookbehind, seq } from '../../../oniguruma';
import { nameRule, patternsRule } from '../../../tmlanguage';
import type { PatternsRule, ScopeName } from '../../../types';
import * as definition_v1 from '../../definition';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
}
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    ...definition_v1.loopCommandDefenitions.flatMap((definition) => {
      return definition.signatures.map((signature) => {
        return rules_common.createCommandLikeRule(scopeName, definition, signature, {
          startAnchor: placeholder.startAnchor,
          endAnchor: placeholder.endAnchor,
          commandElementName: RuleName.ControlFlowKeyword,
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
