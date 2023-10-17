import { type ButtonHTMLAttributes, type DetailedHTMLProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
  colorStyle?: "blue" | "red";
}
export default function IconButton({
  children,
  colorStyle = "blue",
  ...props
}: Props) {
  const color = {
    blue: "bg-blue-400 hover:bg-blue-500",
    red: "bg-red-400 hover:bg-red-500",
  };
  return (
    <button
      {...props}
      className={twMerge(
        "border-1 rounded-sm border-white p-1",
        color[colorStyle],
        props.className,
      )}
    >
      {children}
    </button>
  );
}
