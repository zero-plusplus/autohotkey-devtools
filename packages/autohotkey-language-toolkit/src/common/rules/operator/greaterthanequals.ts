import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanGreaterthanEqualsToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '>' && peek(1) === '=') {
    advance(2);
    return commit(TokenKind.GreaterthanEquals);
  }
  return undefined;
};
export const greaterthanEqualsTokenRule: ScannerRule = {
  kind: TokenKind.GreaterthanEquals,
  scan: scanGreaterthanEqualsToken,
};
