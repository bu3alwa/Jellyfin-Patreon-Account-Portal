import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { whitelist } from "~/server/db/schema";

export const whiteListRoutes = {
  getAll: protectedProcedure.query(({ ctx }) => {
    const getQuery = ctx.db.select().from(whitelist).prepare().all();
    return getQuery;
  }),

  create: protectedProcedure
    .input(
      z.object({
        username: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(whitelist).values({
        username: input.username,
      });
      return { message: "successful" };
    }),

  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(whitelist)
        .where(eq(whitelist.id, input.id))
        .returning();
      return { message: "successful" };
    }),
};
export const whitelistRouter = createTRPCRouter(whiteListRoutes);
