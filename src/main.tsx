import { createRoot } from "react-dom/client";

import { App } from "./App";
// import { StrictMode } from "react";
import { initApp } from "./shared/init";

initApp();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <App />
  // </StrictMode>
);
