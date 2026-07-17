-- Nextbike SDK exists test

local sdk = require("nextbike_sdk")

describe("NextbikeSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
