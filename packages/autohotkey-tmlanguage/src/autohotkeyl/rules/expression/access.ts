import { Repository, RuleName, StyleName } from '../../../constants';
import { alt, capture, char, inlineSpaces1, lookahead, many0, many1, negChar, seq, whitespace } from '../../../oniguruma';
import type { BeginEndRule, PatternsRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';
import * as patterns_v1 from '../../patterns';

export function createDereferenceRule(scopeName: ScopeName): BeginEndRule {
  const dereferenceContent = negChar('%', whitespace());

  return {
    begin: capture(char('%')),
    beginCaptures: {
      1: nameRule(scopeName, Repository.Dereference, RuleName.PercentBegin),
    },
    end: alt(
      capture(char('%')),
      lookahead(patterns_v1.expressionEndLineAnchor),
    ),
    endCaptures: {
      1: nameRule(scopeName, Repository.Dereference, RuleName.PercentEnd),
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
          1: {
            name: name(scopeName, Repository.Dereference),
            patterns: [
              includeRule(Repository.BuiltInVariable),
              includeRule(Repository.Variable),
            ],
          },
          2: nameRule(scopeName, Repository.Dereference, RuleName.Variable, StyleName.Invalid),
        },
      },
      // %abc%
      //  ^^^ valid
      {
        name: name(scopeName, Repository.Dereference),
        match: capture(many1(dereferenceContent)),
        captures: {
          1: {
            patterns: [
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
        1: nameRule(scopeName, Repository.Dereference, RuleName.PercentBegin, StyleName.Invalid),
        2: nameRule(scopeName, Repository.Dereference, RuleName.PercentEnd, StyleName.Invalid),
      },
    },
    // %
    //  ^ missing
    {
      match: seq(
        capture(char('%')),
        lookahead(patterns_v1.expressionEndLineAnchor),
      ),
      captures: {
        1: nameRule(scopeName, Repository.Dereference, RuleName.PercentBegin, StyleName.Invalid),
      },
    },
    // %abc
    //     ^ missing
    {
      match: seq(
        capture(char('%')),
        capture(many0(dereferenceContent)),
        capture(dereferenceContent),
        lookahead(patterns_v1.expressionEndLineAnchor),
      ),
      captures: {
        1: nameRule(scopeName, Repository.Dereference, RuleName.PercentBegin),
        2: {
          name: name(scopeName, Repository.Dereference),
          patterns: [
            includeRule(Repository.BuiltInVariable),
            includeRule(Repository.Variable),
          ],
        },
        3: nameRule(scopeName, Repository.Dereference, RuleName.Variable, StyleName.Invalid),
      },
    },
  );
}
