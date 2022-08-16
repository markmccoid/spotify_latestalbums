import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomsDebugValue } from "jotai/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true, // if data is stale
      refetchOnMount: true,
      cacheTime: 1000 * 30, //30 seconds
      // refetchInterval: 1000 * 30, //30 seconds
      staleTime: 1000 * 30,
    },
  },
});
const DebugAtoms = () => {
  useAtomsDebugValue();
  return null;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />

        <DebugAtoms />
        <Component {...pageProps} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
