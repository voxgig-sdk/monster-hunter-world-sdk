# Ailment entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from monsterhunterworld_sdk import MonsterHunterWorldSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestAilmentEntity:

    def test_should_create_instance(self):
        testsdk = MonsterHunterWorldSDK.test(None, None)
        ent = testsdk.Ailment(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _ailment_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "ailment." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set MONSTERHUNTERWORLD_TEST_AILMENT_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        ailment_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.ailment")))
        ailment_ref01_data = None
        if len(ailment_ref01_data_raw) > 0:
            ailment_ref01_data = helpers.to_map(ailment_ref01_data_raw[0][1])

        # LIST
        ailment_ref01_ent = client.Ailment(None)
        ailment_ref01_match = {}

        ailment_ref01_list_result, err = ailment_ref01_ent.list(ailment_ref01_match, None)
        assert err is None
        assert isinstance(ailment_ref01_list_result, list)

        # LOAD
        ailment_ref01_match_dt0 = {
            "id": ailment_ref01_data["id"],
        }
        ailment_ref01_data_dt0_loaded, err = ailment_ref01_ent.load(ailment_ref01_match_dt0, None)
        assert err is None
        ailment_ref01_data_dt0_load_result = helpers.to_map(ailment_ref01_data_dt0_loaded)
        assert ailment_ref01_data_dt0_load_result is not None
        assert ailment_ref01_data_dt0_load_result["id"] == ailment_ref01_data["id"]



def _ailment_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/ailment/AilmentTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = MonsterHunterWorldSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["ailment01", "ailment02", "ailment03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "MONSTERHUNTERWORLD_TEST_AILMENT_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "MONSTERHUNTERWORLD_TEST_AILMENT_ENTID": idmap,
        "MONSTERHUNTERWORLD_TEST_LIVE": "FALSE",
        "MONSTERHUNTERWORLD_TEST_EXPLAIN": "FALSE",
        "MONSTERHUNTERWORLD_APIKEY": "NONE",
    })

    idmap_resolved = helpers.to_map(
        env.get("MONSTERHUNTERWORLD_TEST_AILMENT_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("MONSTERHUNTERWORLD_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
                "apikey": env.get("MONSTERHUNTERWORLD_APIKEY"),
            },
            extra or {},
        ])
        client = MonsterHunterWorldSDK(helpers.to_map(merged_opts))

    _live = env.get("MONSTERHUNTERWORLD_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("MONSTERHUNTERWORLD_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
