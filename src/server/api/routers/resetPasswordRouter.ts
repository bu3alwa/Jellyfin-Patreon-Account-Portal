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
      console.log(ctx.session);
      if (!ctx.session.user.email) {
        throw "Missing email try re-logging in or contact admin.";
      }

      const jellyfinError =
        "Error: Something went wrong when contacting jellyfin";

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
        const createUserRes = await getUserApi(api).createUserByName({
          createUserByName: {
            Name: ctx.session.user.email,
            Password: input.password,
          },
        });

        if (createUserRes.statusText !== "OK") throw jellyfinError;

        return { message: "successful" };
      }

      // update the users password
      if (currentUser && currentUser.Id) {
        const triggerUpdateRes = await getUserApi(api).updateUserPassword({
          userId: currentUser.Id,
          updateUserPassword: {
            ResetPassword: true,
          },
        });

        if (triggerUpdateRes.status !== 204) throw jellyfinError;

        const updateRes = await getUserApi(api).updateUserPassword({
          userId: currentUser.Id,
          updateUserPassword: {
            CurrentPassword: "",
            NewPw: input.password,
            ResetPassword: true,
          },
        });

        if (updateRes.status !== 204) throw jellyfinError;
        return { message: "successful" };
      }
    }),
};
export const resetPasswordRouter = createTRPCRouter(resetPasswordRoutes);
