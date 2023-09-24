"use server";

import { resetPasswordRoutes } from "../routers/resetPasswordRouter";
import { createAction } from "../trpc";

export const resetPasswordAction = createAction()(resetPasswordRoutes.reset);
