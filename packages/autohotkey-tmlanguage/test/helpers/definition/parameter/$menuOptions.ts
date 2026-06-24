import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { decimalOption } from '../option/decimalOption.ts';
import { flagedKeywordOption } from '../option/flagedKeywordOption.ts';
import { $ } from './$.ts';

export function $menuOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...decimalOption(scopeName, [ 'P' ], placeholder),
    ...flagedKeywordOption(scopeName, [ 'Radio', 'Right', 'Break', 'BarBreak' ], placeholder),
  ];
}
