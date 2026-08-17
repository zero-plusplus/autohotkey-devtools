import {
  CharacterCodes,
  TokenKinds,
} from '../../../../core';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';

export const scanLineCommentToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  const prevCharCode = stream.peek(-1);
  switch (prevCharCode) {
    case CharacterCodes.Bom:
    case CharacterCodes.Space:
    case CharacterCodes.Tab:
    case CharacterCodes.CarriageReturn:
    case CharacterCodes.LineFeed:
    case CharacterCodes.Null:
      break;
    default: return undefined;
  }

  if (!stream.consume(CharacterCodes.SemiColon)) {
    return undefined;
  }

  while (!stream.eof()) {
    const charCode = stream.peek();

    if (charCode === CharacterCodes.CarriageReturn || charCode === CharacterCodes.LineFeed) {
      break;
    }
    stream.advance();
  }
  return TokenKinds.LineComment;
};
export const scanBlockCommentToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  if (!(stream.peek() === CharacterCodes.Slash && stream.peek(1) === CharacterCodes.Asterisk)) {
    return undefined;
  }
  stream.advance();
  stream.advance();

  while (!stream.eof()) {
    if (stream.consume(CharacterCodes.Asterisk)) {
      if (stream.consume(CharacterCodes.Slash)) {
        return TokenKinds.BlockComment;
      }
      continue;
    }
    stream.advance();
  }

  // missing `*/`
  return TokenKinds.BlockComment;
};
