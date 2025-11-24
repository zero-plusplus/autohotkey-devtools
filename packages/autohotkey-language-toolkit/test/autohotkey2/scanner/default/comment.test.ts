import { dedent } from '@zero-plusplus/utilities/src';
import { scannerModeMapForAhk2 } from '../../../../src/autohotkey2';
import { Scanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = new Scanner(scannerModeMapForAhk2);

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
