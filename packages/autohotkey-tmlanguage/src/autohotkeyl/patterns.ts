import { alt, anyChar, anyChars0, anyChars1, asciiChar, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, manyLimit, negativeLookahead, negativeLookbehind, negChar, negChars0, opt, ordalt, seq, startAnchor } from '../oniguruma';
import { operators } from './constants';

export const lineEndAnchor: string = lookahead(alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
));
export const statementBeginAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0()),
  seq(char(':'), inlineSpaces0()),
  seq(inlineSpaces0(), char('}')),
));
export const expressionBeginAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0(), opt(char(','))),
  seq(char(':'), inlineSpaces0()),
));
export const expressionEndLineAnchor: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const objectStartAnchor: string = seq(
  lookbehind(ordalt(...escapeOnigurumaTexts(operators))),
  inlineSpaces0(),
  lookahead(char('{')),
);
export const commandArgumentEndLineAnchor: string = lookahead(alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
));
export const unquotedStringChar: string = group(alt(
  negChar('\\s', ',', '%', '`', ';', ':'),
  seq(negativeLookbehind(inlineSpace()), char(';')),
  seq(inlineSpace(), negativeLookahead(';')),
));
export const brackets: string = group(alt(
  seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
  seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
  seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
));

// #region command
export const unquotedChar: string = seq(
  negativeLookahead(alt(
    seq(inlineSpaces1(), char(';')),
    seq(inlineSpaces0(), alt(
      seq(negativeLookbehind(char('`')), char(',')),
      endAnchor(),
    )),
  )),
  anyChar(),
);
export const expressionArgument: string = groupMany0(alt(
  brackets,
  negChar(','),
));
export const percentExpressionArgument: string = seq(
  char('%'),
  inlineSpaces1(),
  expressionArgument,
);
export const commandArgument: string = group(alt(
  percentExpressionArgument,
  groupMany0(alt(
    brackets,
    unquotedChar,
  )),
));
export const expressionLastArgument: string = group(anyChars0());
export const percentExpressionLastArgument: string = seq(
  char('%'),
  inlineSpaces1(),
  expressionLastArgument,
);
export const commandLastArgument: string = group(alt(
  percentExpressionLastArgument,
  groupMany0(alt(
    brackets,
    char(','),
    unquotedChar,
  )),
));
export const commandExpressionArgument: string = groupMany0(alt(
  brackets,
  negChar('\\r', '\\n', ','),
));
export const commandExpressionWithOneTrueBraceArgument: string = groupMany0(alt(
  brackets,
  negChar('\\r', '\\n', ',', '{'),
));
// #endregion command

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
export const nameLimitLength = 253;
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_', '#', '@', '$');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
export const name: string = group(seq(nameStart, manyLimit(nameBody, nameLimitLength - 1)));
export const keyName: string = group(alt(
  group(seq(char('%'), anyChars1(), char('%'))),
  name,
));
// #endregion Names
