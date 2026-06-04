# LiveData entity test

require "minitest/autorun"
require "json"
require_relative "../Nextbike_sdk"
require_relative "runner"

class LiveDataEntityTest < Minitest::Test
  def test_create_instance
    testsdk = NextbikeSDK.test(nil, nil)
    ent = testsdk.LiveData(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = live_data_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "live_data." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set NEXTBIKE_TEST_LIVE_DATA_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    live_data_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.live_data")))
    live_data_ref01_data = nil
    if live_data_ref01_data_raw.length > 0
      live_data_ref01_data = Helpers.to_map(live_data_ref01_data_raw[0][1])
    end

    # LIST
    live_data_ref01_ent = client.LiveData(nil)
    live_data_ref01_match = {}

    live_data_ref01_list_result, err = live_data_ref01_ent.list(live_data_ref01_match, nil)
    assert_nil err
    assert live_data_ref01_list_result.is_a?(Array)

  end
end

def live_data_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "live_data", "LiveDataTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = NextbikeSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["live_data01", "live_data02", "live_data03"],
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
  entid_env_raw = ENV["NEXTBIKE_TEST_LIVE_DATA_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "NEXTBIKE_TEST_LIVE_DATA_ENTID" => idmap,
    "NEXTBIKE_TEST_LIVE" => "FALSE",
    "NEXTBIKE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["NEXTBIKE_TEST_LIVE_DATA_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["NEXTBIKE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = NextbikeSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["NEXTBIKE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["NEXTBIKE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
