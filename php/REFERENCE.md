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
| `description` | `string` | No | A short description of the ailment |
| `id` | `int` | No | The ID of the ailment |
| `name` | `string` | No | The name of the ailment |
| `protection` | `array` | No |  |
| `recovery` | `array` | No |  |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Ailment()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `attributes` | `array` | No | Dictionary of attribute modifiers attached to the armor piece |
| `crafting` | `array` | No |  |
| `defense` | `array` | No |  |
| `id` | `int` | No | The ID of the armor piece |
| `name` | `string` | No | The name of the armor piece |
| `rank` | `string` | No | The rank of the armor piece |
| `rarity` | `int` | No | The rarity of the armor piece |
| `resistances` | `array` | No |  |
| `skills` | `array` | No | An array of skill ranks granted by the armor |
| `slots` | `array` | No | An array of decoration slot information |
| `type` | `string` | No | The slot the armor piece fits in |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Armor()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `bonus` | `array` | No | The set bonus, if any |
| `id` | `int` | No | The ID of the armor set |
| `name` | `string` | No | The name of the armor set |
| `pieces` | `array` | No | Array of armor pieces in the set |
| `rank` | `string` | No | The rank of the armor set |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->ArmorSet()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `id` | `int` | No | The ID of the charm |
| `name` | `string` | No | The name of the charm |
| `rarity` | `int` | No | The rarity of the charm |
| `skills` | `array` | No | An array of skill ranks granted by the charm |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Charm()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `id` | `int` | No | The ID of the decoration |
| `name` | `string` | No | The name of the decoration |
| `rarity` | `int` | No | The rarity of the decoration |
| `skills` | `array` | No | An array of skill ranks granted by the decoration |
| `slot` | `int` | No | The slot rank required for the decoration |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Decoration()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `description` | `string` | No | A description of the event |
| `endTimestamp` | `string` | No | The end time of the event |
| `exclusive` | `string` | No | Whether the event is exclusive to a platform |
| `expansion` | `string` | No | The expansion the event belongs to |
| `id` | `int` | No | The ID of the event |
| `location` | `array` | No |  |
| `name` | `string` | No | The name of the event |
| `platform` | `string` | No | The platform for the event |
| `questRank` | `string` | No | The quest rank of the event |
| `requirements` | `string` | No | Requirements for the event |
| `startTimestamp` | `string` | No | The start time of the event |
| `successConditions` | `string` | No | Conditions for success |
| `type` | `string` | No | The type of event |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Event()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `buyPrice` | `int` | No | The price when buying the item |
| `carryLimit` | `int` | No | The maximum number of this item that can be carried |
| `description` | `string` | No | A description of the item |
| `id` | `int` | No | The ID of the item |
| `name` | `string` | No | The name of the item |
| `rarity` | `int` | No | The rarity of the item |
| `sellPrice` | `int` | No | The price when selling the item |
| `value` | `int` | No | The value of the item |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Item()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `camps` | `array` | No | An array of camps in the location |
| `id` | `int` | No | The ID of the location |
| `name` | `string` | No | The name of the location |
| `zoneCount` | `int` | No | The number of zones in the location |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Location()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `ailments` | `array` | No | Ailments the monster can inflict |
| `description` | `string` | No | A description of the monster |
| `elements` | `array` | No | Elements the monster uses |
| `id` | `int` | No | The ID of the monster |
| `locations` | `array` | No | Locations where the monster can be found |
| `name` | `string` | No | The name of the monster |
| `resistances` | `array` | No | Resistances of the monster |
| `rewards` | `array` | No | Rewards obtained from the monster |
| `species` | `string` | No | The species of the monster |
| `type` | `string` | No | The type of monster |
| `weaknesses` | `array` | No | Weaknesses of the monster |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Monster()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `damageType` | `string` | No | The type of damage |
| `exhaust` | `int` | No | Exhaust value |
| `hits` | `array` | No | Hit information |
| `id` | `int` | No | The ID of the motion value |
| `stun` | `int` | No | Stun value |
| `weaponType` | `string` | No | The type of weapon |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->MotionValue()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `description` | `string` | No | A description of the skill |
| `id` | `int` | No | The ID of the skill |
| `name` | `string` | No | The name of the skill |
| `ranks` | `array` | No | An array of skill ranks |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Skill()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `assets` | `array` | No | Asset URLs for the weapon |
| `attack` | `array` | No | Attack values for the weapon |
| `attributes` | `array` | No | Additional weapon attributes |
| `crafting` | `array` | No | Crafting information for the weapon |
| `damageType` | `string` | No | The damage type of the weapon |
| `elements` | `array` | No | Elemental damage information |
| `id` | `int` | No | The ID of the weapon |
| `name` | `string` | No | The name of the weapon |
| `rarity` | `int` | No | The rarity of the weapon |
| `slots` | `array` | No | An array of decoration slot information |
| `type` | `string` | No | The type of weapon |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array of entities, one per record, and throws on error.

```php
$results = $client->Weapon()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Returns the entity, whose record `data_get()` reads, and throws on error.

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
| `ratelimit` | 0.0.1 | Rate limiting |
| `retry` | 0.0.1 | Retry |
| `test` | 0.0.1 | Test transport |
| `timeout` | 0.0.1 | Timeout |


Features are activated via the `feature` option:

```php
$client = new MonsterHunterWorldSDK([
  "feature" => [
    "ratelimit" => ["active" => true],
    "retry" => ["active" => true],
    "test" => ["active" => true],
    "timeout" => ["active" => true],
  ],
]);
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

