import * as patterns_v2 from '../autohotkey2/patterns';
import * as patterns_common from '../common/patterns';
import {
  alt,
  ignoreCase,
  inlineSpaces1,
  optseq,
  seq,
} from '../oniguruma';

export const classStartPattern: string = seq(
  patterns_v2.statementStartPattern,
  optseq(
    ignoreCase('export'),
    inlineSpaces1(),
    optseq(
      ignoreCase('default'),
      inlineSpaces1(),
    ),
  ),
);
export const typeAssignmentStartPattern: string = alt(patterns_common.lineStartPattern, ',');
