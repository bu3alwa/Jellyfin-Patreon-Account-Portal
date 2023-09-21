"use client";

import Button from "./ui/buttons/Button";
import Spacer from "./ui/misc/Spacer";
import { useState } from "react";
import Input from "./ui/inputs/Input";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="flex flex-col"
    >
      <h2>Reset Password</h2>
      <Spacer size={2} />
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
      <Spacer size={2} />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ResetPassword;
