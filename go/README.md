# MonsterHunterWorld Golang SDK



The Golang SDK for the MonsterHunterWorld API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Ailment(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/monster-hunter-world-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/monster-hunter-world-sdk/go=../monster-hunter-world-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"
)

func main() {
    client := sdk.New()

    // List ailment records — the value is the array of records itself.
    ailments, err := client.Ailment(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range ailments.([]any) {
        fmt.Println(item)
    }

    // Load a single ailment — the value is the loaded record.
    ailment, err := client.Ailment(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(ailment)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
ailments, err := client.Ailment(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = ailments
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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

ailment, err := client.Ailment(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(ailment) // the returned mock data
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
MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE
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
| `Ailment` | `(data map[string]any) MonsterHunterWorldEntity` | Create an Ailment entity instance. |
| `Armor` | `(data map[string]any) MonsterHunterWorldEntity` | Create an Armor entity instance. |
| `ArmorSet` | `(data map[string]any) MonsterHunterWorldEntity` | Create an ArmorSet entity instance. |
| `Charm` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Charm entity instance. |
| `Decoration` | `(data map[string]any) MonsterHunterWorldEntity` | Create a Decoration entity instance. |
| `Event` | `(data map[string]any) MonsterHunterWorldEntity` | Create an Event entity instance. |
| `Item` | `(data map[string]any) MonsterHunterWorldEntity` | Create an Item entity instance. |
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    ailment, err := client.Ailment(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // ailment is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Ailment

| Field | Description |
| --- | --- |
| `"description"` | A short description of the ailment |
| `"id"` | The ID of the ailment |
| `"name"` | The name of the ailment |
| `"protection"` |  |
| `"recovery"` |  |

Operations: List, Load.

API path: `/ailments`

#### Armor

| Field | Description |
| --- | --- |
| `"armorSet"` |  |
| `"assets"` |  |
| `"attributes"` | Dictionary of attribute modifiers attached to the armor piece |
| `"crafting"` |  |
| `"defense"` |  |
| `"id"` | The ID of the armor piece |
| `"name"` | The name of the armor piece |
| `"rank"` | The rank of the armor piece |
| `"rarity"` | The rarity of the armor piece |
| `"resistances"` |  |
| `"skills"` | An array of skill ranks granted by the armor |
| `"slots"` | An array of decoration slot information |
| `"type"` | The slot the armor piece fits in |

Operations: List, Load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `"bonus"` | The set bonus, if any |
| `"id"` | The ID of the armor set |
| `"name"` | The name of the armor set |
| `"pieces"` | Array of armor pieces in the set |
| `"rank"` | The rank of the armor set |

Operations: List, Load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `"crafting"` |  |
| `"id"` | The ID of the charm |
| `"name"` | The name of the charm |
| `"rarity"` | The rarity of the charm |
| `"skills"` | An array of skill ranks granted by the charm |

Operations: List, Load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `"id"` | The ID of the decoration |
| `"name"` | The name of the decoration |
| `"rarity"` | The rarity of the decoration |
| `"skills"` | An array of skill ranks granted by the decoration |
| `"slot"` | The slot rank required for the decoration |

Operations: List, Load.

API path: `/decorations`

#### Event

| Field | Description |
| --- | --- |
| `"camps"` | An array of camps in the location |
| `"description"` | A description of the event |
| `"endTimestamp"` | The end time of the event |
| `"exclusive"` | Whether the event is exclusive to a platform |
| `"expansion"` | The expansion the event belongs to |
| `"id"` | The ID of the location |
| `"location"` |  |
| `"name"` | The name of the location |
| `"platform"` | The platform for the event |
| `"questRank"` | The quest rank of the event |
| `"requirements"` | Requirements for the event |
| `"startTimestamp"` | The start time of the event |
| `"successConditions"` | Conditions for success |
| `"type"` | The type of event |
| `"zoneCount"` | The number of zones in the location |

Operations: List, Load.

API path: `/events`

#### Item

| Field | Description |
| --- | --- |
| `"buyPrice"` | The price when buying the item |
| `"carryLimit"` | The maximum number of this item that can be carried |
| `"description"` | A description of the item |
| `"id"` | The ID of the item |
| `"name"` | The name of the item |
| `"rarity"` | The rarity of the item |
| `"sellPrice"` | The price when selling the item |
| `"value"` | The value of the item |

Operations: List, Load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `"camps"` | An array of camps in the location |
| `"id"` | The ID of the location |
| `"name"` | The name of the location |
| `"zoneCount"` | The number of zones in the location |

Operations: List, Load.

API path: `/locations`

#### Monster

| Field | Description |
| --- | --- |
| `"ailments"` | Ailments the monster can inflict |
| `"description"` | A description of the monster |
| `"elements"` | Elements the monster uses |
| `"id"` | The ID of the monster |
| `"locations"` | Locations where the monster can be found |
| `"name"` | The name of the monster |
| `"resistances"` | Resistances of the monster |
| `"rewards"` | Rewards obtained from the monster |
| `"species"` | The species of the monster |
| `"type"` | The type of monster |
| `"weaknesses"` | Weaknesses of the monster |

Operations: List, Load.

API path: `/monsters`

#### MotionValue

| Field | Description |
| --- | --- |
| `"damageType"` | The type of damage |
| `"exhaust"` | Exhaust value |
| `"hits"` | Hit information |
| `"id"` | The ID of the motion value |
| `"stun"` | Stun value |
| `"weaponType"` | The type of weapon |

Operations: List, Load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `"description"` | A description of the skill |
| `"id"` | The ID of the skill |
| `"name"` | The name of the skill |
| `"ranks"` | An array of skill ranks |

Operations: List, Load.

API path: `/skills`

#### Weapon

| Field | Description |
| --- | --- |
| `"assets"` | Asset URLs for the weapon |
| `"attack"` | Attack values for the weapon |
| `"attributes"` | Additional weapon attributes |
| `"crafting"` | Crafting information for the weapon |
| `"damageType"` | The damage type of the weapon |
| `"elements"` | Elemental damage information |
| `"id"` | The ID of the weapon |
| `"name"` | The name of the weapon |
| `"rarity"` | The rarity of the weapon |
| `"slots"` | An array of decoration slot information |
| `"type"` | The type of weapon |

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
| `description` | `string` | A short description of the ailment |
| `id` | `int` | The ID of the ailment |
| `name` | `string` | The name of the ailment |
| `protection` | `map[string]any` |  |
| `recovery` | `map[string]any` |  |

#### Example: Load

```go
ailment, err := client.Ailment(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(ailment) // the loaded record
```

#### Example: List

```go
ailments, err := client.Ailment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(ailments) // the array of records
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
| `armorSet` | `map[string]any` |  |
| `assets` | `map[string]any` |  |
| `attributes` | `map[string]any` | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `map[string]any` |  |
| `defense` | `map[string]any` |  |
| `id` | `int` | The ID of the armor piece |
| `name` | `string` | The name of the armor piece |
| `rank` | `string` | The rank of the armor piece |
| `rarity` | `int` | The rarity of the armor piece |
| `resistances` | `map[string]any` |  |
| `skills` | `[]any` | An array of skill ranks granted by the armor |
| `slots` | `[]any` | An array of decoration slot information |
| `type` | `string` | The slot the armor piece fits in |

#### Example: Load

```go
armor, err := client.Armor(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(armor) // the loaded record
```

#### Example: List

```go
armors, err := client.Armor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(armors) // the array of records
```


### ArmorSet

Create an instance: `armorSet := client.ArmorSet(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | `map[string]any` | The set bonus, if any |
| `id` | `int` | The ID of the armor set |
| `name` | `string` | The name of the armor set |
| `pieces` | `[]any` | Array of armor pieces in the set |
| `rank` | `string` | The rank of the armor set |

#### Example: Load

```go
armorSet, err := client.ArmorSet(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(armorSet) // the loaded record
```

#### Example: List

```go
armorSets, err := client.ArmorSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(armorSets) // the array of records
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
| `crafting` | `map[string]any` |  |
| `id` | `int` | The ID of the charm |
| `name` | `string` | The name of the charm |
| `rarity` | `int` | The rarity of the charm |
| `skills` | `[]any` | An array of skill ranks granted by the charm |

#### Example: Load

```go
charm, err := client.Charm(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(charm) // the loaded record
```

#### Example: List

```go
charms, err := client.Charm(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(charms) // the array of records
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
| `id` | `int` | The ID of the decoration |
| `name` | `string` | The name of the decoration |
| `rarity` | `int` | The rarity of the decoration |
| `skills` | `[]any` | An array of skill ranks granted by the decoration |
| `slot` | `int` | The slot rank required for the decoration |

#### Example: Load

```go
decoration, err := client.Decoration(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(decoration) // the loaded record
```

#### Example: List

```go
decorations, err := client.Decoration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(decorations) // the array of records
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
| `camps` | `[]any` | An array of camps in the location |
| `description` | `string` | A description of the event |
| `endTimestamp` | `string` | The end time of the event |
| `exclusive` | `string` | Whether the event is exclusive to a platform |
| `expansion` | `string` | The expansion the event belongs to |
| `id` | `int` | The ID of the location |
| `location` | `map[string]any` |  |
| `name` | `string` | The name of the location |
| `platform` | `string` | The platform for the event |
| `questRank` | `string` | The quest rank of the event |
| `requirements` | `string` | Requirements for the event |
| `startTimestamp` | `string` | The start time of the event |
| `successConditions` | `string` | Conditions for success |
| `type` | `string` | The type of event |
| `zoneCount` | `int` | The number of zones in the location |

#### Example: Load

```go
event, err := client.Event(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(event) // the loaded record
```

#### Example: List

```go
events, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(events) // the array of records
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
| `buyPrice` | `int` | The price when buying the item |
| `carryLimit` | `int` | The maximum number of this item that can be carried |
| `description` | `string` | A description of the item |
| `id` | `int` | The ID of the item |
| `name` | `string` | The name of the item |
| `rarity` | `int` | The rarity of the item |
| `sellPrice` | `int` | The price when selling the item |
| `value` | `int` | The value of the item |

#### Example: Load

```go
item, err := client.Item(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(item) // the loaded record
```

#### Example: List

```go
items, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(items) // the array of records
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
| `camps` | `[]any` | An array of camps in the location |
| `id` | `int` | The ID of the location |
| `name` | `string` | The name of the location |
| `zoneCount` | `int` | The number of zones in the location |

#### Example: Load

```go
location, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(location) // the loaded record
```

#### Example: List

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(locations) // the array of records
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
| `ailments` | `[]any` | Ailments the monster can inflict |
| `description` | `string` | A description of the monster |
| `elements` | `[]any` | Elements the monster uses |
| `id` | `int` | The ID of the monster |
| `locations` | `[]any` | Locations where the monster can be found |
| `name` | `string` | The name of the monster |
| `resistances` | `[]any` | Resistances of the monster |
| `rewards` | `[]any` | Rewards obtained from the monster |
| `species` | `string` | The species of the monster |
| `type` | `string` | The type of monster |
| `weaknesses` | `[]any` | Weaknesses of the monster |

#### Example: Load

```go
monster, err := client.Monster(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(monster) // the loaded record
```

#### Example: List

```go
monsters, err := client.Monster(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(monsters) // the array of records
```


### MotionValue

Create an instance: `motionValue := client.MotionValue(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `damageType` | `string` | The type of damage |
| `exhaust` | `int` | Exhaust value |
| `hits` | `[]any` | Hit information |
| `id` | `int` | The ID of the motion value |
| `stun` | `int` | Stun value |
| `weaponType` | `string` | The type of weapon |

#### Example: Load

```go
motionValue, err := client.MotionValue(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(motionValue) // the loaded record
```

#### Example: List

```go
motionValues, err := client.MotionValue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(motionValues) // the array of records
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
| `description` | `string` | A description of the skill |
| `id` | `int` | The ID of the skill |
| `name` | `string` | The name of the skill |
| `ranks` | `[]any` | An array of skill ranks |

#### Example: Load

```go
skill, err := client.Skill(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(skill) // the loaded record
```

#### Example: List

```go
skills, err := client.Skill(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(skills) // the array of records
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
| `assets` | `map[string]any` | Asset URLs for the weapon |
| `attack` | `map[string]any` | Attack values for the weapon |
| `attributes` | `map[string]any` | Additional weapon attributes |
| `crafting` | `map[string]any` | Crafting information for the weapon |
| `damageType` | `string` | The damage type of the weapon |
| `elements` | `[]any` | Elemental damage information |
| `id` | `int` | The ID of the weapon |
| `name` | `string` | The name of the weapon |
| `rarity` | `int` | The rarity of the weapon |
| `slots` | `[]any` | An array of decoration slot information |
| `type` | `string` | The type of weapon |

#### Example: Load

```go
weapon, err := client.Weapon(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(weapon) // the loaded record
```

#### Example: List

```go
weapons, err := client.Weapon(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(weapons) // the array of records
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **RatelimitFeature**: Rate limiting
- **RetryFeature**: Retry
- **TestFeature**: Test transport
- **TimeoutFeature**: Timeout

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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
ailment := client.Ailment(nil)
ailment.List(nil, nil)

// ailment.Data() now returns the ailment data from the last list
// ailment.Match() returns the last match criteria
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
