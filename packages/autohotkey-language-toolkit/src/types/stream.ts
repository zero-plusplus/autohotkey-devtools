import {
  RawToken,
  SyntaxToken,
  TokenKind,
} from '../types';

// #region token spec
export type RawTokenRule = (stream: CharStream) => TokenKind | undefined;
export type RawTokenSpec = TokenKind | RawTokenRule | RawTokenTable | undefined;
export type DefaultRawTokenSpec = TokenKind | RawTokenRule;
export type RawTokenTable = {
  [key: number]: RawTokenSpec;
  default: DefaultRawTokenSpec;
};
export type KeywordTable = { [ key: string ]: TokenKind };
export interface LexicalSpec {
  rawTokenTable: RawTokenTable;
  keywordTable: KeywordTable;
  leadingTrivia: TokenKind[];
  trailingTrivia: TokenKind[];
}
export interface TriviaTable {
  [key: TokenKind]: boolean;
}
// #endregion token spec

// #region stream
export interface StreamState {
  source: string;
  position: number;
  flags: number;
}

type CharCodepoint = number;
export interface CharStream {
  readonly state: Readonly<StreamState>;
  eof: () => boolean;
  seek: (position: number) => this;
  peek: (offset?: number) => CharCodepoint;
  advance: () => this;
  consume: (expected: CharCodepoint) => boolean;
}
export interface TokenStreamView<T> {
  eof: () => boolean;
  peek: () => T;
  read: () => T;
}
export interface Stream<T> extends TokenStreamView<T> {
  readonly state: StreamState;
  consume: (expected: TokenKind) => boolean;
}
export interface RawTokenStream extends Stream<RawToken> {
  initialize: () => this;
}
export interface SyntaxTokenStream extends Stream<SyntaxToken> {
  readonly state: Readonly<StreamState>;
  initialize: (newSource: string, position?: number, table?: RawTokenTable) => this;
}
// #endregion stream
