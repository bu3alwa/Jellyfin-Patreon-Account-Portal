"use client";

import {
  type DetailedHTMLProps,
  type InputHTMLAttributes,
  forwardRef,
} from "react";
import { AiOutlineClose } from "react-icons/ai";
import { type IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    ""
  > {
  value?: string;
  icons?: IconType;
  clear?: boolean;
}
export default forwardRef<HTMLInputElement, Props>(function Input(
  { icons, clear, className, ...props }: Props,
  ref,
) {
  return (
    <span className="relative">
      {icons?.({ className: "absolute left-[0.5rem] top-[0.25rem]" })}
      <input
        ref={ref}
        {...props}
        className={twMerge(
          "rounded-sm border-slate-800 bg-slate-200 text-black",
          icons && "pl-8",
          clear && "pr-8",
          className,
        )}
      />
      {clear && (
        <AiOutlineClose className="absolute right-[0.5rem] top-[0.25rem] opacity-70 hover:opacity-100 " />
      )}
    </span>
  );
});
