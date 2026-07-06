import { CharacterCodes } from '../../../core/constants';
import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';

export const scanDoubleStringToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  if (!lexer.consume(CharacterCodes.DoubleQuotation)) {
    return undefined;
  }

  while (!lexer.eof()) {
    if (lexer.consume(CharacterCodes.DoubleQuotation)) {
      if (lexer.consume(CharacterCodes.DoubleQuotation)) {
        lexer.advance();
        continue;
      }
      break;
    }

    if (lexer.consume(CharacterCodes.Backtick)) {
      switch (lexer.peek()) {
        case CharacterCodes.Comma:
        case CharacterCodes.Percent:
        case CharacterCodes.Backtick:
        case CharacterCodes.SemiColon:
        case CharacterCodes._n:
        case CharacterCodes._N:
        case CharacterCodes._r:
        case CharacterCodes._R:
        case CharacterCodes._b:
        case CharacterCodes._B:
        case CharacterCodes._t:
        case CharacterCodes._T:
        case CharacterCodes._v:
        case CharacterCodes._V:
        case CharacterCodes._a:
        case CharacterCodes._A:
        case CharacterCodes._f:
        case CharacterCodes._F:
          lexer.advance();
          break;
        case CharacterCodes.Colon:
          lexer.advance();
          lexer.consume(CharacterCodes.Colon);
          lexer.consume(CharacterCodes.Colon);
          break;
        default: break;
      }
      continue;
    }
    lexer.advance();
  }
  return TokenKinds.String;
};
