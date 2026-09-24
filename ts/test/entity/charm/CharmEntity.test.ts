

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"crafting":{"a":true,"h":"Crafting","n":"crafting","r":false,"t":"`$OBJECT`","key$":"crafting","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the charm","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the charm","t":"`$STRING`","key$":"name","index$":2},"rarity":{"a":true,"h":"Rarity","n":"rarity","r":false,"sh":"The rarity of the charm","t":"`$INTEGER`","key$":"rarity","index$":3},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"sh":"An array of skill ranks granted by the charm","t":"`$ARRAY`","key$":"skills","index$":4}},"id":{"field":"id","name":"id"},"name":"charm","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /charms","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/charms","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"charms"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /charms/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/charms/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"charms"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"charm","name__orig":"charm","Name":"Charm","name_":"charm","name-":"charm","NAME":"CHARM","index$":3}, {"active":true,"entity":"charm","key$":"BasicCharmFlow","kind":"basic","name":"BasicCharmFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"charm_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"charm_ref01","srcdatavar":"charm_ref01_data","suffix":"_dt0"},"m":{"id":"charm01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-charm_ref01"}}],"index$":1}]}, 'Charm', {"GET /charms":{"protocol":"http","operationId":"getAllCharms","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the charm","key$":"id"},"name":{"type":"string","description":"The name of the charm","key$":"name"},"rarity":{"type":"integer","description":"The rarity of the charm","key$":"rarity"},"skills":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks granted by the charm","key$":"skills"},"crafting":{"type":"object","properties":{"materials":{"type":"array","items":{"type":"object","properties":{"quantity":{"type":"integer","description":"The quantity of the item required"},"item":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the item","key$":"id"},"name":{"type":"string","description":"The name of the item","key$":"name"},"description":{"type":"string","description":"A description of the item","key$":"description"},"rarity":{"type":"integer","description":"The rarity of the item","key$":"rarity"},"carryLimit":{"type":"integer","description":"The maximum number of this item that can be carried","key$":"carryLimit"},"sellPrice":{"type":"integer","description":"The price when selling the item","key$":"sellPrice"},"buyPrice":{"type":"integer","description":"The price when buying the item","key$":"buyPrice"},"value":{"type":"integer","description":"The value of the item","key$":"value"}},"x-ref":"#/components/schemas/Item"}},"x-ref":"#/components/schemas/CraftingCost"}}},"key$":"crafting"}},"x-ref":"#/components/schemas/Charm","index$":0}}}}}},"parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /charms/{id}":{"protocol":"http","operationId":"getCharmById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the charm","key$":"id"},"name":{"type":"string","description":"The name of the charm","key$":"name"},"rarity":{"type":"integer","description":"The rarity of the charm","key$":"rarity"},"skills":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks granted by the charm","key$":"skills"},"crafting":{"type":"object","properties":{"materials":{"type":"array","items":{"type":"object","properties":{"quantity":{"type":"integer","description":"The quantity of the item required"},"item":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the item","key$":"id"},"name":{"type":"string","description":"The name of the item","key$":"name"},"description":{"type":"string","description":"A description of the item","key$":"description"},"rarity":{"type":"integer","description":"The rarity of the item","key$":"rarity"},"carryLimit":{"type":"integer","description":"The maximum number of this item that can be carried","key$":"carryLimit"},"sellPrice":{"type":"integer","description":"The price when selling the item","key$":"sellPrice"},"buyPrice":{"type":"integer","description":"The price when buying the item","key$":"buyPrice"},"value":{"type":"integer","description":"The value of the item","key$":"value"}},"x-ref":"#/components/schemas/Item"}},"x-ref":"#/components/schemas/CraftingCost"}}},"key$":"crafting"}},"x-ref":"#/components/schemas/Charm","index$":0}}}},"404":{"description":"Charm not found"}},"parameters":[{"name":"id","in":"path","description":"The ID of the charm to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
  
