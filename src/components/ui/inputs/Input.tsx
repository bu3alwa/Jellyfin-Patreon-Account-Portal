"use client";

import { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

interface Props
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "onChange" | "value"
  > {
  value: string;
  onChange: (s: string) => void;
  icons?: IconType;
  clear?: boolean;
}
export default function Input({
  icons,
  onChange,
  clear,
  className,
  ...props
}: Props) {
  return (
    <span className="relative">
      {icons && icons({ className: "absolute left-[0.5rem] top-[0.25rem]" })}
      <input
        {...props}
        onChange={(e) => onChange(e.target.value)}
        className={twMerge(
          "bg-slate-500",
          icons && "pl-8",
          clear && "pr-8",
          className,
        )}
      />
      {clear && (
        <AiOutlineClose
          onClick={() => onChange("")}
          className="absolute right-[0.5rem] top-[0.25rem] opacity-70 hover:opacity-100 "
        />
      )}
    </span>
  );
}
