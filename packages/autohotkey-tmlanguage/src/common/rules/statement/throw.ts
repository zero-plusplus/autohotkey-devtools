import * as rule_common from '..';
import { RuleName } from '../../../constants';
import type { PatternsRule, ScopeName } from '../../../types';

interface Placeholder {
  startAnchor: string;
  assignmentOperators: readonly string[];
}
export function createThrowStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return rule_common.createCallStatementRule(scopeName, {
    ...placeholder,
    commandRuleName: RuleName.ControlFlowKeyword,
    identifierPattern: 'throw',
  });
}
