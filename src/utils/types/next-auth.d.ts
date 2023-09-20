import NextAuth, { DefaultSession } from "next-auth";
import { AuthenticationResult } from "@jellyfin/sdk/lib/generated-client/models";

declare module "next-auth" {
  interface Session extends DefaultSession {
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
