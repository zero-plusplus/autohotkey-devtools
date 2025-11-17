import { TokenKind } from '../../core/scanner/constants';
import type { ScannerRule, Token, TokenDefinition } from '../../core/scanner/types';

export const scanLinefeedToken: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('\n');
  return commit(TokenKind.Linefeed);
};
export const linefeedTokenRule: ScannerRule = {
  kind: TokenKind.Linefeed,
  scan: scanLinefeedToken,
};
