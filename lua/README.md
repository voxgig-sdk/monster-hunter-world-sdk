# MonsterHunterWorld Lua SDK



The Lua SDK for the MonsterHunterWorld API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Ailment()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("monster-hunter-world_sdk")

local client = sdk.new()
```

### 2. List ailment records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local ailments, err = client:Ailment():list()
if err then error(err) end

for _, item in ipairs(ailments) do
  print(item["id"])
end
```

### 3. Load an ailment

```lua
local ailment, err = client:Ailment():load({ id = 1 })
if err then error(err) end
print(ailment)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local ailments, err = client:Ailment():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Ailment():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE
```

Then run:

```bash
cd lua && busted test/
```


## Reference

### MonsterHunterWorldSDK

```lua
local sdk = require("monster-hunter-world_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MonsterHunterWorldSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Ailment` | `(data) -> AilmentEntity` | Create an Ailment entity instance. |
| `Armor` | `(data) -> ArmorEntity` | Create an Armor entity instance. |
| `ArmorSet` | `(data) -> ArmorSetEntity` | Create an ArmorSet entity instance. |
| `Charm` | `(data) -> CharmEntity` | Create a Charm entity instance. |
| `Decoration` | `(data) -> DecorationEntity` | Create a Decoration entity instance. |
| `Event` | `(data) -> EventEntity` | Create an Event entity instance. |
| `Item` | `(data) -> ItemEntity` | Create an Item entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `Monster` | `(data) -> MonsterEntity` | Create a Monster entity instance. |
| `MotionValue` | `(data) -> MotionValueEntity` | Create a MotionValue entity instance. |
| `Skill` | `(data) -> SkillEntity` | Create a Skill entity instance. |
| `Weapon` | `(data) -> WeaponEntity` | Create a Weapon entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local ailment, err = client:Ailment():load({ id = "example_id" })
    if err then error(err) end
    -- ailment is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

### Entities

#### Ailment

| Field | Description |
| --- | --- |
| `description` | A short description of the ailment |
| `id` | The ID of the ailment |
| `name` | The name of the ailment |
| `protection` |  |
| `recovery` |  |

Operations: List, Load.

API path: `/ailments`

#### Armor

| Field | Description |
| --- | --- |
| `armorSet` |  |
| `assets` |  |
| `attributes` | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` |  |
| `defense` |  |
| `id` | The ID of the armor piece |
| `name` | The name of the armor piece |
| `rank` | The rank of the armor piece |
| `rarity` | The rarity of the armor piece |
| `resistances` |  |
| `skills` | An array of skill ranks granted by the armor |
| `slots` | An array of decoration slot information |
| `type` | The slot the armor piece fits in |

Operations: List, Load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `bonus` | The set bonus, if any |
| `id` | The ID of the armor set |
| `name` | The name of the armor set |
| `pieces` | Array of armor pieces in the set |
| `rank` | The rank of the armor set |

Operations: List, Load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `crafting` |  |
| `id` | The ID of the charm |
| `name` | The name of the charm |
| `rarity` | The rarity of the charm |
| `skills` | An array of skill ranks granted by the charm |

Operations: List, Load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `id` | The ID of the decoration |
| `name` | The name of the decoration |
| `rarity` | The rarity of the decoration |
| `skills` | An array of skill ranks granted by the decoration |
| `slot` | The slot rank required for the decoration |

Operations: List, Load.

API path: `/decorations`

#### Event

| Field | Description |
| --- | --- |
| `description` | A description of the event |
| `endTimestamp` | The end time of the event |
| `exclusive` | Whether the event is exclusive to a platform |
| `expansion` | The expansion the event belongs to |
| `id` | The ID of the event |
| `location` |  |
| `name` | The name of the event |
| `platform` | The platform for the event |
| `questRank` | The quest rank of the event |
| `requirements` | Requirements for the event |
| `startTimestamp` | The start time of the event |
| `successConditions` | Conditions for success |
| `type` | The type of event |

Operations: List, Load.

API path: `/events`

#### Item

| Field | Description |
| --- | --- |
| `buyPrice` | The price when buying the item |
| `carryLimit` | The maximum number of this item that can be carried |
| `description` | A description of the item |
| `id` | The ID of the item |
| `name` | The name of the item |
| `rarity` | The rarity of the item |
| `sellPrice` | The price when selling the item |
| `value` | The value of the item |

Operations: List, Load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `camps` | An array of camps in the location |
| `id` | The ID of the location |
| `name` | The name of the location |
| `zoneCount` | The number of zones in the location |

Operations: List, Load.

API path: `/locations`

#### Monster

| Field | Description |
| --- | --- |
| `ailments` | Ailments the monster can inflict |
| `description` | A description of the monster |
| `elements` | Elements the monster uses |
| `id` | The ID of the monster |
| `locations` | Locations where the monster can be found |
| `name` | The name of the monster |
| `resistances` | Resistances of the monster |
| `rewards` | Rewards obtained from the monster |
| `species` | The species of the monster |
| `type` | The type of monster |
| `weaknesses` | Weaknesses of the monster |

Operations: List, Load.

API path: `/monsters`

#### MotionValue

| Field | Description |
| --- | --- |
| `damageType` | The type of damage |
| `exhaust` | Exhaust value |
| `hits` | Hit information |
| `id` | The ID of the motion value |
| `stun` | Stun value |
| `weaponType` | The type of weapon |

Operations: List, Load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `description` | A description of the skill |
| `id` | The ID of the skill |
| `name` | The name of the skill |
| `ranks` | An array of skill ranks |

Operations: List, Load.

API path: `/skills`

#### Weapon

| Field | Description |
| --- | --- |
| `assets` | Asset URLs for the weapon |
| `attack` | Attack values for the weapon |
| `attributes` | Additional weapon attributes |
| `crafting` | Crafting information for the weapon |
| `damageType` | The damage type of the weapon |
| `elements` | Elemental damage information |
| `id` | The ID of the weapon |
| `name` | The name of the weapon |
| `rarity` | The rarity of the weapon |
| `slots` | An array of decoration slot information |
| `type` | The type of weapon |

Operations: List, Load.

API path: `/weapons`



## Entities


### Ailment

Create an instance: `local ailment = client:Ailment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A short description of the ailment |
| `id` | `number` | The ID of the ailment |
| `name` | `string` | The name of the ailment |
| `protection` | `table` |  |
| `recovery` | `table` |  |

#### Example: Load

```lua
local ailment, err = client:Ailment():load({ id = 1 })
```

#### Example: List

```lua
local ailments, err = client:Ailment():list()
```


### Armor

Create an instance: `local armor = client:Armor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `armorSet` | `table` |  |
| `assets` | `table` |  |
| `attributes` | `table` | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `table` |  |
| `defense` | `table` |  |
| `id` | `number` | The ID of the armor piece |
| `name` | `string` | The name of the armor piece |
| `rank` | `string` | The rank of the armor piece |
| `rarity` | `number` | The rarity of the armor piece |
| `resistances` | `table` |  |
| `skills` | `table` | An array of skill ranks granted by the armor |
| `slots` | `table` | An array of decoration slot information |
| `type` | `string` | The slot the armor piece fits in |

#### Example: Load

```lua
local armor, err = client:Armor():load({ id = 1 })
```

#### Example: List

```lua
local armors, err = client:Armor():list()
```


### ArmorSet

Create an instance: `local armor_set = client:ArmorSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | `table` | The set bonus, if any |
| `id` | `number` | The ID of the armor set |
| `name` | `string` | The name of the armor set |
| `pieces` | `table` | Array of armor pieces in the set |
| `rank` | `string` | The rank of the armor set |

#### Example: Load

```lua
local armor_set, err = client:ArmorSet():load({ id = 1 })
```

#### Example: List

```lua
local armor_sets, err = client:ArmorSet():list()
```


### Charm

Create an instance: `local charm = client:Charm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | `table` |  |
| `id` | `number` | The ID of the charm |
| `name` | `string` | The name of the charm |
| `rarity` | `number` | The rarity of the charm |
| `skills` | `table` | An array of skill ranks granted by the charm |

#### Example: Load

```lua
local charm, err = client:Charm():load({ id = 1 })
```

#### Example: List

```lua
local charms, err = client:Charm():list()
```


### Decoration

Create an instance: `local decoration = client:Decoration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | The ID of the decoration |
| `name` | `string` | The name of the decoration |
| `rarity` | `number` | The rarity of the decoration |
| `skills` | `table` | An array of skill ranks granted by the decoration |
| `slot` | `number` | The slot rank required for the decoration |

#### Example: Load

```lua
local decoration, err = client:Decoration():load({ id = 1 })
```

#### Example: List

```lua
local decorations, err = client:Decoration():list()
```


### Event

Create an instance: `local event = client:Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of the event |
| `endTimestamp` | `string` | The end time of the event |
| `exclusive` | `string` | Whether the event is exclusive to a platform |
| `expansion` | `string` | The expansion the event belongs to |
| `id` | `number` | The ID of the event |
| `location` | `table` |  |
| `name` | `string` | The name of the event |
| `platform` | `string` | The platform for the event |
| `questRank` | `string` | The quest rank of the event |
| `requirements` | `string` | Requirements for the event |
| `startTimestamp` | `string` | The start time of the event |
| `successConditions` | `string` | Conditions for success |
| `type` | `string` | The type of event |

#### Example: Load

```lua
local event, err = client:Event():load({ id = 1 })
```

#### Example: List

```lua
local events, err = client:Event():list()
```


### Item

Create an instance: `local item = client:Item(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buyPrice` | `number` | The price when buying the item |
| `carryLimit` | `number` | The maximum number of this item that can be carried |
| `description` | `string` | A description of the item |
| `id` | `number` | The ID of the item |
| `name` | `string` | The name of the item |
| `rarity` | `number` | The rarity of the item |
| `sellPrice` | `number` | The price when selling the item |
| `value` | `number` | The value of the item |

#### Example: Load

```lua
local item, err = client:Item():load({ id = 1 })
```

#### Example: List

```lua
local items, err = client:Item():list()
```


### Location

Create an instance: `local location = client:Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `camps` | `table` | An array of camps in the location |
| `id` | `number` | The ID of the location |
| `name` | `string` | The name of the location |
| `zoneCount` | `number` | The number of zones in the location |

#### Example: Load

```lua
local location, err = client:Location():load({ id = 1 })
```

#### Example: List

```lua
local locations, err = client:Location():list()
```


### Monster

Create an instance: `local monster = client:Monster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ailments` | `table` | Ailments the monster can inflict |
| `description` | `string` | A description of the monster |
| `elements` | `table` | Elements the monster uses |
| `id` | `number` | The ID of the monster |
| `locations` | `table` | Locations where the monster can be found |
| `name` | `string` | The name of the monster |
| `resistances` | `table` | Resistances of the monster |
| `rewards` | `table` | Rewards obtained from the monster |
| `species` | `string` | The species of the monster |
| `type` | `string` | The type of monster |
| `weaknesses` | `table` | Weaknesses of the monster |

#### Example: Load

```lua
local monster, err = client:Monster():load({ id = 1 })
```

#### Example: List

```lua
local monsters, err = client:Monster():list()
```


### MotionValue

Create an instance: `local motion_value = client:MotionValue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `damageType` | `string` | The type of damage |
| `exhaust` | `number` | Exhaust value |
| `hits` | `table` | Hit information |
| `id` | `number` | The ID of the motion value |
| `stun` | `number` | Stun value |
| `weaponType` | `string` | The type of weapon |

#### Example: Load

```lua
local motion_value, err = client:MotionValue():load({ id = 1 })
```

#### Example: List

```lua
local motion_values, err = client:MotionValue():list()
```


### Skill

Create an instance: `local skill = client:Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | A description of the skill |
| `id` | `number` | The ID of the skill |
| `name` | `string` | The name of the skill |
| `ranks` | `table` | An array of skill ranks |

#### Example: Load

```lua
local skill, err = client:Skill():load({ id = 1 })
```

#### Example: List

```lua
local skills, err = client:Skill():list()
```


### Weapon

Create an instance: `local weapon = client:Weapon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `assets` | `table` | Asset URLs for the weapon |
| `attack` | `table` | Attack values for the weapon |
| `attributes` | `table` | Additional weapon attributes |
| `crafting` | `table` | Crafting information for the weapon |
| `damageType` | `string` | The damage type of the weapon |
| `elements` | `table` | Elemental damage information |
| `id` | `number` | The ID of the weapon |
| `name` | `string` | The name of the weapon |
| `rarity` | `number` | The rarity of the weapon |
| `slots` | `table` | An array of decoration slot information |
| `type` | `string` | The type of weapon |

#### Example: Load

```lua
local weapon, err = client:Weapon():load({ id = 1 })
```

#### Example: List

```lua
local weapons, err = client:Weapon():list()
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Rate limiting |
| [`retry`](#retry) | Retry |
| [`test`](#test) | Test transport |
| [`timeout`](#timeout) | Timeout |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Rate limiting.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Retry.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

Test transport.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Timeout.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── monster-hunter-world_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── schema.lua               -- Generated option + entity specs
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`monster-hunter-world_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local ailment = client:Ailment()
ailment:list()

-- ailment:data_get() now returns the ailment data from the last list
-- ailment:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
