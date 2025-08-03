import {
  getAirportInformation,
  getApiVersion,
  getDeviceInfo,
  getFlightInformation,
  getInternetProvision,
  getManufacturerConfig,
  getPortalConfig,
  getWifiInventory,
  registerDevice,
} from ".";

const manufacturerConfig = await getManufacturerConfig();
console.log("Manufacturer config:", manufacturerConfig);

const flightInformation = manufacturerConfig.emulator
  ? await getFlightInformation(manufacturerConfig.emulator)
  : null;
console.log("Flight information:", flightInformation);

const portalConfig = await getPortalConfig();
console.log("Portal config:", portalConfig);

const deviceInfo = manufacturerConfig.provisioningService
  ? await getDeviceInfo(manufacturerConfig.provisioningService)
  : null;
console.log("Device info:", deviceInfo);

const wifiInventory = manufacturerConfig.emulator
  ? await getWifiInventory(manufacturerConfig.emulator)
  : null;
console.log("Wi-Fi inventory:", wifiInventory);

const apiVersion = manufacturerConfig.emulator
  ? await getApiVersion(manufacturerConfig.emulator)
  : null;
console.log("API version:", apiVersion);

const deviceToken =
  (manufacturerConfig.emulator
    ? await registerDevice(manufacturerConfig.emulator)
    : null
  )?.deviceToken || "null";

const internetProvision = manufacturerConfig.emulator
  ? await getInternetProvision(manufacturerConfig.emulator, deviceToken)
  : null;
console.log("Internet provision:", internetProvision);

const originAirportInformation =
  manufacturerConfig.emulator && flightInformation?.originIATA
    ? await getAirportInformation(
        manufacturerConfig.emulator,
        flightInformation.originIATA
      )
    : null;
console.log("Origin airport information:", originAirportInformation);

const destinationAirportInformation =
  manufacturerConfig.emulator && flightInformation?.destinationIATA
    ? await getAirportInformation(
        manufacturerConfig.emulator,
        flightInformation.destinationIATA
      )
    : null;
console.log("Destination airport information:", destinationAirportInformation);
