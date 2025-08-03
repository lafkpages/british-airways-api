import {
  array,
  boolean,
  literal,
  looseObject,
  nullish,
  number,
  objectWithRest,
  partial,
  string,
  union,
  unknown,
} from "valibot";

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
    flightOpenedBy: partial(
      looseObject({
        $$type: string(),
        identity: string(),
        username: string(),
        firstName: string(),
        lastName: string(),
      })
    ),
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
