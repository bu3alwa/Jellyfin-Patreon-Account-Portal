/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type NextAuthOptions, getServerSession } from "next-auth";
import PatreonProvider from "next-auth/providers/patreon";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import { type DefaultSession } from "next-auth";
import { db } from "../db/db";

declare module "next-auth" {
  interface Session extends DefaultSession {
    provider: "patreon" | "google";
    isAdmin: boolean;
    accessToken: string;
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "dark",
    buttonText: "FFFFFF",
  },
  providers: [
    PatreonProvider({
      clientId: env.PATREON_CLIENT_ID,
      clientSecret: env.PATREON_ACCESS_TOKEN,
      authorization: {
        params: {
          scope: "identity identity[email]",
        },
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ account, user, profile }) => {
      const isAdmin = env.ADMIN_EMAIL === user.email;

      const campaignRes = await fetch(
        "https://www.patreon.com/api/oauth2/v2/campaigns",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${env.PATREON_ACCESS_TOKEN}`,
            Accept: "*/*",
            credentials: "include",
          },
          credentials: "include",
        },
      );

      const campaignData = (await campaignRes.json()) as {
        data: { attributes: any; id: string; type: string }[];
        meta: { pagination: { cursors: any; total: number } };
      };

      const campaignId = campaignData.data.find((i) => i.type === "campaign")
        ?.id;

      if (account?.provider === "patreon") {
        if (campaignRes.status !== 200) return false;
        const pledge = (profile as any)?.included?.find(
          (i: any) => i.id === campaignId,
        );

        // Keep it simple for now if pledge campaign id is in profile
        // then allowed to login. Not sure if inactive pledges show up
        // on the profile
        if (pledge) return true;
        return false;
      }

      if (isAdmin) return true;

      if (!user?.email) return false;

      const whitelist = await db.query.whitelist.findFirst({
        where: (whitelist, { eq }) => eq(whitelist.username, user.email!),
      });

      if (whitelist) return true;

      return false;
    },
    jwt: ({ account, profile, token }) => {
      // if (env.NODE_ENV === "development") {
      //   console.log("profile", profile);
      //   console.log("account", account);
      // }

      if (account) {
        token.provider = account.provider;
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    session: ({ session, token }) => {
      // if (env.NODE_ENV === "development") {
      //   console.log("session", session);
      //   console.log("token", token);
      // }

      // do a check for admin in the future
      // for now default to false
      const isAdmin = env.ADMIN_EMAIL === token.email;

      return {
        ...session,
        provider: token.provider,
        accessToken: token.accessToken,
        isAdmin: isAdmin,
        user: {
          ...session.user,
          id: token.sub,
        },
      };
    },
  },
};

export const getServerAuthSession = async () =>
  await getServerSession(authOptions);
