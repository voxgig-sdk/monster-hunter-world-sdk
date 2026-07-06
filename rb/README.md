# MonsterHunterWorld Ruby SDK



The Ruby SDK for the MonsterHunterWorld API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Ailment` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "MonsterHunterWorld_sdk"

client = MonsterHunterWorldSDK.new
```

### 2. List ailment records

```ruby
begin
  # list returns an Array of Ailment records — iterate directly.
  ailments = client.Ailment.list
  ailments.each do |item|
    puts "#{item["id"]} #{item["description"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load an ailment

```ruby
begin
  # load returns the bare Ailment record (raises on error).
  ailment = client.Ailment.load({ "id" => "example_id" })
  puts ailment
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  ailments = client.Ailment.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = MonsterHunterWorldSDK.test({
  "entity" => { "ailment" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
ailment = client.Ailment.list()
puts ailment
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = MonsterHunterWorldSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### MonsterHunterWorldSDK

```ruby
require_relative "MonsterHunterWorld_sdk"
client = MonsterHunterWorldSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = MonsterHunterWorldSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MonsterHunterWorldSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `MonsterHunterWorldError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `ailment = client.Ailment`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `protection` | `Hash` |  |
| `recovery` | `Hash` |  |

#### Example: Load

```ruby
# load returns the bare Ailment record (raises on error).
ailment = client.Ailment.load({ "id" => "ailment_id" })
```

#### Example: List

```ruby
# list returns an Array of Ailment records (raises on error).
ailments = client.Ailment.list
```


### Armor

Create an instance: `armor = client.Armor`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `armor_set` | `Hash` |  |
| `asset` | `Hash` |  |
| `attribute` | `Hash` |  |
| `crafting` | `Hash` |  |
| `defense` | `Hash` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rank` | `String` |  |
| `rarity` | `Integer` |  |
| `resistance` | `Hash` |  |
| `skill` | `Array` |  |
| `slot` | `Array` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Armor record (raises on error).
armor = client.Armor.load({ "id" => "armor_id" })
```

#### Example: List

```ruby
# list returns an Array of Armor records (raises on error).
armors = client.Armor.list
```


### ArmorSet

Create an instance: `armor_set = client.ArmorSet`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | `Hash` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `piece` | `Array` |  |
| `rank` | `String` |  |

#### Example: Load

```ruby
# load returns the bare ArmorSet record (raises on error).
armor_set = client.ArmorSet.load({ "id" => "armor_set_id" })
```

#### Example: List

```ruby
# list returns an Array of ArmorSet records (raises on error).
armor_sets = client.ArmorSet.list
```


### Charm

Create an instance: `charm = client.Charm`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | `Hash` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rarity` | `Integer` |  |
| `skill` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Charm record (raises on error).
charm = client.Charm.load({ "id" => "charm_id" })
```

#### Example: List

```ruby
# list returns an Array of Charm records (raises on error).
charms = client.Charm.list
```


### Decoration

Create an instance: `decoration = client.Decoration`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rarity` | `Integer` |  |
| `skill` | `Array` |  |
| `slot` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Decoration record (raises on error).
decoration = client.Decoration.load({ "id" => "decoration_id" })
```

#### Example: List

```ruby
# list returns an Array of Decoration records (raises on error).
decorations = client.Decoration.list
```


### Event

Create an instance: `event = client.Event`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `end_timestamp` | `String` |  |
| `exclusive` | `String` |  |
| `expansion` | `String` |  |
| `id` | `Integer` |  |
| `location` | `Hash` |  |
| `name` | `String` |  |
| `platform` | `String` |  |
| `quest_rank` | `String` |  |
| `requirement` | `String` |  |
| `start_timestamp` | `String` |  |
| `success_condition` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Event record (raises on error).
event = client.Event.load({ "id" => "event_id" })
```

#### Example: List

```ruby
# list returns an Array of Event records (raises on error).
events = client.Event.list
```


### Item

Create an instance: `item = client.Item`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buy_price` | `Integer` |  |
| `carry_limit` | `Integer` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rarity` | `Integer` |  |
| `sell_price` | `Integer` |  |
| `value` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Item record (raises on error).
item = client.Item.load({ "id" => "item_id" })
```

#### Example: List

```ruby
# list returns an Array of Item records (raises on error).
items = client.Item.list
```


### Location

Create an instance: `location = client.Location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `camp` | `Array` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `zone_count` | `Integer` |  |

#### Example: Load

```ruby
# load returns the bare Location record (raises on error).
location = client.Location.load({ "id" => "location_id" })
```

#### Example: List

```ruby
# list returns an Array of Location records (raises on error).
locations = client.Location.list
```


### Monster

Create an instance: `monster = client.Monster`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ailment` | `Array` |  |
| `description` | `String` |  |
| `element` | `Array` |  |
| `id` | `Integer` |  |
| `location` | `Array` |  |
| `name` | `String` |  |
| `resistance` | `Array` |  |
| `reward` | `Array` |  |
| `species` | `String` |  |
| `type` | `String` |  |
| `weakness` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Monster record (raises on error).
monster = client.Monster.load({ "id" => "monster_id" })
```

#### Example: List

```ruby
# list returns an Array of Monster records (raises on error).
monsters = client.Monster.list
```


### MotionValue

Create an instance: `motion_value = client.MotionValue`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `damage_type` | `String` |  |
| `exhaust` | `Integer` |  |
| `hit` | `Array` |  |
| `id` | `Integer` |  |
| `stun` | `Integer` |  |
| `weapon_type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare MotionValue record (raises on error).
motion_value = client.MotionValue.load({ "id" => "motion_value_id" })
```

#### Example: List

```ruby
# list returns an Array of MotionValue records (raises on error).
motion_values = client.MotionValue.list
```


### Skill

Create an instance: `skill = client.Skill`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rank` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Skill record (raises on error).
skill = client.Skill.load({ "id" => "skill_id" })
```

#### Example: List

```ruby
# list returns an Array of Skill records (raises on error).
skills = client.Skill.list
```


### Weapon

Create an instance: `weapon = client.Weapon`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asset` | `Hash` |  |
| `attack` | `Hash` |  |
| `attribute` | `Hash` |  |
| `crafting` | `Hash` |  |
| `damage_type` | `String` |  |
| `element` | `Array` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `rarity` | `Integer` |  |
| `slot` | `Array` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Weapon record (raises on error).
weapon = client.Weapon.load({ "id" => "weapon_id" })
```

#### Example: List

```ruby
# list returns an Array of Weapon records (raises on error).
weapons = client.Weapon.list
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── MonsterHunterWorld_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`MonsterHunterWorld_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
ailment = client.Ailment
ailment.list()

# ailment.data_get now returns the ailment data from the last list
# ailment.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
