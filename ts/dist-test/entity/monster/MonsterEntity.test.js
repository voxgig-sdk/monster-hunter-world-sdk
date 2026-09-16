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
(0, node_test_1.describe)('MonsterEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('MONSTER_HUNTER_WORLD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.MonsterHunterWorldSDK.test();
        const ent = testsdk.Monster();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.MONSTER_HUNTER_WORLD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'monster.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "ailments", "req": false, "short": "Ailments the monster can inflict", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "A description of the monster", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "elements", "req": false, "short": "Elements the monster uses", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "id", "req": false, "short": "The ID of the monster", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "locations", "req": false, "short": "Locations where the monster can be found", "type": "`$ARRAY`", "index$": 4 }, { "active": true, "name": "name", "req": false, "short": "The name of the monster", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "resistances", "req": false, "short": "Resistances of the monster", "type": "`$ARRAY`", "index$": 6 }, { "active": true, "name": "rewards", "req": false, "short": "Rewards obtained from the monster", "type": "`$ARRAY`", "index$": 7 }, { "active": true, "name": "species", "req": false, "short": "The species of the monster", "type": "`$STRING`", "index$": 8 }, { "active": true, "name": "type", "req": false, "short": "The type of monster", "type": "`$STRING`", "index$": 9 }, { "active": true, "name": "weaknesses", "req": false, "short": "Weaknesses of the monster", "type": "`$ARRAY`", "index$": 10 }], "id": { "field": "id", "name": "id" }, "name": "monster", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "kind": "query", "name": "q", "orig": "q", "reqd": false, "type": "`$STRING`", "index$": 1 }] }, "contract": { "id": "GET /monsters", "json": "{\"operationId\":\"getAllMonsters\",\"parameters\":[{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}},{\"description\":\"Query parameter for searching\",\"in\":\"query\",\"name\":\"q\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"ailments\":{\"description\":\"Ailments the monster can inflict\",\"items\":{\"properties\":{\"description\":{\"description\":\"A short description of the ailment\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the ailment\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the ailment\",\"type\":\"string\"},\"protection\":{\"properties\":{\"items\":{\"description\":\"An array of items that can prevent the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"skills\":{\"description\":\"An array of skills that can prevent the ailment\",\"items\":{\"properties\":{\"description\":{\"description\":\"A description of the skill\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the skill\",\"type\":\"string\"},\"ranks\":{\"description\":\"An array of skill ranks\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"recovery\":{\"properties\":{\"actions\":{\"description\":\"An array of actions that can be taken to remove the ailment\",\"items\":{\"enum\":[\"crouch\",\"dodge\"],\"type\":\"string\"},\"type\":\"array\"},\"items\":{\"description\":\"An array of items that can remove the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A description of the monster\",\"type\":\"string\"},\"elements\":{\"description\":\"Elements the monster uses\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the monster\",\"type\":\"integer\"},\"locations\":{\"description\":\"Locations where the monster can be found\",\"items\":{\"properties\":{\"camps\":{\"description\":\"An array of camps in the location\",\"items\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"zone\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the location\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the location\",\"type\":\"string\"},\"zoneCount\":{\"description\":\"The number of zones in the location\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the monster\",\"type\":\"string\"},\"resistances\":{\"description\":\"Resistances of the monster\",\"items\":{\"properties\":{\"condition\":{\"nullable\":true,\"type\":\"string\"},\"element\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"rewards\":{\"description\":\"Rewards obtained from the monster\",\"items\":{\"properties\":{\"conditions\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"species\":{\"description\":\"The species of the monster\",\"type\":\"string\"},\"type\":{\"description\":\"The type of monster\",\"type\":\"string\"},\"weaknesses\":{\"description\":\"Weaknesses of the monster\",\"items\":{\"properties\":{\"condition\":{\"nullable\":true,\"type\":\"string\"},\"element\":{\"type\":\"string\"},\"stars\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/monsters", "segments": [{ "lit": "monsters" }], "select": { "exist": ["p", "q"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }], "query": [{ "active": true, "kind": "query", "name": "p", "orig": "p", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /monsters/{id}", "json": "{\"operationId\":\"getMonsterById\",\"parameters\":[{\"description\":\"The ID of the monster to retrieve\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}},{\"description\":\"Projection parameter for filtering returned fields\",\"in\":\"query\",\"name\":\"p\",\"required\":false,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"ailments\":{\"description\":\"Ailments the monster can inflict\",\"items\":{\"properties\":{\"description\":{\"description\":\"A short description of the ailment\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the ailment\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the ailment\",\"type\":\"string\"},\"protection\":{\"properties\":{\"items\":{\"description\":\"An array of items that can prevent the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"skills\":{\"description\":\"An array of skills that can prevent the ailment\",\"items\":{\"properties\":{\"description\":{\"description\":\"A description of the skill\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the skill\",\"type\":\"string\"},\"ranks\":{\"description\":\"An array of skill ranks\",\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the skill at this level\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the skill rank\",\"type\":\"integer\"},\"level\":{\"description\":\"The level of the skill\",\"type\":\"integer\"},\"modifiers\":{\"description\":\"Array of modifiers for the skill\",\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"skill\":{\"description\":\"The skill ID reference\",\"type\":\"integer\"},\"skillName\":{\"description\":\"The name of the skill\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},\"recovery\":{\"properties\":{\"actions\":{\"description\":\"An array of actions that can be taken to remove the ailment\",\"items\":{\"enum\":[\"crouch\",\"dodge\"],\"type\":\"string\"},\"type\":\"array\"},\"items\":{\"description\":\"An array of items that can remove the ailment\",\"items\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"description\":{\"description\":\"A description of the monster\",\"type\":\"string\"},\"elements\":{\"description\":\"Elements the monster uses\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the monster\",\"type\":\"integer\"},\"locations\":{\"description\":\"Locations where the monster can be found\",\"items\":{\"properties\":{\"camps\":{\"description\":\"An array of camps in the location\",\"items\":{\"properties\":{\"id\":{\"type\":\"integer\"},\"name\":{\"type\":\"string\"},\"zone\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"description\":\"The ID of the location\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the location\",\"type\":\"string\"},\"zoneCount\":{\"description\":\"The number of zones in the location\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"name\":{\"description\":\"The name of the monster\",\"type\":\"string\"},\"resistances\":{\"description\":\"Resistances of the monster\",\"items\":{\"properties\":{\"condition\":{\"nullable\":true,\"type\":\"string\"},\"element\":{\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"rewards\":{\"description\":\"Rewards obtained from the monster\",\"items\":{\"properties\":{\"conditions\":{\"items\":{\"type\":\"object\"},\"type\":\"array\"},\"id\":{\"type\":\"integer\"},\"item\":{\"properties\":{\"buyPrice\":{\"description\":\"The price when buying the item\",\"type\":\"integer\"},\"carryLimit\":{\"description\":\"The maximum number of this item that can be carried\",\"type\":\"integer\"},\"description\":{\"description\":\"A description of the item\",\"type\":\"string\"},\"id\":{\"description\":\"The ID of the item\",\"type\":\"integer\"},\"name\":{\"description\":\"The name of the item\",\"type\":\"string\"},\"rarity\":{\"description\":\"The rarity of the item\",\"type\":\"integer\"},\"sellPrice\":{\"description\":\"The price when selling the item\",\"type\":\"integer\"},\"value\":{\"description\":\"The value of the item\",\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},\"type\":\"array\"},\"species\":{\"description\":\"The species of the monster\",\"type\":\"string\"},\"type\":{\"description\":\"The type of monster\",\"type\":\"string\"},\"weaknesses\":{\"description\":\"Weaknesses of the monster\",\"items\":{\"properties\":{\"condition\":{\"nullable\":true,\"type\":\"string\"},\"element\":{\"type\":\"string\"},\"stars\":{\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Monster not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/monsters/{id}", "segments": [{ "lit": "monsters" }, { "var": "id" }], "select": { "exist": ["id", "p"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "monster", "name__orig": "monster", "Name": "Monster", "name_": "monster", "name-": "monster", "NAME": "MONSTER", "index$": 8 }, { "active": true, "entity": "monster", "key$": "BasicMonsterFlow", "kind": "basic", "name": "BasicMonsterFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "monster_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "monster_ref01", "srcdatavar": "monster_ref01_data", "suffix": "_dt0" }, "match": { "id": "monster01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-monster_ref01" } }], "index$": 1 }] }, 'Monster');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let monster_ref01_data = Object.values(setup.data.existing.monster)[0];
        // LIST
        const monster_ref01_ent = client.Monster();
        const monster_ref01_match = {};
        const monster_ref01_list = (await monster_ref01_ent.list(monster_ref01_match)).map((e) => e.data());
        // LOAD
        const monster_ref01_match_dt0 = {};
        monster_ref01_match_dt0.id = monster_ref01_data.id;
        const monster_ref01_data_dt0 = (await monster_ref01_ent.load(monster_ref01_match_dt0)).data();
        (0, node_assert_1.default)(monster_ref01_data_dt0.id === monster_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/monster/MonsterTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.MonsterHunterWorldSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['monster01', 'monster02', 'monster03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID': idmap,
        'MONSTER_HUNTER_WORLD_TEST_LIVE': 'FALSE',
        'MONSTER_HUNTER_WORLD_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID'];
    const live = 'TRUE' === env.MONSTER_HUNTER_WORLD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['MONSTER_HUNTER_WORLD_TEST_MONSTER_ENTID'];
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
//# sourceMappingURL=MonsterEntity.test.js.map