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

const tokenName = 'number';
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
    return cursor.commit(tokenName);
  }

  // e.g. `123`
  //       ^^^
  scanInteger(cursor);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(cursor.peekCodePoint())) {
    cursor.advance();
    scanInteger(cursor);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(cursor.peekCodePoint())) {
    cursor.advance();
    if (isPlusOrMinusCode(cursor.peekCodePoint())) {
      cursor.advance();
    }
    scanInteger(cursor);
  }

  return cursor.commit(tokenName);
};
export const numberTokenRule: ScannerRule = {
  name: tokenName,
  scan: scanNumber,
};

export function scanInteger(cursor: Cursor): Token | undefined {
  const firstCharCode = cursor.peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    cursor.advance();
    return cursor.commit(tokenName);
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
  return commit(tokenName);
}
export const integerRule: ScannerRule = {
  name: 'integer',
  scan: scanInteger,
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
  return cursor.commit(tokenName);
}
