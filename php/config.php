<?php
declare(strict_types=1);

// Nextbike SDK configuration

class NextbikeConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Nextbike",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.nextbike.net",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "live_data" => [],
                    "public" => [],
                    "reservation" => [],
                    "reservation_status" => [],
                ],
            ],
            "entity" => [
        'live_data' => [
          'fields' => [
            [
              'name' => 'cities',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'country',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hotline',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lat',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'lng',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'policy',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'terms',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'zoom',
              'type' => '`$INTEGER`',
            ],
          ],
          'name' => 'live_data',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 5000,
                        'kind' => 'query',
                        'name' => 'distance',
                        'orig' => 'distance',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lng',
                        'orig' => 'lng',
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/maps/nextbike-live.json',
                  'parts' => [
                    'maps',
                    'nextbike-live.json',
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'distance',
                      'lat',
                      'lng',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.countries`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'public' => [
          'fields' => [],
          'name' => 'public',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'city',
                        'orig' => 'city',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 5000,
                        'kind' => 'query',
                        'name' => 'distance',
                        'orig' => 'distance',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'lng',
                        'orig' => 'lng',
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/maps/nextbike-live.xml',
                  'parts' => [
                    'maps',
                    'nextbike-live.xml',
                  ],
                  'select' => [
                    'exist' => [
                      'city',
                      'distance',
                      'lat',
                      'lng',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'reservation' => [
          'fields' => [
            [
              'name' => 'bike_number',
              'op' => [
                'create' => [
                  'req' => true,
                  'type' => '`$STRING`',
                ],
              ],
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reservation_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'station_id',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unlock_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'user_id',
              'req' => true,
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'reservation',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/reservation/reserve',
                  'parts' => [
                    'reservation',
                    'reserve',
                  ],
                  'select' => [
                    '$action' => 'reserve',
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'reservation_status' => [
          'fields' => [
            [
              'name' => 'bike_number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reservation_id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'reservation_status',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'reservation_id',
                        'orig' => 'reservation_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/reservation/status',
                  'parts' => [
                    'reservation',
                    'status',
                  ],
                  'select' => [
                    'exist' => [
                      'reservation_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return NextbikeFeatures::make_feature($name);
    }
}
