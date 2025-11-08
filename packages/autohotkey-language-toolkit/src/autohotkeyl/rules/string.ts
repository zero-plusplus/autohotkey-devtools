import type {
  Cursor,
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

const tokenName = 'string';
export const scanString: TokenDefinition = (curosr): Token | undefined => {
  return scanDoubleString(curosr);
};
export const stringRule: ScannerRule = {
  name: tokenName,
  scan: scanString,
};

function scanDoubleString({ eof, peek, advance, consume, commit }: Cursor): Token | undefined {
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
  return commit(tokenName);
}
