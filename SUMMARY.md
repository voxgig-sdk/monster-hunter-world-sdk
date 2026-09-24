# Monster Hunter World API

The Monster Hunter World API provides detailed information about the game, including items, monsters, armor, skills, events, and more. It allows users to access various resources related to the game in a structured format, facilitating data retrieval and integration into applications.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 12 entities and 24 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Ailment

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: A short description of the ailment
- `id`: The ID of the ailment
- `name`: The name of the ailment

### Armor

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `attributes`: Dictionary of attribute modifiers attached to the armor piece
- `id`: The ID of the armor piece
- `name`: The name of the armor piece
- `rank`: The rank of the armor piece
- `rarity`: The rarity of the armor piece

### ArmorSet

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `bonus`: The set bonus, if any
- `id`: The ID of the armor set
- `name`: The name of the armor set
- `pieces`: Array of armor pieces in the set
- `rank`: The rank of the armor set

### Charm

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The ID of the charm
- `name`: The name of the charm
- `rarity`: The rarity of the charm
- `skills`: An array of skill ranks granted by the charm

### Decoration

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: The ID of the decoration
- `name`: The name of the decoration
- `rarity`: The rarity of the decoration
- `skills`: An array of skill ranks granted by the decoration
- `slot`: The slot rank required for the decoration

### Event

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `camps`: An array of camps in the location
- `description`: A description of the event
- `endTimestamp`: The end time of the event
- `exclusive`: Whether the event is exclusive to a platform
- `expansion`: The expansion the event belongs to

### Item

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `buyPrice`: The price when buying the item
- `carryLimit`: The maximum number of this item that can be carried
- `description`: A description of the item
- `id`: The ID of the item
- `name`: The name of the item

### Location

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `camps`: An array of camps in the location
- `id`: The ID of the location
- `name`: The name of the location
- `zoneCount`: The number of zones in the location

### Monster

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `ailments`: Ailments the monster can inflict
- `description`: A description of the monster
- `elements`: Elements the monster uses
- `id`: The ID of the monster
- `locations`: Locations where the monster can be found

### MotionValue

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `damageType`: The type of damage
- `exhaust`: Exhaust value
- `hits`: Hit information
- `id`: The ID of the motion value
- `stun`: Stun value

### Skill

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: A description of the skill
- `id`: The ID of the skill
- `name`: The name of the skill
- `ranks`: An array of skill ranks

### Weapon

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `assets`: Asset URLs for the weapon
- `attack`: Attack values for the weapon
- `attributes`: Additional weapon attributes
- `crafting`: Crafting information for the weapon
- `damageType`: The damage type of the weapon

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Ailment | `list` | `GET /ailments` | See reference |
| Ailment | `load` | `GET /ailments/{id}` | See reference |
| Armor | `list` | `GET /armor` | See reference |
| Armor | `load` | `GET /armor/{id}` | See reference |
| ArmorSet | `list` | `GET /armor/sets` | See reference |
| ArmorSet | `load` | `GET /armor/sets/{id}` | See reference |
| Charm | `list` | `GET /charms` | See reference |
| Charm | `load` | `GET /charms/{id}` | See reference |
| Decoration | `list` | `GET /decorations` | See reference |
| Decoration | `load` | `GET /decorations/{id}` | See reference |
| Event | `list` | `GET /events` | See reference |
| Event | `load` | `GET /events/{id}` | See reference |
| Item | `list` | `GET /items` | See reference |
| Item | `load` | `GET /items/{id}` | See reference |
| Location | `list` | `GET /locations` | See reference |
| Location | `load` | `GET /locations/{id}` | See reference |
| Monster | `list` | `GET /monsters` | See reference |
| Monster | `load` | `GET /monsters/{id}` | See reference |
| MotionValue | `list` | `GET /motion-values` | See reference |
| MotionValue | `load` | `GET /motion-values/{id}` | See reference |
| Skill | `list` | `GET /skills` | See reference |
| Skill | `load` | `GET /skills/{id}` | See reference |
| Weapon | `list` | `GET /weapons` | See reference |
| Weapon | `load` | `GET /weapons/{id}` | See reference |

## Connect to the API

- Production server: `https://mhw-db.com`
- Production server with localization: `https://mhw-db.com/{language}`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `monster-hunter-world_list`: List records for an entity. Supported entities: `ailment`, `armor`, `armor_set`, `charm`, `decoration`, `event`, `item`, `location`, `monster`, `motion_value`, `skill`, `weapon`.
- `monster-hunter-world_load`: Load one record for an entity. Supported entities: `ailment`, `armor`, `armor_set`, `charm`, `decoration`, `event`, `item`, `location`, `monster`, `motion_value`, `skill`, `weapon`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

