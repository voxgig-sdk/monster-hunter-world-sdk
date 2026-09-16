# MonsterHunterWorld Golang SDK Reference

Complete API reference for the MonsterHunterWorld Golang SDK.


## MonsterHunterWorldSDK

### Constructor

```go
func NewMonsterHunterWorldSDK(options map[string]any) *MonsterHunterWorldSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *MonsterHunterWorldSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *MonsterHunterWorldSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Ailment(data map[string]any) MonsterHunterWorldEntity`

Create a new `Ailment` entity instance. Pass `nil` for no initial data.

#### `Armor(data map[string]any) MonsterHunterWorldEntity`

Create a new `Armor` entity instance. Pass `nil` for no initial data.

#### `ArmorSet(data map[string]any) MonsterHunterWorldEntity`

Create a new `ArmorSet` entity instance. Pass `nil` for no initial data.

#### `Charm(data map[string]any) MonsterHunterWorldEntity`

Create a new `Charm` entity instance. Pass `nil` for no initial data.

#### `Decoration(data map[string]any) MonsterHunterWorldEntity`

Create a new `Decoration` entity instance. Pass `nil` for no initial data.

#### `Event(data map[string]any) MonsterHunterWorldEntity`

Create a new `Event` entity instance. Pass `nil` for no initial data.

#### `Item(data map[string]any) MonsterHunterWorldEntity`

Create a new `Item` entity instance. Pass `nil` for no initial data.

#### `Location(data map[string]any) MonsterHunterWorldEntity`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Monster(data map[string]any) MonsterHunterWorldEntity`

Create a new `Monster` entity instance. Pass `nil` for no initial data.

#### `MotionValue(data map[string]any) MonsterHunterWorldEntity`

Create a new `MotionValue` entity instance. Pass `nil` for no initial data.

#### `Skill(data map[string]any) MonsterHunterWorldEntity`

Create a new `Skill` entity instance. Pass `nil` for no initial data.

#### `Weapon(data map[string]any) MonsterHunterWorldEntity`

Create a new `Weapon` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AilmentEntity

```go
ailment := client.Ailment(nil)
fmt.Println(ailment.GetName()) // "ailment"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A short description of the ailment |
| `id` | `int` | No | The ID of the ailment |
| `name` | `string` | No | The name of the ailment |
| `protection` | `map[string]any` | No |  |
| `recovery` | `map[string]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Ailment(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Ailment(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AilmentEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArmorEntity

```go
armor := client.Armor(nil)
fmt.Println(armor.GetName()) // "armor"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armorSet` | `map[string]any` | No |  |
| `assets` | `map[string]any` | No |  |
| `attributes` | `map[string]any` | No | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `map[string]any` | No |  |
| `defense` | `map[string]any` | No |  |
| `id` | `int` | No | The ID of the armor piece |
| `name` | `string` | No | The name of the armor piece |
| `rank` | `string` | No | The rank of the armor piece |
| `rarity` | `int` | No | The rarity of the armor piece |
| `resistances` | `map[string]any` | No |  |
| `skills` | `[]any` | No | An array of skill ranks granted by the armor |
| `slots` | `[]any` | No | An array of decoration slot information |
| `type` | `string` | No | The slot the armor piece fits in |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Armor(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Armor(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArmorEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ArmorSetEntity

```go
armorSet := client.ArmorSet(nil)
fmt.Println(armorSet.GetName()) // "armor_set"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `map[string]any` | No | The set bonus, if any |
| `id` | `int` | No | The ID of the armor set |
| `name` | `string` | No | The name of the armor set |
| `pieces` | `[]any` | No | Array of armor pieces in the set |
| `rank` | `string` | No | The rank of the armor set |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.ArmorSet(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ArmorSet(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ArmorSetEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CharmEntity

```go
charm := client.Charm(nil)
fmt.Println(charm.GetName()) // "charm"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `map[string]any` | No |  |
| `id` | `int` | No | The ID of the charm |
| `name` | `string` | No | The name of the charm |
| `rarity` | `int` | No | The rarity of the charm |
| `skills` | `[]any` | No | An array of skill ranks granted by the charm |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Charm(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Charm(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CharmEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DecorationEntity

```go
decoration := client.Decoration(nil)
fmt.Println(decoration.GetName()) // "decoration"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | The ID of the decoration |
| `name` | `string` | No | The name of the decoration |
| `rarity` | `int` | No | The rarity of the decoration |
| `skills` | `[]any` | No | An array of skill ranks granted by the decoration |
| `slot` | `int` | No | The slot rank required for the decoration |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Decoration(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Decoration(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DecorationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EventEntity

```go
event := client.Event(nil)
fmt.Println(event.GetName()) // "event"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `[]any` | No | An array of camps in the location |
| `description` | `string` | No | A description of the event |
| `endTimestamp` | `string` | No | The end time of the event |
| `exclusive` | `string` | No | Whether the event is exclusive to a platform |
| `expansion` | `string` | No | The expansion the event belongs to |
| `id` | `int` | No | The ID of the location |
| `location` | `map[string]any` | No |  |
| `name` | `string` | No | The name of the location |
| `platform` | `string` | No | The platform for the event |
| `questRank` | `string` | No | The quest rank of the event |
| `requirements` | `string` | No | Requirements for the event |
| `startTimestamp` | `string` | No | The start time of the event |
| `successConditions` | `string` | No | Conditions for success |
| `type` | `string` | No | The type of event |
| `zoneCount` | `int` | No | The number of zones in the location |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Event(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Event(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EventEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ItemEntity

```go
item := client.Item(nil)
fmt.Println(item.GetName()) // "item"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buyPrice` | `int` | No | The price when buying the item |
| `carryLimit` | `int` | No | The maximum number of this item that can be carried |
| `description` | `string` | No | A description of the item |
| `id` | `int` | No | The ID of the item |
| `name` | `string` | No | The name of the item |
| `rarity` | `int` | No | The rarity of the item |
| `sellPrice` | `int` | No | The price when selling the item |
| `value` | `int` | No | The value of the item |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Item(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Item(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ItemEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LocationEntity

```go
location := client.Location(nil)
fmt.Println(location.GetName()) // "location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `[]any` | No | An array of camps in the location |
| `id` | `int` | No | The ID of the location |
| `name` | `string` | No | The name of the location |
| `zoneCount` | `int` | No | The number of zones in the location |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MonsterEntity

```go
monster := client.Monster(nil)
fmt.Println(monster.GetName()) // "monster"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailments` | `[]any` | No | Ailments the monster can inflict |
| `description` | `string` | No | A description of the monster |
| `elements` | `[]any` | No | Elements the monster uses |
| `id` | `int` | No | The ID of the monster |
| `locations` | `[]any` | No | Locations where the monster can be found |
| `name` | `string` | No | The name of the monster |
| `resistances` | `[]any` | No | Resistances of the monster |
| `rewards` | `[]any` | No | Rewards obtained from the monster |
| `species` | `string` | No | The species of the monster |
| `type` | `string` | No | The type of monster |
| `weaknesses` | `[]any` | No | Weaknesses of the monster |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Monster(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Monster(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## MotionValueEntity

```go
motionValue := client.MotionValue(nil)
fmt.Println(motionValue.GetName()) // "motion_value"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `string` | No | The type of damage |
| `exhaust` | `int` | No | Exhaust value |
| `hits` | `[]any` | No | Hit information |
| `id` | `int` | No | The ID of the motion value |
| `stun` | `int` | No | Stun value |
| `weaponType` | `string` | No | The type of weapon |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.MotionValue(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.MotionValue(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `MotionValueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SkillEntity

```go
skill := client.Skill(nil)
fmt.Println(skill.GetName()) // "skill"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | A description of the skill |
| `id` | `int` | No | The ID of the skill |
| `name` | `string` | No | The name of the skill |
| `ranks` | `[]any` | No | An array of skill ranks |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Skill(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Skill(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SkillEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## WeaponEntity

```go
weapon := client.Weapon(nil)
fmt.Println(weapon.GetName()) // "weapon"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assets` | `map[string]any` | No | Asset URLs for the weapon |
| `attack` | `map[string]any` | No | Attack values for the weapon |
| `attributes` | `map[string]any` | No | Additional weapon attributes |
| `crafting` | `map[string]any` | No | Crafting information for the weapon |
| `damageType` | `string` | No | The damage type of the weapon |
| `elements` | `[]any` | No | Elemental damage information |
| `id` | `int` | No | The ID of the weapon |
| `name` | `string` | No | The name of the weapon |
| `rarity` | `int` | No | The rarity of the weapon |
| `slots` | `[]any` | No | An array of decoration slot information |
| `type` | `string` | No | The type of weapon |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Weapon(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Weapon(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `WeaponEntity` instance with the same client and
options.

#### `GetName() string`

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

```go
client := sdk.NewMonsterHunterWorldSDK(map[string]any{
    "feature": map[string]any{
        "ratelimit": map[string]any{"active": true},
        "retry": map[string]any{"active": true},
        "test": map[string]any{"active": true},
        "timeout": map[string]any{"active": true},
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

