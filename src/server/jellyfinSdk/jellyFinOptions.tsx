import { version } from "package.json";

export const jellyFinSdkConfig = {
  clientInfo: {
    name: "Account Server",
    version: version,
  },
  deviceInfo: {
    name: "Account - Web app",
    id: process.env.HOSTNAME ?? "Missing hostname",
  },
};
