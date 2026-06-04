# Nextbike SDK

Query Nextbike's global bike-sharing network for stations, bike availability and rental data

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Nextbike API

[Nextbike](https://www.nextbike.net/) operates public bike-sharing systems in cities around the world. Its API exposes the live station and bike data that powers the Nextbike apps and partner integrations.

The API is split into a public area (live station and availability data) and a restricted area that requires an API key for actions such as reservations. Available data includes:

- City- and domain-scoped station listings
- Bike availability per station
- Location-based station queries (latitude/longitude)
- Reservation and reservation-status operations (key-protected)

Public read endpoints are open and CORS-enabled on most routes. Write operations and account-bound calls require an API key issued by Nextbike.

## Try it

**TypeScript**
```bash
npm install nextbike
```

**Python**
```bash
pip install nextbike-sdk
```

**PHP**
```bash
composer require voxgig/nextbike-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/nextbike-sdk/go
```

**Ruby**
```bash
gem install nextbike-sdk
```

**Lua**
```bash
luarocks install nextbike-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { NextbikeSDK } from 'nextbike'

const client = new NextbikeSDK({})

// List all livedatas
const livedatas = await client.LiveData().list()
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
cd go-mcp && go build -o nextbike-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "nextbike": {
      "command": "/abs/path/to/nextbike-mcp"
    }
  }
}
```

## Entities

The API exposes 4 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **LiveData** | Real-time station and bike availability snapshots across the Nextbike network, scoped by city, domain or geographic coordinates. | `/maps/nextbike-live.json` |
| **Public** | Open, unauthenticated endpoints exposing the public catalogue of stations and bikes. | `/maps/nextbike-live.xml` |
| **Reservation** | Operations for creating or managing a bike reservation; requires an API key from the restricted area. | `/reservation/reserve` |
| **ReservationStatus** | Lookups for the current state of an existing reservation. | `/reservation/status` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from nextbike_sdk import NextbikeSDK

client = NextbikeSDK({})

# List all livedatas
livedatas, err = client.LiveData(None).list(None, None)
```

### PHP

```php
<?php
require_once 'nextbike_sdk.php';

$client = new NextbikeSDK([]);

// List all livedatas
[$livedatas, $err] = $client->LiveData(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/nextbike-sdk/go"

client := sdk.NewNextbikeSDK(map[string]any{})

// List all livedatas
livedatas, err := client.LiveData(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "Nextbike_sdk"

client = NextbikeSDK.new({})

# List all livedatas
livedatas, err = client.LiveData(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("nextbike_sdk")

local client = sdk.new({})

-- List all livedatas
local livedatas, err = client:LiveData(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = NextbikeSDK.test()
const result = await client.LiveData().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = NextbikeSDK.test(None, None)
result, err = client.LiveData(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = NextbikeSDK::test(null, null);
[$result, $err] = $client->LiveData(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.LiveData(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = NextbikeSDK.test(nil, nil)
result, err = client.LiveData(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:LiveData(nil):load(
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

## Using the Nextbike API

- Upstream: [https://www.nextbike.net/](https://www.nextbike.net/)
- API docs: [https://api.nextbike.net/api/doc.php](https://api.nextbike.net/api/doc.php)

---

Generated from the Nextbike API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
