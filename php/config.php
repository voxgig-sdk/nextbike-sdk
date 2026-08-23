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
                "slug" => "nextbike",
                "version" => "0.0.1",
                "target" => "php",
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
              'short' => 'Country code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'short' => 'Full country name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'domain',
              'short' => 'Country domain',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'hotline',
              'short' => 'Support hotline number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lat',
              'short' => 'Country center latitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'lng',
              'short' => 'Country center longitude',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'name',
              'short' => 'Country name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'policy',
              'short' => 'Privacy policy URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'terms',
              'short' => 'Terms and conditions URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'website',
              'short' => 'Website URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'zoom',
              'short' => 'Default zoom level',
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
              'short' => 'Reserved bike number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'short' => 'Reservation expiration time',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reservation_id',
              'short' => 'Unique reservation identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'station_id',
              'short' => 'Station identifier',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'status',
              'short' => 'Reservation status',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'unlock_code',
              'short' => 'Code to unlock the bike',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'user_id',
              'req' => true,
              'short' => 'User identifier',
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
              'short' => 'Reserved bike number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'created_at',
              'short' => 'Reservation creation time',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'expires_at',
              'short' => 'Reservation expiration time',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'reservation_id',
              'short' => 'Reservation identifier',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'status',
              'short' => 'Current reservation status',
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
