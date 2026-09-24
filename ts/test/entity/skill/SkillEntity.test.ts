

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


describe('SkillEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Skill()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'skill.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A description of the skill","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the skill","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the skill","t":"`$STRING`","key$":"name","index$":2},"ranks":{"a":true,"h":"Ranks","n":"ranks","r":false,"sh":"An array of skill ranks","t":"`$ARRAY`","key$":"ranks","index$":3}},"id":{"field":"id","name":"id"},"name":"skill","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /skills","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/skills","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"skills"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /skills/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/skills/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"skills"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"skill","name__orig":"skill","Name":"Skill","name_":"skill","name-":"skill","NAME":"SKILL","index$":10}, {"active":true,"entity":"skill","key$":"BasicSkillFlow","kind":"basic","name":"BasicSkillFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"skill_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"skill_ref01","srcdatavar":"skill_ref01_data","suffix":"_dt0"},"m":{"id":"skill01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-skill_ref01"}}],"index$":1}]}, 'Skill', {"GET /skills":{"protocol":"http","operationId":"getAllSkills","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill","key$":"id"},"name":{"type":"string","description":"The name of the skill","key$":"name"},"description":{"type":"string","description":"A description of the skill","key$":"description"},"ranks":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks","key$":"ranks"}},"x-ref":"#/components/schemas/Skill","index$":0}}}}}},"parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /skills/{id}":{"protocol":"http","operationId":"getSkillById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill","key$":"id"},"name":{"type":"string","description":"The name of the skill","key$":"name"},"description":{"type":"string","description":"A description of the skill","key$":"description"},"ranks":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the skill rank"},"level":{"type":"integer","description":"The level of the skill"},"description":{"type":"string","description":"Description of the skill at this level"},"modifiers":{"type":"array","items":{"type":"object"},"description":"Array of modifiers for the skill"},"skill":{"type":"integer","description":"The skill ID reference"},"skillName":{"type":"string","description":"The name of the skill"}},"x-ref":"#/components/schemas/SkillRank"},"description":"An array of skill ranks","key$":"ranks"}},"x-ref":"#/components/schemas/Skill","index$":0}}}},"404":{"description":"Skill not found"}},"parameters":[{"name":"id","in":"path","description":"The ID of the skill to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let skill_ref01_data = Object.values(setup.data.existing.skill)[0] as any

    // LIST
    const skill_ref01_ent = client.Skill()
    const skill_ref01_match: any = {}

    const skill_ref01_list = (await skill_ref01_ent.list(skill_ref01_match)).map((e: any) => e.data())


    // LOAD
    const skill_ref01_match_dt0: any = {}
    skill_ref01_match_dt0.id = skill_ref01_data.id
    const skill_ref01_data_dt0 = (await skill_ref01_ent.load(skill_ref01_match_dt0)).data()
    assert(skill_ref01_data_dt0.id === skill_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/skill/SkillTestData.json')

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
    ['skill01','skill02','skill03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_SKILL_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_SKILL_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_SKILL_ENTID']
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
  
