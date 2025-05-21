import * as patterns_v1 from '../autohotkeyl/patterns';
import * as patterns_common from '../common/patterns';
import { alt, group, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, lookbehind, optseq, seq } from '../oniguruma';

export const exportStartAnchor: string = group(seq(
  lookbehind(patterns_common.lineStartAnchor),
  inlineSpaces0(),
  optseq(
    ignoreCase('export'),
    optseq(
      inlineSpaces1(),
      ignoreCase('default'),
      inlineSpace(),
    ),
  ),
));
export const classStartAnchor: string = group(alt(
  exportStartAnchor,
  patterns_v1.statementStartAnchor,
));
