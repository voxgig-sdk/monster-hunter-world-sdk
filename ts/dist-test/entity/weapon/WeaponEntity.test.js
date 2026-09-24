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
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "assets": { "a": true, "h": "Assets", "n": "assets", "r": false, "sh": "Asset URLs for the weapon", "t": "`$OBJECT`", "key$": "assets", "index$": 0 }, "attack": { "a": true, "h": "Attack", "n": "attack", "r": false, "sh": "Attack values for the weapon", "t": "`$OBJECT`", "key$": "attack", "index$": 1 }, "attributes": { "a": true, "h": "Attributes", "n": "attributes", "r": false, "sh": "Additional weapon attributes", "t": "`$OBJECT`", "key$": "attributes", "index$": 2 }, "crafting": { "a": true, "h": "Crafting", "n": "crafting", "r": false, "sh": "Crafting information for the weapon", "t": "`$OBJECT`", "key$": "crafting", "index$": 3 }, "damageType": { "a": true, "h": "Damage Type", "n": "damageType", "r": false, "sh": "The damage type of the weapon", "t": "`$STRING`", "key$": "damageType", "index$": 4 }, "elements": { "a": true, "h": "Elements", "n": "elements", "r": false, "sh": "Elemental damage information", "t": "`$ARRAY`", "key$": "elements", "index$": 5 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "The ID of the weapon", "t": "`$INTEGER`", "key$": "id", "index$": 6 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "The name of the weapon", "t": "`$STRING`", "key$": "name", "index$": 7 }, "rarity": { "a": true, "h": "Rarity", "n": "rarity", "r": false, "sh": "The rarity of the weapon", "t": "`$INTEGER`", "key$": "rarity", "index$": 8 }, "slots": { "a": true, "h": "Slots", "n": "slots", "r": false, "sh": "An array of decoration slot information", "t": "`$ARRAY`", "key$": "slots", "index$": 9 }, "type": { "a": true, "h": "Type", "n": "type", "r": false, "sh": "The type of weapon", "t": "`$STRING`", "key$": "type", "index$": 10 } }, "id": { "field": "id", "name": "id" }, "name": "weapon", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /weapons", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "p", "or": "p", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "q", "or": "q", "r": false, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/weapons", "q": { "exist": ["p", "q"] }, "r": {}, "s": [{ "lit": "weapons" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /weapons/{id}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "id", "r": true, "t": "`$INTEGER`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "p", "or": "p", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/weapons/{id}", "q": { "exist": ["id", "p"] }, "r": {}, "s": [{ "lit": "weapons" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "weapon", "name__orig": "weapon", "Name": "Weapon", "name_": "weapon", "name-": "weapon", "NAME": "WEAPON", "index$": 11 }, { "active": true, "entity": "weapon", "key$": "BasicWeaponFlow", "kind": "basic", "name": "BasicWeaponFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "weapon_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "weapon_ref01", "srcdatavar": "weapon_ref01_data", "suffix": "_dt0" }, "m": { "id": "weapon01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-weapon_ref01" } }], "index$": 1 }] }, 'Weapon', { "GET /weapons": { "protocol": "http", "operationId": "getAllWeapons", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the weapon", "key$": "id" }, "name": { "type": "string", "description": "The name of the weapon", "key$": "name" }, "type": { "type": "string", "description": "The type of weapon", "key$": "type" }, "rarity": { "type": "integer", "description": "The rarity of the weapon", "key$": "rarity" }, "attack": { "type": "object", "properties": { "display": { "type": "integer" }, "raw": { "type": "integer" } }, "description": "Attack values for the weapon", "key$": "attack" }, "slots": { "type": "array", "items": { "type": "object", "properties": { "rank": { "type": "integer", "description": "The rank of the decoration slot" } }, "x-ref": "#/components/schemas/Slot" }, "description": "An array of decoration slot information", "key$": "slots" }, "elements": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string" }, "damage": { "type": "integer" }, "hidden": { "type": "boolean" } } }, "description": "Elemental damage information", "key$": "elements" }, "crafting": { "type": "object", "properties": { "craftable": { "type": "boolean" }, "previous": { "type": "integer", "nullable": true }, "branches": { "type": "array", "items": { "type": "integer" } }, "craftingMaterials": { "type": "array", "items": { "type": "object", "properties": { "quantity": { "type": "integer", "description": "The quantity of the item required" }, "item": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the item", "key$": "id" }, "name": { "type": "string", "description": "The name of the item", "key$": "name" }, "description": { "type": "string", "description": "A description of the item", "key$": "description" }, "rarity": { "type": "integer", "description": "The rarity of the item", "key$": "rarity" }, "carryLimit": { "type": "integer", "description": "The maximum number of this item that can be carried", "key$": "carryLimit" }, "sellPrice": { "type": "integer", "description": "The price when selling the item", "key$": "sellPrice" }, "buyPrice": { "type": "integer", "description": "The price when buying the item", "key$": "buyPrice" }, "value": { "type": "integer", "description": "The value of the item", "key$": "value" } }, "x-ref": "#/components/schemas/Item" } }, "x-ref": "#/components/schemas/CraftingCost" } }, "upgradeMaterials": { "type": "array", "items": { "type": "object", "properties": { "quantity": { "type": "integer", "description": "The quantity of the item required" }, "item": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the item", "key$": "id" }, "name": { "type": "string", "description": "The name of the item", "key$": "name" }, "description": { "type": "string", "description": "A description of the item", "key$": "description" }, "rarity": { "type": "integer", "description": "The rarity of the item", "key$": "rarity" }, "carryLimit": { "type": "integer", "description": "The maximum number of this item that can be carried", "key$": "carryLimit" }, "sellPrice": { "type": "integer", "description": "The price when selling the item", "key$": "sellPrice" }, "buyPrice": { "type": "integer", "description": "The price when buying the item", "key$": "buyPrice" }, "value": { "type": "integer", "description": "The value of the item", "key$": "value" } }, "x-ref": "#/components/schemas/Item" } }, "x-ref": "#/components/schemas/CraftingCost" } } }, "description": "Crafting information for the weapon", "key$": "crafting" }, "assets": { "type": "object", "properties": { "icon": { "type": "string", "nullable": true }, "image": { "type": "string", "nullable": true } }, "description": "Asset URLs for the weapon", "key$": "assets" }, "damageType": { "type": "string", "description": "The damage type of the weapon", "key$": "damageType" }, "attributes": { "type": "object", "description": "Additional weapon attributes", "key$": "attributes" } }, "x-ref": "#/components/schemas/Weapon", "index$": 0 } } } } } }, "parameters": [{ "name": "p", "in": "query", "description": "Projection parameter for filtering returned fields", "required": false, "schema": { "type": "string" }, "index$": 0 }, { "name": "q", "in": "query", "description": "Query parameter for searching", "required": false, "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" }, "GET /weapons/{id}": { "protocol": "http", "operationId": "getWeaponById", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the weapon", "key$": "id" }, "name": { "type": "string", "description": "The name of the weapon", "key$": "name" }, "type": { "type": "string", "description": "The type of weapon", "key$": "type" }, "rarity": { "type": "integer", "description": "The rarity of the weapon", "key$": "rarity" }, "attack": { "type": "object", "properties": { "display": { "type": "integer" }, "raw": { "type": "integer" } }, "description": "Attack values for the weapon", "key$": "attack" }, "slots": { "type": "array", "items": { "type": "object", "properties": { "rank": { "type": "integer", "description": "The rank of the decoration slot" } }, "x-ref": "#/components/schemas/Slot" }, "description": "An array of decoration slot information", "key$": "slots" }, "elements": { "type": "array", "items": { "type": "object", "properties": { "type": { "type": "string" }, "damage": { "type": "integer" }, "hidden": { "type": "boolean" } } }, "description": "Elemental damage information", "key$": "elements" }, "crafting": { "type": "object", "properties": { "craftable": { "type": "boolean" }, "previous": { "type": "integer", "nullable": true }, "branches": { "type": "array", "items": { "type": "integer" } }, "craftingMaterials": { "type": "array", "items": { "type": "object", "properties": { "quantity": { "type": "integer", "description": "The quantity of the item required" }, "item": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the item", "key$": "id" }, "name": { "type": "string", "description": "The name of the item", "key$": "name" }, "description": { "type": "string", "description": "A description of the item", "key$": "description" }, "rarity": { "type": "integer", "description": "The rarity of the item", "key$": "rarity" }, "carryLimit": { "type": "integer", "description": "The maximum number of this item that can be carried", "key$": "carryLimit" }, "sellPrice": { "type": "integer", "description": "The price when selling the item", "key$": "sellPrice" }, "buyPrice": { "type": "integer", "description": "The price when buying the item", "key$": "buyPrice" }, "value": { "type": "integer", "description": "The value of the item", "key$": "value" } }, "x-ref": "#/components/schemas/Item" } }, "x-ref": "#/components/schemas/CraftingCost" } }, "upgradeMaterials": { "type": "array", "items": { "type": "object", "properties": { "quantity": { "type": "integer", "description": "The quantity of the item required" }, "item": { "type": "object", "properties": { "id": { "type": "integer", "description": "The ID of the item", "key$": "id" }, "name": { "type": "string", "description": "The name of the item", "key$": "name" }, "description": { "type": "string", "description": "A description of the item", "key$": "description" }, "rarity": { "type": "integer", "description": "The rarity of the item", "key$": "rarity" }, "carryLimit": { "type": "integer", "description": "The maximum number of this item that can be carried", "key$": "carryLimit" }, "sellPrice": { "type": "integer", "description": "The price when selling the item", "key$": "sellPrice" }, "buyPrice": { "type": "integer", "description": "The price when buying the item", "key$": "buyPrice" }, "value": { "type": "integer", "description": "The value of the item", "key$": "value" } }, "x-ref": "#/components/schemas/Item" } }, "x-ref": "#/components/schemas/CraftingCost" } } }, "description": "Crafting information for the weapon", "key$": "crafting" }, "assets": { "type": "object", "properties": { "icon": { "type": "string", "nullable": true }, "image": { "type": "string", "nullable": true } }, "description": "Asset URLs for the weapon", "key$": "assets" }, "damageType": { "type": "string", "description": "The damage type of the weapon", "key$": "damageType" }, "attributes": { "type": "object", "description": "Additional weapon attributes", "key$": "attributes" } }, "x-ref": "#/components/schemas/Weapon", "index$": 0 } } } }, "404": { "description": "Weapon not found" } }, "parameters": [{ "name": "id", "in": "path", "description": "The ID of the weapon to retrieve", "required": true, "schema": { "type": "integer" }, "index$": 0 }, { "name": "p", "in": "query", "description": "Projection parameter for filtering returned fields", "required": false, "schema": { "type": "string" }, "index$": 1 }], "securitySource": "unspecified" } });
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