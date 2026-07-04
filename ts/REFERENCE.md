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
const ailment = client.ailment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protection` | ``$OBJECT`` | No |  |
| `recovery` | ``$OBJECT`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.ailment.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ailment.load({ id: 'ailment_id' })
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
const armor = client.armor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armor_set` | ``$OBJECT`` | No |  |
| `asset` | ``$OBJECT`` | No |  |
| `attribute` | ``$OBJECT`` | No |  |
| `crafting` | ``$OBJECT`` | No |  |
| `defense` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `resistance` | ``$OBJECT`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `slot` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.armor.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.armor.load({ id: 'armor_id' })
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
const armor_set = client.armor_set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `piece` | ``$ARRAY`` | No |  |
| `rank` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.armor_set.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.armor_set.load({ id: 'armor_set_id' })
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
const charm = client.charm
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.charm.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.charm.load({ id: 'charm_id' })
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
const decoration = client.decoration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `slot` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.decoration.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.decoration.load({ id: 'decoration_id' })
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
const event = client.event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `end_timestamp` | ``$STRING`` | No |  |
| `exclusive` | ``$STRING`` | No |  |
| `expansion` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `platform` | ``$STRING`` | No |  |
| `quest_rank` | ``$STRING`` | No |  |
| `requirement` | ``$STRING`` | No |  |
| `start_timestamp` | ``$STRING`` | No |  |
| `success_condition` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.event.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.event.load({ id: 'event_id' })
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
const item = client.item
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buy_price` | ``$INTEGER`` | No |  |
| `carry_limit` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `sell_price` | ``$INTEGER`` | No |  |
| `value` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.item.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.item.load({ id: 'item_id' })
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
const location = client.location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camp` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `zone_count` | ``$INTEGER`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.location.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.location.load({ id: 'location_id' })
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
const monster = client.monster
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailment` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `element` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `resistance` | ``$ARRAY`` | No |  |
| `reward` | ``$ARRAY`` | No |  |
| `species` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `weakness` | ``$ARRAY`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.monster.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.monster.load({ id: 'monster_id' })
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
const motion_value = client.motion_value
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damage_type` | ``$STRING`` | No |  |
| `exhaust` | ``$INTEGER`` | No |  |
| `hit` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `stun` | ``$INTEGER`` | No |  |
| `weapon_type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.motion_value.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.motion_value.load({ id: 'motion_value_id' })
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
const skill = client.skill
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$ARRAY`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.skill.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.skill.load({ id: 'skill_id' })
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
const weapon = client.weapon
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asset` | ``$OBJECT`` | No |  |
| `attack` | ``$OBJECT`` | No |  |
| `attribute` | ``$OBJECT`` | No |  |
| `crafting` | ``$OBJECT`` | No |  |
| `damage_type` | ``$STRING`` | No |  |
| `element` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `slot` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.weapon.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.weapon.load({ id: 'weapon_id' })
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

