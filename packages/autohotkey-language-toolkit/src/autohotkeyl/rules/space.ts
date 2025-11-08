import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

const tokenName = 'space';
export const scanSpace: TokenDefinition = ({ eof, consume, commit }): Token | undefined => {
  while (!eof()) {
    if (consume(' ')) {
      continue;
    }
    break;
  }
  return commit(tokenName);
};
export const spaceRule: ScannerRule = {
  name: tokenName,
  scan: scanSpace,
};
