import { dedent } from '@zero-plusplus/utilities/src';
import { defaultScanModeForAhk2 } from '../../../../src/autohotkey2/scanner/default';
import { Scanner } from '../../../../src/core/scanner';

describe('default', () => {
  const scanner = new Scanner('', defaultScanModeForAhk2);

  test.each([
    '; comment',
  ])('pass', (text) => {
    scanner.initialize(text);
    const token = scanner.scan();

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
    const token = scanner.scan();

    expect(token!.text).toBe(text);
  });
});
