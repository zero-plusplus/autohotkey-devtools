import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import { createDereferenceInUnquotedParameterExpectedDataList } from '../common/dereference';
import { createPercentExpressionParameterExpectedDataList } from '../common/percentExpression';
import type { Placeholder } from '../helpers';
import { flagedIdentifierOption } from '../option/flagedIdentifierOption';
import { flagedKeywordOption } from '../option/flagedKeywordOption';
import { flagedSizeOption } from '../option/flagedSizeOption';
import { flagedStringOption } from '../option/flagedStringOption';

export function $guiOptions(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
  return [
    ...flagedKeywordOption(scopeName, [ 'AlwaysOnTop', 'Border', 'Caption', 'DelimiterSpace', 'DelimiterTab', 'Disabled', 'DPIScale', 'LastFoundExist', 'MaximizeBox', 'MinimizeBox', 'OwnDialogs', 'Owner', 'Parent', 'Resize', 'SysMenu', 'Theme', 'ToolWindow' ], placeholder),
    ...flagedStringOption(scopeName, [ 'Delimiter' ], placeholder),
    ...flagedIdentifierOption(scopeName, [ 'Hwnd', 'Label', 'LastFound' ], placeholder),
    ...flagedSizeOption(scopeName, [ 'MinSize', 'MaxSize' ], placeholder),
    ...createPercentExpressionParameterExpectedDataList(scopeName, placeholder),
    ...createDereferenceInUnquotedParameterExpectedDataList(scopeName, placeholder),
  ];
}
