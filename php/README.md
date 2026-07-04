# MonsterHunterWorld PHP SDK



The PHP SDK for the MonsterHunterWorld API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'monsterhunterworld_sdk.php';

$client = new MonsterHunterWorldSDK();
```

### 2. List ailments

```php
try {
    $result = $client->ailment()->list();
    if (is_array($result)) {
        foreach ($result as $item) {
            $d = $item->data_get();
            echo $d["id"] . " " . $d["name"] . "\n";
        }
    }
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an ailment

```php
try {
    $result = $client->ailment()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = MonsterHunterWorldSDK::test();

$result = $client->ailment()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new MonsterHunterWorldSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### MonsterHunterWorldSDK

```php
require_once 'monsterhunterworld_sdk.php';
$client = new MonsterHunterWorldSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = MonsterHunterWorldSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### MonsterHunterWorldSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Ailment` | `($data): AilmentEntity` | Create a Ailment entity instance. |
| `Armor` | `($data): ArmorEntity` | Create a Armor entity instance. |
| `ArmorSet` | `($data): ArmorSetEntity` | Create a ArmorSet entity instance. |
| `Charm` | `($data): CharmEntity` | Create a Charm entity instance. |
| `Decoration` | `($data): DecorationEntity` | Create a Decoration entity instance. |
| `Event` | `($data): EventEntity` | Create a Event entity instance. |
| `Item` | `($data): ItemEntity` | Create a Item entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `Monster` | `($data): MonsterEntity` | Create a Monster entity instance. |
| `MotionValue` | `($data): MotionValueEntity` | Create a MotionValue entity instance. |
| `Skill` | `($data): SkillEntity` | Create a Skill entity instance. |
| `Weapon` | `($data): WeaponEntity` | Create a Weapon entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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

Create an instance: `const ailment = client.ailment`

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

```ts
const ailment = await client.ailment.load({ id: 'ailment_id' })
```

#### Example: List

```ts
const ailments = await client.ailment.list()
```


### Armor

Create an instance: `const armor = client.armor`

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

```ts
const armor = await client.armor.load({ id: 'armor_id' })
```

#### Example: List

```ts
const armors = await client.armor.list()
```


### ArmorSet

Create an instance: `const armor_set = client.armor_set`

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

```ts
const armor_set = await client.armor_set.load({ id: 'armor_set_id' })
```

#### Example: List

```ts
const armor_sets = await client.armor_set.list()
```


### Charm

Create an instance: `const charm = client.charm`

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

```ts
const charm = await client.charm.load({ id: 'charm_id' })
```

#### Example: List

```ts
const charms = await client.charm.list()
```


### Decoration

Create an instance: `const decoration = client.decoration`

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

```ts
const decoration = await client.decoration.load({ id: 'decoration_id' })
```

#### Example: List

```ts
const decorations = await client.decoration.list()
```


### Event

Create an instance: `const event = client.event`

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

```ts
const event = await client.event.load({ id: 'event_id' })
```

#### Example: List

```ts
const events = await client.event.list()
```


### Item

Create an instance: `const item = client.item`

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

```ts
const item = await client.item.load({ id: 'item_id' })
```

#### Example: List

```ts
const items = await client.item.list()
```


### Location

Create an instance: `const location = client.location`

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

```ts
const location = await client.location.load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.location.list()
```


### Monster

Create an instance: `const monster = client.monster`

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

```ts
const monster = await client.monster.load({ id: 'monster_id' })
```

#### Example: List

```ts
const monsters = await client.monster.list()
```


### MotionValue

Create an instance: `const motion_value = client.motion_value`

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

```ts
const motion_value = await client.motion_value.load({ id: 'motion_value_id' })
```

#### Example: List

```ts
const motion_values = await client.motion_value.list()
```


### Skill

Create an instance: `const skill = client.skill`

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

```ts
const skill = await client.skill.load({ id: 'skill_id' })
```

#### Example: List

```ts
const skills = await client.skill.list()
```


### Weapon

Create an instance: `const weapon = client.weapon`

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

```ts
const weapon = await client.weapon.load({ id: 'weapon_id' })
```

#### Example: List

```ts
const weapons = await client.weapon.list()
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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── monsterhunterworld_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`monsterhunterworld_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$ailment = $client->ailment();
$ailment->load(["id" => "example_id"]);

// $ailment->dataGet() now returns the loaded ailment data
// $ailment->matchGet() returns the last match criteria
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
