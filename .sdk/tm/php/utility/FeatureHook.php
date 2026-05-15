<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: feature_hook

class MonsterHunterWorldFeatureHook
{
    public static function call(MonsterHunterWorldContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
