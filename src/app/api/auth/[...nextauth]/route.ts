import NextAuth from "next-auth";
import { env } from "~/env.mjs";
import { authOptions } from "~/server/auth/auth";

// secret doesn't seem to be working
const handler = NextAuth({ ...authOptions, secret: env.NEXTAUTH_SECRET });

export { handler as GET, handler as POST };
