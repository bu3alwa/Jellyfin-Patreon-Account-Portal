import { createTRPCRouter } from "~/server/api/trpc";
import { whitelistRouter } from "./routers/whitelistRouter";
import { subscribersRouter } from "./routers/subscribers";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  whitelist: whitelistRouter,
  subscribers: subscribersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
