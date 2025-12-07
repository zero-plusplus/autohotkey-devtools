import { TokenKind } from '../../../core/scanner/constants';
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

  const charCode = peekCodePoint();
  if (!isIdentifierHeadCharCode(charCode)) {
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
