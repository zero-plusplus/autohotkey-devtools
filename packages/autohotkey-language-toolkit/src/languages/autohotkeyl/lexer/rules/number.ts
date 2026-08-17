import type {
  CharStream,
  RawTokenRule,
  TokenKind,
} from '../../../../types';
import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: RawTokenRule = (stream: CharStream): TokenKind | undefined => {
  const tokenKind = scanNumber_ahk2(stream);
  if (isIdentifierTailCharCode(stream.peek())) {
    return scanIdentifierToken(stream);
  }
  return tokenKind;
};
