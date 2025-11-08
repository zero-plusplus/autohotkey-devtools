export interface Token {
  kind: string;
  text: string;
}
export type TokenDefinition = (cursor: Cursor) => Token | undefined;

export type ScannerRule = {
  name: string;
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
  commit: (kind: string) => Token;
}
