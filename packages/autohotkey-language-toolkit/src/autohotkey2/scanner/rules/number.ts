import {
  TokenKinds,
  type TokenKind,
} from '../../../autohotkeyl/constants';
import { CharacterCodes } from '../../../core/constants';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import {
  isDigitCharCode,
  isDotCharCode,
  isExponentialCharCode,
  isHexAlphaCharCode,
  isPlusOrMinusCode,
  isZeroDigitCharCode,
} from '../../../core/utils';

export const scanNumberToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  // e.g. `0`, `0x123`
  //       ^    ^^^^^
  const firstCharCode = ctx.peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    ctx.advance();

    const nextCharCode = ctx.peekCodePoint();
    if (nextCharCode === CharacterCodes._x || nextCharCode === CharacterCodes._X) {
      ctx.advance();
      return scanHexValue(ctx);
    }
  }

  // e.g. `123`, `0123`
  //       ^^^    ^^^^
  scanIntegerToken(ctx);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(ctx.peekCodePoint())) {
    ctx.advance();
    scanIntegerToken(ctx);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(ctx.peekCodePoint())) {
    ctx.advance();
    if (isPlusOrMinusCode(ctx.peekCodePoint())) {
      ctx.advance();
    }
    scanIntegerToken(ctx);
  }

  if (ctx.hasNotAdvanced()) {
    return undefined;
  }
  return TokenKinds.Number;
};

// #region helpers
function scanIntegerToken(ctx: LexerContext): TokenKind | undefined {
  if (ctx.consume(CharacterCodes._0)) {
    return TokenKinds.Number;
  }

  while (true) {
    const charCode = ctx.peekCodePoint();
    if (charCode === undefined) {
      break;
    }

    if (isDigitCharCode(charCode)) {
      ctx.advance();
      continue;
    }
    break;
  }
  return TokenKinds.Number;
}
function scanHexValue(ctx: LexerContext): TokenKind | undefined {
  while (true) {
    const charCode = ctx.peekCodePoint();
    if (isDigitCharCode(charCode) || isHexAlphaCharCode(charCode)) {
      ctx.advance();
      continue;
    }
    break;
  }
  return TokenKinds.Number;
}
// #endregion helpers
