# MonsterHunterWorld Lua SDK



The Lua SDK for the MonsterHunterWorld API — an entity-oriented client using Lua conventions.

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
  print(item["id"], item["name"])
end
```

### 3. Load an ailment

```lua
local ailment, err = client:Ailment():load({ id = "example_id" })
if err then error(err) end
print(ailment)
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

local result, err = client:Ailment():load({ id = "test01" })
-- result is the loaded data; err is set on failure
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
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
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
| `load` / `create` / `update` / `remove` | the entity record (a `table`) |
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
| `description` |  |
| `id` |  |
| `name` |  |
| `protection` |  |
| `recovery` |  |

Operations: List, Load.

API path: `/ailments`

#### Armor

| Field | Description |
| --- | --- |
| `armor_set` |  |
| `asset` |  |
| `attribute` |  |
| `crafting` |  |
| `defense` |  |
| `id` |  |
| `name` |  |
| `rank` |  |
| `rarity` |  |
| `resistance` |  |
| `skill` |  |
| `slot` |  |
| `type` |  |

Operations: List, Load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `bonus` |  |
| `id` |  |
| `name` |  |
| `piece` |  |
| `rank` |  |

Operations: List, Load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `crafting` |  |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `skill` |  |

Operations: List, Load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `skill` |  |
| `slot` |  |

Operations: List, Load.

API path: `/decorations`

#### Event

| Field | Description |
| --- | --- |
| `description` |  |
| `end_timestamp` |  |
| `exclusive` |  |
| `expansion` |  |
| `id` |  |
| `location` |  |
| `name` |  |
| `platform` |  |
| `quest_rank` |  |
| `requirement` |  |
| `start_timestamp` |  |
| `success_condition` |  |
| `type` |  |

Operations: List, Load.

API path: `/events`

#### Item

| Field | Description |
| --- | --- |
| `buy_price` |  |
| `carry_limit` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `sell_price` |  |
| `value` |  |

Operations: List, Load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `camp` |  |
| `id` |  |
| `name` |  |
| `zone_count` |  |

Operations: List, Load.

API path: `/locations`

#### Monster

| Field | Description |
| --- | --- |
| `ailment` |  |
| `description` |  |
| `element` |  |
| `id` |  |
| `location` |  |
| `name` |  |
| `resistance` |  |
| `reward` |  |
| `species` |  |
| `type` |  |
| `weakness` |  |

Operations: List, Load.

API path: `/monsters`

#### MotionValue

| Field | Description |
| --- | --- |
| `damage_type` |  |
| `exhaust` |  |
| `hit` |  |
| `id` |  |
| `stun` |  |
| `weapon_type` |  |

Operations: List, Load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `rank` |  |

Operations: List, Load.

API path: `/skills`

#### Weapon

| Field | Description |
| --- | --- |
| `asset` |  |
| `attack` |  |
| `attribute` |  |
| `crafting` |  |
| `damage_type` |  |
| `element` |  |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `slot` |  |
| `type` |  |

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
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `protection` | ``$OBJECT`` |  |
| `recovery` | ``$OBJECT`` |  |

#### Example: Load

```lua
local ailment, err = client:Ailment():load({ id = "ailment_id" })
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
| `armor_set` | ``$OBJECT`` |  |
| `asset` | ``$OBJECT`` |  |
| `attribute` | ``$OBJECT`` |  |
| `crafting` | ``$OBJECT`` |  |
| `defense` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rank` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `resistance` | ``$OBJECT`` |  |
| `skill` | ``$ARRAY`` |  |
| `slot` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```lua
local armor, err = client:Armor():load({ id = "armor_id" })
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
| `bonus` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `piece` | ``$ARRAY`` |  |
| `rank` | ``$STRING`` |  |

#### Example: Load

```lua
local armor_set, err = client:ArmorSet():load({ id = "armor_set_id" })
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
| `crafting` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `skill` | ``$ARRAY`` |  |

#### Example: Load

```lua
local charm, err = client:Charm():load({ id = "charm_id" })
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
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `skill` | ``$ARRAY`` |  |
| `slot` | ``$INTEGER`` |  |

#### Example: Load

```lua
local decoration, err = client:Decoration():load({ id = "decoration_id" })
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
| `description` | ``$STRING`` |  |
| `end_timestamp` | ``$STRING`` |  |
| `exclusive` | ``$STRING`` |  |
| `expansion` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$OBJECT`` |  |
| `name` | ``$STRING`` |  |
| `platform` | ``$STRING`` |  |
| `quest_rank` | ``$STRING`` |  |
| `requirement` | ``$STRING`` |  |
| `start_timestamp` | ``$STRING`` |  |
| `success_condition` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```lua
local event, err = client:Event():load({ id = "event_id" })
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
| `buy_price` | ``$INTEGER`` |  |
| `carry_limit` | ``$INTEGER`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `sell_price` | ``$INTEGER`` |  |
| `value` | ``$INTEGER`` |  |

#### Example: Load

```lua
local item, err = client:Item():load({ id = "item_id" })
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
| `camp` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `zone_count` | ``$INTEGER`` |  |

#### Example: Load

```lua
local location, err = client:Location():load({ id = "location_id" })
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
| `ailment` | ``$ARRAY`` |  |
| `description` | ``$STRING`` |  |
| `element` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `location` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `resistance` | ``$ARRAY`` |  |
| `reward` | ``$ARRAY`` |  |
| `species` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `weakness` | ``$ARRAY`` |  |

#### Example: Load

```lua
local monster, err = client:Monster():load({ id = "monster_id" })
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
| `damage_type` | ``$STRING`` |  |
| `exhaust` | ``$INTEGER`` |  |
| `hit` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `stun` | ``$INTEGER`` |  |
| `weapon_type` | ``$STRING`` |  |

#### Example: Load

```lua
local motion_value, err = client:MotionValue():load({ id = "motion_value_id" })
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
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rank` | ``$ARRAY`` |  |

#### Example: Load

```lua
local skill, err = client:Skill():load({ id = "skill_id" })
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
| `asset` | ``$OBJECT`` |  |
| `attack` | ``$OBJECT`` |  |
| `attribute` | ``$OBJECT`` |  |
| `crafting` | ``$OBJECT`` |  |
| `damage_type` | ``$STRING`` |  |
| `element` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `slot` | ``$ARRAY`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```lua
local weapon, err = client:Weapon():load({ id = "weapon_id" })
```

#### Example: List

```lua
local weapons, err = client:Weapon():list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local ailment = client:Ailment()
ailment:load({ id = "example_id" })

-- ailment:data_get() now returns the loaded ailment data
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
