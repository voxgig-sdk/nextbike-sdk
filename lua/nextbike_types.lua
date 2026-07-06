-- Typed models for the Nextbike SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class LiveData
---@field city? table
---@field country? string
---@field country_name? string
---@field domain? string
---@field hotline? string
---@field lat? number
---@field lng? number
---@field name? string
---@field policy? string
---@field term? string
---@field website? string
---@field zoom? number

---@class LiveDataListMatch
---@field city? table
---@field country? string
---@field country_name? string
---@field domain? string
---@field hotline? string
---@field lat? number
---@field lng? number
---@field name? string
---@field policy? string
---@field term? string
---@field website? string
---@field zoom? number

---@class Public

---@class PublicLoadMatch

---@class Reservation
---@field bike_number? string
---@field expires_at? string
---@field reservation_id? string
---@field station_id? number
---@field status? string
---@field unlock_code? string
---@field user_id string

---@class ReservationCreateData
---@field bike_number? string
---@field expires_at? string
---@field reservation_id? string
---@field station_id? number
---@field status? string
---@field unlock_code? string
---@field user_id string

---@class ReservationStatus
---@field bike_number? string
---@field created_at? string
---@field expires_at? string
---@field reservation_id? string
---@field status? string

---@class ReservationStatusLoadMatch
---@field bike_number? string
---@field created_at? string
---@field expires_at? string
---@field reservation_id? string
---@field status? string

local M = {}

return M
