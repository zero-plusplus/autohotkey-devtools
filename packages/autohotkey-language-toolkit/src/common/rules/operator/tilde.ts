import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanTildeToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '~') {
    switch (peek(1)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Tilde);
  }
  return undefined;
};
export const tildeTokenRule: ScannerRule = {
  kind: TokenKind.Tilde,
  scan: scanTildeToken,
};
