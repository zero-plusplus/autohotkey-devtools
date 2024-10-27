import { alt, asciiChar, char, group, negChar } from '../oniguruma';

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names
