import { hasFlag } from '@zero-plusplus/utilities/src';
import { CommandFlag, HighlightType, Repository, RuleName, StyleName } from '../../../constants';
import { alt, anyChars0, anyChars1, capture, char, endAnchor, group, groupMany0, groupMany1, ignoreCase, inlineSpace, inlineSpaces0, inlineSpaces1, keyword, lookahead, lookbehind, negativeLookahead, negChars0, numbers0, numbers1, optional, optseq, ordalt, seq, startAnchor, text, wordBound, wordChars0 } from '../../../oniguruma';
import type { BeginWhileRule, CommandDefinition, CommandParameter, CommandSignature, ElementName, MatchRule, NameRule, PatternsRule, Rule, ScopeName } from '../../../types';
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
      definitionToCommandName(scopeName, definition, placeholder),
      ...parametersToRules(scopeName, signature, placeholder),
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
export function parseParameterValue(value: string): { type: string; value: string } {
  const match = value.match(/<(?<type>[a-zA-Z_]+)>(?<value>.*)/);
  if (match?.groups?.['type'] === undefined || match.groups['value'] === undefined) {
    return { type: '', value };
  }
  return { type: match.groups['type'], value: match.groups['value'] };
}

function definitionToCommandName(scopeName: ScopeName, definition: CommandDefinition, placeholder: Placeholder): NameRule {
  if (hasFlag(definition.flags, CommandFlag.Deprecated)) {
    return nameRule(scopeName, placeholder.commandElementName, StyleName.Strikethrough);
  }
  return nameRule(scopeName, placeholder.commandElementName);
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
        case HighlightType.FlowSubCommand:
        case HighlightType.GuiSubCommand: {
          if (parameter.values && 0 < parameter.values.length) {
            return ignoreCase(ordalt(...parameter.values));
          }
          break;
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
      inlineSpaces0(),
      capture(parameterToOniguruma(parameter, isLastParameter, placeholder)),
      prev !== '' ? optional(prev) : '',
    );
  }, '');
}
function parameterToOniguruma(parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): string {
  switch (parameter.type) {
    case HighlightType.SubCommand:
    case HighlightType.FlowSubCommand:
    case HighlightType.GuiSubCommand: {
      if (parameter.values && 0 < parameter.values.length) {
        return ignoreCase(ordalt(...parameter.values));
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
function parametersToRules(scopeName: ScopeName, signature: CommandSignature, placeholder: Placeholder): PatternsRule[] {
  return signature.parameters.flatMap((parameter, i, parameters) => {
    const isLastParameter = parameters.length - 1 === i;
    return [ patternsRule(includeRule(Repository.Comma)), parameterToRule(scopeName, parameter, isLastParameter, placeholder) ];
  });
}
function parameterToRule(scopeName: ScopeName, parameter: CommandParameter, isLastParameter: boolean, placeholder: Placeholder): PatternsRule {
  const defaultArgumentRule = isLastParameter ? includeRule(Repository.CommandLastArgument) : includeRule(Repository.CommandArgument);
  const invalidRule: MatchRule = { name: name(scopeName, StyleName.Invalid), match: anyChars1() };

  switch (parameter.type) {
    case HighlightType.None:
    case HighlightType.Invalid: return patternsRule(invalidRule);
    case HighlightType.Blank: return patternsRule({
      name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
      match: anyChars1(),
    });
    case HighlightType.SubCommand:
    case HighlightType.FlowSubCommand:
    case HighlightType.GuiSubCommand: {
      if (!parameter.values || parameter.values.length === 0) {
        return patternsRule(defaultArgumentRule);
      }

      if (parameter.type === HighlightType.SubCommand) {
        return patternsRule(
          {
            name: name(scopeName, RuleName.SubCommandName),
            match: ignoreCase(ordalt(...parameter.values)),
          },

          defaultArgumentRule,
        );
      }
      if (parameter.type === HighlightType.FlowSubCommand) {
        return patternsRule(
          {
            name: name(scopeName, RuleName.FlowSubCommandName),
            match: ignoreCase(ordalt(...parameter.values)),
          },

          defaultArgumentRule,
        );
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
            2: nameRule(scopeName, RuleName.SemiColon),
            3: nameRule(scopeName, placeholder.commandElementName),
          },
        },
        defaultArgumentRule,
      );
    }
    case HighlightType.UnquotedString:
    case HighlightType.Enum:
    case HighlightType.Options: {
      return patternsRule(
        ...parameterValuesToRule(scopeName, parameter.values),
        defaultArgumentRule,
      );
    }
    case HighlightType.CombiOptions:
    case HighlightType.GuiOptions:
    case HighlightType.Style:
      return patternsRule(
        ...parameterValuesToRule(scopeName, parameter.values),
        defaultArgumentRule,
      );
    case HighlightType.UnquotedStringShouldEscapeComma: return patternsRule(
      includeRule(Repository.Comma),
      includeRule(Repository.CommandArgument),
    );
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
function parameterValuesToRule(scopeName: ScopeName, values: string[] | undefined): Rule[] {
  if (!values) {
    return [];
  }
  return [
    ...Object.entries(Object.groupBy(values, (value): string => {
      const parsedValue = parseParameterValue(value);
      return parsedValue.type;
    })).flatMap(([ type, values ]) => {
      if (!values) {
        return [];
      }
      return parameterValuesToRuleByType(scopeName, type, values.map((value) => parseParameterValue(value).value));
    }),
  ];
}
function parameterValuesToRuleByType(scopeName: ScopeName, type: string, values: string[]): Rule[] {
  const numberPattern = seq(
    numbers1(),
    optseq(
      char('.'),
      numbers0(),
    ),
  );

  const valuesPattern = ignoreCase(ordalt(...values.map((value) => text(value))));
  switch (type) {
    case 'option': return [
      {
        name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
        match: valuesPattern,
      },
    ];
    case 'flag': return [
      {
        name: name(scopeName, StyleName.Strong),
        match: seq(
          optional(capture(char('+', '-'))),
          valuesPattern,
        ),
      },
    ];
    case 'string': return [
      {
        name: name(scopeName, StyleName.Strong),
        match: seq(
          valuesPattern,
          negChars0('\\s'),
        ),
      },
    ];
    case 'range': return [
      {
        name: name(scopeName, StyleName.Strong),
        match: seq(
          numbers0(),
          optseq(
            numberPattern,
            optseq(
              char('-'),
              optional(numberPattern),
            ),
          ),
        ),
      },
    ];
    case 'size': return [
      {
        name: name(scopeName, StyleName.Strong),
        match: seq(
          char('+', '-'),
          valuesPattern,
          seq(
            numberPattern,
            optseq(
              char('x'),
              optional(numberPattern),
            ),
          ),
        ),
      },
    ];
    default: break;
  }
  return [];
}
// #endregion helpers

