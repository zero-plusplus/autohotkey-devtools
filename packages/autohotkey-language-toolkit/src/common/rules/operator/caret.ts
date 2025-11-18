import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanCaretToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '^') {
    switch (peek(1)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Caret);
  }
  return undefined;
};
export const caretTokenRule: ScannerRule = {
  kind: TokenKind.Caret,
  scan: scanCaretToken,
};
