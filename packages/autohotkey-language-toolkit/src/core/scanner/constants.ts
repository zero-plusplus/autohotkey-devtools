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
  Minus,
  MinusMinus,
  Percent,
  PlusPlus,
  // #endregion operators
}
