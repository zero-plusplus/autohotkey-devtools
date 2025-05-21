import { RuleDescriptor, RuleName } from '../../../constants';
import { capture, char, negativeLookahead, seq, text } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { name, nameRule } from '../../../utils';

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
