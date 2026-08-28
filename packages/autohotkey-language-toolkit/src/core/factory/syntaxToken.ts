import type {
  RawToken,
  SyntaxToken,
  TokenKind,
} from '../../types';
import { TokenKinds } from '../constants';
import { makeSyntaxElement } from './internal';

export function makeSyntaxToken(kind: TokenKind, text: string = '', leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = [], flags = 0): SyntaxToken {
  return makeSyntaxElement(kind, flags, undefined, text, leadingTrivia, trailingTrivia) as SyntaxToken;
}
export function makeIdentifierToken(value: string, leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Identifier, value, leadingTrivia, trailingTrivia);
}
export function makeNumericLiteralToken(value: string | number, leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.NumericLiteral, String(value), leadingTrivia, trailingTrivia);
}
export function makePlusToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Plus, '+', leadingTrivia, trailingTrivia);
}
export function makePlusPlusToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.PlusPlus, '++', leadingTrivia, trailingTrivia);
}
export function makeMinusToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Minus, '-', leadingTrivia, trailingTrivia);
}
export function makeMinusMinusToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.MinusMinus, '--', leadingTrivia, trailingTrivia);
}
export function makeAsteriskToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Asterisk, '*', leadingTrivia, trailingTrivia);
}
export function makeAsteriskAsteriskToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.AsteriskAsterisk, '**', leadingTrivia, trailingTrivia);
}
export function makeAmpersandToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Ampersand, '&', leadingTrivia, trailingTrivia);
}
export function makeAmpersandAmpersandToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.AmpersandAmpersand, '&&', leadingTrivia, trailingTrivia);
}
export function makeOpenParenToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.OpenParen, '(', leadingTrivia, trailingTrivia);
}
export function makeCloseParenToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.CloseParen, ')', leadingTrivia, trailingTrivia);
}
export function makeOpenBraceToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.OpenBrace, '{', leadingTrivia, trailingTrivia);
}
export function makeCloseBraceToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.CloseBrace, '}', leadingTrivia, trailingTrivia);
}
export function makeOpenBracketToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.OpenBracket, '[', leadingTrivia, trailingTrivia);
}
export function makeCloseBracketToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.CloseBracket, ']', leadingTrivia, trailingTrivia);
}
export function makeDotToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.Dot, '.', leadingTrivia, trailingTrivia);
}
export function makeEndOfFileToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.EndOfFile, '', leadingTrivia, trailingTrivia);
}
export function makeEndOfViewToken(leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = []): SyntaxToken {
  return makeSyntaxToken(TokenKinds.EndOfView, '', leadingTrivia, trailingTrivia);
}
export function makeMissingToken(kind: TokenKind, leadingTrivia: RawToken[] = [], trailingTrivia: RawToken[] = [], flags = 0): SyntaxToken {
  return makeSyntaxToken(kind, undefined, leadingTrivia, trailingTrivia, flags);
}
