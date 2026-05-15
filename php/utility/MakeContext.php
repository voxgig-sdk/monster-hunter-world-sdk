<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class MonsterHunterWorldMakeContext
{
    public static function call(array $ctxmap, ?MonsterHunterWorldContext $basectx): MonsterHunterWorldContext
    {
        return new MonsterHunterWorldContext($ctxmap, $basectx);
    }
}
