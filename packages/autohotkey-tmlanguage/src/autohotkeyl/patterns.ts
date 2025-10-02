import * as patterns_common from '../common/patterns';
import {
  alt,
  anyChars0,
  char,
  endAnchor,
  group,
  groupMany0,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  lookahead,
  manyLimit,
  negativeLookahead,
  negChar,
  number,
  optional,
  reluctant,
  seq,
  text,
  textalt,
  wordChar,
} from '../oniguruma';
import * as constants_v1 from './constants';

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
const nameLimitLength = 253;
const sign = char('_', '#', '@', '$');

export const identifierStart: string = group(alt(wordChar(), sign));
export const identifierPart: string = group(alt(wordChar(), sign, number()));
export const identifierPattern: string = group(seq(identifierStart, manyLimit(identifierPart, nameLimitLength - 1)));

export const identifierStart_upper: string = group('[A-Z_]');
export const identifierPart_upper: string = group('[A-Z_]');
export const identifierPattern_upper: string = group(seq(identifierStart_upper, manyLimit(identifierPart_upper, nameLimitLength - 1)));
export const identifierEndPattern: string = group(alt(
  negChar(wordChar(), number(), '_', '#', '@', '$'),
  inlineSpace(),
  endAnchor(),
));

export const objectKeyNamePattern: string = alt(
  seq(char('['), reluctant(anyChars0()), char(']')),
  seq(char('{'), reluctant(anyChars0()), char('}')),
  seq(char('%'), reluctant(anyChars0()), char('%')),
  identifierPattern,
  char('%'),
);

// Note: Analyze roughly, as accurate analysis slows down the speed of analysis to a great extent
export const looseCallableNamePattern: string = manyLimit(group(alt(
  identifierPart,
  char('%'),
)), nameLimitLength);
// #endregion Names

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
export const continuationExpressionStartPattern: string = group(textalt(...constants_v1.continuationOperators));
export const expressionEndPattern: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const controlFlowEndPattern: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), char('{')),
  seq(inlineSpaces0(), endAnchor()),
);
export const doubleQuoteCharPattern: string = `"`;
export const escapedDoubleQuotePattern: string = text('""');

// https://www.autohotkey.com/docs/v1/misc/RegEx-QuickRef.htm#Options
export const regexpOptionsPattern: string = seq(
  groupMany0(alt(
    textalt(...constants_v1.regexpOptions),
    inlineSpace(),
  )),
  negativeLookahead(char('`')),
  char(')'),
);

// #region command
export const commandArgumentStartPattern: string = lookahead(alt(
  seq(inlineSpaces0(), negativeLookahead(textalt(...constants_v1.expressionOperators))),
  seq(inlineSpaces1()),
  seq(inlineSpaces0(), char(',')),
));
// #endregion command

