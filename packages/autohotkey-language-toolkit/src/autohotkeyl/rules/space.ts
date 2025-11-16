import { TokenKind } from '../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

export const scanSpace: TokenDefinition = ({ eof, consume, commit }): Token | undefined => {
  while (!eof()) {
    if (consume(' ')) {
      continue;
    }
    break;
  }
  return commit(TokenKind.Space);
};
export const spaceTokenRule: ScannerRule = {
  kind: TokenKind.Space,
  scan: scanSpace,
};
