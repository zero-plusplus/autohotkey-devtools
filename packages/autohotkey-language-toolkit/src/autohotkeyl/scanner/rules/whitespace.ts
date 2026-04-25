import {
  CharacterCodes,
} from '../../../core/constants';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';

export const scanNewLineToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  ctx.consume(CharacterCodes.CarriageReturn);
  ctx.consume(CharacterCodes.LineFeed);
  if (ctx.hasNotAdvanced()) {
    return undefined;
  }
  return TokenKinds.NewLine;
};
export const scanSpaceToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  if (ctx.peekCodePoint() !== CharacterCodes.Space) {
    return undefined;
  }

  while (!ctx.eof()) {
    if (ctx.consume(CharacterCodes.Space)) {
      continue;
    }
    break;
  }
  return TokenKinds.Space;
};
export const scanTabToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  if (ctx.peekCodePoint() !== CharacterCodes.Tab) {
    return undefined;
  }

  while (!ctx.eof()) {
    if (ctx.consume(CharacterCodes.Tab)) {
      continue;
    }
    break;
  }
  return TokenKinds.Tab;
};
