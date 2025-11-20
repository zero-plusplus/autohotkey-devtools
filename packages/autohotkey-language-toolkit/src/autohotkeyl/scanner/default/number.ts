import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2/scanner/default/number';
import type {
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: TokenDefinition = (cursor): Token | undefined => {
  const numberToken = scanNumber_ahk2(cursor);

  if (isIdentifierTailCharCode(cursor.peekCodePoint())) {
    return scanIdentifierToken(cursor);
  }
  return numberToken;
};
