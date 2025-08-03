import {
  getApiVersion,
  getDeviceInfo,
  getFlightInformation,
  getManufacturerConfig,
  getPortalConfig,
  getWifiInventory,
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
