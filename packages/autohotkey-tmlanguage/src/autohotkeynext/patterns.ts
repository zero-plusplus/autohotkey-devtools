import * as patterns_v1 from '../autohotkeyl/patterns';
import * as patterns_common from '../common/patterns';
import {
  alt,
  group,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  lookbehind,
  optseq,
  seq,
} from '../oniguruma';

export const exportStartPattern: string = group(seq(
  lookbehind(patterns_common.lineStartPattern),
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
export const classStartPattern: string = group(alt(
  exportStartPattern,
  patterns_v1.statementStartPattern,
));
