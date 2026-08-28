// #region token
export type TokenKind = string;
export interface RawToken {
  readonly kind: TokenKind;
  readonly text: string;
}
export interface SyntaxToken {
  readonly kind: TokenKind;
  readonly flags: number;
  readonly text: string;
  readonly leadingTrivia: RawToken[];
  readonly trailingTrivia: RawToken[];

  readonly children?: undefined;
}
// #endregion token

// #region node
export type SyntaxKind = string;
export type SyntaxElement = SyntaxToken | SyntaxNode | MissingNode;
export interface SyntaxNode {
  readonly kind: SyntaxKind;
  readonly flags: number;
  readonly children: SyntaxElement[];

  readonly text?: undefined;
  readonly leadingTrivia?: undefined;
  readonly trailingTrivia?: undefined;
}
export interface MissingNode {
  readonly kind: SyntaxKind;
  readonly flags: number;

  readonly children?: SyntaxElement[];
  readonly text?: undefined;
  readonly leadingTrivia?: undefined;
  readonly trailingTrivia?: undefined;
}
// #endregion node

// #region diagnostic
export type Severity = 'error';
export interface Diagnostic {
  readonly severity: Severity;
  readonly message: number;
  readonly start: number;
  readonly end: number;
}
// #endregion diagnostic
