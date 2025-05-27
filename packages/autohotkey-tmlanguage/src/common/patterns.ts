import {
  alt, anyChar, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, groupMany1, inlineSpace, inlineSpaces0, inlineSpaces1,
  negativeLookahead, negativeLookbehind, negChar, negChars0, optional, ordalt, seq, startAnchor,
} from '../oniguruma';
import * as constants_common from './constants';

export const lineStartAnchor: string = seq(
  group(alt(startAnchor(), '\\G')),
  inlineSpaces0(),
);
export const lineEndAnchor: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);

// https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm#Options
export const regexpOptionsPattern: string = seq(
  groupMany0(alt(
    ordalt(...escapeOnigurumaTexts(constants_common.regexpOptions)),
    inlineSpace(),
  )),
  negativeLookahead(char('`')),
  char(')'),
);

// #region command / directive
export const pairs: string = group(alt(
  seq(char('"'), group(alt(negChars0('\\r', '\\n', '"'), group(seq(char('`'), char('"'))))), char('"')),
  seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
  seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
  seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
));
export const unquotedCharPattern: string = seq(
  negativeLookahead(alt(
    seq(inlineSpaces1(), char(';')),
    seq(inlineSpaces0(), alt(
      seq(negativeLookbehind(char('`')), char(',')),
      endAnchor(),
    )),
  )),
  anyChar(),
);
export const expressionArgumentPattern: string = groupMany0(alt(
  pairs,
  seq(inlineSpaces1(), negativeLookahead(char(';'))),
  negChar(',', '\\s'),
));
export const percentExpressionArgumentPattern: string = seq(
  char('%'),
  inlineSpaces1(),
  negativeLookahead(char(';')),
  expressionArgumentPattern,
);
export const expressionLastArgumentPattern: string = groupMany1(alt(
  negChar('\\s'),
  seq(inlineSpaces1(), negativeLookahead(char(';'))),
));
export const percentExpressionLastArgumentPattern: string = group(seq(
  char('%'),
  inlineSpaces1(),
  optional(expressionLastArgumentPattern),
));
export const lastArgumentPattern: string = group(alt(
  percentExpressionLastArgumentPattern,
  groupMany1(alt(
    pairs,
    char(','),
    unquotedCharPattern,
  )),
));
export const expressionWithOneTrueBraceArgumentPattern: string = groupMany0(alt(
  pairs,
  negChar('\\r', '\\n', ',', '{'),
));
export const commandArgumentPattern: string = group(alt(
  percentExpressionArgumentPattern,
  groupMany0(alt(
    pairs,
    unquotedCharPattern,
  )),
));
// #endregion command / directive
