import type {
  MissingNode,
  SyntaxElement,
  SyntaxKind,
  SyntaxNode,
  SyntaxToken,
} from '../../types';
import { SyntaxKinds } from '../constants';
import { makeSyntaxElement } from './internal';

export function makeNode(kind: SyntaxKind, children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeSyntaxElement(kind, flags, children) as SyntaxNode;
}
export function makeExpressionNode(children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.MissingExpression, children, flags);
}
export function makeArrayLiteralExpressionNode(openParen: SyntaxToken, expression: SyntaxElement, closeParen: SyntaxToken, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.ArrayLiteralExpression, [ openParen, expression, closeParen ]);
}
export function makeParenthesizedExpressionNode(openParen: SyntaxToken, expression: SyntaxElement, closeParen: SyntaxToken, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.ParenthesizedExpression, [ openParen, expression, closeParen ]);
}
export function makePrefixUnaryExpressionNode(operator: SyntaxElement, operand: SyntaxElement, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.PrefixUnaryExpression, [ operator, operand ], flags);
}
export function makePostfixUnaryExpressionNode(operand: SyntaxElement, operator: SyntaxElement, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.PostfixUnaryExpression, [ operand, operator ], flags);
}
export function makeElementAccessExpressionNode(object: SyntaxElement, openToken: SyntaxToken, expression: SyntaxElement, closeToken: SyntaxToken, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.ElementAccessExpression, [ object, openToken, expression, closeToken ], flags);
}
export function makePropertyAccessExpressionNode(object: SyntaxElement, operatorToken: SyntaxToken, property: SyntaxElement, flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.PropertyAccessExpression, [ object, operatorToken, property ], flags);
}
export function makeBinaryExpressionNode(children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.BinaryExpression, children, flags);
}
export function makeMissingNode(kind: SyntaxKind, flags = 0): MissingNode {
  return makeSyntaxElement(kind, flags, undefined, undefined, undefined, undefined) as MissingNode;
}
export function makeMissingExpressionNode(flags = 0): MissingNode {
  return makeMissingNode(SyntaxKinds.MissingExpression);
}
