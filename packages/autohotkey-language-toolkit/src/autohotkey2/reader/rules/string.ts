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
  return scanStringTokenByQuote(lexer, CharacterCodes.DoubleQuotation);
};
export const scanSingleStringToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  return scanStringTokenByQuote(lexer, CharacterCodes.SingleQuotation);
};

// #region helpers
export function scanStringTokenByQuote(lexer: Lexer, quoteCharCode: number): TokenKind | undefined {
  if (!lexer.consume(quoteCharCode)) {
    return undefined;
  }

  while (!lexer.eof()) {
    if (lexer.consume(quoteCharCode)) {
      break;
    }

    // https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm
    if (lexer.consume(CharacterCodes.Backtick)) {
      switch (lexer.peek()) {
        case CharacterCodes.Backtick:
        case CharacterCodes.SemiColon:
        case CharacterCodes.OpenBrace:
        case CharacterCodes._n:
        case CharacterCodes._N:
        case CharacterCodes._r:
        case CharacterCodes._R:
        case CharacterCodes._b:
        case CharacterCodes._B:
        case CharacterCodes._t:
        case CharacterCodes._T:
        case CharacterCodes._s:
        case CharacterCodes._S:
        case CharacterCodes._v:
        case CharacterCodes._V:
        case CharacterCodes._a:
        case CharacterCodes._A:
        case CharacterCodes._f:
        case CharacterCodes._F:
        case CharacterCodes.Colon: {
          lexer.advance();
          lexer.consume(CharacterCodes.Colon);
          break;
        }
        case quoteCharCode:
          lexer.advance();
          break;
        default: break;
      }
      continue;
    }
    lexer.advance();
  }
  return TokenKinds.String;
}
// #endregion helpers
