# MonsterHunterWorld Python SDK



The Python SDK for the MonsterHunterWorld API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Ailment()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from monsterhunterworld_sdk import MonsterHunterWorldSDK

client = MonsterHunterWorldSDK()
```

### 2. List ailment records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    ailments = client.Ailment().list()
    for ailment in ailments:
        print(ailment)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load an ailment

`load()` returns the bare record (a `dict`) and raises on error.

```python
try:
    ailment = client.Ailment().load({"id": "example_id"})
    print(ailment)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    ailments = client.Ailment().list()
    print(ailments)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = MonsterHunterWorldSDK.test()

# Entity ops return the bare record and raise on error.
ailment = client.Ailment().list()
# ailment contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = MonsterHunterWorldSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### MonsterHunterWorldSDK

```python
from monsterhunterworld_sdk import MonsterHunterWorldSDK

client = MonsterHunterWorldSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = MonsterHunterWorldSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### MonsterHunterWorldSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the bare result data (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `ailment = client.Ailment()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `protection` | `dict` |  |
| `recovery` | `dict` |  |

#### Example: Load

```python
ailment = client.Ailment().load({"id": "ailment_id"})
```

#### Example: List

```python
ailments = client.Ailment().list()
```


### Armor

Create an instance: `armor = client.Armor()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `armor_set` | `dict` |  |
| `asset` | `dict` |  |
| `attribute` | `dict` |  |
| `crafting` | `dict` |  |
| `defense` | `dict` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `rank` | `str` |  |
| `rarity` | `int` |  |
| `resistance` | `dict` |  |
| `skill` | `list` |  |
| `slot` | `list` |  |
| `type` | `str` |  |

#### Example: Load

```python
armor = client.Armor().load({"id": "armor_id"})
```

#### Example: List

```python
armors = client.Armor().list()
```


### ArmorSet

Create an instance: `armor_set = client.ArmorSet()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | `dict` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `piece` | `list` |  |
| `rank` | `str` |  |

#### Example: Load

```python
armor_set = client.ArmorSet().load({"id": "armor_set_id"})
```

#### Example: List

```python
armor_sets = client.ArmorSet().list()
```


### Charm

Create an instance: `charm = client.Charm()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | `dict` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `rarity` | `int` |  |
| `skill` | `list` |  |

#### Example: Load

```python
charm = client.Charm().load({"id": "charm_id"})
```

#### Example: List

```python
charms = client.Charm().list()
```


### Decoration

Create an instance: `decoration = client.Decoration()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `name` | `str` |  |
| `rarity` | `int` |  |
| `skill` | `list` |  |
| `slot` | `int` |  |

#### Example: Load

```python
decoration = client.Decoration().load({"id": "decoration_id"})
```

#### Example: List

```python
decorations = client.Decoration().list()
```


### Event

Create an instance: `event = client.Event()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `end_timestamp` | `str` |  |
| `exclusive` | `str` |  |
| `expansion` | `str` |  |
| `id` | `int` |  |
| `location` | `dict` |  |
| `name` | `str` |  |
| `platform` | `str` |  |
| `quest_rank` | `str` |  |
| `requirement` | `str` |  |
| `start_timestamp` | `str` |  |
| `success_condition` | `str` |  |
| `type` | `str` |  |

#### Example: Load

```python
event = client.Event().load({"id": "event_id"})
```

#### Example: List

```python
events = client.Event().list()
```


### Item

Create an instance: `item = client.Item()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buy_price` | `int` |  |
| `carry_limit` | `int` |  |
| `description` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `rarity` | `int` |  |
| `sell_price` | `int` |  |
| `value` | `int` |  |

#### Example: Load

```python
item = client.Item().load({"id": "item_id"})
```

#### Example: List

```python
items = client.Item().list()
```


### Location

Create an instance: `location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `camp` | `list` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `zone_count` | `int` |  |

#### Example: Load

```python
location = client.Location().load({"id": "location_id"})
```

#### Example: List

```python
locations = client.Location().list()
```


### Monster

Create an instance: `monster = client.Monster()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ailment` | `list` |  |
| `description` | `str` |  |
| `element` | `list` |  |
| `id` | `int` |  |
| `location` | `list` |  |
| `name` | `str` |  |
| `resistance` | `list` |  |
| `reward` | `list` |  |
| `species` | `str` |  |
| `type` | `str` |  |
| `weakness` | `list` |  |

#### Example: Load

```python
monster = client.Monster().load({"id": "monster_id"})
```

#### Example: List

```python
monsters = client.Monster().list()
```


### MotionValue

Create an instance: `motion_value = client.MotionValue()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `damage_type` | `str` |  |
| `exhaust` | `int` |  |
| `hit` | `list` |  |
| `id` | `int` |  |
| `stun` | `int` |  |
| `weapon_type` | `str` |  |

#### Example: Load

```python
motion_value = client.MotionValue().load({"id": "motion_value_id"})
```

#### Example: List

```python
motion_values = client.MotionValue().list()
```


### Skill

Create an instance: `skill = client.Skill()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `rank` | `list` |  |

#### Example: Load

```python
skill = client.Skill().load({"id": "skill_id"})
```

#### Example: List

```python
skills = client.Skill().list()
```


### Weapon

Create an instance: `weapon = client.Weapon()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asset` | `dict` |  |
| `attack` | `dict` |  |
| `attribute` | `dict` |  |
| `crafting` | `dict` |  |
| `damage_type` | `str` |  |
| `element` | `list` |  |
| `id` | `int` |  |
| `name` | `str` |  |
| `rarity` | `int` |  |
| `slot` | `list` |  |
| `type` | `str` |  |

#### Example: Load

```python
weapon = client.Weapon().load({"id": "weapon_id"})
```

#### Example: List

```python
weapons = client.Weapon().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── monsterhunterworld_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`monsterhunterworld_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
ailment = client.Ailment()
ailment.list()

# ailment.data_get() now returns the ailment data from the last list
# ailment.match_get() returns the last match criteria
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
