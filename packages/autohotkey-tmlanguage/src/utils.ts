import { builtinVaribles_v1, builtinVaribles_v2, CommandArgsType, operators_v1, operators_v2, Repository, RuleName } from './constants';
import { alt, asciiChar, char, escapeOnigurumaText, group, inlineSpaces0, lookbehind, negChar, opt, ordalt, seq, startAnchor } from './oniguruma';
import type { CommandInfo, EscapeSequencesInfo, IncludeRule, NameRule, PatternsRule, Rule, ScopeName, Utilities, VariableParts } from './types';

export function getCommandInfos(): CommandInfo[] {
  // https://www.autohotkey.com/docs/v1/lib/index.htm
  const commandInfos: CommandInfo[] = [
    [ 'AutoTrim', [ CommandArgsType.Enum, 'On', 'Off', '1', '0' ] ],
    [ 'BlockInput', [ CommandArgsType.Legacy, 'On', 'Off', 'SendMouse', 'MouseMove' ] ],
    [ 'Click', [ CommandArgsType.Legacy, 'Left', 'L', 'Right', 'R', 'Middle', 'M', 'X1', 'X2', 'Up', 'U', 'Down', 'D' ] ],
    [ 'ClipWait', CommandArgsType.Expression, CommandArgsType.Expression ],
    // TODO: Need to implement and test highlighting of each parameter
    // [ 'Control', 'Check', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'UnCheck', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Enable', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Disable', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Show', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Hide', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Style', CommandArgsType.ControlStyle, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ExStyle', CommandArgsType.ControlStyle, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ShowDropDown', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'HideDropDown', CommandArgsType.None, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'TabLeft', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'TabRight', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Add', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Delete', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'Choose', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'ChooseString', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // [ 'Control', 'EditPaste', CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy, CommandArgsType.Legacy ],
    // TODO: Done here so far
    // [ 'ControlClick' ],
    // [ 'ControlFocus' ],
    // [ 'ControlGet' ],
    // [ 'ControlGetFocus' ],
    // [ 'ControlGetPos' ],
    // [ 'ControlGetText' ],
    // [ 'ControlMove' ],
    // [ 'ControlSend' ],
    // [ 'ControlSendRaw' ],
    // [ 'ControlSetText' ],
    // [ 'CoordMode' ],
    // [ 'Critical' ],
    // [ 'DetectHiddenText' ],
    // [ 'DetectHiddenWindows' ],
    // [ 'Drive' ],
    // [ 'DriveGet' ],
    // [ 'DriveSpaceFree' ],
    // [ 'Edit' ],
    // [ 'EnvAdd' ],
    // [ 'EnvDiv' ], // Deprecated
    // [ 'EnvGet' ],
    // [ 'EnvMult' ], // Deprecated
    // [ 'EnvSet' ],
    // [ 'EnvSub' ],
    // [ 'EnvUpdate' ],
    // [ 'FileAppend' ],
    // [ 'FileCopy' ],
    // [ 'FileCopyDir' ],
    // [ 'FileCreateDir' ],
    // [ 'FileCreateShortcut' ],
    // [ 'FileDelete' ],
    // [ 'FileEncoding' ],
    // [ 'FileInstall' ],
    // [ 'FileGetAttrib' ],
    // [ 'FileGetShortcut' ],
    // [ 'FileGetSize' ],
    // [ 'FileGetTime' ],
    // [ 'FileGetVersion' ],
    // [ 'FileMove' ],
    // [ 'FileMoveDir' ],
    // [ 'FileRead' ],
    // [ 'FileReadLine' ],
    // [ 'FileRecycle' ],
    // [ 'FileRecycleEmpty' ],
    // [ 'FileRemoveDir' ],
    // [ 'FileSelectFile' ],
    // [ 'FileSelectFolder' ],
    // [ 'FileSetAttrib' ],
    // [ 'FileSetTime' ],
    // [ 'FormatTime' ],
    // [ 'GetKeyState' ], // Deprecated
    // [ 'Gosub' ],
    // [ 'Goto' ],
    // [ 'GroupActivate' ],
    // [ 'GroupAdd' ],
    // [ 'GroupClose' ],
    // [ 'GroupDeactivate' ],
    // [ 'Gui' ],
    // [ 'GuiControl' ],
    // [ 'GuiControlGet' ],
    // [ 'Hotkey' ],
    // [ 'ImageSearch' ],
    // [ 'IniDelete' ],
    // [ 'IniRead' ],
    // [ 'IniWrite' ],
    // [ 'Input' ],
    // [ 'InputBox' ],
    // [ 'KeyHistory' ],
    // [ 'KeyWait' ],
    // [ 'ListHotkeys' ],
    // [ 'ListLines' ],
    // [ 'ListVars' ],
    // [ 'Menu' ],
    // [ 'MouseClick' ],
    // [ 'MouseClickDrag' ],
    // [ 'MouseGetPos' ],
    // [ 'MouseMove' ],
    // [ 'MsgBox' ],
    // [ 'OnExit' ], // Deprecated
    // [ 'OutputDebug' ],
    // [ 'PixelGetColor' ],
    // [ 'PixelSearch' ],
    // [ 'PostMessage' ],
    // [ 'Process' ],
    // [ 'Progress' ], // Deprecated
    // [ 'Random' ],
    // [ 'RegDelete' ],
    // [ 'RegRead' ],
    // [ 'RegWrite' ],
    // [ 'Reload' ],
    // [ 'Run' ],
    // [ 'RunAs' ],
    // [ 'RunWait' ],
    // [ 'Send' ],
    // [ 'SendRaw' ],
    // [ 'SendInput' ],
    // [ 'SendPlay' ],
    // [ 'SendEvent' ],
    // [ 'SendLevel' ],
    // [ 'SendMessage' ],
    // [ 'SendMode' ],
    // [ 'SetBatchLines' ],
    // [ 'SetCapsLockState' ],
    // [ 'SetControlDelay' ],
    // [ 'SetDefaultMouseSpeed' ],
    // [ 'SetEnv' ], // Deprecated
    // [ 'SetFormat' ], // Deprecated
    // [ 'SetKeyDelay' ],
    // [ 'SetMouseDelay' ],
    // [ 'SetNumLockState' ],
    // [ 'SetScrollLockState' ],
    // [ 'SetRegView' ],
    // [ 'SetStoreCapsLockMode' ],
    // [ 'SetTimer' ],
    // [ 'SetTitleMatchMode' ],
    // [ 'SetWinDelay' ],
    // [ 'SetWorkingDir' ],
    // [ 'Sleep' ],
    // [ 'Sort' ],
    // [ 'SoundBeep' ],
    // [ 'SoundGet' ],
    // [ 'SoundGetWaveVolume' ],
    // [ 'SoundPlay' ],
    // [ 'SoundSet' ],
    // [ 'SoundSetWaveVolume' ],
    // [ 'SplashImage' ],
    // [ 'SplashTextOn' ],
    // [ 'SplashTextOff' ],
    // [ 'SplitPath' ],
    // [ 'StatusBarGetText' ],
    // [ 'StatusBarWait' ],
    // [ 'StringCaseSense' ],
    // [ 'StringGetPos' ], // Deprecated
    // [ 'StringLeft' ], // Deprecated
    // [ 'StringLen' ], // Deprecated
    // [ 'StringLower' ],
    // [ 'StringMid' ], // Deprecated
    // [ 'StringReplace' ], // Deprecated
    // [ 'StringRight' ], // Deprecated
    // [ 'StringSplit' ], // Deprecated
    // [ 'StringTrimLeft' ], // Deprecated
    // [ 'StringTrimRight' ], // Deprecated
    // [ 'StringUpper' ],
    // [ 'SysGet' ],
    // [ 'Thread' ],
    // [ 'ToolTip' ],
    // [ 'Transform' ], // Deprecated
    // [ 'TrayTip' ],
    // [ 'UrlDownloadToFile' ],
    // [ 'WinActivate' ],
    // [ 'WinActivateBottom' ],
    // [ 'WinClose' ],
    // [ 'WinGetActiveStats' ],
    // [ 'WinGetActiveTitle' ],
    // [ 'WinGetClass' ],
    // [ 'WinGet' ],
    // [ 'WinGetPos' ],
    // [ 'WinGetText' ],
    // [ 'WinGetTitle' ],
    // [ 'WinHide' ],
    // [ 'WinKill' ],
    // [ 'WinMaximize' ],
    // [ 'WinMenuSelectItem' ],
    // [ 'WinMinimize' ],
    // [ 'WinMinimizeAll' ],
    // [ 'WinMinimizeAllUndo' ],
    // [ 'WinMove' ],
    // [ 'WinRestore' ],
    // [ 'WinSet' ],
    // [ 'WinSetTitle' ],
    // [ 'WinShow' ],
    // [ 'WinWait' ],
    // [ 'WinWaitActive' ],
    // [ 'WinWaitNotActive' ],
    // [ 'WinWaitClose' ],
  ];
  return commandInfos.sort((a, b): number => {
    return b[0].length - a[0].length;
  });
}
export function getVariableParts(scopeName: ScopeName): VariableParts {
  const letter = '[a-zA-Z]';
  const numberChar = '\\d';
  const nonAsciiChar = negChar(asciiChar());

  switch (scopeName) {
    // https://www.autohotkey.com/docs/v2/Concepts.htm#names
    case 'autohotkeynext':
    case 'autohotkey2': {
      const sign = char('_');
      const headChar = group(alt(letter, nonAsciiChar, sign));
      const tailChar = group(alt(letter, nonAsciiChar, sign, numberChar));
      return {
        headChar,
        tailChar,
      };
    }
    // https://www.autohotkey.com/docs/v1/Concepts.htm#names
    case 'autohotkeyl': {
      const sign = char('_', '#', '@', '$');
      const headChar = group(alt(letter, nonAsciiChar, sign));
      const tailChar = group(alt(letter, nonAsciiChar, sign, numberChar));
      return {
        headChar,
        tailChar,
      };
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getEscapeSequencesInfo(scopeName: ScopeName): EscapeSequencesInfo {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      // [Escape Sequences](https://www.autohotkey.com/docs/v2/misc/EscapeChar.htm)
      const commonEscapeSequences: string[] = [ '``', '`;', '`:', '`{', '`n', '`r', '`b', '`t', '`s', '`v', '`a', '`f' ];
      return {
        doubleQuote: [ ...commonEscapeSequences, '`\"' ],
        singleQuote: [ ...commonEscapeSequences, `\`'` ],
        legacyText: [],
      };
    }
    case 'autohotkeyl': {
      // [Escape Sequences](https://www.autohotkey.com/docs/v1/misc/EscapeChar.htm)
      const commonEscapeSequences: string[] = [ '`,', '`%', '``', '`;', '`::', '`r', '`n', '`b', '`t', '`v', '`a', '`f' ];
      return {
        doubleQuote: [ ...commonEscapeSequences, `""` ],
        singleQuote: [],
        legacyText: commonEscapeSequences,
      };
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getStatementBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': return lookbehind(alt(
      seq(startAnchor(), inlineSpaces0()),
      seq(char(':'), inlineSpaces0()),
    ));
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getOperators(scopeName: ScopeName): string[] {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      return operators_v2;
    }
    case 'autohotkeyl': {
      return operators_v1;
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getContinuationBegin(scopeName: ScopeName): string {
  // https://www.autohotkey.com/docs/v2/Scripts.htm#continuation-line
  // https://www.autohotkey.com/docs/v1/Scripts.htm#continuation-line
  const operators = getOperators(scopeName).filter((operator) => {
    switch (operator) {
      case '++':
      case '--': return false;
      default: return true;
    }
  }).map((operator) => escapeOnigurumaText(operator));

  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': {
      return lookbehind(seq(
        startAnchor(),
        inlineSpaces0(),
        group(ordalt(...operators)),
      ));
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getExpressionBegin(scopeName: ScopeName): string {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2':
    case 'autohotkeyl': {
      return lookbehind(alt(
        seq(startAnchor(), inlineSpaces0(), opt(char(','))),
        seq(char(':'), inlineSpaces0()),
      ));
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function getBuiltInVariableNames(scopeName: ScopeName): string[] {
  switch (scopeName) {
    case 'autohotkeynext':
    case 'autohotkey2': {
      return [ ...builtinVaribles_v2 ];
    }
    case 'autohotkeyl': {
      return [ ...builtinVaribles_v1 ];
    }
  }
  throw Error(`Scope "${scopeName}" not found`);
}
export function createUtilities(scopeName: ScopeName): Utilities {
  return {
    name: (...ruleNames: Array<Repository | RuleName>): string => name(scopeName, ...ruleNames),
    nameRule: (...ruleNames: Array<Repository | RuleName>): NameRule => ({ name: name(scopeName, ...ruleNames) }),
    includeRule: (repositoryName: Repository) => includeRule(repositoryName),
    includeScope: (scopeName: ScopeName) => includeScope(scopeName),
  };
}

// #region rule combinators
export function includeRule(repositoryName: Repository): IncludeRule {
  return { include: `#${repositoryName}` };
}
export function includeScope(scopeName: ScopeName): IncludeRule {
  return { include: `source.${scopeName}` };
}
export function name(scopeName: ScopeName, ...ruleNames: Array<Repository | RuleName>): string {
  return ruleNames.map((ruleName) => `${ruleName}.${scopeName}`).join(' ');
}
export function nameRule(scopeName: ScopeName, ...ruleNames: Array<Repository | RuleName>): NameRule {
  return { name: name(scopeName, ...ruleNames) };
}
export function patternsRule(...rules: Rule[]): PatternsRule {
  return { patterns: rules };
}
// #endregion rule combinators
