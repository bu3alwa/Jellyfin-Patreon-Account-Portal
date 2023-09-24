import jellyFinSdk from "./JellyFin";
import * as routes from "@jellyfin/sdk/lib/utils/api";

export const sdkApi = jellyFinSdk();
export const userApi = routes.getUserApi(sdkApi);
