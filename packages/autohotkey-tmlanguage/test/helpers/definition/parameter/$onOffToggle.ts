import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $onOff } from './$onOff';

export function $onOffToggle(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return $onOff(scopeName, placeholder, [ 'Toggle', '-1' ]);
}
