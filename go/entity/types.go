// Typed models for the Nextbike SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// LiveData is the typed data model for the live_data entity.
type LiveData struct {
	City *[]any `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Hotline *string `json:"hotline,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lng *float64 `json:"lng,omitempty"`
	Name *string `json:"name,omitempty"`
	Policy *string `json:"policy,omitempty"`
	Term *string `json:"term,omitempty"`
	Website *string `json:"website,omitempty"`
	Zoom *int `json:"zoom,omitempty"`
}

// LiveDataListMatch is the typed request payload for LiveData.ListTyped.
type LiveDataListMatch struct {
	City *[]any `json:"city,omitempty"`
	Country *string `json:"country,omitempty"`
	CountryName *string `json:"country_name,omitempty"`
	Domain *string `json:"domain,omitempty"`
	Hotline *string `json:"hotline,omitempty"`
	Lat *float64 `json:"lat,omitempty"`
	Lng *float64 `json:"lng,omitempty"`
	Name *string `json:"name,omitempty"`
	Policy *string `json:"policy,omitempty"`
	Term *string `json:"term,omitempty"`
	Website *string `json:"website,omitempty"`
	Zoom *int `json:"zoom,omitempty"`
}

// Public is the typed data model for the public entity.
type Public struct {
}

// PublicLoadMatch is the typed request payload for Public.LoadTyped.
type PublicLoadMatch struct {
}

// Reservation is the typed data model for the reservation entity.
type Reservation struct {
	BikeNumber *string `json:"bike_number,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ReservationId *string `json:"reservation_id,omitempty"`
	StationId *int `json:"station_id,omitempty"`
	Status *string `json:"status,omitempty"`
	UnlockCode *string `json:"unlock_code,omitempty"`
	UserId string `json:"user_id"`
}

// ReservationCreateData is the typed request payload for Reservation.CreateTyped.
type ReservationCreateData struct {
	BikeNumber *string `json:"bike_number,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ReservationId *string `json:"reservation_id,omitempty"`
	StationId *int `json:"station_id,omitempty"`
	Status *string `json:"status,omitempty"`
	UnlockCode *string `json:"unlock_code,omitempty"`
	UserId string `json:"user_id"`
}

// ReservationStatus is the typed data model for the reservation_status entity.
type ReservationStatus struct {
	BikeNumber *string `json:"bike_number,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ReservationId *string `json:"reservation_id,omitempty"`
	Status *string `json:"status,omitempty"`
}

// ReservationStatusLoadMatch is the typed request payload for ReservationStatus.LoadTyped.
type ReservationStatusLoadMatch struct {
	BikeNumber *string `json:"bike_number,omitempty"`
	CreatedAt *string `json:"created_at,omitempty"`
	ExpiresAt *string `json:"expires_at,omitempty"`
	ReservationId *string `json:"reservation_id,omitempty"`
	Status *string `json:"status,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
