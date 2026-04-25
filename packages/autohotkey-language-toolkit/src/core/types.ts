export type TokenKind = string;

export type EndOfFileTokenKind = 'EndOfFile';
export interface Token {
  kind: TokenKind;
  text: string;
}
export interface EndOfFileToken extends Token {
  kind: EndOfFileTokenKind;
  text: string;
}
export type LexerFunction = (ctx: LexerContext) => TokenKind | undefined;
export type TokenSpec = TokenKind | LexerFunction | TokenTable | undefined;
export type DefaultTokenSpec = TokenKind | LexerFunction[];
export type TokenTable = {
  [key: number]: TokenSpec;
  default: DefaultTokenSpec;
};
export type KeywordTable = { [ key: string ]: TokenKind };
export interface LexicalSpec {
  tokenTable: TokenTable;
  keywordTable: KeywordTable;
  leadingTrivias: TokenKind[];
  trailingTrivias: TokenKind[];
}
export interface TriviaTable {
  [key: TokenKind]: boolean;
}
export interface SyntaxToken extends Token {
  leadingTrivia: Token[];
  trailingTrivia: Token[];
}
export interface LexerSnapshot {
  readonly currentPosition: number;
  readonly flags: number;
}
export interface TokenCommitter {
  commit: (kind: TokenKind) => Token | EndOfFileToken;
}
export interface LexerContext extends LexerSnapshot {
  readonly source: string;
  readonly startPosition: number;
  hasNotAdvanced: () => boolean;
  eof: () => boolean;
  peek: (offset?: number) => string | undefined;
  peekCodePoint: (offset?: number) => number | undefined;
  snapshot: () => LexerSnapshot;
  restore: (snapshot: LexerSnapshot) => this;
  rollback: () => this;

  advance: () => this;
  advanceBy: (n: number) => this;
  seek: (position: number) => this;
  consume: (expected: number) => boolean;

  addFlag: (flag: number) => this;
}
export interface ScannerContext<T extends Token> {
  readonly source: string;
  readonly position: number;

  scan: () => T;
  tryScan: (callback: () => boolean) => void;
  peek: () => T | undefined;

  snapshot: () => LexerSnapshot;
  restore: (snapshot: LexerSnapshot) => this;
}
export interface Scanner extends ScannerContext<SyntaxToken> {
  initialize: (newSource: string, position?: number, table?: TokenTable) => this;
}
export type Severity = 'error';
export interface Diagnostic {
  severity: Severity;
  message: number;
  start: number;
  end: number;
}
