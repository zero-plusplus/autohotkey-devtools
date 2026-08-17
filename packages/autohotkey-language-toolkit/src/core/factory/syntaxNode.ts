import type {
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
export function makeNodeFromToken(token: SyntaxToken, flags = 0): SyntaxNode {
  return makeNode(token.kind, [ token ], flags);
}
export function makePrefixUnaryExpressionNode(children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.PrefixUnaryExpression, children, flags);
}
export function makePostfixUnaryExpressionNode(children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.PostfixUnaryExpression, children, flags);
}
export function makeBinaryExpressionNode(children: SyntaxElement[], flags = 0): SyntaxNode {
  return makeNode(SyntaxKinds.BinaryExpression, children, flags);
}

