"use client";
import { useState, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: ReactNode;
};
export default function Providers({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
