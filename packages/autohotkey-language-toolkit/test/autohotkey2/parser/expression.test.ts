import {
  makeAmpersandAmpersandToken,
  makeAsteriskAsteriskToken,
  makeAsteriskToken,
  makeBinaryExpressionNode,
  makeIdentifierToken,
  makeMinusToken,
  makeNodeFromToken,
  makeNumericLiteralToken,
  makePlusPlusToken,
  makePlusToken,
  makePrefixUnaryExpressionNode,
} from '../../../src/core';
import { expressionParser } from '../../../src/languages/autohotkey2';

describe('expression', () => {
  test.each([
    [ '1', makeNodeFromToken(makeNumericLiteralToken(1)) ],
    [ 'var', makeNodeFromToken(makeIdentifierToken('var')) ],
  ])('literal expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '++var', makePrefixUnaryExpressionNode([
      makeNodeFromToken(makePlusPlusToken()),
      makeNodeFromToken(makeIdentifierToken('var')),
    ]) ],
  ])('unary expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '1+2', makeBinaryExpressionNode([
      makeNodeFromToken(makeNumericLiteralToken(1)),
      makeNodeFromToken(makePlusToken()),
      makeNodeFromToken(makeNumericLiteralToken(2)),
    ]) ],
    [ '1-2', makeBinaryExpressionNode([
      makeNodeFromToken(makeNumericLiteralToken(1)),
      makeNodeFromToken(makeMinusToken()),
      makeNodeFromToken(makeNumericLiteralToken(2)),
    ]) ],
  ])('binary expressions', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });

  test.each([
    [ '1+2*3', makeBinaryExpressionNode([
      makeNodeFromToken(makeNumericLiteralToken(1)),
      makeNodeFromToken(makePlusToken()),
      makeBinaryExpressionNode([
        makeNodeFromToken(makeNumericLiteralToken(2)),
        makeNodeFromToken(makeAsteriskToken()),
        makeNodeFromToken(makeNumericLiteralToken(3)),
      ]),
    ]) ],
    [ '1*2**3', makeBinaryExpressionNode([
      makeNodeFromToken(makeNumericLiteralToken(1)),
      makeNodeFromToken(makeAsteriskToken()),
      makeBinaryExpressionNode([
        makeNodeFromToken(makeNumericLiteralToken(2)),
        makeNodeFromToken(makeAsteriskAsteriskToken()),
        makeNodeFromToken(makeNumericLiteralToken(3)),
      ]),
    ]) ],
    [ '1&&2+3', makeBinaryExpressionNode([
      makeNodeFromToken(makeNumericLiteralToken(1)),
      makeNodeFromToken(makeAmpersandAmpersandToken()),
      makeBinaryExpressionNode([
        makeNodeFromToken(makeNumericLiteralToken(2)),
        makeNodeFromToken(makePlusToken()),
        makeNodeFromToken(makeNumericLiteralToken(3)),
      ]),
    ]) ],
  ])('operator precedence/associative', (source, expected) => {
    const node = expressionParser.parse(source);
    expect(node).toEqual(expected);
  });
});
