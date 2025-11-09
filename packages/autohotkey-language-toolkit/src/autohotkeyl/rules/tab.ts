import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

const tokenName = 'tab';
export const scanTab: TokenDefinition = ({ eof, consume, commit }): Token | undefined => {
  while (!eof()) {
    if (consume('\t')) {
      continue;
    }
    break;
  }
  return commit(tokenName);
};
export const tabTokenRule: ScannerRule = {
  name: tokenName,
  scan: scanTab,
};
