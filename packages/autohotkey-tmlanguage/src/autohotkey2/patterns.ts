import * as patterns_common from '../common/patterns';
import {
  alt,
  anyChars0,
  char,
  group,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  manyLimit,
  optional,
  reluctant,
  seq,
  text,
  textalt,
} from '../oniguruma';
import * as constants_v2 from './constants';

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const nameLimitLength = 253;
const identifierPartChars = [ '\\w', '_', '\\d' ];

export const identifierStart: string = char('\\w', '_');
export const identifierPart: string = char(...identifierPartChars);
export const identifierPattern: string = seq(identifierStart, manyLimit(identifierPart, nameLimitLength - 1));

export const identifierStart_upper: string = char('A-Z', '_');
export const identifierPart_upper: string = identifierStart_upper;
export const identifierPattern_upper: string = seq(identifierStart_upper, manyLimit(identifierPart_upper, nameLimitLength - 1));

export const objectKeyNamePattern: string = alt(
  seq(char('['), reluctant(anyChars0()), char(']')),
  seq(char('{'), reluctant(anyChars0()), char('}')),
  seq(char('%'), reluctant(anyChars0()), char('%')),
  identifierPattern,
  char('%'),
);
// #endregion Names

// Note: Analyze roughly, as accurate analysis slows down the speed of analysis to a great extent
export const looseCallableNamePattern: string = manyLimit(group(alt(
  identifierPart,
  char('%'),
)), nameLimitLength);
export const continuationExpressionStartPattern: string = textalt(...constants_v2.continuationOperators, '(');
export const statementStartPattern: string = alt(
  seq(text('::'), inlineSpaces0()),
  seq(
    group(patterns_common.lineStartPattern),
    inlineSpaces0(),
    optional(alt(
      seq(char('}')),
      seq(identifierPattern, char(':')),
      seq(ignoreCase('case'), inlineSpace(), reluctant(anyChars0()), char(':')),
    )),
    inlineSpaces0(),
  ),
);

export const doubleQuoteCharPattern: string = `"`;
export const singleQuoteCharPattern: string = `'`;
export const escapedDoubleQuotePattern: string = text('`"');
export const escapedSingleQuotePattern: string = text('`\'');
