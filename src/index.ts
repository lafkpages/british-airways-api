import { parse } from "valibot";
import {
  apiVersionSchema,
  deviceInfoSchema,
  flightInformationSchema,
  internetProvisionSchema,
  manufacturerConfigSchema,
  portalConfigSchema,
  wifiInventorySchema,
} from "./schemas";

export async function getManufacturerConfig() {
  return parse(
    manufacturerConfigSchema,
    await (
      await fetch(
        `https://shop.ba.com/config/env/manufacturer.json?t=${Date.now()}`
      )
    ).json()
  );
}

export async function getFlightInformation(baseUrl: string | URL) {
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
        `https://shop.ba.com/config/env/portal-config.json?t=${Date.now()}`
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

export async function getWifiInventory(apiBaseUrl: string | URL) {
  return parse(
    wifiInventorySchema,
    await (
      await fetch(new URL("v1/inventory-svc/inventory?type=WIFI", apiBaseUrl))
    ).json()
  );
}

export async function getApiVersion(apiBaseUrl: string | URL) {
  return parse(
    apiVersionSchema,
    await (await fetch(new URL("version.json", apiBaseUrl))).json()
  );
}

export async function getInternetProvision(apiBaseUrl: string | URL) {
  return parse(
    internetProvisionSchema,
    await (
      await fetch(new URL("v2/internet-svc/internet-provision", apiBaseUrl))
    ).json()
  );
}
