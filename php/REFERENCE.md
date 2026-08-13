# MonsterHunterWorld PHP SDK Reference

Complete API reference for the MonsterHunterWorld PHP SDK.


## MonsterHunterWorldSDK

### Constructor

```php
require_once __DIR__ . '/monsterhunterworld_sdk.php';

$client = new MonsterHunterWorldSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `MonsterHunterWorldSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = MonsterHunterWorldSDK::test();
```


### Instance Methods

#### `Ailment($data = null)`

Create a new `AilmentEntity` instance. Pass `null` for no initial data.

#### `Armor($data = null)`

Create a new `ArmorEntity` instance. Pass `null` for no initial data.

#### `ArmorSet($data = null)`

Create a new `ArmorSetEntity` instance. Pass `null` for no initial data.

#### `Charm($data = null)`

Create a new `CharmEntity` instance. Pass `null` for no initial data.

#### `Decoration($data = null)`

Create a new `DecorationEntity` instance. Pass `null` for no initial data.

#### `Event($data = null)`

Create a new `EventEntity` instance. Pass `null` for no initial data.

#### `Item($data = null)`

Create a new `ItemEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `Monster($data = null)`

Create a new `MonsterEntity` instance. Pass `null` for no initial data.

#### `MotionValue($data = null)`

Create a new `MotionValueEntity` instance. Pass `null` for no initial data.

#### `Skill($data = null)`

Create a new `SkillEntity` instance. Pass `null` for no initial data.

#### `Weapon($data = null)`

Create a new `WeaponEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): MonsterHunterWorldUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AilmentEntity

```php
$ailment = $client->Ailment();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `protection` | `array` | No |  |
| `recovery` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Ailment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Ailment()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): AilmentEntity`

Create a new `AilmentEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArmorEntity

```php
$armor = $client->Armor();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `armorSet` | `array` | No |  |
| `assets` | `array` | No |  |
| `attributes` | `array` | No |  |
| `crafting` | `array` | No |  |
| `defense` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rank` | `string` | No |  |
| `rarity` | `int` | No |  |
| `resistances` | `array` | No |  |
| `skills` | `array` | No |  |
| `slots` | `array` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Armor()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Armor()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArmorEntity`

Create a new `ArmorEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ArmorSetEntity

```php
$armor_set = $client->ArmorSet();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bonus` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `pieces` | `array` | No |  |
| `rank` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->ArmorSet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->ArmorSet()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ArmorSetEntity`

Create a new `ArmorSetEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CharmEntity

```php
$charm = $client->Charm();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crafting` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Charm()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Charm()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CharmEntity`

Create a new `CharmEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DecorationEntity

```php
$decoration = $client->Decoration();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `skills` | `array` | No |  |
| `slot` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Decoration()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Decoration()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DecorationEntity`

Create a new `DecorationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EventEntity

```php
$event = $client->Event();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `array` | No |  |
| `description` | `string` | No |  |
| `endTimestamp` | `string` | No |  |
| `exclusive` | `string` | No |  |
| `expansion` | `string` | No |  |
| `id` | `int` | No |  |
| `location` | `array` | No |  |
| `name` | `string` | No |  |
| `platform` | `string` | No |  |
| `questRank` | `string` | No |  |
| `requirements` | `string` | No |  |
| `startTimestamp` | `string` | No |  |
| `successConditions` | `string` | No |  |
| `type` | `string` | No |  |
| `zoneCount` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Event()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Event()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EventEntity`

Create a new `EventEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ItemEntity

```php
$item = $client->Item();
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

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Item()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Item()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ItemEntity`

Create a new `ItemEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `camps` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `zoneCount` | `int` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Location()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Location()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MonsterEntity

```php
$monster = $client->Monster();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ailments` | `array` | No |  |
| `description` | `string` | No |  |
| `elements` | `array` | No |  |
| `id` | `int` | No |  |
| `locations` | `array` | No |  |
| `name` | `string` | No |  |
| `resistances` | `array` | No |  |
| `rewards` | `array` | No |  |
| `species` | `string` | No |  |
| `type` | `string` | No |  |
| `weaknesses` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Monster()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Monster()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MonsterEntity`

Create a new `MonsterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## MotionValueEntity

```php
$motion_value = $client->MotionValue();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `damageType` | `string` | No |  |
| `exhaust` | `int` | No |  |
| `hits` | `array` | No |  |
| `id` | `int` | No |  |
| `stun` | `int` | No |  |
| `weaponType` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->MotionValue()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->MotionValue()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): MotionValueEntity`

Create a new `MotionValueEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SkillEntity

```php
$skill = $client->Skill();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `ranks` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Skill()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Skill()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SkillEntity`

Create a new `SkillEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## WeaponEntity

```php
$weapon = $client->Weapon();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `assets` | `array` | No |  |
| `attack` | `array` | No |  |
| `attributes` | `array` | No |  |
| `crafting` | `array` | No |  |
| `damageType` | `string` | No |  |
| `elements` | `array` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `rarity` | `int` | No |  |
| `slots` | `array` | No |  |
| `type` | `string` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Weapon()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Weapon()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): WeaponEntity`

Create a new `WeaponEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new MonsterHunterWorldSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

