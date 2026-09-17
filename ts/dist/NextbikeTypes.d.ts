export interface LiveData {
    cities?: any[];
    country?: string;
    country_name?: string;
    domain?: string;
    hotline?: string;
    lat?: number;
    lng?: number;
    name?: string;
    policy?: string;
    terms?: string;
    website?: string;
    zoom?: number;
}
export interface LiveDataListMatch {
    city?: number;
    distance?: number;
    lat?: number;
    lng?: number;
}
export interface Public {
}
export interface PublicLoadMatch {
    city?: number;
    distance?: number;
    lat?: number;
    lng?: number;
}
export interface Reservation {
}
export interface ReservationCreateData {
    $action?: string;
    [action: string]: any;
}
export interface ReservationStatus {
    bike_number?: string;
    created_at?: string;
    expires_at?: string;
    reservation_id?: string;
    status?: string;
}
export interface ReservationStatusLoadMatch {
    reservation_id: string;
}
