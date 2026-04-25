import {
  scanNewLineToken as scanNewLineToken_ahkl,
  scanSpaceToken as scanSpaceToken_ahkl,
  scanTabToken as scanTabToken_ahkl,
} from '../../../autohotkeyl/scanner/rules/whitespace';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';

export const scanNewLineToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanNewLineToken_ahkl(ctx) as TokenKind;
};
export const scanSpaceToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanSpaceToken_ahkl(ctx) as TokenKind;
};
export const scanTabToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanTabToken_ahkl(ctx) as TokenKind;
};
