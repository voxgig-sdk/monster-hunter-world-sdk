

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"damageType","req":false,"short":"The type of damage","type":"`$STRING`","index$":0},{"active":true,"name":"exhaust","req":false,"short":"Exhaust value","type":"`$INTEGER`","index$":1},{"active":true,"name":"hits","req":false,"short":"Hit information","type":"`$ARRAY`","index$":2},{"active":true,"name":"id","req":false,"short":"The ID of the motion value","type":"`$INTEGER`","index$":3},{"active":true,"name":"stun","req":false,"short":"Stun value","type":"`$INTEGER`","index$":4},{"active":true,"name":"weaponType","req":false,"short":"The type of weapon","type":"`$STRING`","index$":5}],"id":{"field":"id","name":"id"},"name":"motion_value","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /motion-values","json":"{\"operationId\":\"getAllMotionValues\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"damageType\":{\"description\":\"The type of damage\",\"type\":\"string\"},\"exhaust\":{\"description\":\"Exhaust value\",\"type\":\"integer\"},\"hits\":{\"description\":\"Hit information\",\"items\":{\"properties\":{\"type\":{\"type\":\"string\"},\"value\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the motion value\",\"type\":\"integer\"},\"stun\":{\"description\":\"Stun value\",\"type\":\"integer\"},\"weaponType\":{\"description\":\"The type of weapon\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/motion-values","segments":[{"lit":"motion-values"}],"select":{"exist":["p","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /motion-values/{id}","json":"{\"operationId\":\"getMotionValueById\",\"parameters\":[{\"description\":\"The ID of the motion value to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"damageType\":{\"description\":\"The type of damage\",\"type\":\"string\"},\"exhaust\":{\"description\":\"Exhaust value\",\"type\":\"integer\"},\"hits\":{\"description\":\"Hit information\",\"items\":{\"properties\":{\"type\":{\"type\":\"string\"},\"value\":{\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the motion value\",\"type\":\"integer\"},\"stun\":{\"description\":\"Stun value\",\"type\":\"integer\"},\"weaponType\":{\"description\":\"The type of weapon\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Motion value not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/motion-values/{id}","segments":[{"lit":"motion-values"},{"var":"id"}],"select":{"exist":["id","p"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"motion_value","name__orig":"motion_value","Name":"MotionValue","name_":"motion_value","name-":"motion-value","NAME":"MOTION_VALUE","index$":9}, {"active":true,"entity":"motion_value","key$":"BasicMotionValueFlow","kind":"basic","name":"BasicMotionValueFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"motion_value_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"motion_value_ref01","srcdatavar":"motion_value_ref01_data","suffix":"_dt0"},"match":{"id":"motion_value01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-motion_value_ref01"}}],"index$":1}]}, 'MotionValue')
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
  
