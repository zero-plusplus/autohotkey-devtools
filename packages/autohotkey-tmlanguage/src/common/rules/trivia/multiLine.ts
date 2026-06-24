import {
  capture,
  char,
  negativeLookahead,
  seq,
  text,
} from '../../../oniguruma.ts';
import {
  name,
  nameRule,
  RuleDescriptor,
  RuleName,
  type BeginEndRule,
  type ScopeName,
} from '../../../tmlanguage.ts';

export function createMultiLineCommentRule(scopeName: ScopeName): BeginEndRule {
  return {
    name: name(scopeName, RuleName.MultiLineComment),
    begin: seq(
      capture(text('/*')),
      negativeLookahead(char('*')),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleDescriptor.Begin),
    },
    end: capture(text('*/')),
    endCaptures: {
      1: nameRule(scopeName, RuleDescriptor.End),
    },
  };
}
