<?php
declare(strict_types=1);

// Nextbike SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class NextbikeMakeContext
{
    public static function call(array $ctxmap, ?NextbikeContext $basectx): NextbikeContext
    {
        return new NextbikeContext($ctxmap, $basectx);
    }
}
