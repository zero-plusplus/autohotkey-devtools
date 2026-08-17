import {
  makeAmpersandAmpersandToken,
  makeAsteriskAsteriskToken,
  makeAsteriskToken,
  makeBinaryExpressionNode,
  makeIdentifierToken,
  makeMinusToken,
  makeNumericLiteralToken,
  makePlusPlusToken,
  makePlusToken,
  makePrefixUnaryExpressionNode,
} from '../../../src/core';
import { expressionParser } from '../../../src/languages/autohotkey2';

describe('expression', () => {
  test.each([
    [ '1', makeNumericLiteralToken(1) ],
    [ 'var', makeIdentifierToken('var') ],
  ])('literal expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '++var', makePrefixUnaryExpressionNode([
      makePlusPlusToken(),
      makeIdentifierToken('var'),
    ]) ],
  ])('unary expressions', (source, expected) => {
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
});
