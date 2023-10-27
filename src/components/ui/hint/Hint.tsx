import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  type: "success" | "warn" | "info" | "error";
  className: string;
  children: ReactNode;
};

export default function Hint({ type, children, className }: Props) {
  const css = {
    success: "border-[1px] border-green-700 text-green-500 bg-green-200",
    warn: "border-[1px] border-yellow-700 text-yellow-500 bg-yellow-200",
    info: "border-[1px] border-blue-700 text-blue-500 bg-blue-200",
    error: "border-[1px] border-red-700 text-red-500 bg-red-200",
  };
  return (
    <div className={twMerge("rounded-sm p-1", css[type], className)}>
      {children}
    </div>
  );
}
