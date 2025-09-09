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
} from '../oniguruma';
import * as constants_v2 from './constants';

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const nameLimitLength = 253;
const nameBodyChars = [ '\\w', '_', '\\d' ];

export const nameStart: string = char('\\w', '_');
export const nameBody: string = char(...nameBodyChars);
export const identifierPattern: string = seq(nameStart, manyLimit(nameBody, nameLimitLength - 1));

export const nameStart_upper: string = char('A-Z', '_');
export const nameBody_upper: string = nameStart_upper;
export const upperIdentifierPattern: string = seq(nameStart_upper, manyLimit(nameBody_upper, nameLimitLength - 1));

export const keyName: string = alt(
  seq(char('%'), anyChars1(), char('%')),
  identifierPattern,
);
// #endregion Names

export const looseLeftHandPattern: string = manyRange(
  char(...nameBodyChars, '%', '[', ']', '.'),
  1,
  nameLimitLength,
);
export const expressionContinuationStartPattern: string = textalt(...constants_v2.continuationOperators, '(');
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

export const escapedDoubleQuotePattern: string = text('`"');
export const escapedSingleQuotePattern: string = text('`\'');
