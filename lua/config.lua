-- Nextbike SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Nextbike",
      slug = "nextbike",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.nextbike.net",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["live_data"] = {},
        ["public"] = {},
        ["reservation"] = {},
        ["reservation_status"] = {},
      },
    },
    entity = {
      ["live_data"] = {
        ["fields"] = {
          {
            ["name"] = "cities",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "country",
            ["short"] = "Country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_name",
            ["short"] = "Full country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "domain",
            ["short"] = "Country domain",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "hotline",
            ["short"] = "Support hotline number",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "double",
            ["name"] = "lat",
            ["short"] = "Country center latitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["format"] = "double",
            ["name"] = "lng",
            ["short"] = "Country center longitude",
            ["type"] = "`$NUMBER`",
          },
          {
            ["name"] = "name",
            ["short"] = "Country name",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "policy",
            ["short"] = "Privacy policy URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "terms",
            ["short"] = "Terms and conditions URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "website",
            ["short"] = "Website URL",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "zoom",
            ["short"] = "Default zoom level",
            ["type"] = "`$INTEGER`",
          },
        },
        ["name"] = "live_data",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 5000,
                      ["kind"] = "query",
                      ["name"] = "distance",
                      ["orig"] = "distance",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/maps/nextbike-live.json",
                ["segments"] = {
                  {
                    ["lit"] = "maps",
                  },
                  {
                    ["lit"] = "nextbike-live.json",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "distance",
                    "lat",
                    "lng",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.countries`",
                },
                ["parts"] = {
                  "maps",
                  "nextbike-live.json",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["public"] = {
        ["fields"] = {},
        ["name"] = "public",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "city",
                      ["orig"] = "city",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 5000,
                      ["kind"] = "query",
                      ["name"] = "distance",
                      ["orig"] = "distance",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "lng",
                      ["orig"] = "lng",
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/maps/nextbike-live.xml",
                ["segments"] = {
                  {
                    ["lit"] = "maps",
                  },
                  {
                    ["lit"] = "nextbike-live.xml",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "city",
                    "distance",
                    "lat",
                    "lng",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "maps",
                  "nextbike-live.xml",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["reservation"] = {
        ["fields"] = {
          {
            ["name"] = "bike_number",
            ["op"] = {
              ["create"] = {
                ["req"] = true,
                ["type"] = "`$STRING`",
              },
            },
            ["short"] = "Reserved bike number",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "expires_at",
            ["short"] = "Reservation expiration time",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reservation_id",
            ["short"] = "Unique reservation identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "station_id",
            ["short"] = "Station identifier",
            ["type"] = "`$INTEGER`",
          },
          {
            ["name"] = "status",
            ["short"] = "Reservation status",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "unlock_code",
            ["short"] = "Code to unlock the bike",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "user_id",
            ["req"] = true,
            ["short"] = "User identifier",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "reservation",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["args"] = {},
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/reservation/reserve",
                ["segments"] = {
                  {
                    ["lit"] = "reservation",
                  },
                  {
                    ["lit"] = "reserve",
                  },
                },
                ["select"] = {
                  ["$action"] = "reserve",
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "reservation",
                  "reserve",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["reservation_status"] = {
        ["fields"] = {
          {
            ["name"] = "bike_number",
            ["short"] = "Reserved bike number",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "created_at",
            ["short"] = "Reservation creation time",
            ["type"] = "`$STRING`",
          },
          {
            ["format"] = "date-time",
            ["name"] = "expires_at",
            ["short"] = "Reservation expiration time",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "reservation_id",
            ["short"] = "Reservation identifier",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "status",
            ["short"] = "Current reservation status",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "reservation_status",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["kind"] = "query",
                      ["name"] = "reservation_id",
                      ["orig"] = "reservation_id",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/reservation/status",
                ["segments"] = {
                  {
                    ["lit"] = "reservation",
                  },
                  {
                    ["lit"] = "status",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "reservation_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "reservation",
                  "status",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
