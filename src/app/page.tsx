"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Button from "~/components/ui/buttons/Button";
import Input from "~/components/ui/inputs/Input";
import Spacer from "~/components/ui/misc/Spacer";

export default function Login() {
  const session = useSession();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  console.log(session);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col gap-6 border-[1px] border-gray-800 bg-slate-500 p-4 drop-shadow "
    >
      <Spacer size={6} />
      <span>Image Here</span>
      <span>Name</span>
      <span className="flex flex-col gap-2">
        <span>Password:</span>
        <Input
          value={password}
          onChange={(e) => setPassword(e)}
          type="password"
        />
      </span>
      <span className="flex flex-col gap-2">
        <span>Confirm Password:</span>
        <Input
          value={password2}
          onChange={(e) => setPassword2(e)}
          type="password"
        />
      </span>
      <Button type="submit">Submit</Button>
    </form>
  );
}
