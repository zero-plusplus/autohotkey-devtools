import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';
import {
  scanBlockCommentToken as scanBlockCommentToken_ahkl,
  scanLineCommentToken as scanLineCommentToken_ahkl,
} from '../../../autohotkeyl';

export const scanLineCommentToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanLineCommentToken_ahkl(stream);
};
export const scanBlockCommentToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanBlockCommentToken_ahkl(stream);
};
