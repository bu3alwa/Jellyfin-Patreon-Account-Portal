import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    // This is sometimes is used in drizzle scripts where the env variables
    // are not available. So don't use the env validation here and instead
    // just use process.env
    url: process.env.DOCKER === "true" ? "/config/sqlite.db" : "./sqlite.db",
  },
} satisfies Config;
