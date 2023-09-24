import { NextAuthOptions, User, getServerSession } from "next-auth";
import PatreonProvider from "next-auth/providers/patreon";
import { env } from "~/env.mjs";

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "dark",
    buttonText: "FFFFFF",
  },
  providers: [
    PatreonProvider({
      clientId: env.PATREON_CLIENT_ID,
      clientSecret: env.PATREON_ACCESS_TOKEN,
      authorization: { params: { scope: "identity.memberships" } },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("session", session);
      console.log("token", token);
      return {
        ...session,
        type: "patreon",
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
