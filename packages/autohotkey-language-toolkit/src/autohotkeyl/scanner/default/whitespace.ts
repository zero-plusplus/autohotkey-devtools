import {
  CharacterCodes,
  TokenKind,
} from '../../../core/scanner/constants';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';

export const scanLFToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, peekCodePoint } = controller;

  if (peekCodePoint() !== CharacterCodes.LineFeed) {
    return undefined;
  }

  advance();
  return commit(TokenKind.LF);
};
export const scanCRLFToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, peekCodePoint } = controller;

  if (peekCodePoint() !== CharacterCodes.CarriageReturn) {
    return undefined;
  }

  advance();
  if (peekCodePoint() === CharacterCodes.LineFeed) {
    advance();
  }
  return commit(TokenKind.CRLF);
};
export const scanSpaceToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, eof, peekCodePoint } = controller;

  if (peekCodePoint() !== CharacterCodes.Space) {
    return undefined;
  }

  while (!eof()) {
    if (peekCodePoint() !== CharacterCodes.Space) {
      break;
    }
    advance();
  }
  return commit(TokenKind.Space);
};
export const scanTabToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, eof, peekCodePoint } = controller;

  if (peekCodePoint() !== CharacterCodes.Tab) {
    return undefined;
  }

  while (!eof()) {
    if (peekCodePoint() !== CharacterCodes.Tab) {
      break;
    }
    advance();
  }
  return commit(TokenKind.Tab);
};
