import jellyFinSdk from "./JellyFin";
import * as routes from "@jellyfin/sdk/lib/utils/api";
import { Api } from "@jellyfin/sdk";

export const sdkApi: Api = await jellyFinSdk();
export const userApi = routes.getUserApi(sdkApi);
