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
  Dot,
  Exclamation,
  Greaterthan,
  Minus,
  MinusMinus,
  Percent,
  Plus,
  PlusPlus,
  Slash,
  SlashSlash,
  Tilde,
  // #endregion operators
}
