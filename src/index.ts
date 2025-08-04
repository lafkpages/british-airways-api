import { parse } from "valibot";
import {
  airportInformationSchema,
  apiVersionSchema,
  deviceInfoSchema,
  flightInformationSchema,
  internetProvisionSchema,
  manufacturerConfigSchema,
  portalConfigSchema,
  registerDeviceSchema,
  weatherSchema,
  wifiInventorySchema,
} from "./schemas";

const defaultPortalBaseUrl: string | URL = "https://shop.ba.com";
const defaultApiBaseUrl: string | URL = "https://api.air.dot-air.com";

export async function isInFlight() {
  const resp = await fetch(new URL("version.json", defaultApiBaseUrl), {
    redirect: "manual",
  }).catch(() => null);
  return !!(
    resp?.ok && resp.headers.get("content-type")?.startsWith("application/json")
  );
}

export async function getManufacturerConfig() {
  return parse(
    manufacturerConfigSchema,
    await (
      await fetch(
        new URL(
          `config/env/manufacturer.json?t=${Date.now()}`,
          defaultPortalBaseUrl
        )
      )
    ).json()
  );
}

export async function getFlightInformation(baseUrl = defaultApiBaseUrl) {
  return parse(
    flightInformationSchema,
    await (
      await fetch(
        new URL("v1/flight-information-svc/flight-information", baseUrl)
      )
    ).json()
  );
}

export async function getPortalConfig() {
  return parse(
    portalConfigSchema,
    await (
      await fetch(
        new URL(
          `config/env/portal-config.json?t=${Date.now()}`,
          defaultPortalBaseUrl
        )
      )
    ).json()
  );
}

export async function getDeviceInfo(provisioningServiceBaseUrl: string | URL) {
  return parse(
    deviceInfoSchema,
    await (
      await fetch(new URL("ac/device/info", provisioningServiceBaseUrl))
    ).json()
  );
}

export async function getWifiInventory(apiBaseUrl = defaultApiBaseUrl) {
  return parse(
    wifiInventorySchema,
    await (
      await fetch(new URL("v1/inventory-svc/inventory?type=WIFI", apiBaseUrl))
    ).json()
  );
}

export async function getApiVersion(apiBaseUrl = defaultApiBaseUrl) {
  return parse(
    apiVersionSchema,
    await (await fetch(new URL("version.json", apiBaseUrl))).json()
  );
}

export async function registerDevice(apiBaseUrl = defaultApiBaseUrl) {
  return parse(
    registerDeviceSchema,
    await (
      await fetch(
        new URL(
          // TODO: figure out what NONE means here, but it seems to work
          "v2/internet-svc/internet-provision/register-device/NONE",
          apiBaseUrl
        ),
        {
          method: "POST",
        }
      )
    ).json()
  );
}

export async function getInternetProvision(
  apiBaseUrl = defaultApiBaseUrl,
  deviceToken: string
) {
  return parse(
    internetProvisionSchema,
    await (
      await fetch(new URL("v2/internet-svc/internet-provision", apiBaseUrl), {
        headers: {
          "X-Device-Token": deviceToken,
        },
      })
    ).json()
  );
}

export async function getAirportInformation(
  apiBaseUrl = defaultApiBaseUrl,
  iata: string
) {
  return parse(
    airportInformationSchema,
    await (
      await fetch(
        new URL(
          `v1/airport-information-svc?iata=${encodeURIComponent(iata)}`,
          apiBaseUrl
        )
      )
    ).json()
  );
}

export async function getWeather(
  apiBaseUrl = defaultApiBaseUrl,
  languages = ["en-GB"],
  services = ["currentconditions", "forecast5days"],
  unit: "Metric" | "Imperial" = "Metric"
) {
  return parse(
    weatherSchema,
    await (
      await fetch(new URL(`v1/weather-svc/weather`, apiBaseUrl), {
        method: "POST",
        body: JSON.stringify({
          languages,
          services,
          unit,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json()
  );
}
