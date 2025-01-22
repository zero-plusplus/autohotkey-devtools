import { alt, anyChars1, char, escapeOnigurumaTexts, group, manyLimit, manyXtoY, optional, ordalt, seq, text, wordChar } from '../oniguruma';
import * as constants_v2 from './constants';

export const expressionContinuationStartAnchor: string = group(ordalt(...escapeOnigurumaTexts(constants_v2.expressionOperators)));

export const unescapedDoubleQuotePattern: string = text('`"');
export const unescapedSingleQuotePattern: string = text('`\'');

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
