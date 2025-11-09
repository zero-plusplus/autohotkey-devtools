import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

const tokenName = 'linefeed';
export const scanLinefeed: TokenDefinition = ({ eof, consume, commit }): Token | undefined => {
  while (!eof()) {
    if (consume('\n')) {
      continue;
    }
    break;
  }
  return commit(tokenName);
};
export const linefeedRule: ScannerRule = {
  name: tokenName,
  scan: scanLinefeed,
};
