export const enum TokenKind {
  CarriageReturn,
  Linefeed,
  Space,
  Tab,

  Identifier,

  String,
  Number,

  // #region operators
  Ampersand,
  Asterisk,
  AsteriskAsterisk,
  Caret,
  Dot,
  Exclamation,
  Greaterthan,
  GreaterthanEquals,
  GreaterthanGreaterthan,
  GreaterthanGreaterthanGreaterthan,
  Lessthan,
  LessthanLessthan,
  Minus,
  MinusMinus,
  Percent,
  Pipe,
  Plus,
  PlusPlus,
  Slash,
  SlashSlash,
  Tilde,
  TildeEquals,
  // #endregion operators
}
