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

export const scanNewLineToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const startPosition = lexer.state.position;
  lexer.consume(CharacterCodes.CarriageReturn);
  lexer.consume(CharacterCodes.LineFeed);
  if (startPosition < lexer.state.position) {
    return TokenKinds.NewLine;
  }
  return undefined;
};
export const scanSpaceToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  if (lexer.peek() !== CharacterCodes.Space) {
    return undefined;
  }

  while (!lexer.eof()) {
    if (lexer.consume(CharacterCodes.Space)) {
      continue;
    }
    break;
  }
  return TokenKinds.Space;
};
export const scanTabToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  if (lexer.peek() !== CharacterCodes.Tab) {
    return undefined;
  }

  while (!lexer.eof()) {
    if (lexer.consume(CharacterCodes.Tab)) {
      continue;
    }
    break;
  }
  return TokenKinds.Tab;
};
