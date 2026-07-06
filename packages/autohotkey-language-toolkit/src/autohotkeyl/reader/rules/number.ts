import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2/reader/rules/number';
import type {
  Lexer,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: LexerFunction = (lexer: Lexer): TokenKind | undefined => {
  const tokenKind = scanNumber_ahk2(lexer) as TokenKind;
  if (isIdentifierTailCharCode(lexer.peek())) {
    return scanIdentifierToken(lexer) as TokenKind;
  }
  return tokenKind;
};
