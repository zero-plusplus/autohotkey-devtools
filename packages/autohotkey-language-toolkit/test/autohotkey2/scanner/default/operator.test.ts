import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkey2/constants';
import { defaultScanModeForAhk2 } from '../../../../src/autohotkey2/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('operator', () => {
  const scanner = new Scanner('', defaultScanModeForAhk2);

  test.each(expressionOperators)('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token!.text).toBe(text);
  });

  test.each([
    '<>',
  ])('fail', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token?.text).not.toBe(text);
  });
});
