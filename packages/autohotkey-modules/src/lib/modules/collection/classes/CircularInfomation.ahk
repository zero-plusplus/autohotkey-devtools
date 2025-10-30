#Requires AutoHotkey v2.1-

export class CircularInfomation extends Error {
  __NEW(value) {
    super.__NEW('circular reference occurred.')

    this.defineProp('value', { get: (*) => value })
  }
}
