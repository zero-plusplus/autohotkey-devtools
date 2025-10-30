import * as rule_common from '..';
import {
  alt,
  capture,
  char,
  group,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  lookahead,
  lookbehind,
  optcapture,
  optseq,
  ordalt,
  seq,
} from '../../../oniguruma';
import {
  includeRule,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  type MatchRule,
  type PatternsRule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder {
  startPattern: string;
  endPattern: string;
  identifierPattern: string;
  assignmentOperators: readonly string[];
}
export function createJumpStatement(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return rule_common.createCallStatementRule(scopeName, {
    ...placeholder,
    commandRuleName: RuleName.JumpCommandName,
    isDeprecated: false,
  });
}

interface Placeholder2 {
  startPattern: string;
  endPattern: string;
  names: readonly string[];
  labelPattern: string;
}
export function createJumpToLabelStatement(scopeName: ScopeName, placeholder: Placeholder2): MatchRule {
  return {
    match: seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      capture(ignoreCase(ordalt(...placeholder.names))),
      optseq(
        group(alt(
          inlineSpace(),
          capture(char(',')),
        )),
        inlineSpaces0(),
        optcapture(placeholder.labelPattern),
      ),
      lookahead(placeholder.endPattern),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.JumpCommandName),
      2: nameRule(scopeName, RuleName.Comma),
      3: patternsRule(includeRule(Repository.LabelName)),
    },
  };
}

