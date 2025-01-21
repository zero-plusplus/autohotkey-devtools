import * as v2 from '../autohotkey2';
import * as constants_v2 from '../autohotkey2/constants';
import * as patterns_v2 from '../autohotkey2/patterns';
import * as constants_v1 from '../autohotkeyl/constants';
import * as patterns_v1 from '../autohotkeyl/patterns';
import * as rules_v1 from '../autohotkeyl/rules';
import { Repository } from '../constants';
import type { ScopeName, TmLanguage } from '../types';
import { includeRule } from '../utils';
import * as vnext from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeynext';

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Comment),
      includeRule(Repository.Statement),
    ],
    repository: {
      ...v2.createRepositories(scopeName),

      [Repository.ClassDeclaration]: rules_v1.createClassDeclarationRule(scopeName, {
        startAnchor: patterns_v1.statementStartAnchor,
        endAnchor: patterns_v1.lineEndAnchor,
        identifierPattern: patterns_v2.identifierPattern,
        rulesInBody: [
          includeRule(Repository.Meta),

          includeRule(Repository.TypedAssignmentDeclaration),
          includeRule(Repository.PropertyDeclaration),
          includeRule(Repository.BlockInClassBody),
          includeRule(Repository.StatementCommon),
          includeRule(Repository.ExpressionStatement),
        ],
      }),
      [Repository.TypedAssignmentDeclaration]: vnext.createTypedAssignmentDeclarationRule(scopeName, {
        modifiers: constants_v1.modifiers,
        namePattern: patterns_v2.looseLeftHandPattern,
        operators: constants_v2.assignmentOperators,
      }),
    },
  };
}
