import * as rules_common from '..';
import { Repository, RuleName } from '../../../constants';
import {
  alt, capture, char, endAnchor, group, inlineSpaces0, inlineSpaces1, keyword, lookahead,
  lookbehind, seq, startAnchor,
} from '../../../oniguruma';
import type { BeginEndRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule } from '../../../utils';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  identifierPattern: string;
  rulesInBody: Rule[];
}
export function createClassDeclarationRule(scopeName: ScopeName, placeholder: Placeholder): BeginEndRule {
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      keyword('class'),
    )),
    end: lookbehind('}'),
    patterns: [
      includeRule(Repository.AllInLineComments),

      // class head
      {
        begin: seq(
          inlineSpaces0(),
          capture(keyword('class')),
        ),
        beginCaptures: {
          1: nameRule(scopeName, RuleName.ClassKeyword),
        },
        end: lookahead(alt(
          seq(inlineSpaces0(), char('{')),
          placeholder.endAnchor,
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
        end: capture(char('}')),
        endCaptures: {
          1: nameRule(scopeName, RuleName.ClassBlockEnd),
        },
        patterns: placeholder.rulesInBody,
      },
    ],
  };
}
export function createBlockInClassBodyRule(scopeName: ScopeName): BeginEndRule {
  return rules_common.createBlockRule(scopeName, {
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
  });
}
