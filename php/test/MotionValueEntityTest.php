<?php
declare(strict_types=1);

// MotionValue entity test

require_once __DIR__ . '/../monsterhunterworld_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class MotionValueEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MonsterHunterWorldSDK::test(null, null);
        $ent = $testsdk->MotionValue(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "motion_value" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = MonsterHunterWorldSDK::test($seed, null);
        $seen = iterator_to_array($base->MotionValue(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = MonsterHunterWorldConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = MonsterHunterWorldSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->MotionValue(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = motion_value_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "motion_value." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MONSTERHUNTERWORLD_TEST_MOTION_VALUE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $motion_value_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.motion_value")));
        $motion_value_ref01_data = null;
        if (count($motion_value_ref01_data_raw) > 0) {
            $motion_value_ref01_data = Helpers::to_map($motion_value_ref01_data_raw[0][1]);
        }

        // LIST
        $motion_value_ref01_ent = $client->MotionValue(null);
        $motion_value_ref01_match = [];

        $motion_value_ref01_list_result = $motion_value_ref01_ent->list($motion_value_ref01_match, null);
        $this->assertIsArray($motion_value_ref01_list_result);

        // LOAD
        $motion_value_ref01_match_dt0 = [
            "id" => $motion_value_ref01_data["id"],
        ];
        $motion_value_ref01_data_dt0_loaded = $motion_value_ref01_ent->load($motion_value_ref01_match_dt0, null);
        $motion_value_ref01_data_dt0_load_result = Helpers::to_map($motion_value_ref01_data_dt0_loaded);
        $this->assertNotNull($motion_value_ref01_data_dt0_load_result);
        $this->assertEquals($motion_value_ref01_data_dt0_load_result["id"], $motion_value_ref01_data["id"]);

    }
}

function motion_value_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/motion_value/MotionValueTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MonsterHunterWorldSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["motion_value01", "motion_value02", "motion_value03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MONSTERHUNTERWORLD_TEST_MOTION_VALUE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MONSTERHUNTERWORLD_TEST_MOTION_VALUE_ENTID" => $idmap,
        "MONSTERHUNTERWORLD_TEST_LIVE" => "FALSE",
        "MONSTERHUNTERWORLD_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MONSTERHUNTERWORLD_TEST_MOTION_VALUE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MONSTERHUNTERWORLD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new MonsterHunterWorldSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["MONSTERHUNTERWORLD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MONSTERHUNTERWORLD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
