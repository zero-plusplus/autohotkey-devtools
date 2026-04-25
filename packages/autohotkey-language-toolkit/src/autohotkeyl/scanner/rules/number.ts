import { scanNumberToken as scanNumber_ahk2 } from '../../../autohotkey2/scanner/rules/number';
import type {
  LexerContext,
  LexerFunction,
} from '../../../core/types';
import type { TokenKind } from '../../constants';
import { isIdentifierTailCharCode } from '../../utils';
import { scanIdentifierToken } from './identifier';

export const scanNumberToken: LexerFunction = (ctx: LexerContext): TokenKind | undefined => {
  const tokenKind = scanNumber_ahk2(ctx) as TokenKind;
  if (isIdentifierTailCharCode(ctx.peekCodePoint())) {
    return scanIdentifierToken(ctx) as TokenKind;
  }
  return tokenKind;
};
