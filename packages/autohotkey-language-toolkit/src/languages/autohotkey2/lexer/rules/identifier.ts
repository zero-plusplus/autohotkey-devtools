import {
  CharacterCodes,
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
  const firstCharCode = stream.peek();
  if (!isIdentifierHeadCharCode(firstCharCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = stream.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    stream.advance();
  }
  return TokenKinds.Identifier;
};
export const scanDirectiveNameToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  const firstCharCode = stream.peek();
  if (firstCharCode !== CharacterCodes.Hash) {
    return undefined;
  }
  stream.advance();

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = stream.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    stream.advance();
  }
  return TokenKinds.Identifier;
};
