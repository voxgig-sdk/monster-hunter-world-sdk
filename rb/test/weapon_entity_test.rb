# Weapon entity test

require "minitest/autorun"
require "json"
require_relative "../MonsterHunterWorld_sdk"
require_relative "runner"

class WeaponEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MonsterHunterWorldSDK.test(nil, nil)
    ent = testsdk.Weapon(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = weapon_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "weapon." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MONSTERHUNTERWORLD_TEST_WEAPON_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    weapon_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.weapon")))
    weapon_ref01_data = nil
    if weapon_ref01_data_raw.length > 0
      weapon_ref01_data = Helpers.to_map(weapon_ref01_data_raw[0][1])
    end

    # LIST
    weapon_ref01_ent = client.Weapon(nil)
    weapon_ref01_match = {}

    weapon_ref01_list_result = weapon_ref01_ent.list(weapon_ref01_match, nil)
    assert weapon_ref01_list_result.is_a?(Array)

    # LOAD
    weapon_ref01_match_dt0 = {
      "id" => weapon_ref01_data["id"],
    }
    weapon_ref01_data_dt0_loaded = weapon_ref01_ent.load(weapon_ref01_match_dt0, nil)
    weapon_ref01_data_dt0_load_result = Helpers.to_map(weapon_ref01_data_dt0_loaded)
    assert !weapon_ref01_data_dt0_load_result.nil?
    assert_equal weapon_ref01_data_dt0_load_result["id"], weapon_ref01_data["id"]

  end
end

def weapon_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "weapon", "WeaponTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MonsterHunterWorldSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["weapon01", "weapon02", "weapon03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["MONSTERHUNTERWORLD_TEST_WEAPON_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MONSTERHUNTERWORLD_TEST_WEAPON_ENTID" => idmap,
    "MONSTERHUNTERWORLD_TEST_LIVE" => "FALSE",
    "MONSTERHUNTERWORLD_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["MONSTERHUNTERWORLD_TEST_WEAPON_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["MONSTERHUNTERWORLD_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = MonsterHunterWorldSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["MONSTERHUNTERWORLD_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["MONSTERHUNTERWORLD_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
