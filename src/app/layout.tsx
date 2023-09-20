import "~/styles/globals.css";

import Providers from "./providers";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth/auth";

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerAuthSession();
  if (!session) {
    return redirect("/api/auth/signin");
  }

  return (
    <html lang="en">
      <body>
        <Providers>{props.children}</Providers>
      </body>
    </html>
  );
}
