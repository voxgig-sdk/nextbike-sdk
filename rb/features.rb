# Nextbike SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module NextbikeFeatures
  def self.make_feature(name)
    case name
    when "base"
      NextbikeBaseFeature.new
    when "ratelimit"
      NextbikeRatelimitFeature.new
    when "retry"
      NextbikeRetryFeature.new
    when "test"
      NextbikeTestFeature.new
    when "timeout"
      NextbikeTimeoutFeature.new
    else
      NextbikeBaseFeature.new
    end
  end
end
