import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanEqualsToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '=') {
    switch (peek(1)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Equals);
  }
  return undefined;
};
export const equalsTokenRule: ScannerRule = {
  kind: TokenKind.Equals,
  scan: scanEqualsToken,
};
