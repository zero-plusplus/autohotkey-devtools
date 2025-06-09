import type { CommandDefinition } from '../../../definition';
import { alt, char, inlineSpaces0, inlineSpaces1, seq } from '../../../oniguruma';
import { RuleName, type BeginWhileRule, type ScopeName } from '../../../tmlanguage';
import { createMultiLineCommandLikeStatementRule } from './command';

interface Placholder_DirectiveStatementRule {
  startAnchor: string;
  endAnchor: string;
  allowFirstComma: boolean;
}
export function createDirectiveStatementRule(scopeName: ScopeName, definitions: CommandDefinition[], placeholder: Placholder_DirectiveStatementRule): BeginWhileRule {
  return createMultiLineCommandLikeStatementRule(scopeName, definitions, {
    startAnchor: placeholder.startAnchor,
    endAnchor: placeholder.endAnchor,
    allowFirstComma: placeholder.allowFirstComma,
    commandElementName: RuleName.DirectiveName,
    argumentStartPattern: alt(
      inlineSpaces1(),
      seq(inlineSpaces0(), char(',')),
    ),
  });
}
