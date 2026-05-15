<?php
declare(strict_types=1);

// Nextbike SDK utility: feature_add

class NextbikeFeatureAdd
{
    public static function call(NextbikeContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
