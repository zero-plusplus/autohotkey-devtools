import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $shouldKeyword } from './$shouldKeyword';

export function $onOff(scopeName: ScopeName, placeholder: Placeholder, additionalKeywords: string[] = []): ExpectedTestData[] {
  return [
    ...$shouldKeyword(
      scopeName,
      [ 'On', 'Off', '0', '1', ...additionalKeywords ],
      placeholder,
    ),
  ];
}
