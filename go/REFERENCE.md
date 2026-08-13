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
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
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
| `attributes` | `map[string]any` | No |  |
| `crafting` | `map[string]any` | No |  |
| `defense` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rank` | `string` | No |  |
| `rarity` | `int` | No |  |
| `resistances` | `map[string]any` | No |  |
| `skills` | `[]any` | No |  |
| `slots` | `[]any` | No |  |
| `type` | `string` | No |  |

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
| `bonus` | `map[string]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `pieces` | `[]any` | No |  |
| `rank` | `string` | No |  |

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
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `[]any` | No |  |

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
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `[]any` | No |  |
| `slot` | `int` | No |  |

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
| `camps` | `[]any` | No |  |
| `description` | `string` | No |  |
| `endTimestamp` | `string` | No |  |
| `exclusive` | `string` | No |  |
| `expansion` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `map[string]any` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `questRank` | `string` | No |  |
| `requirements` | `string` | No |  |
| `startTimestamp` | `string` | No |  |
| `successConditions` | `string` | No |  |
| `type` | `string` | No |  |
| `zoneCount` | `int` | No |  |

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
| `buyPrice` | `int` | No |  |
| `carryLimit` | `int` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `sellPrice` | `int` | No |  |
| `value` | `int` | No |  |

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
| `camps` | `[]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `zoneCount` | `int` | No |  |

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
| `ailments` | `[]any` | No |  |
| `description` | `string` | No |  |
| `elements` | `[]any` | No |  |
| `id` | `int` | No |  |
| `locations` | `[]any` | No |  |
| `name` | `string` | No |  |
| `resistances` | `[]any` | No |  |
| `rewards` | `[]any` | No |  |
| `species` | `string` | No |  |
| `type` | `string` | No |  |
| `weaknesses` | `[]any` | No |  |

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
| `damageType` | `string` | No |  |
| `exhaust` | `int` | No |  |
| `hits` | `[]any` | No |  |
| `id` | `int` | No |  |
| `stun` | `int` | No |  |
| `weaponType` | `string` | No |  |

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
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `ranks` | `[]any` | No |  |

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
| `assets` | `map[string]any` | No |  |
| `attack` | `map[string]any` | No |  |
| `attributes` | `map[string]any` | No |  |
| `crafting` | `map[string]any` | No |  |
| `damageType` | `string` | No |  |
| `elements` | `[]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `slots` | `[]any` | No |  |
| `type` | `string` | No |  |

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
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewMonsterHunterWorldSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

