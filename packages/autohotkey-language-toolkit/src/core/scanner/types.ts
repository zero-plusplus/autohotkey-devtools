import type { TokenKind } from './constants';

export interface Token {
  kind: TokenKind;
  text: string;
}
export type TokenDefinition = (cursor: Cursor) => Token | undefined;
export type TokenSpec = TokenKind | TokenDefinition | TokenMap | undefined;
export type TokenMap = {
  [key: string]: TokenSpec;
};

export type ScannerBehavior = (cursor: Cursor) => Token | undefined;
export interface ScannerMode {
  name: string;
  behavior: ScannerBehavior;
}
export interface Cursor {
  eof: () => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  advance: (offset?: number) => string | undefined;
  consume: (charOrCode: string | number) => boolean;
  snapshot: () => number;
  seek: (position: number) => void;
  restore: () => number;
  commit: (kind: TokenKind) => Token;
}
