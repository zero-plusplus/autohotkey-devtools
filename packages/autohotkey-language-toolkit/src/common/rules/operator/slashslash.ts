import { TokenKind } from '../../../core/scanner/constants';
import type {
  ScannerRule,
  Token,
  TokenDefinition,
} from '../../../core/scanner/types';

export const scanSlashSlashToken: TokenDefinition = ({ peek, advance, commit }): Token | undefined => {
  if (peek() === '/' && peek(1) === '/') {
    switch (peek(2)) {
      case '=':
      {
        return undefined;
      }
      default: break;
    }
    advance(2);
    return commit(TokenKind.SlashSlash);
  }
  return undefined;
};
export const slashSlashTokenRule: ScannerRule = {
  kind: TokenKind.SlashSlash,
  scan: scanSlashSlashToken,
};
