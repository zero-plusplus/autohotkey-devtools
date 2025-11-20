import { TokenKind } from '../../../core/scanner/constants';
import type {
  Cursor,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanStringToken: TokenDefinition = (curosr): Token | undefined => {
  return scanDoubleStringToken(curosr);
};

// #region helpers
function scanDoubleStringToken({ eof, peek, advance, consume, commit }: Cursor): Token | undefined {
  if (!consume('"')) {
    return undefined;
  }

  while (!eof()) {
    if (consume('"')) {
      if (peek() === '"') {
        advance();
        continue;
      }
      break;
    }

    if (consume('`')) {
      switch (peek()) {
        case ',':
        case '%':
        case '`':
        case ';':
        case 'n':
        case 'r':
        case 'b':
        case 't':
        case 'v':
        case 'a':
        case 'f':
          advance();
          break;
        case ':':
          advance();
          if (peek() === ':') {
            advance();
          }
          break;
        default: break;
      }
      continue;
    }
    advance();
  }
  return commit(TokenKind.String);
}
// #endregion helpers
