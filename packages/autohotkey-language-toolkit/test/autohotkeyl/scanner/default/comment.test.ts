import { dedent } from '@zero-plusplus/utilities/src';
import { scannerModeMapForAhkl } from '../../../../src/autohotkeyl';
import { Scanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = new Scanner(scannerModeMapForAhkl);

  test.each([
    '; comment',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token!.text).toBe(text);
  });

  test.each([
    '/**/',
    '/*  */',
    dedent`
      /*
      */
    `,
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan('default');

    expect(token!.text).toBe(text);
  });
});
