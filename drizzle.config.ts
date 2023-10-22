import type { Config } from "drizzle-kit";
import { env } from "~/env.mjs";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DOCKER === "true" ? "/config/sqlite.db" : "./sqlite.db",
  },
} satisfies Config;
