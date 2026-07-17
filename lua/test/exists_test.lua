-- MonsterHunterWorld SDK exists test

local sdk = require("monster-hunter-world_sdk")

describe("MonsterHunterWorldSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
