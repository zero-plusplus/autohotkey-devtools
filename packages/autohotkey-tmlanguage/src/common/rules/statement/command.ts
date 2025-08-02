import { hasFlag } from '@zero-plusplus/utilities/src';
import {
  CommandFlag,
  CommandParameterFlag,
  keywordOption,
  type CommandDefinition,
  type CommandParameter,
  type CommandSignature,
  type ParameterItemMatcher,
} from '../../../definition';
import {
  alt,
  anyChars0,
  capture,
  char,
  chars1,
  endAnchor,
  group,
  groupMany0,
  groupMany1,
  ignoreCase,
  inlineSpace,
  inlineSpaces0,
  inlineSpaces1,
  keyword,
  lookahead,
  lookbehind,
  negativeLookahead,
  negativeLookbehind,
  negChar,
  negChars0,
  negChars1,
  numbers1,
  optional,
  optseq,
  reluctant,
  seq,
  text,
  textalt,
  wordBound,
  wordChar,
  wordChars1,
} from '../../../oniguruma';
import {
  includeRule,
  name,
  nameRule,
  patternsRule,
  Repository,
  RuleName,
  StyleName,
  type BeginWhileRule,
  type Captures,
  type ElementName,
  type MatchRule,
  type PatternsRule,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';
import * as constants_common from '../../constants';
import * as patterns_common from '../../patterns';

interface Placeholder_CommandStatementRule {
  startPattern: string;
  endPattern: string;
  commandElementName: ElementName;
  expressionOperators: readonly string[];
}
export function createCommandStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_CommandStatementRule): BeginWhileRule {
  return createMultiLineCommandLikeStatementRule(scopeName, definitions, {
    startPattern: placeholder.startPattern,
    endPattern: placeholder.endPattern,
    commandElementName: placeholder.commandElementName,
    legacyMode: true,
    allowContinuation: true,
    argumentStartPattern: alt(
      seq(inlineSpaces0(), negativeLookahead(textalt(...placeholder.expressionOperators))),
      inlineSpaces1(),
      seq(inlineSpaces0(), char(',')),
    ),
  });
}

interface Placeholder_MultiLineCommandLikeStatementRule {
  startPattern: string;
  endPattern: string;
  commandElementName: ElementName;
  argumentStartPattern: string;
  legacyMode: boolean;
  allowContinuation: boolean;
}
export function createMultiLineCommandLikeStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_MultiLineCommandLikeStatementRule): BeginWhileRule {
  const sortedDefinitions = definitions.sort((a, b) => b.name.length - a.name.length);

  return {
    begin: capture(seq(
      negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      ignoreCase(alt(...sortedDefinitions.map((definition) => definition.name))),
      negativeLookahead(alt(char('(', '['), wordChar())),
      lookahead(placeholder.argumentStartPattern),
      optional(anyChars0()),
      lookahead(placeholder.endPattern),
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
      lookbehind(placeholder.startPattern),
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
      lookahead(placeholder.endPattern),
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
  startPattern: string;
  endPattern: string;
  commandElementName: ElementName;
  legacyMode: boolean;
}
export function createSingleLineCommandLikeStatementRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder_SingleLineCommandLikeStatementRule): Rule {
  return {
    begin: lookahead(seq(
      lookbehind(placeholder.startPattern),
      inlineSpaces0(),
      ignoreCase(definition.name),
      negativeLookahead(char('(')),
      lookaheadOnigurumaByParameters(signature.parameters),
    )),
    end: seq(
      // command name
      seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(ignoreCase(definition.name)),
        negativeLookahead(char('(')),
      ),

      // arguments
      ...(0 < signature.parameters.length
        ? [
          reluctant(optional(signature.parameters.reduceRight<string>((prev, parameter, i, parameters) => {
            const isLastParameter = parameters.length - 1 === i;

            const capturedCommaSeparator = placeholder.legacyMode
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
      lookahead(placeholder.endPattern),
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
        const isLastParameter = parameters.length - 1 === i;

        return [
          (!placeholder.legacyMode && i === 0)
            ? nameRule(scopeName, RuleName.Comma, StyleName.Invalid)
            : patternsRule(includeRule(Repository.Comma)),
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, {
            startPattern: placeholder.startPattern,
            legacyMode: placeholder.legacyMode,
          }),
        ];
      }),

      patternsRule(includeRule(Repository.Comma)),
      placeholder.legacyMode
        ? patternsRule(includeRule(Repository.Comma))
        : nameRule(scopeName, RuleName.Comma, StyleName.Invalid),
    ].map((rule, i) => [ i + 1, rule ])),
  };
}

interface Placeholder_DirectiveCommentRule {
  startPattern: string;
  endPattern: string;
  commandElementName: ElementName;
}
export function createDirectiveCommentRule(scopeName: ScopeName, definition: CommandDefinition, signature: CommandSignature, placeholder: Placeholder_DirectiveCommentRule): Rule {
  return {
    match: seq(
      // command name
      seq(
        lookbehind(placeholder.startPattern),
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
      lookahead(placeholder.endPattern),
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
          parameterToPatternsRule(scopeName, definition, parameter, isLastParameter, {
            startPattern: placeholder.startPattern,
            legacyMode: true,
          }),
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
        3: patternsRule(includeRule(Repository.CommandArgumentClick)),
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
export function createClickCommandArgumentRule(scopeName: ScopeName): PatternsRule {
  return patternsRule(
    includeRule(Repository.DereferenceUnaryOperator),
    includeRule(Repository.Dereference),
    ...itemPatternToRules(scopeName, keywordOption('Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D', 'Relative')),
    {
      name: name(scopeName, RuleName.Integer),
      match: numbers1(),
    },
    {
      name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid),
      match: negChars1('0-9', '%', inlineSpace()),
    },
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
        const subcommandPattern = parameterToSubCommandPattern(parameter);
        if (hasFlag(parameter.flags, CommandParameterFlag.GuiLabeled)) {
          return seq(
            labelPattern,
            inlineSpaces0(),
            subcommandPattern,
          );
        }
        return subcommandPattern;
      }
      else if (hasFlag(parameter.flags, CommandParameterFlag.GuiLabeled)) {
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
function parameterToPatternsRule(scopeName: ScopeName, definition: CommandDefinition, parameter: CommandParameter, isLastParameter: boolean, placeholder: { startPattern: string; legacyMode: boolean }): PatternsRule {
  const legacyRules = ((): Rule[] => {
    if (!placeholder.legacyMode) {
      return [];
    }

    if (hasFlag(parameter.flags, CommandParameterFlag.RestParams)) {
      return [ includeRule(Repository.PercentExpression) ];
    }
    return [ includeRule(isLastParameter ? Repository.PercentExpressionInLastArgument : Repository.PercentExpression) ];
  })();

  return patternsRule(
    // percent expression
    ...((): Rule[] => {
      if (!hasFlag(parameter.flags, CommandParameterFlag.Blank)) {
        return [ ...legacyRules ];
      }
      return [];
    })(),

    // comma
    ...((): Rule[] => {
      if (hasFlag(parameter.flags, CommandParameterFlag.RestParams) || hasFlag(parameter.flags, CommandParameterFlag.Expression)) {
        return [ includeRule(Repository.Comma) ];
      }
      if (isLastParameter && hasFlag(parameter.flags, CommandParameterFlag.Blank)) {
        return [ { name: name(scopeName, RuleName.UnquotedString, StyleName.Invalid), match: textalt('`,', ',') } ];
      }
      if (isLastParameter && !hasFlag(parameter.flags, CommandParameterFlag.ExclusiveKeyword)) {
        return [
          { name: name(scopeName, RuleName.UnquotedString, StyleName.Escape), match: text('`,') },
          { name: name(scopeName, RuleName.UnquotedString), match: seq(char(',')) },
        ];
      }
      return [];
    })(),

    // gui label
    ...((): Rule[] => {
      if (hasFlag(parameter.flags, CommandParameterFlag.GuiLabeled)) {
        // e.g. `Gui, GuiName:+Resize`
        //            ^^^^^^^^
        return [
          {
            match: seq(
              lookbehind(seq(
                lookbehind(placeholder.startPattern),
                inlineSpaces0(),
                ignoreCase(definition.name),
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
        ];
      }
      return [];
    })(),

    // unique highlights
    ...((): Rule[] => {
      if (parameter.itemMatchers && 0 < parameter.itemMatchers.length) {
        return itemPatternsToRules(scopeName, parameter.itemMatchers);
      }
      return [];
    })(),
  );
}
function itemPatternsToRules(scopeName: ScopeName, itemPatterns: ParameterItemMatcher[]): Rule[] {
  return itemPatterns.flatMap((itemPattern) => itemPatternToRules(scopeName, itemPattern));
}
function itemPatternToRules(scopeName: ScopeName, itemPattern: ParameterItemMatcher): Rule[] {
  if (Array.isArray(itemPattern)) {
    return itemPatternsToRules(scopeName, itemPattern);
  }

  if (typeof itemPattern === 'string') {
    return [
      {
        name: name(scopeName, RuleName.UnquotedString, StyleName.Strong),
        match: ignoreCase(itemPattern),
      },
    ];
  }
  if ('include' in itemPattern) {
    return [ itemPattern ];
  }
  if ('name' in itemPattern && !('captures' in itemPattern)) {
    if (itemPattern.match === undefined) {
      return [ { name: name(scopeName, ...Array.isArray(itemPattern.name) ? itemPattern.name : [ itemPattern.name ]) } ];
    }
    return [
      {
        name: name(scopeName, ...Array.isArray(itemPattern.name) ? itemPattern.name : [ itemPattern.name ]),
        match: itemPattern.match,
      },
    ];
  }
  return [
    {
      name: 'name' in itemPattern ? name(scopeName, ...Array.isArray(itemPattern.name) ? itemPattern.name : [ itemPattern.name ]) : undefined,
      match: itemPattern.match,
      captures: Object.fromEntries(Object.entries(itemPattern.captures).map(([ index, matchers ]) => {
        const rules = matchers.flatMap((matcher): Rule[] => {
          return itemPatternsToRules(scopeName, Array.isArray(matcher) ? matcher : [ matcher ]);
        });

        const isNameRule = rules.length === 1 && typeof rules[0] === 'object' && 'name' in rules[0];
        return [
          Number(index),
          isNameRule ? rules[0] : patternsRule(...rules),
        ];
      })) as unknown as Captures,
    },
  ];
}
function parameterToSubCommandPattern(parameter: CommandParameter): string {
  if (parameter.itemMatchers?.length === undefined) {
    throw Error('');
  }
  const matcher = parameter.itemMatchers[0];
  if (typeof matcher !== 'object' || !('match' in matcher)) {
    throw Error('');
  }
  return matcher.match;
}
// #endregion helpers
