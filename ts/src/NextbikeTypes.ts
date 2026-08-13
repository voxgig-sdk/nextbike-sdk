// Typed models for the Nextbike SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface LiveData {
  cities?: any[]
  country?: string
  country_name?: string
  domain?: string
  hotline?: string
  lat?: number
  lng?: number
  name?: string
  policy?: string
  terms?: string
  website?: string
  zoom?: number
}

export interface LiveDataListMatch {
  cities?: any[]
  country?: string
  country_name?: string
  domain?: string
  hotline?: string
  lat?: number
  lng?: number
  name?: string
  policy?: string
  terms?: string
  website?: string
  zoom?: number
}

export interface Public {
}

export interface PublicLoadMatch {
}

export interface Reservation {
  bike_number?: string
  expires_at?: string
  reservation_id?: string
  station_id?: number
  status?: string
  unlock_code?: string
  user_id: string
}

export interface ReservationCreateData {
  bike_number?: string
  expires_at?: string
  reservation_id?: string
  station_id?: number
  status?: string
  unlock_code?: string
  user_id: string

  // Selects a custom action instead of the plain create:
  //   'reserve'
  // The remaining keys are that action's own payload.
  $action?: string
  [action: string]: any
}

export interface ReservationStatus {
  bike_number?: string
  created_at?: string
  expires_at?: string
  reservation_id?: string
  status?: string
}

export interface ReservationStatusLoadMatch {
  bike_number?: string
  created_at?: string
  expires_at?: string
  reservation_id?: string
  status?: string
}

