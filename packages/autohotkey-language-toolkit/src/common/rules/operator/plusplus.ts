import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanPlusPlusToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '+' && peek(1) === '+') {
    advance(2);
    return commit(TokenKind.PlusPlus);
  }
  return undefined;
};
export const plusPlusTokenRule: ScannerRule = {
  kind: TokenKind.PlusPlus,
  scan: scanPlusPlusToken,
};
