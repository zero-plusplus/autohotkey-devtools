import { hasFlag } from '@zero-plusplus/utilities/src';
import * as patterns_v2 from '../../../autohotkey2/patterns';
import { isSubCommandParameter } from '../../../autohotkeyl/definition';
import {
  CommandFlag, HighlightType,
  type CommandDefinition, type CommandParameter, type CommandSignature,
} from '../../../definitions';
import {
  alt, anyChar, anyChars0, anyChars1, capture, char, chars1, endAnchor, group, groupMany0, groupMany1,
  ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead,
  negativeLookbehind, negChar, negChars0, negChars1, numbers1, optional, optseq, ordalt, reluctant, seq, text,
  textalt, wordBound, wordChar, wordChars1,
} from '../../../oniguruma';
import {
  includeRule, name, nameRule, patternsRule, Repository, RuleName, StyleName,
  type BeginWhileRule, type ElementName, type MatchRule, type PatternsRule, type Rule, type ScopeName,
} from '../../../tmlanguage';
import * as constants_common from '../../constants';
import * as patterns_common from '../../patterns';
import { createAllowArgumentRule, createNumberRule, createSpacedArgumentTextRule } from '../misc/unquotedString';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
  argumentStartPattern?: string;
}
export function createCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    begin: capture(seq(
      negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      negativeLookahead(alt(char('(', '['), wordChar())),
      ...(
        placeholder.argumentStartPattern
          ? [ placeholder.argumentStartPattern ]
          : [
            lookahead(alt(
              seq(inlineSpaces1()),
              seq(inlineSpaces0(), char(',')),
            )),
          ]),
      optional(anyChars0()),
      lookahead(placeholder.endAnchor),
    )),
    beginCaptures: {
      1: patternsRule(
        includeRule(Repository.Comment),
        ...sortedDefinitions.flatMap((definition) => {
          return definition.signatures.map((signature) => createCommandLikeRule(scopeName, definition, signature, placeholder));
        }),
        createCommandNames(scopeName, definitions, {
          commandElementName: placeholder.commandElementName,
          startAnchor: placeholder.startAnchor,
        }),
      ),
    },
    while: seq(
      lookbehind(placeholder.startAnchor),
      lookahead(seq(
        inlineSpaces0(),
        char(','),
      )),
      inlineSpaces0(),
      capture(reluctant(groupMany0(seq(
        inlineSpaces0(),
        char(','),
        inlineSpaces0(),
        optional(patterns_common.unquotedArgumentPattern),
      )))),
      inlineSpaces0(),
      capture(optional(char(','))),
      inlineSpaces0(),
      lookahead(placeholder.endAnchor),
    ),
    whileCaptures: {
      1: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
      2: patternsRule(includeRule(Repository.Comma)),
    },
    patterns: [ includeRule(Repository.Comment) ],
  };
}
export function createCommandLikeRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder): Rule {
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase(definition.name),
      negativeLookahead(char('(')),
      lookaheadOnigurumaByParameters(signature.parameters, placeholder),
    )),
    end: seq(
      // command name
      seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(ignoreCase(definition.name)),
        negativeLookahead(char('(')),
      ),

      // arguments
      ...(0 < signature.parameters.length
        ? [
          reluctant(optional(signature.parameters.reduceRight<string>((prev, parameter, i, parameters) => {
            const isLastParameter = parameters.length - 1 === i;

            const capturedCommaSeparator = seq(inlineSpaces0(), capture(char(',')));
            const capturedFirstSeparator = group(alt(
              capturedCommaSeparator,
              inlineSpaces1(),
            ));
            const separator = i === 0 ? capturedFirstSeparator : capturedCommaSeparator;

            return seq(
              separator,
              negativeLookahead(seq(inlineSpaces1(), char(';'))),
              inlineSpaces0(),
              capture(parameterToOniguruma(parameter, isLastParameter, placeholder)),
              prev !== '' ? optional(prev) : '',
            );
          }, ''))),
        ]
        : []),
      optional(char(',')),
      lookahead(placeholder.endAnchor),
    ),
    endCaptures: Object.fromEntries([
      // command name
      hasFlag(definition.flags, CommandFlag.Deprecated)
        ? nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough)
        : nameRule(scopeName, placeholder.commandElementName),

      // parameters
      ...signature.parameters.flatMap((parameter, i, parameters) => {
        const isLastParameter = parameters.length - 1 === i;
        return [
          patternsRule(includeRule(Repository.Comma)),
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, placeholder),
        ];
      }),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}

export function createDirectiveCommentRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder): Rule {
  return {
    match: seq(
      // command name
      seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(char(';')),
        inlineSpaces0(),
        capture(ignoreCase(definition.name)),
        negativeLookahead(char('(')),
      ),

      // arguments
      ...(0 < signature.parameters.length
        ? [
          reluctant(optional(signature.parameters.reduceRight<string>((prev, parameter, i, parameters) => {
            const isLastParameter = parameters.length - 1 === i;

            const capturedCommaSeparator = seq(inlineSpaces0(), capture(char(',')));
            const capturedFirstSeparator = group(alt(
              capturedCommaSeparator,
              inlineSpaces1(),
            ));
            const separator = i === 0 ? capturedFirstSeparator : capturedCommaSeparator;

            return seq(
              separator,
              negativeLookahead(seq(inlineSpaces1(), char(';'))),
              inlineSpaces0(),
              capture(parameterToOniguruma(parameter, isLastParameter, placeholder)),
              prev !== '' ? optional(prev) : '',
            );
          }, ''))),
        ]
        : [ seq(inlineSpaces0(), capture(anyChars0())) ]
      ),
      lookahead(placeholder.endAnchor),
    ),
    captures: Object.fromEntries([
      nameRule(scopeName, RuleName.DirectiveComment),

      // command name
      hasFlag(definition.flags, CommandFlag.Deprecated)
        ? nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough)
        : nameRule(scopeName, placeholder.commandElementName),

      // parameters
      ...signature.parameters.flatMap((parameter, i, parameters) => {
        const isLastParameter = parameters.length - 1 === i;
        return [
          patternsRule(includeRule(Repository.Comma)),
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, placeholder),
        ];
      }),

      // inline comment
      nameRule(scopeName, RuleName.InLineComment),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}
export function createSendKeyCommandArgumentRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.UnquotedStringEscapeSequence),
    // https://www.autohotkey.com/docs/v1/lib/Send.htm#Blind
    // e.g. `{Blind}`
    //       ^^^^^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: ignoreCase(text('{Blind}')),
    },
    // https://www.autohotkey.com/docs/v1/lib/Send.htm#Raw
    // https://www.autohotkey.com/docs/v1/lib/Send.htm#Text
    // e.g. `{Text}raw text`
    //       ^^^^^^^^^^^^^^
    {
      match: seq(
        negativeLookahead(char(...constants_common.modifierSymbols)),
        capture(seq(
          char('{'),
          inlineSpaces0(),
          ignoreCase(textalt('Raw', 'Text')),
          inlineSpaces0(),
          char('}'),
        )),
        inlineSpaces0(),
        capture(anyChars0()),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
        2: patternsRule(
          includeRule(Repository.Dereference),
          includeRule(Repository.UnquotedStringEscapeSequence),
          {
            name: name(scopeName, RuleName.UnquotedString),
            match: negChars1('`', '%'),
          },
        ),
      },
    },
    // e.g. `{!}`
    //       ^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(
        char('{'),
        inlineSpaces0(),
        char('!', '#', '+', '^', '{', '}'),
        inlineSpaces0(),
        char('}'),
      ),
    },
    // e.g. `{Up}`
    //       ^^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(
        char('{'),
        inlineSpaces0(),
        keyword('Up', 'Down'),
        inlineSpaces0(),
        char('}'),
      ),
    },
    // e.g. `{Click 100 200 Left}`
    //       ^^^^^^ ^^^ ^^^ ^^^^^
    {
      match: seq(
        capture(char('{')),
        inlineSpaces0(),
        capture(keyword('Click')),
        optseq(
          inlineSpaces1(),
          capture(negChars0('}')),
        ),
        inlineSpaces0(),
        capture(char('}')),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
        2: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
        3: patternsRule(
          includeRule(Repository.Dereference),
          {
            name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
            match: keyword('Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D'),
          },
          {
            name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
            match: numbers1(),
          },
          {
            name: name(scopeName, RuleName.UnquotedString),
            match: negChar('}', '%'),
          },
        ),
        4: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
      },
    },
    // e.g. `{5 up}`
    //       ^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(char('{'), inlineSpaces0(), numbers1(), wordBound()),
    },
    // e.g. `{Tab up}`
    //       ^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: char('{'),
    },
    // e.g. `{5 up}`
    //          ^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(
        group(alt(
          ignoreCase(textalt('Up', 'Down', 'DownTemp', 'DownR')),
          numbers1(),
        )),
        wordBound(),
        inlineSpaces0(),
        char('}'),
      ),
    },
    // e.g. `{Up}`
    //          ^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: char('}'),
    },
    // e.g. `!#Tab`
    //         ^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: keyword(...constants_common.keyNameList),
    },
    // e.g. `+`, `!#a`
    //       ^    ^^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(
        chars1(...constants_common.modifierSymbols),
        negChars0('{', '%', inlineSpace()),
      ),
    },
    {
      name: name(scopeName, RuleName.UnquotedString),
      match: negChars1('`', '{', '}', '%', inlineSpace()),
    },
  );
}
export function createCommandRestArgumentsRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.PercentExpression),
    includeRule(Repository.Comma),
    createSpacedArgumentTextRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      additionalRules: [
        {
          match: seq(
            negativeLookahead('`'),
            capture(char(',')),
          ),
          captures: { 1: patternsRule(includeRule(Repository.Comma)) },
        },
        {
          name: name(scopeName, RuleName.UnquotedString),
          match: negChars1('`', inlineSpace(), ','),
        },
      ],
    }),
  );
}
export function createMenuNameCommandArgumentRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    // e.g. `Menu, MenuName, Add, &test`
    //                            ^^
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Underline),
      match: seq(char('&'), alt(negChar('&', '\\s'))),
    },
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Escape),
      match: text('&&'),
    },
    {
      name: name(scopeName, RuleName.UnquotedString),
      match: seq(char('&'), negativeLookahead(char('&'))),
    },
    includeRule(Repository.UnquotedStringEscapeSequence),
    {
      name: name(scopeName, RuleName.UnquotedString),
      match: negChars1('`', '&', '\\s'),
    },
  );
}

interface Placeholder_CommandNames {
  startAnchor: string;
  commandElementName: ElementName;
}
export function createCommandNames(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_CommandNames): PatternsRule {
  const commandNames = definitions.filter((definition) => !hasFlag(definition.flags, CommandFlag.Deprecated)).map((definition) => definition.name);
  const deprecatedCommandNames = definitions.filter((definition) => hasFlag(definition.flags, CommandFlag.Deprecated)).map((definition) => definition.name);

  const targets: [ [ string[], boolean ], [ string[], boolean ] ] = [ [ commandNames, false ], [ deprecatedCommandNames, true ] ];
  return patternsRule(...targets.map(([ names, isDeprecated ]): MatchRule => {
    return {
      match: seq(
        lookbehind(placeholder.startAnchor),
        inlineSpaces0(),
        capture(keyword(...names)),
      ),
      captures: {
        1: isDeprecated
          ? nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough)
          : nameRule(scopeName, placeholder.commandElementName),
      },
    };
  }));
}

export function createInvalidArgumentRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
    match: negChars1(',', inlineSpace()),
  };
}


// #region helpers
function lookaheadOnigurumaByParameters(parameters: CommandParameter[], placeholder: Placeholder): string {
  const subcommandArgumentIndex = parameters.findLastIndex((parameter) => isSubCommandParameter(parameter));
  if (subcommandArgumentIndex === -1) {
    return group(alt(
      inlineSpace(),
      char(','),
      endAnchor(),
    ));
  }

  return parameters.slice(0, subcommandArgumentIndex + 1).reduceRight<string>((prev, parameter, i) => {
    const commaSeparator = seq(inlineSpaces0(), char(','));
    const firstSeparator = group(alt(
      commaSeparator,
      inlineSpaces1(),
    ));
    const separator = i === 0 ? firstSeparator : commaSeparator;

    const parameterText = ((): string => {
      switch (parameter.type) {
        case HighlightType.SubCommand:
        case HighlightType.SubCommandLike:
        case HighlightType.FlowSubCommand: {
          if (parameter.itemPatterns && 0 < parameter.itemPatterns.length) {
            return seq(
              wordBound(),
              ignoreCase(ordalt(...parameter.itemPatterns)),
              wordBound(),
            );
          }
          break;
        }
        case HighlightType.GuiSubCommand: {
          if (parameter.itemPatterns && 0 < parameter.itemPatterns.length) {
            return seq(
              group(optseq(
                negChars0(':'),
                char(':'),
              )),
              wordBound(),
              ignoreCase(ordalt(...parameter.itemPatterns)),
              wordBound(),
            );
          }
          break;
        }
        case HighlightType.GuiOptions:
        case HighlightType.GuiControlOptions: {
          return seq(
            inlineSpaces0(),
            optseq(
              negChars0(':'),
              char(':'),
            ),
          );
        }
        default: break;
      }
      return optional(parameterToOniguruma(parameter, false, placeholder));
    })();

    return seq(
      separator,
      inlineSpaces0(),
      parameterText,
      prev !== '' ? prev : '',
    );
  }, '');
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): string {
  switch (parameter.type) {
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression:
      return isLastParameter
        ? patterns_common.unquotedExpressionLastArgumentPattern
        : patterns_common.unquotedExpressionArgumentPattern;
    case HighlightType.RestParams:
    case HighlightType.UnquotedStringShouldEscapeComma: {
      if (isLastParameter) {
        return seq(groupMany1(seq(
          patterns_common.unquotedArgumentPattern,
          optseq(
            inlineSpaces0(),
            char(','),
            optseq(
              negativeLookahead(seq(inlineSpaces1(), char(';'))),
              inlineSpaces0(),
              patterns_common.unquotedArgumentPattern,
            ),
          ),
        )));
      }
      return patterns_common.unquotedArgumentPattern;
    }
    case HighlightType.Namespace:
    case HighlightType.IncludeLibrary:
    {
      return patterns_common.unquotedLastArgumentPattern;
    }
    case HighlightType.UnquotedStringInCompilerDirective:
    case HighlightType.ExpressionInCompilerDirective:
      return patterns_common.unquotedArgumentPattern;
    default:
      return isLastParameter
        ? patterns_common.unquotedLastArgumentPattern
        : patterns_common.unquotedArgumentPattern;
  }
}
function parameterToPatternsRule(scopeName: ScopeName, defenition: CommandDefinition, parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): PatternsRule {
  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Invalid:
    case HighlightType.Blank:
    {
      return patternsRule(includeRule(Repository.CommandInvalidArgument));
    }
    case HighlightType.SubCommand:
    case HighlightType.SubCommandLike:
    case HighlightType.FlowSubCommand:
    {
      if (!parameter.itemPatterns || parameter.itemPatterns.length === 0) {
        throw Error('The subcommand keyword is not specified correctly.');
      }
      return patternsRule(
        {
          name: ((): ElementName => {
            switch (parameter.type) {
              case HighlightType.SubCommand: return name(scopeName, RuleName.SubCommandName);
              case HighlightType.FlowSubCommand: return name(scopeName, RuleName.FlowSubCommandName);
              default: return name(scopeName, RuleName.UnquotedString, StyleName.Strong);
            }
          })(),
          match: ignoreCase(ordalt(...parameter.itemPatterns)),
        },
        includeRule(Repository.CommandInvalidArgument),
      );
    }
    case HighlightType.GuiSubCommand:
    {
      if (!parameter.itemPatterns || parameter.itemPatterns.length === 0) {
        throw Error('The subcommand keyword is not specified correctly.');
      }
      return patternsRule(
        {
          match: seq(
            optseq(
              capture(negChars0(':')),
              capture(char(':')),
            ),
            capture(ignoreCase(ordalt(...parameter.itemPatterns))),
          ),
          captures: {
            1: patternsRule(includeRule(Repository.LabelName)),
            2: nameRule(scopeName, RuleName.Colon),
            3: nameRule(scopeName, RuleName.SubCommandName),
          },
        },
        includeRule(Repository.CommandInvalidArgument),
      );
    }
    case HighlightType.LetterOptions:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            {
              name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
              match: anyChar(),
            },
          ],
        }),
      );
    }
    case HighlightType.UnquotedString:
    {
      if (parameter.itemPatterns === undefined || parameter.itemPatterns.length === 0) {
        return patternsRule(includeRule(isLastParameter ? Repository.CommandLastArgument : Repository.CommandArgument));
      }

      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...(isLastParameter ? [
              { name: name(scopeName, RuleName.UnquotedString, StyleName.Escape), match: text('`,') },
              { name: name(scopeName, RuleName.UnquotedString), match: seq(char(',')) },
            ] : []),
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: negChars1('`', inlineSpace()),
            },
          ],
        }),
      );
    }
    case HighlightType.UnquotedStringWithNumber:
    {
      if (parameter.itemPatterns === undefined || parameter.itemPatterns.length === 0) {
        return patternsRule(includeRule(isLastParameter ? Repository.CommandLastArgumentWithNumber : Repository.CommandArgumentWithNumber));
      }

      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...(isLastParameter ? [
              { name: name(scopeName, RuleName.UnquotedString, StyleName.Escape), match: text('`,') },
              { name: name(scopeName, RuleName.UnquotedString), match: seq(char(',')) },
            ] : []),
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            createNumberRule(scopeName),
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: seq(
                negChar('`', '0-9', inlineSpace()),
                negChars0('`', inlineSpace()),
              ),
            },
          ],
        }),
      );
    }
    case HighlightType.NumberInCommandArgument:
    {
      return patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Dereference),
        includeRule(Repository.Number),
        includeRule(Repository.CommandInvalidArgument),
      );
    }
    case HighlightType.SendKeyName:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        includeRule(Repository.Dereference),
        includeRule(Repository.CommandArgumentSendKeyName),
      );
    }
    case HighlightType.RestParams:
    case HighlightType.UnquotedStringShouldEscapeComma:
    {
      if (parameter.itemPatterns === undefined || parameter.itemPatterns.length === 0) {
        return patternsRule(includeRule(Repository.CommandRestArguments));
      }

      return patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Comma),
        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            {
              match: seq(
                negativeLookahead('`'),
                capture(char(',')),
              ),
              captures: { 1: patternsRule(includeRule(Repository.Comma)) },
            },
            createNumberRule(scopeName),
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: seq(
                negChar('`', '0-9', inlineSpace(), ','),
                negChars0('`', inlineSpace(), ','),
              ),
            },
          ],
        }),
      );
    }
    case HighlightType.Style:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            createNumberRule(scopeName, { unaryOperator: [ '+', '-', '^' ] }),
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: seq(
                negChar('`', '0-9', '+', '-', '^', inlineSpace(), ','),
                negChars0('`', inlineSpace(), ','),
              ),
            },
          ],
        }),
      );
    }
    case HighlightType.LetterOptions:
    {
      if (!parameter.itemPatterns || parameter.itemPatterns.length === 0) {
        throw Error('letter option is not specified correctly');
      }

      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
            {
              name: name(scopeName, RuleName.SubCommandName, StyleName.Invalid),
              match: anyChar(),
            },
          ],
        }),
      );
    }
    case HighlightType.KeywordOnly:
    case HighlightType.SpacedKeywordsOnly:
    {
      if (!parameter.itemPatterns || parameter.itemPatterns.length === 0) {
        throw Error('keyword is not specified correctly');
      }

      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createAllowArgumentRule(scopeName, {
          stringPattern: patterns_common.unquotedArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          allowRules: optionItemPatternsToRules(scopeName, parameter.itemPatterns),
        }),
      );
    }
    case HighlightType.GuiOptions:
    case HighlightType.GuiControlOptions:
    {
      if (!parameter.itemPatterns || parameter.itemPatterns.length === 0) {
        throw Error('keyword is not specified correctly');
      }

      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            // e.g. `Gui, GuiName:+Resize`
            //            ^^^^^^^^
            {
              match: seq(
                lookbehind(seq(
                  lookbehind(placeholder.startAnchor),
                  inlineSpaces0(),
                  ignoreCase(defenition.name),
                  alt(inlineSpace(), seq(inlineSpaces0(), char(','))),
                  inlineSpaces0(),
                )),
                inlineSpaces0(),
                group(alt(
                  capture(seq(char('%'), anyChars0(), char('%'))),
                  seq(negativeLookahead(char('%')), capture(wordChars1())),
                )),
                capture(char(':')),
              ),
              captures: {
                1: patternsRule(includeRule(Repository.Dereference)),
                2: patternsRule(includeRule(Repository.LabelName)),
                3: nameRule(scopeName, RuleName.Colon),
              },
            },
            // e.g. `Gui, GuiName:+Resize`
            //                    ^^^^^^^
            ...optionItemPatternsToRules(scopeName, parameter.itemPatterns),
          ],
        }),
      );
    }
    case HighlightType.MenuItemName:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        includeRule(Repository.MenuItemNameCommandArgument),
      );
    }
    case HighlightType.IncludeLibrary:
    {
      return patternsRule(
        {
          match: seq(
            capture(negChars0('<')),
            capture(char('<')),
            capture(anyChars0()),
            capture(char('>')),
            capture(anyChars0()),
          ),
          captures: {
            1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
            2: nameRule(scopeName, RuleName.OpenAngleBracket),
            3: nameRule(scopeName, RuleName.UnquotedString, StyleName.Strong),
            4: nameRule(scopeName, RuleName.CloseAngleBracket),
            5: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          },
        },
        includeRule(Repository.CommandLastArgument),
      );
    }
    // Make each definition group easily distinguishable by underlining. However, if the underline is applied in TMLanguage, its color cannot be controlled. This should be implemented with semantic highlighting
    // For example, three groups are underlined in the following cases
    // e.g. `WinActivate abc ahk_exe abc.exe ahk_class abc`
    //                   ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
    // case HighlightType.WinTitle: {
    //   return patternsRule(
    //     includeRule(Repository.PercentExpressions),
    //     {
    //       match: seq(
    //         lookbehind(group(seq(
    //           char(','),
    //           inlineSpaces0(),
    //         ))),
    //         capture(seq(
    //           char('%'),
    //           negChars0('%'),
    //           char('%'),
    //         )),
    //         lookahead(seq(
    //           inlineSpaces0(),
    //           alt(char(','), placeholder.endAnchor),
    //         )),
    //       ),
    //       captures: {
    //         1: patternsRule(includeRule(Repository.Dereference)),
    //       },
    //     },
    //     {
    //       name: name(scopeName, StyleName.Underline),
    //       match: capture(seq(
    //         char('%'),
    //         negChars0('%'),
    //         char('%'),
    //       )),
    //       captures: {
    //         1: patternsRule(includeRule(Repository.Dereference)),
    //       },
    //     },
    //     {
    //       match: capture(groupMany1(capture(seq(
    //         negChar('%'),
    //         negativeLookahead(ignoreCase(seq(
    //           text('ahk_'),
    //           group(alt(ordalt(
    //             'class',
    //             'id',
    //             'pid',
    //             'exe',
    //             'group',
    //           ))),
    //         ))),
    //       )))),
    //       captures: {
    //         1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Underline),
    //       },
    //     },
    //   );
    // }
    case HighlightType.LabelName: return patternsRule(includeRule(Repository.LabelName));
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        includeRule(Repository.Comma),
        includeRule(Repository.AllInLineComments),
        includeRule(Repository.Expression),
      );
    }
    case HighlightType.Namespace:
    {
      return patternsRule(
        {
          name: name(scopeName, RuleName.Namespace),
          match: seq(wordBound(), patterns_v2.identifierPattern, wordBound()),
        },
        {
          name: name(scopeName, RuleName.Namespace, StyleName.Invalid),
          match: anyChars1(),
        },
      );
    }
    case HighlightType.UnquotedStringInCompilerDirective:
    {
      return patternsRule(includeRule(Repository.UnquotedStringInCompilerDirective));
    }
    case HighlightType.ExpressionInCompilerDirective:
    {
      return patternsRule(includeRule(Repository.ExpressionInCompilerDirective));
    }
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function optionItemPatternsToRules(scopeName: ScopeName, optionItemPatterns: string[] | undefined): Rule[] {
  if (optionItemPatterns === undefined || optionItemPatterns.length === 0) {
    return [];
  }
  return optionItemPatterns.map((optionItemPattern) => {
    return {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: optionItemPattern,
    };
  });
}
// #endregion helpers
