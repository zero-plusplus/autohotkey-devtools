import * as patterns_common from '../common/patterns';
import {
  alt,
  anyChars0,
  anyChars1,
  char,
  endAnchor,
  group,
  groupMany0,
  groupMany1,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  lookahead,
  manyLimit,
  manyRange,
  negativeLookahead,
  negChar,
  number,
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

export const nameStart: string = group(alt(wordChar(), sign));
export const nameBody: string = group(alt(wordChar(), sign, number()));
export const identifierPattern: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));

export const nameStart_upper: string = group('[A-Z_]');
export const nameBody_upper: string = group('[A-Z_]');
export const upperIdentifierPattern: string = group(seq(nameStart_upper, manyLimit(nameBody_upper, nameLimitLength - 1)));
export const identifierEndPattern: string = group(alt(
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

export const statementStartPattern: string = alt(
  patterns_common.lineStartPattern,
  seq(patterns_common.lineStartPattern, inlineSpaces0(), groupMany1(alt(negChar(':', seq(char('`'), char(':'))))), text('::'), inlineSpaces0()),
  seq(patterns_common.lineStartPattern, inlineSpaces0(), ignoreCase('case'), inlineSpace(), reluctant(anyChars0()), char(':'), inlineSpaces0()),
  seq(patterns_common.lineStartPattern, inlineSpaces0(), identifierPattern, char(':'), inlineSpaces0()),
  seq(patterns_common.lineStartPattern, inlineSpaces0(), char('}')),
);
export const expressionContinuationStartPattern: string = group(textalt(...constants_v1.continuationOperators));
export const expressionEndPattern: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const controlFlowEndPattern: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), char('{')),
  seq(inlineSpaces0(), endAnchor()),
);
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

