package = "voxgig-sdk-nextbike"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/nextbike-sdk.git"
}
description = {
  summary = "Nextbike SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["nextbike_sdk"] = "nextbike_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
