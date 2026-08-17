import {
  TokenKinds,
} from '../../../../core';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../utils';

export const scanIdentifierToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  const charCode = stream.peek();
  if (!isIdentifierHeadCharCode(charCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextCharCode = stream.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    stream.advance();
  }

  return TokenKinds.Identifier;
};
