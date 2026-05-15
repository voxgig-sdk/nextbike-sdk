<?php
declare(strict_types=1);

// Nextbike SDK utility registration

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

NextbikeUtility::setRegistrar(function (NextbikeUtility $u): void {
    $u->clean = [NextbikeClean::class, 'call'];
    $u->done = [NextbikeDone::class, 'call'];
    $u->make_error = [NextbikeMakeError::class, 'call'];
    $u->feature_add = [NextbikeFeatureAdd::class, 'call'];
    $u->feature_hook = [NextbikeFeatureHook::class, 'call'];
    $u->feature_init = [NextbikeFeatureInit::class, 'call'];
    $u->fetcher = [NextbikeFetcher::class, 'call'];
    $u->make_fetch_def = [NextbikeMakeFetchDef::class, 'call'];
    $u->make_context = [NextbikeMakeContext::class, 'call'];
    $u->make_options = [NextbikeMakeOptions::class, 'call'];
    $u->make_request = [NextbikeMakeRequest::class, 'call'];
    $u->make_response = [NextbikeMakeResponse::class, 'call'];
    $u->make_result = [NextbikeMakeResult::class, 'call'];
    $u->make_point = [NextbikeMakePoint::class, 'call'];
    $u->make_spec = [NextbikeMakeSpec::class, 'call'];
    $u->make_url = [NextbikeMakeUrl::class, 'call'];
    $u->param = [NextbikeParam::class, 'call'];
    $u->prepare_auth = [NextbikePrepareAuth::class, 'call'];
    $u->prepare_body = [NextbikePrepareBody::class, 'call'];
    $u->prepare_headers = [NextbikePrepareHeaders::class, 'call'];
    $u->prepare_method = [NextbikePrepareMethod::class, 'call'];
    $u->prepare_params = [NextbikePrepareParams::class, 'call'];
    $u->prepare_path = [NextbikePreparePath::class, 'call'];
    $u->prepare_query = [NextbikePrepareQuery::class, 'call'];
    $u->result_basic = [NextbikeResultBasic::class, 'call'];
    $u->result_body = [NextbikeResultBody::class, 'call'];
    $u->result_headers = [NextbikeResultHeaders::class, 'call'];
    $u->transform_request = [NextbikeTransformRequest::class, 'call'];
    $u->transform_response = [NextbikeTransformResponse::class, 'call'];
});
