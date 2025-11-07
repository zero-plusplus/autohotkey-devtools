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
  peek: () => string | undefined;
  peekCodePoint: () => number | undefined;
  advance: () => string | undefined;
  snapshot: () => number;
  seek: (position: number) => void;
  restore: () => number;
  commit: (kind: string) => Token;
}
