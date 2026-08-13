# MonsterHunterWorld Lua SDK Reference

Complete API reference for the MonsterHunterWorld Lua SDK.


## MonsterHunterWorldSDK

### Constructor

```lua
local sdk = require("monster-hunter-world_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Ailment(data)`

Create a new `Ailment` entity instance. Pass `nil` for no initial data.

#### `Armor(data)`

Create a new `Armor` entity instance. Pass `nil` for no initial data.

#### `ArmorSet(data)`

Create a new `ArmorSet` entity instance. Pass `nil` for no initial data.

#### `Charm(data)`

Create a new `Charm` entity instance. Pass `nil` for no initial data.

#### `Decoration(data)`

Create a new `Decoration` entity instance. Pass `nil` for no initial data.

#### `Event(data)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Item(data)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Location(data)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Monster(data)`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `MotionValue(data)`

Create a new `MotionValue` entity instance. Pass `nil` for no initial data.

#### `Skill(data)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `Weapon(data)`

Create a new `Weapon` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## AilmentEntity

```lua
local ailment = client:Ailment(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `protection` | `table` | No |  |
| `recovery` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ailment():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ailment():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AilmentEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArmorEntity

```lua
local armor = client:Armor(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armorSet` | `table` | No |  |
| `assets` | `table` | No |  |
| `attributes` | `table` | No |  |
| `crafting` | `table` | No |  |
| `defense` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rank` | `string` | No |  |
| `rarity` | `number` | No |  |
| `resistances` | `table` | No |  |
| `skills` | `table` | No |  |
| `slots` | `table` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Armor():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Armor():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArmorEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ArmorSetEntity

```lua
local armor_set = client:ArmorSet(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `pieces` | `table` | No |  |
| `rank` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ArmorSet():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ArmorSet():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArmorSetEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CharmEntity

```lua
local charm = client:Charm(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `skills` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Charm():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Charm():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CharmEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DecorationEntity

```lua
local decoration = client:Decoration(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `skills` | `table` | No |  |
| `slot` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Decoration():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Decoration():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DecorationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EventEntity

```lua
local event = client:Event(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `table` | No |  |
| `description` | `string` | No |  |
| `endTimestamp` | `string` | No |  |
| `exclusive` | `string` | No |  |
| `expansion` | `string` | No |  |
| `id` | `number` | No |  |
| `location` | `table` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `questRank` | `string` | No |  |
| `requirements` | `string` | No |  |
| `startTimestamp` | `string` | No |  |
| `successConditions` | `string` | No |  |
| `type` | `string` | No |  |
| `zoneCount` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Event():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ItemEntity

```lua
local item = client:Item(nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Item():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Item():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocationEntity

```lua
local location = client:Location(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `zoneCount` | `number` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Location():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Location():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MonsterEntity

```lua
local monster = client:Monster(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailments` | `table` | No |  |
| `description` | `string` | No |  |
| `elements` | `table` | No |  |
| `id` | `number` | No |  |
| `locations` | `table` | No |  |
| `name` | `string` | No |  |
| `resistances` | `table` | No |  |
| `rewards` | `table` | No |  |
| `species` | `string` | No |  |
| `type` | `string` | No |  |
| `weaknesses` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Monster():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Monster():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## MotionValueEntity

```lua
local motion_value = client:MotionValue(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `string` | No |  |
| `exhaust` | `number` | No |  |
| `hits` | `table` | No |  |
| `id` | `number` | No |  |
| `stun` | `number` | No |  |
| `weaponType` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:MotionValue():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MotionValue():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MotionValueEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SkillEntity

```lua
local skill = client:Skill(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `ranks` | `table` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Skill():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Skill():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## WeaponEntity

```lua
local weapon = client:Weapon(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assets` | `table` | No |  |
| `attack` | `table` | No |  |
| `attributes` | `table` | No |  |
| `crafting` | `table` | No |  |
| `damageType` | `string` | No |  |
| `elements` | `table` | No |  |
| `id` | `number` | No |  |
| `name` | `string` | No |  |
| `rarity` | `number` | No |  |
| `slots` | `table` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Weapon():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Weapon():load({ id = 1 })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeaponEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

