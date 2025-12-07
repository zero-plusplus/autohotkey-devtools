import { TokenKind } from '../../../core/scanner/constants';
import type {
  RawToken,
  RawTokenScanBehavior,
  RawTokenScanController,
} from '../../../core/scanner/types';

export const scanStringToken: RawTokenScanBehavior = (controller: RawTokenScanController): RawToken | undefined => {
  const { peek } = controller;

  switch (peek()) {
    case '"': return scanStringTokenByQuote('"', controller);
    case `'`: return scanStringTokenByQuote(`'`, controller);
    default: break;
  }
  return undefined;
};

// #region helpers
function scanStringTokenByQuote(quoteChar: string, controller: RawTokenScanController): RawToken | undefined {
  const { advance, commit, consume, eof, peek } = controller;

  if (!consume(quoteChar)) {
    return undefined;
  }

  while (!eof()) {
    if (consume(quoteChar)) {
      break;
    }

    // https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm
    if (consume('`')) {
      switch (peek()) {
        case '`':
        case ';':
        case ':':
        case '{':
        case 'n':
        case 'r':
        case 'b':
        case 't':
        case 's':
        case 'v':
        case 'a':
        case 'f':
        case quoteChar:
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
