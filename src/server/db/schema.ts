import { text, sqliteTable, unique, integer } from "drizzle-orm/sqlite-core";

const whitelist = sqliteTable("whitelist", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username").unique(),
});
