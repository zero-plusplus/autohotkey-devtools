import * as constants_common from '../../../common/constants';
import * as definition_common from '../../../common/definition';
import * as patterns_common from '../../../common/patterns';
import * as rules_common from '../../../common/rules';
import { Repository, RuleName } from '../../../constants';
import type { CommandDefinition, PatternsRule, Repositories, ScopeName } from '../../../types';
import { includeRule, patternsRule } from '../../../utils';
import { createDirectiveCommentRule } from '../statement/command';

export function createDirectiveCommentRepositories(scopeName: ScopeName): Repositories {
  return {
    [Repository.CompilerDirectiveComment]: rules_common.createDirectiveCommentPatternsRule(scopeName, {
      startAnchor: patterns_common.lineStartAnchor,
      endAnchor: patterns_common.lineEndAnchor,
      definitions: definition_common.compilerDirectives,
    }),
    [Repository.UnquotedStringInCompilerDirective]: rules_common.createUnquotedStringRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      stringPattern: patterns_common.unquotedArgumentPattern,
      escapeSequenceRepository: Repository.UnquotedStringEscapeSequenceInCompilerDirective,
      additionalRules: [ includeRule(Repository.DereferenceInCompilerDirective) ],
    }),
    [Repository.UnquotedStringEscapeSequenceInCompilerDirective]: rules_common.createUnquotedEscapeSequencesRule(
      scopeName,
      constants_common.compilerDirectiveEscapeSequences,
    ),
    [Repository.BuiltInVariableInCompilerDirective]: rules_common.createReservedIdentifierRule(scopeName, {
      ruleName: RuleName.KeywordLikeBuiltInVariable,
      identifiers: constants_common.compilerDirectiveVariables,
    }),
    [Repository.DereferenceInCompilerDirective]: rules_common.createCompilerDirectiveDereferenceMatchRule(scopeName),
    [Repository.ExpressionInCompilerDirective]: patternsRule(
      includeRule(Repository.KeywordInExpression),
      includeRule(Repository.Dereference),
      includeRule(Repository.ParenthesizedExpression),
      includeRule(Repository.DereferenceInCompilerDirective),
      includeRule(Repository.DoubleStringInCompilerDirective),
      includeRule(Repository.Literal),
      includeRule(Repository.BuiltInVariableInCompilerDirective),
      includeRule(Repository.Variable),

      includeRule(Repository.Dot),
      includeRule(Repository.Operator),
    ),
    [Repository.DoubleStringInCompilerDirective]: rules_common.createDoubleStringInCompilerDirectiveRule(scopeName),
    [Repository.DoubleStringContentInCompilerDirective]: rules_common.createDoubleStringContentInCompilerDirectiveRule(scopeName),
  };
}

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  definitions: CommandDefinition[];
}
export function createDirectiveCommentPatternsRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(...placeholder.definitions.sort((a, b) => b.name.length - a.name.length).flatMap((definition) => {
    return [
      ...definition.signatures.map((signature) => createDirectiveCommentRule(scopeName, definition, signature, {
        commandElementName: RuleName.DirectiveCommentName,
        startAnchor: placeholder.startAnchor,
        endAnchor: placeholder.endAnchor,
      })),
    ];
  }));
}
