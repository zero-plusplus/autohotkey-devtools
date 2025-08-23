import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { floatOption } from '../option/floatOption';
import { $ } from './$';

export function $controlMoveOptions(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...floatOption(scopeName, [ 'X', 'Y', 'W', 'H' ], placeholder),
  ];
}
