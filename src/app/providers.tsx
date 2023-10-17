"use client";
import { type ReactNode, cache } from "react";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: ReactNode;
};
export default function Providers({ children }: Props) {
  const getQueryClient = cache(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (e) => {
              ``;
              console.log(e);
            },
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={getQueryClient()}>
      <SessionProvider>{children}</SessionProvider>
    </QueryClientProvider>
  );
}
