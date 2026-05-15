# MonsterHunterWorld SDK exists test

require "minitest/autorun"
require_relative "../MonsterHunterWorld_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = MonsterHunterWorldSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
