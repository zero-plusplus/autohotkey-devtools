import {
  CharacterCodes,
  TokenKinds,
} from '../../../../core';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';

export const scanNewLineToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  // \r\n or \r
  if (stream.consume(CharacterCodes.CarriageReturn)) {
    if (stream.consume(CharacterCodes.LineFeed)) {
      return TokenKinds.NewLine;
    }
    return TokenKinds.NewLine;
  }

  // \n
  if (stream.consume(CharacterCodes.LineFeed)) {
    return TokenKinds.NewLine;
  }
  return undefined;
};
export const scanSpaceToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  if (stream.peek() !== CharacterCodes.Space) {
    return undefined;
  }

  while (!stream.eof()) {
    if (stream.consume(CharacterCodes.Space)) {
      continue;
    }
    break;
  }
  return TokenKinds.Space;
};
export const scanTabToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  if (stream.peek() !== CharacterCodes.Tab) {
    return undefined;
  }

  while (!stream.eof()) {
    if (stream.consume(CharacterCodes.Tab)) {
      continue;
    }
    break;
  }
  return TokenKinds.Tab;
};
