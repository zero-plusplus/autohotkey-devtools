import * as patterns_common from '../common/patterns';
import {
  alt,
  anyChars0,
  anyChars1,
  char,
  group,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  manyLimit,
  manyRange,
  optional,
  reluctant,
  seq,
  text,
  textalt,
  wordChar,
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
// #endregion Names

export const looseLeftHandPattern: string = manyRange(group(alt(
  nameBody,
  char('%', '[', ']', '.'),
)), 1, nameLimitLength);
export const expressionContinuationStartPattern: string = group(textalt(...constants_v2.continuationOperators, '('));
export const statementStartPattern: string = alt(
  seq(text('::'), inlineSpaces0()),
  group(seq(
    patterns_common.lineStartPattern,
    optional(alt(
      seq(char('}')),
      seq(identifierPattern, char(':')),
      seq(ignoreCase('case'), inlineSpace(), reluctant(anyChars0()), char(':')),
    )),
    inlineSpaces0(),
  )),
);

export const escapedDoubleQuotePattern: string = text('`"');
export const escapedSingleQuotePattern: string = text('`\'');
