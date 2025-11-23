import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScanController,
  ScannerBehavior,
  Token,
} from '../../../core/scanner/types';

export const scanStringToken: ScannerBehavior = (controller: ScanController): Token | undefined => {
  return scanDoubleStringToken(controller);
};

// #region helpers
function scanDoubleStringToken(controller: ScanController): Token | undefined {
  const { advance, commit, consume, eof, peek } = controller;

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
