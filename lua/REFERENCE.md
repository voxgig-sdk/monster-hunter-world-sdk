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
| `description` | `string` | No | A short description of the ailment |
| `id` | `number` | No | The ID of the ailment |
| `name` | `string` | No | The name of the ailment |
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
| `attributes` | `table` | No | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `table` | No |  |
| `defense` | `table` | No |  |
| `id` | `number` | No | The ID of the armor piece |
| `name` | `string` | No | The name of the armor piece |
| `rank` | `string` | No | The rank of the armor piece |
| `rarity` | `number` | No | The rarity of the armor piece |
| `resistances` | `table` | No |  |
| `skills` | `table` | No | An array of skill ranks granted by the armor |
| `slots` | `table` | No | An array of decoration slot information |
| `type` | `string` | No | The slot the armor piece fits in |

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
| `bonus` | `table` | No | The set bonus, if any |
| `id` | `number` | No | The ID of the armor set |
| `name` | `string` | No | The name of the armor set |
| `pieces` | `table` | No | Array of armor pieces in the set |
| `rank` | `string` | No | The rank of the armor set |

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
| `id` | `number` | No | The ID of the charm |
| `name` | `string` | No | The name of the charm |
| `rarity` | `number` | No | The rarity of the charm |
| `skills` | `table` | No | An array of skill ranks granted by the charm |

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
| `id` | `number` | No | The ID of the decoration |
| `name` | `string` | No | The name of the decoration |
| `rarity` | `number` | No | The rarity of the decoration |
| `skills` | `table` | No | An array of skill ranks granted by the decoration |
| `slot` | `number` | No | The slot rank required for the decoration |

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
| `camps` | `table` | No | An array of camps in the location |
| `description` | `string` | No | A description of the event |
| `endTimestamp` | `string` | No | The end time of the event |
| `exclusive` | `string` | No | Whether the event is exclusive to a platform |
| `expansion` | `string` | No | The expansion the event belongs to |
| `id` | `number` | No | The ID of the location |
| `location` | `table` | No |  |
| `name` | `string` | No | The name of the location |
| `platform` | `string` | No | The platform for the event |
| `questRank` | `string` | No | The quest rank of the event |
| `requirements` | `string` | No | Requirements for the event |
| `startTimestamp` | `string` | No | The start time of the event |
| `successConditions` | `string` | No | Conditions for success |
| `type` | `string` | No | The type of event |
| `zoneCount` | `number` | No | The number of zones in the location |

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
| `buyPrice` | `number` | No | The price when buying the item |
| `carryLimit` | `number` | No | The maximum number of this item that can be carried |
| `description` | `string` | No | A description of the item |
| `id` | `number` | No | The ID of the item |
| `name` | `string` | No | The name of the item |
| `rarity` | `number` | No | The rarity of the item |
| `sellPrice` | `number` | No | The price when selling the item |
| `value` | `number` | No | The value of the item |

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
| `camps` | `table` | No | An array of camps in the location |
| `id` | `number` | No | The ID of the location |
| `name` | `string` | No | The name of the location |
| `zoneCount` | `number` | No | The number of zones in the location |

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
| `ailments` | `table` | No | Ailments the monster can inflict |
| `description` | `string` | No | A description of the monster |
| `elements` | `table` | No | Elements the monster uses |
| `id` | `number` | No | The ID of the monster |
| `locations` | `table` | No | Locations where the monster can be found |
| `name` | `string` | No | The name of the monster |
| `resistances` | `table` | No | Resistances of the monster |
| `rewards` | `table` | No | Rewards obtained from the monster |
| `species` | `string` | No | The species of the monster |
| `type` | `string` | No | The type of monster |
| `weaknesses` | `table` | No | Weaknesses of the monster |

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
| `damageType` | `string` | No | The type of damage |
| `exhaust` | `number` | No | Exhaust value |
| `hits` | `table` | No | Hit information |
| `id` | `number` | No | The ID of the motion value |
| `stun` | `number` | No | Stun value |
| `weaponType` | `string` | No | The type of weapon |

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
| `description` | `string` | No | A description of the skill |
| `id` | `number` | No | The ID of the skill |
| `name` | `string` | No | The name of the skill |
| `ranks` | `table` | No | An array of skill ranks |

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
| `assets` | `table` | No | Asset URLs for the weapon |
| `attack` | `table` | No | Attack values for the weapon |
| `attributes` | `table` | No | Additional weapon attributes |
| `crafting` | `table` | No | Crafting information for the weapon |
| `damageType` | `string` | No | The damage type of the weapon |
| `elements` | `table` | No | Elemental damage information |
| `id` | `number` | No | The ID of the weapon |
| `name` | `string` | No | The name of the weapon |
| `rarity` | `number` | No | The rarity of the weapon |
| `slots` | `table` | No | An array of decoration slot information |
| `type` | `string` | No | The type of weapon |

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
| `ratelimit` | 0.0.1 | Client-side rate limiting via a token bucket |
| `retry` | 0.0.1 | Automatic retry of transient failures with exponential backoff |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |
| `timeout` | 0.0.1 | Per-request timeout with transport abort |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    ratelimit = { active = true },
    retry = { active = true },
    test = { active = true },
    timeout = { active = true },
  },
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### Ordering

`ratelimit`, `retry`, `timeout` wrap the transport. Each
wraps whatever is already installed, so **activation order is nesting order**:
a feature activated later sits OUTSIDE one activated earlier, and sees the call
first.

That decides behaviour, not just sequence: a feature that short-circuits the
call, such as a cache serving a hit, stops every feature nested inside it from
ever seeing that call.

`test` attach to pipeline hooks
rather than the transport, so their order does not affect what they observe.

#### `ratelimit`

Client-side rate limiting via a token bucket.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

| Option | Type |
|---|---|
| `now` | function |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.ratelimit.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `retry`

Automatic retry of transient failures with exponential backoff.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

| Option | Type |
|---|---|
| `jitter` | boolean |
| `sleep` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.retry.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

#### `timeout`

Per-request timeout with transport abort.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `setTimer` | function |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.timeout.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Wraps the transport: its place in the activation order decides what it
  sees. See [Ordering](#ordering) above.
- Inactive by default: leaving it out costs nothing at runtime.

