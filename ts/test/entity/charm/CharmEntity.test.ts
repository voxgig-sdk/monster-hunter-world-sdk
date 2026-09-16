

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


describe('CharmEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Charm()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'charm.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"crafting","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"short":"The ID of the charm","type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"short":"The name of the charm","type":"`$STRING`","index$":2},{"active":true,"name":"rarity","req":false,"short":"The rarity of the charm","type":"`$INTEGER`","index$":3},{"active":true,"name":"skills","req":false,"short":"An array of skill ranks granted by the charm","type":"`$ARRAY`","index$":4}],"id":{"field":"id","name":"id"},"name":"charm","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /charms","json":"{\"operationId\":\"getAllCharms\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"crafting\":{\"properties\":{\"materials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the charm\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the charm\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the charm\",\"type\":\"integer\"},\"skills\":{\"description\":\"An array of skill ranks granted by the charm\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/charms","segments":[{"lit":"charms"}],"select":{"exist":["p","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /charms/{id}","json":"{\"operationId\":\"getCharmById\",\"parameters\":[{\"description\":\"The ID of the charm to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"crafting\":{\"properties\":{\"materials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the charm\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the charm\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the charm\",\"type\":\"integer\"},\"skills\":{\"description\":\"An array of skill ranks granted by the charm\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Charm not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/charms/{id}","segments":[{"lit":"charms"},{"var":"id"}],"select":{"exist":["id","p"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"charm","name__orig":"charm","Name":"Charm","name_":"charm","name-":"charm","NAME":"CHARM","index$":3}, {"active":true,"entity":"charm","key$":"BasicCharmFlow","kind":"basic","name":"BasicCharmFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"charm_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"charm_ref01","srcdatavar":"charm_ref01_data","suffix":"_dt0"},"match":{"id":"charm01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-charm_ref01"}}],"index$":1}]}, 'Charm')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let charm_ref01_data = Object.values(setup.data.existing.charm)[0] as any

    // LIST
    const charm_ref01_ent = client.Charm()
    const charm_ref01_match: any = {}

    const charm_ref01_list = (await charm_ref01_ent.list(charm_ref01_match)).map((e: any) => e.data())


    // LOAD
    const charm_ref01_match_dt0: any = {}
    charm_ref01_match_dt0.id = charm_ref01_data.id
    const charm_ref01_data_dt0 = (await charm_ref01_ent.load(charm_ref01_match_dt0)).data()
    assert(charm_ref01_data_dt0.id === charm_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/charm/CharmTestData.json')

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
    ['charm01','charm02','charm03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_CHARM_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_CHARM_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_CHARM_ENTID']
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
  
