import * as patterns_v2 from '../autohotkey2/patterns.ts';
import * as patterns_common from '../common/patterns.ts';
import {
  alt,
  ignoreCase,
  inlineSpaces1,
  optseq,
  seq,
} from '../oniguruma.ts';

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
