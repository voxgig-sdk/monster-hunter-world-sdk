<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

MonsterHunterWorldUtility::setRegistrar(function (MonsterHunterWorldUtility $u): void {
    $u->clean = [MonsterHunterWorldClean::class, 'call'];
    $u->done = [MonsterHunterWorldDone::class, 'call'];
    $u->make_error = [MonsterHunterWorldMakeError::class, 'call'];
    $u->feature_add = [MonsterHunterWorldFeatureAdd::class, 'call'];
    $u->feature_hook = [MonsterHunterWorldFeatureHook::class, 'call'];
    $u->feature_init = [MonsterHunterWorldFeatureInit::class, 'call'];
    $u->fetcher = [MonsterHunterWorldFetcher::class, 'call'];
    $u->make_fetch_def = [MonsterHunterWorldMakeFetchDef::class, 'call'];
    $u->make_context = [MonsterHunterWorldMakeContext::class, 'call'];
    $u->make_options = [MonsterHunterWorldMakeOptions::class, 'call'];
    $u->make_request = [MonsterHunterWorldMakeRequest::class, 'call'];
    $u->make_response = [MonsterHunterWorldMakeResponse::class, 'call'];
    $u->make_result = [MonsterHunterWorldMakeResult::class, 'call'];
    $u->make_point = [MonsterHunterWorldMakePoint::class, 'call'];
    $u->make_spec = [MonsterHunterWorldMakeSpec::class, 'call'];
    $u->make_url = [MonsterHunterWorldMakeUrl::class, 'call'];
    $u->param = [MonsterHunterWorldParam::class, 'call'];
    $u->prepare_auth = [MonsterHunterWorldPrepareAuth::class, 'call'];
    $u->prepare_body = [MonsterHunterWorldPrepareBody::class, 'call'];
    $u->prepare_headers = [MonsterHunterWorldPrepareHeaders::class, 'call'];
    $u->prepare_method = [MonsterHunterWorldPrepareMethod::class, 'call'];
    $u->prepare_params = [MonsterHunterWorldPrepareParams::class, 'call'];
    $u->prepare_path = [MonsterHunterWorldPreparePath::class, 'call'];
    $u->prepare_query = [MonsterHunterWorldPrepareQuery::class, 'call'];
    $u->result_basic = [MonsterHunterWorldResultBasic::class, 'call'];
    $u->result_body = [MonsterHunterWorldResultBody::class, 'call'];
    $u->result_headers = [MonsterHunterWorldResultHeaders::class, 'call'];
    $u->transform_request = [MonsterHunterWorldTransformRequest::class, 'call'];
    $u->transform_response = [MonsterHunterWorldTransformResponse::class, 'call'];
});
