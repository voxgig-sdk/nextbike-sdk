# Nextbike Python SDK Reference

Complete API reference for the Nextbike Python SDK.


## NextbikeSDK

### Constructor

```python
from nextbike_sdk import NextbikeSDK

client = NextbikeSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NextbikeSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = NextbikeSDK.test()
```


### Instance Methods

#### `LiveData(data=None)`

Create a new `LiveDataEntity` instance. Pass `None` for no initial data.

#### `Public(data=None)`

Create a new `PublicEntity` instance. Pass `None` for no initial data.

#### `Reservation(data=None)`

Create a new `ReservationEntity` instance. Pass `None` for no initial data.

#### `ReservationStatus(data=None)`

Create a new `ReservationStatusEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## LiveDataEntity

```python
live_data = client.LiveData()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `city` | `list` | No |  |
| `country` | `str` | No |  |
| `country_name` | `str` | No |  |
| `domain` | `str` | No |  |
| `hotline` | `str` | No |  |
| `lat` | `float` | No |  |
| `lng` | `float` | No |  |
| `name` | `str` | No |  |
| `policy` | `str` | No |  |
| `term` | `str` | No |  |
| `website` | `str` | No |  |
| `zoom` | `int` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.LiveData().list()
for live_data in results:
    print(live_data)
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LiveDataEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PublicEntity

```python
public = client.Public()
```

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Public().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PublicEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservationEntity

```python
reservation = client.Reservation()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `str` | No |  |
| `expires_at` | `str` | No |  |
| `reservation_id` | `str` | No |  |
| `station_id` | `int` | No |  |
| `status` | `str` | No |  |
| `unlock_code` | `str` | No |  |
| `user_id` | `str` | Yes |  |

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

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Reservation().create({
    "user_id": "example_user_id",  # str
})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ReservationStatusEntity

```python
reservation_status = client.ReservationStatus()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bike_number` | `str` | No |  |
| `created_at` | `str` | No |  |
| `expires_at` | `str` | No |  |
| `reservation_id` | `str` | No |  |
| `status` | `str` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.ReservationStatus().load()
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ReservationStatusEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = NextbikeSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

