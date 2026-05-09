import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import store from "@/app/store";

import { BrowserRouter } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Toaster } from "react-hot-toast";

import AppWrapper from "@/app/AppWrapper";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { ThemeProvider } from "@/context/ThemeContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      retry: 1,
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster position="top-right" />
        <ErrorBoundary>
          <BrowserRouter>
            <AppWrapper />
          </BrowserRouter>
        </ErrorBoundary>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);