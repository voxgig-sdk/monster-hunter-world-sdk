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
| `description` | `str` | No | A short description of the ailment |
| `id` | `int` | No | The ID of the ailment |
| `name` | `str` | No | The name of the ailment |
| `protection` | `dict` | No |  |
| `recovery` | `dict` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[AilmentEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Ailment().list()
for ailment in results:
    print(ailment.data_get())
```

#### `load(reqmatch, ctrl=None) -> AilmentEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `attributes` | `dict` | No | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `dict` | No |  |
| `defense` | `dict` | No |  |
| `id` | `int` | No | The ID of the armor piece |
| `name` | `str` | No | The name of the armor piece |
| `rank` | `str` | No | The rank of the armor piece |
| `rarity` | `int` | No | The rarity of the armor piece |
| `resistances` | `dict` | No |  |
| `skills` | `list` | No | An array of skill ranks granted by the armor |
| `slots` | `list` | No | An array of decoration slot information |
| `type` | `str` | No | The slot the armor piece fits in |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ArmorEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Armor().list()
for armor in results:
    print(armor.data_get())
```

#### `load(reqmatch, ctrl=None) -> ArmorEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `bonus` | `dict` | No | The set bonus, if any |
| `id` | `int` | No | The ID of the armor set |
| `name` | `str` | No | The name of the armor set |
| `pieces` | `list` | No | Array of armor pieces in the set |
| `rank` | `str` | No | The rank of the armor set |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ArmorSetEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.ArmorSet().list()
for armor_set in results:
    print(armor_set.data_get())
```

#### `load(reqmatch, ctrl=None) -> ArmorSetEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `id` | `int` | No | The ID of the charm |
| `name` | `str` | No | The name of the charm |
| `rarity` | `int` | No | The rarity of the charm |
| `skills` | `list` | No | An array of skill ranks granted by the charm |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[CharmEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Charm().list()
for charm in results:
    print(charm.data_get())
```

#### `load(reqmatch, ctrl=None) -> CharmEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `id` | `int` | No | The ID of the decoration |
| `name` | `str` | No | The name of the decoration |
| `rarity` | `int` | No | The rarity of the decoration |
| `skills` | `list` | No | An array of skill ranks granted by the decoration |
| `slot` | `int` | No | The slot rank required for the decoration |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[DecorationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Decoration().list()
for decoration in results:
    print(decoration.data_get())
```

#### `load(reqmatch, ctrl=None) -> DecorationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `description` | `str` | No | A description of the event |
| `endTimestamp` | `str` | No | The end time of the event |
| `exclusive` | `str` | No | Whether the event is exclusive to a platform |
| `expansion` | `str` | No | The expansion the event belongs to |
| `id` | `int` | No | The ID of the event |
| `location` | `dict` | No |  |
| `name` | `str` | No | The name of the event |
| `platform` | `str` | No | The platform for the event |
| `questRank` | `str` | No | The quest rank of the event |
| `requirements` | `str` | No | Requirements for the event |
| `startTimestamp` | `str` | No | The start time of the event |
| `successConditions` | `str` | No | Conditions for success |
| `type` | `str` | No | The type of event |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[EventEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Event().list()
for event in results:
    print(event.data_get())
```

#### `load(reqmatch, ctrl=None) -> EventEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `buyPrice` | `int` | No | The price when buying the item |
| `carryLimit` | `int` | No | The maximum number of this item that can be carried |
| `description` | `str` | No | A description of the item |
| `id` | `int` | No | The ID of the item |
| `name` | `str` | No | The name of the item |
| `rarity` | `int` | No | The rarity of the item |
| `sellPrice` | `int` | No | The price when selling the item |
| `value` | `int` | No | The value of the item |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[ItemEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Item().list()
for item in results:
    print(item.data_get())
```

#### `load(reqmatch, ctrl=None) -> ItemEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `camps` | `list` | No | An array of camps in the location |
| `id` | `int` | No | The ID of the location |
| `name` | `str` | No | The name of the location |
| `zoneCount` | `int` | No | The number of zones in the location |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[LocationEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Location().list()
for location in results:
    print(location.data_get())
```

#### `load(reqmatch, ctrl=None) -> LocationEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `ailments` | `list` | No | Ailments the monster can inflict |
| `description` | `str` | No | A description of the monster |
| `elements` | `list` | No | Elements the monster uses |
| `id` | `int` | No | The ID of the monster |
| `locations` | `list` | No | Locations where the monster can be found |
| `name` | `str` | No | The name of the monster |
| `resistances` | `list` | No | Resistances of the monster |
| `rewards` | `list` | No | Rewards obtained from the monster |
| `species` | `str` | No | The species of the monster |
| `type` | `str` | No | The type of monster |
| `weaknesses` | `list` | No | Weaknesses of the monster |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MonsterEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Monster().list()
for monster in results:
    print(monster.data_get())
```

#### `load(reqmatch, ctrl=None) -> MonsterEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `damageType` | `str` | No | The type of damage |
| `exhaust` | `int` | No | Exhaust value |
| `hits` | `list` | No | Hit information |
| `id` | `int` | No | The ID of the motion value |
| `stun` | `int` | No | Stun value |
| `weaponType` | `str` | No | The type of weapon |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[MotionValueEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.MotionValue().list()
for motion_value in results:
    print(motion_value.data_get())
```

#### `load(reqmatch, ctrl=None) -> MotionValueEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `description` | `str` | No | A description of the skill |
| `id` | `int` | No | The ID of the skill |
| `name` | `str` | No | The name of the skill |
| `ranks` | `list` | No | An array of skill ranks |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[SkillEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Skill().list()
for skill in results:
    print(skill.data_get())
```

#### `load(reqmatch, ctrl=None) -> SkillEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `assets` | `dict` | No | Asset URLs for the weapon |
| `attack` | `dict` | No | Attack values for the weapon |
| `attributes` | `dict` | No | Additional weapon attributes |
| `crafting` | `dict` | No | Crafting information for the weapon |
| `damageType` | `str` | No | The damage type of the weapon |
| `elements` | `list` | No | Elemental damage information |
| `id` | `int` | No | The ID of the weapon |
| `name` | `str` | No | The name of the weapon |
| `rarity` | `int` | No | The rarity of the weapon |
| `slots` | `list` | No | An array of decoration slot information |
| `type` | `str` | No | The type of weapon |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list[WeaponEntity]`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list of entities, one per record, and raises on error.

```python
results = client.Weapon().list()
for weapon in results:
    print(weapon.data_get())
```

#### `load(reqmatch, ctrl=None) -> WeaponEntity`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and raises on error.

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
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```python
client = MonsterHunterWorldSDK({
    "feature": {
        "ratelimit": {"active": True},
        "retry": {"active": True},
        "test": {"active": True},
        "timeout": {"active": True},
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

Rate limiting.

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

Retry.

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

Test transport.

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

Timeout.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

| Option | Type |
|---|---|
| `clearTimer` | function |
| `now` | function |
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

