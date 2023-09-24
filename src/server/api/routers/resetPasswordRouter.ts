import { Jellyfin } from "@jellyfin/sdk";
import { getUserApi } from "@jellyfin/sdk/lib/utils/api";
import { z } from "zod";
import { env } from "~/env.mjs";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { jellyFinSdkConfig } from "~/server/jellyfinSdk/jellyFinOptions";

export const resetPasswordRoutes = {
  reset: protectedProcedure
    .input(
      z.object({
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session.user.email) {
        throw "Missing email try re-logging in or contact admin.";
      }

      // when not patreon check whitelist
      if (ctx.session.type != "patreon") {
        const whitelist = ctx.db.query.whitelist.findFirst({
          where: (whitelist, { eq }) =>
            eq(whitelist.username, ctx.session.user.email!),
        });

        if (!whitelist) {
          throw "User not whitelisted to the server. Contact admin.";
        }
      }

      const api = new Jellyfin(jellyFinSdkConfig).createApi(
        env.JELLYFIN_URL,
        env.JELLYFIN_API_KEY,
      );

      // check jellyfin if user exists
      const usersList = await getUserApi(api).getUsers();
      const currentUser = usersList.data.find(
        (u) => u.Name === ctx.session.user.email,
      );

      // create user if it does not exist
      if (!currentUser) {
        return await getUserApi(api).createUserByName({
          createUserByName: {
            Name: ctx.session.user.email,
            Password: input.password,
          },
        });
      }

      // update the users password
      if (currentUser && currentUser.Id) {
        await getUserApi(api).updateUserPassword({
          userId: currentUser?.Id,
          updateUserPassword: {
            ResetPassword: true,
          },
        });

        return await getUserApi(api).updateUserPassword({
          userId: currentUser?.Id,
          updateUserPassword: {
            CurrentPassword: "",
            NewPw: input.password,
          },
        });
      }
    }),
};
export const resetPasswordRouter = createTRPCRouter(resetPasswordRoutes);
