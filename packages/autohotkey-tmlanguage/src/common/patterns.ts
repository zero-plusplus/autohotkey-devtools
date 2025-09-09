import {
  alt,
  anyChar,
  char,
  endAnchor,
  escapeOnigurumaTexts,
  group,
  groupMany0,
  groupMany1,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  negativeLookahead,
  negativeLookbehind,
  negChar,
  negChars0,
  ordalt,
  seq,
  startAnchor,
} from '../oniguruma';
import * as constants_common from './constants';

export const lineStartPattern: string = alt(startAnchor(), '\\G');
export const lineEndPattern: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);

// https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm#Options
export const regexpOptionsPattern: string = seq(
  groupMany0(ordalt(
    ...escapeOnigurumaTexts(constants_common.regexpOptions),
    inlineSpace(),
  )),
  char(')'),
);

// #region command / directive
export const unquotedPairStringPattern: string = group(alt(
  seq(char('"'), groupMany0(alt(negChar('\\r', '\\n', '"'), seq(char('`'), char('"')))), char('"')),
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
export const lastUnquotedCharPattern: string = seq(
  negativeLookahead(seq(inlineSpaces1(), char(';'))),
  anyChar(),
);
export const unquotedExpressionArgumentCharPattern: string = alt(
  unquotedPairStringPattern,
  seq(inlineSpace(), negativeLookahead(char(';'))),
  negChar(',', '\\s'),
);
export const unquotedExpressionLastArgumentCharPattern: string = alt(
  negChar('\\s'),
  seq(inlineSpace(), negativeLookahead(char(';'))),
);

export const unquotedExpressionArgumentPattern: string = groupMany1(unquotedExpressionArgumentCharPattern);
export const unquotedExpressionLastArgumentPattern: string = groupMany1(unquotedExpressionLastArgumentCharPattern);
export const percentExpressionArgumentPattern: string = seq(
  char('%'),
  inlineSpaces1(),
  groupMany0(unquotedExpressionArgumentCharPattern),
);
export const percentExpressionLastArgumentPattern: string = group(seq(
  char('%'),
  inlineSpaces1(),
  groupMany0(unquotedExpressionLastArgumentCharPattern),
));
export const unquotedArgumentPattern: string = group(alt(
  percentExpressionArgumentPattern,
  groupMany1(alt(
    unquotedPairStringPattern,
    unquotedCharPattern,
  )),
));
export const unquotedLastArgumentPattern: string = group(alt(
  percentExpressionLastArgumentPattern,
  groupMany1(alt(
    unquotedPairStringPattern,
    lastUnquotedCharPattern,
  )),
));
// #endregion command / directive
