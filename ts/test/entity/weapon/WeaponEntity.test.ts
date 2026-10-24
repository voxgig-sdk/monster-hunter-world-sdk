

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


describe('WeaponEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Weapon()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('weapon hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of MonsterHunterWorldSDK.test(offline).Weapon().stream('list')) { }
    }, /offline/)

    for await (const _item of MonsterHunterWorldSDK.test(offline).Weapon()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = MonsterHunterWorldSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Weapon().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of MonsterHunterWorldSDK.test().Weapon().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new MonsterHunterWorldSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Weapon().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Weapon().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = MonsterHunterWorldSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Weapon().list({"p":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'weapon.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"assets":{"a":true,"h":"Assets","n":"assets","r":false,"sh":"Asset URLs for the weapon","t":"`$OBJECT`","key$":"assets","index$":0},"attack":{"a":true,"h":"Attack","n":"attack","r":false,"sh":"Attack values for the weapon","t":"`$OBJECT`","key$":"attack","index$":1},"attributes":{"a":true,"h":"Attributes","n":"attributes","r":false,"sh":"Additional weapon attributes","t":"`$OBJECT`","key$":"attributes","index$":2},"crafting":{"a":true,"h":"Crafting","n":"crafting","r":false,"sh":"Crafting information for the weapon","t":"`$OBJECT`","key$":"crafting","index$":3},"damageType":{"a":true,"h":"Damage Type","n":"damageType","r":false,"sh":"The damage type of the weapon","t":"`$STRING`","key$":"damageType","index$":4},"elements":{"a":true,"h":"Elements","n":"elements","r":false,"sh":"Elemental damage information","t":"`$ARRAY`","key$":"elements","index$":5},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the weapon","t":"`$INTEGER`","key$":"id","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the weapon","t":"`$STRING`","key$":"name","index$":7},"rarity":{"a":true,"h":"Rarity","n":"rarity","r":false,"sh":"The rarity of the weapon","t":"`$INTEGER`","key$":"rarity","index$":8},"slots":{"a":true,"h":"Slots","n":"slots","r":false,"sh":"An array of decoration slot information","t":"`$ARRAY`","key$":"slots","index$":9},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of weapon","t":"`$STRING`","key$":"type","index$":10}},"id":{"field":"id","name":"id"},"name":"weapon","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /weapons","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/weapons","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"weapons"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /weapons/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/weapons/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"weapons"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"weapon","name__orig":"weapon","Name":"Weapon","name_":"weapon","name-":"weapon","NAME":"WEAPON","index$":11}, {"active":true,"entity":"weapon","key$":"BasicWeaponFlow","kind":"basic","name":"BasicWeaponFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"weapon_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"weapon_ref01","srcdatavar":"weapon_ref01_data","suffix":"_dt0"},"m":{"id":"weapon01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-weapon_ref01"}}],"index$":1}]}, 'Weapon', {"GET /weapons":{"protocol":"http","parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}]},"GET /weapons/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the weapon to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let weapon_ref01_data = Object.values(setup.data.existing.weapon)[0] as any

    // LIST
    const weapon_ref01_ent = client.Weapon()
    const weapon_ref01_match: any = {}

    const weapon_ref01_list = (await weapon_ref01_ent.list(weapon_ref01_match)).map((e: any) => e.data())


    // LOAD
    const weapon_ref01_match_dt0: any = {}
    weapon_ref01_match_dt0.id = weapon_ref01_data.id
    const weapon_ref01_data_dt0 = (await weapon_ref01_ent.load(weapon_ref01_match_dt0)).data()
    assert(weapon_ref01_data_dt0.id === weapon_ref01_data.id)


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
      '../../../../.sdk/test/entity/weapon/WeaponTestData.json')

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
    ['weapon01','weapon02','weapon03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID']
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
  
