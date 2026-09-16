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
    // list() returns entity instances; data_get() reads each record.
    $ailments = $client->Ailment()->list();
    foreach ($ailments as $record) {
        $item = $record->data_get();
        echo $item["id"] . " " . $item["description"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load an ailment

```php
try {
    // load() returns the ENTITY — call data_get() for the Ailment record (throws on error).
    $ailment = $client->Ailment()->load(["id" => 1]);
    print_r($ailment->data_get());
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

// list() returns entity instances (throws on error);
// call data_get() for the mock record.
$ailment = $client->Ailment()->list();
print_r(array_map(fn($item) => $item->data_get(), $ailment));
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `description` | A short description of the ailment |
| `id` | The ID of the ailment |
| `name` | The name of the ailment |
| `protection` |  |
| `recovery` |  |

Operations: List, Load.

API path: `/ailments`

#### Armor

| Field | Description |
| --- | --- |
| `armorSet` |  |
| `assets` |  |
| `attributes` | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` |  |
| `defense` |  |
| `id` | The ID of the armor piece |
| `name` | The name of the armor piece |
| `rank` | The rank of the armor piece |
| `rarity` | The rarity of the armor piece |
| `resistances` |  |
| `skills` | An array of skill ranks granted by the armor |
| `slots` | An array of decoration slot information |
| `type` | The slot the armor piece fits in |

Operations: List, Load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `bonus` | The set bonus, if any |
| `id` | The ID of the armor set |
| `name` | The name of the armor set |
| `pieces` | Array of armor pieces in the set |
| `rank` | The rank of the armor set |

Operations: List, Load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `crafting` |  |
| `id` | The ID of the charm |
| `name` | The name of the charm |
| `rarity` | The rarity of the charm |
| `skills` | An array of skill ranks granted by the charm |

Operations: List, Load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `id` | The ID of the decoration |
| `name` | The name of the decoration |
| `rarity` | The rarity of the decoration |
| `skills` | An array of skill ranks granted by the decoration |
| `slot` | The slot rank required for the decoration |

Operations: List, Load.

API path: `/decorations`

#### Event

| Field | Description |
| --- | --- |
| `camps` | An array of camps in the location |
| `description` | A description of the event |
| `endTimestamp` | The end time of the event |
| `exclusive` | Whether the event is exclusive to a platform |
| `expansion` | The expansion the event belongs to |
| `id` | The ID of the location |
| `location` |  |
| `name` | The name of the location |
| `platform` | The platform for the event |
| `questRank` | The quest rank of the event |
| `requirements` | Requirements for the event |
| `startTimestamp` | The start time of the event |
| `successConditions` | Conditions for success |
| `type` | The type of event |
| `zoneCount` | The number of zones in the location |

Operations: List, Load.

API path: `/events`

#### Item

| Field | Description |
| --- | --- |
| `buyPrice` | The price when buying the item |
| `carryLimit` | The maximum number of this item that can be carried |
| `description` | A description of the item |
| `id` | The ID of the item |
| `name` | The name of the item |
| `rarity` | The rarity of the item |
| `sellPrice` | The price when selling the item |
| `value` | The value of the item |

Operations: List, Load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `camps` | An array of camps in the location |
| `id` | The ID of the location |
| `name` | The name of the location |
| `zoneCount` | The number of zones in the location |

Operations: List, Load.

API path: `/locations`

#### Monster

| Field | Description |
| --- | --- |
| `ailments` | Ailments the monster can inflict |
| `description` | A description of the monster |
| `elements` | Elements the monster uses |
| `id` | The ID of the monster |
| `locations` | Locations where the monster can be found |
| `name` | The name of the monster |
| `resistances` | Resistances of the monster |
| `rewards` | Rewards obtained from the monster |
| `species` | The species of the monster |
| `type` | The type of monster |
| `weaknesses` | Weaknesses of the monster |

Operations: List, Load.

API path: `/monsters`

#### MotionValue

| Field | Description |
| --- | --- |
| `damageType` | The type of damage |
| `exhaust` | Exhaust value |
| `hits` | Hit information |
| `id` | The ID of the motion value |
| `stun` | Stun value |
| `weaponType` | The type of weapon |

Operations: List, Load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `description` | A description of the skill |
| `id` | The ID of the skill |
| `name` | The name of the skill |
| `ranks` | An array of skill ranks |

Operations: List, Load.

API path: `/skills`

#### Weapon

| Field | Description |
| --- | --- |
| `assets` | Asset URLs for the weapon |
| `attack` | Attack values for the weapon |
| `attributes` | Additional weapon attributes |
| `crafting` | Crafting information for the weapon |
| `damageType` | The damage type of the weapon |
| `elements` | Elemental damage information |
| `id` | The ID of the weapon |
| `name` | The name of the weapon |
| `rarity` | The rarity of the weapon |
| `slots` | An array of decoration slot information |
| `type` | The type of weapon |

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
| `description` | `string` | A short description of the ailment |
| `id` | `int` | The ID of the ailment |
| `name` | `string` | The name of the ailment |
| `protection` | `array` |  |
| `recovery` | `array` |  |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Ailment record (throws on error).
$ailment = $client->Ailment()->load(["id" => 1]);
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
| `armorSet` | `array` |  |
| `assets` | `array` |  |
| `attributes` | `array` | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `array` |  |
| `defense` | `array` |  |
| `id` | `int` | The ID of the armor piece |
| `name` | `string` | The name of the armor piece |
| `rank` | `string` | The rank of the armor piece |
| `rarity` | `int` | The rarity of the armor piece |
| `resistances` | `array` |  |
| `skills` | `array` | An array of skill ranks granted by the armor |
| `slots` | `array` | An array of decoration slot information |
| `type` | `string` | The slot the armor piece fits in |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Armor record (throws on error).
$armor = $client->Armor()->load(["id" => 1]);
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
| `bonus` | `array` | The set bonus, if any |
| `id` | `int` | The ID of the armor set |
| `name` | `string` | The name of the armor set |
| `pieces` | `array` | Array of armor pieces in the set |
| `rank` | `string` | The rank of the armor set |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the ArmorSet record (throws on error).
$armor_set = $client->ArmorSet()->load(["id" => 1]);
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
| `id` | `int` | The ID of the charm |
| `name` | `string` | The name of the charm |
| `rarity` | `int` | The rarity of the charm |
| `skills` | `array` | An array of skill ranks granted by the charm |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Charm record (throws on error).
$charm = $client->Charm()->load(["id" => 1]);
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
| `id` | `int` | The ID of the decoration |
| `name` | `string` | The name of the decoration |
| `rarity` | `int` | The rarity of the decoration |
| `skills` | `array` | An array of skill ranks granted by the decoration |
| `slot` | `int` | The slot rank required for the decoration |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Decoration record (throws on error).
$decoration = $client->Decoration()->load(["id" => 1]);
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
| `camps` | `array` | An array of camps in the location |
| `description` | `string` | A description of the event |
| `endTimestamp` | `string` | The end time of the event |
| `exclusive` | `string` | Whether the event is exclusive to a platform |
| `expansion` | `string` | The expansion the event belongs to |
| `id` | `int` | The ID of the location |
| `location` | `array` |  |
| `name` | `string` | The name of the location |
| `platform` | `string` | The platform for the event |
| `questRank` | `string` | The quest rank of the event |
| `requirements` | `string` | Requirements for the event |
| `startTimestamp` | `string` | The start time of the event |
| `successConditions` | `string` | Conditions for success |
| `type` | `string` | The type of event |
| `zoneCount` | `int` | The number of zones in the location |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Event record (throws on error).
$event = $client->Event()->load(["id" => 1]);
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
| `buyPrice` | `int` | The price when buying the item |
| `carryLimit` | `int` | The maximum number of this item that can be carried |
| `description` | `string` | A description of the item |
| `id` | `int` | The ID of the item |
| `name` | `string` | The name of the item |
| `rarity` | `int` | The rarity of the item |
| `sellPrice` | `int` | The price when selling the item |
| `value` | `int` | The value of the item |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Item record (throws on error).
$item = $client->Item()->load(["id" => 1]);
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
| `camps` | `array` | An array of camps in the location |
| `id` | `int` | The ID of the location |
| `name` | `string` | The name of the location |
| `zoneCount` | `int` | The number of zones in the location |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Location record (throws on error).
$location = $client->Location()->load(["id" => 1]);
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
| `ailments` | `array` | Ailments the monster can inflict |
| `description` | `string` | A description of the monster |
| `elements` | `array` | Elements the monster uses |
| `id` | `int` | The ID of the monster |
| `locations` | `array` | Locations where the monster can be found |
| `name` | `string` | The name of the monster |
| `resistances` | `array` | Resistances of the monster |
| `rewards` | `array` | Rewards obtained from the monster |
| `species` | `string` | The species of the monster |
| `type` | `string` | The type of monster |
| `weaknesses` | `array` | Weaknesses of the monster |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Monster record (throws on error).
$monster = $client->Monster()->load(["id" => 1]);
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
| `damageType` | `string` | The type of damage |
| `exhaust` | `int` | Exhaust value |
| `hits` | `array` | Hit information |
| `id` | `int` | The ID of the motion value |
| `stun` | `int` | Stun value |
| `weaponType` | `string` | The type of weapon |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the MotionValue record (throws on error).
$motion_value = $client->MotionValue()->load(["id" => 1]);
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
| `description` | `string` | A description of the skill |
| `id` | `int` | The ID of the skill |
| `name` | `string` | The name of the skill |
| `ranks` | `array` | An array of skill ranks |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Skill record (throws on error).
$skill = $client->Skill()->load(["id" => 1]);
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
| `assets` | `array` | Asset URLs for the weapon |
| `attack` | `array` | Attack values for the weapon |
| `attributes` | `array` | Additional weapon attributes |
| `crafting` | `array` | Crafting information for the weapon |
| `damageType` | `string` | The damage type of the weapon |
| `elements` | `array` | Elemental damage information |
| `id` | `int` | The ID of the weapon |
| `name` | `string` | The name of the weapon |
| `rarity` | `int` | The rarity of the weapon |
| `slots` | `array` | An array of decoration slot information |
| `type` | `string` | The type of weapon |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Weapon record (throws on error).
$weapon = $client->Weapon()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Weapon records (throws on error).
$weapons = $client->Weapon()->list();
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

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

Automatic retry of transient failures with exponential backoff.

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

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

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

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

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
