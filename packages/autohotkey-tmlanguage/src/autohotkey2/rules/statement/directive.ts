import * as rules_common from '../../../common/rules/index.ts';
import type { CommandDefinition } from '../../../definition.ts';
import {
  anyChars0,
  capture,
  char,
  chars0,
  inlineSpaces0,
  inlineSpaces1,
  lookahead,
  lookbehind,
  negativeLookahead,
  optseq,
  reluctant,
  seq,
  textalt,
} from '../../../oniguruma.ts';
import {
  nameRule,
  patternsRule,
  RuleName,
  StyleName,
  type Rule,
  type ScopeName,
} from '../../../tmlanguage.ts';

interface Placeholder_DirectiveStatementRule {
  startPattern: string;
  endPattern: string;
  assignmentOperators: readonly string[];
}
export function createDirectiveStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placeholder_DirectiveStatementRule): Rule {
  return patternsRule(
    rules_common.createDirectiveStatementRule(definitions, {
      startPattern: placeholder.startPattern,
      endPattern: placeholder.endPattern,
      assignmentOperators: placeholder.assignmentOperators,
    }),

    // Undefined directives
    {
      match: seq(
        lookbehind(placeholder.startPattern),
        inlineSpaces0(),
        capture(seq(
          char('#'),
          chars0('a-z', 'A-Z'),
        )),
        negativeLookahead(seq(
          inlineSpaces0(),
          textalt(...placeholder.assignmentOperators),
        )),
        optseq(
          inlineSpaces1(),
          capture(reluctant(anyChars0())),
        ),
        lookahead(placeholder.endPattern),
      ),
      captures: {
        1: nameRule(scopeName, RuleName.DirectiveName),
        2: nameRule(scopeName, RuleName.UnquotedString, StyleName.Invalid),
      },
    },
  );
}
