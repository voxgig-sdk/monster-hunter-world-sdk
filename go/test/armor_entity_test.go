package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/monster-hunter-world-sdk/go"
	"github.com/voxgig-sdk/monster-hunter-world-sdk/go/core"

	vs "github.com/voxgig-sdk/monster-hunter-world-sdk/go/utility/struct"
)

func TestArmorEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Armor(nil)
		if ent == nil {
			t.Fatal("expected non-nil ArmorEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := armorBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "armor." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MONSTERHUNTERWORLD_TEST_ARMOR_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		armorRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.armor", setup.data)))
		var armorRef01Data map[string]any
		if len(armorRef01DataRaw) > 0 {
			armorRef01Data = core.ToMapAny(armorRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = armorRef01Data

		// LIST
		armorRef01Ent := client.Armor(nil)
		armorRef01Match := map[string]any{}

		armorRef01ListResult, err := armorRef01Ent.List(armorRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, armorRef01ListOk := armorRef01ListResult.([]any)
		if !armorRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", armorRef01ListResult)
		}

		// LOAD
		armorRef01MatchDt0 := map[string]any{
			"id": armorRef01Data["id"],
		}
		armorRef01DataDt0Loaded, err := armorRef01Ent.Load(armorRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		armorRef01DataDt0LoadResult := core.ToMapAny(armorRef01DataDt0Loaded)
		if armorRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if armorRef01DataDt0LoadResult["id"] != armorRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func armorBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "armor", "ArmorTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read armor test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse armor test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"armor01", "armor02", "armor03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MONSTERHUNTERWORLD_TEST_ARMOR_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MONSTERHUNTERWORLD_TEST_ARMOR_ENTID": idmap,
		"MONSTERHUNTERWORLD_TEST_LIVE":      "FALSE",
		"MONSTERHUNTERWORLD_TEST_EXPLAIN":   "FALSE",
		"MONSTERHUNTERWORLD_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["MONSTERHUNTERWORLD_TEST_ARMOR_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MONSTERHUNTERWORLD_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["MONSTERHUNTERWORLD_APIKEY"],
			},
			extra,
		})
		client = sdk.NewMonsterHunterWorldSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MONSTERHUNTERWORLD_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MONSTERHUNTERWORLD_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
