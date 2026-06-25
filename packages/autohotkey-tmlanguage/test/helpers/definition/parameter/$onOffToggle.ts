import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $onOff } from './$onOff.ts';

export function $onOffToggle(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return $onOff(scopeName, placeholder, [ 'Toggle', '-1' ]);
}
