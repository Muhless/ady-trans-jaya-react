import "./index.css";
import App from "./App.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error(
    "Root element not found: Make sure you have a <div id='root'></div>"
  );
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
