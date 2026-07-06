# MonsterHunterWorld TypeScript SDK



The TypeScript SDK for the MonsterHunterWorld API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Ailment()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases](https://github.com/voxgig-sdk/monster-hunter-world-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { MonsterHunterWorldSDK } from '@voxgig-sdk/monster-hunter-world'

const client = new MonsterHunterWorldSDK()
```

### 2. List ailment records

`list()` resolves to an array of Ailment objects — iterate it directly:

```ts
const ailments = await client.Ailment().list()

for (const ailment of ailments) {
  console.log(ailment)
}
```

### 3. Load an ailment

`load()` returns the entity directly and throws on failure:

```ts
try {
  const ailment = await client.Ailment().load({ id: 1 })
  console.log(ailment)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const ailments = await client.Ailment().list()
  console.log(ailments)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
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

if (result instanceof Error) {
  throw result
}
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

const ailment = await client.Ailment().list()
// ailment is a bare entity populated with mock response data
console.log(ailment)
```

You can also use the instance method:

```ts
const client = new MonsterHunterWorldSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Ailment()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
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
MONSTER_HUNTER_WORLD_TEST_LIVE=TRUE
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
| `Ailment(data?)` | `AilmentEntity` | Create an Ailment entity instance. |
| `Armor(data?)` | `ArmorEntity` | Create an Armor entity instance. |
| `ArmorSet(data?)` | `ArmorSetEntity` | Create an ArmorSet entity instance. |
| `Charm(data?)` | `CharmEntity` | Create a Charm entity instance. |
| `Decoration(data?)` | `DecorationEntity` | Create a Decoration entity instance. |
| `Event(data?)` | `EventEntity` | Create an Event entity instance. |
| `Item(data?)` | `ItemEntity` | Create an Item entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): MonsterHunterWorldSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

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
| `description` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `protection` | `Record<string, any>` |  |
| `recovery` | `Record<string, any>` |  |

#### Example: Load

```ts
const ailment = await client.Ailment().load({ id: 1 })
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
| `armor_set` | `Record<string, any>` |  |
| `asset` | `Record<string, any>` |  |
| `attribute` | `Record<string, any>` |  |
| `crafting` | `Record<string, any>` |  |
| `defense` | `Record<string, any>` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `rank` | `string` |  |
| `rarity` | `number` |  |
| `resistance` | `Record<string, any>` |  |
| `skill` | `any[]` |  |
| `slot` | `any[]` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const armor = await client.Armor().load({ id: 1 })
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
| `bonus` | `Record<string, any>` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `piece` | `any[]` |  |
| `rank` | `string` |  |

#### Example: Load

```ts
const armor_set = await client.ArmorSet().load({ id: 1 })
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
| `crafting` | `Record<string, any>` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `rarity` | `number` |  |
| `skill` | `any[]` |  |

#### Example: Load

```ts
const charm = await client.Charm().load({ id: 1 })
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
| `id` | `number` |  |
| `name` | `string` |  |
| `rarity` | `number` |  |
| `skill` | `any[]` |  |
| `slot` | `number` |  |

#### Example: Load

```ts
const decoration = await client.Decoration().load({ id: 1 })
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
| `description` | `string` |  |
| `end_timestamp` | `string` |  |
| `exclusive` | `string` |  |
| `expansion` | `string` |  |
| `id` | `number` |  |
| `location` | `Record<string, any>` |  |
| `name` | `string` |  |
| `platform` | `string` |  |
| `quest_rank` | `string` |  |
| `requirement` | `string` |  |
| `start_timestamp` | `string` |  |
| `success_condition` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const event = await client.Event().load({ id: 1 })
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
| `buy_price` | `number` |  |
| `carry_limit` | `number` |  |
| `description` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `rarity` | `number` |  |
| `sell_price` | `number` |  |
| `value` | `number` |  |

#### Example: Load

```ts
const item = await client.Item().load({ id: 1 })
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
| `camp` | `any[]` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `zone_count` | `number` |  |

#### Example: Load

```ts
const location = await client.Location().load({ id: 1 })
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
| `ailment` | `any[]` |  |
| `description` | `string` |  |
| `element` | `any[]` |  |
| `id` | `number` |  |
| `location` | `any[]` |  |
| `name` | `string` |  |
| `resistance` | `any[]` |  |
| `reward` | `any[]` |  |
| `species` | `string` |  |
| `type` | `string` |  |
| `weakness` | `any[]` |  |

#### Example: Load

```ts
const monster = await client.Monster().load({ id: 1 })
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
| `damage_type` | `string` |  |
| `exhaust` | `number` |  |
| `hit` | `any[]` |  |
| `id` | `number` |  |
| `stun` | `number` |  |
| `weapon_type` | `string` |  |

#### Example: Load

```ts
const motion_value = await client.MotionValue().load({ id: 1 })
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
| `description` | `string` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `rank` | `any[]` |  |

#### Example: Load

```ts
const skill = await client.Skill().load({ id: 1 })
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
| `asset` | `Record<string, any>` |  |
| `attack` | `Record<string, any>` |  |
| `attribute` | `Record<string, any>` |  |
| `crafting` | `Record<string, any>` |  |
| `damage_type` | `string` |  |
| `element` | `any[]` |  |
| `id` | `number` |  |
| `name` | `string` |  |
| `rarity` | `number` |  |
| `slot` | `any[]` |  |
| `type` | `string` |  |

#### Example: Load

```ts
const weapon = await client.Weapon().load({ id: 1 })
```

#### Example: List

```ts
const weapons = await client.Weapon().list()
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
import { MonsterHunterWorldSDK } from '@voxgig-sdk/monster-hunter-world'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const ailment = client.Ailment()
await ailment.list()

// ailment.data() now returns the ailment data from the last `list`
// ailment.match() returns the last match criteria
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
