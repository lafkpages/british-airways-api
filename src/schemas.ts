import {
  array,
  boolean,
  isoTimestamp,
  literal,
  looseObject,
  nullish,
  number,
  objectWithRest,
  partial,
  picklist,
  pipe,
  record,
  string,
  union,
  unknown,
} from "valibot";

// Common schemas
const timestamp = number();
const userSchema = partial(
  looseObject({
    $$type: literal("User"),
    /**
     * Seems like the identity is sometimes just `${firstName}.${lastName}`.
     */
    identity: string(),
    username: string(),
    firstName: string(),
    lastName: string(),
  })
);

// API call schemas

export const manufacturerConfigSchema = partial(
  looseObject({
    manufacturer: string(),
    emulator: string(),
    provisioningService: string(),
    wispUrl: string(),
    opco: string(),
    deployEnvironment: string(),
  })
);

export const flightInformationSchema = partial(
  looseObject({
    actualArrivalTime: nullish(string()),
    actualDepartureTime: nullish(string()),
    aircraftType: string(),
    altitude: number(),
    arrivalTimezoneOffsetHrs: union([number(), string()]),
    connectionStatus: string(),
    departureTimezoneOffsetHrs: union([number(), string()]),
    destinationIATA: string(),
    destinationICAO: string(),
    destinationName: nullish(string()),
    distanceToDestination: unknown(),
    estimatedArrivalTime: string(),
    flightNumber: string(),
    flightNumberEndingNumber: string(),
    flightOpen: unknown(),
    flightRoute: unknown(),
    groundSpeed: number(),
    icao: string(),
    internetStatus: string(),
    isatConnectionStatus: nullish(string()),
    isatInternetStatus: nullish(string()),
    originName: nullish(string()),
    originIATA: string(),
    originICAO: string(),
    outsideAirTemperature: nullish(number()),
    phase: unknown(),
    scheduledDepartureTime: nullish(string()),
    state: string(),
    tailNumber: string(),
    takeoffDateTime: nullish(string()),
    timeAtDestination: unknown(),
    timeAtOrigin: unknown(),
    timeToDestinationMinutes: number(),
    totalFlightTimeMinutes: number(),
    routeTags: array(unknown()),
    trueHeading: nullish(number()),
    weightOnWheels: boolean(),
    windDirection: nullish(number()),
    windSpeed: nullish(number()),
    restrictedInternet: boolean(),
    latitude: nullish(unknown()),
    longitude: nullish(unknown()),
  })
);

export const portalConfigSchema = partial(
  looseObject({
    groundServiceBasePath: string(),
    airServiceBasePath: string(),
    title: string(),
    iconPath: string(),
    enableEntitlements: boolean(),
    auth0: partial(
      looseObject({
        clientId: string(),
        domain: string(),
      })
    ),
    applePayMerchantId: string(),
  })
);

export const deviceInfoSchema = partial(
  looseObject({
    HTTPHeaders: objectWithRest(
      {
        Host: string(), // literal("localhost:8054"),
        "X-Forwarded-For": string(),
      },
      string()
    ),
    additional_content:
      // '{"orderKey":"32-char-hex-a","orderItemKey":"32-char-hex-b","planId":"uuid-a","deviceId":"uuid-b"}\r\n',
      string(),

    /**
     * Same as the `X-Forwarded-For` header in `HTTPHeaders`.
     */
    ip: string(),
    mac: string(),
    mac_updated_at: string(), // "2025-08-03 09:59:42.572282",
    status: string(), // "transparent",
    status_reason: string(),
    user_agent: string(),
    wait_updated_at: string(),
  })
);

export const wifiInventorySchema = partial(
  looseObject({
    paused: boolean(),
    $$type: literal("FLIGHT_INVENTORY"),
    key: string(),
    status: string(),
    standardCatalogue: string(),
    flightOpenedBy: userSchema,
    modified: string(),
    created: string(),
    flightOrigin: string(),
    flightDestination: string(),
    tailNumber: string(),
    inventoryState: array(
      partial(
        looseObject({
          type: string(),
          status: string(),
          paused: boolean(),
          closing: boolean(),
        })
      )
    ),
    source: string(),
    closing: boolean(),
    aviosRate: number(),
    meta: partial(
      looseObject({
        revision: number(),
        created: number(),
        version: number(),
      })
    ),
    $loki: number(),
    flightInformation: flightInformationSchema,
    type: literal("WIFI"),
  })
);

export const apiVersionSchema = partial(
  looseObject({
    version: string(),
    createdAt: pipe(string(), isoTimestamp()),
  })
);

export const registerDeviceSchema = partial(
  looseObject({
    deviceToken: string(),
  })
);

export const internetProvisionSchema = partial(
  looseObject({
    $$type: literal("InternetProvision"),
    key: string(),
    user: userSchema,
    orderKey: string(),
    orderItemKey: string(),
    /**
     * JWT with a payload as follows:
     *
     * ```js
     * const payloadSchema = partial(looseObject({
     *  macAddress: string(),
     * }));
     * ```
     *
     * The contained MAC address is the same as `sessionInfo[?].userMac`.
     */
    deviceToken: string(),
    /**
     * Format: `XXX--xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx--SSSS--sss`.
     *
     * The 32-char hex string of x's here is the `orderItemKey`.
     * `SSSS` is the same as `sessionInfo[?].serviceType`.
     * `sss` is similar to the service type fields (eg. STRM and free_strm, not identical).
     */
    provisionedUsername: string(),
    serviceType: string(),
    packageTitles: partial(
      looseObject({
        sku: string(),
        /**
         * Translations, eg.:
         *
         * ```json
         * {
         *  "en_GB": "Flight pass",
         *  "es_ES": "Todo el vuelo"
         * }
         * ```
         */
        itemTitles: record(string(), string()),
        /**
         * Translations, eg.:
         *
         * ```json
         * {
         *  "en_GB": "Browse and stream",
         *  "es_ES": "Navegar y streaming"
         * }
         * ```
         */
        categoryTitles: record(string(), string()),
      })
    ),
    wispPackageType: string(),
    isFullFlightPackage: boolean(),
    allowedSessionTimeSecs: boolean(),
    sessionInfo: array(
      partial(
        looseObject({
          /**
           * This is the IP address of the device connected to the BAWi-Fi network. Probably always on the `172.x.x.x` range.
           */
          ipAddress: string(),
          state: picklist([
            // See Webpack chunk main.4984681737748e4f, ESM module 93648
            "ACTIVE",
            "CLOSED",
            "EXPIRED",
            "INACTIVE",
            "IP_RELEASED",
            "NEW",
            "PAUSED",
            "SUBSCRIBED",
            "UNKNOWN",
            "WHITELISTED",
          ]),
          nattedIpAddress: string(),
          vlanName: string(),
          inBytes: number(),
          outBytes: number(),
          allBytes: number(),
          inPkts: number(),
          outPkts: number(),
          allowedSessionTimeSecs: number(),
          remainingTimeSecs: number(),
          start: timestamp,
          serviceType: string(),
          userMac: string(),
        })
      )
    ),
    modified: pipe(string(), isoTimestamp()),
    created: pipe(string(), isoTimestamp()),
    provider: string(),
    priority: number(),
    meta: partial(
      looseObject({
        revision: number(),
        created: timestamp,
        version: number(),
        updated: timestamp,
      })
    ),
    $loki: number(),
  })
);
