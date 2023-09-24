"use client";

import Button from "./ui/buttons/Button";
import Spacer from "./ui/misc/Spacer";
import { useEffect, useRef, useState } from "react";
import Input from "./ui/inputs/Input";
import { useAction } from "~/utils/client";
import { resetPasswordAction } from "~/server/api/actions/resetPasswordAction";
import { z } from "zod";
import useZodForm from "~/utils/hooks/useZodForm";
import { FormProvider } from "react-hook-form";

const passwordValidation = z
  .object({
    password: z.string().min(8),
    password2: z.string().min(8),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.password2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be the same",
        path: ["password2"],
      });
    }
  });

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const mutation = useAction(resetPasswordAction);

  const formRef = useRef(null);
  const form = useZodForm({ schema: passwordValidation });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        action={resetPasswordAction}
        onSubmit={handleSubmit(async () => {
          await mutation.mutateAsync(new FormData(formRef.current!));
        })}
        className="flex flex-col"
      >
        <h2>Reset Password</h2>
        <Spacer size={2} />
        <span className="flex flex-col gap-2">
          <span>Password:</span>
          <Input
            {...register("password")}
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            type="password"
          />
        </span>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <span className="flex flex-col gap-2">
          <span>Confirm Password:</span>
          <Input
            {...register("password2")}
            value={password2}
            onChange={(e) => setPassword2(e.currentTarget.value)}
            type="password"
          />
        </span>
        {errors.password2 && (
          <span className="text-red-500">{errors.password2.message}</span>
        )}
        <Spacer size={2} />
        <Button type="submit">Submit</Button>
      </form>
    </FormProvider>
  );
};

export default ResetPassword;