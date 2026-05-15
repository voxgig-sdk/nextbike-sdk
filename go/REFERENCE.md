# Nextbike Golang SDK Reference

Complete API reference for the Nextbike Golang SDK.


## NextbikeSDK

### Constructor

```go
func NewNextbikeSDK(options map[string]any) *NextbikeSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TestSDK(testopts, sdkopts map[string]any) *NextbikeSDK`

Create a test client with mock features active. Both arguments may be `nil`.

```go
client := sdk.TestSDK(nil, nil)
```


### Instance Methods

#### `LiveData(data map[string]any) NextbikeEntity`

Create a new `LiveData` entity instance. Pass `nil` for no initial data.

#### `Public(data map[string]any) NextbikeEntity`

Create a new `Public` entity instance. Pass `nil` for no initial data.

#### `Reservation(data map[string]any) NextbikeEntity`

Create a new `Reservation` entity instance. Pass `nil` for no initial data.

#### `ReservationStatus(data map[string]any) NextbikeEntity`

Create a new `ReservationStatus` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## LiveDataEntity

```go
live_data := client.LiveData(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | ``$ARRAY`` | No |  |
| `country` | ``$STRING`` | No |  |
| `country_name` | ``$STRING`` | No |  |
| `domain` | ``$STRING`` | No |  |
| `hotline` | ``$STRING`` | No |  |
| `lat` | ``$NUMBER`` | No |  |
| `lng` | ``$NUMBER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `policy` | ``$STRING`` | No |  |
| `term` | ``$STRING`` | No |  |
| `website` | ``$STRING`` | No |  |
| `zoom` | ``$INTEGER`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.LiveData(nil).List(nil, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PublicEntity

```go
public := client.Public(nil)
```

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Public(nil).Load(map[string]any{"id": "public_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PublicEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReservationEntity

```go
reservation := client.Reservation(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | ``$STRING`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `reservation_id` | ``$STRING`` | No |  |
| `station_id` | ``$INTEGER`` | No |  |
| `status` | ``$STRING`` | No |  |
| `unlock_code` | ``$STRING`` | No |  |
| `user_id` | ``$STRING`` | Yes |  |

### Field Usage by Operation

| Field | load | list | create | update | remove |
| --- | --- | --- | --- | --- | --- |
| `bike_number` | - | - | Yes | - | - |
| `expires_at` | - | - | - | - | - |
| `reservation_id` | - | - | - | - | - |
| `station_id` | - | - | - | - | - |
| `status` | - | - | - | - | - |
| `unlock_code` | - | - | - | - | - |
| `user_id` | - | - | - | - | - |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Reservation(nil).Create(map[string]any{
    "user_id": /* `$STRING` */,
}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReservationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ReservationStatusEntity

```go
reservation_status := client.ReservationStatus(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | ``$STRING`` | No |  |
| `created_at` | ``$STRING`` | No |  |
| `expires_at` | ``$STRING`` | No |  |
| `reservation_id` | ``$STRING`` | No |  |
| `status` | ``$STRING`` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.ReservationStatus(nil).Load(map[string]any{"id": "reservation_status_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ReservationStatusEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewNextbikeSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

