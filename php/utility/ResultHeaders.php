<?php
declare(strict_types=1);

// Nextbike SDK utility: result_headers

class NextbikeResultHeaders
{
    public static function call(NextbikeContext $ctx): ?NextbikeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
