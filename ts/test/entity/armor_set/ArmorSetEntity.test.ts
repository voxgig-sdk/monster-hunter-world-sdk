

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


describe('ArmorSetEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.ArmorSet()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'armor_set.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bonus":{"a":true,"h":"Bonus","n":"bonus","r":false,"sh":"The set bonus, if any","t":"`$OBJECT`","key$":"bonus","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the armor set","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the armor set","t":"`$STRING`","key$":"name","index$":2},"pieces":{"a":true,"h":"Pieces","n":"pieces","r":false,"sh":"Array of armor pieces in the set","t":"`$ARRAY`","key$":"pieces","index$":3},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"The rank of the armor set","t":"`$STRING`","key$":"rank","index$":4}},"id":{"field":"id","name":"id"},"name":"armor_set","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /armor/sets","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/armor/sets","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"armor"},{"lit":"sets"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /armor/sets/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/armor/sets/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"armor"},{"lit":"sets"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"armor_set","name__orig":"armor_set","Name":"ArmorSet","name_":"armor_set","name-":"armor-set","NAME":"ARMOR_SET","index$":2}, {"active":true,"entity":"armor_set","key$":"BasicArmorSetFlow","kind":"basic","name":"BasicArmorSetFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"armor_set_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"armor_set_ref01","srcdatavar":"armor_set_ref01_data","suffix":"_dt0"},"m":{"id":"armor_set01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-armor_set_ref01"}}],"index$":1}]}, 'ArmorSet', {"GET /armor/sets":{"protocol":"http","parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}]},"GET /armor/sets/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","description":"The ID of the armor set to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let armor_set_ref01_data = Object.values(setup.data.existing.armor_set)[0] as any

    // LIST
    const armor_set_ref01_ent = client.ArmorSet()
    const armor_set_ref01_match: any = {}

    const armor_set_ref01_list = (await armor_set_ref01_ent.list(armor_set_ref01_match)).map((e: any) => e.data())


    // LOAD
    const armor_set_ref01_match_dt0: any = {}
    armor_set_ref01_match_dt0.id = armor_set_ref01_data.id
    const armor_set_ref01_data_dt0 = (await armor_set_ref01_ent.load(armor_set_ref01_match_dt0)).data()
    assert(armor_set_ref01_data_dt0.id === armor_set_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/armor_set/ArmorSetTestData.json')

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
    ['armor_set01','armor_set02','armor_set03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_ARMOR_SET_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_ARMOR_SET_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_ARMOR_SET_ENTID']
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
  
