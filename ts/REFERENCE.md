# MonsterHunterWorld TypeScript SDK Reference

Complete API reference for the MonsterHunterWorld TypeScript SDK.


## MonsterHunterWorldSDK

### Constructor

```ts
new MonsterHunterWorldSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MonsterHunterWorldSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = MonsterHunterWorldSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `MonsterHunterWorldSDK` instance in test mode.


### Instance Methods

#### `Ailment(data?: object)`

Create a new `Ailment` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AilmentEntity` instance.

#### `Armor(data?: object)`

Create a new `Armor` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArmorEntity` instance.

#### `ArmorSet(data?: object)`

Create a new `ArmorSet` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ArmorSetEntity` instance.

#### `Charm(data?: object)`

Create a new `Charm` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CharmEntity` instance.

#### `Decoration(data?: object)`

Create a new `Decoration` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DecorationEntity` instance.

#### `Event(data?: object)`

Create a new `Event` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EventEntity` instance.

#### `Item(data?: object)`

Create a new `Item` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ItemEntity` instance.

#### `Location(data?: object)`

Create a new `Location` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationEntity` instance.

#### `Monster(data?: object)`

Create a new `Monster` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MonsterEntity` instance.

#### `MotionValue(data?: object)`

Create a new `MotionValue` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `MotionValueEntity` instance.

#### `Skill(data?: object)`

Create a new `Skill` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SkillEntity` instance.

#### `Weapon(data?: object)`

Create a new `Weapon` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `WeaponEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `MonsterHunterWorldSDK.test()`.

**Returns:** `MonsterHunterWorldSDK` instance in test mode.


---

## AilmentEntity

```ts
const ailment = client.Ailment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `protection` | `Record<string, any>` | No |  |
| `recovery` | `Record<string, any>` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Ailment().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Ailment().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AilmentEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArmorEntity

```ts
const armor = client.Armor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armorSet` | `Record<string, any>` | No |  |
| `assets` | `Record<string, any>` | No |  |
| `attributes` | `Record<string, any>` | No |  |
| `crafting` | `Record<string, any>` | No |  |
| `defense` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rank` | `string` | No |  |
| `rarity` | `number` | No |  |
| `resistances` | `Record<string, any>` | No |  |
| `skills` | `any[]` | No |  |
| `slots` | `any[]` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Armor().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Armor().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArmorEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ArmorSetEntity

```ts
const armor_set = client.ArmorSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `pieces` | `any[]` | No |  |
| `rank` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ArmorSet().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ArmorSet().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ArmorSetEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CharmEntity

```ts
const charm = client.Charm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `Record<string, any>` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `skills` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Charm().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Charm().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CharmEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DecorationEntity

```ts
const decoration = client.Decoration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `skills` | `any[]` | No |  |
| `slot` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Decoration().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Decoration().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DecorationEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EventEntity

```ts
const event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `any[]` | No |  |
| `description` | `string` | No |  |
| `endTimestamp` | `string` | No |  |
| `exclusive` | `string` | No |  |
| `expansion` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `Record<string, any>` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `questRank` | `string` | No |  |
| `requirements` | `string` | No |  |
| `startTimestamp` | `string` | No |  |
| `successConditions` | `string` | No |  |
| `type` | `string` | No |  |
| `zoneCount` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Event().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Event().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EventEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ItemEntity

```ts
const item = client.Item()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buyPrice` | `number` | No |  |
| `carryLimit` | `number` | No |  |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `sellPrice` | `number` | No |  |
| `value` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Item().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Item().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ItemEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationEntity

```ts
const location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `any[]` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `zoneCount` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Location().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Location().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MonsterEntity

```ts
const monster = client.Monster()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailments` | `any[]` | No |  |
| `description` | `string` | No |  |
| `elements` | `any[]` | No |  |
| `id` | `number` | No |  |
| `locations` | `any[]` | No |  |
| `name` | `string` | No |  |
| `resistances` | `any[]` | No |  |
| `rewards` | `any[]` | No |  |
| `species` | `string` | No |  |
| `type` | `string` | No |  |
| `weaknesses` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Monster().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Monster().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MonsterEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## MotionValueEntity

```ts
const motion_value = client.MotionValue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `string` | No |  |
| `exhaust` | `number` | No |  |
| `hits` | `any[]` | No |  |
| `id` | `number` | No |  |
| `stun` | `number` | No |  |
| `weaponType` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.MotionValue().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.MotionValue().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `MotionValueEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SkillEntity

```ts
const skill = client.Skill()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `ranks` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Skill().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Skill().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SkillEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## WeaponEntity

```ts
const weapon = client.Weapon()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assets` | `Record<string, any>` | No |  |
| `attack` | `Record<string, any>` | No |  |
| `attributes` | `Record<string, any>` | No |  |
| `crafting` | `Record<string, any>` | No |  |
| `damageType` | `string` | No |  |
| `elements` | `any[]` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `slots` | `any[]` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Weapon().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Weapon().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `WeaponEntity` instance with the same client and
options.

#### `client()`

Return the parent `MonsterHunterWorldSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new MonsterHunterWorldSDK({
  feature: {
    test: { active: true },
  }
})
```

