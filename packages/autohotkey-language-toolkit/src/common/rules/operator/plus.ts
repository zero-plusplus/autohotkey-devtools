import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanPlusToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '+') {
    switch (peek(1)) {
      case '+':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Plus);
  }
  return undefined;
};
export const plusTokenRule: ScannerRule = {
  kind: TokenKind.Plus,
  scan: scanPlusToken,
};
