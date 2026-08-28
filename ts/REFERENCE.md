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
| `description` | `string` | No | A short description of the ailment |
| `id` | `number` | No | The ID of the ailment |
| `name` | `string` | No | The name of the ailment |
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
| `attributes` | `Record<string, any>` | No | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `Record<string, any>` | No |  |
| `defense` | `Record<string, any>` | No |  |
| `id` | `number` | No | The ID of the armor piece |
| `name` | `string` | No | The name of the armor piece |
| `rank` | `string` | No | The rank of the armor piece |
| `rarity` | `number` | No | The rarity of the armor piece |
| `resistances` | `Record<string, any>` | No |  |
| `skills` | `any[]` | No | An array of skill ranks granted by the armor |
| `slots` | `any[]` | No | An array of decoration slot information |
| `type` | `string` | No | The slot the armor piece fits in |

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
| `bonus` | `Record<string, any>` | No | The set bonus, if any |
| `id` | `number` | No | The ID of the armor set |
| `name` | `string` | No | The name of the armor set |
| `pieces` | `any[]` | No | Array of armor pieces in the set |
| `rank` | `string` | No | The rank of the armor set |

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
| `id` | `number` | No | The ID of the charm |
| `name` | `string` | No | The name of the charm |
| `rarity` | `number` | No | The rarity of the charm |
| `skills` | `any[]` | No | An array of skill ranks granted by the charm |

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
| `id` | `number` | No | The ID of the decoration |
| `name` | `string` | No | The name of the decoration |
| `rarity` | `number` | No | The rarity of the decoration |
| `skills` | `any[]` | No | An array of skill ranks granted by the decoration |
| `slot` | `number` | No | The slot rank required for the decoration |

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
| `camps` | `any[]` | No | An array of camps in the location |
| `description` | `string` | No | A description of the event |
| `endTimestamp` | `string` | No | The end time of the event |
| `exclusive` | `string` | No | Whether the event is exclusive to a platform |
| `expansion` | `string` | No | The expansion the event belongs to |
| `id` | `number` | No | The ID of the location |
| `location` | `Record<string, any>` | No |  |
| `name` | `string` | No | The name of the location |
| `platform` | `string` | No | The platform for the event |
| `questRank` | `string` | No | The quest rank of the event |
| `requirements` | `string` | No | Requirements for the event |
| `startTimestamp` | `string` | No | The start time of the event |
| `successConditions` | `string` | No | Conditions for success |
| `type` | `string` | No | The type of event |
| `zoneCount` | `number` | No | The number of zones in the location |

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
| `buyPrice` | `number` | No | The price when buying the item |
| `carryLimit` | `number` | No | The maximum number of this item that can be carried |
| `description` | `string` | No | A description of the item |
| `id` | `number` | No | The ID of the item |
| `name` | `string` | No | The name of the item |
| `rarity` | `number` | No | The rarity of the item |
| `sellPrice` | `number` | No | The price when selling the item |
| `value` | `number` | No | The value of the item |

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
| `camps` | `any[]` | No | An array of camps in the location |
| `id` | `number` | No | The ID of the location |
| `name` | `string` | No | The name of the location |
| `zoneCount` | `number` | No | The number of zones in the location |

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
| `ailments` | `any[]` | No | Ailments the monster can inflict |
| `description` | `string` | No | A description of the monster |
| `elements` | `any[]` | No | Elements the monster uses |
| `id` | `number` | No | The ID of the monster |
| `locations` | `any[]` | No | Locations where the monster can be found |
| `name` | `string` | No | The name of the monster |
| `resistances` | `any[]` | No | Resistances of the monster |
| `rewards` | `any[]` | No | Rewards obtained from the monster |
| `species` | `string` | No | The species of the monster |
| `type` | `string` | No | The type of monster |
| `weaknesses` | `any[]` | No | Weaknesses of the monster |

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
| `damageType` | `string` | No | The type of damage |
| `exhaust` | `number` | No | Exhaust value |
| `hits` | `any[]` | No | Hit information |
| `id` | `number` | No | The ID of the motion value |
| `stun` | `number` | No | Stun value |
| `weaponType` | `string` | No | The type of weapon |

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
| `description` | `string` | No | A description of the skill |
| `id` | `number` | No | The ID of the skill |
| `name` | `string` | No | The name of the skill |
| `ranks` | `any[]` | No | An array of skill ranks |

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
| `assets` | `Record<string, any>` | No | Asset URLs for the weapon |
| `attack` | `Record<string, any>` | No | Attack values for the weapon |
| `attributes` | `Record<string, any>` | No | Additional weapon attributes |
| `crafting` | `Record<string, any>` | No | Crafting information for the weapon |
| `damageType` | `string` | No | The damage type of the weapon |
| `elements` | `any[]` | No | Elemental damage information |
| `id` | `number` | No | The ID of the weapon |
| `name` | `string` | No | The name of the weapon |
| `rarity` | `number` | No | The rarity of the weapon |
| `slots` | `any[]` | No | An array of decoration slot information |
| `type` | `string` | No | The type of weapon |

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


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

