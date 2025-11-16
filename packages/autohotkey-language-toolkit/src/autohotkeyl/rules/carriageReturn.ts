import { TokenKind } from '../../core/scanner/constants';
import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

export const scanCarriageReturn: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('\r');
  return commit(TokenKind.CarriageReturn);
};
export const carriageReturnTokenRule: ScannerRule = {
  kind: TokenKind.CarriageReturn,
  scan: scanCarriageReturn,
};
