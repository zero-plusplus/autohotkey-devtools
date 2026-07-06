import { CharacterCodes } from '../../../core/constants';
import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import {
  TokenKinds,
  type TokenKind,
} from '../../constants';

export const scanLineCommentToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const prevCharCode = lexer.peek(-1);
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

  if (!lexer.consume(CharacterCodes.SemiColon)) {
    return undefined;
  }

  while (!lexer.eof()) {
    const charCode = lexer.peek();

    if (charCode === CharacterCodes.CarriageReturn || charCode === CharacterCodes.LineFeed) {
      break;
    }
    lexer.advance();
  }
  return TokenKinds.LineComment;
};
export const scanBlockCommentToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  if (!(lexer.peek() === CharacterCodes.Slash && lexer.peek(1) === CharacterCodes.Asterisk)) {
    return undefined;
  }
  lexer.advance();
  lexer.advance();

  while (!lexer.eof()) {
    if (lexer.consume(CharacterCodes.Asterisk)) {
      if (lexer.consume(CharacterCodes.Slash)) {
        return TokenKinds.BlockComment;
      }
      continue;
    }
    lexer.advance();
  }

  // missing `*/`
  return TokenKinds.BlockComment;
};
