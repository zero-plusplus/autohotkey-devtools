import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanPercentToken: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('%');
  return commit(TokenKind.Percent);
};
export const percentTokenRule: ScannerRule = {
  kind: TokenKind.Percent,
  scan: scanPercentToken,
};
