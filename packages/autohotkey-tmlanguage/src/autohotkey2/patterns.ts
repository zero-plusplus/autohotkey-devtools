import { alt, asciiChar, char, group, manyXtoY, negChar, text } from '../oniguruma';

export const unescapedDoubleQuotePattern: string = text('`"');
export const unescapedSingleQuotePattern: string = text('`\'');

// #region [Names](https://www.autohotkey.com/docs/v2/Concepts.htm#names)
export const nameLimitLength = 253;
const letter = '[a-zA-Z]';
const numberChar = '\\d';
const nonAsciiChar = negChar(asciiChar());
const sign = char('_');
export const nameStart: string = group(alt(letter, nonAsciiChar, sign));
export const nameBody: string = group(alt(letter, nonAsciiChar, sign, numberChar));
// #endregion Names

export const looseLeftHandPattern: string = manyXtoY(1, nameLimitLength)(group(alt(
  nameBody,
  char('%', '[', ']', '.'),
)));
