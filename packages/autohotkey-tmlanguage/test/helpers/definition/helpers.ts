import { times } from '@zero-plusplus/utilities/src';
import { name, RuleName, StyleName, type ElementName, type ScopeName } from '../../../src/tmlanguage';
import type { ExpectedTestData, ParsedResult } from '../../types';

const indent = '    ';
const commentColumn = 150;

// #region command
export interface SubCommandInfo {
  index: number;
  name: string;
  elementName?: ElementName | ElementName[];
  invalid?: boolean;
}
export interface CommandPlaceholder {
  name: string;
  elementName?: ElementName | ElementName[];
  deprecated?: boolean;
  removed?: boolean;
  index: number;
  isLastParameter?: boolean;
  subcommand?: SubCommandInfo | SubCommandInfo[];
}

export function createCommentTextByCommandPlaceholder(placeholder: CommandPlaceholder): string {
  const text = `; name: ${placeholder.name}, index: ${placeholder.index}, isLastParameter: ${placeholder.isLastParameter ? 'true' : 'false'}, deprecated: ${placeholder.deprecated ? 'true' : 'false'}`;
  if (placeholder.subcommand) {
    if (Array.isArray(placeholder.subcommand)) {
      return `${text}, subcommand: [ ${placeholder.subcommand.map((subcommand) => `{ name: ${subcommand.name}, index: ${subcommand.index} }`).join(', ')} ]`;
    }
    return `${text}, subcommand: { name: ${placeholder.subcommand.name}, index: ${placeholder.subcommand.index} }`;
  }
  return text;
}
export function createCommandPreParamsText(placeholder: CommandPlaceholder): string {
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
export function createCommandPreParamsParsedResults(scopeName: ScopeName, placeholder: CommandPlaceholder): ParsedResult[] {
  const subcommands = Array.isArray(placeholder.subcommand) ? placeholder.subcommand : [ placeholder.subcommand ];

  const preParamsParsedResults: ParsedResult[] = [];
  times(placeholder.index + 1, (i) => {
    const subcommand = subcommands.find((subcommand) => {
      return i === subcommand?.index;
    });

    if (subcommand) {
      if (subcommand.invalid) {
        preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });
        preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) });
        return;
      }

      preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });
      if (subcommand.elementName === undefined) {
        preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, RuleName.SubCommandName) });
      }
      else {
        preParamsParsedResults.push({ text: subcommand.name, scopes: name(scopeName, ...Array.isArray(subcommand.elementName) ? subcommand.elementName : [ subcommand.elementName ]) });
      }
    }
    else {
      preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.Comma) });
    }
  });

  const isInvalidSubCommand = Boolean(subcommands.findLast((subcommand) => subcommand?.invalid));
  if (isInvalidSubCommand) {
    preParamsParsedResults.pop();
    preParamsParsedResults.push({ text: ',', scopes: name(scopeName, RuleName.UnquotedString, StyleName.Invalid) });
  }
  return preParamsParsedResults;
}
export function createCommandExpectedData(scopeName: ScopeName, paramText: string, paramParsedResults: ParsedResult[], placeholder: CommandPlaceholder): ExpectedTestData {
  const commentText = createCommentTextByCommandPlaceholder(placeholder);

  const preParamsText: string = createCommandPreParamsText(placeholder);
  const preParamsParsedResults = createCommandPreParamsParsedResults(scopeName, placeholder);

  const testText = `${placeholder.name}${preParamsText}${paramText}`;
  const commentIndentSize = commentColumn - testText.length;
  const commentIndent = ' '.repeat(commentIndentSize);

  return [
    `${testText}${commentIndent}${commentText}`,
    [
      {
        text: placeholder.name,
        scopes: ((): ElementName => {
          const elementNames: ElementName[] = placeholder.elementName
            ? [ ...(Array.isArray(placeholder.elementName) ? placeholder.elementName : [ placeholder.elementName ]) ]
            : [ RuleName.CommandName ];

          if (placeholder.removed) {
            elementNames.push(StyleName.Invalid, StyleName.Strikethrough);
          }
          else if (placeholder.deprecated) {
            elementNames.push(StyleName.Strikethrough);
          }
          return name(scopeName, ...elementNames);
        })(),
      },
      ...preParamsParsedResults,
      ...paramParsedResults,
      { text: commentText, scopes: name(scopeName, RuleName.InlineComment) },
    ],
  ];
}
// #endregion command

export function createSingleLineExpectedData(scopeName: ScopeName, text: string, results: ParsedResult[], indentCount = 0): ExpectedTestData {
  const commentIndentSize = commentColumn - text.length;
  return [
    `${indent.repeat(indentCount)}${text}${' '.repeat(commentIndentSize)}; ${text}`,
    [
      ...results,
      { text: `; ${text}`, scopes: name(scopeName, RuleName.InlineComment) },
    ],
  ];
}
export function createMultiLineExpectedData(scopeName: ScopeName, expectedList: ExpectedTestData[]): ExpectedTestData[] {
  return expectedList.map((expected) => createSingleLineExpectedData(scopeName, ...expected));
}
