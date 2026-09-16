
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'Nextbike',
        slug: "nextbike",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.nextbike.net",

    auth: {
      prefix: '',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      live_data: {
      },

      public: {
      },

      reservation: {
      },

      reservation_status: {
      },

    }
  }


  entity = {
    "live_data": {
      "fields": [
        {
          "name": "cities",
          "type": "`$ARRAY`"
        },
        {
          "name": "country",
          "short": "Country code",
          "type": "`$STRING`"
        },
        {
          "name": "country_name",
          "short": "Full country name",
          "type": "`$STRING`"
        },
        {
          "name": "domain",
          "short": "Country domain",
          "type": "`$STRING`"
        },
        {
          "name": "hotline",
          "short": "Support hotline number",
          "type": "`$STRING`"
        },
        {
          "format": "double",
          "name": "lat",
          "short": "Country center latitude",
          "type": "`$NUMBER`"
        },
        {
          "format": "double",
          "name": "lng",
          "short": "Country center longitude",
          "type": "`$NUMBER`"
        },
        {
          "name": "name",
          "short": "Country name",
          "type": "`$STRING`"
        },
        {
          "name": "policy",
          "short": "Privacy policy URL",
          "type": "`$STRING`"
        },
        {
          "name": "terms",
          "short": "Terms and conditions URL",
          "type": "`$STRING`"
        },
        {
          "name": "website",
          "short": "Website URL",
          "type": "`$STRING`"
        },
        {
          "name": "zoom",
          "short": "Default zoom level",
          "type": "`$INTEGER`"
        }
      ],
      "name": "live_data",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 5000,
                    "kind": "query",
                    "name": "distance",
                    "orig": "distance",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lng",
                    "orig": "lng",
                    "type": "`$NUMBER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/maps/nextbike-live.json",
              "segments": [
                {
                  "lit": "maps"
                },
                {
                  "lit": "nextbike-live.json"
                }
              ],
              "select": {
                "exist": [
                  "city",
                  "distance",
                  "lat",
                  "lng"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.countries`"
              },
              "parts": [
                "maps",
                "nextbike-live.json"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "public": {
      "fields": [],
      "name": "public",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "city",
                    "orig": "city",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 5000,
                    "kind": "query",
                    "name": "distance",
                    "orig": "distance",
                    "type": "`$INTEGER`"
                  },
                  {
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "lng",
                    "orig": "lng",
                    "type": "`$NUMBER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/maps/nextbike-live.xml",
              "segments": [
                {
                  "lit": "maps"
                },
                {
                  "lit": "nextbike-live.xml"
                }
              ],
              "select": {
                "exist": [
                  "city",
                  "distance",
                  "lat",
                  "lng"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "maps",
                "nextbike-live.xml"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "reservation": {
      "fields": [
        {
          "name": "bike_number",
          "op": {
            "create": {
              "req": true,
              "type": "`$STRING`"
            }
          },
          "short": "Reserved bike number",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "expires_at",
          "short": "Reservation expiration time",
          "type": "`$STRING`"
        },
        {
          "name": "reservation_id",
          "short": "Unique reservation identifier",
          "type": "`$STRING`"
        },
        {
          "name": "station_id",
          "short": "Station identifier",
          "type": "`$INTEGER`"
        },
        {
          "name": "status",
          "short": "Reservation status",
          "type": "`$STRING`"
        },
        {
          "name": "unlock_code",
          "short": "Code to unlock the bike",
          "type": "`$STRING`"
        },
        {
          "name": "user_id",
          "req": true,
          "short": "User identifier",
          "type": "`$STRING`"
        }
      ],
      "name": "reservation",
      "op": {
        "create": {
          "input": "data",
          "name": "create",
          "points": [
            {
              "args": {},
              "kind": "http",
              "method": "POST",
              "orig": "/reservation/reserve",
              "segments": [
                {
                  "lit": "reservation"
                },
                {
                  "lit": "reserve"
                }
              ],
              "select": {
                "$action": "reserve"
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "reservation",
                "reserve"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "reservation_status": {
      "fields": [
        {
          "name": "bike_number",
          "short": "Reserved bike number",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "created_at",
          "short": "Reservation creation time",
          "type": "`$STRING`"
        },
        {
          "format": "date-time",
          "name": "expires_at",
          "short": "Reservation expiration time",
          "type": "`$STRING`"
        },
        {
          "name": "reservation_id",
          "short": "Reservation identifier",
          "type": "`$STRING`"
        },
        {
          "name": "status",
          "short": "Current reservation status",
          "type": "`$STRING`"
        }
      ],
      "name": "reservation_status",
      "op": {
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "kind": "query",
                    "name": "reservation_id",
                    "orig": "reservation_id",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/reservation/status",
              "segments": [
                {
                  "lit": "reservation"
                },
                {
                  "lit": "status"
                }
              ],
              "select": {
                "exist": [
                  "reservation_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "reservation",
                "status"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

