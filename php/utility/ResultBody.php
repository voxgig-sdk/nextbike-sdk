<?php
declare(strict_types=1);

// Nextbike SDK utility: result_body

class NextbikeResultBody
{
    public static function call(NextbikeContext $ctx): ?NextbikeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
