# MonsterHunterWorld Python SDK Reference

Complete API reference for the MonsterHunterWorld Python SDK.


## MonsterHunterWorldSDK

### Constructor

```python
from monsterhunterworld_sdk import MonsterHunterWorldSDK

client = MonsterHunterWorldSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MonsterHunterWorldSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = MonsterHunterWorldSDK.test()
```


### Instance Methods

#### `Ailment(data=None)`

Create a new `AilmentEntity` instance. Pass `None` for no initial data.

#### `Armor(data=None)`

Create a new `ArmorEntity` instance. Pass `None` for no initial data.

#### `ArmorSet(data=None)`

Create a new `ArmorSetEntity` instance. Pass `None` for no initial data.

#### `Charm(data=None)`

Create a new `CharmEntity` instance. Pass `None` for no initial data.

#### `Decoration(data=None)`

Create a new `DecorationEntity` instance. Pass `None` for no initial data.

#### `Event(data=None)`

Create a new `EventEntity` instance. Pass `None` for no initial data.

#### `Item(data=None)`

Create a new `ItemEntity` instance. Pass `None` for no initial data.

#### `Location(data=None)`

Create a new `LocationEntity` instance. Pass `None` for no initial data.

#### `Monster(data=None)`

Create a new `MonsterEntity` instance. Pass `None` for no initial data.

#### `MotionValue(data=None)`

Create a new `MotionValueEntity` instance. Pass `None` for no initial data.

#### `Skill(data=None)`

Create a new `SkillEntity` instance. Pass `None` for no initial data.

#### `Weapon(data=None)`

Create a new `WeaponEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AilmentEntity

```python
ailment = client.Ailment()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `protection` | `dict` | No |  |
| `recovery` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Ailment().list()
for ailment in results:
    print(ailment)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Ailment().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AilmentEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArmorEntity

```python
armor = client.Armor()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armorSet` | `dict` | No |  |
| `assets` | `dict` | No |  |
| `attributes` | `dict` | No |  |
| `crafting` | `dict` | No |  |
| `defense` | `dict` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `rank` | `str` | No |  |
| `rarity` | `int` | No |  |
| `resistances` | `dict` | No |  |
| `skills` | `list` | No |  |
| `slots` | `list` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Armor().list()
for armor in results:
    print(armor)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Armor().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArmorEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ArmorSetEntity

```python
armor_set = client.ArmorSet()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `dict` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `pieces` | `list` | No |  |
| `rank` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.ArmorSet().list()
for armor_set in results:
    print(armor_set)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ArmorSet().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ArmorSetEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CharmEntity

```python
charm = client.Charm()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `dict` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Charm().list()
for charm in results:
    print(charm)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Charm().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CharmEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DecorationEntity

```python
decoration = client.Decoration()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `list` | No |  |
| `slot` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Decoration().list()
for decoration in results:
    print(decoration)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Decoration().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DecorationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EventEntity

```python
event = client.Event()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `list` | No |  |
| `description` | `str` | No |  |
| `endTimestamp` | `str` | No |  |
| `exclusive` | `str` | No |  |
| `expansion` | `str` | No |  |
| `id` | `int` | No |  |
| `location` | `dict` | No |  |
| `name` | `str` | No |  |
| `platform` | `str` | No |  |
| `questRank` | `str` | No |  |
| `requirements` | `str` | No |  |
| `startTimestamp` | `str` | No |  |
| `successConditions` | `str` | No |  |
| `type` | `str` | No |  |
| `zoneCount` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Event().list()
for event in results:
    print(event)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Event().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EventEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ItemEntity

```python
item = client.Item()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buyPrice` | `int` | No |  |
| `carryLimit` | `int` | No |  |
| `description` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `rarity` | `int` | No |  |
| `sellPrice` | `int` | No |  |
| `value` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Item().list()
for item in results:
    print(item)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Item().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ItemEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationEntity

```python
location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `list` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `zoneCount` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Location().list()
for location in results:
    print(location)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Location().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MonsterEntity

```python
monster = client.Monster()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailments` | `list` | No |  |
| `description` | `str` | No |  |
| `elements` | `list` | No |  |
| `id` | `int` | No |  |
| `locations` | `list` | No |  |
| `name` | `str` | No |  |
| `resistances` | `list` | No |  |
| `rewards` | `list` | No |  |
| `species` | `str` | No |  |
| `type` | `str` | No |  |
| `weaknesses` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Monster().list()
for monster in results:
    print(monster)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Monster().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MonsterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## MotionValueEntity

```python
motion_value = client.MotionValue()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `str` | No |  |
| `exhaust` | `int` | No |  |
| `hits` | `list` | No |  |
| `id` | `int` | No |  |
| `stun` | `int` | No |  |
| `weaponType` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.MotionValue().list()
for motion_value in results:
    print(motion_value)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.MotionValue().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `MotionValueEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SkillEntity

```python
skill = client.Skill()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `str` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `ranks` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Skill().list()
for skill in results:
    print(skill)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Skill().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SkillEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## WeaponEntity

```python
weapon = client.Weapon()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assets` | `dict` | No |  |
| `attack` | `dict` | No |  |
| `attributes` | `dict` | No |  |
| `crafting` | `dict` | No |  |
| `damageType` | `str` | No |  |
| `elements` | `list` | No |  |
| `id` | `int` | No |  |
| `name` | `str` | No |  |
| `rarity` | `int` | No |  |
| `slots` | `list` | No |  |
| `type` | `str` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Weapon().list()
for weapon in results:
    print(weapon)
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Weapon().load({"id": 1})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `WeaponEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = MonsterHunterWorldSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

