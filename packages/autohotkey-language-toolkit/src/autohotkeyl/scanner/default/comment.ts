import {
  CharacterCodes,
  TokenKind,
} from '../../../core/scanner/constants';
import type {
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';
import {
  isLineBreakCharCode,
  isWhitespaceCharCode,
} from '../../../core/utils';

export const scanLineCommentToken: TokenDefinition = (cursor): Token | undefined => {
  const isCommentStart = ((): boolean => {
    if (cursor.snapshot() === 0) {
      return true;
    }

    const prevChar = cursor.peekCodePoint(-1);
    if (prevChar === CharacterCodes.Bom) {
      return true;
    }
    else if (isWhitespaceCharCode(prevChar)) {
      return true;
    }
    return false;
  })();

  if (!isCommentStart) {
    return undefined;
  }

  if (!cursor.consume(';')) {
    return undefined;
  }

  while (!cursor.eof()) {
    const currentChar = cursor.peekCodePoint();
    if (isLineBreakCharCode(currentChar)) {
      break;
    }

    cursor.advance();
  }
  return cursor.commit(TokenKind.LineComment);
};
export const scanBlockCommentToken: TokenDefinition = (cursor): Token | undefined => {
  if (!(cursor.peek() === '/' && cursor.peek(1) === '*')) {
    return undefined;
  }
  cursor.advance(2);

  while (!cursor.eof()) {
    if (cursor.consume('*')) {
      if (cursor.consume('/')) {
        return cursor.commit(TokenKind.BlockComment);
      }
      continue;
    }
    cursor.advance();
  }

  // missing `*/`
  return cursor.commit(TokenKind.BlockComment);
};
