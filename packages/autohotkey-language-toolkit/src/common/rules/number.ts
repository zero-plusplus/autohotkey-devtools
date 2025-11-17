import { TokenKind } from '../../core/scanner/constants';
import type {
  Cursor,
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';
import {
  isDigitCharCode,
  isDotCharCode,
  isExponentialCharCode,
  isHexAlphaCharCode,
  isPlusOrMinusCode,
  isZeroDigitCharCode,
} from '../../core/utils';

export const scanNumberToken: TokenDefinition = (cursor): Token | undefined => {
  // e.g. `0`, `0x123`
  //       ^    ^^^^^
  const firstCharCode = cursor.peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    cursor.advance();

    const nextChar = cursor.peek();
    if (nextChar === 'x' || nextChar === 'X') {
      cursor.advance();
      return scanHexValue(cursor);
    }
  }

  // e.g. `123`
  //       ^^^
  scanIntegerToken(cursor);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(cursor.peekCodePoint())) {
    cursor.advance();
    scanIntegerToken(cursor);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(cursor.peekCodePoint())) {
    cursor.advance();
    if (isPlusOrMinusCode(cursor.peekCodePoint())) {
      cursor.advance();
    }
    scanIntegerToken(cursor);
  }

  return cursor.commit(TokenKind.Number);
};
export function scanIntegerToken(cursor: Cursor): Token | undefined {
  const firstCharCode = cursor.peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    cursor.advance();
    return cursor.commit(TokenKind.Number);
  }

  const { peekCodePoint, advance, commit } = cursor;
  while (true) {
    const charCode = peekCodePoint();
    if (charCode === undefined) {
      break;
    }

    if (isDigitCharCode(charCode)) {
      advance();
      continue;
    }
    break;
  }
  return commit(TokenKind.Number);
}
export const integerRule: ScannerRule = {
  kind: TokenKind.Number,
  scan: scanIntegerToken,
};

export function scanHexValue(cursor: Cursor): Token | undefined {
  while (true) {
    const charCode = cursor.peekCodePoint();
    if (isDigitCharCode(charCode) || isHexAlphaCharCode(charCode)) {
      cursor.advance();
      continue;
    }
    break;
  }
  return cursor.commit(TokenKind.Number);
}
