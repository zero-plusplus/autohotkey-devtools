import { Repository, RuleName } from '../../constants';
import { alt, anyChars0, capture, char, escapeOnigurumaTexts, group, inlineSpaces0, many1, opt, ordalt, seq, startAnchor } from '../../oniguruma';
import type { BeginWhileRule, MatchRule, ScopeName } from '../../types';
import { includeRule, name, nameRule } from '../../utils';
import * as constants_v1 from '../constants';
import * as patterns_v1 from '../patterns';

// export function createCommandRule(definition: CommandDefinition): BeginWhileRule {
//
// }
export function createContinuationArgumentsRuleSnippet(scopeName: ScopeName): Pick<BeginWhileRule, 'while' | 'whileCaptures' | 'patterns'> {
  const whileLegacyArgument = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(char(',')),
    inlineSpaces0(),
    capture(anyChars0()),
    patterns_v1.commandArgumentEndLineAnchor,
  );
  const whileExpression = seq(
    startAnchor(),
    inlineSpaces0(),
    capture(ordalt(...escapeOnigurumaTexts(constants_v1.operators))),
    opt(group(seq(
      inlineSpaces0(),
      capture(patterns_v1.commandExpressionArgument),
      inlineSpaces0(),
      opt(capture(char(','))),
      inlineSpaces0(),
      capture(anyChars0()),
    ))),
    patterns_v1.commandArgumentEndLineAnchor,
  );
  const argumentsPatterns = [
    // In some cases, highlighting is not applied in a captures even if a repository with a complex patterns is specified?
    // This problem is solved by specifying the rule directly
    {
      match: '(,)',
      captures: {
        1: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
      },
    },
    includeRule(Repository.CommandArgument),
  ];

  return {
    while: alt(whileLegacyArgument, whileExpression),
    whileCaptures: {
      1: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
      2: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: argumentsPatterns,
      },
      3: nameRule(scopeName, Repository.CommandArgument, RuleName.Operator),
      4: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: [ includeRule(Repository.Expression) ],
      },
      5: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
      6: {
        name: name(scopeName, Repository.CommandArgument),
        patterns: argumentsPatterns,
      },
    },
    patterns: [
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(char(',')), inlineSpaces0()),
        end: patterns_v1.commandArgumentEndLineAnchor,
        captures: {
          1: nameRule(scopeName, Repository.CommandArgument, RuleName.Comma),
        },
        patterns: argumentsPatterns,
      },
      {
        begin: seq(startAnchor(), inlineSpaces0(), capture(ordalt(...escapeOnigurumaTexts(constants_v1.operators))), inlineSpaces0()),
        end: patterns_v1.commandArgumentEndLineAnchor,
        captures: {
          1: nameRule(scopeName, RuleName.Operator),
        },
        patterns: [
          includeRule(Repository.Expression),
          ...argumentsPatterns,
        ],
      },
    ],
  };
}
export function createUnquotedString(scopeName: ScopeName, unquotedStringChar: string): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString),
    match: many1(unquotedStringChar),
  };
}
