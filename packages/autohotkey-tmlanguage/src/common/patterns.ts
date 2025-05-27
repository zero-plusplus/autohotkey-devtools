import { alt, char, endAnchor, group, inlineSpaces0, inlineSpaces1, negativeLookahead, seq, startAnchor } from '../oniguruma';

export const lineStartAnchor: string = seq(
  group(alt(startAnchor(), '\\G')),
  inlineSpaces0(),
);
export const lineEndAnchor: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);
