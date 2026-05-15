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
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts, sdkopts)`

Create a test client with mock features active. Both arguments may be `nil`.

```lua
local client = sdk.test(nil, nil)
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
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protection` | ``$OBJECT`` | No |  |
| `recovery` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Ailment(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Ailment(nil):load({ id = "ailment_id" }, nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Armor(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Armor(nil):load({ id = "armor_id" }, nil)
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
| `bonus` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `piece` | ``$ARRAY`` | No |  |
| `rank` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:ArmorSet(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ArmorSet(nil):load({ id = "armor_set_id" }, nil)
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
| `crafting` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Charm(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Charm(nil):load({ id = "charm_id" }, nil)
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
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `slot` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Decoration(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Decoration(nil):load({ id = "decoration_id" }, nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Event(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Event(nil):load({ id = "event_id" }, nil)
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
| `buy_price` | ``$INTEGER`` | No |  |
| `carry_limit` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `sell_price` | ``$INTEGER`` | No |  |
| `value` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Item(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Item(nil):load({ id = "item_id" }, nil)
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
| `camp` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `zone_count` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Location(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Location(nil):load({ id = "location_id" }, nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Monster(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Monster(nil):load({ id = "monster_id" }, nil)
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
| `damage_type` | ``$STRING`` | No |  |
| `exhaust` | ``$INTEGER`` | No |  |
| `hit` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `stun` | ``$INTEGER`` | No |  |
| `weapon_type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:MotionValue(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:MotionValue(nil):load({ id = "motion_value_id" }, nil)
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
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Skill(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Skill(nil):load({ id = "skill_id" }, nil)
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Weapon(nil):list(nil, nil)
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Weapon(nil):load({ id = "weapon_id" }, nil)
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

