import {
  CharacterCodes,
  TokenKinds,
} from '../../../../core/constants';
import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';

export const scanDoubleStringToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  if (!stream.consume(CharacterCodes.DoubleQuotation)) {
    return undefined;
  }

  while (!stream.eof()) {
    if (stream.consume(CharacterCodes.DoubleQuotation)) {
      if (stream.consume(CharacterCodes.DoubleQuotation)) {
        stream.advance();
        continue;
      }
      break;
    }

    if (stream.consume(CharacterCodes.Backtick)) {
      switch (stream.peek()) {
        case CharacterCodes.Comma:
        case CharacterCodes.Percent:
        case CharacterCodes.Backtick:
        case CharacterCodes.SemiColon:
        case CharacterCodes._n:
        case CharacterCodes._N:
        case CharacterCodes._r:
        case CharacterCodes._R:
        case CharacterCodes._b:
        case CharacterCodes._B:
        case CharacterCodes._t:
        case CharacterCodes._T:
        case CharacterCodes._v:
        case CharacterCodes._V:
        case CharacterCodes._a:
        case CharacterCodes._A:
        case CharacterCodes._f:
        case CharacterCodes._F:
          stream.advance();
          break;
        case CharacterCodes.Colon:
          stream.advance();
          stream.consume(CharacterCodes.Colon);
          stream.consume(CharacterCodes.Colon);
          break;
        default: break;
      }
      continue;
    }
    stream.advance();
  }
  return TokenKinds.StringLiteral;
};
