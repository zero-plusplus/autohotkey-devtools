import * as constants_common from '../../../../src/common/constants.ts';
import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { keywordOption } from '../option/keywordOption.ts';
import { $ } from './$.ts';

export function $color(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$(scopeName, placeholder),
    ...keywordOption(scopeName, [ 'Default', ...constants_common.colorNames ], placeholder),
  ];
}
