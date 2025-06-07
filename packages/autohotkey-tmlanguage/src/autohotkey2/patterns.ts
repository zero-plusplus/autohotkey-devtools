import * as patterns_common from '../common/patterns';
import {
  alt, anyChars0, anyChars1, char, group, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, manyLimit,
  manyXtoY, negChar, optional, reluctant, seq, text, textalt, wordChar,
} from '../oniguruma';
import * as constants_v2 from './constants';


// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const nameLimitLength = 253;
const numberChar = '\\d';
const sign = char('_');

export const nameStart: string = group(alt(wordChar(), sign));
export const nameBody: string = group(alt(wordChar(), sign, numberChar));
export const identifierPattern: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));

export const nameBody_upper: string = group('[A-Z_]');
export const nameStart_upper: string = group('[A-Z_]');
export const upperIdentifierPattern: string = group(seq(nameStart_upper, manyLimit(nameBody_upper, nameLimitLength - 1)));

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
export const expressionContinuationStartAnchor: string = group(textalt(...constants_v2.continuationOperators, '('));
export const statementStartAnchor: string = alt(
  patterns_common.lineStartAnchor,
  seq(patterns_common.lineStartAnchor, inlineSpaces0(), groupMany1(alt(negChar(':', seq(char('`'), char(':'))))), text('::'), inlineSpaces0()),
  seq(patterns_common.lineStartAnchor, inlineSpaces0(), ignoreCase('case'), inlineSpace(), reluctant(anyChars0()), char(':'), inlineSpaces0()),
  seq(patterns_common.lineStartAnchor, inlineSpaces0(), identifierPattern, char(':'), inlineSpaces0()),
  seq(patterns_common.lineStartAnchor, inlineSpaces0(), char('}')),
);

export const escapedDoubleQuotePattern: string = text('`"');
export const escapedSingleQuotePattern: string = text('`\'');
