import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanMinusToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '-') {
    switch (peek(1)) {
      case '-':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Minus);
  }
  return undefined;
};
export const minusTokenRule: ScannerRule = {
  kind: TokenKind.Minus,
  scan: scanMinusToken,
};
