import type { Config } from "drizzle-kit";

export default {
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DOCKER === "true" ? "/config/sqlite.db" : "./sqlite.db",
  },
} satisfies Config;
