// #region token
export type TokenKind = string;
export type EndOfFileTokenKind = 'EndOfFile';
export type UnknownTokenKind = 'Unknown';

export interface RawToken {
  kind: TokenKind;
  text: string;
}
export interface EndOfFileToken extends RawToken {
  kind: EndOfFileTokenKind;
  text: string;
}
export interface SyntaxToken extends RawToken {
  flags: number;
  leadingTrivia: RawToken[];
  trailingTrivia: RawToken[];
}
export type Severity = 'error';
export interface Diagnostic {
  severity: Severity;
  message: number;
  start: number;
  end: number;
}
// #endregion token

// #region token spec
export type LexerFunction = (lexer: Lexer) => TokenKind | undefined;
export type RawTokenSpec = TokenKind | LexerFunction | RawTokenTable | undefined;
export type DefaultRawTokenSpec = TokenKind | LexerFunction;
export type RawTokenTable = {
  [key: number]: RawTokenSpec;
  default: DefaultRawTokenSpec;
};
export type KeywordTable = { [ key: string ]: TokenKind };
export interface LexicalSpec {
  rawTokenTable: RawTokenTable;
  keywordTable: KeywordTable;
  leadingTrivias: TokenKind[];
  trailingTrivias: TokenKind[];
}
export interface TriviaTable {
  [key: TokenKind]: boolean;
}
// #endregion token spec

// #region token reader
export interface StreamState {
  source: string;
  position: number;
  flags: number;
}

// Phase 1: Lexer
type CharCodepoint = number;
export interface Lexer {
  readonly state: Readonly<StreamState>;
  eof: () => boolean;
  seek: (position: number) => this;
  peek: (offset?: number) => CharCodepoint;
  advance: () => this;
  consume: (expected: CharCodepoint) => boolean;
}

// Phase 2, 3: RawTokenStream / SyntaxTokenStream
export interface Stream<T> {
  readonly state: StreamState;
  eof: () => boolean;
  peek: () => T;
  read: () => T;
  advance: () => this;
  consume: (expected: TokenKind) => boolean;
}
export interface RawTokenStream extends Stream<RawToken> {
  initialize: () => this;
}
export interface SyntaxTokenStream extends Stream<SyntaxToken> {
  readonly state: Readonly<StreamState>;
  initialize: (newSource: string, position?: number, table?: RawTokenTable) => this;
}
// #endregion token reader
