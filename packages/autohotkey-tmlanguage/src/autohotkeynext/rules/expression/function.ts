import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, endAnchor, group, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

export function createFunctionExpressionBlockRule(scopeName: ScopeName): PatternsRule {
  const statementsRules: Rule[] = [
    // Note: The get or set keywords must be valid here as well, since TMLanguage limitations make it impossible to distinguish between K&R-style property blocks and function definition expression blocks
    {
      match: seq(
        startAnchor(),
        inlineSpaces0(),
        capture(keyword('get', 'set')),
        lookahead(alt(
          seq(inlineSpaces1(), char(';')),
          seq(inlineSpaces0(), group(alt(char('{'), endAnchor()))),
        )),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.GetSetKeyword),
      },
    },
    includeRule(Repository.Self),
  ];

  return patternsRule(
    // One true brace style
    //
    {
      begin: seq(
        lookbehind(seq(
          char(')'),
          inlineSpaces0(),
        )),
        inlineSpaces0(),
        capture(char('{')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.BlockBegin),
      },
      end: capture(char('}')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.BlockEnd),
      },
      patterns: statementsRules,
    },
    // K&R style
    {
      begin: seq(
        startAnchor(),
        inlineSpaces0(),
        capture(char('{')),
      ),
      beginCaptures: {
        1: nameRule(scopeName, RuleName.BlockBegin),
      },
      end: capture(char('}')),
      endCaptures: {
        1: nameRule(scopeName, RuleName.BlockEnd),
      },
      patterns: statementsRules,
    },
  );
}
