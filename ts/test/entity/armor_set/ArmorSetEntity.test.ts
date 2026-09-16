

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bonus","req":false,"short":"The set bonus, if any","type":"`$OBJECT`","index$":0},{"active":true,"name":"id","req":false,"short":"The ID of the armor set","type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"short":"The name of the armor set","type":"`$STRING`","index$":2},{"active":true,"name":"pieces","req":false,"short":"Array of armor pieces in the set","type":"`$ARRAY`","index$":3},{"active":true,"name":"rank","req":false,"short":"The rank of the armor set","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"armor_set","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /armor/sets","json":"{\"operationId\":\"getAllArmorSets\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"bonus\":{\"description\":\"The set bonus, if any\",\"nullable\":true,\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"ranks\":{\"items\":{\"properties\":{\"pieces\":{\"type\":\"integer\"},\"skill\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"Array of armor pieces in the set\",\"items\":{\"properties\":{\"armorSet\":{\"properties\":{\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"An array of IDs of all armor pieces in the set\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"},\"assets\":{\"properties\":{\"imageFemale\":{\"description\":\"URL to the female preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"},\"imageMale\":{\"description\":\"URL to the male preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Dictionary of attribute modifiers attached to the armor piece\",\"type\":\"object\"},\"crafting\":{\"properties\":{\"materials\":{\"description\":\"An array of crafting material costs\",\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"defense\":{\"properties\":{\"augmented\":{\"description\":\"The armor's defense value when augmented\",\"type\":\"integer\"},\"base\":{\"description\":\"The armor's base defense value\",\"type\":\"integer\"},\"max\":{\"description\":\"The armor's defense value at max level\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor piece\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor piece\",\"type\":\"string\"},\"rank\":{\"description\":\"The rank of the armor piece\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the armor piece\",\"type\":\"integer\"},\"resistances\":{\"properties\":{\"dragon\":{\"description\":\"The armor's dragon resistance\",\"type\":\"integer\"},\"fire\":{\"description\":\"The armor's fire resistance\",\"type\":\"integer\"},\"ice\":{\"description\":\"The armor's ice resistance\",\"type\":\"integer\"},\"thunder\":{\"description\":\"The armor's thunder resistance\",\"type\":\"integer\"},\"water\":{\"description\":\"The armor's water resistance\",\"type\":\"integer\"}},\"type\":\"object\"},\"skills\":{\"description\":\"An array of skill ranks granted by the armor\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The slot the armor piece fits in\",\"enum\":[\"head\",\"chest\",\"gloves\",\"waist\",\"legs\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/armor/sets","segments":[{"lit":"armor"},{"lit":"sets"}],"select":{"exist":["p","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /armor/sets/{id}","json":"{\"operationId\":\"getArmorSetById\",\"parameters\":[{\"description\":\"The ID of the armor set to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bonus\":{\"description\":\"The set bonus, if any\",\"nullable\":true,\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"ranks\":{\"items\":{\"properties\":{\"pieces\":{\"type\":\"integer\"},\"skill\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"Array of armor pieces in the set\",\"items\":{\"properties\":{\"armorSet\":{\"properties\":{\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"An array of IDs of all armor pieces in the set\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"},\"assets\":{\"properties\":{\"imageFemale\":{\"description\":\"URL to the female preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"},\"imageMale\":{\"description\":\"URL to the male preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Dictionary of attribute modifiers attached to the armor piece\",\"type\":\"object\"},\"crafting\":{\"properties\":{\"materials\":{\"description\":\"An array of crafting material costs\",\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"defense\":{\"properties\":{\"augmented\":{\"description\":\"The armor's defense value when augmented\",\"type\":\"integer\"},\"base\":{\"description\":\"The armor's base defense value\",\"type\":\"integer\"},\"max\":{\"description\":\"The armor's defense value at max level\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor piece\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor piece\",\"type\":\"string\"},\"rank\":{\"description\":\"The rank of the armor piece\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the armor piece\",\"type\":\"integer\"},\"resistances\":{\"properties\":{\"dragon\":{\"description\":\"The armor's dragon resistance\",\"type\":\"integer\"},\"fire\":{\"description\":\"The armor's fire resistance\",\"type\":\"integer\"},\"ice\":{\"description\":\"The armor's ice resistance\",\"type\":\"integer\"},\"thunder\":{\"description\":\"The armor's thunder resistance\",\"type\":\"integer\"},\"water\":{\"description\":\"The armor's water resistance\",\"type\":\"integer\"}},\"type\":\"object\"},\"skills\":{\"description\":\"An array of skill ranks granted by the armor\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The slot the armor piece fits in\",\"enum\":[\"head\",\"chest\",\"gloves\",\"waist\",\"legs\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Armor set not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/armor/sets/{id}","segments":[{"lit":"armor"},{"lit":"sets"},{"var":"id"}],"select":{"exist":["id","p"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"armor_set","name__orig":"armor_set","Name":"ArmorSet","name_":"armor_set","name-":"armor-set","NAME":"ARMOR_SET","index$":2}, {"active":true,"entity":"armor_set","key$":"BasicArmorSetFlow","kind":"basic","name":"BasicArmorSetFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"armor_set_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"armor_set_ref01","srcdatavar":"armor_set_ref01_data","suffix":"_dt0"},"match":{"id":"armor_set01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-armor_set_ref01"}}],"index$":1}]}, 'ArmorSet')
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
  
