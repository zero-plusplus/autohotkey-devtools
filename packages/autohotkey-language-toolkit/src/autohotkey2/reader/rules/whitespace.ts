import {
  scanNewLineToken as scanNewLineToken_ahkl,
  scanSpaceToken as scanSpaceToken_ahkl,
  scanTabToken as scanTabToken_ahkl,
} from '../../../autohotkeyl/reader/rules/whitespace';
import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';

export const scanNewLineToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanNewLineToken_ahkl(lexer) as TokenKind;
};
export const scanSpaceToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanSpaceToken_ahkl(lexer) as TokenKind;
};
export const scanTabToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanTabToken_ahkl(lexer) as TokenKind;
};
