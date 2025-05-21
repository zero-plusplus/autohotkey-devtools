import * as constants_common from '../common/patterns';
import {
  alt, anyChars1, char, escapeOnigurumaTexts, group, groupMany1, inlineSpaces0, manyLimit, manyXtoY, negChar,
  optional, ordalt, reluctant, seq, text, wordChar,
} from '../oniguruma';
import * as constants_v2 from './constants';


// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
export const nameLimitLength = 253;
const numberChar = '\\d';
const sign = char('_');
export const nameStart: string = group(alt(wordChar(), sign));
export const nameStart_upper: string = group('[A-Z_]');
export const nameBody: string = group(alt(wordChar(), sign, numberChar));
export const nameBody_upper: string = group('[A-Z_]');
export const identifierPattern: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));
export const keyName: string = group(alt(
  group(seq(char('%'), anyChars1(), char('%'))),
  identifierPattern,
));
export const directiveNamePattern: string = seq(
  char('#'),
  optional(identifierPattern),
);
// #endregion Names

export const looseLeftHandPattern: string = manyXtoY(1, nameLimitLength)(group(alt(
  nameBody,
  char('%', '[', ']', '.'),
)));
export const expressionContinuationStartAnchor: string = group(ordalt(
  ...escapeOnigurumaTexts(constants_v2.continuationOperators),
  char('('),
));
export const statementStartAnchor: string = alt(
  constants_common.lineStartAnchor,
  reluctant(seq(constants_common.lineStartAnchor, inlineSpaces0(), groupMany1(alt(negChar(':', seq(char('`'), char(':'))))), text('::'), inlineSpaces0())),
  seq(constants_common.lineStartAnchor, inlineSpaces0(), identifierPattern, char(':'), inlineSpaces0()),
  seq(constants_common.lineStartAnchor, inlineSpaces0(), char('}')),
);

export const escapedDoubleQuotePattern: string = text('`"');
export const escapedSingleQuotePattern: string = text('`\'');
