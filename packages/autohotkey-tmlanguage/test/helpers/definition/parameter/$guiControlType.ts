import type { ScopeName } from '../../../../src/tmlanguage.ts';
import type { ExpectedTestData } from '../../../types.ts';
import type { CommandPlaceholder } from '../helpers.ts';
import { $shouldKeyword } from './$shouldKeyword.ts';

export function $guiControlType(scopeName: ScopeName, placeholder: CommandPlaceholder): ExpectedTestData[] {
  return [
    ...$shouldKeyword(scopeName, [
      'ActiveX',
      'Button',
      'CheckBox',
      'ComboBox',
      'Custom',
      'DateTime',
      'DropDownList',
      'DDL',
      'Edit',
      'GroupBox',
      'Hotkey',
      'Link',
      'ListBox',
      'ListView',
      'MonthCal',
      'Picture',
      'Pic',
      'Progress',
      'Radio',
      'Slider',
      'StatusBar',
      'Tab',
      'Tab2',
      'Tab3',
      'Text',
      'TreeView',
      'UpDown',
    ], placeholder),
  ];
}
