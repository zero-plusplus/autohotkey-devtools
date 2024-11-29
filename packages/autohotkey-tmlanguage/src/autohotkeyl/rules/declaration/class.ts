import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, inlineSpaces0, keyword, lookahead, lookbehind, seq } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  lineEndAnchor: string;
  identifierPattern: string;
}
export function createClassDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: lookahead(seq(
      placeholder.startAnchor,
      inlineSpaces0(),
      keyword('class'),
    )),
    end: lookbehind('}'),
    patterns: [
      includeRule(Repository.InLineComment),

      // class head
      {
        begin: seq(
          placeholder.startAnchor,
          inlineSpaces0(),
          capture(keyword('class')),
        ),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.ClassKeyword),
        },
        end: lookahead(alt(
          seq(inlineSpaces0(), char('{')),
          placeholder.lineEndAnchor,
        )),
        patterns: [
          {
            name: name(scopeName, RuleName.ExtendsKeyword),
            match: keyword('extends'),
          },
          {
            name: name(scopeName, RuleName.Dot),
            match: char('.'),
          },
          {
            name: name(scopeName, RuleName.ClassName),
            match: placeholder.identifierPattern,
          },
        ],
      },

      // class body
      {
        begin: capture(char('{')),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.ClassBlockBegin),
        },
        end: seq(inlineSpaces0(), capture(char('}'))),
        endCaptures: {
          1: nameRule(scopeName, RuleName.ClassBlockEnd),
        },
        patterns: [ includeRule(Repository.Self) ],
      },
    ],
  };
}
