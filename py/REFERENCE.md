# MonsterHunterWorld Python SDK Reference

Complete API reference for the MonsterHunterWorld Python SDK.


## MonsterHunterWorldSDK

### Constructor

```python
from monster-hunter-world_sdk import MonsterHunterWorldSDK

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
ailment = client.ailment
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `protection` | ``$OBJECT`` | No |  |
| `recovery` | ``$OBJECT`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.ailment.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ailment.load({"id": "ailment_id"})
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
armor = client.armor
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armor_set` | ``$OBJECT`` | No |  |
| `asset` | ``$OBJECT`` | No |  |
| `attribute` | ``$OBJECT`` | No |  |
| `crafting` | ``$OBJECT`` | No |  |
| `defense` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `resistance` | ``$OBJECT`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `slot` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.armor.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.armor.load({"id": "armor_id"})
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
armor_set = client.armor_set
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `piece` | ``$ARRAY`` | No |  |
| `rank` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.armor_set.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.armor_set.load({"id": "armor_set_id"})
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
charm = client.charm
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | ``$OBJECT`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.charm.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.charm.load({"id": "charm_id"})
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
decoration = client.decoration
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `skill` | ``$ARRAY`` | No |  |
| `slot` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.decoration.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.decoration.load({"id": "decoration_id"})
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
event = client.event
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `end_timestamp` | ``$STRING`` | No |  |
| `exclusive` | ``$STRING`` | No |  |
| `expansion` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$OBJECT`` | No |  |
| `name` | ``$STRING`` | No |  |
| `platform` | ``$STRING`` | No |  |
| `quest_rank` | ``$STRING`` | No |  |
| `requirement` | ``$STRING`` | No |  |
| `start_timestamp` | ``$STRING`` | No |  |
| `success_condition` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.event.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.event.load({"id": "event_id"})
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
item = client.item
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `buy_price` | ``$INTEGER`` | No |  |
| `carry_limit` | ``$INTEGER`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `sell_price` | ``$INTEGER`` | No |  |
| `value` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.item.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.item.load({"id": "item_id"})
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
location = client.location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camp` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `zone_count` | ``$INTEGER`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.location.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.location.load({"id": "location_id"})
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
monster = client.monster
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailment` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `element` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `location` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `resistance` | ``$ARRAY`` | No |  |
| `reward` | ``$ARRAY`` | No |  |
| `species` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `weakness` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.monster.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.monster.load({"id": "monster_id"})
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
motion_value = client.motion_value
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damage_type` | ``$STRING`` | No |  |
| `exhaust` | ``$INTEGER`` | No |  |
| `hit` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `stun` | ``$INTEGER`` | No |  |
| `weapon_type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.motion_value.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.motion_value.load({"id": "motion_value_id"})
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
skill = client.skill
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rank` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.skill.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.skill.load({"id": "skill_id"})
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
weapon = client.weapon
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `asset` | ``$OBJECT`` | No |  |
| `attack` | ``$OBJECT`` | No |  |
| `attribute` | ``$OBJECT`` | No |  |
| `crafting` | ``$OBJECT`` | No |  |
| `damage_type` | ``$STRING`` | No |  |
| `element` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `rarity` | ``$INTEGER`` | No |  |
| `slot` | ``$ARRAY`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.weapon.list({})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.weapon.load({"id": "weapon_id"})
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

