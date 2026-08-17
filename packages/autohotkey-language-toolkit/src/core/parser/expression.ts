import type {
  ExpressionParserConfig,
  Parser,
  SyntaxNode,
  SyntaxToken,
  SyntaxTokenStream,
  TokenStreamView,
} from '../../types';
import {
  makeBinaryExpressionNode,
  makeNodeFromToken,
  makePrefixUnaryExpressionNode,
} from '../factory';

export function createExpressionParser(stream: SyntaxTokenStream, config: ExpressionParserConfig): Parser {
  return {
    parse(source: string): SyntaxNode {
      stream.initialize(source);

      return parseExpression(stream, config);
    },
  };
}
export function parseExpression(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, prevBindingPower = 0): SyntaxNode {
  let left = nud(cursor, config, prevBindingPower);

  while (!cursor.eof()) {
    const operator = cursor.peek();
    const definition = config.operators.infix[operator.text];
    if (definition === undefined) {
      break;
    }

    const currentBindingPower = definition.associative === 'left'
      ? definition.bindingPower
      : definition.bindingPower - 1;
    if (currentBindingPower <= prevBindingPower) {
      break;
    }

    cursor.read();
    left = led(cursor, config, left, operator, currentBindingPower);
  }
  return left;
}

// #region helpers
function nud(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, bp = 0): SyntaxNode {
  const token = cursor.read();
  const prefixConfig = config.operators.prefix[token.text];
  if (prefixConfig) {
    const operatorNode = makeNodeFromToken(token);
    const operandNode = parseExpression(cursor, config, prefixConfig.bindingPower);
    return makePrefixUnaryExpressionNode([ operatorNode, operandNode ]);
  }

  return makeNodeFromToken(token);
}
function led(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, leftNode: SyntaxNode, operatorToken: SyntaxToken, currentBindingPower = 0): SyntaxNode {
  const right = parseExpression(cursor, config, currentBindingPower);
  return makeBinaryExpressionNode([ leftNode, makeNodeFromToken(operatorToken), right ]);
}
// #endregion helpers
