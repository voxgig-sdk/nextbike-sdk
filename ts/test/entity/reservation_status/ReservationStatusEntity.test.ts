

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


describe('ReservationStatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXTBIKE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXTBIKE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NextbikeSDK.test()
    const ent = testsdk.ReservationStatus()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXTBIKE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'reservation_status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bike_number","req":false,"short":"Reserved bike number","type":"`$STRING`","index$":0},{"active":true,"format":"date-time","name":"created_at","req":false,"short":"Reservation creation time","type":"`$STRING`","index$":1},{"active":true,"format":"date-time","name":"expires_at","req":false,"short":"Reservation expiration time","type":"`$STRING`","index$":2},{"active":true,"name":"reservation_id","req":false,"short":"Reservation identifier","type":"`$STRING`","index$":3},{"active":true,"name":"status","req":false,"short":"Current reservation status","type":"`$STRING`","index$":4}],"name":"reservation_status","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"reservation_id","orig":"reservation_id","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /reservation/status","json":"{\"operationId\":\"getReservationStatus\",\"parameters\":[{\"description\":\"ID of the reservation to check\",\"in\":\"query\",\"name\":\"reservation_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bike_number\":{\"description\":\"Reserved bike number\",\"type\":\"string\"},\"created_at\":{\"description\":\"Reservation creation time\",\"format\":\"date-time\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Reservation expiration time\",\"format\":\"date-time\",\"type\":\"string\"},\"reservation_id\":{\"description\":\"Reservation identifier\",\"type\":\"string\"},\"status\":{\"description\":\"Current reservation status\",\"enum\":[\"active\",\"expired\",\"cancelled\",\"completed\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Reservation status retrieved successfully\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"description\":\"Reservation not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for accessing restricted endpoints\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/reservation/status","segments":[{"lit":"reservation"},{"lit":"status"}],"select":{"exist":["reservation_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"reservation_status","name__orig":"reservation_status","Name":"ReservationStatus","name_":"reservation_status","name-":"reservation-status","NAME":"RESERVATION_STATUS","index$":3}, {"active":true,"entity":"reservation_status","key$":"BasicReservationStatusFlow","kind":"basic","name":"BasicReservationStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"reservation_status_ref01","srcdatavar":"reservation_status_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-reservation_status_ref01"}}],"index$":0}]}, 'ReservationStatus')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let reservation_status_ref01_data = Object.values(setup.data.existing.reservation_status)[0] as any

    // LOAD
    const reservation_status_ref01_ent = client.ReservationStatus()
    const reservation_status_ref01_match_dt0: any = {}
    const reservation_status_ref01_data_dt0 = (await reservation_status_ref01_ent.load(reservation_status_ref01_match_dt0)).data()
    assert(null != reservation_status_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/reservation_status/ReservationStatusTestData.json')

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
    ['reservation_status01','reservation_status02','reservation_status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXTBIKE_TEST_RESERVATION_STATUS_ENTID': idmap,
    'NEXTBIKE_TEST_LIVE': 'FALSE',
    'NEXTBIKE_TEST_EXPLAIN': 'FALSE',
    'NEXTBIKE_APIKEY': '',
  })

  idmap = env['NEXTBIKE_TEST_RESERVATION_STATUS_ENTID']

  const live = 'TRUE' === env.NEXTBIKE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXTBIKE_TEST_RESERVATION_STATUS_ENTID']
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
  
