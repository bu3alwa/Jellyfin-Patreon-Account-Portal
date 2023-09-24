"use client";

import { AiOutlinePlus } from "react-icons/ai";
import { z } from "zod";
import IconButton from "../ui/buttons/IconButton";
import Input from "../ui/inputs/Input";
import useZodForm from "~/utils/hooks/useZodForm";
import { createWhitelistAction } from "~/server/api/actions/whitelistActions";
import { useAction } from "~/utils/client";
import { useRef } from "react";
import { FormProvider } from "react-hook-form";

const createSchema = z.object({
  username: z.string().email(),
});

export default function WhitelistCreate() {
  const form = useZodForm({ schema: createSchema });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const formRef = useRef(null);
  const mutation = useAction(createWhitelistAction, {
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  return (
    <FormProvider {...form}>
      <form
        action={createWhitelistAction}
        ref={formRef}
        onSubmit={handleSubmit(async () => {
          await mutation.mutateAsync(new FormData(formRef.current!));
        })}
        className="inline-flex gap-2"
      >
        <Input {...register("username")} />
        <IconButton>
          <AiOutlinePlus />
        </IconButton>
      </form>
      {errors.username && (
        <span className="text-red-500">{errors.username.message}</span>
      )}
    </FormProvider>
  );
}
