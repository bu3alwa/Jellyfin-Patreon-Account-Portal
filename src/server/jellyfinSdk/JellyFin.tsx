import { Jellyfin } from "@jellyfin/sdk";
import { env } from "~/env.mjs";
import { jellyFinSdkConfig } from "./jellyFinOptions";

// Create a cached instance for different users
const jellyFinSdk = async () => {
  return new Jellyfin(jellyFinSdkConfig).createApi(
    env.JELLYFIN_URL,
    env.JELLYFIN_API_KEY,
  );
};

export default jellyFinSdk;
