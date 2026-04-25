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
  if (!ctx.consume(CharacterCodes.DoubleQuotation)) {
    return undefined;
  }

  while (!ctx.eof()) {
    if (ctx.consume(CharacterCodes.DoubleQuotation)) {
      if (ctx.consume(CharacterCodes.DoubleQuotation)) {
        ctx.advance();
        continue;
      }
      break;
    }

    if (ctx.consume(CharacterCodes.Backtick)) {
      switch (ctx.peekCodePoint()) {
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
          ctx.advance();
          break;
        case CharacterCodes.Colon:
          ctx.advance();
          if (ctx.consume(CharacterCodes.Colon)) {
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
};
