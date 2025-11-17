import { TokenKind } from '../../core/scanner/constants';
import type {
  Cursor,
  ScannerRule,
  Token,
} from '../../core/scanner/types';
import {
  isDigitCharCode,
  isHexAlphaCharCode,
  isZeroDigitCharCode,
} from '../../core/utils';

export function scanInteger(cursor: Cursor): Token | undefined {
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
  return cursor.commit(TokenKind.Number);
}
