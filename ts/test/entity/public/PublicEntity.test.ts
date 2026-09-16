

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


describe('PublicEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXTBIKE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXTBIKE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NextbikeSDK.test()
    const ent = testsdk.Public()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXTBIKE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'public.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"public","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"city","orig":"city","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":5000,"kind":"query","name":"distance","orig":"distance","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"lat","orig":"lat","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"lng","orig":"lng","reqd":false,"type":"`$NUMBER`","index$":3}]},"contract":{"id":"GET /maps/nextbike-live.xml","json":"{\"operationId\":\"getLiveDataXML\",\"parameters\":[{\"description\":\"Filter by city ID\",\"in\":\"query\",\"name\":\"city\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Latitude for geographic filtering\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Longitude for geographic filtering\",\"in\":\"query\",\"name\":\"lng\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Search radius in meters when using lat/lng\",\"in\":\"query\",\"name\":\"distance\",\"required\":false,\"schema\":{\"default\":5000,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/xml\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response with live bike sharing data in XML format\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for accessing restricted endpoints\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/maps/nextbike-live.xml","segments":[{"lit":"maps"},{"lit":"nextbike-live.xml"}],"select":{"exist":["city","distance","lat","lng"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"public","name__orig":"public","Name":"Public","name_":"public","name-":"public","NAME":"PUBLIC","index$":1}, {"active":true,"entity":"public","key$":"BasicPublicFlow","kind":"basic","name":"BasicPublicFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"public_ref01","srcdatavar":"public_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-public_ref01"}}],"index$":0}]}, 'Public')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let public_ref01_data = Object.values(setup.data.existing.public)[0] as any

    // LOAD
    const public_ref01_ent = client.Public()
    const public_ref01_match_dt0: any = {}
    const public_ref01_data_dt0 = (await public_ref01_ent.load(public_ref01_match_dt0)).data()
    assert(null != public_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/public/PublicTestData.json')

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
    ['public01','public02','public03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXTBIKE_TEST_PUBLIC_ENTID': idmap,
    'NEXTBIKE_TEST_LIVE': 'FALSE',
    'NEXTBIKE_TEST_EXPLAIN': 'FALSE',
    'NEXTBIKE_APIKEY': '',
  })

  idmap = env['NEXTBIKE_TEST_PUBLIC_ENTID']

  const live = 'TRUE' === env.NEXTBIKE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXTBIKE_TEST_PUBLIC_ENTID']
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
  
