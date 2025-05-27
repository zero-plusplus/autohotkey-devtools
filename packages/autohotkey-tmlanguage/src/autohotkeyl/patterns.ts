import { lineStartAnchor } from '../common/patterns';
import {
  alt, anyChar, anyChars1, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, groupMany1, inlineSpace,
  inlineSpaces0, inlineSpaces1, lookahead, manyLimit, manyRange, negativeLookahead, negativeLookbehind, negChar,
  negChars0, number, optional, ordalt, reluctant, seq, text, textalt, wordChar,
} from '../oniguruma';
import * as constants_v1 from './constants';

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
const nameLimitLength = 253;
const sign = char('_', '#', '@', '$');

export const nameStart: string = group(alt(wordChar(), sign));
export const nameBody: string = group(alt(wordChar(), sign, number()));
export const identifierPattern: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));

export const nameStart_upper: string = group('[A-Z_]');
export const nameBody_upper: string = group('[A-Z_]');
export const upperIdentifierPattern: string = group(seq(nameStart_upper, manyLimit(nameBody_upper, nameLimitLength - 1)));
export const identifierEndAnchor: string = group(alt(
  negChar(wordChar(), number(), '_', '#', '@', '$'),
  inlineSpace(),
  endAnchor(),
));

export const keyName: string = group(alt(
  group(seq(char('%'), anyChars1(), char('%'))),
  identifierPattern,
));

// Note: Analyze roughly, as accurate analysis slows down the speed of analysis to a great extent
export const looseLeftHandPattern: string = group(manyRange(group(alt(
  nameBody,
  char('%', '[', ']', '.'),
)), 1, nameLimitLength));
export const looseCallableNamePattern: string = seq(
  manyLimit(group(alt(
    nameBody,
    char('%'),
  )), nameLimitLength),
  lookahead(char('(')),
);
// #endregion Names

export const statementStartAnchor: string = alt(
  lineStartAnchor,
  reluctant(seq(lineStartAnchor, inlineSpaces0(), groupMany1(alt(negChar(':', seq(char('`'), char(':'))))), text('::'), inlineSpaces0())),
  seq(lineStartAnchor, inlineSpaces0(), identifierPattern, char(':'), inlineSpaces0()),
  seq(lineStartAnchor, inlineSpaces0(), char('}')),
);
export const expressionContinuationStartAnchor: string = group(ordalt(...escapeOnigurumaTexts(constants_v1.continuationOperators)));
export const lineEndAnchor: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const controlFlowEndAnchor: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), char('{')),
  seq(inlineSpaces0(), endAnchor()),
);
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
export const escapedDoubleQuotePattern: string = text('""');

// https://www.autohotkey.com/docs/v1/misc/RegEx-QuickRef.htm#Options
export const regexpOptionsPattern: string = seq(
  groupMany0(alt(
    ordalt(...escapeOnigurumaTexts(constants_v1.regexpOptions)),
    inlineSpace(),
  )),
  negativeLookahead(char('`')),
  char(')'),
);

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
  seq(inlineSpaces1(), negativeLookahead(char(';'))),
  negChar(',', '\\s'),
));
export const percentExpressionArgumentPattern: string = seq(
  char('%'),
  inlineSpaces1(),
  negativeLookahead(char(';')),
  expressionArgumentPattern,
);
export const commandArgumentPattern: string = group(alt(
  percentExpressionArgumentPattern,
  groupMany0(alt(
    pairs,
    unquotedCharPattern,
  )),
));
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
export const commandArgumentStartPattern: string = lookahead(alt(
  seq(inlineSpaces0(), negativeLookahead(textalt(...constants_v1.expressionOperators))),
  seq(inlineSpaces1()),
  seq(inlineSpaces0(), char(',')),
));
// #endregion command

