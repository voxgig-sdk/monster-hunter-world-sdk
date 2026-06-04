# MonsterHunterWorld SDK

Query Monster Hunter World game data — monsters, weapons, armor, skills, items, and events

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Monster Hunter World API

The [Monster Hunter World API](https://docs.mhw-db.com/) is a community-maintained REST service that exposes the equipment, creatures, skills, and game mechanics from Capcom's *Monster Hunter: World*. The project has entered maintenance mode and will not receive further feature work, but the endpoints remain available at `https://mhw-db.com`.

What you get from the API:

- Monsters with weaknesses, ailments, and drop tables
- All 14 weapon types with detailed stats and motion values
- Armor pieces, full armor sets, and set bonuses
- Charms with upgrade trees, decorations (jewels), and skill modifiers
- Items (consumables, crafting materials), locations with camp sites, and limited-time events

No authentication is required and no rate limits are documented. CORS is disabled, so calls generally need to go through a server-side proxy rather than directly from a browser. Responses can be localized to English (default), French, German, Simplified Chinese, or Traditional Chinese via optional language tag prefixes in the URL path. A successor project for *Monster Hunter Wilds* is available at [docs.wilds.mhdb.io](https://docs.wilds.mhdb.io).

## Try it

**TypeScript**
```bash
npm install monster-hunter-world
```

**Python**
```bash
pip install monster-hunter-world-sdk
```

**PHP**
```bash
composer require voxgig/monster-hunter-world-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/monster-hunter-world-sdk/go
```

**Ruby**
```bash
gem install monster-hunter-world-sdk
```

**Lua**
```bash
luarocks install monster-hunter-world-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { MonsterHunterWorldSDK } from 'monster-hunter-world'

const client = new MonsterHunterWorldSDK({})

// List all ailments
const ailments = await client.Ailment().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o monster-hunter-world-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "monster-hunter-world": {
      "command": "/abs/path/to/monster-hunter-world-mcp"
    }
  }
}
```

## Entities

The API exposes 12 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Ailment** | Status effects (poison, paralysis, etc.) along with recovery items and methods. | `/ailments` |
| **Armor** | Individual armor pieces with stats, skills, and crafting requirements. | `/armor` |
| **ArmorSet** | Full armor sets that group pieces and expose set bonuses. | `/armor/sets` |
| **Charm** | Equippable charms with their upgrade trees and granted skills. | `/charms` |
| **Decoration** | Jewels that slot into armor or weapons to grant additional skill points. | `/decorations` |
| **Event** | Limited-time in-game quests and event metadata. | `/events` |
| **Item** | Consumables and crafting materials used throughout the game. | `/items` |
| **Location** | Maps and their camp sites where hunts take place. | `/locations` |
| **Monster** | Enemy creatures with elemental weaknesses, ailment susceptibilities, and drop tables. | `/monsters` |
| **MotionValue** | Per-attack motion-value data describing how weapon moves scale damage. | `/motion-values` |
| **Skill** | Player ability modifiers granted by armor, charms, and decorations. | `/skills` |
| **Weapon** | Entries for all 14 weapon types with sharpness, element, and stat details. | `/weapons` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from monsterhunterworld_sdk import MonsterHunterWorldSDK

client = MonsterHunterWorldSDK({})

# List all ailments
ailments, err = client.Ailment(None).list(None, None)

# Load a specific ailment
ailment, err = client.Ailment(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'monsterhunterworld_sdk.php';

$client = new MonsterHunterWorldSDK([]);

// List all ailments
[$ailments, $err] = $client->Ailment(null)->list(null, null);

// Load a specific ailment
[$ailment, $err] = $client->Ailment(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"

client := sdk.NewMonsterHunterWorldSDK(map[string]any{})

// List all ailments
ailments, err := client.Ailment(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "MonsterHunterWorld_sdk"

client = MonsterHunterWorldSDK.new({})

# List all ailments
ailments, err = client.Ailment(nil).list(nil, nil)

# Load a specific ailment
ailment, err = client.Ailment(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("monster-hunter-world_sdk")

local client = sdk.new({})

-- List all ailments
local ailments, err = client:Ailment(nil):list(nil, nil)

-- Load a specific ailment
local ailment, err = client:Ailment(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = MonsterHunterWorldSDK.test()
const result = await client.Ailment().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = MonsterHunterWorldSDK.test(None, None)
result, err = client.Ailment(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = MonsterHunterWorldSDK::test(null, null);
[$result, $err] = $client->Ailment(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Ailment(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MonsterHunterWorldSDK.test(nil, nil)
result, err = client.Ailment(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Ailment(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Monster Hunter World API

- Upstream: [https://docs.mhw-db.com/](https://docs.mhw-db.com/)

---

Generated from the Monster Hunter World API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
