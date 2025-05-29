import { RuleDescriptor, RuleName } from '../../../constants';
import { capture, char, negativeLookahead, seq, text } from '../../../oniguruma';
import { name, nameRule } from '../../../tmlanguage';
import type { BeginEndRule, ScopeName } from '../../../types';

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
