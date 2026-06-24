import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { floatOption } from '../option/floatOption.ts';
import { $ } from './$.ts';

export function $controlMoveOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...floatOption(scopeName, [ 'X', 'Y', 'W', 'H' ], placeholder),
  ];
}
