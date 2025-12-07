import { TokenKind } from '../../../core/scanner/constants';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';
import {
  isDigitCharCode,
  isDotCharCode,
  isExponentialCharCode,
  isHexAlphaCharCode,
  isPlusOrMinusCode,
  isZeroDigitCharCode,
} from '../../../core/utils';

export const scanNumberToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { advance, commit, peek, peekCodePoint } = controller;

  // e.g. `0`, `0x123`
  //       ^    ^^^^^
  const firstCharCode = peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    advance();

    const nextChar = peek();
    if (nextChar === 'x' || nextChar === 'X') {
      advance();
      return scanHexValue(controller);
    }
  }

  // e.g. `123`
  //       ^^^
  scanIntegerToken(controller);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(peekCodePoint())) {
    advance();
    scanIntegerToken(controller);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(peekCodePoint())) {
    advance();
    if (isPlusOrMinusCode(peekCodePoint())) {
      advance();
    }
    scanIntegerToken(controller);
  }

  return commit(TokenKind.Number);
};

// #region helpers
function scanIntegerToken(controller: RawTokenScanController): RawToken | undefined {
  const { advance, commit, peekCodePoint } = controller;

  const firstCharCode = peekCodePoint();
  if (isZeroDigitCharCode(firstCharCode)) {
    controller.advance();
    return controller.commit(TokenKind.Number);
  }

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
function scanHexValue(controller: RawTokenScanController): RawToken | undefined {
  const { advance, commit, peekCodePoint } = controller;

  while (true) {
    const charCode = peekCodePoint();
    if (isDigitCharCode(charCode) || isHexAlphaCharCode(charCode)) {
      advance();
      continue;
    }
    break;
  }
  return commit(TokenKind.Number);
}
// #endregion helpers
