# Nextbike TypeScript SDK Reference

Complete API reference for the Nextbike TypeScript SDK.


## NextbikeSDK

### Constructor

```ts
new NextbikeSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NextbikeSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = NextbikeSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `NextbikeSDK` instance in test mode.


### Instance Methods

#### `LiveData(data?: object)`

Create a new `LiveData` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LiveDataEntity` instance.

#### `Public(data?: object)`

Create a new `Public` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PublicEntity` instance.

#### `Reservation(data?: object)`

Create a new `Reservation` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservationEntity` instance.

#### `ReservationStatus(data?: object)`

Create a new `ReservationStatus` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ReservationStatusEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `NextbikeSDK.test()`.

**Returns:** `NextbikeSDK` instance in test mode.


---

## LiveDataEntity

```ts
const live_data = client.LiveData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `any[]` | No |  |
| `country` | `string` | No |  |
| `country_name` | `string` | No |  |
| `domain` | `string` | No |  |
| `hotline` | `string` | No |  |
| `lat` | `number` | No |  |
| `lng` | `number` | No |  |
| `name` | `string` | No |  |
| `policy` | `string` | No |  |
| `term` | `string` | No |  |
| `website` | `string` | No |  |
| `zoom` | `number` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.LiveData().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `client()`

Return the parent `NextbikeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PublicEntity

```ts
const public_ = client.Public()
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Public().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PublicEntity` instance with the same client and
options.

#### `client()`

Return the parent `NextbikeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservationEntity

```ts
const reservation = client.Reservation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `string` | No |  |
| `expires_at` | `string` | No |  |
| `reservation_id` | `string` | No |  |
| `station_id` | `number` | No |  |
| `status` | `string` | No |  |
| `unlock_code` | `string` | No |  |
| `user_id` | `string` | Yes |  |

### Field Usage by Operation

| Field | create |
| --- | --- |
| `bike_number` | Yes |
| `expires_at` | - |
| `reservation_id` | - |
| `station_id` | - |
| `status` | - |
| `unlock_code` | - |
| `user_id` | - |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Reservation().create({
  user_id: 'example_user_id',
})
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservationEntity` instance with the same client and
options.

#### `client()`

Return the parent `NextbikeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ReservationStatusEntity

```ts
const reservation_status = client.ReservationStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `string` | No |  |
| `created_at` | `string` | No |  |
| `expires_at` | `string` | No |  |
| `reservation_id` | `string` | No |  |
| `status` | `string` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.ReservationStatus().load()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ReservationStatusEntity` instance with the same client and
options.

#### `client()`

Return the parent `NextbikeSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new NextbikeSDK({
  feature: {
    test: { active: true },
  }
})
```

