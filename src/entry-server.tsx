// The same app as main.tsx, rendered to HTML at build time by scripts/build.mjs
import { StrictMode } from "react";
import { renderToString } from "react-dom/server";

import App from "@/App";

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
