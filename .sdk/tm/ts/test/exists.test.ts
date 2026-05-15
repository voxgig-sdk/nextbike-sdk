
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { NextbikeSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await NextbikeSDK.test()
    equal(null !== testsdk, true)
  })

})
