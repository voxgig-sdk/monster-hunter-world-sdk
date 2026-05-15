<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: prepare_body

class MonsterHunterWorldPrepareBody
{
    public static function call(MonsterHunterWorldContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
