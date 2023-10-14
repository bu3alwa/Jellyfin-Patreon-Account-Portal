import { NextAuthOptions, User, getServerSession } from "next-auth";
import PatreonProvider from "next-auth/providers/patreon";
import GoogleProvider from "next-auth/providers/google";
import { env } from "~/env.mjs";
import NextAuth, { DefaultSession } from "next-auth";
import { AuthenticationResult } from "@jellyfin/sdk/lib/generated-client/models";
import { profile } from "console";
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
      authorization: { params: { scope: "identity.memberships campaigns" } },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ account, user }) => {
      const isAdmin = env.ADMIN_EMAIL === user.email;
      if (account?.provider === "patreon") return true;
      if (isAdmin) return true;

      if (user && user.email) return false;

      const whitelist = await db.query.whitelist.findFirst({
        where: (whitelist, { eq }) => eq(whitelist.username, user.email!),
      });

      if (whitelist) return true;

      return false;
    },
    jwt: async ({ account, profile, token }) => {
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
