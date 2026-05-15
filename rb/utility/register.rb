# Nextbike SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

NextbikeUtility.registrar = ->(u) {
  u.clean = NextbikeUtilities::Clean
  u.done = NextbikeUtilities::Done
  u.make_error = NextbikeUtilities::MakeError
  u.feature_add = NextbikeUtilities::FeatureAdd
  u.feature_hook = NextbikeUtilities::FeatureHook
  u.feature_init = NextbikeUtilities::FeatureInit
  u.fetcher = NextbikeUtilities::Fetcher
  u.make_fetch_def = NextbikeUtilities::MakeFetchDef
  u.make_context = NextbikeUtilities::MakeContext
  u.make_options = NextbikeUtilities::MakeOptions
  u.make_request = NextbikeUtilities::MakeRequest
  u.make_response = NextbikeUtilities::MakeResponse
  u.make_result = NextbikeUtilities::MakeResult
  u.make_point = NextbikeUtilities::MakePoint
  u.make_spec = NextbikeUtilities::MakeSpec
  u.make_url = NextbikeUtilities::MakeUrl
  u.param = NextbikeUtilities::Param
  u.prepare_auth = NextbikeUtilities::PrepareAuth
  u.prepare_body = NextbikeUtilities::PrepareBody
  u.prepare_headers = NextbikeUtilities::PrepareHeaders
  u.prepare_method = NextbikeUtilities::PrepareMethod
  u.prepare_params = NextbikeUtilities::PrepareParams
  u.prepare_path = NextbikeUtilities::PreparePath
  u.prepare_query = NextbikeUtilities::PrepareQuery
  u.result_basic = NextbikeUtilities::ResultBasic
  u.result_body = NextbikeUtilities::ResultBody
  u.result_headers = NextbikeUtilities::ResultHeaders
  u.transform_request = NextbikeUtilities::TransformRequest
  u.transform_response = NextbikeUtilities::TransformResponse
}
