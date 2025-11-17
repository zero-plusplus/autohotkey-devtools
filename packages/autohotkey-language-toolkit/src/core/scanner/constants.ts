export const enum TokenKind {
  CarriageReturn,
  Linefeed,
  Space,
  Tab,

  Identifier,

  String,
  Number,

  // #region operators
  AsteriskAsterisk,
  Dot,
  Exclamation,
  Minus,
  MinusMinus,
  Percent,
  PlusPlus,
  Tilde,
  // #endregion operators
}
