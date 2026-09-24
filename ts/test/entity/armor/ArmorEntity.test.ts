

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


describe('ArmorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Armor()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'armor.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"armorSet":{"a":true,"h":"Armor Set","n":"armorSet","r":false,"t":"`$OBJECT`","key$":"armorSet","index$":0},"assets":{"a":true,"h":"Assets","n":"assets","r":false,"t":"`$OBJECT`","key$":"assets","index$":1},"attributes":{"a":true,"h":"Attributes","n":"attributes","r":false,"sh":"Dictionary of attribute modifiers attached to the armor piece","t":"`$OBJECT`","key$":"attributes","index$":2},"crafting":{"a":true,"h":"Crafting","n":"crafting","r":false,"t":"`$OBJECT`","key$":"crafting","index$":3},"defense":{"a":true,"h":"Defense","n":"defense","r":false,"t":"`$OBJECT`","key$":"defense","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the armor piece","t":"`$INTEGER`","key$":"id","index$":5},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the armor piece","t":"`$STRING`","key$":"name","index$":6},"rank":{"a":true,"h":"Rank","n":"rank","r":false,"sh":"The rank of the armor piece","t":"`$STRING`","key$":"rank","index$":7},"rarity":{"a":true,"h":"Rarity","n":"rarity","r":false,"sh":"The rarity of the armor piece","t":"`$INTEGER`","key$":"rarity","index$":8},"resistances":{"a":true,"h":"Resistances","n":"resistances","r":false,"t":"`$OBJECT`","key$":"resistances","index$":9},"skills":{"a":true,"h":"Skills","n":"skills","r":false,"sh":"An array of skill ranks granted by the armor","t":"`$ARRAY`","key$":"skills","index$":10},"slots":{"a":true,"h":"Slots","n":"slots","r":false,"sh":"An array of decoration slot information","t":"`$ARRAY`","key$":"slots","index$":11},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The slot the armor piece fits in","t":"`$STRING`","key$":"type","index$":12}},"id":{"field":"id","name":"id"},"name":"armor","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /armor","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/armor","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"armor"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /armor/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/armor/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"armor"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"armor","name__orig":"armor","Name":"Armor","name_":"armor","name-":"armor","NAME":"ARMOR","index$":1}, {"active":true,"entity":"armor","key$":"BasicArmorFlow","kind":"basic","name":"BasicArmorFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"armor_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"armor_ref01","srcdatavar":"armor_ref01_data","suffix":"_dt0"},"m":{"id":"armor01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-armor_ref01"}}],"index$":1}]}, 'Armor', {"GET /armor":{"protocol":"http","operationId":"getAllArmor","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the armor piece","key$":"id"},"name":{"type":"string","description":"The name of the armor piece","key$":"name"},"type":{"type":"string","enum":["head","chest","gloves","waist","legs"],"description":"The slot the armor piece fits in","key$":"type"},"rank":{"type":"string","enum":["low","high"],"description":"The rank of the armor piece","key$":"rank"},"rarity":{"type":"integer","description":"The rarity of the armor piece","key$":"rarity"},"defense":{"type":"object","properties":{"base":{"type":"integer","description":"The armor's base defense value"},"max":{"type":"integer","description":"The armor's defense value at max level"},"augmented":{"type":"integer","description":"The armor's defense value when augmented"}},"x-ref":"#/components/schemas/Defense","key$":"defense"},"resistances":{"type":"object","properties":{"fire":{"type":"integer","description":"The armor's fire resistance"},"water":{"type":"integer","description":"The armor's water resistance"},"ice":{"type":"integer","description":"The armor's ice resistance"},"thunder":{"type":"integer","description":"The armor's thunder resistance"},"dragon":{"type":"integer","description":"The armor's dragon resistance"}},"x-ref":"#/components/schemas/Resistances","key$":"resistances"},"slots":{"type":"array","items":{"type":"object","properties":{"rank":{"type":"integer","description":"The rank of the decoration slot"}},"x-ref":"#/components/schemas/Slot"},"description":"An array of decoration slot information","key$":"slots"},"attributes":{"type":"object","description":"Dictionary of attribute modifiers attached to the armor piece","key$":"attributes"},"skills":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks granted by the armor","key$":"skills"},"armorSet":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the armor set"},"name":{"type":"string","description":"The name of the armor set"},"rank":{"type":"string","enum":["low","high"],"description":"The rank of the armor set"},"pieces":{"type":"array","items":{"type":"integer"},"description":"An array of IDs of all armor pieces in the set"}},"x-ref":"#/components/schemas/SetInfo","key$":"armorSet"},"assets":{"type":"object","properties":{"imageMale":{"type":"string","nullable":true,"description":"URL to the male preview image, or null if one does not exist"},"imageFemale":{"type":"string","nullable":true,"description":"URL to the female preview image, or null if one does not exist"}},"x-ref":"#/components/schemas/ArmorAssets","key$":"assets"},"crafting":{"type":"object","properties":{"materials":{"type":"array","items":{"type":"object","properties":{"quantity":{"type":"integer","description":"The quantity of the item required"},"item":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the item","key$":"id"},"name":{"type":"string","description":"The name of the item","key$":"name"},"description":{"type":"string","description":"A description of the item","key$":"description"},"rarity":{"type":"integer","description":"The rarity of the item","key$":"rarity"},"carryLimit":{"type":"integer","description":"The maximum number of this item that can be carried","key$":"carryLimit"},"sellPrice":{"type":"integer","description":"The price when selling the item","key$":"sellPrice"},"buyPrice":{"type":"integer","description":"The price when buying the item","key$":"buyPrice"},"value":{"type":"integer","description":"The value of the item","key$":"value"}},"x-ref":"#/components/schemas/Item"}},"x-ref":"#/components/schemas/CraftingCost"},"description":"An array of crafting material costs"}},"x-ref":"#/components/schemas/ArmorCraftingInfo","key$":"crafting"}},"x-ref":"#/components/schemas/Armor","index$":0}}}}}},"parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /armor/{id}":{"protocol":"http","operationId":"getArmorById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the armor piece","key$":"id"},"name":{"type":"string","description":"The name of the armor piece","key$":"name"},"type":{"type":"string","enum":["head","chest","gloves","waist","legs"],"description":"The slot the armor piece fits in","key$":"type"},"rank":{"type":"string","enum":["low","high"],"description":"The rank of the armor piece","key$":"rank"},"rarity":{"type":"integer","description":"The rarity of the armor piece","key$":"rarity"},"defense":{"type":"object","properties":{"base":{"type":"integer","description":"The armor's base defense value"},"max":{"type":"integer","description":"The armor's defense value at max level"},"augmented":{"type":"integer","description":"The armor's defense value when augmented"}},"x-ref":"#/components/schemas/Defense","key$":"defense"},"resistances":{"type":"object","properties":{"fire":{"type":"integer","description":"The armor's fire resistance"},"water":{"type":"integer","description":"The armor's water resistance"},"ice":{"type":"integer","description":"The armor's ice resistance"},"thunder":{"type":"integer","description":"The armor's thunder resistance"},"dragon":{"type":"integer","description":"The armor's dragon resistance"}},"x-ref":"#/components/schemas/Resistances","key$":"resistances"},"slots":{"type":"array","items":{"type":"object","properties":{"rank":{"type":"integer","description":"The rank of the decoration slot"}},"x-ref":"#/components/schemas/Slot"},"description":"An array of decoration slot information","key$":"slots"},"attributes":{"type":"object","description":"Dictionary of attribute modifiers attached to the armor piece","key$":"attributes"},"skills":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks granted by the armor","key$":"skills"},"armorSet":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the armor set"},"name":{"type":"string","description":"The name of the armor set"},"rank":{"type":"string","enum":["low","high"],"description":"The rank of the armor set"},"pieces":{"type":"array","items":{"type":"integer"},"description":"An array of IDs of all armor pieces in the set"}},"x-ref":"#/components/schemas/SetInfo","key$":"armorSet"},"assets":{"type":"object","properties":{"imageMale":{"type":"string","nullable":true,"description":"URL to the male preview image, or null if one does not exist"},"imageFemale":{"type":"string","nullable":true,"description":"URL to the female preview image, or null if one does not exist"}},"x-ref":"#/components/schemas/ArmorAssets","key$":"assets"},"crafting":{"type":"object","properties":{"materials":{"type":"array","items":{"type":"object","properties":{"quantity":{"type":"integer","description":"The quantity of the item required"},"item":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the item","key$":"id"},"name":{"type":"string","description":"The name of the item","key$":"name"},"description":{"type":"string","description":"A description of the item","key$":"description"},"rarity":{"type":"integer","description":"The rarity of the item","key$":"rarity"},"carryLimit":{"type":"integer","description":"The maximum number of this item that can be carried","key$":"carryLimit"},"sellPrice":{"type":"integer","description":"The price when selling the item","key$":"sellPrice"},"buyPrice":{"type":"integer","description":"The price when buying the item","key$":"buyPrice"},"value":{"type":"integer","description":"The value of the item","key$":"value"}},"x-ref":"#/components/schemas/Item"}},"x-ref":"#/components/schemas/CraftingCost"},"description":"An array of crafting material costs"}},"x-ref":"#/components/schemas/ArmorCraftingInfo","key$":"crafting"}},"x-ref":"#/components/schemas/Armor","index$":0}}}},"404":{"description":"Armor piece not found"}},"parameters":[{"name":"id","in":"path","description":"The ID of the armor piece to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let armor_ref01_data = Object.values(setup.data.existing.armor)[0] as any

    // LIST
    const armor_ref01_ent = client.Armor()
    const armor_ref01_match: any = {}

    const armor_ref01_list = (await armor_ref01_ent.list(armor_ref01_match)).map((e: any) => e.data())


    // LOAD
    const armor_ref01_match_dt0: any = {}
    armor_ref01_match_dt0.id = armor_ref01_data.id
    const armor_ref01_data_dt0 = (await armor_ref01_ent.load(armor_ref01_match_dt0)).data()
    assert(armor_ref01_data_dt0.id === armor_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/armor/ArmorTestData.json')

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
    ['armor01','armor02','armor03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID']
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
  
