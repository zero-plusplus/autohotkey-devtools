import {
  scanBlockCommentToken as scanBlockCommentToken_ahkl,
  scanLineCommentToken as scanLineCommentToken_ahkl,
} from '../../../autohotkeyl/scanner/rules/comment';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';

export const scanLineCommentToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanLineCommentToken_ahkl(ctx) as TokenKind;
};
export const scanBlockCommentToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanBlockCommentToken_ahkl(ctx) as TokenKind;
};
