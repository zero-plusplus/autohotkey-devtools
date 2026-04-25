import { CharacterCodes } from '../../../core/constants';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';

export const scanDoubleStringToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanStringTokenByQuote(CharacterCodes.DoubleQuotation, ctx);
};
export const scanSingleStringToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  return scanStringTokenByQuote(CharacterCodes.SingleQuotation, ctx);
};

// #region helpers
export function scanStringTokenByQuote(quoteCharCode: number, ctx: LexerContext): TokenKind | undefined {
  if (!ctx.consume(quoteCharCode)) {
    return undefined;
  }

  while (!ctx.eof()) {
    if (ctx.consume(quoteCharCode)) {
      break;
    }

    // https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm
    if (ctx.consume(CharacterCodes.Backtick)) {
      switch (ctx.peekCodePoint()) {
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
        case quoteCharCode:
          ctx.advance();
          break;
        case CharacterCodes.Colon:
          ctx.advance();
          if (ctx.peek() === ':') {
            ctx.advance();
          }
          break;
        default: break;
      }
      continue;
    }
    ctx.advance();
  }
  return TokenKinds.String;
}
// #endregion helpers
