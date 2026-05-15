
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { MonsterHunterWorldSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await MonsterHunterWorldSDK.test()
    equal(null !== testsdk, true)
  })

})
