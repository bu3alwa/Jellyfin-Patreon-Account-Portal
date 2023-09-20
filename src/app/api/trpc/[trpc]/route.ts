import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "~/server/api/trpc";
import { NextRequest } from "next/server";

// export API handler
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    router: appRouter,
    req: req,
    endpoint: "/api/trpc",
    createContext: createTRPCContext,
    onError:
      env.NODE_ENV === "development"
        ? ({ path, error }) => {
            console.error(
              `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            );
          }
        : undefined,
  });

export { handler as GET, handler as POST };
