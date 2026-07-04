# Typed models for the Nextbike SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class LiveData:
    city: Optional[list] = None
    country: Optional[str] = None
    country_name: Optional[str] = None
    domain: Optional[str] = None
    hotline: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    name: Optional[str] = None
    policy: Optional[str] = None
    term: Optional[str] = None
    website: Optional[str] = None
    zoom: Optional[int] = None


@dataclass
class LiveDataListMatch:
    city: Optional[list] = None
    country: Optional[str] = None
    country_name: Optional[str] = None
    domain: Optional[str] = None
    hotline: Optional[str] = None
    lat: Optional[float] = None
    lng: Optional[float] = None
    name: Optional[str] = None
    policy: Optional[str] = None
    term: Optional[str] = None
    website: Optional[str] = None
    zoom: Optional[int] = None


@dataclass
class Public:
    pass


@dataclass
class PublicLoadMatch:
    pass


@dataclass
class Reservation:
    user_id: str
    bike_number: Optional[str] = None
    expires_at: Optional[str] = None
    reservation_id: Optional[str] = None
    station_id: Optional[int] = None
    status: Optional[str] = None
    unlock_code: Optional[str] = None


@dataclass
class ReservationCreateData:
    bike_number: Optional[str] = None
    expires_at: Optional[str] = None
    reservation_id: Optional[str] = None
    station_id: Optional[int] = None
    status: Optional[str] = None
    unlock_code: Optional[str] = None
    user_id: Optional[str] = None


@dataclass
class ReservationStatus:
    bike_number: Optional[str] = None
    created_at: Optional[str] = None
    expires_at: Optional[str] = None
    reservation_id: Optional[str] = None
    status: Optional[str] = None


@dataclass
class ReservationStatusLoadMatch:
    bike_number: Optional[str] = None
    created_at: Optional[str] = None
    expires_at: Optional[str] = None
    reservation_id: Optional[str] = None
    status: Optional[str] = None

