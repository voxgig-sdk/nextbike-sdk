# Nextbike SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module NextbikeFeatures
  def self.make_feature(name)
    case name
    when "base"
      NextbikeBaseFeature.new
    when "test"
      NextbikeTestFeature.new
    else
      NextbikeBaseFeature.new
    end
  end
end
