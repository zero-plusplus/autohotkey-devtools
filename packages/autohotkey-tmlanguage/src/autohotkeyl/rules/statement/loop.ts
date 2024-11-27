import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, inlineSpace, inlineSpaces0, keyword, lookahead, seq } from '../../../oniguruma';
import type { PatternsRule, ScopeName } from '../../../types';
import { nameRule, patternsRule } from '../../../utils';
import * as definition_v1 from '../../definition';
import { createCommandLikeRule } from '../legacy/command';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
}
export function createLoopStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(
    ...definition_v1.loopCommandDefenitions.flatMap((definition) => {
      return definition.signatures.map((signature) => {
        return createCommandLikeRule(scopeName, definition, signature, {
          startAnchor: placeholder.startAnchor,
          endAnchor: placeholder.endAnchor,
          statementElementName: Repository.LoopStatement,
          commandElementName: RuleName.ControlFlowKeyword,
        });
      });
    }),
    {
      match: seq(
        placeholder.startAnchor,
        inlineSpaces0(),
        capture(keyword('loop')),
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
