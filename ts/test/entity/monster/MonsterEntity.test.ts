

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MonsterHunterWorldSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('MonsterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Monster()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('monster hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MonsterHunterWorldSDK.test(offline).Monster().stream('list')) { }
    }, /offline/)

    for await (const _item of MonsterHunterWorldSDK.test(offline).Monster()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MonsterHunterWorldSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Monster().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MonsterHunterWorldSDK.test().Monster().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MonsterHunterWorldSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Monster().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Monster().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MonsterHunterWorldSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Monster().list({"p":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'monster.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ailments":{"a":true,"h":"Ailments","n":"ailments","r":false,"sh":"Ailments the monster can inflict","t":"`$ARRAY`","key$":"ailments","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A description of the monster","t":"`$STRING`","key$":"description","index$":1},"elements":{"a":true,"h":"Elements","n":"elements","r":false,"sh":"Elements the monster uses","t":"`$ARRAY`","key$":"elements","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the monster","t":"`$INTEGER`","key$":"id","index$":3},"locations":{"a":true,"h":"Locations","n":"locations","r":false,"sh":"Locations where the monster can be found","t":"`$ARRAY`","key$":"locations","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the monster","t":"`$STRING`","key$":"name","index$":5},"resistances":{"a":true,"h":"Resistances","n":"resistances","r":false,"sh":"Resistances of the monster","t":"`$ARRAY`","key$":"resistances","index$":6},"rewards":{"a":true,"h":"Rewards","n":"rewards","r":false,"sh":"Rewards obtained from the monster","t":"`$ARRAY`","key$":"rewards","index$":7},"species":{"a":true,"h":"Species","n":"species","r":false,"sh":"The species of the monster","t":"`$STRING`","key$":"species","index$":8},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of monster","t":"`$STRING`","key$":"type","index$":9},"weaknesses":{"a":true,"h":"Weaknesses","n":"weaknesses","r":false,"sh":"Weaknesses of the monster","t":"`$ARRAY`","key$":"weaknesses","index$":10}},"id":{"field":"id","name":"id"},"name":"monster","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /monsters","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/monsters","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"monsters"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /monsters/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/monsters/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"monsters"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"monster","name__orig":"monster","Name":"Monster","name_":"monster","name-":"monster","NAME":"MONSTER","index$":8}, {"active":true,"entity":"monster","key$":"BasicMonsterFlow","kind":"basic","name":"BasicMonsterFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"monster_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"monster_ref01","srcdatavar":"monster_ref01_data","suffix":"_dt0"},"m":{"id":"monster01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-monster_ref01"}}],"index$":1}]}, 'Monster', {"GET /monsters":{"protocol":"http","parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}]},"GET /monsters/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the monster to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let monster_ref01_data = Object.values(setup.data.existing.monster)[0] as any

    // LIST
    const monster_ref01_ent = client.Monster()
    const monster_ref01_match: any = {}

    const monster_ref01_list = (await monster_ref01_ent.list(monster_ref01_match)).map((e: any) => e.data())


    // LOAD
    const monster_ref01_match_dt0: any = {}
    monster_ref01_match_dt0.id = monster_ref01_data.id
    const monster_ref01_data_dt0 = (await monster_ref01_ent.load(monster_ref01_match_dt0)).data()
    assert(monster_ref01_data_dt0.id === monster_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/monster/MonsterTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = MonsterHunterWorldSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['monster01','monster02','monster03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new MonsterHunterWorldSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
