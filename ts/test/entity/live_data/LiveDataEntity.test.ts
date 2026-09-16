

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


describe('LiveDataEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when NEXTBIKE_TEST_LIVE=TRUE.
  afterEach(liveDelay('NEXTBIKE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = NextbikeSDK.test()
    const ent = testsdk.LiveData()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.NEXTBIKE_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'live_data.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"cities","req":false,"type":"`$ARRAY`","index$":0},{"active":true,"name":"country","req":false,"short":"Country code","type":"`$STRING`","index$":1},{"active":true,"name":"country_name","req":false,"short":"Full country name","type":"`$STRING`","index$":2},{"active":true,"name":"domain","req":false,"short":"Country domain","type":"`$STRING`","index$":3},{"active":true,"name":"hotline","req":false,"short":"Support hotline number","type":"`$STRING`","index$":4},{"active":true,"format":"double","name":"lat","req":false,"short":"Country center latitude","type":"`$NUMBER`","index$":5},{"active":true,"format":"double","name":"lng","req":false,"short":"Country center longitude","type":"`$NUMBER`","index$":6},{"active":true,"name":"name","req":false,"short":"Country name","type":"`$STRING`","index$":7},{"active":true,"name":"policy","req":false,"short":"Privacy policy URL","type":"`$STRING`","index$":8},{"active":true,"name":"terms","req":false,"short":"Terms and conditions URL","type":"`$STRING`","index$":9},{"active":true,"name":"website","req":false,"short":"Website URL","type":"`$STRING`","index$":10},{"active":true,"name":"zoom","req":false,"short":"Default zoom level","type":"`$INTEGER`","index$":11}],"name":"live_data","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"city","orig":"city","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":5000,"kind":"query","name":"distance","orig":"distance","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"lat","orig":"lat","reqd":false,"type":"`$NUMBER`","index$":2},{"active":true,"kind":"query","name":"lng","orig":"lng","reqd":false,"type":"`$NUMBER`","index$":3}]},"contract":{"id":"GET /maps/nextbike-live.json","json":"{\"operationId\":\"getLiveData\",\"parameters\":[{\"description\":\"Filter by city ID\",\"in\":\"query\",\"name\":\"city\",\"required\":false,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Latitude for geographic filtering\",\"in\":\"query\",\"name\":\"lat\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Longitude for geographic filtering\",\"in\":\"query\",\"name\":\"lng\",\"required\":false,\"schema\":{\"format\":\"double\",\"type\":\"number\"}},{\"description\":\"Search radius in meters when using lat/lng\",\"in\":\"query\",\"name\":\"distance\",\"required\":false,\"schema\":{\"default\":5000,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"countries\":{\"items\":{\"properties\":{\"cities\":{\"items\":{\"properties\":{\"alias\":{\"description\":\"City alias\",\"type\":\"string\"},\"available_bikes\":{\"description\":\"Number of available bikes\",\"type\":\"integer\"},\"booked_bikes\":{\"description\":\"Number of currently booked bikes\",\"type\":\"integer\"},\"bounds\":{\"properties\":{\"north_east\":{\"properties\":{\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"south_west\":{\"properties\":{\"lat\":{\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"}},\"type\":\"object\"},\"break\":{\"description\":\"Service break status\",\"type\":\"boolean\"},\"lat\":{\"description\":\"City center latitude\",\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"City center longitude\",\"format\":\"double\",\"type\":\"number\"},\"maps_icon\":{\"description\":\"Icon URL for maps\",\"type\":\"string\"},\"name\":{\"description\":\"City name\",\"type\":\"string\"},\"num_places\":{\"description\":\"Number of stations\",\"type\":\"integer\"},\"places\":{\"items\":{\"properties\":{\"bike_list\":{\"items\":{\"properties\":{\"active\":{\"description\":\"Bike is active\",\"type\":\"boolean\"},\"bike_type\":{\"description\":\"Type of bike\",\"type\":\"integer\"},\"boardcomputer\":{\"description\":\"Board computer identifier\",\"type\":\"integer\"},\"electric_lock\":{\"description\":\"Has electric lock\",\"type\":\"boolean\"},\"lock_types\":{\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"number\":{\"description\":\"Bike number\",\"type\":\"string\"},\"state\":{\"description\":\"Current state of the bike\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"bike_racks\":{\"description\":\"Total bike rack capacity\",\"type\":\"integer\"},\"bikes\":{\"description\":\"Number of available bikes\",\"type\":\"integer\"},\"bikes_available_to_rent\":{\"description\":\"Bikes available for rental\",\"type\":\"integer\"},\"free_racks\":{\"description\":\"Number of free racks\",\"type\":\"integer\"},\"lat\":{\"description\":\"Station latitude\",\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Station longitude\",\"format\":\"double\",\"type\":\"number\"},\"maintenance\":{\"description\":\"Station under maintenance\",\"type\":\"boolean\"},\"name\":{\"description\":\"Station name\",\"type\":\"string\"},\"number\":{\"description\":\"Station number\",\"type\":\"integer\"},\"spot\":{\"description\":\"Is flex zone/spot\",\"type\":\"boolean\"},\"terminal_type\":{\"description\":\"Type of terminal\",\"type\":\"string\"},\"uid\":{\"description\":\"Unique station identifier\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"refresh_rate\":{\"description\":\"Data refresh rate in seconds\",\"type\":\"integer\"},\"set_point_bikes\":{\"description\":\"Target number of bikes\",\"type\":\"integer\"},\"uid\":{\"description\":\"Unique city identifier\",\"type\":\"integer\"},\"zoom\":{\"description\":\"Default zoom level\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"country\":{\"description\":\"Country code\",\"type\":\"string\"},\"country_name\":{\"description\":\"Full country name\",\"type\":\"string\"},\"domain\":{\"description\":\"Country domain\",\"type\":\"string\"},\"hotline\":{\"description\":\"Support hotline number\",\"type\":\"string\"},\"lat\":{\"description\":\"Country center latitude\",\"format\":\"double\",\"type\":\"number\"},\"lng\":{\"description\":\"Country center longitude\",\"format\":\"double\",\"type\":\"number\"},\"name\":{\"description\":\"Country name\",\"type\":\"string\"},\"policy\":{\"description\":\"Privacy policy URL\",\"type\":\"string\"},\"terms\":{\"description\":\"Terms and conditions URL\",\"type\":\"string\"},\"website\":{\"description\":\"Website URL\",\"type\":\"string\"},\"zoom\":{\"description\":\"Default zoom level\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with live bike sharing data\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"description\":\"Internal server error\"}},\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for accessing restricted endpoints\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/maps/nextbike-live.json","segments":[{"lit":"maps"},{"lit":"nextbike-live.json"}],"select":{"exist":["city","distance","lat","lng"]},"transform":{"req":"`reqdata`","res":"`body.countries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"live_data","name__orig":"live_data","Name":"LiveData","name_":"live_data","name-":"live-data","NAME":"LIVE_DATA","index$":0}, {"active":true,"entity":"live_data","key$":"BasicLiveDataFlow","kind":"basic","name":"BasicLiveDataFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"live_data_ref01"}}],"index$":0}]}, 'LiveData')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let live_data_ref01_data = Object.values(setup.data.existing.live_data)[0] as any

    // LIST
    const live_data_ref01_ent = client.LiveData()
    const live_data_ref01_match: any = {}

    const live_data_ref01_list = (await live_data_ref01_ent.list(live_data_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/live_data/LiveDataTestData.json')

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
    ['live_data01','live_data02','live_data03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'NEXTBIKE_TEST_LIVE_DATA_ENTID': idmap,
    'NEXTBIKE_TEST_LIVE': 'FALSE',
    'NEXTBIKE_TEST_EXPLAIN': 'FALSE',
    'NEXTBIKE_APIKEY': '',
  })

  idmap = env['NEXTBIKE_TEST_LIVE_DATA_ENTID']

  const live = 'TRUE' === env.NEXTBIKE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['NEXTBIKE_TEST_LIVE_DATA_ENTID']
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
  
