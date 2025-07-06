import { hasFlag } from '@zero-plusplus/utilities/src';
import * as patterns_v2 from '../../../autohotkey2/patterns';
import {
  CommandFlag, CommandParameterFlag, HighlightType,
  type CommandDefinition, type CommandParameter, type CommandSignature,
  type IncludeRulesCommandParameter, type ParameterItemMatcher,
} from '../../../definition';
import {
  alt, anyChars0, anyChars1, capture, char, chars1, endAnchor, group, groupMany0, groupMany1, ignoreCase,
  inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, negativeLookbehind,
  negChar, negChars0, negChars1, numbers1, optional, optseq, reluctant, seq, text, textalt, wordBound,
  wordChar, wordChars1,
} from '../../../oniguruma';
import {
  includeRule, name, nameRule, patternsRule, Repository, RuleName, StyleName,
  type BeginWhileRule, type Captures, type ElementName, type MatchRule, type PatternsRule, type Rule, type ScopeName,
} from '../../../tmlanguage';
import * as constants_common from '../../constants';
import * as patterns_common from '../../patterns';
import { createNumberRule, createSpacedArgumentTextRule } from '../misc/unquotedString';

interface Placeholder_CommandStatementRule {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
  expressionOperators: readonly string[];
}
export function createCommandStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_CommandStatementRule): BeginWhileRule {
  return createMultiLineCommandLikeStatementRule(scopeName, definitions, {
    startAnchor: placeholder.startAnchor,
    endAnchor: placeholder.endAnchor,
    commandElementName: placeholder.commandElementName,
    allowFirstComma: true,
    allowContinuation: true,
    argumentStartPattern: alt(
      seq(inlineSpaces0(), negativeLookahead(textalt(...placeholder.expressionOperators))),
      inlineSpaces1(),
      seq(inlineSpaces0(), char(',')),
    ),
  });
}

interface Placeholder_MultiLineCommandLikeStatementRule {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
  argumentStartPattern: string;
  allowFirstComma: boolean;
  allowContinuation: boolean;
}
export function createMultiLineCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_MultiLineCommandLikeStatementRule): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    begin: capture(seq(
      negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      negativeLookahead(alt(char('(', '['), wordChar())),
      lookahead(placeholder.argumentStartPattern),
      optional(anyChars0()),
      lookahead(placeholder.endAnchor),
    )),
    beginCaptures: {
      1: patternsRule(
        includeRule(Repository.Trivias),
        ...sortedDefinitions.flatMap((definition) => {
          return definition.signatures.map((signature) => createSingleLineCommandLikeStatementRule(scopeName, definition, signature, placeholder));
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
    whileCaptures: placeholder.allowContinuation
      ? {
        1: patternsRule(
          includeRule(Repository.Comma),
          includeRule(Repository.CommandArgument),
        ),
        2: patternsRule(includeRule(Repository.Comma)),
      }
      : {
        1: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
        2: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
      },
    patterns: [ includeRule(Repository.Trivias) ],
  };
}

export interface Placeholder_SingleLineCommandLikeStatementRule {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
  allowFirstComma: boolean;
}
export function createSingleLineCommandLikeStatementRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder_SingleLineCommandLikeStatementRule): Rule {
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase(definition.name),
      negativeLookahead(char('(')),
      lookaheadOnigurumaByParameters(signature.parameters),
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

            const capturedCommaSeparator = placeholder.allowFirstComma
              ? seq(inlineSpaces0(), capture(char(',')))
              : capture(char(','));
            const capturedFirstSeparator = group(alt(
              capturedCommaSeparator,
              inlineSpaces1(),
            ));
            const capturedSeparator = i === 0 ? capturedFirstSeparator : capturedCommaSeparator;

            return seq(
              capturedSeparator,
              negativeLookahead(seq(inlineSpaces1(), char(';'))),
              inlineSpaces0(),
              capture(parameterToOniguruma(parameter, isLastParameter)),
              prev !== '' ? optional(prev) : '',
            );
          }, ''))),
        ]
        : []),

      optional(group(alt(
        seq(inlineSpaces1(), capture(optional(char(',')))),
        seq(inlineSpaces0(), capture(optional(char(',')))),
      ))),
      lookahead(placeholder.endAnchor),
    ),
    endCaptures: Object.fromEntries([
      // command name
      ((): Rule => {
        if (hasFlag(definition.flags, CommandFlag.Removed)) {
          return nameRule(scopeName, placeholder.commandElementName, StyleName.Invalid, StyleName.Strikethrough);
        }
        if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
          return nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough);
        }
        return nameRule(scopeName, placeholder.commandElementName);
      })(),

      // parameters
      ...signature.parameters.flatMap((parameter, i, parameters) => {
        const isLastParameter = parameters.length - 1 === i && !hasFlag(parameter.flags, CommandParameterFlag.RestParams);

        return [
          (!placeholder.allowFirstComma && i === 0)
            ? nameRule(scopeName, RuleName.Comma, StyleName.Invalid)
            : patternsRule(includeRule(Repository.Comma)),
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, placeholder),
        ];
      }),

      patternsRule(includeRule(Repository.Comma)),
      placeholder.allowFirstComma
        ? patternsRule(includeRule(Repository.Comma))
        : nameRule(scopeName, RuleName.Comma, StyleName.Invalid),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}

interface Placeholder_DirectiveCommentRule {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
}
export function createDirectiveCommentRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder_DirectiveCommentRule): Rule {
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
              capture(parameterToOniguruma(parameter, isLastParameter)),
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
      ((): Rule => {
        if (hasFlag(definition.flags, CommandFlag.Removed)) {
          return nameRule(scopeName, placeholder.commandElementName, StyleName.Invalid, StyleName.Strikethrough);
        }
        if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
          return nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough);
        }
        return nameRule(scopeName, placeholder.commandElementName);
      })(),

      // parameters
      ...signature.parameters.flatMap((parameter, i, parameters) => {
        const isLastParameter = parameters.length - 1 === i;
        return [
          patternsRule(includeRule(Repository.Comma)),
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, placeholder),
        ];
      }),

      // inline comment
      nameRule(scopeName, RuleName.InlineComment),
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

export function createInvalidArgumentRule(scopeName: ScopeName): MatchRule {
  return {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
    match: negChars1(',', inlineSpace()),
  };
}
export function createInvalidLastArgumentRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.CommandInvalidArgument),
    {
      name: name(scopeName, RuleName.Comma, StyleName.Invalid),
      match: char(','),
    },
  );
}


// #region helpers
function lookaheadOnigurumaByParameters(parameters: CommandParameter[]): string {
  const subcommandArgumentIndex = parameters.findLastIndex((parameter) => hasFlag(parameter.flags, CommandParameterFlag.SubCommand));
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
      const labelPattern = group(optseq(
        inlineSpaces0(),
        negChars0(':', inlineSpace()),
        char(':'),
      ));

      if (hasFlag(parameter.flags, CommandParameterFlag.SubCommand)) {
        if (parameter.itemMatchers?.length === undefined) {
          throw Error('');
        }

        const subcommandPattern = seq(
          wordBound(),
          group(alt(...itemPatternsToPattern(parameter.itemMatchers))),
          wordBound(),
        );
        if (hasFlag(parameter.flags, CommandParameterFlag.Labeled)) {
          return seq(
            labelPattern,
            inlineSpaces0(),
            subcommandPattern,
          );
        }
        return subcommandPattern;
      }
      else if (hasFlag(parameter.flags, CommandParameterFlag.Labeled)) {
        return labelPattern;
      }
      return optional(parameterToOniguruma(parameter, false));
    })();

    return seq(
      separator,
      inlineSpaces0(),
      parameterText,
      prev !== '' ? prev : '',
    );
  }, '');
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean): string {
  if (hasFlag(parameter.flags, CommandParameterFlag.CompilerDirective)) {
    return patterns_common.unquotedArgumentPattern;
  }
  else if (hasFlag(parameter.flags, CommandParameterFlag.Expression)) {
    return isLastParameter ? patterns_common.unquotedExpressionLastArgumentPattern : patterns_common.unquotedExpressionArgumentPattern;
  }
  else if (hasFlag(parameter.flags, CommandParameterFlag.RestParams)) {
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
  return isLastParameter ? patterns_common.unquotedLastArgumentPattern : patterns_common.unquotedArgumentPattern;
}
function parameterToPatternsRule(scopeName: ScopeName, defenition: CommandDefinition, parameter: CommandParameter | IncludeRulesCommandParameter, isLastParameter: boolean, placeholder: { startAnchor: string }): PatternsRule {
  const percentExpressionRule = includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression);

  if ('includes' in parameter) {
    return patternsRule(
      percentExpressionRule,
      includeRule(Repository.Dereference),

      ...parameter.includes,
    );
  }

  if (hasFlag(parameter.flags, CommandParameterFlag.CompilerDirective)) {
    if (hasFlag(parameter.flags, CommandParameterFlag.Expression)) {
      return patternsRule(includeRule(Repository.ExpressionInCompilerDirective));
    }
    return patternsRule(includeRule(Repository.UnquotedStringInCompilerDirective));
  }
  else if (hasFlag(parameter.flags, CommandParameterFlag.Invalid)) {
    return patternsRule(includeRule(isLastParameter ? Repository.CommandInvalidLastArgument : Repository.CommandInvalidArgument));
  }
  else if (hasFlag(parameter.flags, CommandParameterFlag.SubCommand)) {
    return subcommandParameterToPatternsRule(scopeName, defenition, parameter, isLastParameter, placeholder);
  }
  else if (hasFlag(parameter.flags, CommandParameterFlag.Expression)) {
    return patternsRule(
      percentExpressionRule,

      includeRule(Repository.Comma),
      includeRule(Repository.InlineTrivias),
      includeRule(Repository.Expression),
    );
  }

  switch (parameter.type) {
    case HighlightType.QuotableUnquotedString:
    {
      if (parameter.itemMatchers === undefined || parameter.itemMatchers.length === 0) {
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

            {
              name: name(scopeName, RuleName.UnquotedString),
              match: char('"', `'`),
            },
            ...optionItemPatternsToRules(scopeName, itemPatternsToPattern(parameter.itemMatchers)),
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: negChars1('`', '"', `'`, inlineSpace()),
            },
          ],
        }),
      );
    }
    case HighlightType.UnquotedBooleanLike:
    {
      return patternsRule(includeRule(Repository.CommandArgumentBooleanLike));
    }
    case HighlightType.Style:
    {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        createSpacedArgumentTextRule(scopeName, {
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            ...optionItemPatternsToRules(scopeName, itemPatternsToPattern(parameter.itemMatchers ?? [])),
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
    case HighlightType.IncludeLibrary:
    case HighlightType.QuotableIncludeLibrary:
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
            3: nameRule(scopeName, RuleName.IncludeLibrary),
            4: nameRule(scopeName, RuleName.CloseAngleBracket),
            5: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          },
        },
        ...parameter.type === HighlightType.QuotableIncludeLibrary
          ? [
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: char('"', `'`),
            },
            {
              match: capture(negChars1('`', '"', `'`)),
              captures: {
                1: patternsRule(includeRule(Repository.CommandLastArgument)),
              },
            },
          ]
          : [ includeRule(Repository.CommandLastArgument) ],
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
    default: break;
  }

  if (parameter.itemMatchers === undefined || parameter.itemMatchers.length === 0) {
    if (hasFlag(parameter.flags, CommandParameterFlag.RestParams)) {
      return patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      );
    }
    else if (hasFlag(parameter.flags, CommandParameterFlag.WithNumber)) {
      return patternsRule(includeRule(isLastParameter ? Repository.CommandLastArgumentWithNumber : Repository.CommandArgumentWithNumber));
    }
    else if (hasFlag(parameter.flags, CommandParameterFlag.Number)) {
      return patternsRule(
        includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression),

        includeRule(Repository.DereferenceUnaryOperator),
        includeRule(Repository.Dereference),
        includeRule(Repository.Number),
        includeRule(Repository.CommandInvalidArgument),
      );
    }
    return patternsRule(includeRule(isLastParameter ? Repository.CommandLastArgument : Repository.CommandArgument));
  }
  return patternsRule(
    percentExpressionRule,

    createSpacedArgumentTextRule(scopeName, {
      stringRuleName: RuleName.UnquotedString,
      additionalRules: [
        ...((): Rule[] => {
          const highPriorityRules: Rule[] = [];

          if (isLastParameter && !hasFlag(parameter.flags, CommandParameterFlag.Keyword)) {
            highPriorityRules.push(
              { name: name(scopeName, RuleName.UnquotedString, StyleName.Escape), match: text('`,') },
              { name: name(scopeName, RuleName.UnquotedString), match: seq(char(',')) },
            );
          }

          if (hasFlag(parameter.flags, CommandParameterFlag.Labeled)) {
            // e.g. `Gui, GuiName:+Resize`
            //            ^^^^^^^^
            highPriorityRules.push({
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
            });
          }
          return highPriorityRules;
        })(),

        ...optionItemPatternsToRules(scopeName, itemPatternsToPattern(parameter.itemMatchers)),

        ...((): Rule[] => {
          if (hasFlag(parameter.flags, CommandParameterFlag.Keyword)) {
            return [
              {
                name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
                match: negChars0('`', inlineSpace()),
              },
            ];
          }
          else if (hasFlag(parameter.flags, CommandParameterFlag.Number)) {
            return [
              createNumberRule(scopeName),
              includeRule(Repository.CommandInvalidArgument),
            ];
          }
          else if (hasFlag(parameter.flags, CommandParameterFlag.WithNumber)) {
            return [
              createNumberRule(scopeName),
              {
                name: name(scopeName, RuleName.UnquotedString),
                match: seq(
                  negChar('`', '0-9', inlineSpace()),
                  negChars0('`', inlineSpace()),
                ),
              },
            ];
          }

          const lowPriorityRules: Rule[] = [];
          if (hasFlag(parameter.flags, CommandParameterFlag.Number)) {
            lowPriorityRules.push(createNumberRule(scopeName));
          }
          lowPriorityRules.push({
            name: name(scopeName, RuleName.UnquotedString),
            match: negChars1('`', inlineSpace()),
          });
          return lowPriorityRules;
        })(),
      ],
    }),
  );
}
function subcommandParameterToPatternsRule(scopeName: ScopeName, definition: CommandDefinition, parameter: CommandParameter, isLastParameter: boolean, placeholder: { startAnchor: string }): PatternsRule {
  if (!parameter.itemMatchers || parameter.itemMatchers.length === 0) {
    throw Error('The subcommand keyword is not specified correctly.');
  }
  if (hasFlag(parameter.flags, CommandParameterFlag.Labeled)) {
    return patternsRule(
      {
        match: seq(
          optseq(
            capture(negChars0(':')),
            capture(char(':')),
          ),
          capture(anyChars1()),
        ),
        captures: {
          1: patternsRule(includeRule(Repository.LabelName)),
          2: nameRule(scopeName, RuleName.Colon),
          3: patternsRule(...itemPatternsToRules(scopeName, parameter.itemMatchers)),
        },
      },
      includeRule(Repository.CommandInvalidArgument),
    );
  }
  return patternsRule(
    ...itemPatternsToRules(scopeName, parameter.itemMatchers),
    includeRule(Repository.CommandInvalidArgument),
  );
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
function itemPatternsToPattern(itemPatterns: ParameterItemMatcher[]): string[] {
  return itemPatterns.map((itemPattern) => {
    if (typeof itemPattern === 'string') {
      return itemPattern;
    }

    return itemPattern.match;
  });
}
function itemPatternsToRules(scopeName: ScopeName, itemPatterns: ParameterItemMatcher[]): Rule[] {
  return itemPatterns.map((itemPattern): Rule => {
    if (typeof itemPattern === 'string') {
      return {
        name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
        match: ignoreCase(itemPattern),
      };
    }

    if ('name' in itemPattern) {
      return {
        name: name(scopeName, ...Array.isArray(itemPattern.name) ? itemPattern.name : [ itemPattern.name ]),
        match: itemPattern.match,
      };
    }
    return {
      match: itemPattern.match,
      captures: Object.fromEntries(Object.entries(itemPattern.captures).map(([ index, matchers ]) => {
        return [
          index + 1,
          patternsRule(...matchers.flatMap((matcher): Rule[] => {
            if ('include' in matcher) {
              return [ matcher ];
            }
            return itemPatternsToRules(scopeName, Array.isArray(matcher) ? matcher : [ matcher ]);
          })),
        ];
      })) as unknown as Captures,
    };
  });
}
// #endregion helpers
