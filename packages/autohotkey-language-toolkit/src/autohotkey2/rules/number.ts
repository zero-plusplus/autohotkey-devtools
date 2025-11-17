import {
  scanHexValue,
  scanIntegerToken,
} from '../../common/rules/number';
import { TokenKind } from '../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';
import {
  isDotCharCode,
  isExponentialCharCode,
  isPlusOrMinusCode,
  isZeroDigitCharCode,
} from '../../core/utils';

export const scanNumber: TokenDefinition = (cursor): Token | undefined => {
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
    return cursor.commit(TokenKind.Number);
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
export const numberTokenRule: ScannerRule = {
  kind: TokenKind.Number,
  scan: scanNumber,
};
