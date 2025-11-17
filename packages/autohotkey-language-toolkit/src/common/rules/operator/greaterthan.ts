import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanGreaterthanToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '>') {
    switch (peek(1)) {
      case '>':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Greaterthan);
  }
  return undefined;
};
export const greaterthanTokenRule: ScannerRule = {
  kind: TokenKind.Greaterthan,
  scan: scanGreaterthanToken,
};
