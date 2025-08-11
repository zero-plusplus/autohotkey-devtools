import { times } from '@zero-plusplus/utilities/src';
import { name, RuleName, type ElementName, type ScopeName } from '../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../types';

export interface SubCommand {
  index: number;
  name: string;
  elementName?: ElementName;
}
export interface Placeholder {
  name: string;
  index: number;
  isLastParameter?: boolean;
  subcommand?: SubCommand | SubCommand[];
}

export function createExpectedData(scopeName: ScopeName, paramText: string, paramParsedResults: ParsedResult[], placeholder: Placeholder): ExpectedTestData {
  const commentText = ((): string => {
    const text = `; name: ${placeholder.name}, index: ${placeholder.index}, isLastParameter: ${placeholder.isLastParameter ? 'true' : 'false'}`;
    if (placeholder.subcommand) {
      if (Array.isArray(placeholder.subcommand)) {
        return `${text}, subcommand: [ ${placeholder.subcommand.map((subcommand) => `{ name: ${subcommand.name}, index: ${subcommand.index} }`).join(', ')} ]`;
      }
      return `${text}, subcommand: { name: ${placeholder.subcommand.name}, index: ${placeholder.subcommand.index} }`;
    }
    return text;
  })();

  let preParamsText: string = '';
  const preParamsParsedResults: ParsedResult[] = [];
  times(placeholder.index + 1, (i) => {
    // if (i === 0) {
    //   preParamsText += ' ';
    //   return;
    // }

    const subcommands = Array.isArray(placeholder.subcommand) ? placeholder.subcommand : [ placeholder.subcommand ];
    const subcommand = subcommands.find((subcommand) => {
      return i === subcommand?.index;
    });

    preParamsText += ', ';
    preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });

    if (subcommand) {
      preParamsText += subcommand.name;
      preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, subcommand.elementName ?? RuleName.SubCommandName) });
    }
  });

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
