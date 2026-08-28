import {
  makeAmpersandAmpersandToken,
  makeArrayLiteralExpressionNode,
  makeAsteriskAsteriskToken,
  makeAsteriskToken,
  makeBinaryExpressionNode,
  makeCloseBracketToken,
  makeCloseParenToken,
  makeElementAccessExpressionNode,
  makeIdentifierToken,
  makeMinusToken,
  makeMissingExpressionNode,
  makeMissingNode,
  makeMissingToken,
  makeNumericLiteralToken,
  makeOpenBracketToken,
  makeOpenParenToken,
  makeParenthesizedExpressionNode,
  makePlusPlusToken,
  makePlusToken,
  makePrefixUnaryExpressionNode,
  parseExpressionTokens,
  SyntaxKinds,
  TokenKinds,
} from '../../../src/core';
import { expressionParser } from '../../../src/languages/autohotkey2';

describe('expression', () => {
  test.each([
    [ '1+2', [
      makeNumericLiteralToken(1),
      makePlusToken(),
      makeNumericLiteralToken(2),
    ] ],
  ])('parser', (source, tokens) => {
    const nodeBySource = expressionParser.parse(source);
    const nodeByTokens = parseExpressionTokens(tokens, expressionParser.config);
    expect(nodeBySource).toEqual(nodeByTokens);
  });

  test.each([
    [ '1', makeNumericLiteralToken(1) ],
    [ 'var', makeIdentifierToken('var') ],
  ])('literal expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '++var', makePrefixUnaryExpressionNode(
      makePlusPlusToken(),
      makeIdentifierToken('var'),
    ) ],
  ])('unary expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '()', makeParenthesizedExpressionNode(
      makeOpenParenToken(),
      makeMissingExpressionNode(),
      makeCloseParenToken(),
    ) ],
    [ '(var)', makeParenthesizedExpressionNode(
      makeOpenParenToken(),
      makeIdentifierToken('var'),
      makeCloseParenToken(),
    ) ],
  ])('parenthesized expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '[]', makeArrayLiteralExpressionNode(
      makeOpenBracketToken(),
      makeMissingExpressionNode(),
      makeCloseBracketToken(),
    ) ],
    [ '[var]', makeArrayLiteralExpressionNode(
      makeOpenBracketToken(),
      makeIdentifierToken('var'),
      makeCloseBracketToken(),
    ) ],
  ])('array literal expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ 'var[1+2]', makeElementAccessExpressionNode(
      makeIdentifierToken('var'),
      makeOpenBracketToken(),
      makeBinaryExpressionNode([
        makeNumericLiteralToken(1),
        makePlusToken(),
        makeNumericLiteralToken(2),
      ]),
      makeCloseBracketToken(),
    ) ],
    [ '++var[1+2]', makePrefixUnaryExpressionNode(
      makePlusPlusToken(),
      makeElementAccessExpressionNode(
        makeIdentifierToken('var'),
        makeOpenBracketToken(),
        makeBinaryExpressionNode([
          makeNumericLiteralToken(1),
          makePlusToken(),
          makeNumericLiteralToken(2),
        ]),
        makeCloseBracketToken(),
      ),
    ) ],
  ])('element access expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '1+2', makeBinaryExpressionNode([
      makeNumericLiteralToken(1),
      makePlusToken(),
      makeNumericLiteralToken(2),
    ]) ],
    [ '1-2', makeBinaryExpressionNode([
      makeNumericLiteralToken(1),
      makeMinusToken(),
      makeNumericLiteralToken(2),
    ]) ],
  ])('binary expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '1+2*3', makeBinaryExpressionNode([
      makeNumericLiteralToken(1),
      makePlusToken(),
      makeBinaryExpressionNode([
        makeNumericLiteralToken(2),
        makeAsteriskToken(),
        makeNumericLiteralToken(3),
      ]),
    ]) ],
    [ '1*2**3', makeBinaryExpressionNode([
      makeNumericLiteralToken(1),
      makeAsteriskToken(),
      makeBinaryExpressionNode([
        makeNumericLiteralToken(2),
        makeAsteriskAsteriskToken(),
        makeNumericLiteralToken(3),
      ]),
    ]) ],
    [ '1&&2+3', makeBinaryExpressionNode([
      makeNumericLiteralToken(1),
      makeAmpersandAmpersandToken(),
      makeBinaryExpressionNode([
        makeNumericLiteralToken(2),
        makePlusToken(),
        makeNumericLiteralToken(3),
      ]),
    ]) ],
  ])('operator precedence/associative', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  describe('missing', () => {
    test.each([
      [ 'var[', makeElementAccessExpressionNode(
        makeIdentifierToken('var'),
        makeOpenBracketToken(),
        makeMissingNode(SyntaxKinds.MissingExpression),
        makeMissingToken(TokenKinds.CloseBracket),
      ) ],
    ])('element access expressions', (source, expected) => {
      const node = expressionParser.parse(source);
      expect(node).toEqual(expected);
    });

    test.each([
      [ '(', makeParenthesizedExpressionNode(
        makeOpenParenToken(),
        makeMissingNode(SyntaxKinds.MissingExpression),
        makeMissingToken(TokenKinds.CloseParen),
      ) ],
    ])('parenthesized expressions', (source, expected) => {
      const node = expressionParser.parse(source);
      expect(node).toEqual(expected);
    });
  });
});
