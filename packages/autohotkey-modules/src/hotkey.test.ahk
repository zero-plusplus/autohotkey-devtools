#Requires AutoHotkey v2.1-
#Warn All, StdOut

#Include ./.config.ahk

import hotkey as h

describe('hotkey', () {
  test('isHotkeyName', () {
    assert.isTruthy(h.isHotkeyName('^v'))
    assert.isTruthy(h.isHotkeyName('^+v'))
    assert.isTruthy(h.isHotkeyName('^+!v'))
    assert.isTruthy(h.isHotkeyName('~^+!v'))
    assert.isTruthy(h.isHotkeyName('*^+!v'))

    assert.isFalsy(h.isHotkeyName('*^+! & v'))
    assert.isFalsy(h.isHotkeyName('*Ctrl & v'))
  })
  test('isCustomCombiName', () {
    assert.isTruthy(h.isCustomCombiName('Ctrl & v'))
    assert.isTruthy(h.isCustomCombiName('*Ctrl & v'))

    assert.isFalsy(h.isCustomCombiName('*^+ & v'))
    assert.isFalsy(h.isCustomCombiName('^v'))
    assert.isFalsy(h.isCustomCombiName('^+v'))
    assert.isFalsy(h.isCustomCombiName('^+!v'))
    assert.isFalsy(h.isCustomCombiName('~^+!v'))
    assert.isFalsy(h.isCustomCombiName('*^+!v'))
  })

  test('getHotkeyOptions', () {
    assert.equals(h.getHotkeyOptions('Ctrl & v'), [])
    assert.equals(h.getHotkeyOptions('*Ctrl & v'), [ '*' ])
    assert.equals(h.getHotkeyOptions('^+v'), [])
    assert.equals(h.getHotkeyOptions('~^+v'), [ '~' ])
    assert.equals(h.getHotkeyOptions('$~^+v'), [ '$', '~' ])
  })
  test('getHotkeyOptionsText', () {
    assert.equals(h.getHotkeyOptionsText('Ctrl & v'), '')
    assert.equals(h.getHotkeyOptionsText('*Ctrl & v'), '*')
    assert.equals(h.getHotkeyOptionsText('+v'), '')
    assert.equals(h.getHotkeyOptionsText('~^+v'), '~')
    assert.equals(h.getHotkeyOptionsText('$~^+v'), '$~')
  })
})

