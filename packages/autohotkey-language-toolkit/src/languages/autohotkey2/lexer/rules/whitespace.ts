import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';
import {
  scanNewLineToken as scanNewLineToken_ahkl,
  scanSpaceToken as scanSpaceToken_ahkl,
  scanTabToken as scanTabToken_ahkl,
} from '../../../autohotkeyl';

export const scanNewLineToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanNewLineToken_ahkl(stream);
};
export const scanSpaceToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanSpaceToken_ahkl(stream);
};
export const scanTabToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanTabToken_ahkl(stream);
};
