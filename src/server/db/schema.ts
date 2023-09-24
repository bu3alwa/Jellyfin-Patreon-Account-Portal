import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const whitelist = sqliteTable("whitelist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").unique(),
});
