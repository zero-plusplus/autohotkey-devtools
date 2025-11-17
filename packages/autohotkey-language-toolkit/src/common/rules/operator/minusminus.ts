import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanMinusMinusToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '-' && peek(1) === '-') {
    advance(2);
    return commit(TokenKind.MinusMinus);
  }
  return undefined;
};
export const minusMinusTokenRule: ScannerRule = {
  kind: TokenKind.MinusMinus,
  scan: scanMinusMinusToken,
};
