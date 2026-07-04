# Nextbike PHP SDK Reference

Complete API reference for the Nextbike PHP SDK.


## NextbikeSDK

### Constructor

```php
require_once __DIR__ . '/nextbike_sdk.php';

$client = new NextbikeSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `NextbikeSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = NextbikeSDK::test();
```


### Instance Methods

#### `LiveData($data = null)`

Create a new `LiveDataEntity` instance. Pass `null` for no initial data.

#### `Public($data = null)`

Create a new `PublicEntity` instance. Pass `null` for no initial data.

#### `Reservation($data = null)`

Create a new `ReservationEntity` instance. Pass `null` for no initial data.

#### `ReservationStatus($data = null)`

Create a new `ReservationStatusEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## LiveDataEntity

```php
$live_data = $client->live_data();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->live_data()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): LiveDataEntity`

Create a new `LiveDataEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PublicEntity

```php
$public = $client->public();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->public()->load(["id" => "public_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PublicEntity`

Create a new `PublicEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ReservationEntity

```php
$reservation = $client->reservation();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->reservation()->create([
  "user_id" => /* `$STRING` */,
]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ReservationEntity`

Create a new `ReservationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## ReservationStatusEntity

```php
$reservation_status = $client->reservation_status();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->reservation_status()->load(["id" => "reservation_status_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): ReservationStatusEntity`

Create a new `ReservationStatusEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new NextbikeSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

