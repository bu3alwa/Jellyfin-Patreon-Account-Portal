import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}
export default function Button({ children, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "border-1 rounded-sm border-white bg-blue-400 p-1 hover:bg-blue-500",
        props.className,
      )}
    >
      {children}
    </button>
  );
}
