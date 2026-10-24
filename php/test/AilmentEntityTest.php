<?php
declare(strict_types=1);

// Ailment entity test

require_once __DIR__ . '/../monsterhunterworld_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class AilmentEntityTestFailHook extends MonsterHunterWorldBaseFeature
{
    public int $unexpected = 0;

    public function __construct()
    {
        parent::__construct();
        $this->name = 'failhook';
    }

    public function init(MonsterHunterWorldContext $ctx, array $options): void
    {
    }

    public function PreSpec(MonsterHunterWorldContext $ctx): void
    {
        throw new \RuntimeException('ailment hook failed');
    }

    public function PreUnexpected(MonsterHunterWorldContext $ctx): void
    {
        $this->unexpected++;
    }
}

class AilmentEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = MonsterHunterWorldSDK::test(null, null);
        $ent = $testsdk->Ailment(null);
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
                "ailment" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = MonsterHunterWorldSDK::test($seed, null);
        $seen = iterator_to_array($base->Ailment(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = MonsterHunterWorldConfig::shared_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = MonsterHunterWorldSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Ailment(null)->stream("list", null, null) as $item) {
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

    public function test_stream_error(): void
    {
        $offline = ["net" => ["offline" => true]];
        $streamerr = null;
        try {
            iterator_to_array(MonsterHunterWorldSDK::test($offline, null)->Ailment(null)
                ->stream("list", null, null), false);
        } catch (\Throwable $e) {
            $streamerr = $e;
        }
        $this->assertNotNull($streamerr, 'the stream should raise the transport failure');
        $this->assertStringContainsString('offline', $streamerr->getMessage());

        iterator_to_array(MonsterHunterWorldSDK::test($offline, null)->Ailment(null)
            ->stream("list", null, ["ctrl" => ["throw" => false]]), false);

        $cfg = MonsterHunterWorldConfig::shared_config();
        if (isset($cfg["feature"]["rbac"])) {
            $denied = MonsterHunterWorldSDK::test(null, ["feature" => ["rbac" => ["active" => true, "deny" => true]]]);
            $denyerr = null;
            try {
                iterator_to_array($denied->Ailment(null)->stream("list", null, null), false);
            } catch (\Throwable $e) {
                $denyerr = $e;
            }
            $this->assertSame('rbac_denied', $denyerr->sdk_code ?? null);
        }
    }

    public function test_stream_ctrl(): void
    {
        $ctrl = ["explain" => []];
        iterator_to_array(MonsterHunterWorldSDK::test(null, null)->Ailment(null)
            ->stream("list", null, ["ctrl" => $ctrl]), false);
        $this->assertSame(["explain"], array_keys($ctrl));
    }

    public function test_unexpected(): void
    {
        $hook = new AilmentEntityTestFailHook();
        $client = new MonsterHunterWorldSDK(["feature" => ["test" => ["active" => true]], "extend" => [$hook]]);

        $err = null;
        try {
            $client->Ailment(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertNotNull($err, 'the throwing hook should fail the operation');
        $this->assertStringContainsString('hook failed', $err->getMessage());
        $this->assertGreaterThan(0, $hook->unexpected, 'PreUnexpected did not fire');

        $fired = $hook->unexpected;
        $this->assertNull($client->Ailment(null)->list(null, ["throw" => false]));
        $this->assertGreaterThan($fired, $hook->unexpected, 'PreUnexpected did not fire');
    }

    public function test_cost_commits_a_throwing_transport(): void
    {
        $cfg = MonsterHunterWorldConfig::shared_config();
        if (!isset($cfg["feature"]["cost"])) {
            $this->markTestSkipped('feature not present in this SDK: cost');
        }
        $client = new MonsterHunterWorldSDK([
            "test" => ["active" => true],
            "feature" => ["cost" => ["active" => true, "unit" => 1]],
            "utility" => ["fetcher" => function ($ctx, $url, $fetchdef) {
                throw new \RuntimeException('ailment transport failed');
            }],
        ]);

        $err = null;
        try {
            $client->Ailment(null)->list(null, null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertInstanceOf(MonsterHunterWorldError::class, $err);
        $this->assertStringContainsString('transport failed', $err->getMessage());

        $client->Ailment(null)->list(null, ["throw" => false]);
        $this->assertSame(2, $client->_cost["total"]["calls"]);
        $this->assertSame(2, $client->_cost["total"]["attempts"]);
    }

    public function test_validate(): void
    {
        $cfg = MonsterHunterWorldConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = MonsterHunterWorldSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->Ailment(null)->list(["p" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
    }

    public function test_basic_flow(): void
    {
        $setup = ailment_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "ailment." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        $client = $setup["client"];
        if (!empty($setup["live"])) {
            Runner::live_existing($setup, self::LIVE_STRICT, "ailment",
                fn() => $client->Ailment(null)->list([], null));
        }

        // Bootstrap entity data from existing test data.
        $ailment_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.ailment")));
        $ailment_ref01_data = null;
        if (count($ailment_ref01_data_raw) > 0) {
            $ailment_ref01_data = Helpers::to_map($ailment_ref01_data_raw[0][1]);
        }

        // LIST
        $ailment_ref01_ent = $client->Ailment(null);
        $ailment_ref01_match = [];

        $ailment_ref01_list_result = $ailment_ref01_ent->list($ailment_ref01_match, null);
        $this->assertIsArray($ailment_ref01_list_result);

        // LOAD
        $ailment_ref01_match_dt0 = [
            "id" => $ailment_ref01_data["id"],
        ];
        $ailment_ref01_data_dt0_loaded = $ailment_ref01_ent->load($ailment_ref01_match_dt0, null);
        $ailment_ref01_data_dt0_load_result = Helpers::to_map(is_object($ailment_ref01_data_dt0_loaded) && method_exists($ailment_ref01_data_dt0_loaded, 'data_get') ? $ailment_ref01_data_dt0_loaded->data_get() : $ailment_ref01_data_dt0_loaded);
        $this->assertNotNull($ailment_ref01_data_dt0_load_result);
        $this->assertEquals($ailment_ref01_data_dt0_load_result["id"], $ailment_ref01_data["id"]);

    }
}

function ailment_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/ailment/AilmentTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = MonsterHunterWorldSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["ailment01", "ailment02", "ailment03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID" => $idmap,
        "MONSTER_HUNTER_WORLD_TEST_LIVE" => "FALSE",
        "MONSTER_HUNTER_WORLD_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["MONSTER_HUNTER_WORLD_TEST_AILMENT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["MONSTER_HUNTER_WORLD_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new MonsterHunterWorldSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["MONSTER_HUNTER_WORLD_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["MONSTER_HUNTER_WORLD_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
