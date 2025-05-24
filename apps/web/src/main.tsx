import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";

import SlotMachine from "@/app";

import "./index.css";

const queryClient = new QueryClient();

const App = () => {
   return (
      <React.StrictMode>
         <QueryClientProvider client={queryClient}>
            <SlotMachine />
         </QueryClientProvider>
      </React.StrictMode>
   );
};

createRoot(document.getElementById("app")!).render(<App />);
