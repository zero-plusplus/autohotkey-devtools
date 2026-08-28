import type {
  ExpressionParser,
  ExpressionParserConfig,
  SyntaxElement,
  SyntaxToken,
  SyntaxTokenStream,
  TokenStreamView,
} from '../../types';
import {
  SyntaxKinds,
  TokenKinds,
  TokenTextByTokenKind,
} from '../constants';
import {
  makeBinaryExpressionNode,
  makeMissingExpressionNode,
  makeMissingNode,
  makeMissingToken,
  makeNode,
  makePostfixUnaryExpressionNode,
  makePrefixUnaryExpressionNode,
} from '../factory';

type StreamView = TokenStreamView<SyntaxToken | undefined>;
export function parseExpressionTokens(tokens: SyntaxToken[], config: ExpressionParserConfig): SyntaxElement {
  const stream = createStreamViewFromTokens(tokens);
  if (!stream.eof()) {
    return parseExpression(stream, config);
  }
  return makeMissingExpressionNode();
}
export function createExpressionParser(stream: SyntaxTokenStream, config: ExpressionParserConfig): ExpressionParser {
  return {
    get config(): ExpressionParserConfig {
      return config;
    },
    parse(source: string): SyntaxElement {
      stream.initialize(source);

      const streamView = createStreamViewFromStream(stream);
      if (!streamView.eof()) {
        return parseExpression(streamView, config);
      }
      return makeMissingExpressionNode();
    },
  };
}

// #region helpers
function createStreamViewFromStream(stream: SyntaxTokenStream): StreamView {
  return {
    eof(): boolean {
      return stream.eof() || stream.peek().kind === TokenKinds.EndOfFile;
    },
    peek(): SyntaxToken | undefined {
      return !this.eof() ? stream.peek() : undefined;
    },
    read(): SyntaxToken | undefined {
      return !this.eof() ? stream.read() : undefined;
    },
    advance(): StreamView {
      if (!this.eof()) {
        stream.advance();
      }
      return this;
    },
  };
}
function createStreamViewFromTokens(tokens: SyntaxToken[]): StreamView {
  let index = 0;
  return {
    eof(): boolean {
      return tokens.length <= index;
    },
    peek(): SyntaxToken | undefined {
      return tokens.at(index);
    },
    read(): SyntaxToken | undefined {
      return tokens.at(index++);
    },
    advance(): StreamView {
      this.read();
      return this;
    },
  };
}
function parseExpression(stream: StreamView, config: ExpressionParserConfig, bindingPower = 0): SyntaxElement {
  let left = nud(stream, config);

  while (!stream.eof()) {
    const nextToken = stream.peek()!;

    const infixDefinition = config.operators.infix[nextToken.text];
    if (infixDefinition) {
      const operatorBindingPower = infixDefinition.associative === 'left'
        ? infixDefinition.bindingPower
        : infixDefinition.bindingPower - 1;
      if (bindingPower <= operatorBindingPower) {
        const infixToken = stream.read()!;
        left = led(stream, config, left, infixToken, operatorBindingPower);
      }
    }

    const postfixToken = stream.peek();
    if (postfixToken && (postfixToken.text in config.operators.postfix || postfixToken.text in config.operators.postcircumfix)) {
      const postfixOperatorToken = stream.read()!;
      return parsePostfix(stream, config, left, postfixOperatorToken);
    }
    break;
  }
  return left;
}
function nud(stream: StreamView, config: ExpressionParserConfig): SyntaxElement {
  const token = stream.peek();
  if (token === undefined) {
    return makeMissingToken(TokenKinds.Identifier);
  }

  const prefixConfig = config.operators.prefix[token.text];
  if (prefixConfig !== undefined) {
    const operator = stream.read()!;

    if (!stream.eof()) {
      const operandNode = parseExpression(stream, config, prefixConfig.bindingPower);
      return makePrefixUnaryExpressionNode(operator, operandNode);
    }
  }

  const circumfixDefinition = config.operators.circumfix[token.text];
  if (circumfixDefinition !== undefined) {
    const openToken = stream.read()!;
    const nextToken = stream.peek();
    if (nextToken?.text === circumfixDefinition.close) {
      const closeToken = stream.read()!;
      return makeNode(circumfixDefinition.kind, [ openToken, makeMissingExpressionNode(), closeToken ]);
    }

    const expression = !stream.eof()
      ? parseExpression(stream, config, 0)
      : makeMissingExpressionNode();

    if (!stream.eof()) {
      const closeToken = stream.read()!;
      return makeNode(circumfixDefinition.kind, [ openToken, expression, closeToken ]);
    }

    const closeToken = circumfixDefinition.close in TokenTextByTokenKind
      ? makeMissingToken(TokenTextByTokenKind[circumfixDefinition.close as keyof typeof TokenTextByTokenKind])
      : makeMissingToken(TokenKinds.Unknown);
    return makeNode(circumfixDefinition.kind, [ openToken, expression, closeToken ]);
  }

  stream.advance();
  return token;
}
function led(stream: StreamView, config: ExpressionParserConfig, left: SyntaxElement, operatorToken: SyntaxToken, operatorBindingPower = 0): SyntaxElement {
  const right = !stream.eof()
    ? parseExpression(stream, config, operatorBindingPower)
    : makeMissingExpressionNode();
  const newLeft = makeBinaryExpressionNode([ left, operatorToken, right ]);

  const nextToken = stream.peek();
  if (nextToken && (nextToken.text in config.operators.postfix || nextToken.text in config.operators.postcircumfix)) {
    const postfixOperatorToken = stream.read()!;
    return parsePostfix(stream, config, newLeft, postfixOperatorToken);
  }
  return newLeft;
}
function parsePostfix(stream: StreamView, config: ExpressionParserConfig, left: SyntaxElement, operatorToken: SyntaxToken): SyntaxElement {
  const postfixDefinition = config.operators.postfix[operatorToken.text];
  if (postfixDefinition !== undefined) {
    return makePostfixUnaryExpressionNode(left, operatorToken);
  }

  const circumfixDefinition = config.operators.postcircumfix[operatorToken.text];
  if (circumfixDefinition !== undefined) {
    const openToken = operatorToken;
    const nextToken = stream.peek();
    if (nextToken?.text === circumfixDefinition.close) {
      const closeToken = stream.read()!;
      return makeNode(circumfixDefinition.kind, [ left, openToken, makeMissingExpressionNode(), closeToken ]);
    }

    const expression = !stream.eof()
      ? parseExpression(stream, config, 0)
      : makeMissingNode(SyntaxKinds.MissingExpression);

    if (!stream.eof()) {
      const closeToken = stream.read()!;
      return makeNode(circumfixDefinition.kind, [ left, openToken, expression, closeToken ]);
    }

    const closeToken = circumfixDefinition.close in TokenTextByTokenKind
      ? makeMissingToken(TokenTextByTokenKind[circumfixDefinition.close as keyof typeof TokenTextByTokenKind])
      : makeMissingToken(TokenKinds.Unknown);
    return makeNode(circumfixDefinition.kind, [ left, openToken, expression, closeToken ]);
  }
  return left;
}
// #endregion helpers
