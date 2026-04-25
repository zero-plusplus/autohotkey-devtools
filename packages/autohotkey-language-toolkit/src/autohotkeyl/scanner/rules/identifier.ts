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
  const charCode = ctx.peekCodePoint();
  if (!isIdentifierHeadCharCode(charCode)) {
    return undefined;
  }

  const identifierTailMaxLength = 252;
  for (let i = identifierTailMaxLength; 0 < i; i--) {
    const nextCharCode = ctx.peekCodePoint();
    if (!isIdentifierTailCharCode(nextCharCode)) {
      break;
    }
    ctx.advance();
  }

  return TokenKinds.Identifier;
};
