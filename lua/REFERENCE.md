# Nextbike Lua SDK Reference

Complete API reference for the Nextbike Lua SDK.


## NextbikeSDK

### Constructor

```lua
local sdk = require("nextbike_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `LiveData(data)`

Create a new `LiveData` entity instance. Pass `nil` for no initial data.

#### `Public(data)`

Create a new `Public` entity instance. Pass `nil` for no initial data.

#### `Reservation(data)`

Create a new `Reservation` entity instance. Pass `nil` for no initial data.

#### `ReservationStatus(data)`

Create a new `ReservationStatus` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## LiveDataEntity

```lua
local live_data = client:LiveData(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `table` | No |  |
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

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:LiveData():list()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## PublicEntity

```lua
local public = client:Public(nil)
```

### Operations

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Public():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReservationEntity

```lua
local reservation = client:Reservation(nil)
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

#### `create(reqdata, ctrl) -> any, err`

Create a new entity with the given data.

```lua
local result, err = client:Reservation():create({
  user_id = --[[ string ]],
})
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ReservationStatusEntity

```lua
local reservation_status = client:ReservationStatus(nil)
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

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:ReservationStatus():load()
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservationStatusEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

