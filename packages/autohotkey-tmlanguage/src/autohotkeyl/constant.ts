import { alt, char, endAnchor, inlineSpaces0, inlineSpaces1, seq } from '../oniguruma';

export const expressionEndLine: string = alt(
  seq(inlineSpaces1(), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
