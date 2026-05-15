<?php
declare(strict_types=1);

// Nextbike SDK utility: prepare_body

class NextbikePrepareBody
{
    public static function call(NextbikeContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
