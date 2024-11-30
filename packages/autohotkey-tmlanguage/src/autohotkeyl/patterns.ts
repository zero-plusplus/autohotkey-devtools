import { alt, anyChar, anyChars0, anyChars1, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, manyLimit, manyRange, negativeLookahead, negativeLookbehind, negChar, negChars0, opt, ordalt, seq, startAnchor, wordChar } from '../oniguruma';
import * as constants_v1 from './constants';

export const statementStartAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0()),
  seq(char(':'), inlineSpaces0()),
  seq(inlineSpaces0(), char('}')),
));
export const expressionStartAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0(), opt(char(','))),
  seq(char(':'), inlineSpaces0()),
));
export const expressionContinuationStartAnchor: string = seq(
  lookbehind(ordalt(...escapeOnigurumaTexts(constants_v1.operators))),
  inlineSpaces0(),
  lookahead(char('{')),
);
export const lineEndAnchor: string = lookahead(alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
));
export const controlFlowEndAnchor: string = lookahead(alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), char('{')),
  seq(inlineSpaces0(), endAnchor()),
));
export const expressionEndAnchor: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const unquotedStringChar: string = group(alt(
  negChar('\\s', ',', '%', '`', ';', ':'),
  seq(negativeLookbehind(inlineSpace()), char(';')),
  seq(inlineSpace(), negativeLookahead(';')),
));
export const pairs: string = group(alt(
  seq(char('"'), group(alt(negChars0('\\r', '\\n', '"'), group(seq(char('`'), char('"'))))), char('"')),
  seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
  seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
  seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
));

// #region command
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
  negChar(','),
));
export const percentExpressionArgumentPattern: string = seq(
  char('%'),
  inlineSpaces1(),
  expressionArgumentPattern,
);
export const commandArgumentPattern: string = group(alt(
  percentExpressionArgumentPattern,
  groupMany0(alt(
    pairs,
    unquotedCharPattern,
  )),
));
export const expressionLastArgumentPattern: string = group(anyChars0());
export const percentExpressionLastArgumentPattern: string = seq(
  char('%'),
  inlineSpaces1(),
  expressionLastArgumentPattern,
);
export const lastArgumentPattern: string = group(alt(
  percentExpressionLastArgumentPattern,
  groupMany0(alt(
    pairs,
    char(','),
    unquotedCharPattern,
  )),
));
export const expressionWithOneTrueBraceArgumentPattern: string = groupMany0(alt(
  pairs,
  negChar('\\r', '\\n', ',', '{'),
));
// #endregion command

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
export const nameLimitLength = 253;
const numberChar = '\\d';
const sign = char('_', '#', '@', '$');
export const nameStart: string = group(alt(wordChar(), sign));
export const nameBody: string = group(alt(wordChar(), sign, numberChar));
export const identifierPattern: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));
export const keyName: string = group(alt(
  group(seq(char('%'), anyChars1(), char('%'))),
  identifierPattern,
));

// Note: Analyze roughly, as accurate analysis slows down the speed of analysis to a great extent
export const callableNamePattern: string = group(manyRange(group(alt(
  nameBody,
  char('%'),
)), 1, nameLimitLength));
// #endregion Names
