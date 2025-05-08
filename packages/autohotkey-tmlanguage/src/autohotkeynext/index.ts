import * as v2 from '../autohotkey2';
import * as constants_v2 from '../autohotkey2/constants';
import * as patterns_v2 from '../autohotkey2/patterns';
import * as constants_v1 from '../autohotkeyl/constants';
import * as patterns_v1 from '../autohotkeyl/patterns';
import * as rules_v1 from '../autohotkeyl/rules';
import { Repository, RuleName } from '../constants';
import type { ScopeName, TmLanguage } from '../types';
import { includeRule, patternsRule } from '../utils';
import * as constants_vnext from './constants';
import * as definition_vnext from './definition';
import * as patterns_vnext from './patterns';
import * as rules_vnext from './rules';

export function createTmLanguage(): TmLanguage {
  const scopeName: ScopeName = 'autohotkeynext';
  const repositories_v2 = v2.createRepositories(scopeName, {
    builtinVaribles: constants_vnext.builtinVaribles,
    builtInClassNames: constants_vnext.builtInClassNames,
    builtInFunctionNames: constants_vnext.builtInFunctionNames,
    deprecatedBuiltinFunctionNames: constants_vnext.deprecatedBuiltinFunctionNames,
  });

  return {
    scopeName: `source.${scopeName}`,
    patterns: [
      includeRule(Repository.Meta),
      includeRule(Repository.Statement),
    ],
    repository: {
      ...repositories_v2,

      [Repository.Meta]: patternsRule(
        ...repositories_v2[Repository.Meta]!.patterns!,
        includeRule(Repository.Import),
        includeRule(Repository.Export),
      ),

      // #region declaration
      [Repository.Import]: rules_vnext.createImportDeclarationRule(scopeName, { startAnchor: patterns_v1.lineStartAnchor }),
      [Repository.Export]: rules_vnext.createExportDeclarationRule(scopeName, { startAnchor: patterns_v1.lineStartAnchor }),
      [Repository.ClassDeclaration]: rules_v1.createClassDeclarationRule(scopeName, {
        startAnchor: patterns_vnext.classStartAnchor,
        endAnchor: patterns_v1.lineEndAnchor,
        identifierPattern: patterns_v2.identifierPattern,
        rulesInBody: [
          includeRule(Repository.Meta),

          includeRule(Repository.TypedAssignmentDeclaration),
          includeRule(Repository.MetaPropertyName),
          includeRule(Repository.MethodDeclarationHead),
          includeRule(Repository.PropertyDeclaration),
          includeRule(Repository.BlockInClassBody),
          includeRule(Repository.StatementCommon),
          includeRule(Repository.ExpressionStatement),
        ],
      }),
      [Repository.TypedAssignmentDeclaration]: rules_vnext.createTypedAssignmentDeclarationRule(scopeName, {
        startAnchor: patterns_v1.lineStartAnchor,
        modifiers: constants_v1.modifiers,
        namePattern: patterns_v2.looseLeftHandPattern,
        nameRule: patternsRule(includeRule(Repository.Variable)),
        operators: constants_v2.assignmentOperators,
      }),
      // #endregion declaration

      // #region statement
      [Repository.DirectiveStatement]: rules_v1.createCommandLikeStatementRule(scopeName, definition_vnext.directiveDefinitions, {
        startAnchor: patterns_v1.statementStartAnchor,
        endAnchor: patterns_v1.lineEndAnchor,
        commandElementName: RuleName.DirectiveName,
      }),
      // #endregion statement

      // #region expression
      [Repository.ExpressionInBrackets]: patternsRule(
        includeRule(Repository.ObjectInBrackets),
        includeRule(Repository.ExpressionInControlFlow),
        includeRule(Repository.FunctionExpressionBlock),
      ),
      [Repository.FunctionExpressionBlock]: rules_vnext.createFunctionExpressionBlockRule(scopeName, {
        startAnchor: patterns_v1.lineStartAnchor,
      }),
      // #endregion expression
    },
  };
}
