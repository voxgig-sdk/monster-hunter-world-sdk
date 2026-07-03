# MonsterHunterWorld Golang SDK



The Golang SDK for the MonsterHunterWorld API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/monster-hunter-world-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/monster-hunter-world-sdk/go=../path/to/github.com/voxgig-sdk/monster-hunter-world-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"
    "github.com/voxgig-sdk/monster-hunter-world-sdk/go/core"
)

func main() {
    client := sdk.NewMonsterHunterWorldSDK(map[string]any{
        "apikey": os.Getenv("MONSTER-HUNTER-WORLD_APIKEY"),
    })
```

### 2. List ailments

```go
    result, err := client.Ailment(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a ailment

```go
    result, err = client.Ailment(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewMonsterHunterWorldSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MONSTER-HUNTER-WORLD_TEST_LIVE=TRUE
MONSTER-HUNTER-WORLD_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewMonsterHunterWorldSDK

```go
func NewMonsterHunterWorldSDK(options map[string]any) *MonsterHunterWorldSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MonsterHunterWorldSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MonsterHunterWorldSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Ailment` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Ailment entity instance. |
| `Armor` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Armor entity instance. |
| `ArmorSet` | `(data map[string]any) MonsterHunterWorldEntity` | Create a ArmorSet entity instance. |
| `Charm` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Charm entity instance. |
| `Decoration` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Decoration entity instance. |
| `Event` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Event entity instance. |
| `Item` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Item entity instance. |
| `Location` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Location entity instance. |
| `Monster` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Monster entity instance. |
| `MotionValue` | `(data map[string]any) MonsterHunterWorldEntity` | Create a MotionValue entity instance. |
| `Skill` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Skill entity instance. |
| `Weapon` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Weapon entity instance. |

### Entity interface (MonsterHunterWorldEntity)

All entities implement the `MonsterHunterWorldEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Ailment

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"protection"` |  |
| `"recovery"` |  |

Operations: List, Load.

API path: `/ailments`

#### Armor

| Field | Description |
| --- | --- |
| `"armor_set"` |  |
| `"asset"` |  |
| `"attribute"` |  |
| `"crafting"` |  |
| `"defense"` |  |
| `"id"` |  |
| `"name"` |  |
| `"rank"` |  |
| `"rarity"` |  |
| `"resistance"` |  |
| `"skill"` |  |
| `"slot"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `"bonus"` |  |
| `"id"` |  |
| `"name"` |  |
| `"piece"` |  |
| `"rank"` |  |

Operations: List, Load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `"crafting"` |  |
| `"id"` |  |
| `"name"` |  |
| `"rarity"` |  |
| `"skill"` |  |

Operations: List, Load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"name"` |  |
| `"rarity"` |  |
| `"skill"` |  |
| `"slot"` |  |

Operations: List, Load.

API path: `/decorations`

#### Event

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"end_timestamp"` |  |
| `"exclusive"` |  |
| `"expansion"` |  |
| `"id"` |  |
| `"location"` |  |
| `"name"` |  |
| `"platform"` |  |
| `"quest_rank"` |  |
| `"requirement"` |  |
| `"start_timestamp"` |  |
| `"success_condition"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/events`

#### Item

| Field | Description |
| --- | --- |
| `"buy_price"` |  |
| `"carry_limit"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"rarity"` |  |
| `"sell_price"` |  |
| `"value"` |  |

Operations: List, Load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `"camp"` |  |
| `"id"` |  |
| `"name"` |  |
| `"zone_count"` |  |

Operations: List, Load.

API path: `/locations`

#### Monster

| Field | Description |
| --- | --- |
| `"ailment"` |  |
| `"description"` |  |
| `"element"` |  |
| `"id"` |  |
| `"location"` |  |
| `"name"` |  |
| `"resistance"` |  |
| `"reward"` |  |
| `"species"` |  |
| `"type"` |  |
| `"weakness"` |  |

Operations: List, Load.

API path: `/monsters`

#### MotionValue

| Field | Description |
| --- | --- |
| `"damage_type"` |  |
| `"exhaust"` |  |
| `"hit"` |  |
| `"id"` |  |
| `"stun"` |  |
| `"weapon_type"` |  |

Operations: List, Load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"rank"` |  |

Operations: List, Load.

API path: `/skills`

#### Weapon

| Field | Description |
| --- | --- |
| `"asset"` |  |
| `"attack"` |  |
| `"attribute"` |  |
| `"crafting"` |  |
| `"damage_type"` |  |
| `"element"` |  |
| `"id"` |  |
| `"name"` |  |
| `"rarity"` |  |
| `"slot"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/weapons`



## Entities


### Ailment

Create an instance: `ailment := client.Ailment(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `protection` | ``$OBJECT`` |  |
| `recovery` | ``$OBJECT`` |  |

#### Example: Load

```go
result, err := client.Ailment(nil).Load(map[string]any{"id": "ailment_id"}, nil)
```

#### Example: List

```go
results, err := client.Ailment(nil).List(nil, nil)
```


### Armor

Create an instance: `armor := client.Armor(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Armor(nil).Load(map[string]any{"id": "armor_id"}, nil)
```

#### Example: List

```go
results, err := client.Armor(nil).List(nil, nil)
```


### ArmorSet

Create an instance: `armor_set := client.ArmorSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `piece` | ``$ARRAY`` |  |
| `rank` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.ArmorSet(nil).Load(map[string]any{"id": "armor_set_id"}, nil)
```

#### Example: List

```go
results, err := client.ArmorSet(nil).List(nil, nil)
```


### Charm

Create an instance: `charm := client.Charm(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | ``$OBJECT`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `skill` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.Charm(nil).Load(map[string]any{"id": "charm_id"}, nil)
```

#### Example: List

```go
results, err := client.Charm(nil).List(nil, nil)
```


### Decoration

Create an instance: `decoration := client.Decoration(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rarity` | ``$INTEGER`` |  |
| `skill` | ``$ARRAY`` |  |
| `slot` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Decoration(nil).Load(map[string]any{"id": "decoration_id"}, nil)
```

#### Example: List

```go
results, err := client.Decoration(nil).List(nil, nil)
```


### Event

Create an instance: `event := client.Event(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Event(nil).Load(map[string]any{"id": "event_id"}, nil)
```

#### Example: List

```go
results, err := client.Event(nil).List(nil, nil)
```


### Item

Create an instance: `item := client.Item(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Item(nil).Load(map[string]any{"id": "item_id"}, nil)
```

#### Example: List

```go
results, err := client.Item(nil).List(nil, nil)
```


### Location

Create an instance: `location := client.Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `camp` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `zone_count` | ``$INTEGER`` |  |

#### Example: Load

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
```

#### Example: List

```go
results, err := client.Location(nil).List(nil, nil)
```


### Monster

Create an instance: `monster := client.Monster(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Monster(nil).Load(map[string]any{"id": "monster_id"}, nil)
```

#### Example: List

```go
results, err := client.Monster(nil).List(nil, nil)
```


### MotionValue

Create an instance: `motion_value := client.MotionValue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.MotionValue(nil).Load(map[string]any{"id": "motion_value_id"}, nil)
```

#### Example: List

```go
results, err := client.MotionValue(nil).List(nil, nil)
```


### Skill

Create an instance: `skill := client.Skill(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `rank` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.Skill(nil).Load(map[string]any{"id": "skill_id"}, nil)
```

#### Example: List

```go
results, err := client.Skill(nil).List(nil, nil)
```


### Weapon

Create an instance: `weapon := client.Weapon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Weapon(nil).Load(map[string]any{"id": "weapon_id"}, nil)
```

#### Example: List

```go
results, err := client.Weapon(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/monster-hunter-world-sdk/go/
├── monster-hunter-world.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/monster-hunter-world-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
