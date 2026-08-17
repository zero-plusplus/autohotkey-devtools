import type {
  ExpressionParserConfig,
  Parser,
  SyntaxElement,
  SyntaxNode,
  SyntaxToken,
  SyntaxTokenStream,
  TokenStreamView,
} from '../../types';
import {
  makeBinaryExpressionNode,
  makePrefixUnaryExpressionNode,
} from '../factory';

export function createExpressionParser(stream: SyntaxTokenStream, config: ExpressionParserConfig): Parser {
  return {
    parse(source: string): SyntaxElement {
      stream.initialize(source);

      return parseExpression(stream, config);
    },
  };
}

// #region helpers
function parseExpression(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, prevBindingPower = 0): SyntaxElement {
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
function nud(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, bp = 0): SyntaxElement {
  const token = cursor.read();
  const prefixConfig = config.operators.prefix[token.text];
  if (prefixConfig) {
    const operator = token;
    const operandNode = parseExpression(cursor, config, prefixConfig.bindingPower);
    return makePrefixUnaryExpressionNode([ operator, operandNode ]);
  }

  return token;
}
function led(cursor: TokenStreamView<SyntaxToken>, config: ExpressionParserConfig, left: SyntaxElement, operatorToken: SyntaxToken, currentBindingPower = 0): SyntaxNode {
  const right = parseExpression(cursor, config, currentBindingPower);
  return makeBinaryExpressionNode([ left, operatorToken, right ]);
}
// #endregion helpers
