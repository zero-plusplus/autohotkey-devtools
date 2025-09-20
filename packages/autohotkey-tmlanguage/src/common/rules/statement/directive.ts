import type { CommandDefinition } from '../../../definition';
import {
  alt,
  anyChars0,
  capture,
  char,
  ignoreCase,
  inlineSpaces0,
  lookahead,
  lookbehind,
  negativeLookahead,
  negativeLookbehind,
  optional,
  ordalt,
  seq,
  textalt,
  wordChar,
} from '../../../oniguruma';
import {
  includeRule,
  patternsRule,
  Repository,
  type BeginWhileRule,
} from '../../../tmlanguage';

interface Placeholder_DirectiveStatementRule {
  startPattern: string;
  endPattern: string;
  assignmentOperators: readonly string[];
}
export function createDirectiveStatementRule(definitions: CommandDefinition[], placeholder: Placeholder_DirectiveStatementRule): BeginWhileRule {
  const capturedDirectiveStatementPattern = capture(seq(
    negativeLookbehind(seq(char('('), inlineSpaces0())),   // Disable within parentheses expression
    lookbehind(placeholder.startPattern),
    inlineSpaces0(),
    ignoreCase(ordalt(...definitions.map((definition) => definition.name))),
    negativeLookahead(alt(
      char('(', '[', wordChar()),
      seq(inlineSpaces0(), textalt(...placeholder.assignmentOperators)),
    )),
    optional(anyChars0()),
    lookahead(placeholder.endPattern),
  ));
  return {
    begin: capturedDirectiveStatementPattern,
    beginCaptures: {
      1: patternsRule(includeRule(Repository.DirectiveDefinitions)),
    },
    while: capturedDirectiveStatementPattern,
    whileCaptures: {
      1: patternsRule(includeRule(Repository.DirectiveDefinitions)),
    },
    patterns: [ includeRule(Repository.Trivias) ],
  };
}
