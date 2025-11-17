import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanExclamationToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '!') {
    switch (peek(1)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Exclamation);
  }
  return undefined;
};
export const exclamationTokenRule: ScannerRule = {
  kind: TokenKind.Exclamation,
  scan: scanExclamationToken,
};
