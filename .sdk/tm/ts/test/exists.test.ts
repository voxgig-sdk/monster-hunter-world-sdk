
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MonsterHunterWorldSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = MonsterHunterWorldSDK.test()
    equal(testsdk instanceof MonsterHunterWorldSDK, true,
      'MonsterHunterWorldSDK.test() must return a client synchronously')
  })

})
