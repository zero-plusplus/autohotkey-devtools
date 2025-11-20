import { defaultScanModeForAhkl } from '../../../../src/autohotkeyl/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = new Scanner('', defaultScanModeForAhkl);

  test.each([
    '; comment',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

    expect(token!.text).toBe(text);
  });
});
