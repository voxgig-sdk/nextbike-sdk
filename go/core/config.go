package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Nextbike",
			"slug": "nextbike",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.nextbike.net",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"live_data": map[string]any{},
				"public": map[string]any{},
				"reservation": map[string]any{},
				"reservation_status": map[string]any{},
			},
		},
		"entity": map[string]any{
			"live_data": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "cities",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "country",
						"short": "Country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"short": "Full country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "domain",
						"short": "Country domain",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "hotline",
						"short": "Support hotline number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lat",
						"short": "Country center latitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "lng",
						"short": "Country center longitude",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Country name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "policy",
						"short": "Privacy policy URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "terms",
						"short": "Terms and conditions URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "website",
						"short": "Website URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "zoom",
						"short": "Default zoom level",
						"type": "`$INTEGER`",
					},
				},
				"name": "live_data",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 5000,
											"kind": "query",
											"name": "distance",
											"orig": "distance",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/maps/nextbike-live.json",
								"parts": []any{
									"maps",
									"nextbike-live.json",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"distance",
										"lat",
										"lng",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.countries`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"public": map[string]any{
				"fields": []any{},
				"name": "public",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "city",
											"orig": "city",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 5000,
											"kind": "query",
											"name": "distance",
											"orig": "distance",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "lng",
											"orig": "lng",
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/maps/nextbike-live.xml",
								"parts": []any{
									"maps",
									"nextbike-live.xml",
								},
								"select": map[string]any{
									"exist": []any{
										"city",
										"distance",
										"lat",
										"lng",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reservation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bike_number",
						"op": map[string]any{
							"create": map[string]any{
								"req": true,
								"type": "`$STRING`",
							},
						},
						"short": "Reserved bike number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"short": "Reservation expiration time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reservation_id",
						"short": "Unique reservation identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "station_id",
						"short": "Station identifier",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "status",
						"short": "Reservation status",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "unlock_code",
						"short": "Code to unlock the bike",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user_id",
						"req": true,
						"short": "User identifier",
						"type": "`$STRING`",
					},
				},
				"name": "reservation",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/reservation/reserve",
								"parts": []any{
									"reservation",
									"reserve",
								},
								"select": map[string]any{
									"$action": "reserve",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"reservation_status": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bike_number",
						"short": "Reserved bike number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "created_at",
						"short": "Reservation creation time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "expires_at",
						"short": "Reservation expiration time",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "reservation_id",
						"short": "Reservation identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "status",
						"short": "Current reservation status",
						"type": "`$STRING`",
					},
				},
				"name": "reservation_status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "reservation_id",
											"orig": "reservation_id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/reservation/status",
								"parts": []any{
									"reservation",
									"status",
								},
								"select": map[string]any{
									"exist": []any{
										"reservation_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
