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
| `cities` | `Array` | No |  |
| `country` | `String` | No | Country code |
| `country_name` | `String` | No | Full country name |
| `domain` | `String` | No | Country domain |
| `hotline` | `String` | No | Support hotline number |
| `lat` | `Float` | No | Country center latitude |
| `lng` | `Float` | No | Country center longitude |
| `name` | `String` | No | Country name |
| `policy` | `String` | No | Privacy policy URL |
| `terms` | `String` | No | Terms and conditions URL |
| `website` | `String` | No | Website URL |
| `zoom` | `Integer` | No | Default zoom level |

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
| `bike_number` | `String` | No | Reserved bike number |
| `expires_at` | `String` | No | Reservation expiration time |
| `reservation_id` | `String` | No | Unique reservation identifier |
| `station_id` | `Integer` | No | Station identifier |
| `status` | `String` | No | Reservation status |
| `unlock_code` | `String` | No | Code to unlock the bike |
| `user_id` | `String` | Yes | User identifier |

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
| `bike_number` | `String` | No | Reserved bike number |
| `created_at` | `String` | No | Reservation creation time |
| `expires_at` | `String` | No | Reservation expiration time |
| `reservation_id` | `String` | No | Reservation identifier |
| `status` | `String` | No | Current reservation status |

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

