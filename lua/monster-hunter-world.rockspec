package = "voxgig-sdk-monster-hunter-world"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/monster-hunter-world-sdk.git"
}
description = {
  summary = "MonsterHunterWorld SDK for Lua",
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
    ["monster-hunter-world_sdk"] = "monster-hunter-world_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
