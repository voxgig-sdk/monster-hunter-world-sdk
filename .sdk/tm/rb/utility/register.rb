# MonsterHunterWorld SDK utility registration
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

MonsterHunterWorldUtility.registrar = ->(u) {
  u.clean = MonsterHunterWorldUtilities::Clean
  u.done = MonsterHunterWorldUtilities::Done
  u.make_error = MonsterHunterWorldUtilities::MakeError
  u.feature_add = MonsterHunterWorldUtilities::FeatureAdd
  u.feature_hook = MonsterHunterWorldUtilities::FeatureHook
  u.feature_init = MonsterHunterWorldUtilities::FeatureInit
  u.fetcher = MonsterHunterWorldUtilities::Fetcher
  u.make_fetch_def = MonsterHunterWorldUtilities::MakeFetchDef
  u.make_context = MonsterHunterWorldUtilities::MakeContext
  u.make_options = MonsterHunterWorldUtilities::MakeOptions
  u.make_request = MonsterHunterWorldUtilities::MakeRequest
  u.make_response = MonsterHunterWorldUtilities::MakeResponse
  u.make_result = MonsterHunterWorldUtilities::MakeResult
  u.make_point = MonsterHunterWorldUtilities::MakePoint
  u.make_spec = MonsterHunterWorldUtilities::MakeSpec
  u.make_url = MonsterHunterWorldUtilities::MakeUrl
  u.param = MonsterHunterWorldUtilities::Param
  u.prepare_auth = MonsterHunterWorldUtilities::PrepareAuth
  u.prepare_body = MonsterHunterWorldUtilities::PrepareBody
  u.prepare_headers = MonsterHunterWorldUtilities::PrepareHeaders
  u.prepare_method = MonsterHunterWorldUtilities::PrepareMethod
  u.prepare_params = MonsterHunterWorldUtilities::PrepareParams
  u.prepare_path = MonsterHunterWorldUtilities::PreparePath
  u.prepare_query = MonsterHunterWorldUtilities::PrepareQuery
  u.result_basic = MonsterHunterWorldUtilities::ResultBasic
  u.result_body = MonsterHunterWorldUtilities::ResultBody
  u.result_headers = MonsterHunterWorldUtilities::ResultHeaders
  u.transform_request = MonsterHunterWorldUtilities::TransformRequest
  u.transform_response = MonsterHunterWorldUtilities::TransformResponse
}
