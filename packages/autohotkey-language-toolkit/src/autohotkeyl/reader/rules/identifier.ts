import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../utils';

export const scanIdentifierToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const charCode = lexer.peek();
  if (!isIdentifierHeadCharCode(charCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextCharCode = lexer.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    lexer.advance();
  }

  return TokenKinds.Identifier;
};
