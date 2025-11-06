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
  advance: () => string | undefined;
  snapshot: () => number;
  restore: (position: number) => void;
  commit: (kind: string) => Token;
}
