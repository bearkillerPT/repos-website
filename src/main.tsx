import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";

import App from "@/App";
import "@/index.css";

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// The built index.html already holds the rendered page (scripts/build.mjs): take it over.
// The dev server's doesn't, so render from scratch there.
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
