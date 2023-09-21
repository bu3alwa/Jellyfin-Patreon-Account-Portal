import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Button from "~/components/ui/buttons/Button";
import { getServerAuthSession } from "~/server/auth/auth";
import ResetPassword from "~/components/ResetPassword";
import HorizontalRule from "~/components/ui/horizontalRule/HorizontalRule";
import Whitelist from "~/components/whitelist/Whitelist";

export default async function Login() {
  const session = await getServerAuthSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-sm border-[1px] border-gray-800 bg-slate-500 p-8 drop-shadow ">
      {session?.user.image && (
        <Image width={100} height={100} src={session?.user.image} alt="Image" />
      )}
      <span>{session?.user.name}</span>
      <span>{session?.user.email}</span>
      <HorizontalRule className="w-full" />
      <ResetPassword />
      <HorizontalRule className="w-full" />
      <Whitelist />
    </div>
  );
}
