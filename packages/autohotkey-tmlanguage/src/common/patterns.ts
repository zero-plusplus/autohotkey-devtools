import {
  alt, char, endAnchor, escapeOnigurumaTexts, group, groupMany0, inlineSpace, inlineSpaces0, inlineSpaces1,
  negativeLookahead, ordalt, seq, startAnchor,
} from '../oniguruma';
import * as constants_common from './constants';

export const lineStartAnchor: string = seq(
  group(alt(startAnchor(), '\\G')),
  inlineSpaces0(),
);
export const lineEndAnchor: string = alt(
  seq(inlineSpaces1(), negativeLookahead(char('`')), char(';')),
  seq(inlineSpaces0(), endAnchor()),
);

// https://www.autohotkey.com/docs/v2/misc/RegEx-QuickRef.htm#Options
export const regexpOptionsPattern: string = seq(
  groupMany0(alt(
    ordalt(...escapeOnigurumaTexts(constants_common.regexpOptions)),
    inlineSpace(),
  )),
  negativeLookahead(char('`')),
  char(')'),
);
