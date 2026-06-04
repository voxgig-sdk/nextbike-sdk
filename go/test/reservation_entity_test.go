package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/nextbike-sdk/go"
	"github.com/voxgig-sdk/nextbike-sdk/go/core"

	vs "github.com/voxgig-sdk/nextbike-sdk/go/utility/struct"
)

func TestReservationEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Reservation(nil)
		if ent == nil {
			t.Fatal("expected non-nil ReservationEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := reservationBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"create"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "reservation." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set NEXTBIKE_TEST_RESERVATION_ENTID JSON to run live")
			return
		}
		client := setup.client

		// CREATE
		reservationRef01Ent := client.Reservation(nil)
		reservationRef01Data := core.ToMapAny(vs.GetProp(
			vs.GetPath([]any{"new", "reservation"}, setup.data), "reservation_ref01"))

		reservationRef01DataResult, err := reservationRef01Ent.Create(reservationRef01Data, nil)
		if err != nil {
			t.Fatalf("create failed: %v", err)
		}
		reservationRef01Data = core.ToMapAny(reservationRef01DataResult)
		if reservationRef01Data == nil {
			t.Fatal("expected create result to be a map")
		}

	})
}

func reservationBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "reservation", "ReservationTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read reservation test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse reservation test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"reservation01", "reservation02", "reservation03"},
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
	entidEnvRaw := os.Getenv("NEXTBIKE_TEST_RESERVATION_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"NEXTBIKE_TEST_RESERVATION_ENTID": idmap,
		"NEXTBIKE_TEST_LIVE":      "FALSE",
		"NEXTBIKE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["NEXTBIKE_TEST_RESERVATION_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["NEXTBIKE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
			},
			extra,
		})
		client = sdk.NewNextbikeSDK(core.ToMapAny(mergedOpts))
	}

	live := env["NEXTBIKE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["NEXTBIKE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
