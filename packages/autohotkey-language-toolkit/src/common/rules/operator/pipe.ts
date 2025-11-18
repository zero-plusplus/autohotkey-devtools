import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanPipeToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '|') {
    switch (peek(1)) {
      case '|':
      case '=':
      {
        return undefined;
      }
      default: break;
    }

    advance();
    return commit(TokenKind.Pipe);
  }
  return undefined;
};
export const pipeTokenRule: ScannerRule = {
  kind: TokenKind.Pipe,
  scan: scanPipeToken,
};
