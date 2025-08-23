import type { ScopeName } from '../../../../src/tmlanguage';
import type { ExpectedTestData } from '../../../types';
import type { Placeholder } from '../helpers';
import { $shouldKeyword } from './$shouldKeyword';

export function $guiControlType(scopeName: ScopeName, placeholder: Placeholder): ExpectedTestData[] {
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
