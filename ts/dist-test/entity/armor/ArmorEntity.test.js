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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('ArmorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MONSTER_HUNTER_WORLD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MonsterHunterWorldSDK.test();
        const ent = testsdk.Armor();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('armor hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.MonsterHunterWorldSDK.test(offline).Armor().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.MonsterHunterWorldSDK.test(offline).Armor()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.MonsterHunterWorldSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Armor().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.MonsterHunterWorldSDK.test().Armor().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.MonsterHunterWorldSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Armor().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Armor().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.MonsterHunterWorldSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Armor().list({ "p": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'armor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "armorSet": { "a": true, "h": "Armor Set", "n": "armorSet", "r": false, "t": "`$OBJECT`", "key$": "armorSet", "index$": 0 }, "assets": { "a": true, "h": "Assets", "n": "assets", "r": false, "t": "`$OBJECT`", "key$": "assets", "index$": 1 }, "attributes": { "a": true, "h": "Attributes", "n": "attributes", "r": false, "sh": "Dictionary of attribute modifiers attached to the armor piece", "t": "`$OBJECT`", "key$": "attributes", "index$": 2 }, "crafting": { "a": true, "h": "Crafting", "n": "crafting", "r": false, "t": "`$OBJECT`", "key$": "crafting", "index$": 3 }, "defense": { "a": true, "h": "Defense", "n": "defense", "r": false, "t": "`$OBJECT`", "key$": "defense", "index$": 4 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The ID of the armor piece", "t": "`$INTEGER`", "key$": "id", "index$": 5 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the armor piece", "t": "`$STRING`", "key$": "name", "index$": 6 }, "rank": { "a": true, "h": "Rank", "n": "rank", "r": false, "sh": "The rank of the armor piece", "t": "`$STRING`", "key$": "rank", "index$": 7 }, "rarity": { "a": true, "h": "Rarity", "n": "rarity", "r": false, "sh": "The rarity of the armor piece", "t": "`$INTEGER`", "key$": "rarity", "index$": 8 }, "resistances": { "a": true, "h": "Resistances", "n": "resistances", "r": false, "t": "`$OBJECT`", "key$": "resistances", "index$": 9 }, "skills": { "a": true, "h": "Skills", "n": "skills", "r": false, "sh": "An array of skill ranks granted by the armor", "t": "`$ARRAY`", "key$": "skills", "index$": 10 }, "slots": { "a": true, "h": "Slots", "n": "slots", "r": false, "sh": "An array of decoration slot information", "t": "`$ARRAY`", "key$": "slots", "index$": 11 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The slot the armor piece fits in", "t": "`$STRING`", "key$": "type", "index$": 12 } }, "id": { "field": "id", "name": "id" }, "name": "armor", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /armor", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "p", "or": "p", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/armor", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "armor" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /armor/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "p", "or": "p", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/armor/{id}", "q": { "exist": ["id"] }, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [{ "lit": "armor" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "armor", "name__orig": "armor", "Name": "Armor", "name_": "armor", "name-": "armor", "NAME": "ARMOR", "index$": 1 }, { "active": true, "entity": "armor", "key$": "BasicArmorFlow", "kind": "basic", "name": "BasicArmorFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "armor_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "armor_ref01", "srcdatavar": "armor_ref01_data", "suffix": "_dt0" }, "m": { "id": "armor01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-armor_ref01" } }], "index$": 1 }] }, 'Armor', { "GET /armor": { "protocol": "http", "parameters": [{ "name": "p", "in": "query", "description": "Projection parameter for filtering returned fields", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "q", "in": "query", "description": "Query parameter for searching", "required": false, "schema": { "type": "string" }, "index$": 1 }] }, "GET /armor/{id}": { "protocol": "http", "parameters": [{ "name": "id", "in": "path", "description": "The ID of the armor piece to retrieve", "required": true, "schema": { "type": "integer" }, "index$": 0 }, { "name": "p", "in": "query", "description": "Projection parameter for filtering returned fields", "required": false, "schema": { "type": "string" }, "index$": 1 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let armor_ref01_data = Object.values(setup.data.existing.armor)[0];
        // LIST
        const armor_ref01_ent = client.Armor();
        const armor_ref01_match = {};
        const armor_ref01_list = (await armor_ref01_ent.list(armor_ref01_match)).map((e) => e.data());
        // LOAD
        const armor_ref01_match_dt0 = {};
        armor_ref01_match_dt0.id = armor_ref01_data.id;
        const armor_ref01_data_dt0 = (await armor_ref01_ent.load(armor_ref01_match_dt0)).data();
        (0, node_assert_1.default)(armor_ref01_data_dt0.id === armor_ref01_data.id);
    });
});
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/armor/ArmorTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MonsterHunterWorldSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['armor01', 'armor02', 'armor03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID': idmap,
        'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
        'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID'];
    const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_ARMOR_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.MonsterHunterWorldSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
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
        explain: 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ArmorEntity.test.js.map