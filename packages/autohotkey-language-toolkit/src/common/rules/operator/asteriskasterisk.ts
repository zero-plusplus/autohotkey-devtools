import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanAsteriskAsteriskToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '*' && peek(1) === '*') {
    advance(2);
    return commit(TokenKind.AsteriskAsterisk);
  }
  return undefined;
};
export const asteriskAsteriskTokenRule: ScannerRule = {
  kind: TokenKind.AsteriskAsterisk,
  scan: scanAsteriskAsteriskToken,
};
