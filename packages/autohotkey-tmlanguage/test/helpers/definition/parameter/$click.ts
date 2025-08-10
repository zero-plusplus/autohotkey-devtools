import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $shouldSpacedKeyword } from './$shouldSpacedKeyword';

export function $click(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$shouldSpacedKeyword(scopeName, [
      [ '2' ],
      [ '100', '200', 'Left' ],
      [ '100', '200', 'L' ],
      [ '100', '200', 'Right' ],
      [ '100', '200', 'R' ],
      [ '100', '200', 'Middle' ],
      [ '100', '200', 'M' ],
      [ '100', '200', 'X1' ],
      [ '100', '200', 'X2' ],
      [ '100', '200', 'Up' ],
      [ '100', '200', 'U' ],
      [ '100', '200', 'Down' ],
      [ '100', '200', 'D' ],
      [ '100', '200', '0' ],
      [ '100', '200', 'Relative' ],
    ], placeholder),
  ];
}
