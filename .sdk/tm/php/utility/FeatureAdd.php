<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: feature_add

class MonsterHunterWorldFeatureAdd
{
    public static function call(MonsterHunterWorldContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
