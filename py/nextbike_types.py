# Typed models for the Nextbike SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class LiveData(TypedDict, total=False):
    city: list
    country: str
    country_name: str
    domain: str
    hotline: str
    lat: float
    lng: float
    name: str
    policy: str
    term: str
    website: str
    zoom: int


class LiveDataListMatch(TypedDict, total=False):
    city: list
    country: str
    country_name: str
    domain: str
    hotline: str
    lat: float
    lng: float
    name: str
    policy: str
    term: str
    website: str
    zoom: int


class Public(TypedDict):
    pass


class PublicLoadMatch(TypedDict):
    pass


class ReservationRequired(TypedDict):
    user_id: str


class Reservation(ReservationRequired, total=False):
    bike_number: str
    expires_at: str
    reservation_id: str
    station_id: int
    status: str
    unlock_code: str


class ReservationCreateDataRequired(TypedDict):
    user_id: str


class ReservationCreateData(ReservationCreateDataRequired, total=False):
    bike_number: str
    expires_at: str
    reservation_id: str
    station_id: int
    status: str
    unlock_code: str


class ReservationStatus(TypedDict, total=False):
    bike_number: str
    created_at: str
    expires_at: str
    reservation_id: str
    status: str


class ReservationStatusLoadMatch(TypedDict, total=False):
    bike_number: str
    created_at: str
    expires_at: str
    reservation_id: str
    status: str
