import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      cacheTime: 300_000, // 5m = 5 * 60 * 1000 ms
      staleTime: 10_000, // 10s = 10 * 1000 ms // default: 0
      refetchOnWindowFocus: false, // default: true
      refetchOnReconnect: false, // default: true
      refetchOnMount: false, // default: true
      keepPreviousData: true, // default: false
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
