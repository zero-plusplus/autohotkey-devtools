import { alt, group, inlineSpaces0, seq, startAnchor } from '../oniguruma';

export const lineStartAnchor: string = seq(
  group(alt(startAnchor(), '\\G')),
  inlineSpaces0(),
);
