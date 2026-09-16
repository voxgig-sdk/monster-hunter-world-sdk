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
(0, node_test_1.describe)('ArmorEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MONSTER_HUNTER_WORLD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MonsterHunterWorldSDK.test();
        const ent = testsdk.Armor();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'armor.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "armorSet", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "assets", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "attributes", "req": false, "short": "Dictionary of attribute modifiers attached to the armor piece", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "crafting", "req": false, "type": "`$OBJECT`", "index$": 3 }, { "active": true, "name": "defense", "req": false, "type": "`$OBJECT`", "index$": 4 }, { "active": true, "name": "id", "req": false, "short": "The ID of the armor piece", "type": "`$INTEGER`", "index$": 5 }, { "active": true, "name": "name", "req": false, "short": "The name of the armor piece", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "rank", "req": false, "short": "The rank of the armor piece", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "rarity", "req": false, "short": "The rarity of the armor piece", "type": "`$INTEGER`", "index$": 8 }, { "active": true, "name": "resistances", "req": false, "type": "`$OBJECT`", "index$": 9 }, { "active": true, "name": "skills", "req": false, "short": "An array of skill ranks granted by the armor", "type": "`$ARRAY`", "index$": 10 }, { "active": true, "name": "slots", "req": false, "short": "An array of decoration slot information", "type": "`$ARRAY`", "index$": 11 }, { "active": true, "name": "type", "req": false, "short": "The slot the armor piece fits in", "type": "`$STRING`", "index$": 12 }], "id": { "field": "id", "name": "id" }, "name": "armor", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /armor", "json": "{\"operationId\":\"getAllArmor\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"armorSet\":{\"properties\":{\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"An array of IDs of all armor pieces in the set\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"},\"assets\":{\"properties\":{\"imageFemale\":{\"description\":\"URL to the female preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"},\"imageMale\":{\"description\":\"URL to the male preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Dictionary of attribute modifiers attached to the armor piece\",\"type\":\"object\"},\"crafting\":{\"properties\":{\"materials\":{\"description\":\"An array of crafting material costs\",\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"defense\":{\"properties\":{\"augmented\":{\"description\":\"The armor's defense value when augmented\",\"type\":\"integer\"},\"base\":{\"description\":\"The armor's base defense value\",\"type\":\"integer\"},\"max\":{\"description\":\"The armor's defense value at max level\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor piece\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor piece\",\"type\":\"string\"},\"rank\":{\"description\":\"The rank of the armor piece\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the armor piece\",\"type\":\"integer\"},\"resistances\":{\"properties\":{\"dragon\":{\"description\":\"The armor's dragon resistance\",\"type\":\"integer\"},\"fire\":{\"description\":\"The armor's fire resistance\",\"type\":\"integer\"},\"ice\":{\"description\":\"The armor's ice resistance\",\"type\":\"integer\"},\"thunder\":{\"description\":\"The armor's thunder resistance\",\"type\":\"integer\"},\"water\":{\"description\":\"The armor's water resistance\",\"type\":\"integer\"}},\"type\":\"object\"},\"skills\":{\"description\":\"An array of skill ranks granted by the armor\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The slot the armor piece fits in\",\"enum\":[\"head\",\"chest\",\"gloves\",\"waist\",\"legs\"],\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/armor", "segments": [{ "lit": "armor" }], "select": { "exist": ["p", "q"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /armor/{id}", "json": "{\"operationId\":\"getArmorById\",\"parameters\":[{\"description\":\"The ID of the armor piece to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"armorSet\":{\"properties\":{\"id\":{\"description\":\"The ID of the armor set\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor set\",\"type\":\"string\"},\"pieces\":{\"description\":\"An array of IDs of all armor pieces in the set\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"rank\":{\"description\":\"The rank of the armor set\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"}},\"type\":\"object\"},\"assets\":{\"properties\":{\"imageFemale\":{\"description\":\"URL to the female preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"},\"imageMale\":{\"description\":\"URL to the male preview image, or null if one does not exist\",\"nullable\":true,\"type\":\"string\"}},\"type\":\"object\"},\"attributes\":{\"description\":\"Dictionary of attribute modifiers attached to the armor piece\",\"type\":\"object\"},\"crafting\":{\"properties\":{\"materials\":{\"description\":\"An array of crafting material costs\",\"items\":{\"properties\":{\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"quantity\":{\"description\":\"The quantity of the item required\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"defense\":{\"properties\":{\"augmented\":{\"description\":\"The armor's defense value when augmented\",\"type\":\"integer\"},\"base\":{\"description\":\"The armor's base defense value\",\"type\":\"integer\"},\"max\":{\"description\":\"The armor's defense value at max level\",\"type\":\"integer\"}},\"type\":\"object\"},\"id\":{\"description\":\"The ID of the armor piece\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the armor piece\",\"type\":\"string\"},\"rank\":{\"description\":\"The rank of the armor piece\",\"enum\":[\"low\",\"high\"],\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the armor piece\",\"type\":\"integer\"},\"resistances\":{\"properties\":{\"dragon\":{\"description\":\"The armor's dragon resistance\",\"type\":\"integer\"},\"fire\":{\"description\":\"The armor's fire resistance\",\"type\":\"integer\"},\"ice\":{\"description\":\"The armor's ice resistance\",\"type\":\"integer\"},\"thunder\":{\"description\":\"The armor's thunder resistance\",\"type\":\"integer\"},\"water\":{\"description\":\"The armor's water resistance\",\"type\":\"integer\"}},\"type\":\"object\"},\"skills\":{\"description\":\"An array of skill ranks granted by the armor\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"slots\":{\"description\":\"An array of decoration slot information\",\"items\":{\"properties\":{\"rank\":{\"description\":\"The rank of the decoration slot\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"type\":{\"description\":\"The slot the armor piece fits in\",\"enum\":[\"head\",\"chest\",\"gloves\",\"waist\",\"legs\"],\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Armor piece not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/armor/{id}", "segments": [{ "lit": "armor" }, { "var": "id" }], "select": { "exist": ["id", "p"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "armor", "name__orig": "armor", "Name": "Armor", "name_": "armor", "name-": "armor", "NAME": "ARMOR", "index$": 1 }, { "active": true, "entity": "armor", "key$": "BasicArmorFlow", "kind": "basic", "name": "BasicArmorFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "armor_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "armor_ref01", "srcdatavar": "armor_ref01_data", "suffix": "_dt0" }, "match": { "id": "armor01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-armor_ref01" } }], "index$": 1 }] }, 'Armor');
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