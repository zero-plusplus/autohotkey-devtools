import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkey2/constants';
import { scannerModeMapForAhk2 } from '../../../../src/autohotkey2';
import { Scanner } from '../../../../src/core/scanner';

describe('operator', () => {
  const scanner = new Scanner(scannerModeMapForAhk2);

  test.each(expressionOperators)('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token!.text).toBe(text);
  });

  test.each([
    '<>',
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token?.text).not.toBe(text);
  });
});
