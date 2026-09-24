

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { MonsterHunterWorldSDK, BaseFeature, stdutil } from '../../..'

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


describe('MotionValueEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.MotionValue()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'motion_value.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"damageType":{"a":true,"h":"Damage Type","n":"damageType","r":false,"sh":"The type of damage","t":"`$STRING`","key$":"damageType","index$":0},"exhaust":{"a":true,"h":"Exhaust","n":"exhaust","r":false,"sh":"Exhaust value","t":"`$INTEGER`","key$":"exhaust","index$":1},"hits":{"a":true,"h":"Hits","n":"hits","r":false,"sh":"Hit information","t":"`$ARRAY`","key$":"hits","index$":2},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the motion value","t":"`$INTEGER`","key$":"id","index$":3},"stun":{"a":true,"h":"Stun","n":"stun","r":false,"sh":"Stun value","t":"`$INTEGER`","key$":"stun","index$":4},"weaponType":{"a":true,"h":"Weapon Type","n":"weaponType","r":false,"sh":"The type of weapon","t":"`$STRING`","key$":"weaponType","index$":5}},"id":{"field":"id","name":"id"},"name":"motion_value","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /motion-values","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/motion-values","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"motion-values"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /motion-values/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/motion-values/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"motion-values"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"motion_value","name__orig":"motion_value","Name":"MotionValue","name_":"motion_value","name-":"motion-value","NAME":"MOTION_VALUE","index$":9}, {"active":true,"entity":"motion_value","key$":"BasicMotionValueFlow","kind":"basic","name":"BasicMotionValueFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"motion_value_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"motion_value_ref01","srcdatavar":"motion_value_ref01_data","suffix":"_dt0"},"m":{"id":"motion_value01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-motion_value_ref01"}}],"index$":1}]}, 'MotionValue', {"GET /motion-values":{"protocol":"http","operationId":"getAllMotionValues","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the motion value","key$":"id"},"weaponType":{"type":"string","description":"The type of weapon","key$":"weaponType"},"damageType":{"type":"string","description":"The type of damage","key$":"damageType"},"stun":{"type":"integer","description":"Stun value","key$":"stun"},"exhaust":{"type":"integer","description":"Exhaust value","key$":"exhaust"},"hits":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string"},"value":{"type":"number"}}},"description":"Hit information","key$":"hits"}},"x-ref":"#/components/schemas/MotionValue","index$":0}}}}}},"parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /motion-values/{id}":{"protocol":"http","operationId":"getMotionValueById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the motion value","key$":"id"},"weaponType":{"type":"string","description":"The type of weapon","key$":"weaponType"},"damageType":{"type":"string","description":"The type of damage","key$":"damageType"},"stun":{"type":"integer","description":"Stun value","key$":"stun"},"exhaust":{"type":"integer","description":"Exhaust value","key$":"exhaust"},"hits":{"type":"array","items":{"type":"object","properties":{"type":{"type":"string"},"value":{"type":"number"}}},"description":"Hit information","key$":"hits"}},"x-ref":"#/components/schemas/MotionValue","index$":0}}}},"404":{"description":"Motion value not found"}},"parameters":[{"name":"id","in":"path","description":"The ID of the motion value to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let motion_value_ref01_data = Object.values(setup.data.existing.motion_value)[0] as any

    // LIST
    const motion_value_ref01_ent = client.MotionValue()
    const motion_value_ref01_match: any = {}

    const motion_value_ref01_list = (await motion_value_ref01_ent.list(motion_value_ref01_match)).map((e: any) => e.data())


    // LOAD
    const motion_value_ref01_match_dt0: any = {}
    motion_value_ref01_match_dt0.id = motion_value_ref01_data.id
    const motion_value_ref01_data_dt0 = (await motion_value_ref01_ent.load(motion_value_ref01_match_dt0)).data()
    assert(motion_value_ref01_data_dt0.id === motion_value_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/motion_value/MotionValueTestData.json')

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
    ['motion_value01','motion_value02','motion_value03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_MOTION_VALUE_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_MOTION_VALUE_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_MOTION_VALUE_ENTID']
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
  
