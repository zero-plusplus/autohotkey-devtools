import { Repository, RuleName } from '../../../constants';
import { alt, capture, char, endAnchor, group, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, seq, startAnchor } from '../../../oniguruma';
import type { BeginEndRule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';
import { createBlockRule } from './block';

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
        patterns: [
          // overwrite block
          createBlockRule(scopeName, {
            statementsInBlock: [
              // get-set
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
            ],
          }),

          includeRule(Repository.Self),
        ],
      },
    ],
  };
}
