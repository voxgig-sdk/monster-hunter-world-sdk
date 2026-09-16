

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


describe('EventEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
  afterEach(liveDelay('MONSTER_HUNTER_WORLD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = MonsterHunterWorldSDK.test()
    const ent = testsdk.Event()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'event.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"camps","req":false,"short":"An array of camps in the location","type":"`$ARRAY`","index$":0},{"active":true,"name":"description","req":false,"short":"A description of the event","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"endTimestamp","req":false,"short":"The end time of the event","type":"`$STRING`","index$":2},{"active":true,"name":"exclusive","req":false,"short":"Whether the event is exclusive to a platform","type":"`$STRING`","index$":3},{"active":true,"name":"expansion","req":false,"short":"The expansion the event belongs to","type":"`$STRING`","index$":4},{"active":true,"name":"id","req":false,"short":"The ID of the location","type":"`$INTEGER`","index$":5},{"active":true,"name":"location","req":false,"type":"`$OBJECT`","index$":6},{"active":true,"name":"name","req":false,"short":"The name of the location","type":"`$STRING`","index$":7},{"active":true,"name":"platform","req":false,"short":"The platform for the event","type":"`$STRING`","index$":8},{"active":true,"name":"questRank","req":false,"short":"The quest rank of the event","type":"`$STRING`","index$":9},{"active":true,"name":"requirements","req":false,"short":"Requirements for the event","type":"`$STRING`","index$":10},{"active":true,"format":"date-time","name":"startTimestamp","req":false,"short":"The start time of the event","type":"`$STRING`","index$":11},{"active":true,"name":"successConditions","req":false,"short":"Conditions for success","type":"`$STRING`","index$":12},{"active":true,"name":"type","req":false,"short":"The type of event","type":"`$STRING`","index$":13},{"active":true,"name":"zoneCount","req":false,"short":"The number of zones in the location","type":"`$INTEGER`","index$":14}],"id":{"field":"id","name":"id"},"name":"event","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"q","orig":"q","reqd":false,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /events","json":"{\"operationId\":\"getAllEvents\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"A description of the event\",\"type\":\"string\"},\"endTimestamp\":{\"description\":\"The end time of the event\",\"format\":\"date-time\",\"type\":\"string\"},\"exclusive\":{\"description\":\"Whether the event is exclusive to a platform\",\"nullable\":true,\"type\":\"string\"},\"expansion\":{\"description\":\"The expansion the event belongs to\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the event\",\"type\":\"integer\"},\"location\":{\"properties\":{\"camps\":{\"description\":\"An array of camps in the location\",\"items\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"zone\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the location\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the location\",\"type\":\"string\"},\"zoneCount\":{\"description\":\"The number of zones in the location\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"description\":\"The name of the event\",\"type\":\"string\"},\"platform\":{\"description\":\"The platform for the event\",\"type\":\"string\"},\"questRank\":{\"description\":\"The quest rank of the event\",\"type\":\"string\"},\"requirements\":{\"description\":\"Requirements for the event\",\"type\":\"string\"},\"startTimestamp\":{\"description\":\"The start time of the event\",\"format\":\"date-time\",\"type\":\"string\"},\"successConditions\":{\"description\":\"Conditions for success\",\"type\":\"string\"},\"type\":{\"description\":\"The type of event\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/events","segments":[{"lit":"events"}],"select":{"exist":["p","q"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}],"query":[{"active":true,"kind":"query","name":"p","orig":"p","reqd":false,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /events/{id}","json":"{\"operationId\":\"getEventById\",\"parameters\":[{\"description\":\"The ID of the event to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"A description of the event\",\"type\":\"string\"},\"endTimestamp\":{\"description\":\"The end time of the event\",\"format\":\"date-time\",\"type\":\"string\"},\"exclusive\":{\"description\":\"Whether the event is exclusive to a platform\",\"nullable\":true,\"type\":\"string\"},\"expansion\":{\"description\":\"The expansion the event belongs to\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the event\",\"type\":\"integer\"},\"location\":{\"properties\":{\"camps\":{\"description\":\"An array of camps in the location\",\"items\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"zone\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the location\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the location\",\"type\":\"string\"},\"zoneCount\":{\"description\":\"The number of zones in the location\",\"type\":\"integer\"}},\"type\":\"object\"},\"name\":{\"description\":\"The name of the event\",\"type\":\"string\"},\"platform\":{\"description\":\"The platform for the event\",\"type\":\"string\"},\"questRank\":{\"description\":\"The quest rank of the event\",\"type\":\"string\"},\"requirements\":{\"description\":\"Requirements for the event\",\"type\":\"string\"},\"startTimestamp\":{\"description\":\"The start time of the event\",\"format\":\"date-time\",\"type\":\"string\"},\"successConditions\":{\"description\":\"Conditions for success\",\"type\":\"string\"},\"type\":{\"description\":\"The type of event\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Event not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/events/{id}","segments":[{"lit":"events"},{"var":"id"}],"select":{"exist":["id","p"]},"transform":{"req":"`reqdata`","res":"`body.location`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":5}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"match":{"id":"event01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"index$":1}]}, 'Event')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let event_ref01_data = Object.values(setup.data.existing.event)[0] as any

    // LIST
    const event_ref01_ent = client.Event()
    const event_ref01_match: any = {}

    const event_ref01_list = (await event_ref01_ent.list(event_ref01_match)).map((e: any) => e.data())


    // LOAD
    const event_ref01_match_dt0: any = {}
    event_ref01_match_dt0.id = event_ref01_data.id
    const event_ref01_data_dt0 = (await event_ref01_ent.load(event_ref01_match_dt0)).data()
    assert(event_ref01_data_dt0.id === event_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/event/EventTestData.json')

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
    ['event01','event02','event03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'MONSTER_HUNTER_WORLD_TEST_EVENT_ENTID': idmap,
    'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
    'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['MONSTER_HUNTER_WORLD_TEST_EVENT_ENTID']

  const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_EVENT_ENTID']
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
  
