import { TokenKind } from './core/scanner/constants';

export const commonIdentifierClassificationMap: Record<string, TokenKind> = {
  'if': TokenKind.IfKeyword,
};
