import { TokenKind } from '../../core/scanner/constants';
import type {
  Cursor,
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

export const scanStringToken: TokenDefinition = (cursor): Token | undefined => {
  switch (cursor.peek()) {
    case '"': return scanStringTokenByQuote('"', cursor);
    case `'`: return scanStringTokenByQuote(`'`, cursor);
    default: break;
  }
  return undefined;
};
export const stringTokenRule: ScannerRule = {
  kind: TokenKind.String,
  scan: scanStringToken,
};

function scanStringTokenByQuote(quoteChar: string, cursor: Cursor): Token | undefined {
  if (!cursor.consume(quoteChar)) {
    return undefined;
  }

  while (!cursor.eof()) {
    if (cursor.consume(quoteChar)) {
      break;
    }

    // https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm
    if (cursor.consume('`')) {
      switch (cursor.peek()) {
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
          cursor.advance();
          break;
        case ':':
          cursor.advance();
          if (cursor.peek() === ':') {
            cursor.advance();
          }
          break;
        default: break;
      }
      continue;
    }
    cursor.advance();
  }
  return cursor.commit(TokenKind.String);
}
