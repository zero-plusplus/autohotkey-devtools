import {
  scanNumberToken as scanNumberToken_common,
} from '../../common/rules/number';
import { TokenKind } from '../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';

export const scanNumberToken: TokenDefinition = (cursor): Token | undefined => {
  return scanNumberToken_common(cursor);
};
export const numberTokenRule: ScannerRule = {
  kind: TokenKind.Number,
  scan: scanNumberToken,
};
