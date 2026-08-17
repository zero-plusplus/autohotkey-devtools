import {
  CharacterCodes,
  TokenKinds,
} from '../../../../core';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';

export const scanDoubleStringToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanStringTokenByQuote(stream, CharacterCodes.DoubleQuotation);
};
export const scanSingleStringToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  return scanStringTokenByQuote(stream, CharacterCodes.SingleQuotation);
};

// #region helpers
export function scanStringTokenByQuote(stream: CharStream, quoteCharCode: number): TokenKind | undefined {
  if (!stream.consume(quoteCharCode)) {
    return undefined;
  }

  while (!stream.eof()) {
    if (stream.consume(quoteCharCode)) {
      break;
    }

    // https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm
    if (stream.consume(CharacterCodes.Backtick)) {
      switch (stream.peek()) {
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
          stream.advance();
          stream.consume(CharacterCodes.Colon);
          break;
        }
        case quoteCharCode:
          stream.advance();
          break;
        default: break;
      }
      continue;
    }
    stream.advance();
  }
  return TokenKinds.StringLiteral;
}
// #endregion helpers
