import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { spec } from '../../../../src/autohotkeyl/scanner';
import { createScanner } from '../../../../src/core/scanner';

describe('default.operator', () => {
  const scanner = createScanner(spec);

  test.each(expressionOperators)('pass', (source) => {
    scanner.initialize(source);
    const token = scanner.scan();

    expect(token.text).toBe(source);
  });
});
