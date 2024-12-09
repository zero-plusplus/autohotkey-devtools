import { alt, asciiChar, char, group, groupMany0, negativeLookbehind, negChar, negChars1, seq } from '../oniguruma';

export const doubleQuoteRawTextPattern: string = negChars1('"', '`');
export const doubleQuoteContentsPattern: string = groupMany0(alt(
  group(seq(char('`'), char('"'))),
  negChar('"'),
));
export const doubleQuoteStringEndPattern: string = seq(
  negativeLookbehind(char('`')),
  char('"'),
);
export const singleQuoteRawTextPattern: string = negChars1('"', '`');
export const singleQuoteContentsPattern: string = groupMany0(alt(
  group(seq(char('`'), char(`'`))),
  negChar(`'`),
));
export const singleQuoteStringEndPattern: string = seq(
  negativeLookbehind(char('`')),
  char(`'`),
);

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names
