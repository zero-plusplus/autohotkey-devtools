import * as patterns_common from '../../../common/patterns';
import * as rules_common from '../../../common/rules';
import type { CommandDefinition } from '../../../definition';
import {
  alt,
  anyChars0,
  capture,
  char,
  group,
  groupMany0,
  ignoreCase,
  inlineSpaces0,
  inlineSpaces1,
  lookahead,
  lookbehind,
  negativeLookahead,
  negativeLookbehind,
  optcapture,
  optional,
  ordalt,
  reluctant,
  seq,
  textalt,
  wordChar,
} from '../../../oniguruma';
import {
  includeRule,
  patternsRule,
  Repository,
  type ElementName,
  type Repositories,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage';

interface Placeholder_CommandRepositories {
  startPattern: string;
  endPattern: string;
  commandElementName: ElementName;
  expressionOperators: readonly string[];
}
export function createCommandRepositories(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_CommandRepositories): Repositories {
  const convertedPlaceholder = {
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
  };

  return {
    [Repository.CommandStatement]: createCommandStatementRule(definitions, convertedPlaceholder),
    [Repository.CommandDefinitions]: patternsRule(
      includeRule(Repository.Trivias),
      ...rules_common.definitionsToRules(scopeName, definitions, convertedPlaceholder),
    ),
  };
}

interface Placeholder_CommandStatementRule {
  startPattern: string;
  endPattern: string;
  argumentStartPattern: string;
}
function createCommandStatementRule(definitions: CommandDefinition[], placeholder: Placeholder_CommandStatementRule): Rule {
  const capturedCommandStatement = capture(seq(
    negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
    lookbehind(placeholder.startPattern),
    inlineSpaces0(),
    ignoreCase(ordalt(...definitions.map((definition) => definition.name))),
    negativeLookahead(alt(char('(', '['), wordChar())),
    lookahead(placeholder.argumentStartPattern),
    optional(anyChars0()),
    lookahead(placeholder.endPattern),
  ));
  return {
    begin: capturedCommandStatement,
    beginCaptures: {
      1: patternsRule(includeRule(Repository.CommandDefinitions)),
    },
    while: alt(
      capturedCommandStatement,
      group(seq(
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
        optcapture(char(',')),
        inlineSpaces0(),
        lookahead(placeholder.endPattern),
      )),
    ),
    whileCaptures: {
      1: patternsRule(includeRule(Repository.CommandDefinitions)),
      2: patternsRule(
        includeRule(Repository.Comma),
        includeRule(Repository.CommandArgument),
      ),
      3: patternsRule(includeRule(Repository.Comma)),
    },
    patterns: [ includeRule(Repository.Trivias) ],
  };
}
