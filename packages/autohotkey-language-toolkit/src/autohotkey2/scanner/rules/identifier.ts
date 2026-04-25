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
import {
  isIdentifierHeadCharCode,
  isIdentifierTailCharCode,
} from '../../utils';

export const scanIdentifierToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  const firstCharCode = ctx.peekCodePoint();
  if (!isIdentifierHeadCharCode(firstCharCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = ctx.peekCodePoint();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    ctx.advance();
  }
  return TokenKinds.Identifier;
};
export const scanDirectiveNameToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  const firstCharCode = ctx.peekCodePoint();
  if (firstCharCode !== CharacterCodes.Hash) {
    return undefined;
  }
  ctx.advance();

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; i--;) {
    const nextCharCode = ctx.peekCodePoint();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    ctx.advance();
  }
  return TokenKinds.Identifier;
};
