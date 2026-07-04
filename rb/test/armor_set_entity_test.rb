# ArmorSet entity test

require "minitest/autorun"
require "json"
require_relative "../MonsterHunterWorld_sdk"
require_relative "runner"

class ArmorSetEntityTest < Minitest::Test
  def test_create_instance
    testsdk = MonsterHunterWorldSDK.test(nil, nil)
    ent = testsdk.ArmorSet(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = armor_set_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "armor_set." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set MONSTERHUNTERWORLD_TEST_ARMOR_SET_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    armor_set_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.armor_set")))
    armor_set_ref01_data = nil
    if armor_set_ref01_data_raw.length > 0
      armor_set_ref01_data = Helpers.to_map(armor_set_ref01_data_raw[0][1])
    end

    # LIST
    armor_set_ref01_ent = client.ArmorSet(nil)
    armor_set_ref01_match = {}

    armor_set_ref01_list_result = armor_set_ref01_ent.list(armor_set_ref01_match, nil)
    assert armor_set_ref01_list_result.is_a?(Array)

    # LOAD
    armor_set_ref01_match_dt0 = {
      "id" => armor_set_ref01_data["id"],
    }
    armor_set_ref01_data_dt0_loaded = armor_set_ref01_ent.load(armor_set_ref01_match_dt0, nil)
    armor_set_ref01_data_dt0_load_result = Helpers.to_map(armor_set_ref01_data_dt0_loaded)
    assert !armor_set_ref01_data_dt0_load_result.nil?
    assert_equal armor_set_ref01_data_dt0_load_result["id"], armor_set_ref01_data["id"]

  end
end

def armor_set_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "armor_set", "ArmorSetTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = MonsterHunterWorldSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["armor_set01", "armor_set02", "armor_set03"],
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
  entid_env_raw = ENV["MONSTERHUNTERWORLD_TEST_ARMOR_SET_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "MONSTERHUNTERWORLD_TEST_ARMOR_SET_ENTID" => idmap,
    "MONSTERHUNTERWORLD_TEST_LIVE" => "FALSE",
    "MONSTERHUNTERWORLD_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["MONSTERHUNTERWORLD_TEST_ARMOR_SET_ENTID"])
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
