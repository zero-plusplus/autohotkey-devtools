import { hasFlag } from '@zero-plusplus/utilities/src';
import { CommandFlag, HighlightType, Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChars0, capture, char, endAnchor, group, groupMany0, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, negChar, negChars0, negChars1, numbers0, numbers1, optional, optseq, ordalt, seq, startAnchor, text, wordBound, wordChars0, wordChars1 } from '../../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandParameter, CommandSignature, ElementName, MatchRule, PatternsRule, Rule, ScopeName } from '../../../types';
import { includeRule, name, nameRule, patternsRule } from '../../../utils';
import * as patterns_v1 from '../../patterns';

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
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      lookahead(alt(
        seq(inlineSpaces1()),
        seq(inlineSpaces0(), char(',')),
      )),
      optional(capture(anyChars0())),
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
      startAnchor(),
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
      ignoreCase(definition.name),
      lookahead(wordBound()),
      negativeLookahead(char('(')),
      lookaheadOnigurumaByParameters(signature.parameters, placeholder),
    )),
    end: seq(
      // command name
      seq(
        lookbehind(placeholder.startAnchor),
        capture(ignoreCase(definition.name)),
        negativeLookahead(char('(')),
      ),

      // arguments
      optional(parametersToOniguruma(signature.parameters, placeholder)),
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
interface ParameterValue {
  prefix: string | undefined;
  suffix: string | undefined;
  value: string;
}
function parseParameterValue(value: string): ParameterValue {
  const match = value.match(/(<(?<prefix>[a-zA-Z_-]+)>)?(?<value>[^<]*)(<(?<suffix>[a-zA-Z_-]+)>)?/);
  return {
    prefix: match?.groups?.['prefix'],
    suffix: match?.groups?.['suffix'],
    value: String(match!.groups!['value']),
  };
}
function lookaheadOnigurumaByParameters(parameters: CommandParameter[], placeholder: Placeholder): string {
  const subcommandArgumentIndex = parameters.findLastIndex((parameter) => {
    if (parameter.type === HighlightType.SubCommand || parameter.type === HighlightType.FlowSubCommand || parameter.type === HighlightType.GuiSubCommand) {
      if (parameter.values && 0 < parameter.values.length) {
        return true;
      }
    }
    return false;
  });
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
        case HighlightType.FlowSubCommand: {
          if (parameter.values && 0 < parameter.values.length) {
            return ignoreCase(ordalt(...parameter.values));
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
              ignoreCase(ordalt(...parameter.values)),
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
function parametersToOniguruma(parameters: CommandParameter[], placeholder: Placeholder): string {
  return parameters.reduceRight<string>((prev, parameter, i, parameters) => {
    const capturedCommaSeparator = seq(inlineSpaces0(), capture(char(',')));
    const capturedFirstSeparator = group(alt(
      capturedCommaSeparator,
      inlineSpaces1(),
    ));
    const separator = i === 0 ? capturedFirstSeparator : capturedCommaSeparator;

    const isLastParameter = parameters.length - 1 === i;
    return seq(
      separator,
      negativeLookahead(seq(inlineSpaces1(), char(';'))),
      inlineSpaces0(),
      capture(parameterToOniguruma(parameter, isLastParameter, placeholder)),
      prev !== '' ? optional(prev) : '',
    );
  }, '');
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): string {
  switch (parameter.type) {
    case HighlightType.SubCommand:
    case HighlightType.FlowSubCommand: {
      if (parameter.values && 0 < parameter.values.length) {
        return ignoreCase(ordalt(...parameter.values));
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
          ignoreCase(ordalt(...parameter.values)),
        );
      }
      break;
    }
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression: return patterns_v1.expressionArgumentPattern;
    default: break;
  }

  if (isLastParameter) {
    if (parameter.type === HighlightType.ExpressionWithOneTrueBrace) {
      return patterns_v1.expressionWithOneTrueBraceArgumentPattern;
    }
    if (parameter.type === HighlightType.UnquotedStringShouldEscapeComma) {
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
    return patterns_v1.lastArgumentPattern;
  }
  return patterns_v1.commandArgumentPattern;
}
function parameterToPatternsRule(scopeName: ScopeName, defenition: CommandDefinition, parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): PatternsRule {
  const defaultArgumentRule = isLastParameter ? includeRule(Repository.CommandLastArgument) : includeRule(Repository.CommandArgument);

  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Invalid:
    case HighlightType.Blank: {
      return patternsRule({
        name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
        match: negChars1('\\s'),
      });
    }
    case HighlightType.SubCommand: {
      if (!parameter.values || parameter.values.length === 0) {
        return patternsRule(defaultArgumentRule);
      }
      return patternsRule({
        name: name(scopeName, RuleName.SubCommandName),
        match: ignoreCase(ordalt(...parameter.values)),
      });
    }
    case HighlightType.FlowSubCommand: {
      if (!parameter.values || parameter.values.length === 0) {
        return patternsRule(defaultArgumentRule);
      }
      return patternsRule({
        name: name(scopeName, RuleName.FlowSubCommandName),
        match: ignoreCase(ordalt(...parameter.values)),
      });
    }
    case HighlightType.GuiSubCommand: {
      if (!parameter.values || parameter.values.length === 0) {
        return patternsRule(defaultArgumentRule);
      }
      return patternsRule(
        {
          match: seq(
            optseq(
              capture(wordChars0()),
              capture(char(':')),
            ),
            capture(ignoreCase(ordalt(...parameter.values))),
          ),
          captures: {
            1: nameRule(scopeName, RuleName.LabelName),
            2: nameRule(scopeName, RuleName.Colon),
            3: nameRule(scopeName, RuleName.SubCommandName),
          },
        },
        {
          name: name(scopeName, RuleName.SubCommandName),
          match: ignoreCase(ordalt(...parameter.values)),
        },
      );
    }
    case HighlightType.BlankOrGuiName: {
      return patternsRule(
        {
          match: seq(
            capture(wordChars0()),
            capture(char(':')),
          ),
          captures: {
            1: nameRule(scopeName, RuleName.LabelName),
            2: nameRule(scopeName, RuleName.Colon),
          },
        },
        {
          name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
          match: seq(
            negChars1('\\s'),
            negativeLookahead(':'),
          ),
        },
      );
    }
    case HighlightType.CombiOptions:
    case HighlightType.FileAttributeCombiOptions:
    case HighlightType.Style:
    case HighlightType.UnquotedString: {
      return patternsRule(defaultArgumentRule);
    }
    case HighlightType.UnquotedOrKeywords: {
      return patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Dereference),
        {
          name: name(scopeName, RuleName.UnquotedString),
          match: capture(seq(
            negChar('%', '\\s'),
            negChars0('\\s'),
          )),
          captures: {
            1: patternsRule(...optionItemsToRules(scopeName, parameter.values)),
          },
        },
      );
    }
    case HighlightType.KeywordOnly:
    case HighlightType.KeywordsOnly:
    case HighlightType.GuiControlOptions: {
      return patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Dereference),
        {
          name: name(scopeName, RuleName.UnquotedString),
          match: capture(seq(
            negChar('%', '\\s'),
            negChars0('\\s'),
          )),
          captures: {
            1: patternsRule(
              ...optionItemsToRules(scopeName, parameter.values),
              {
                name: name(scopeName, StyleName.Invalid),
                match: negChars1('\\s'),
              },
            ),
          },
        },
      );
    }
    case HighlightType.GuiOptions: {
      return patternsRule(
        includeRule(Repository.PercentExpression),
        includeRule(Repository.Dereference),

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
        {
          name: name(scopeName, RuleName.UnquotedString),
          match: capture(seq(
            negChar('%', '\\s'),
            negChars0('\\s'),
          )),
          captures: {
            1: patternsRule(...optionItemsToRules(scopeName, parameter.values)),
          },
        },
      );
    }
    // Make each definition group easily distinguishable by underlining. However, if the underline is applied in TMLanguage, its color cannot be controlled. This should be implemented with semantic highlighting
    // For example, three groups are underlined in the following cases
    // e.g. `WinActivate abc ahk_exe abc.exe ahk_class abc`
    //                   ^^^ ^^^^^^^^^^^^^^^ ^^^^^^^^^^^^^
    // case HighlightType.WinTitle: {
    //   return patternsRule(
    //     includeRule(Repository.PercentExpression),
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
    case HighlightType.UnquotedStringShouldEscapeComma: {
      return patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      );
    }
    case HighlightType.LabelName: return patternsRule(nameRule(scopeName, Repository.CommandArgument, RuleName.LabelName));
    case HighlightType.Input:
    case HighlightType.Output:
    case HighlightType.Expression: return patternsRule(
      includeRule(Repository.PercentExpression),
      includeRule(Repository.Expression),
    );
    default: break;
  }
  throw Error(`Specified an unknown highligh type.\nSpecified: "${String(parameter.type)}"`);
}
function optionItemsToRules(scopeName: ScopeName, optionItems: string[] | undefined): Rule[] {
  return (optionItems ?? [])
    .map((value) => parseParameterValue(value))
    .sort((a, b) => b.value.length - a.value.length)
    .flatMap((parsedValues) => {
      return parameterValuesToRuleByType(scopeName, parsedValues);
    });
}
function parameterValuesToRuleByType(scopeName: ScopeName, parameterValue: ParameterValue): Rule[] {
  const { prefix, suffix } = parameterValue;
  const valuesPattern = ignoreCase(text(parameterValue.value));
  const prefixPattern = prefixToPattern(prefix);
  const suffixPattern = suffixToPattern(suffix);

  return [
    {
      name: name(scopeName, StyleName.Strong),
      match: seq(
        prefixPattern,
        valuesPattern,
        optional(suffixPattern),
      ),
    },
  ];
}
function prefixToPattern(prefix?: string): string {
  switch (prefix) {
    case 'flag': return char('+', '-');
    default: break;
  }
  return '';
}
function suffixToPattern(suffix?: string): string {
  const decimalPattern = numbers1();
  const numberPattern = seq(
    decimalPattern,
    optseq(
      char('.'),
      numbers0(),
    ),
  );
  const hexPattern = groupMany1('[0-9a-fA-F]');

  switch (suffix) {
    case 'keyword': return '';
    case 'word': return wordChars1();
    case 'string': return negChars0('\\s');
    case 'number': return numberPattern;
    case 'decimal': return decimalPattern;
    case 'signed-number': return seq(
      optional(char('+', '-')),
      numberPattern,
    );
    case 'hex': return hexPattern;
    case 'range': return seq(
      numbers0(),
      optseq(
        numberPattern,
        optseq(
          char('-'),
          optional(numberPattern),
        ),
      ),
    );
    case 'size': return seq(
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
    default: break;
  }
  return suffix ?? '';
}
// #endregion helpers

