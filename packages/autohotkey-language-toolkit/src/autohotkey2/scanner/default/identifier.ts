import { TokenKind } from '../../../core/scanner/constants';
import type {
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../utils';

export const scanIdentifierToken: TokenDefinition = ({ peekCodePoint, advance, commit }): Token | undefined => {
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
