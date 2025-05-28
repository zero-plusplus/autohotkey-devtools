import * as patterns_v1 from '../../../autohotkeyl/patterns';
import * as constants_common from '../../../common/constants';
import * as definition_common from '../../../common/definition';
import * as patterns_common from '../../../common/patterns';
import * as rules_common from '../../../common/rules';
import { Repository, RuleDescriptor, RuleName, StyleName, TokenType } from '../../../constants';
import {
  alt, anyChars0, capture, char, group, ignoreCase, many0, negChar, negChars1, number, numbers0,
  optional, optseq, seq, text, textalt,
} from '../../../oniguruma';
import type { CommandDefinition, MatchRule, PatternsRule, Repositories, ScopeName } from '../../../types';
import { includeRule, name, namedPatternsRule, nameRule, patternsRule } from '../../../utils';
import { createDirectiveCommentRule } from '../statement/command';

export function createDirectiveCommentRepositories(scopeName: ScopeName): Repositories {
  return {
    [Repository.CompilerDirectiveComment]: createDirectiveCommentPatternsRule(scopeName, {
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
    [Repository.DereferenceInCompilerDirective]: createCompilerDirectiveDereferenceMatchRule(scopeName),
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
    [Repository.DoubleStringInCompilerDirective]: createDoubleStringInCompilerDirectiveRule(scopeName),
    [Repository.DoubleStringContentInCompilerDirective]: createDoubleStringContentInCompilerDirectiveRule(scopeName),
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

export function createDoubleStringInCompilerDirectiveRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('"')),
      capture(many0(alt(
        text('""'),
        negChar('"'),
      ))),
      capture(char('"')),
    ),
    captures: {
      1: nameRule(scopeName, RuleName.DoubleString, RuleDescriptor.Begin),
      2: createDoubleStringContentInCompilerDirectiveRule(scopeName),
      3: nameRule(scopeName, RuleName.DoubleString, RuleDescriptor.End),
    },
  };
}
export function createDoubleStringContentInCompilerDirectiveRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.DereferenceInCompilerDirective),
    {
      name: name(scopeName, RuleName.DoubleString, StyleName.Escape),
      match: textalt(...constants_common.compilerDirectiveEscapeSequences),
    },
    {
      name: name(scopeName, RuleName.DoubleString, StyleName.Invalid),
      match: char('`'),
    },
    {
      name: name(scopeName, RuleName.DoubleString),
      match: negChars1('`', '%'),
    },
  );
}
export function createCompilerDirectiveDereferenceMatchRule(scopeName: ScopeName): MatchRule {
  return {
    match: seq(
      capture(char('%')),
      capture(patterns_v1.identifierPattern),
      optseq(
        capture(char('~')),
        capture(many0(alt(
          text('`~'),
          negChar('~'),
        ))),
        optseq(
          capture(char('~')),
          capture(anyChars0()),
        ),
      ),
      capture(char('%')),
    ),
    captures: {
      1: nameRule(scopeName, TokenType.Other, RuleName.PercentBegin),
      2: patternsRule(includeRule(Repository.Variable)),
      3: nameRule(scopeName, TokenType.Other, RuleName.Operator),
      4: namedPatternsRule(name(scopeName, RuleName.RegExpString), [ includeRule(Repository.DoubleStringAsRegExpContent) ]),
      5: nameRule(scopeName, TokenType.Other, RuleName.Operator),
      6: patternsRule(
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Escape),
          match: text('$$'),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Strong),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
            number(),
          ),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Strong),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
            char('{'),
            group(alt(
              patterns_v1.identifierPattern,
              numbers0(),
            )),
            char('}'),
          ),
        },
        {
          name: name(scopeName, RuleName.DoubleString),
          match: negChars1('`', '$'),
        },
        {
          name: name(scopeName, RuleName.DoubleString, StyleName.Invalid),
          match: seq(
            char('$'),
            optional(ignoreCase(char('U', 'L'))),
          ),
        },
      ),
      7: nameRule(scopeName, TokenType.Other, RuleName.PercentEnd),
    },
  };
}
