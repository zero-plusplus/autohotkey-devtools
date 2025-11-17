import { TokenKind } from '../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

export const scanTabToken: TokenDefinition = ({ eof, consume, commit }): Token | undefined => {
  while (!eof()) {
    if (consume('\t')) {
      continue;
    }
    break;
  }
  return commit(TokenKind.Tab);
};
export const tabTokenRule: ScannerRule = {
  kind: TokenKind.Tab,
  scan: scanTabToken,
};
