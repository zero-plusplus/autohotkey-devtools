import { directiveNames } from '../../../../src/autohotkey2/constants';
import { RuleName } from '../../../../src/constants';
import type { ScopeName } from '../../../../src/types';
import { name } from '../../../../src/utils';
import type { ExpectedTestData } from '../../../types';

export function createDirectiveStatementExpectedData(scopeName: ScopeName): ExpectedTestData[] {
  return [
    ...directiveNames.map((directive): ExpectedTestData => {
      return [ directive, [ { text: directive, scopes: name(scopeName, RuleName.DirectiveName) } ] ];
    }),
  ];
}
