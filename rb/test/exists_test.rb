# Nextbike SDK exists test

require "minitest/autorun"
require_relative "../Nextbike_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = NextbikeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
