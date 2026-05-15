# MonsterHunterWorld SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module MonsterHunterWorldFeatures
  def self.make_feature(name)
    case name
    when "base"
      MonsterHunterWorldBaseFeature.new
    when "test"
      MonsterHunterWorldTestFeature.new
    else
      MonsterHunterWorldBaseFeature.new
    end
  end
end
