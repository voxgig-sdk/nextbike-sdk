// Typed models for the Nextbike SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface LiveData {
  city?: any[]
  country?: string
  country_name?: string
  domain?: string
  hotline?: string
  lat?: number
  lng?: number
  name?: string
  policy?: string
  term?: string
  website?: string
  zoom?: number
}

export type LiveDataListMatch = Partial<LiveData>

export interface Public {
}

export type PublicLoadMatch = Partial<Public>

export interface Reservation {
  bike_number?: string
  expires_at?: string
  reservation_id?: string
  station_id?: number
  status?: string
  unlock_code?: string
  user_id: string
}

export type ReservationCreateData = Partial<Reservation>

export interface ReservationStatus {
  bike_number?: string
  created_at?: string
  expires_at?: string
  reservation_id?: string
  status?: string
}

export type ReservationStatusLoadMatch = Partial<ReservationStatus>

