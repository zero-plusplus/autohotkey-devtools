import type { TokenKind } from './constants';

export interface Token {
  kind: TokenKind;
  text: string;
}
export type TokenDefinition = (cursor: Cursor) => Token | undefined;

export type ScannerRule = {
  kind: TokenKind;
  scan: TokenDefinition;
};
export type ScannerRuleMap = {
  [key in string]: ScannerRule;
};

export interface Cursor {
  eof: () => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  advance: () => string | undefined;
  consume: (charOrCode: string | number) => boolean;
  snapshot: () => number;
  seek: (position: number) => void;
  restore: () => number;
  commit: (kind: TokenKind) => Token;
}
