import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanLessthanEqualsToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '<' && peek(1) === '=') {
    advance(2);
    return commit(TokenKind.LessthanEquals);
  }
  return undefined;
};
export const lessthanEqualsTokenRule: ScannerRule = {
  kind: TokenKind.LessthanEquals,
  scan: scanLessthanEqualsToken,
};
