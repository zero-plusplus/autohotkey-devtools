import {
  CharacterCodes,
  isDigitCharCode,
  isDotCharCode,
  isExponentialCharCode,
  isHexAlphaCharCode,
  isPlusOrMinusCode,
  isZeroDigitCharCode,
  TokenKinds,
} from '../../../../core';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';

export const scanNumberToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  const startPosition = stream.state.position;

  // e.g. `0`, `0x123`
  //       ^    ^^^^^
  const firstCharCode = stream.peek();
  if (isZeroDigitCharCode(firstCharCode)) {
    stream.advance();

    const nextCharCode = stream.peek();
    if (nextCharCode === CharacterCodes._x || nextCharCode === CharacterCodes._X) {
      stream.advance();
      return scanHexValue(stream);
    }
  }

  // e.g. `123`, `0123`
  //       ^^^    ^^^^
  scanIntegerToken(stream);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(stream.peek())) {
    stream.advance();
    scanIntegerToken(stream);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(stream.peek())) {
    stream.advance();
    if (isPlusOrMinusCode(stream.peek())) {
      stream.advance();
    }
    scanIntegerToken(stream);
  }

  if (startPosition < stream.state.position) {
    return TokenKinds.NumericLiteral;
  }
  return undefined;
};

// #region helpers
function scanIntegerToken(stream: CharStream): TokenKind | undefined {
  if (stream.consume(CharacterCodes._0)) {
    return TokenKinds.NumericLiteral;
  }

  while (true) {
    const charCode = stream.peek();
    if (charCode === CharacterCodes.Null) {
      break;
    }

    if (isDigitCharCode(charCode)) {
      stream.advance();
      continue;
    }
    break;
  }
  return TokenKinds.NumericLiteral;
}
function scanHexValue(stream: CharStream): TokenKind | undefined {
  while (true) {
    const charCode = stream.peek();
    if (isDigitCharCode(charCode) || isHexAlphaCharCode(charCode)) {
      stream.advance();
      continue;
    }
    break;
  }
  return TokenKinds.NumericLiteral;
}
// #endregion helpers
