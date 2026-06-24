import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { $ } from './$.ts';

export function $encoding(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW' ], placeholder),
  ];
}

