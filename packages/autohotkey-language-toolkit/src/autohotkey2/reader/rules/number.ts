import {
  TokenKinds,
  type TokenKind,
} from '../../../autohotkeyl/constants';
import { CharacterCodes } from '../../../core/constants';
import type {
  Lexer,
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

export const scanNumberToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const startPosition = lexer.state.position;

  // e.g. `0`, `0x123`
  //       ^    ^^^^^
  const firstCharCode = lexer.peek();
  if (isZeroDigitCharCode(firstCharCode)) {
    lexer.advance();

    const nextCharCode = lexer.peek();
    if (nextCharCode === CharacterCodes._x || nextCharCode === CharacterCodes._X) {
      lexer.advance();
      return scanHexValue(lexer);
    }
  }

  // e.g. `123`, `0123`
  //       ^^^    ^^^^
  scanIntegerToken(lexer);

  // e.g. `123.123`
  //          ^^^^
  if (isDotCharCode(lexer.peek())) {
    lexer.advance();
    scanIntegerToken(lexer);
  }

  // e.g. `123.123e+100`
  //               ^^^^
  if (isExponentialCharCode(lexer.peek())) {
    lexer.advance();
    if (isPlusOrMinusCode(lexer.peek())) {
      lexer.advance();
    }
    scanIntegerToken(lexer);
  }

  if (startPosition < lexer.state.position) {
    return TokenKinds.Number;
  }
  return undefined;
};

// #region helpers
function scanIntegerToken(lexer: Lexer): TokenKind | undefined {
  if (lexer.consume(CharacterCodes._0)) {
    return TokenKinds.Number;
  }

  while (true) {
    const charCode = lexer.peek();
    if (charCode === CharacterCodes.Null) {
      break;
    }

    if (isDigitCharCode(charCode)) {
      lexer.advance();
      continue;
    }
    break;
  }
  return TokenKinds.Number;
}
function scanHexValue(lexer: Lexer): TokenKind | undefined {
  while (true) {
    const charCode = lexer.peek();
    if (isDigitCharCode(charCode) || isHexAlphaCharCode(charCode)) {
      lexer.advance();
      continue;
    }
    break;
  }
  return TokenKinds.Number;
}
// #endregion helpers
