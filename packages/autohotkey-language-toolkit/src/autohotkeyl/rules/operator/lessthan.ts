import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanLessthanToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '<') {
    switch (peek(1)) {
      case '<':
      case '>':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Lessthan);
  }
  return undefined;
};
export const lessthanTokenRule: ScannerRule = {
  kind: TokenKind.Lessthan,
  scan: scanLessthanToken,
};
