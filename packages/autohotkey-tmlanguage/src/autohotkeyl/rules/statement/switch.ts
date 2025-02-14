import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, ignoreCase, inlineSpaces0, keyword, lookahead, lookbehind, optseq, ordalt, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, nameRule } from '../../../utils';

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
    ),
    beginCaptures: {
      1: nameRule(scopeName, RuleName.ControlFlowKeyword),
    },
    end: capture('}'),
    endCaptures: {
      1: nameRule(scopeName, RuleName.BlockEnd),
    },
    patterns: [
      // #region switch head
      {
        begin: seq(
          lookbehind(ignoreCase('switch')),
          inlineSpaces0(),
        ),
        end: alt(
          lookahead(char('{')),
          placeholder.endAnchor,
        ),
        patterns: [
          includeRule(Repository.Comma),
          includeRule(Repository.ExpressionInControlFlow),
        ],
      },
      // #endregion switch head

      // #region switch body
      {
        begin: capture(char('{')),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.BlockBegin),
        },
        end: lookahead(char('}')),
        patterns: [
          // #region case
          {
            begin: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('case')),
            ),
            beginCaptures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
            },
            end: alt(
              seq(capture(char(':')), inlineSpaces0()),
              lookahead(char('}')),
              lookahead(seq(startAnchor(), inlineSpaces0(), ignoreCase(ordalt('case', 'default')))),
            ),
            endCaptures: {
              1: nameRule(scopeName, RuleName.Colon),
            },
            patterns: [
              includeRule(Repository.Comma),
              includeRule(Repository.ExpressionInControlFlow),
            ],
          },
          // #endregion case

          // #region default
          {
            match: seq(
              startAnchor(),
              inlineSpaces0(),
              capture(keyword('default')),
              optseq(
                capture(char(':')),
                inlineSpaces0(),
              ),
            ),
            captures: {
              1: nameRule(scopeName, RuleName.SwitchLabelKeyword),
              2: nameRule(scopeName, RuleName.Colon),
            },
          },
          // #endregion default

          includeRule(Repository.Self),
        ],
      },
      // #endregion switch body
    ],
  };
}
