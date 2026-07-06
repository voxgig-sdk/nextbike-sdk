# Nextbike TypeScript SDK



The TypeScript SDK for the Nextbike API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.LiveData()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/nextbike-sdk/releases](https://github.com/voxgig-sdk/nextbike-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { NextbikeSDK } from '@voxgig-sdk/nextbike'

const client = new NextbikeSDK({
  apikey: process.env.NEXTBIKE_APIKEY,
})
```

### 2. List livedata records

`list()` resolves to an array of LiveData objects — iterate it directly:

```ts
const livedatas = await client.LiveData().list()

for (const livedata of livedatas) {
  console.log(livedata)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const livedatas = await client.LiveData().list()
  console.log(livedatas)
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
const client = NextbikeSDK.test()

const livedata = await client.LiveData().list()
// livedata is a bare entity populated with mock response data
console.log(livedata)
```

You can also use the instance method:

```ts
const client = new NextbikeSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.LiveData()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
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

const client = new NextbikeSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
NEXTBIKE_TEST_LIVE=TRUE
NEXTBIKE_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### NextbikeSDK

#### Constructor

```ts
new NextbikeSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
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
| `LiveData(data?)` | `LiveDataEntity` | Create a LiveData entity instance. |
| `Public(data?)` | `PublicEntity` | Create a Public entity instance. |
| `Reservation(data?)` | `ReservationEntity` | Create a Reservation entity instance. |
| `ReservationStatus(data?)` | `ReservationStatusEntity` | Create a ReservationStatus entity instance. |
| `tester(testopts?, sdkopts?)` | `NextbikeSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `NextbikeSDK.test(testopts?, sdkopts?)` | `NextbikeSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): NextbikeSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
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

#### LiveData

| Field | Description |
| --- | --- |
| `city` |  |
| `country` |  |
| `country_name` |  |
| `domain` |  |
| `hotline` |  |
| `lat` |  |
| `lng` |  |
| `name` |  |
| `policy` |  |
| `term` |  |
| `website` |  |
| `zoom` |  |

Operations: list.

API path: `/maps/nextbike-live.json`

#### Public

| Field | Description |
| --- | --- |

Operations: load.

API path: `/maps/nextbike-live.xml`

#### Reservation

| Field | Description |
| --- | --- |
| `bike_number` |  |
| `expires_at` |  |
| `reservation_id` |  |
| `station_id` |  |
| `status` |  |
| `unlock_code` |  |
| `user_id` |  |

Operations: create.

API path: `/reservation/reserve`

#### ReservationStatus

| Field | Description |
| --- | --- |
| `bike_number` |  |
| `created_at` |  |
| `expires_at` |  |
| `reservation_id` |  |
| `status` |  |

Operations: load.

API path: `/reservation/status`



## Entities


### LiveData

Create an instance: `const live_data = client.LiveData()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `city` | `any[]` |  |
| `country` | `string` |  |
| `country_name` | `string` |  |
| `domain` | `string` |  |
| `hotline` | `string` |  |
| `lat` | `number` |  |
| `lng` | `number` |  |
| `name` | `string` |  |
| `policy` | `string` |  |
| `term` | `string` |  |
| `website` | `string` |  |
| `zoom` | `number` |  |

#### Example: List

```ts
const live_datas = await client.LiveData().list()
```


### Public

Create an instance: `const public_ = client.Public()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Example: Load

```ts
const public_ = await client.Public().load()
```


### Reservation

Create an instance: `const reservation = client.Reservation()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bike_number` | `string` |  |
| `expires_at` | `string` |  |
| `reservation_id` | `string` |  |
| `station_id` | `number` |  |
| `status` | `string` |  |
| `unlock_code` | `string` |  |
| `user_id` | `string` |  |

#### Example: Create

```ts
const reservation = await client.Reservation().create({
  user_id: /* string */,
})
```


### ReservationStatus

Create an instance: `const reservation_status = client.ReservationStatus()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bike_number` | `string` |  |
| `created_at` | `string` |  |
| `expires_at` | `string` |  |
| `reservation_id` | `string` |  |
| `status` | `string` |  |

#### Example: Load

```ts
const reservation_status = await client.ReservationStatus().load()
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
nextbike/
├── src/
│   ├── NextbikeSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { NextbikeSDK } from '@voxgig-sdk/nextbike'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const livedata = client.LiveData()
await livedata.list()

// livedata.data() now returns the livedata data from the last `list`
// livedata.match() returns the last match criteria
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
