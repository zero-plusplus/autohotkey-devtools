import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { floatOption } from '../option/floatOption';
import { $ } from './$';

export function $controlMoveOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...floatOption(scopeName, [ 'X', 'Y', 'W', 'H' ], placeholder),
  ];
}
