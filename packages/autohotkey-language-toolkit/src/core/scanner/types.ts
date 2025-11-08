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
  match: (...charsOrCodes: Array<string | number>) => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  advance: () => string | undefined;
  consume: (...charsOrCodes: Array<string | number>) => boolean;
  consumeWhile: (...charsOrCodes: Array<string | number>) => number;
  snapshot: () => number;
  seek: (position: number) => void;
  restore: () => number;
  commit: (kind: string) => Token;
}
