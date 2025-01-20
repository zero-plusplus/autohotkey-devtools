import { Repository, RuleName } from '../../../constants';
import { alt, anyChars0, capture, char, ignoreCase, inlineSpace, inlineSpaces0, keyword, lookahead, lookbehind, negativeLookahead, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule, patternsRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
}
export function createSwitchStatementRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      capture(keyword('switch')),
      lookahead(alt(
        char('(', '{'),
        inlineSpace(),
      )),
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
    end: lookbehind(seq(inlineSpaces0(), char('}'))),
    patterns: [
      // switch head
      {
        begin: seq(
          lookbehind(seq(
            ignoreCase('switch'),
            inlineSpace(),
          )),
          inlineSpaces0(),
          alt(
            lookahead(char('(')),
            negativeLookahead(char('{')),
          ),
        ),
        end: lookahead(alt(
          placeholder.endAnchor,
          char('{'),
        )),
        patterns: [ includeRule(Repository.Expressions) ],
      },

      // switch body
      {
        begin: capture(char('{')),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.BlockBegin),
        },
        end: seq(inlineSpaces0(), capture(char('}'))),
        endCaptures: {
          1: nameRule(scopeName, RuleName.BlockEnd),
        },
        patterns: [
          // #region one true brace style
          {
            begin: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('case')),
              inlineSpaces0(),
              capture(anyChars0()),
              inlineSpaces0(),
              capture(char(':')),
              inlineSpaces0(),
              capture(char('{')),
            ),
            beginCaptures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
              2: patternsRule(includeRule(Repository.Expressions)),
              3: nameRule(scopeName, RuleName.SemiColon),
              4: nameRule(scopeName, RuleName.BlockBegin),
            },
            end: seq(inlineSpaces0(), capture(char('}'))),
            endCaptures: {
              1: nameRule(scopeName, RuleName.BlockEnd),
            },
            patterns: [ includeRule(Repository.Self) ],
          },
          {
            begin: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('default')),
              inlineSpaces0(),
              capture(char(':')),
              inlineSpaces0(),
              capture(char('{')),
            ),
            beginCaptures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
              2: nameRule(scopeName, RuleName.SemiColon),
              3: nameRule(scopeName, RuleName.BlockBegin),
            },
            end: seq(inlineSpaces0(), capture(char('}'))),
            endCaptures: {
              1: nameRule(scopeName, RuleName.BlockEnd),
            },
            patterns: [ includeRule(Repository.Self) ],
          },
          // #endregion one true brace style

          // #region k&r style
          {
            match: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('case')),
              lookahead(inlineSpace()),
              inlineSpaces0(),
              capture(anyChars0()),
              inlineSpaces0(),
              capture(char(':')),
            ),
            captures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
              2: patternsRule(includeRule(Repository.Self)),
              3: nameRule(scopeName, RuleName.SemiColon),
            },
          },
          {
            match: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('default')),
              inlineSpaces0(),
              capture(char(':')),
            ),
            captures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
              2: nameRule(scopeName, RuleName.SemiColon),
            },
          },
          // #endregion k&r style

          includeRule(Repository.Self),
        ],
      },
    ],
  };
}
