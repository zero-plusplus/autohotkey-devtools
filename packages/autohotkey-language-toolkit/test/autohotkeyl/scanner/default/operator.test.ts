import { expressionOperators } from '@zero-plusplus/autohotkey-tmlanguage/src/autohotkeyl/constants';
import { scannerModeMapForAhkl } from '../../../../src/autohotkeyl';
import { Scanner } from '../../../../src/core/scanner';

describe('default.operator', () => {
  const scanner = new Scanner(scannerModeMapForAhkl);

  test.each(expressionOperators)('pass', (operatorText) => {
    scanner.initialize(operatorText);
    const token = scanner.scan('default');

    expect(token?.text).toBe(operatorText);
  });
});
