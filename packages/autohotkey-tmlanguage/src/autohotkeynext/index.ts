import * as v2 from '../autohotkey2';
import * as patterns_v2 from '../autohotkey2/patterns';
import * as patterns_v1 from '../autohotkeyl/patterns';
import * as constants_common from '../common/constants';
import * as definitions_common from '../common/definitions';
import * as patterns_common from '../common/patterns';
import * as rules_common from '../common/rules';
import {
  includeRule,
  patternsRule,
  Repository,
  type ScopeName,
  type TmLanguage,
} from '../tmlanguage';
import * as constants_vnext from './constants';
import * as definitions_vnext from './definitions';
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
      [Repository.Import]: rules_vnext.createImportDeclarationRule(scopeName, {
        startPattern: patterns_common.lineStartPattern,
      }),
      [Repository.Export]: rules_vnext.createExportDeclarationRule(scopeName, {
        startPattern: patterns_common.lineStartPattern,
      }),
      [Repository.ClassDeclaration]: rules_common.createClassDeclarationRule(scopeName, {
        startPattern: patterns_vnext.classStartPattern,
        endPattern: patterns_common.lineEndPattern,
        identifierPattern: patterns_v2.identifierPattern,
        rulesInBody: [
          includeRule(Repository.Meta),

          includeRule(Repository.TypedAssignmentDeclaration),
          includeRule(Repository.MetaPropertyName),
          includeRule(Repository.MethodDeclarationHead),
          includeRule(Repository.PropertyDeclaration),
          includeRule(Repository.BlockInClassBody),
          includeRule(Repository.StatementInClassBlock),
          includeRule(Repository.ExpressionStatement),
        ],
      }),
      [Repository.TypedAssignmentDeclaration]: rules_vnext.createTypedAssignmentDeclarationRule(scopeName, {
        startPattern: patterns_common.lineStartPattern,
        modifiers: constants_common.accessModifiers,
        namePattern: patterns_v2.looseLeftHandPattern,
        nameRule: patternsRule(includeRule(Repository.Variable)),
        operators: constants_common.assignmentOperators,
      }),
      // #endregion declaration

      // #region statement
      [Repository.DirectiveStatement]: patternsRule(
        rules_common.createDirectiveStatementRule(scopeName, definitions_vnext.directiveDefinitions, {
          startPattern: patterns_v1.statementStartPattern,
          endPattern: patterns_common.lineEndPattern,
          allowFirstComma: false,
        }),
        rules_common.createDirectiveStatementRule(scopeName, [ definitions_common.undefinedDirective ], {
          startPattern: patterns_v2.statementStartPattern,
          endPattern: patterns_common.lineEndPattern,
          allowFirstComma: false,
        }),
      ),
      // #endregion statement

      // #region expression
      [Repository.ExpressionInBrackets]: patternsRule(
        includeRule(Repository.ObjectInBrackets),
        includeRule(Repository.ExpressionInControlFlow),
        includeRule(Repository.FunctionExpressionBlock),
      ),
      [Repository.FunctionExpressionBlock]: rules_vnext.createFunctionExpressionBlockRule(scopeName),
      // #endregion expression
    },
  };
}
