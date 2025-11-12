import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

const tokenName = 'carriageReturn';
export const scanCarriageReturn: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('\r');
  return commit(tokenName);
};
export const carriageReturnTokenRule: ScannerRule = {
  name: tokenName,
  scan: scanCarriageReturn,
};
