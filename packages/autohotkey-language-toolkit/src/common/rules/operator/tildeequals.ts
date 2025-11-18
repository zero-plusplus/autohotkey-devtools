import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanTildeEqualsToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '~' && peek(1) === '=') {
    advance(2);
    return commit(TokenKind.TildeEquals);
  }
  return undefined;
};
export const tildeEqualsTokenRule: ScannerRule = {
  kind: TokenKind.TildeEquals,
  scan: scanTildeEqualsToken,
};
