

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { NextbikeSDK, BaseFeature, stdutil } from '../../..'

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


describe('ReservationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXTBIKE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXTBIKE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NextbikeSDK.test()
    const ent = testsdk.Reservation()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXTBIKE_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reservation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"reservation","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /reservation/reserve","json":"{\"operationId\":\"reserveBike\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bike_number\":{\"description\":\"Number of the bike to reserve\",\"type\":\"string\"},\"station_id\":{\"description\":\"Station identifier\",\"type\":\"integer\"},\"user_id\":{\"description\":\"User identifier\",\"type\":\"string\"}},\"required\":[\"bike_number\",\"user_id\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bike_number\":{\"description\":\"Reserved bike number\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Reservation expiration time\",\"format\":\"date-time\",\"type\":\"string\"},\"reservation_id\":{\"description\":\"Unique reservation identifier\",\"type\":\"string\"},\"status\":{\"description\":\"Reservation status\",\"enum\":[\"confirmed\",\"pending\",\"failed\"],\"type\":\"string\"},\"unlock_code\":{\"description\":\"Code to unlock the bike\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bike successfully reserved\"},\"400\":{\"description\":\"Bad request - Invalid input\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"description\":\"Bike or station not found\"},\"409\":{\"description\":\"Conflict - Bike already reserved or unavailable\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for accessing restricted endpoints\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/reservation/reserve","segments":[{"lit":"reservation"},{"lit":"reserve"}],"select":{"$action":"reserve"},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"reservation","name__orig":"reservation","Name":"Reservation","name_":"reservation","name-":"reservation","NAME":"RESERVATION","index$":2}, {"active":true,"entity":"reservation","key$":"BasicReservationFlow","kind":"basic","name":"BasicReservationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"reservation_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Reservation')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const reservation_ref01_ent = client.Reservation()
    let reservation_ref01_data = setup.data.new.reservation['reservation_ref01']

    reservation_ref01_data = (await reservation_ref01_ent.create(reservation_ref01_data)).data()
    assert(null != reservation_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/reservation/ReservationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = NextbikeSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['reservation01','reservation02','reservation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXTBIKE_TEST_RESERVATION_ENTID': idmap,
    'NEXTBIKE_TEST_LIVE': 'FALSE',
    'NEXTBIKE_TEST_EXPLAIN': 'FALSE',
    'NEXTBIKE_APIKEY': '',
  })

  idmap = env['NEXTBIKE_TEST_RESERVATION_ENTID']

  const live = 'TRUE' === env.NEXTBIKE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXTBIKE_TEST_RESERVATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new NextbikeSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.NEXTBIKE_APIKEY,
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
    explain: 'TRUE' === env.NEXTBIKE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
