<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: result_body

class MonsterHunterWorldResultBody
{
    public static function call(MonsterHunterWorldContext $ctx): ?MonsterHunterWorldResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
