import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanGreaterthanGreaterthanToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '>' && peek(1) === '>') {
    switch (peek(2)) {
      case '>':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance(2);
    return commit(TokenKind.GreaterthanGreaterthan);
  }
  return undefined;
};
export const greaterthanGreaterthanTokenRule: ScannerRule = {
  kind: TokenKind.GreaterthanGreaterthan,
  scan: scanGreaterthanGreaterthanToken,
};
