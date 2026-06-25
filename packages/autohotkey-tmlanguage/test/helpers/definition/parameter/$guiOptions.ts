import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference.ts';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { flagedIdentifierOption } from '../option/flagedIdentifierOption.ts';
import { flagedKeywordOption } from '../option/flagedKeywordOption.ts';
import { flagedSizeOption } from '../option/flagedSizeOption.ts';
import { flagedStringOption } from '../option/flagedStringOption.ts';

export function $guiOptions(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...flagedKeywordOption(scopeName, [ 'AlwaysOnTop', 'Border', 'Caption', 'DelimiterSpace', 'DelimiterTab', 'Disabled', 'DPIScale', 'LastFoundExist', 'MaximizeBox', 'MinimizeBox', 'OwnDialogs', 'Owner', 'Parent', 'Resize', 'SysMenu', 'Theme', 'ToolWindow' ], placeholder),
    ...flagedStringOption(scopeName, [ 'Delimiter' ], placeholder),
    ...flagedIdentifierOption(scopeName, [ 'Hwnd', 'Label', 'LastFound' ], placeholder),
    ...flagedSizeOption(scopeName, [ 'MinSize', 'MaxSize' ], placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}
