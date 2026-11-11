import { useEffect, useState } from "react";

/**
 * The build time while prerendering and while hydrating, so the HTML and the first browser render
 * agree; the real time once the page has loaded (durations like "10 mos", the footer's year).
 */
export function useNow() {
  const [now, setNow] = useState(() => new Date(__BUILD_TIME__));
  useEffect(() => setNow(new Date()), []);
  return now;
}
