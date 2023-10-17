import Image from "next/image";
import { getServerAuthSession } from "~/server/auth/auth";
import ResetPassword from "~/components/ResetPassword";
import Whitelist from "~/components/whitelist/Whitelist";
import Tabs from "~/components/ui/misc/Tabs";
import Subscribers from "~/components/Subscribers";
import Link from "next/link";

export default async function Login() {
  const session = await getServerAuthSession();

  // check if owner or not later
  const tab = !session?.isAdmin
    ? [
        {
          header: "Reset Password",
          content: <ResetPassword />,
        },
      ]
    : [
        {
          header: "Reset Password",
          content: <ResetPassword />,
        },
        {
          header: "Whitelist",
          content: <Whitelist />,
        },
        {
          header: "Subscribers",
          content: <Subscribers />,
        },
      ];

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-sm border-[1px] border-gray-800 bg-slate-500 p-8 drop-shadow ">
      {session?.user.image && (
        <Image width={100} height={100} src={session?.user.image} alt="Image" />
      )}
      <span>{session?.user.name}</span>
      <span>{session?.user.email}</span>
      <Link className="text-white" href="/api/auth/signout">
        Sign Out?
      </Link>
      <Tabs tab={tab} />
    </div>
  );
}
