import { name, RuleName, type ScopeName } from '../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../types';

export interface Placeholder {
  name: string;
  index: number;
  isLastParameter?: boolean;
  subcommand?: {
    index: string;
    name: string | string[];
  };
}

export function createExpectedData(scopeName: ScopeName, paramText: string, paramParsedResults: ParsedResult[], placeholder: Placeholder): ExpectedTestData {
  const commentText = `; name: ${placeholder.name}, index: ${placeholder.index}, isLastParameter: ${placeholder.isLastParameter ? 'true' : 'false'}`;

  const testText = `${placeholder.name}${','.repeat(placeholder.index)} ${paramText}`;
  const commentColumn = 150;
  const commentIndentSize = commentColumn - testText.length;
  const commentIndent = ' '.repeat(commentIndentSize);
  return [
    `${placeholder.name}${','.repeat(placeholder.index)} ${paramText}${commentIndent}${commentText}`,
    [
      { text: placeholder.name, scopes: name(scopeName, RuleName.CommandName) },
      ...0 < placeholder.index ? [ { text: ',', scopes: name(scopeName, RuleName.Comma) } ] : [],
      ...paramParsedResults,
      { text: commentText, scopes: name(scopeName, RuleName.InlineComment) },
    ],
  ];
}
