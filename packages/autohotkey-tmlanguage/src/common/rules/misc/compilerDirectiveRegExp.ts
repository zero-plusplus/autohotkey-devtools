import type { ScopeName } from 'vscode-textmate/release/theme';
import * as pattern_v1 from '../../../autohotkeyl/patterns';
import { Repository, RuleDescriptor, RuleName, StyleName, TokenType } from '../../../constants';
import {
  alt, anyChars0, capture, char, escapeOnigurumaTexts, group, ignoreCase, many0, negChar, negChars1,
  number, numbers0, optional, optseq, ordalt, seq, text,
} from '../../../oniguruma';
import type { MatchRule, PatternsRule } from '../../../types';
import { includeRule, name, namedPatternsRule, nameRule, patternsRule } from '../../../utils';
import * as constants_common from '../../constants';

export function createDoubleStringInCompilerDirectiveRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('"')),
      capture(many0(alt(
        text('""'),
        negChar('"'),
      ))),
      capture(char('"')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DoubleString, RuleDescriptor.Begin),
      2: createDoubleStringContentInCompilerDirectiveRule(scopeName),
      3: nameRule(scopeName, RuleName.DoubleString, RuleDescriptor.End),
    },
  };
}
export function createDoubleStringContentInCompilerDirectiveRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.DereferenceInCompilerDirective),
    {
      name: name(scopeName, RuleName.DoubleString, StyleName.Escape),
      match: ordalt(...escapeOnigurumaTexts(constants_common.compilerDirectiveEscapeSequences)),
    },
    {
      name: name(scopeName, RuleName.DoubleString, StyleName.Invalid),
      match: char('`'),
    },
    {
      name: name(scopeName, RuleName.DoubleString),
      match: negChars1('`', '%'),
    },
  );
}
export function createCompilerDirectiveDereferenceMatchRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      capture(pattern_v1.identifierPattern),
      optseq(
        capture(char('~')),
        capture(many0(alt(
          text('`~'),
          negChar('~'),
        ))),
        optseq(
          capture(char('~')),
          capture(anyChars0()),
        ),
      ),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, TokenType.Other, RuleName.PercentBegin),
      2: patternsRule(includeRule(Repository.Variable)),
      3: nameRule(scopeName, TokenType.Other, RuleName.Operator),
      4: namedPatternsRule(name(scopeName, RuleName.RegExpString), [ includeRule(Repository.DoubleStringAsRegExpContent) ]),
      5: nameRule(scopeName, TokenType.Other, RuleName.Operator),
      6: patternsRule(
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Escape),
          match: text('$$'),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Strong),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
            number(),
          ),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Strong),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
            char('{'),
            group(alt(
              pattern_v1.identifierPattern,
              numbers0(),
            )),
            char('}'),
          ),
        },
        {
          name: name(scopeName, RuleName.DoubleString),
          match: negChars1('`', '$'),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Invalid),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
          ),
        },
      ),
      7: nameRule(scopeName, TokenType.Other, RuleName.PercentEnd),
    },
  };
}
