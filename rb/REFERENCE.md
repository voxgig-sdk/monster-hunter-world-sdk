# MonsterHunterWorld Ruby SDK Reference

Complete API reference for the MonsterHunterWorld Ruby SDK.


## MonsterHunterWorldSDK

### Constructor

```ruby
require_relative 'MonsterHunterWorld_sdk'

client = MonsterHunterWorldSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MonsterHunterWorldSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = MonsterHunterWorldSDK.test
```


### Instance Methods

#### `Ailment(data = nil)`

Create a new `Ailment` entity instance. Pass `nil` for no initial data.

#### `Armor(data = nil)`

Create a new `Armor` entity instance. Pass `nil` for no initial data.

#### `ArmorSet(data = nil)`

Create a new `ArmorSet` entity instance. Pass `nil` for no initial data.

#### `Charm(data = nil)`

Create a new `Charm` entity instance. Pass `nil` for no initial data.

#### `Decoration(data = nil)`

Create a new `Decoration` entity instance. Pass `nil` for no initial data.

#### `Event(data = nil)`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Item(data = nil)`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Location(data = nil)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Monster(data = nil)`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `MotionValue(data = nil)`

Create a new `MotionValue` entity instance. Pass `nil` for no initial data.

#### `Skill(data = nil)`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `Weapon(data = nil)`

Create a new `Weapon` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AilmentEntity

```ruby
ailment = client.Ailment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `protection` | `Hash` | No |  |
| `recovery` | `Hash` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Ailment.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Ailment.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AilmentEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArmorEntity

```ruby
armor = client.Armor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armor_set` | `Hash` | No |  |
| `asset` | `Hash` | No |  |
| `attribute` | `Hash` | No |  |
| `crafting` | `Hash` | No |  |
| `defense` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rank` | `String` | No |  |
| `rarity` | `Integer` | No |  |
| `resistance` | `Hash` | No |  |
| `skill` | `Array` | No |  |
| `slot` | `Array` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Armor.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Armor.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArmorEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ArmorSetEntity

```ruby
armor_set = client.ArmorSet
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `piece` | `Array` | No |  |
| `rank` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.ArmorSet.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ArmorSet.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ArmorSetEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CharmEntity

```ruby
charm = client.Charm
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `Hash` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rarity` | `Integer` | No |  |
| `skill` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Charm.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Charm.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CharmEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DecorationEntity

```ruby
decoration = client.Decoration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rarity` | `Integer` | No |  |
| `skill` | `Array` | No |  |
| `slot` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Decoration.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Decoration.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DecorationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EventEntity

```ruby
event = client.Event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `end_timestamp` | `String` | No |  |
| `exclusive` | `String` | No |  |
| `expansion` | `String` | No |  |
| `id` | `Integer` | No |  |
| `location` | `Hash` | No |  |
| `name` | `String` | No |  |
| `platform` | `String` | No |  |
| `quest_rank` | `String` | No |  |
| `requirement` | `String` | No |  |
| `start_timestamp` | `String` | No |  |
| `success_condition` | `String` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Event.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Event.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ItemEntity

```ruby
item = client.Item
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buy_price` | `Integer` | No |  |
| `carry_limit` | `Integer` | No |  |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rarity` | `Integer` | No |  |
| `sell_price` | `Integer` | No |  |
| `value` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Item.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Item.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocationEntity

```ruby
location = client.Location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camp` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `zone_count` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Location.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Location.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MonsterEntity

```ruby
monster = client.Monster
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailment` | `Array` | No |  |
| `description` | `String` | No |  |
| `element` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `location` | `Array` | No |  |
| `name` | `String` | No |  |
| `resistance` | `Array` | No |  |
| `reward` | `Array` | No |  |
| `species` | `String` | No |  |
| `type` | `String` | No |  |
| `weakness` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Monster.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Monster.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## MotionValueEntity

```ruby
motion_value = client.MotionValue
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damage_type` | `String` | No |  |
| `exhaust` | `Integer` | No |  |
| `hit` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `stun` | `Integer` | No |  |
| `weapon_type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.MotionValue.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.MotionValue.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `MotionValueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SkillEntity

```ruby
skill = client.Skill
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rank` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Skill.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Skill.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## WeaponEntity

```ruby
weapon = client.Weapon
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asset` | `Hash` | No |  |
| `attack` | `Hash` | No |  |
| `attribute` | `Hash` | No |  |
| `crafting` | `Hash` | No |  |
| `damage_type` | `String` | No |  |
| `element` | `Array` | No |  |
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `rarity` | `Integer` | No |  |
| `slot` | `Array` | No |  |
| `type` | `String` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Weapon.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Weapon.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `WeaponEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = MonsterHunterWorldSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

