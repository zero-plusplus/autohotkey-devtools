import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

const tokenName = 'linefeed';
export const scanLinefeed: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('\n');
  return commit(tokenName);
};
export const linefeedTokenRule: ScannerRule = {
  name: tokenName,
  scan: scanLinefeed,
};
