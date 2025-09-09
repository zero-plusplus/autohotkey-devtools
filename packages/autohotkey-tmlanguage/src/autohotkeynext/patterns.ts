import * as patterns_v1 from '../autohotkeyl/patterns';
import {
  ignoreCase,
  inlineSpaces1,
  optseq,
  seq,
} from '../oniguruma';

export const classStartPattern: string = seq(
  patterns_v1.statementStartPattern,
  optseq(
    ignoreCase('export'),
    inlineSpaces1(),
    optseq(
      ignoreCase('default'),
      inlineSpaces1(),
    ),
  ),
);
