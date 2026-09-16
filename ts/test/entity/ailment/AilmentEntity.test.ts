

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


describe('AilmentEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Ailment()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'ailment.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"A short description of the ailment","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"The ID of the ailment","type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"short":"The name of the ailment","type":"`$STRING`","index$":2},{"active":true,"name":"protection","req":false,"type":"`$OBJECT`","index$":3},{"active":true,"name":"recovery","req":false,"type":"`$OBJECT`","index$":4}],"id":{"field":"id","name":"id"},"name":"ailment","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /ailments","json":"{\"operationId\":\"getAllAilments\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"A short description of the ailment\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the ailment\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the ailment\",\"type\":\"string\"},\"protection\":{\"properties\":{\"items\":{\"description\":\"An array of items that can prevent the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"skills\":{\"description\":\"An array of skills that can prevent the ailment\",\"items\":{\"properties\":{\"description\":{\"description\":\"A description of the skill\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the skill\",\"type\":\"string\"},\"ranks\":{\"description\":\"An array of skill ranks\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"recovery\":{\"properties\":{\"actions\":{\"description\":\"An array of actions that can be taken to remove the ailment\",\"items\":{\"enum\":[\"crouch\",\"dodge\"],\"type\":\"string\"},\"type\":\"array\"},\"items\":{\"description\":\"An array of items that can remove the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ailments","segments":[{"lit":"ailments"}],"select":{"exist":["p","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /ailments/{id}","json":"{\"operationId\":\"getAilmentById\",\"parameters\":[{\"description\":\"The ID of the ailment to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"A short description of the ailment\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the ailment\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the ailment\",\"type\":\"string\"},\"protection\":{\"properties\":{\"items\":{\"description\":\"An array of items that can prevent the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"skills\":{\"description\":\"An array of skills that can prevent the ailment\",\"items\":{\"properties\":{\"description\":{\"description\":\"A description of the skill\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the skill\",\"type\":\"string\"},\"ranks\":{\"description\":\"An array of skill ranks\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"recovery\":{\"properties\":{\"actions\":{\"description\":\"An array of actions that can be taken to remove the ailment\",\"items\":{\"enum\":[\"crouch\",\"dodge\"],\"type\":\"string\"},\"type\":\"array\"},\"items\":{\"description\":\"An array of items that can remove the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Ailment not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/ailments/{id}","segments":[{"lit":"ailments"},{"var":"id"}],"select":{"exist":["id","p"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"ailment","name__orig":"ailment","Name":"Ailment","name_":"ailment","name-":"ailment","NAME":"AILMENT","index$":0}, {"active":true,"entity":"ailment","key$":"BasicAilmentFlow","kind":"basic","name":"BasicAilmentFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"ailment_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"ailment_ref01","srcdatavar":"ailment_ref01_data","suffix":"_dt0"},"match":{"id":"ailment01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-ailment_ref01"}}],"index$":1}]}, 'Ailment')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let ailment_ref01_data = Object.values(setup.data.existing.ailment)[0] as any

    // LIST
    const ailment_ref01_ent = client.Ailment()
    const ailment_ref01_match: any = {}

    const ailment_ref01_list = (await ailment_ref01_ent.list(ailment_ref01_match)).map((e: any) => e.data())


    // LOAD
    const ailment_ref01_match_dt0: any = {}
    ailment_ref01_match_dt0.id = ailment_ref01_data.id
    const ailment_ref01_data_dt0 = (await ailment_ref01_ent.load(ailment_ref01_match_dt0)).data()
    assert(ailment_ref01_data_dt0.id === ailment_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/ailment/AilmentTestData.json')

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
    ['ailment01','ailment02','ailment03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID']
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
  
