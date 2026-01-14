import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.tsx";
import { TolgeeProvider } from "@tolgee/react";
import { tolgee } from "./i18n/i18n.ts";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TolgeeProvider tolgee={tolgee} fallback="Loading translations...">
          <AuthProvider>
            <App />
            <Toaster
              position="top-right"
              richColors
              closeButton
              duration={4000}
            />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TolgeeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
