import {
  CharacterCodes,
  TokenKind,
} from '../../../core/scanner/constants';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../utils';

export const scanIdentifierToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, peekCodePoint } = controller;

  const firstCharCode = peekCodePoint();
  if (!isIdentifierHeadCharCode(firstCharCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextCharCode = peekCodePoint();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    advance();
  }

  return commit(TokenKind.Identifier);
};

export const scanDirectiveNameToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, peekCodePoint } = controller;

  const firstCharCode = peekCodePoint();
  if (firstCharCode !== CharacterCodes.Hash) {
    return undefined;
  }
  advance();

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextCharCode = peekCodePoint();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    advance();
  }

  return commit(TokenKind.Identifier);
};
