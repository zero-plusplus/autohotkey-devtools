import { alt, anyChar, anyChars0, asciiChar, char, endAnchor, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1, lookahead, lookbehind, negativeLookahead, negativeLookbehind, negChar, negChars0, opt, seq, startAnchor } from '../oniguruma';

export const lineEndAnchor: string = lookahead(alt(
  seq(inlineSpaces1(), negativeLookahead(char('`'))),
  seq(inlineSpaces0(), endAnchor()),
));
export const statementBeginAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0()),
  seq(char(':'), inlineSpaces0()),
));
export const expressionBeginAnchor: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0(), opt(char(','))),
  seq(char(':'), inlineSpaces0()),
));
export const expressionEndLineAnchor: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
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
// #endregion command

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_', '#', '@', '$');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names
