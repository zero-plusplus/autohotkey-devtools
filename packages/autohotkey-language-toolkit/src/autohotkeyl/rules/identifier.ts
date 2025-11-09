import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../core/utils';

const tokenName = 'identifier';
export const scanIdentifier: TokenDefinition = ({ peekCodePoint, advance, commit }): Token | undefined => {
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

  return commit(tokenName);
};
export const identifierTokenRule: ScannerRule = {
  name: tokenName,
  scan: scanIdentifier,
};
