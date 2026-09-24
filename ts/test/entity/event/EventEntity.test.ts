

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"camps":{"a":true,"h":"Camps","n":"camps","r":false,"sh":"An array of camps in the location","t":"`$ARRAY`","key$":"camps","index$":0},"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"A description of the event","t":"`$STRING`","key$":"description","index$":1},"endTimestamp":{"a":true,"fo":"date-time","h":"End Timestamp","n":"endTimestamp","r":false,"sh":"The end time of the event","t":"`$STRING`","key$":"endTimestamp","index$":2},"exclusive":{"a":true,"h":"Exclusive","n":"exclusive","r":false,"sh":"Whether the event is exclusive to a platform","t":"`$STRING`","key$":"exclusive","index$":3},"expansion":{"a":true,"h":"Expansion","n":"expansion","r":false,"sh":"The expansion the event belongs to","t":"`$STRING`","key$":"expansion","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"The ID of the location","t":"`$INTEGER`","key$":"id","index$":5},"location":{"a":true,"h":"Location","n":"location","r":false,"t":"`$OBJECT`","key$":"location","index$":6},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"The name of the location","t":"`$STRING`","key$":"name","index$":7},"platform":{"a":true,"h":"Platform","n":"platform","r":false,"sh":"The platform for the event","t":"`$STRING`","key$":"platform","index$":8},"questRank":{"a":true,"h":"Quest Rank","n":"questRank","r":false,"sh":"The quest rank of the event","t":"`$STRING`","key$":"questRank","index$":9},"requirements":{"a":true,"h":"Requirements","n":"requirements","r":false,"sh":"Requirements for the event","t":"`$STRING`","key$":"requirements","index$":10},"startTimestamp":{"a":true,"fo":"date-time","h":"Start Timestamp","n":"startTimestamp","r":false,"sh":"The start time of the event","t":"`$STRING`","key$":"startTimestamp","index$":11},"successConditions":{"a":true,"h":"Success Conditions","n":"successConditions","r":false,"sh":"Conditions for success","t":"`$STRING`","key$":"successConditions","index$":12},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"The type of event","t":"`$STRING`","key$":"type","index$":13},"zoneCount":{"a":true,"h":"Zone Count","n":"zoneCount","r":false,"sh":"The number of zones in the location","t":"`$INTEGER`","key$":"zoneCount","index$":14}},"id":{"field":"id","name":"id"},"name":"event","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /events","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"q","or":"q","r":false,"t":"`$STRING`","index$":1}]},"k":"http","m":"GET","o":"/events","q":{"exist":["p","q"]},"r":{},"s":[{"lit":"events"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /events/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}],"query":[{"a":true,"k":"query","n":"p","or":"p","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/events/{id}","q":{"exist":["id","p"]},"r":{},"s":[{"lit":"events"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.location`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"event","name__orig":"event","Name":"Event","name_":"event","name-":"event","NAME":"EVENT","index$":5}, {"active":true,"entity":"event","key$":"BasicEventFlow","kind":"basic","name":"BasicEventFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"event_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"event_ref01","srcdatavar":"event_ref01_data","suffix":"_dt0"},"m":{"id":"event01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-event_ref01"}}],"index$":1}]}, 'Event', {"GET /events":{"protocol":"http","operationId":"getAllEvents","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the event","key$":"id"},"name":{"type":"string","description":"The name of the event","key$":"name"},"platform":{"type":"string","description":"The platform for the event","key$":"platform"},"exclusive":{"type":"string","nullable":true,"description":"Whether the event is exclusive to a platform","key$":"exclusive"},"type":{"type":"string","description":"The type of event","key$":"type"},"expansion":{"type":"string","description":"The expansion the event belongs to","key$":"expansion"},"description":{"type":"string","description":"A description of the event","key$":"description"},"requirements":{"type":"string","description":"Requirements for the event","key$":"requirements"},"questRank":{"type":"string","description":"The quest rank of the event","key$":"questRank"},"successConditions":{"type":"string","description":"Conditions for success","key$":"successConditions"},"startTimestamp":{"type":"string","format":"date-time","description":"The start time of the event","key$":"startTimestamp"},"endTimestamp":{"type":"string","format":"date-time","description":"The end time of the event","key$":"endTimestamp"},"location":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the location","key$":"id"},"name":{"type":"string","description":"The name of the location","key$":"name"},"zoneCount":{"type":"integer","description":"The number of zones in the location","key$":"zoneCount"},"camps":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer"},"name":{"type":"string"},"zone":{"type":"integer"}}},"description":"An array of camps in the location","key$":"camps"}},"x-ref":"#/components/schemas/Location","index$":0,"key$":"location"}},"x-ref":"#/components/schemas/Event","index$":0}}}}}},"parameters":[{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":0},{"name":"q","in":"query","description":"Query parameter for searching","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"},"GET /events/{id}":{"protocol":"http","operationId":"getEventById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the event","key$":"id"},"name":{"type":"string","description":"The name of the event","key$":"name"},"platform":{"type":"string","description":"The platform for the event","key$":"platform"},"exclusive":{"type":"string","nullable":true,"description":"Whether the event is exclusive to a platform","key$":"exclusive"},"type":{"type":"string","description":"The type of event","key$":"type"},"expansion":{"type":"string","description":"The expansion the event belongs to","key$":"expansion"},"description":{"type":"string","description":"A description of the event","key$":"description"},"requirements":{"type":"string","description":"Requirements for the event","key$":"requirements"},"questRank":{"type":"string","description":"The quest rank of the event","key$":"questRank"},"successConditions":{"type":"string","description":"Conditions for success","key$":"successConditions"},"startTimestamp":{"type":"string","format":"date-time","description":"The start time of the event","key$":"startTimestamp"},"endTimestamp":{"type":"string","format":"date-time","description":"The end time of the event","key$":"endTimestamp"},"location":{"type":"object","properties":{"id":{"type":"integer","description":"The ID of the location","key$":"id"},"name":{"type":"string","description":"The name of the location","key$":"name"},"zoneCount":{"type":"integer","description":"The number of zones in the location","key$":"zoneCount"},"camps":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer"},"name":{"type":"string"},"zone":{"type":"integer"}}},"description":"An array of camps in the location","key$":"camps"}},"x-ref":"#/components/schemas/Location","index$":0,"key$":"location"}},"x-ref":"#/components/schemas/Event"}}}},"404":{"description":"Event not found"}},"parameters":[{"name":"id","in":"path","description":"The ID of the event to retrieve","required":true,"schema":{"type":"integer"},"index$":0},{"name":"p","in":"query","description":"Projection parameter for filtering returned fields","required":false,"schema":{"type":"string"},"index$":1}],"securitySource":"unspecified"}})
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
  
