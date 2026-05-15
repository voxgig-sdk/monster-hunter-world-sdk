<?php
declare(strict_types=1);

// MonsterHunterWorld SDK utility: result_headers

class MonsterHunterWorldResultHeaders
{
    public static function call(MonsterHunterWorldContext $ctx): ?MonsterHunterWorldResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
