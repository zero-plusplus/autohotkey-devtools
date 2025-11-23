import type { TokenKind } from './constants';

export interface Token {
  kind: TokenKind;
  text: string;
}
export type TokenSpec = TokenKind | ScannerBehavior | TokenMap | undefined;
export type TokenMap = {
  [key: string]: TokenSpec;
};

export type ScannerBehavior = (controller: ScanController) => Token | undefined;
export interface ScannerMode {
  name: string;
  behavior: ScannerBehavior;
}
export interface ScanController {
  eof: () => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  advance: (offset?: number) => void;
  consume: (charOrCode: string | number) => boolean;
  snapshot: () => number;
  seek: (position: number) => void;
  restore: () => number;
  commit: (kind: TokenKind) => Token;
}
