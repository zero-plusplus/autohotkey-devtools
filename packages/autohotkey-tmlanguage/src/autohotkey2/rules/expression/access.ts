import * as patterns_v1 from '../../../autohotkeyl/patterns';
import { Repository, RuleName, StyleName } from '../../../constants';
import { alt, capture, char, endAnchor, lookahead, negativeLookahead, negChar, negChars0, negChars1, seq } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

export function createDereferenceRule(scopeName: ScopeName): BeginEndRule {
  return {
    begin: capture(char('%')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
    },
    end: alt(
      capture(char('%')),
      endAnchor(),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.PercentEnd),
    },
    patterns: [
      includeRule(Repository.Meta),

      includeRule(Repository.Comma),
      includeRule(Repository.Expression),
    ],
  };
}
export function createInvalidDereferenceRule(scopeName: ScopeName): PatternsRule {
  return {
    patterns: [
      // %%
      //  ^ missing
      {
        match: seq(
          capture(char('%')),
          capture(char('%')),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.PercentBegin, StyleName.Invalid),
          2: nameRule(scopeName, RuleName.PercentEnd, StyleName.Invalid),
        },
      },
      // %
      //  ^ missing
      {
        match: seq(
          capture(char('%')),
          lookahead(alt(
            seq(negChars1('\\S', '\\r', '\\n'), char(';')),
            seq(negChars0('\\S', '\\r', '\\n'), endAnchor()),
          )),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.PercentBegin, StyleName.Invalid),
        },
      },
      // %abc
      //     ^ missing
      {
        match: seq(
          capture(char('%')),
          capture(negChars0('\\r', '\\n', '%')),
          negativeLookahead(char('%')),
          capture(negChar('\\r', '\\n')),
          lookahead(patterns_v1.expressionEndAnchor),
        ),
        captures: {
          1: nameRule(scopeName, RuleName.PercentBegin),
          2: {
            patterns: [
              includeRule(Repository.InvalidDereference),
              includeRule(Repository.Dereference),
              includeRule(Repository.Expressions),
            ],
          },
          3: nameRule(scopeName, RuleName.Variable, StyleName.Invalid),
        },
      },
    ],
  };
}
