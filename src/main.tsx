import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobalProvider } from "./contexts/GlobalContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </StrictMode>
);
