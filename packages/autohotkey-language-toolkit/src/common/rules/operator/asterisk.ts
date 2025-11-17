import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanAsteriskToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '*') {
    switch (peek(1)) {
      case '*':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Asterisk);
  }
  return undefined;
};
export const asteriskTokenRule: ScannerRule = {
  kind: TokenKind.Asterisk,
  scan: scanAsteriskToken,
};
