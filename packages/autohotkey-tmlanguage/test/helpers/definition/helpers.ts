import { times } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ElementName, type ScopeName } from '../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../types';

export interface SubCommand {
  index: number;
  name: string;
  elementName?: ElementName;
  invalid?: boolean;
}
export interface Placeholder {
  name: string;
  index: number;
  isLastParameter?: boolean;
  subcommand?: SubCommand | SubCommand[];
}

export function createCommentText(placeholder: Placeholder): string {
  const text = `; name: ${placeholder.name}, index: ${placeholder.index}, isLastParameter: ${placeholder.isLastParameter ? 'true' : 'false'}`;
  if (placeholder.subcommand) {
    if (Array.isArray(placeholder.subcommand)) {
      return `${text}, subcommand: [ ${placeholder.subcommand.map((subcommand) => `{ name: ${subcommand.name}, index: ${subcommand.index} }`).join(', ')} ]`;
    }
    return `${text}, subcommand: { name: ${placeholder.subcommand.name}, index: ${placeholder.subcommand.index} }`;
  }
  return text;
}
export function createPreParamsText(placeholder: Placeholder): string {
  let preParamsText: string = '';
  times(placeholder.index + 1, (i) => {
    const subcommands = Array.isArray(placeholder.subcommand) ? placeholder.subcommand : [ placeholder.subcommand ];
    const subcommand = subcommands.find((subcommand) => {
      return i === subcommand?.index;
    });

    preParamsText += ', ';

    if (subcommand) {
      preParamsText += subcommand.name;
    }
  });
  return preParamsText;
}
export function createPreParamsParsedResults(scopeName: ScopeName, placeholder: Placeholder): ParsedResult[] {
  const preParamsParsedResults: ParsedResult[] = [];
  times(placeholder.index + 1, (i) => {
    const subcommands = Array.isArray(placeholder.subcommand) ? placeholder.subcommand : [ placeholder.subcommand ];
    const subcommand = subcommands.find((subcommand) => {
      return i === subcommand?.index;
    });


    if (subcommand) {
      if (subcommand.invalid) {
        preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) });
        preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) });
        return;
      }

      preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });
      preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, subcommand.elementName ?? RuleName.SubCommandName) });
      return;
    }

    preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });
  });
  return preParamsParsedResults;
}
export function createExpectedData(scopeName: ScopeName, paramText: string, paramParsedResults: ParsedResult[], placeholder: Placeholder): ExpectedTestData {
  const commentText = createCommentText(placeholder);

  const preParamsText: string = createPreParamsText(placeholder);
  const preParamsParsedResults = createPreParamsParsedResults(scopeName, placeholder);

  const testText = `${placeholder.name}${preParamsText}${paramText}`;
  const commentColumn = 150;
  const commentIndentSize = commentColumn - testText.length;
  const commentIndent = ' '.repeat(commentIndentSize);

  return [
    `${testText}${commentIndent}${commentText}`,
    [
      { text: placeholder.name, scopes: name(scopeName, RuleName.CommandName) },
      ...preParamsParsedResults,
      ...paramParsedResults,
      { text: commentText, scopes: name(scopeName, RuleName.InlineComment) },
    ],
  ];
}
