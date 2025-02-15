#Requires AutoHotkey v2.1-
#Warn All, StdOut

import test_core

export describe := test_core.describe
export test := test_core.test
export beforeAll := test_core.beforeAll
export afterAll := test_core.afterAll
export beforeEach := test_core.beforeEach
export afterEach := test_core.afterEach
export runAllTest := test_core.runAllTest
export assert := test_core.assert
