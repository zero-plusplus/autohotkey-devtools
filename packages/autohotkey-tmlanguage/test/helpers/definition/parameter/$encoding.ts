import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { CommandPlaceholder } from '../helpers';
import { keywordOption } from '../option/keywordOption';
import { $ } from './$';

export function $encoding(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'CP0', 'UTF-8', 'UTF-8-RAW', 'UTF-16', 'UTF-16-RAW' ], placeholder),
  ];
}

