<?php
declare(strict_types=1);

// Nextbike SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class NextbikeFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new NextbikeBaseFeature();
            case "test":
                return new NextbikeTestFeature();
            default:
                return new NextbikeBaseFeature();
        }
    }
}
