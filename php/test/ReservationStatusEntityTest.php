<?php
declare(strict_types=1);

// ReservationStatus entity test

require_once __DIR__ . '/../nextbike_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class ReservationStatusEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = NextbikeSDK::test(null, null);
        $ent = $testsdk->ReservationStatus(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = reservation_status_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "reservation_status." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set NEXTBIKE_TEST_RESERVATION_STATUS_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $reservation_status_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.reservation_status")));
        $reservation_status_ref01_data = null;
        if (count($reservation_status_ref01_data_raw) > 0) {
            $reservation_status_ref01_data = Helpers::to_map($reservation_status_ref01_data_raw[0][1]);
        }

        // LOAD
        $reservation_status_ref01_ent = $client->ReservationStatus(null);
        $reservation_status_ref01_match_dt0 = [];
        $reservation_status_ref01_data_dt0_loaded = $reservation_status_ref01_ent->load($reservation_status_ref01_match_dt0, null);
        $this->assertNotNull($reservation_status_ref01_data_dt0_loaded);

    }
}

function reservation_status_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/reservation_status/ReservationStatusTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = NextbikeSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["reservation_status01", "reservation_status02", "reservation_status03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("NEXTBIKE_TEST_RESERVATION_STATUS_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "NEXTBIKE_TEST_RESERVATION_STATUS_ENTID" => $idmap,
        "NEXTBIKE_TEST_LIVE" => "FALSE",
        "NEXTBIKE_TEST_EXPLAIN" => "FALSE",
        "NEXTBIKE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["NEXTBIKE_TEST_RESERVATION_STATUS_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["NEXTBIKE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["NEXTBIKE_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new NextbikeSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["NEXTBIKE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["NEXTBIKE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
