import { alt, asciiChar, char, endAnchor, group, inlineSpace, inlineSpaces0, inlineSpaces1, lookbehind, negativeLookahead, negChar, negChars0, opt, seq, startAnchor } from '../oniguruma';

export const expressionBegin: string = lookbehind(alt(
  seq(startAnchor(), inlineSpaces0(), opt(char(','))),
  seq(char(':'), inlineSpaces0()),
));
export const expressionEndLine: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
export const legacyText: string = group(alt(
  negChar('\\s', ',', '%', '`', ';', ':'),
  seq(inlineSpace(), negativeLookahead(';')),
));
export const brackets: string = group(alt(
  seq(char('('), negChars0('\\r', '\\n', ')'), char(')')),
  seq(char('['), negChars0('\\r', '\\n', ']'), char(']')),
  seq(char('{'), negChars0('\\r', '\\n', '}'), char('}')),
));

// #region [Names](https://www.autohotkey.com/docs/v1/Concepts.htm#names)
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_', '#', '@', '$');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names
