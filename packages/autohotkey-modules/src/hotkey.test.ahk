#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import './lib/modules/hotkey' {
  getHotkeyOptions,
  getHotkeyOptionsText,
  isCustomCombiName,
  isHotkeyName,
}

describe('hotkey', () {
  test('isHotkeyName', () {
    assert.isTruthy(isHotkeyName('^v'))
    assert.isTruthy(isHotkeyName('^+v'))
    assert.isTruthy(isHotkeyName('^+!v'))
    assert.isTruthy(isHotkeyName('~^+!v'))
    assert.isTruthy(isHotkeyName('*^+!v'))

    assert.isFalsy(isHotkeyName('*^+! & v'))
    assert.isFalsy(isHotkeyName('*Ctrl & v'))
  })
  test('isCustomCombiName', () {
    assert.isTruthy(isCustomCombiName('Ctrl & v'))
    assert.isTruthy(isCustomCombiName('*Ctrl & v'))

    assert.isFalsy(isCustomCombiName('*^+ & v'))
    assert.isFalsy(isCustomCombiName('^v'))
    assert.isFalsy(isCustomCombiName('^+v'))
    assert.isFalsy(isCustomCombiName('^+!v'))
    assert.isFalsy(isCustomCombiName('~^+!v'))
    assert.isFalsy(isCustomCombiName('*^+!v'))
  })

  test('getHotkeyOptions', () {
    assert.equals(getHotkeyOptions('Ctrl & v'), [])
    assert.equals(getHotkeyOptions('*Ctrl & v'), [ '*' ])
    assert.equals(getHotkeyOptions('^+v'), [])
    assert.equals(getHotkeyOptions('~^+v'), [ '~' ])
    assert.equals(getHotkeyOptions('$~^+v'), [ '$', '~' ])
  })
  test('getHotkeyOptionsText', () {
    assert.equals(getHotkeyOptionsText('Ctrl & v'), '')
    assert.equals(getHotkeyOptionsText('*Ctrl & v'), '*')
    assert.equals(getHotkeyOptionsText('+v'), '')
    assert.equals(getHotkeyOptionsText('~^+v'), '~')
    assert.equals(getHotkeyOptionsText('$~^+v'), '$~')
  })
})

