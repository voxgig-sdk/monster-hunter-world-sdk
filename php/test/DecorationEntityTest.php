<?php
declare(strict_types=1);

// Decoration entity test

require_once __DIR__ . '/../monsterhunterworld_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class DecorationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = MonsterHunterWorldSDK::test(null, null);
        $ent = $testsdk->Decoration(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = decoration_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "decoration." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set MONSTERHUNTERWORLD_TEST_DECORATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $decoration_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.decoration")));
        $decoration_ref01_data = null;
        if (count($decoration_ref01_data_raw) > 0) {
            $decoration_ref01_data = Helpers::to_map($decoration_ref01_data_raw[0][1]);
        }

        // LIST
        $decoration_ref01_ent = $client->Decoration(null);
        $decoration_ref01_match = [];

        $decoration_ref01_list_result = $decoration_ref01_ent->list($decoration_ref01_match, null);
        $this->assertIsArray($decoration_ref01_list_result);

        // LOAD
        $decoration_ref01_match_dt0 = [
            "id" => $decoration_ref01_data["id"],
        ];
        $decoration_ref01_data_dt0_loaded = $decoration_ref01_ent->load($decoration_ref01_match_dt0, null);
        $decoration_ref01_data_dt0_load_result = Helpers::to_map($decoration_ref01_data_dt0_loaded);
        $this->assertNotNull($decoration_ref01_data_dt0_load_result);
        $this->assertEquals($decoration_ref01_data_dt0_load_result["id"], $decoration_ref01_data["id"]);

    }
}

function decoration_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/decoration/DecorationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MonsterHunterWorldSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["decoration01", "decoration02", "decoration03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("MONSTERHUNTERWORLD_TEST_DECORATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MONSTERHUNTERWORLD_TEST_DECORATION_ENTID" => $idmap,
        "MONSTERHUNTERWORLD_TEST_LIVE" => "FALSE",
        "MONSTERHUNTERWORLD_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MONSTERHUNTERWORLD_TEST_DECORATION_ENTID"]);
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
