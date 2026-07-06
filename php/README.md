# MonsterHunterWorld PHP SDK



The PHP SDK for the MonsterHunterWorld API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Ailment()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

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

### 2. List ailment records

```php
try {
    // list() returns an array of Ailment records — iterate directly.
    $ailments = $client->Ailment()->list();
    foreach ($ailments as $item) {
        echo $item["id"] . " " . $item["description"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an ailment

```php
try {
    // load() returns the bare Ailment record (throws on error).
    $ailment = $client->Ailment()->load(["id" => "example_id"]);
    print_r($ailment);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $ailments = $client->Ailment()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
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

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = MonsterHunterWorldSDK::test([
    "entity" => ["ailment" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$ailment = $client->Ailment()->list();
print_r($ailment);
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
| `Ailment` | `($data): AilmentEntity` | Create an Ailment entity instance. |
| `Armor` | `($data): ArmorEntity` | Create an Armor entity instance. |
| `ArmorSet` | `($data): ArmorSetEntity` | Create an ArmorSet entity instance. |
| `Charm` | `($data): CharmEntity` | Create a Charm entity instance. |
| `Decoration` | `($data): DecorationEntity` | Create a Decoration entity instance. |
| `Event` | `($data): EventEntity` | Create an Event entity instance. |
| `Item` | `($data): ItemEntity` | Create an Item entity instance. |
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
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
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

Create an instance: `$ailment = $client->Ailment();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `protection` | `array` |  |
| `recovery` | `array` |  |

#### Example: Load

```php
// load() returns the bare Ailment record (throws on error).
$ailment = $client->Ailment()->load(["id" => "ailment_id"]);
```

#### Example: List

```php
// list() returns an array of Ailment records (throws on error).
$ailments = $client->Ailment()->list();
```


### Armor

Create an instance: `$armor = $client->Armor();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `armor_set` | `array` |  |
| `asset` | `array` |  |
| `attribute` | `array` |  |
| `crafting` | `array` |  |
| `defense` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `rank` | `string` |  |
| `rarity` | `int` |  |
| `resistance` | `array` |  |
| `skill` | `array` |  |
| `slot` | `array` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Armor record (throws on error).
$armor = $client->Armor()->load(["id" => "armor_id"]);
```

#### Example: List

```php
// list() returns an array of Armor records (throws on error).
$armors = $client->Armor()->list();
```


### ArmorSet

Create an instance: `$armor_set = $client->ArmorSet();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bonus` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `piece` | `array` |  |
| `rank` | `string` |  |

#### Example: Load

```php
// load() returns the bare ArmorSet record (throws on error).
$armor_set = $client->ArmorSet()->load(["id" => "armor_set_id"]);
```

#### Example: List

```php
// list() returns an array of ArmorSet records (throws on error).
$armor_sets = $client->ArmorSet()->list();
```


### Charm

Create an instance: `$charm = $client->Charm();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crafting` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `rarity` | `int` |  |
| `skill` | `array` |  |

#### Example: Load

```php
// load() returns the bare Charm record (throws on error).
$charm = $client->Charm()->load(["id" => "charm_id"]);
```

#### Example: List

```php
// list() returns an array of Charm records (throws on error).
$charms = $client->Charm()->list();
```


### Decoration

Create an instance: `$decoration = $client->Decoration();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `name` | `string` |  |
| `rarity` | `int` |  |
| `skill` | `array` |  |
| `slot` | `int` |  |

#### Example: Load

```php
// load() returns the bare Decoration record (throws on error).
$decoration = $client->Decoration()->load(["id" => "decoration_id"]);
```

#### Example: List

```php
// list() returns an array of Decoration records (throws on error).
$decorations = $client->Decoration()->list();
```


### Event

Create an instance: `$event = $client->Event();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `end_timestamp` | `string` |  |
| `exclusive` | `string` |  |
| `expansion` | `string` |  |
| `id` | `int` |  |
| `location` | `array` |  |
| `name` | `string` |  |
| `platform` | `string` |  |
| `quest_rank` | `string` |  |
| `requirement` | `string` |  |
| `start_timestamp` | `string` |  |
| `success_condition` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Event record (throws on error).
$event = $client->Event()->load(["id" => "event_id"]);
```

#### Example: List

```php
// list() returns an array of Event records (throws on error).
$events = $client->Event()->list();
```


### Item

Create an instance: `$item = $client->Item();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `buy_price` | `int` |  |
| `carry_limit` | `int` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `rarity` | `int` |  |
| `sell_price` | `int` |  |
| `value` | `int` |  |

#### Example: Load

```php
// load() returns the bare Item record (throws on error).
$item = $client->Item()->load(["id" => "item_id"]);
```

#### Example: List

```php
// list() returns an array of Item records (throws on error).
$items = $client->Item()->list();
```


### Location

Create an instance: `$location = $client->Location();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `camp` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `zone_count` | `int` |  |

#### Example: Load

```php
// load() returns the bare Location record (throws on error).
$location = $client->Location()->load(["id" => "location_id"]);
```

#### Example: List

```php
// list() returns an array of Location records (throws on error).
$locations = $client->Location()->list();
```


### Monster

Create an instance: `$monster = $client->Monster();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ailment` | `array` |  |
| `description` | `string` |  |
| `element` | `array` |  |
| `id` | `int` |  |
| `location` | `array` |  |
| `name` | `string` |  |
| `resistance` | `array` |  |
| `reward` | `array` |  |
| `species` | `string` |  |
| `type` | `string` |  |
| `weakness` | `array` |  |

#### Example: Load

```php
// load() returns the bare Monster record (throws on error).
$monster = $client->Monster()->load(["id" => "monster_id"]);
```

#### Example: List

```php
// list() returns an array of Monster records (throws on error).
$monsters = $client->Monster()->list();
```


### MotionValue

Create an instance: `$motion_value = $client->MotionValue();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `damage_type` | `string` |  |
| `exhaust` | `int` |  |
| `hit` | `array` |  |
| `id` | `int` |  |
| `stun` | `int` |  |
| `weapon_type` | `string` |  |

#### Example: Load

```php
// load() returns the bare MotionValue record (throws on error).
$motion_value = $client->MotionValue()->load(["id" => "motion_value_id"]);
```

#### Example: List

```php
// list() returns an array of MotionValue records (throws on error).
$motion_values = $client->MotionValue()->list();
```


### Skill

Create an instance: `$skill = $client->Skill();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `rank` | `array` |  |

#### Example: Load

```php
// load() returns the bare Skill record (throws on error).
$skill = $client->Skill()->load(["id" => "skill_id"]);
```

#### Example: List

```php
// list() returns an array of Skill records (throws on error).
$skills = $client->Skill()->list();
```


### Weapon

Create an instance: `$weapon = $client->Weapon();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `asset` | `array` |  |
| `attack` | `array` |  |
| `attribute` | `array` |  |
| `crafting` | `array` |  |
| `damage_type` | `string` |  |
| `element` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `rarity` | `int` |  |
| `slot` | `array` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Weapon record (throws on error).
$weapon = $client->Weapon()->load(["id" => "weapon_id"]);
```

#### Example: List

```php
// list() returns an array of Weapon records (throws on error).
$weapons = $client->Weapon()->list();
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

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$ailment = $client->Ailment();
$ailment->list();

// $ailment->data_get() now returns the ailment data from the last list
// $ailment->match_get() returns the last match criteria
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
