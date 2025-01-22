import * as constants_v2 from '../../../../src/autohotkey2/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

interface Placeholder {
  directiveNames: readonly string[];
}
export function createDirectiveStatementExpectedData(scopeName: ScopeName, placeholder?: Placeholder): ExpectedTestData[] {
  return [
    ...(placeholder?.directiveNames ?? constants_v2.directiveNames).map((directive): ExpectedTestData => {
      return [ directive, [ { text: directive, scopes: name(scopeName, RuleName.DirectiveName) } ] ];
    }),
  ];
}
