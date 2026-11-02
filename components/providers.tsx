"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FunctionComponent, PropsWithChildren, useState } from "react";

export const Providers: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  // created per mount, so the cache is not shared between server requests
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
