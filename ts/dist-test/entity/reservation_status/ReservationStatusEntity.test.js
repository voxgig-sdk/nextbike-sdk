"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ReservationStatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when NEXTBIKE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('NEXTBIKE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.NextbikeSDK.test();
        const ent = testsdk.ReservationStatus();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.NEXTBIKE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'reservation_status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "bike_number", "req": false, "short": "Reserved bike number", "type": "`$STRING`", "index$": 0 }, { "active": true, "format": "date-time", "name": "created_at", "req": false, "short": "Reservation creation time", "type": "`$STRING`", "index$": 1 }, { "active": true, "format": "date-time", "name": "expires_at", "req": false, "short": "Reservation expiration time", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "reservation_id", "req": false, "short": "Reservation identifier", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "status", "req": false, "short": "Current reservation status", "type": "`$STRING`", "index$": 4 }], "name": "reservation_status", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "reservation_id", "orig": "reservation_id", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /reservation/status", "json": "{\"operationId\":\"getReservationStatus\",\"parameters\":[{\"description\":\"ID of the reservation to check\",\"in\":\"query\",\"name\":\"reservation_id\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"bike_number\":{\"description\":\"Reserved bike number\",\"type\":\"string\"},\"created_at\":{\"description\":\"Reservation creation time\",\"format\":\"date-time\",\"type\":\"string\"},\"expires_at\":{\"description\":\"Reservation expiration time\",\"format\":\"date-time\",\"type\":\"string\"},\"reservation_id\":{\"description\":\"Reservation identifier\",\"type\":\"string\"},\"status\":{\"description\":\"Current reservation status\",\"enum\":[\"active\",\"expired\",\"cancelled\",\"completed\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Reservation status retrieved successfully\"},\"400\":{\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"description\":\"Unauthorized - Invalid or missing API key\"},\"404\":{\"description\":\"Reservation not found\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for accessing restricted endpoints\",\"in\":\"query\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/reservation/status", "segments": [{ "lit": "reservation" }, { "lit": "status" }], "select": { "exist": ["reservation_id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "reservation_status", "name__orig": "reservation_status", "Name": "ReservationStatus", "name_": "reservation_status", "name-": "reservation-status", "NAME": "RESERVATION_STATUS", "index$": 3 }, { "active": true, "entity": "reservation_status", "key$": "BasicReservationStatusFlow", "kind": "basic", "name": "BasicReservationStatusFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "reservation_status_ref01", "srcdatavar": "reservation_status_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-reservation_status_ref01" } }], "index$": 0 }] }, 'ReservationStatus');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let reservation_status_ref01_data = Object.values(setup.data.existing.reservation_status)[0];
        // LOAD
        const reservation_status_ref01_ent = client.ReservationStatus();
        const reservation_status_ref01_match_dt0 = {};
        const reservation_status_ref01_data_dt0 = (await reservation_status_ref01_ent.load(reservation_status_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != reservation_status_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/reservation_status/ReservationStatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.NextbikeSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['reservation_status01', 'reservation_status02', 'reservation_status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'NEXTBIKE_TEST_RESERVATION_STATUS_ENTID': idmap,
        'NEXTBIKE_TEST_LIVE': 'FALSE',
        'NEXTBIKE_TEST_EXPLAIN': 'FALSE',
        'NEXTBIKE_APIKEY': '',
    });
    idmap = env['NEXTBIKE_TEST_RESERVATION_STATUS_ENTID'];
    const live = 'TRUE' === env.NEXTBIKE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['NEXTBIKE_TEST_RESERVATION_STATUS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.NextbikeSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=ReservationStatusEntity.test.js.map