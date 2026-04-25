import { CharacterCodes } from '../../../core/constants';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';

export const scanLineCommentToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  const prevCharCode = ctx.peekCodePoint(-1);
  switch (prevCharCode) {
    case CharacterCodes.Bom:
    case CharacterCodes.Space:
    case CharacterCodes.Tab:
    case CharacterCodes.CarriageReturn:
    case CharacterCodes.LineFeed:
    case undefined:
      break;
    default: return undefined;
  }

  if (!ctx.consume(CharacterCodes.SemiColon)) {
    return undefined;
  }

  while (!ctx.eof()) {
    const charCode = ctx.peekCodePoint();

    if (charCode === CharacterCodes.CarriageReturn || charCode === CharacterCodes.LineFeed) {
      break;
    }
    ctx.advance();
  }
  return TokenKinds.LineComment;
};
export const scanBlockCommentToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  if (!(ctx.peekCodePoint() === CharacterCodes.Slash && ctx.peekCodePoint(1) === CharacterCodes.Asterisk)) {
    return undefined;
  }
  ctx.advanceBy(2);

  while (!ctx.eof()) {
    if (ctx.consume(CharacterCodes.Asterisk)) {
      if (ctx.consume(CharacterCodes.Slash)) {
        return TokenKinds.BlockComment;
      }
      continue;
    }
    ctx.advance();
  }

  // missing `*/`
  return TokenKinds.BlockComment;
};
