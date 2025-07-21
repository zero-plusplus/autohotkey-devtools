import type { CommandDefinition } from '../../../definition';
import {
  alt,
  char,
  inlineSpaces0,
  inlineSpaces1,
  seq,
} from '../../../oniguruma';
import {
  RuleName,
  type BeginWhileRule,
  type ScopeName,
} from '../../../tmlanguage';
import { createMultiLineCommandLikeStatementRule } from './command';

interface Placholder_DirectiveStatementRule {
  startPattern: string;
  endPattern: string;
  allowFirstComma: boolean;
}
export function createDirectiveStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placholder_DirectiveStatementRule): BeginWhileRule {
  return createMultiLineCommandLikeStatementRule(scopeName, definitions, {
    startPattern: placeholder.startPattern,
    endPattern: placeholder.endPattern,
    allowFirstComma: placeholder.allowFirstComma,
    commandElementName: RuleName.DirectiveName,
    allowContinuation: false,
    argumentStartPattern: alt(
      inlineSpaces1(),
      seq(inlineSpaces0(), char(',')),
    ),
  });
}
