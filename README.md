# MonsterHunterWorld SDK

Monster Hunter World API client, generated from the OpenAPI spec.

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

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

## Quickstart

### TypeScript

```ts
import { MonsterHunterWorldSDK } from 'monster-hunter-world'

const client = new MonsterHunterWorldSDK({
  apikey: process.env.MONSTER-HUNTER-WORLD_APIKEY,
})

// List all ailments
const ailments = await client.Ailment().list()
console.log(ailments.data)
```

See the [TypeScript README](ts/README.md) for the full guide.

## Surfaces

| Surface | Path |
| --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | `go-cli/` |
| **MCP server** | `go-mcp/` |

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
| **Ailment** |  | `/ailments` |
| **Armor** |  | `/armor` |
| **ArmorSet** |  | `/armor/sets` |
| **Charm** |  | `/charms` |
| **Decoration** |  | `/decorations` |
| **Event** |  | `/events` |
| **Item** |  | `/items` |
| **Location** |  | `/locations` |
| **Monster** |  | `/monsters` |
| **MotionValue** |  | `/motion-values` |
| **Skill** |  | `/skills` |
| **Weapon** |  | `/weapons` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
import os
from monsterhunterworld_sdk import MonsterHunterWorldSDK

client = MonsterHunterWorldSDK({
    "apikey": os.environ.get("MONSTER-HUNTER-WORLD_APIKEY"),
})

# List all ailments
ailments, err = client.Ailment().list()
print(ailments)

# Load a specific ailment
ailment, err = client.Ailment().load({"id": "example_id"})
print(ailment)
```

### PHP

```php
<?php
require_once 'monsterhunterworld_sdk.php';

$client = new MonsterHunterWorldSDK([
    "apikey" => getenv("MONSTER-HUNTER-WORLD_APIKEY"),
]);

// List all ailments
[$ailments, $err] = $client->Ailment()->list();
print_r($ailments);

// Load a specific ailment
[$ailment, $err] = $client->Ailment()->load(["id" => "example_id"]);
print_r($ailment);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"

client := sdk.NewMonsterHunterWorldSDK(map[string]any{
    "apikey": os.Getenv("MONSTER-HUNTER-WORLD_APIKEY"),
})

// List all ailments
ailments, err := client.Ailment(nil).List(nil, nil)
fmt.Println(ailments)
```

### Ruby

```ruby
require_relative "MonsterHunterWorld_sdk"

client = MonsterHunterWorldSDK.new({
  "apikey" => ENV["MONSTER-HUNTER-WORLD_APIKEY"],
})

# List all ailments
ailments, err = client.Ailment().list
puts ailments

# Load a specific ailment
ailment, err = client.Ailment().load({ "id" => "example_id" })
puts ailment
```

### Lua

```lua
local sdk = require("monster-hunter-world_sdk")

local client = sdk.new({
  apikey = os.getenv("MONSTER-HUNTER-WORLD_APIKEY"),
})

-- List all ailments
local ailments, err = client:Ailment():list()
print(ailments)

-- Load a specific ailment
local ailment, err = client:Ailment():load({ id = "example_id" })
print(ailment)
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
client = MonsterHunterWorldSDK.test()
result, err = client.Ailment().load({"id": "test01"})
```

### PHP

```php
$client = MonsterHunterWorldSDK::test();
[$result, $err] = $client->Ailment()->load(["id" => "test01"]);
```

### Golang

```go
client := sdk.Test()
result, err := client.Ailment(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = MonsterHunterWorldSDK.test
result, err = client.Ailment().load({ "id" => "test01" })
```

### Lua

```lua
local client = sdk.test()
local result, err = client:Ailment():load({ id = "test01" })
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

---

Generated from the Monster Hunter World API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
