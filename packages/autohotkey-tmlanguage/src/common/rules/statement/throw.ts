import {
  RuleName,
  type PatternsRule,
  type ScopeName,
} from '../../../tmlanguage.ts';
import * as rule_common from '../index.ts';

interface Placeholder {
  startPattern: string;
  assignmentOperators: readonly string[];
}
export function createThrowStatementRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return rule_common.createCallStatementRule(scopeName, {
    isDeprecated: false,
    startPattern: placeholder.startPattern,
    assignmentOperators: placeholder.assignmentOperators,
    commandRuleName: RuleName.ControlFlowKeyword,
    identifierPattern: 'throw',
  });
}
