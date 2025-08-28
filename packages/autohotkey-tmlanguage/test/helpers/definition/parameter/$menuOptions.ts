import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { decimalOption } from '../option/decimalOption';
import { flagedKeywordOption } from '../option/flagedKeywordOption';
import { $ } from './$';

export function $menuOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...decimalOption(scopeName, [ 'P' ], placeholder),
    ...flagedKeywordOption(scopeName, [ 'Radio', 'Right', 'Break', 'BarBreak' ], placeholder),
  ];
}
