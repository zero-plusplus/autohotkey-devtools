import { hasFlag } from '@zero-plusplus/utilities/src';
import { CommandFlag, HighlightType, Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChar, anyChars0, anyChars1, capture, char, endAnchor, group, groupMany0, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, negChar, negChars0, negChars1, numbers0, numbers1, optional, optseq, ordalt, seq, text, wordBound, wordChars0, wordChars1 } from '../../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandParameter, CommandSignature, ElementName, MatchRule, PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';
import { isSubCommandParameter, parseParameterValue } from '../../definition';
import * as patterns_v1 from '../../patterns';
import { createAllowArgumentRule, createArgumentNumberRules, createArgumentStringRule } from './unquotedString';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  commandElementName: ElementName;
}
export function createCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    begin: capture(seq(
      lookbehind(placeholder.startAnchor),
      inlineSpaces0(),
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      lookahead(alt(
        seq(inlineSpaces1()),
        seq(inlineSpaces0(), char(',')),
      )),
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
      inlineSpaces0(),
      capture(groupMany0(seq(
        inlineSpaces0(),
        char(','),
        inlineSpaces0(),
        optional(patterns_v1.commandArgumentPattern),
      ))),
      lookahead(placeholder.endAnchor),
    ),
    whileCaptures: {
      1: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
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
      lookahead(wordBound()),
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
      optional(signature.parameters.reduceRight<string>((prev, parameter, i, parameters) => {
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
      }, '')),
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
          if (parameter.values && 0 < parameter.values.length) {
            return seq(
              wordBound(),
              ignoreCase(ordalt(...parameter.values.map((value) => parseParameterValue(value).value))),
              wordBound(),
            );
          }
          break;
        }
        case HighlightType.GuiSubCommand: {
          if (parameter.values && 0 < parameter.values.length) {
            return seq(
              group(optseq(
                wordChars0(),
                char(':'),
              )),
              wordBound(),
              ignoreCase(ordalt(...parameter.values.map((value) => parseParameterValue(value).value))),
              wordBound(),
            );
          }
          break;
        }
        case HighlightType.GuiOptions:
        case HighlightType.GuiControlOptions: {
          if (i === 0 && parameter.type === HighlightType.GuiOptions) {
            return seq(
              inlineSpaces0(),
              optseq(
                wordChars1(),
                char(':'),
              ),
              inlineSpaces0(),
              char('+', '-'),
            );
          }
          return seq(
            inlineSpaces0(),
            char('+', '-'),
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
      return patterns_v1.expressionArgumentPattern;
    case HighlightType.ExpressionWithOneTrueBrace:
      return isLastParameter
        ? patterns_v1.expressionWithOneTrueBraceArgumentPattern
        : patterns_v1.commandArgumentPattern;
    case HighlightType.UnquotedStringShouldEscapeComma: {
      if (isLastParameter) {
        return seq(groupMany1(seq(
          patterns_v1.commandArgumentPattern,
          optseq(
            inlineSpaces0(),
            char(','),
            optseq(
              negativeLookahead(seq(inlineSpaces1(), char(';'))),
              inlineSpaces0(),
              patterns_v1.commandArgumentPattern,
            ),
          ),
        )));
      }
      return patterns_v1.commandArgumentPattern;
    }
    default:
      return isLastParameter
        ? patterns_v1.lastArgumentPattern
        : patterns_v1.commandArgumentPattern;
  }
}
function parameterToPatternsRule(scopeName: ScopeName, defenition: CommandDefinition, parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): PatternsRule {
  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Invalid:
    case HighlightType.Blank:
    {
      return patternsRule(createAllowArgumentRule(scopeName, {
        stringPattern: patterns_v1.commandArgumentPattern,
        stringRuleName: RuleName.UnquotedString,
        allowRules: [],
      }));
    }
    case HighlightType.SubCommand:
    case HighlightType.SubCommandLike:
    case HighlightType.FlowSubCommand:
    {
      if (!parameter.values || parameter.values.length === 0) {
        throw Error('The subcommand keyword is not specified correctly.');
      }
      return patternsRule(createAllowArgumentRule(scopeName, {
        stringPattern: patterns_v1.commandArgumentPattern,
        stringRuleName: RuleName.UnquotedString,
        allowRules: [
          {
            name: ((): ElementName => {
              switch (parameter.type) {
                case HighlightType.SubCommand: return name(scopeName, RuleName.SubCommandName);
                case HighlightType.FlowSubCommand: return name(scopeName, RuleName.FlowSubCommandName);
                default: return name(scopeName, RuleName.UnquotedString, StyleName.Strong);
              }
            })(),
            match: ignoreCase(ordalt(...parameter.values.map((value) => parseParameterValue(value).value))),
          },
          {
            name: name(scopeName, RuleName.SubCommandName, StyleName.Invalid),
            match: anyChars1(),
          },
        ],
      }));
    }
    case HighlightType.GuiSubCommand:
    case HighlightType.BlankOrGuiName:
    {
      return patternsRule(createAllowArgumentRule(scopeName, {
        stringPattern: patterns_v1.commandArgumentPattern,
        stringRuleName: RuleName.UnquotedString,
        allowRules: [
          {
            match: seq(
              optseq(
                capture(wordChars0()),
                capture(char(':')),
              ),
              capture(ignoreCase(ordalt(...(parameter.values ?? []).map((value) => parseParameterValue(value).value)))),
            ),
            captures: {
              1: nameRule(scopeName, RuleName.LabelName),
              2: nameRule(scopeName, RuleName.Colon),
              3: nameRule(scopeName, RuleName.SubCommandName),
            },
          },
          {
            name: name(scopeName, RuleName.SubCommandName, StyleName.Invalid),
            match: anyChars1(),
          },
        ],
      }));
    }
    case HighlightType.LetterOptions:
    case HighlightType.FileAttributes:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            {
              name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
              match: ignoreCase(ordalt(...(parameter.values ?? []).map((value) => parseParameterValue(value).value))),
            },
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
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          overideRules: [],
          additionalRules: [
            ...createArgumentNumberRules(scopeName, {
              additionalRules: optionItemsToRules(scopeName, parameter.values),
            }),
          ],
        }),
      );
    }
    case HighlightType.UnquotedStringShouldEscapeComma:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          overideRules: [],
          additionalRules: createArgumentNumberRules(scopeName, {
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
                match: (negChars1('`', '\\s', ',')),
              },
            ],
          }),
        }),
      );
    }
    case HighlightType.Style:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          overideRules: [],
          additionalRules: [
            ...createArgumentNumberRules(scopeName, {
              unaryOperator: [ '+', '-', '^' ],
              additionalRules: optionItemsToRules(scopeName, parameter.values),
            }),
          ],
        }),
      );
    }
    case HighlightType.LetterOptions:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          overideRules: [],
          additionalRules: [
            {
              name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
              match: ignoreCase(ordalt(...(parameter.values ?? []).map((value) => parseParameterValue(value).value))),
            },
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
    case HighlightType.GuiControlOptions:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createAllowArgumentRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          allowRules: optionItemsToRules(scopeName, parameter.values),
        }),
      );
    }
    case HighlightType.GuiOptions:
    {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
            // e.g. `Gui, GuiName:+Resize`
            //            ^^^^^^^^
            {
              match: seq(
                lookbehind(group(seq(
                  lookbehind(placeholder.startAnchor),
                  inlineSpaces0(),
                  ignoreCase(defenition.name),
                  alt(inlineSpace(), seq(inlineSpaces0(), char(','))),
                  inlineSpaces0(),
                ))),
                capture(wordChars1()),
                capture(char(':')),
              ),
              captures: {
                1: patternsRule(
                  includeRule(Repository.Dereference),
                  {
                    name: name(scopeName, RuleName.LabelName),
                    match: wordChars1(),
                  },
                ),
                2: nameRule(scopeName, RuleName.Colon),
              },
            },
            // e.g. `Gui, GuiName:+Resize`
            //                    ^^^^^^^
            ...optionItemsToRules(scopeName, parameter.values),
          ],
        }),
      );
    }
    case HighlightType.MenuItemName: {
      return patternsRule(
        includeRule(Repository.PercentExpressions),
        createArgumentStringRule(scopeName, {
          stringPattern: patterns_v1.commandArgumentPattern,
          stringRuleName: RuleName.UnquotedString,
          additionalRules: [
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
            {
              name: name(scopeName, RuleName.UnquotedString),
              match: negChars1('`', '&', '\\s'),
            },
          ],
        }),
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
    case HighlightType.LabelName: return patternsRule(nameRule(scopeName, Repository.CommandArgument, RuleName.LabelName));
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression:
    {
      return patternsRule(
        includeRule(Repository.InLineComments),
        includeRule(Repository.PercentExpressions),
        includeRule(Repository.Expression),

      );
    }
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function optionItemsToRules(scopeName: ScopeName, optionItems: string[] | undefined): Rule[] {
  if (optionItems === undefined || optionItems.length === 0) {
    return [];
  }
  const grouped = Object.groupBy(
    optionItems.map((value) => {
      const parsed = parseParameterValue(value);
      return parsed;
    }),
    (item) => `${item.prefix}${item.type}`,
  );

  return Object.entries(grouped).flatMap(([ , values ]): Rule[] => {
    if (values?.[0] === undefined || values.length === 0) {
      return [];
    }
    const { prefix, type } = values[0];
    return [ parameterValueToRuleByType(scopeName, prefix, type, values.map(({ value }) => value)) ];
  });
}
function parameterValueToRuleByType(scopeName: ScopeName, prefix: string | undefined, type: string | undefined, values: string[]): Rule {
  const prefixPattern = prefixToPattern(prefix);
  const decimalPattern = numbers1();
  const numberPattern = seq(
    decimalPattern,
    optseq(
      char('.'),
      numbers0(),
    ),
  );
  const hexPattern = seq(
    optional(ignoreCase('0x')),
    groupMany1('[0-9a-fA-F]'),
  );

  if (type === 'letter') {
    return {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
      match: seq(
        ...(prefixPattern ? [ optional(prefixPattern) ] : []),
        ignoreCase(ordalt(...values)),
      ),
    };
  }

  return {
    name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
    match: seq(
      lookbehind(alt(
        inlineSpace(),
        char(','),
      )),
      ...(prefixPattern ? [ optional(prefixPattern) ] : []),
      ignoreCase(ordalt(...values)),
      ((): string => {
        switch (type) {
          case 'word': return wordChars0();
          case 'string': return negChars0(inlineSpace());
          case 'number': return numberPattern;
          case 'signed-number': return seq(
            char('+', '-'),
            numberPattern,
          );
          case 'decimal': return numbers1();
          case 'hex': return hexPattern;
          case 'range': return optseq(
            numberPattern,
            optseq(
              char('-'),
              optional(numberPattern),
            ),
          );
          case 'size': return optseq(
            numberPattern,
            optseq(
              char('x'),
              optional(numberPattern),
            ),
          );
          case 'color': return alt(
            // https://www.autohotkey.com/docs/v1/lib/Progress.htm#colors
            ignoreCase(ordalt(
              'Black',
              'Silver',
              'Gray',
              'White',
              'Maroon',
              'Red',
              'Purple',
              'Fuchsia',
              'Green',
              'Lime',
              'Olive',
              'Yellow',
              'Navy',
              'Blue',
              'Teal',
              'Aqua',
            )),
            ignoreCase('Default'),
            hexPattern,
          );
          default: return '';
        }
      })(),
      lookahead(alt(
        inlineSpace(),
        char(','),
        endAnchor(),
      )),
    ),
  };
}
function prefixToPattern(prefix?: string): string {
  switch (prefix) {
    case 'flag': return char('+', '-');
    default: break;
  }
  return '';
}
// #endregion helpers

