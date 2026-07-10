# Nextbike Ruby SDK Reference

Complete API reference for the Nextbike Ruby SDK.


## NextbikeSDK

### Constructor

```ruby
require_relative 'Nextbike_sdk'

client = NextbikeSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NextbikeSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = NextbikeSDK.test
```


### Instance Methods

#### `LiveData(data = nil)`

Create a new `LiveData` entity instance. Pass `nil` for no initial data.

#### `Public(data = nil)`

Create a new `Public` entity instance. Pass `nil` for no initial data.

#### `Reservation(data = nil)`

Create a new `Reservation` entity instance. Pass `nil` for no initial data.

#### `ReservationStatus(data = nil)`

Create a new `ReservationStatus` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## LiveDataEntity

```ruby
live_data = client.LiveData
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `Array` | No |  |
| `country` | `String` | No |  |
| `country_name` | `String` | No |  |
| `domain` | `String` | No |  |
| `hotline` | `String` | No |  |
| `lat` | `Float` | No |  |
| `lng` | `Float` | No |  |
| `name` | `String` | No |  |
| `policy` | `String` | No |  |
| `term` | `String` | No |  |
| `website` | `String` | No |  |
| `zoom` | `Integer` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.LiveData.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PublicEntity

```ruby
public = client.Public
```

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Public.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PublicEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReservationEntity

```ruby
reservation = client.Reservation
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `String` | No |  |
| `expires_at` | `String` | No |  |
| `reservation_id` | `String` | No |  |
| `station_id` | `Integer` | No |  |
| `status` | `String` | No |  |
| `unlock_code` | `String` | No |  |
| `user_id` | `String` | Yes |  |

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

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Reservation.create({
  "user_id" => "example_user_id", # String
})
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReservationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ReservationStatusEntity

```ruby
reservation_status = client.ReservationStatus
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `String` | No |  |
| `created_at` | `String` | No |  |
| `expires_at` | `String` | No |  |
| `reservation_id` | `String` | No |  |
| `status` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.ReservationStatus.load()
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ReservationStatusEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = NextbikeSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

