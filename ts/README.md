# MonsterHunterWorld TypeScript SDK

The TypeScript SDK for the MonsterHunterWorld API. Provides a type-safe, entity-oriented interface with full async/await support.


## Install
```bash
npm install monster-hunter-world
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MonsterHunterWorldSDK } from 'monster-hunter-world'

const client = new MonsterHunterWorldSDK({})
```

### 2. List ailments

```ts
const result = await client.Ailment().list()

if (result.ok) {
  for (const item of result.data) {
    console.log(item.id, item.name)
  }
}
```

### 3. Load a ailment

```ts
const result = await client.Ailment().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = MonsterHunterWorldSDK.test()

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new MonsterHunterWorldSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new MonsterHunterWorldSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MONSTER-HUNTER-WORLD_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### MonsterHunterWorldSDK

#### Constructor

```ts
new MonsterHunterWorldSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Ailment(data?)` | `AilmentEntity` | Create a Ailment entity instance. |
| `Armor(data?)` | `ArmorEntity` | Create a Armor entity instance. |
| `ArmorSet(data?)` | `ArmorSetEntity` | Create a ArmorSet entity instance. |
| `Charm(data?)` | `CharmEntity` | Create a Charm entity instance. |
| `Decoration(data?)` | `DecorationEntity` | Create a Decoration entity instance. |
| `Event(data?)` | `EventEntity` | Create a Event entity instance. |
| `Item(data?)` | `ItemEntity` | Create a Item entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Monster(data?)` | `MonsterEntity` | Create a Monster entity instance. |
| `MotionValue(data?)` | `MotionValueEntity` | Create a MotionValue entity instance. |
| `Skill(data?)` | `SkillEntity` | Create a Skill entity instance. |
| `Weapon(data?)` | `WeaponEntity` | Create a Weapon entity instance. |
| `tester(testopts?, sdkopts?)` | `MonsterHunterWorldSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `MonsterHunterWorldSDK.test(testopts?, sdkopts?)` | `MonsterHunterWorldSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MonsterHunterWorldSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Ailment

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `protection` |  |
| `recovery` |  |

Operations: list, load.

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

Operations: list, load.

API path: `/armor`

#### ArmorSet

| Field | Description |
| --- | --- |
| `bonus` |  |
| `id` |  |
| `name` |  |
| `piece` |  |
| `rank` |  |

Operations: list, load.

API path: `/armor/sets`

#### Charm

| Field | Description |
| --- | --- |
| `crafting` |  |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `skill` |  |

Operations: list, load.

API path: `/charms`

#### Decoration

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `rarity` |  |
| `skill` |  |
| `slot` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/items`

#### Location

| Field | Description |
| --- | --- |
| `camp` |  |
| `id` |  |
| `name` |  |
| `zone_count` |  |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/motion-values`

#### Skill

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `rank` |  |

Operations: list, load.

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

Operations: list, load.

API path: `/weapons`



## Entities


### Ailment

Create an instance: `const ailment = client.Ailment()`

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
const ailment = await client.Ailment().load({ id: 'ailment_id' })
```

#### Example: List

```ts
const ailments = await client.Ailment().list()
```


### Armor

Create an instance: `const armor = client.Armor()`

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
const armor = await client.Armor().load({ id: 'armor_id' })
```

#### Example: List

```ts
const armors = await client.Armor().list()
```


### ArmorSet

Create an instance: `const armor_set = client.ArmorSet()`

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
const armor_set = await client.ArmorSet().load({ id: 'armor_set_id' })
```

#### Example: List

```ts
const armor_sets = await client.ArmorSet().list()
```


### Charm

Create an instance: `const charm = client.Charm()`

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
const charm = await client.Charm().load({ id: 'charm_id' })
```

#### Example: List

```ts
const charms = await client.Charm().list()
```


### Decoration

Create an instance: `const decoration = client.Decoration()`

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
const decoration = await client.Decoration().load({ id: 'decoration_id' })
```

#### Example: List

```ts
const decorations = await client.Decoration().list()
```


### Event

Create an instance: `const event = client.Event()`

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
const event = await client.Event().load({ id: 'event_id' })
```

#### Example: List

```ts
const events = await client.Event().list()
```


### Item

Create an instance: `const item = client.Item()`

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
const item = await client.Item().load({ id: 'item_id' })
```

#### Example: List

```ts
const items = await client.Item().list()
```


### Location

Create an instance: `const location = client.Location()`

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
const location = await client.Location().load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.Location().list()
```


### Monster

Create an instance: `const monster = client.Monster()`

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
const monster = await client.Monster().load({ id: 'monster_id' })
```

#### Example: List

```ts
const monsters = await client.Monster().list()
```


### MotionValue

Create an instance: `const motion_value = client.MotionValue()`

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
const motion_value = await client.MotionValue().load({ id: 'motion_value_id' })
```

#### Example: List

```ts
const motion_values = await client.MotionValue().list()
```


### Skill

Create an instance: `const skill = client.Skill()`

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
const skill = await client.Skill().load({ id: 'skill_id' })
```

#### Example: List

```ts
const skills = await client.Skill().list()
```


### Weapon

Create an instance: `const weapon = client.Weapon()`

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
const weapon = await client.Weapon().load({ id: 'weapon_id' })
```

#### Example: List

```ts
const weapons = await client.Weapon().list()
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
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
monster-hunter-world/
├── src/
│   ├── MonsterHunterWorldSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { MonsterHunterWorldSDK } from 'monster-hunter-world'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
