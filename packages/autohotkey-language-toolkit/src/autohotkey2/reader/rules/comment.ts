import {
  scanBlockCommentToken as scanBlockCommentToken_ahkl,
  scanLineCommentToken as scanLineCommentToken_ahkl,
} from '../../../autohotkeyl/reader/rules/comment';
import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';

export const scanLineCommentToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanLineCommentToken_ahkl(lexer) as TokenKind;
};
export const scanBlockCommentToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanBlockCommentToken_ahkl(lexer) as TokenKind;
};
