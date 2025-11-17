import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanGreaterthanGreaterthanGreaterthanToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '>' && peek(1) === '>' && peek(2) === '>') {
    switch (peek(3)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance(3);
    return commit(TokenKind.GreaterthanGreaterthanGreaterthan);
  }
  return undefined;
};
export const greaterthanGreaterthanGreaterthanTokenRule: ScannerRule = {
  kind: TokenKind.GreaterthanGreaterthanGreaterthan,
  scan: scanGreaterthanGreaterthanGreaterthanToken,
};
