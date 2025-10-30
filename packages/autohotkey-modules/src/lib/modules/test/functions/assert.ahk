#Requires AutoHotkey v2.1-

import './lib/modules/test/classes/Assertion' { Assertion }
import './lib/modules/test/inner' { CONTEXT }

export class assert {
  __NEW(message) {
    this.defineProp('negative', { get: (*) => false })
    this.defineProp('message', { get: (*) => message })
    this.defineProp('not', { get: (*) => assert.__Negative(message) })
  }
  static __NEW() {
    this.use(Assertion)
    this.defineProp('not', { get: (*) => assert.__Negative })
  }
  static use(behavior) {
    this.defineProp('behavior', { get: (*) => behavior })
  }
  static __CALL(key, params) {
    behavior := this.behavior.%key%
    try {
      result := behavior(this.behavior, params*)
      CONTEXT.currentTestCase.push(result)
    }
    catch (Error as err) {
      CONTEXT.currentTestCase.push(err)
    }
  }
  __CALL(key, params) {
    params.push(this.message)
    return assert.__CALL(key, params)
  }
  class __Negative {
    __NEW(message) {
      this.defineProp('message', { get: (*) => message })
    }
    static __CALL(key, params) {
      behavior := assert.behavior.%key%
      try {
        result := behavior(assert.behavior, params*)
        result.defineProp('result', { get: (*) => false })
        CONTEXT.currentTestCase.push(result)
      }
      catch (Error as err) {
        err.defineProp('result', { get: (*) => true })
        CONTEXT.currentTestCase.push(err)
      }
    }
    __CALL(key, params) {
      params.push(this.message)
      return assert.__Negative.__CALL(key, params)
    }
  }
}
