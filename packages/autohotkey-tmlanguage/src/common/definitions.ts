import { mergeFlags } from '@zero-plusplus/utilities/src';
import {
  command, CommandFlag, CommandParameterFlag, encoding, HighlightType, invalid, keywordOnly, optionItem,
  output, signature, unquotedNumber, unquotedWithNumber,
  type CommandDefinition, type CommandParameter,
} from '../definition';
import { seq, wordChars0 } from '../oniguruma';

export const undefinedDirective: CommandDefinition = command(seq('#', wordChars0()), signature([ invalid() ]));
export const compilerDirectives: CommandDefinition[] = [
  command('@Ahk2Exe', signature([])),
  command('@Ahk2Exe-IgnoreBegin', signature([])),
  command('@Ahk2Exe-IgnoreEnd', signature([])),

  // [AddResource](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#AddResource)
  command('@Ahk2Exe-AddResource', signature([ fileName(), unquoted() ])),

  // [Bin/Base](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Bin)
  command('@Ahk2Exe-Bin', signature([ unquoted(), unquoted(), encoding() ]), CommandFlag.Deprecated),
  command('@Ahk2Exe-Base', signature([ unquoted(), unquoted(), encoding() ])),

  // [ConsoleApp](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#ConsoleApp)
  command('@Ahk2Exe-ConsoleApp', signature([])),

  // [Cont](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Cont)
  command('@Ahk2Exe-Cont', signature([ unquoted() ])),

  // [Debug](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Debug)
  command('@Ahk2Exe-Debug', signature([ unquoted() ])),

  // [ExeName](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#ExeName)
  command('@Ahk2Exe-ExeName', signature([ unquoted() ])),

  // [Let](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Let)
  command('@Ahk2Exe-Let', signature([ expression() ])),

  // [Nop](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Nop)
  command('@Ahk2Exe-Nop', signature([])),

  // [Obey](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Obey)
  command('@Ahk2Exe-Obey', signature([ output(), expression(), unquotedNumber() ])),

  // [PostExec](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#PostExec)
  command('@Ahk2Exe-PostExec', signature([ unquoted(), keywordOnly([ optionItem('0', '1', '2') ]), unquoted(), on(), on() ])),

  // [ResourceID](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#ResourceID)
  command('@Ahk2Exe-ResourceID', signature([ unquoted() ])),

  // [SetMainIcon](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#SetMainIcon)
  command('@Ahk2Exe-SetMainIcon', signature([ unquoted() ])),

  // [SetProp](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#SetProp)
  command('@Ahk2Exe-SetCompanyName', signature([ unquoted() ])),
  command('@Ahk2Exe-SetCopyright', signature([ unquoted() ])),
  command('@Ahk2Exe-SetDescription', signature([ unquoted() ])),
  command('@Ahk2Exe-SetFileVersion', signature([ unquoted() ])),
  command('@Ahk2Exe-SetInternalName', signature([ unquoted() ])),
  command('@Ahk2Exe-SetLanguage', signature([ unquotedWithNumber() ])),
  command('@Ahk2Exe-SetLegalTrademarks', signature([ unquoted() ])),
  command('@Ahk2Exe-SetName', signature([ unquoted() ])),
  command('@Ahk2Exe-SetOrigFilename', signature([ unquoted() ])),
  command('@Ahk2Exe-SetProductName', signature([ unquoted() ])),
  command('@Ahk2Exe-SetProductVersion', signature([ unquoted() ])),
  command('@Ahk2Exe-SetVersion', signature([ unquoted() ])),

  // [Set](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#Set)
  command('@Ahk2Exe-Set', signature([ unquoted(), unquotedWithNumber() ])),

  // [UpdateManifest](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#UpdateManifest)
  command('@Ahk2Exe-UpdateManifest', signature([ keywordOnly([ optionItem('0', '1', '2') ]), unquoted(), unquoted(), on() ])),

  // [UseResourceLang](https://www.autohotkey.com/docs/v2/misc/Ahk2ExeDirectives.htm#UseResourceLang)
  command('@Ahk2Exe-UseResourceLang', signature([ unquotedWithNumber() ])),
];


export function unquoted(optionItems?: string[], flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return {
    type: HighlightType.UnquotedStringInCompilerDirective,
    flags: mergeFlags(flags, CommandParameterFlag.CompilerDirective, CommandParameterFlag.WithNumber),
    itemPatterns: optionItems ?? [],
  };
}
export function fileName(flags: CommandParameterFlag = CommandParameterFlag.None): CommandParameter {
  return unquoted([
    optionItem(
      '*2',
      '*RT_BITMAP',
      '*4',
      '*RT_MENU',
      '*5',
      '*RT_DIALOG',
      '*6',
      '*RT_STRING',
      '*9',
      '*RT_ACCELERATORS',
      '*10',
      '*RT_RCDATA',
      '*11',
      '*RT_MESSAGETABLE',
      '*12',
      '*RT_GROUP_CURSOR',
      '*14',
      '*RT_GROUP_ICON',
      '*23',
      '*RT_HTML',
      '*24',
      '*RT_MANIFEST',
    ),
  ], flags);
}
export function expression(): CommandParameter {
  return {
    type: HighlightType.ExpressionInCompilerDirective,
    flags: mergeFlags(CommandParameterFlag.Expression, CommandParameterFlag.CompilerDirective),
    itemPatterns: [],
  };
}
export function variableName(): CommandParameter {
  return expression();
}
export function on(): CommandParameter {
  return keywordOnly([ optionItem('1') ]);
}
