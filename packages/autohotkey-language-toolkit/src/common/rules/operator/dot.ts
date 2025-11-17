import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanDotToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '.') {
    switch (peek(1)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Dot);
  }
  return undefined;
};
export const dotTokenRule: ScannerRule = {
  kind: TokenKind.Dot,
  scan: scanDotToken,
};
