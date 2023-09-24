"use server";

import { createAction } from "../trpc";
import { whiteListRoutes } from "../routers/whitelistRouter";

export const createWhitelistAction = createAction(
  "whitelist",
  "getAll",
)(whiteListRoutes.create);

export const deleteWhitelistByIdAction = createAction(
  "whitelist",
  "getAll",
)(whiteListRoutes.deleteById);
