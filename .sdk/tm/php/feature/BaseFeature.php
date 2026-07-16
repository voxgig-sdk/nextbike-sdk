<?php
declare(strict_types=1);

// Nextbike SDK base feature

class NextbikeBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(NextbikeContext $ctx, array $options): void {}
    public function PostConstruct(NextbikeContext $ctx): void {}
    public function PostConstructEntity(NextbikeContext $ctx): void {}
    public function SetData(NextbikeContext $ctx): void {}
    public function GetData(NextbikeContext $ctx): void {}
    public function GetMatch(NextbikeContext $ctx): void {}
    public function SetMatch(NextbikeContext $ctx): void {}
    public function PrePoint(NextbikeContext $ctx): void {}
    public function PreSpec(NextbikeContext $ctx): void {}
    public function PreRequest(NextbikeContext $ctx): void {}
    public function PreResponse(NextbikeContext $ctx): void {}
    public function PreResult(NextbikeContext $ctx): void {}
    public function PreDone(NextbikeContext $ctx): void {}
    public function PreUnexpected(NextbikeContext $ctx): void {}
}
