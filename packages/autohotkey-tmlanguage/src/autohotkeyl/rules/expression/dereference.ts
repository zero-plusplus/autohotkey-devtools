import { Repository, RuleName, StyleName } from '../../../constants';
import { alt, capture, char, inlineSpaces1, lookahead, many0, many1, negChar, seq, whitespace } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';
import * as patterns_v1 from '../../patterns';

export function createDereferenceRule(scopeName: ScopeName): BeginEndRule {
  const dereferenceContent = negChar('%', whitespace());

  return {
    begin: capture(char('%')),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
    },
    end: alt(
      capture(char('%')),
      lookahead(patterns_v1.expressionEndAnchor),
    ),
    endCaptures: {
      1: nameRule(scopeName, RuleName.PercentEnd),
    },
    patterns: [
      // %a b c %
      //   ^ ^ ^ invalid
      {
        match: seq(
          capture(many0(dereferenceContent)),
          capture(dereferenceContent),
          inlineSpaces1(),
        ),
        captures: {
          1: patternsRule(
            includeRule(Repository.BuiltInVariable),
            includeRule(Repository.Variable),
          ),
          2: nameRule(scopeName, RuleName.Variable, StyleName.Invalid),
        },
      },
      // %abc%
      //  ^^^ valid
      {
        match: capture(many1(dereferenceContent)),
        captures: {
          1: {
            patterns: [
              includeRule(Repository.KeywordLikeBuiltInVariable),
              includeRule(Repository.BuiltInVariable),
              includeRule(Repository.Variable),
            ],
          },
        },
      },
    ],
  };
}
export function createInvalidDereferenceRule(scopeName: ScopeName): PatternsRule {
  const dereferenceContent = negChar('%', whitespace());

  return patternsRule(
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
        lookahead(patterns_v1.expressionEndAnchor),
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
        capture(many0(dereferenceContent)),
        capture(dereferenceContent),
        lookahead(patterns_v1.expressionEndAnchor),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.PercentBegin),
        2: patternsRule(
          includeRule(Repository.BuiltInVariable),
          includeRule(Repository.Variable),
        ),
        3: nameRule(scopeName, RuleName.Variable, StyleName.Invalid),
      },
    },
  );
}
