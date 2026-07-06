# frozen_string_literal: true

# Typed models for the Nextbike SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# LiveData entity data model.
#
# @!attribute [rw] city
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] hotline
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lng
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] policy
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
#
# @!attribute [rw] zoom
#   @return [Integer, nil]
LiveData = Struct.new(
  :city,
  :country,
  :country_name,
  :domain,
  :hotline,
  :lat,
  :lng,
  :name,
  :policy,
  :term,
  :website,
  :zoom,
  keyword_init: true
)

# Request payload for LiveData#list.
#
# @!attribute [rw] city
#   @return [Array, nil]
#
# @!attribute [rw] country
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] domain
#   @return [String, nil]
#
# @!attribute [rw] hotline
#   @return [String, nil]
#
# @!attribute [rw] lat
#   @return [Float, nil]
#
# @!attribute [rw] lng
#   @return [Float, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] policy
#   @return [String, nil]
#
# @!attribute [rw] term
#   @return [String, nil]
#
# @!attribute [rw] website
#   @return [String, nil]
#
# @!attribute [rw] zoom
#   @return [Integer, nil]
LiveDataListMatch = Struct.new(
  :city,
  :country,
  :country_name,
  :domain,
  :hotline,
  :lat,
  :lng,
  :name,
  :policy,
  :term,
  :website,
  :zoom,
  keyword_init: true
)

# Public entity data model.
class Public
end

# Request payload for Public#load.
class PublicLoadMatch
end

# Reservation entity data model.
#
# @!attribute [rw] bike_number
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] reservation_id
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] unlock_code
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
Reservation = Struct.new(
  :bike_number,
  :expires_at,
  :reservation_id,
  :station_id,
  :status,
  :unlock_code,
  :user_id,
  keyword_init: true
)

# Request payload for Reservation#create.
#
# @!attribute [rw] bike_number
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] reservation_id
#   @return [String, nil]
#
# @!attribute [rw] station_id
#   @return [Integer, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
#
# @!attribute [rw] unlock_code
#   @return [String, nil]
#
# @!attribute [rw] user_id
#   @return [String]
ReservationCreateData = Struct.new(
  :bike_number,
  :expires_at,
  :reservation_id,
  :station_id,
  :status,
  :unlock_code,
  :user_id,
  keyword_init: true
)

# ReservationStatus entity data model.
#
# @!attribute [rw] bike_number
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] reservation_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ReservationStatus = Struct.new(
  :bike_number,
  :created_at,
  :expires_at,
  :reservation_id,
  :status,
  keyword_init: true
)

# Request payload for ReservationStatus#load.
#
# @!attribute [rw] bike_number
#   @return [String, nil]
#
# @!attribute [rw] created_at
#   @return [String, nil]
#
# @!attribute [rw] expires_at
#   @return [String, nil]
#
# @!attribute [rw] reservation_id
#   @return [String, nil]
#
# @!attribute [rw] status
#   @return [String, nil]
ReservationStatusLoadMatch = Struct.new(
  :bike_number,
  :created_at,
  :expires_at,
  :reservation_id,
  :status,
  keyword_init: true
)

