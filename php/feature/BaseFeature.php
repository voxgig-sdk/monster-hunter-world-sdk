<?php
declare(strict_types=1);

// MonsterHunterWorld SDK base feature

class MonsterHunterWorldBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(MonsterHunterWorldContext $ctx, array $options): void {}
    public function PostConstruct(MonsterHunterWorldContext $ctx): void {}
    public function PostConstructEntity(MonsterHunterWorldContext $ctx): void {}
    public function SetData(MonsterHunterWorldContext $ctx): void {}
    public function GetData(MonsterHunterWorldContext $ctx): void {}
    public function GetMatch(MonsterHunterWorldContext $ctx): void {}
    public function SetMatch(MonsterHunterWorldContext $ctx): void {}
    public function PrePoint(MonsterHunterWorldContext $ctx): void {}
    public function PreSpec(MonsterHunterWorldContext $ctx): void {}
    public function PreRequest(MonsterHunterWorldContext $ctx): void {}
    public function PreResponse(MonsterHunterWorldContext $ctx): void {}
    public function PreResult(MonsterHunterWorldContext $ctx): void {}
    public function PreDone(MonsterHunterWorldContext $ctx): void {}
    public function PreUnexpected(MonsterHunterWorldContext $ctx): void {}
}
