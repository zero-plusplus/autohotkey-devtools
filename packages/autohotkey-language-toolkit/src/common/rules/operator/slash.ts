import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanSlashToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '/') {
    switch (peek(1)) {
      case '/':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Slash);
  }
  return undefined;
};
export const slashTokenRule: ScannerRule = {
  kind: TokenKind.Slash,
  scan: scanSlashToken,
};
