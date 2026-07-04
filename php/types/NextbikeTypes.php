<?php
declare(strict_types=1);

// Typed models for the Nextbike SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** LiveData entity data model. */
class LiveData
{
    public ?array $city = null;
    public ?string $country = null;
    public ?string $country_name = null;
    public ?string $domain = null;
    public ?string $hotline = null;
    public ?float $lat = null;
    public ?float $lng = null;
    public ?string $name = null;
    public ?string $policy = null;
    public ?string $term = null;
    public ?string $website = null;
    public ?int $zoom = null;
}

/** Match filter for LiveData#list (any subset of LiveData fields). */
class LiveDataListMatch
{
    public ?array $city = null;
    public ?string $country = null;
    public ?string $country_name = null;
    public ?string $domain = null;
    public ?string $hotline = null;
    public ?float $lat = null;
    public ?float $lng = null;
    public ?string $name = null;
    public ?string $policy = null;
    public ?string $term = null;
    public ?string $website = null;
    public ?int $zoom = null;
}

/** Public entity data model. */
class Public
{
}

/** Match filter for Public#load (any subset of Public fields). */
class PublicLoadMatch
{
}

/** Reservation entity data model. */
class Reservation
{
    public ?string $bike_number = null;
    public ?string $expires_at = null;
    public ?string $reservation_id = null;
    public ?int $station_id = null;
    public ?string $status = null;
    public ?string $unlock_code = null;
    public string $user_id;
}

/** Match filter for Reservation#create (any subset of Reservation fields). */
class ReservationCreateData
{
    public ?string $bike_number = null;
    public ?string $expires_at = null;
    public ?string $reservation_id = null;
    public ?int $station_id = null;
    public ?string $status = null;
    public ?string $unlock_code = null;
    public ?string $user_id = null;
}

/** ReservationStatus entity data model. */
class ReservationStatus
{
    public ?string $bike_number = null;
    public ?string $created_at = null;
    public ?string $expires_at = null;
    public ?string $reservation_id = null;
    public ?string $status = null;
}

/** Match filter for ReservationStatus#load (any subset of ReservationStatus fields). */
class ReservationStatusLoadMatch
{
    public ?string $bike_number = null;
    public ?string $created_at = null;
    public ?string $expires_at = null;
    public ?string $reservation_id = null;
    public ?string $status = null;
}

