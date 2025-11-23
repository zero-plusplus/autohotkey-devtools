import {
  CharacterCodes,
  TokenKind,
} from '../../../core/scanner/constants';
import type {
  ScanController,
  ScannerBehavior,
  Token,
} from '../../../core/scanner/types';
import {
  isLineBreakCharCode,
  isWhitespaceCharCode,
} from '../../../core/utils';

export const scanLineCommentToken: ScannerBehavior = (controller: ScanController): Token | undefined => {
  const { advance, commit, consume, eof, peekCodePoint, snapshot } = controller;

  const isCommentStart = ((): boolean => {
    if (snapshot() === 0) {
      return true;
    }

    const prevChar = peekCodePoint(-1);
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

  if (!consume(';')) {
    return undefined;
  }

  while (!eof()) {
    const currentChar = peekCodePoint();
    if (isLineBreakCharCode(currentChar)) {
      break;
    }

    advance();
  }
  return commit(TokenKind.LineComment);
};
export const scanBlockCommentToken: ScannerBehavior = (controller: ScanController): Token | undefined => {
  const { advance, commit, consume, eof, peek } = controller;

  if (!(peek() === '/' && peek(1) === '*')) {
    return undefined;
  }
  advance(2);

  while (!eof()) {
    if (consume('*')) {
      if (consume('/')) {
        return commit(TokenKind.BlockComment);
      }
      continue;
    }
    advance();
  }

  // missing `*/`
  return commit(TokenKind.BlockComment);
};
