import {
  alt, capture, char, inlineSpace, inlineSpaces1, lookahead, many0, negativeLookahead,
  negChar, negChars0, seq, whitespace,
} from '../../../oniguruma';
import {
  includeRule, nameRule, patternsRule, Repository, RuleName, StyleName,
  type BeginEndRule, type MatchRule, type PatternsRule, type ScopeName,
} from '../../../tmlanguage';
import * as patterns_v1 from '../../patterns';

export function createDereferenceRule(scopeName: ScopeName): BeginEndRule {
  const dereferenceContent = negChar('%', whitespace());

  return {
    begin: seq(
      capture(char('%')),
      negativeLookahead(inlineSpace()),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
    },
    end: alt(
      capture(char('%')),
      lookahead(patterns_v1.expressionEndPattern),
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
      includeRule(Repository.Variable),
    ],
  };
}
export function createDereferenceInCommandArgumentRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      capture(negChars0(inlineSpace())),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.PercentBegin),
      2: patternsRule(
        includeRule(Repository.Dereference),
        includeRule(Repository.Variable),
      ),
      3: nameRule(scopeName, RuleName.PercentEnd),
    },
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
        lookahead(patterns_v1.expressionEndPattern),
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
        lookahead(patterns_v1.expressionEndPattern),
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
