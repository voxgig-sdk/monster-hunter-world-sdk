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
(0, node_test_1.describe)('WeaponEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MONSTER_HUNTER_WORLD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MonsterHunterWorldSDK.test();
        const ent = testsdk.Weapon();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'weapon.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "assets", "req": false, "short": "Asset URLs for the weapon", "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "attack", "req": false, "short": "Attack values for the weapon", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "attributes", "req": false, "short": "Additional weapon attributes", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "crafting", "req": false, "short": "Crafting information for the weapon", "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "damageType", "req": false, "short": "The damage type of the weapon", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "elements", "req": false, "short": "Elemental damage information", "type": "`$ARRAY`", "index$": 5 }, { "active": true, "name": "id", "req": false, "short": "The ID of the weapon", "type": "`$INTEGER`", "index$": 6 }, { "active": true, "name": "name", "req": false, "short": "The name of the weapon", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "rarity", "req": false, "short": "The rarity of the weapon", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "slots", "req": false, "short": "An array of decoration slot information", "type": "`$ARRAY`", "index$": 9 }, { "active": true, "name": "type", "req": false, "short": "The type of weapon", "type": "`$STRING`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "weapon", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /weapons", "json": "{\"operationId\":\"getAllWeapons\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"assets\":{\"description\":\"Asset URLs for the weapon\",\"properties\":{\"icon\":{\"nullable\":true,\"type\":\"string\"},\"image\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attack\":{\"description\":\"Attack values for the weapon\",\"properties\":{\"display\":{\"type\":\"integer\"},\"raw\":{\"type\":\"integer\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Additional weapon attributes\",\"type\":\"object\"},\"crafting\":{\"description\":\"Crafting information for the weapon\",\"properties\":{\"branches\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"craftable\":{\"type\":\"boolean\"},\"craftingMaterials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"previous\":{\"nullable\":true,\"type\":\"integer\"},\"upgradeMaterials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"damageType\":{\"description\":\"The damage type of the weapon\",\"type\":\"string\"},\"elements\":{\"description\":\"Elemental damage information\",\"items\":{\"properties\":{\"damage\":{\"type\":\"integer\"},\"hidden\":{\"type\":\"boolean\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the weapon\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the weapon\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the weapon\",\"type\":\"integer\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The type of weapon\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/weapons", "segments": [{ "lit": "weapons" }], "select": { "exist": ["p", "q"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /weapons/{id}", "json": "{\"operationId\":\"getWeaponById\",\"parameters\":[{\"description\":\"The ID of the weapon to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"assets\":{\"description\":\"Asset URLs for the weapon\",\"properties\":{\"icon\":{\"nullable\":true,\"type\":\"string\"},\"image\":{\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attack\":{\"description\":\"Attack values for the weapon\",\"properties\":{\"display\":{\"type\":\"integer\"},\"raw\":{\"type\":\"integer\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Additional weapon attributes\",\"type\":\"object\"},\"crafting\":{\"description\":\"Crafting information for the weapon\",\"properties\":{\"branches\":{\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"craftable\":{\"type\":\"boolean\"},\"craftingMaterials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"previous\":{\"nullable\":true,\"type\":\"integer\"},\"upgradeMaterials\":{\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"damageType\":{\"description\":\"The damage type of the weapon\",\"type\":\"string\"},\"elements\":{\"description\":\"Elemental damage information\",\"items\":{\"properties\":{\"damage\":{\"type\":\"integer\"},\"hidden\":{\"type\":\"boolean\"},\"type\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the weapon\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the weapon\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the weapon\",\"type\":\"integer\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The type of weapon\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Weapon not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/weapons/{id}", "segments": [{ "lit": "weapons" }, { "var": "id" }], "select": { "exist": ["id", "p"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weapon", "name__orig": "weapon", "Name": "Weapon", "name_": "weapon", "name-": "weapon", "NAME": "WEAPON", "index$": 11 }, { "active": true, "entity": "weapon", "key$": "BasicWeaponFlow", "kind": "basic", "name": "BasicWeaponFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "weapon_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "weapon_ref01", "srcdatavar": "weapon_ref01_data", "suffix": "_dt0" }, "match": { "id": "weapon01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weapon_ref01" } }], "index$": 1 }] }, 'Weapon');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let weapon_ref01_data = Object.values(setup.data.existing.weapon)[0];
        // LIST
        const weapon_ref01_ent = client.Weapon();
        const weapon_ref01_match = {};
        const weapon_ref01_list = (await weapon_ref01_ent.list(weapon_ref01_match)).map((e) => e.data());
        // LOAD
        const weapon_ref01_match_dt0 = {};
        weapon_ref01_match_dt0.id = weapon_ref01_data.id;
        const weapon_ref01_data_dt0 = (await weapon_ref01_ent.load(weapon_ref01_match_dt0)).data();
        (0, node_assert_1.default)(weapon_ref01_data_dt0.id === weapon_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/weapon/WeaponTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MonsterHunterWorldSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['weapon01', 'weapon02', 'weapon03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID': idmap,
        'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
        'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID'];
    const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_WEAPON_ENTID'];
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
//# sourceMappingURL=WeaponEntity.test.js.map