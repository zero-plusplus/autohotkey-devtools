import { RuleName } from '../../../constants';
import type { CommandDefinition, PatternsRule, ScopeName } from '../../../types';
import { patternsRule } from '../../../utils';
import { createDirectiveCommentRule } from '../statement/command';

interface Placeholder {
  startAnchor: string;
  endAnchor: string;
  definitions: CommandDefinition[];
}
export function createDirectiveCommentPatternsRule(scopeName: ScopeName, placeholder: Placeholder): PatternsRule {
  return patternsRule(...placeholder.definitions.sort((a, b) => b.name.length - a.name.length).flatMap((definition) => {
    return [
      ...definition.signatures.map((signature) => createDirectiveCommentRule(scopeName, definition, signature, {
        commandElementName: RuleName.DirectiveCommentName,
        startAnchor: placeholder.startAnchor,
        endAnchor: placeholder.endAnchor,
      })),
    ];
  }));
}
