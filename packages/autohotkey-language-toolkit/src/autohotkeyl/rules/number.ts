import { scanNumber as scanNumber_v2 } from '../../autohotkey2/rules/number';
import { TokenKind } from '../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../core/scanner/types';
import { isIdentifierTailCharCode } from '../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: TokenDefinition = (cursor): Token | undefined => {
  scanNumber_v2(cursor);
  if (isIdentifierTailCharCode(cursor.peekCodePoint())) {
    return scanIdentifierToken(cursor);
  }

  return cursor.commit(TokenKind.Number);
};
export const numberTokenRule: ScannerRule = {
  kind: TokenKind.Number,
  scan: scanNumberToken,
};
