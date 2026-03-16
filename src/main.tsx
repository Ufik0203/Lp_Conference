import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import App from "./App";
import { ArchiveProvider } from "./context/ArchiveContext";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ArchiveProvider>
          <Routes>
            <Route path="/*" element={<App />} />
            {/* <Route path="/ibitec-:year" element={<App />} /> */}
            {/* <Route path="*" element={<App />} /> */}
          </Routes>
        </ArchiveProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);
