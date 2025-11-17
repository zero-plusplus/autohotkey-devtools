import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanDotToken: TokenDefinition = ({ consume, commit }): Token | undefined => {
  consume('.');
  return commit(TokenKind.Dot);
};
export const dotTokenRule: ScannerRule = {
  kind: TokenKind.Dot,
  scan: scanDotToken,
};
