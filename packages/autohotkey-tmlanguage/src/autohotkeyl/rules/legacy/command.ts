import * as patterns_common from '../../../common/patterns';
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
} from '../../../oniguruma';
import {
  includeRule,
  patternsRule,
  Repository,
  type Rule,
} from '../../../tmlanguage';

interface Placeholder_CommandStatementRule {
  startPattern: string;
  endPattern: string;
  argumentStartPattern: string;
  assignmentOperators: readonly string[];
}
export function createCommandStatementRule(definitions: CommandDefinition[], placeholder: Placeholder_CommandStatementRule): Rule {
  const capturedCommandStatement = capture(seq(
    negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
    lookbehind(placeholder.startPattern),
    inlineSpaces0(),
    ignoreCase(ordalt(...definitions.map((definition) => definition.name))),
    group(alt(
      seq(
        inlineSpaces1(),
        negativeLookahead(seq(
          inlineSpaces0(),
          textalt(...placeholder.assignmentOperators),
        )),
      ),
      seq(inlineSpaces0(), char(',')),
    )),
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
