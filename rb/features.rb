# MonsterHunterWorld SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module MonsterHunterWorldFeatures
  def self.make_feature(name)
    case name
    when "base"
      MonsterHunterWorldBaseFeature.new
    when "ratelimit"
      MonsterHunterWorldRatelimitFeature.new
    when "retry"
      MonsterHunterWorldRetryFeature.new
    when "test"
      MonsterHunterWorldTestFeature.new
    when "timeout"
      MonsterHunterWorldTimeoutFeature.new
    else
      MonsterHunterWorldBaseFeature.new
    end
  end
end
