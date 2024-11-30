import { RuleName } from '../../../constants';
import { capture, char, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { name } from '../../../utils';

export function createMultiLineCommentRule(scopeName: ScopeName): BeginEndRule {
  return {
    name: name(scopeName, RuleName.MultiLineComment),
    begin: seq(
      char('/'),
      char('*'),
    ),
    end: capture(seq(
      char('*'),
      char('/'),
    )),
  };
}
