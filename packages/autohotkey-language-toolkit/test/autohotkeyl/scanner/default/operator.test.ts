import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { defaultScanModeForAhkl } from '../../../../src/autohotkeyl/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('default.operator', () => {
  const scanner = new Scanner('', defaultScanModeForAhkl);

  test.each(expressionOperators)('pass', (operatorText) => {
    scanner.initialize(operatorText);
    const token = scanner.scan();

    expect(token?.text).toBe(operatorText);
  });
});
