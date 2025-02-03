import * as rule_common from '../../../common/rules';
import { RuleName } from '../../../constants';
import { alt, capture, char, group, ignoreCase, inlineSpace, inlineSpaces0, lookahead, lookbehind, optional, optseq, ordalt, seq } from '../../../oniguruma';
import type { MatchRule, PatternsRule, ScopeName } from '../../../types';
import { nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  identifierPattern: string;
  assignmentOperators: readonly string[];
  endAnchor: string;
}
export function createJumpStatement(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return rule_common.createCallStatementRule(scopeName, {
    ...placeholder,
    commandRuleName: RuleName.JumpCommandName,
    isDeprecated: false,
  });
}

interface Placeholder2 {
  startAnchor: string;
  endAnchor: string;
  names: readonly string[];
  labelPattern: string;
}
export function createJumpToLabelStatement(scopeName: ScopeName, placeholder: Placeholder2): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(ignoreCase(ordalt(...placeholder.names))),
      optseq(
        group(alt(
          inlineSpace(),
          capture(char(',')),
        )),
        inlineSpaces0(),
        optional(capture(placeholder.labelPattern)),
      ),
      lookahead(placeholder.endAnchor),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.JumpCommandName),
      2: nameRule(scopeName, RuleName.Comma),
      3: nameRule(scopeName, RuleName.LabelName),
    },
  };
}

