import {
  CharacterCodes,
} from '../../../core/constants';
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
  const firstCharCode = lexer.peek();
  if (!isIdentifierHeadCharCode(firstCharCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = lexer.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    lexer.advance();
  }
  return TokenKinds.Identifier;
};
export const scanDirectiveNameToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const firstCharCode = lexer.peek();
  if (firstCharCode !== CharacterCodes.Hash) {
    return undefined;
  }
  lexer.advance();

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = lexer.peek();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    lexer.advance();
  }
  return TokenKinds.Identifier;
};
