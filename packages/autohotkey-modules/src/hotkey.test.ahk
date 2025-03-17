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
})

