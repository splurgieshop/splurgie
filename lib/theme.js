// Routes that still use the old light theme. Everything else uses the dark
// "Receipt" theme (see `.dk` and `.hm` in app/globals.css).
// (Empty now: every page uses the dark theme. Add a prefix here to opt a
// route back into the light theme.)
const LIGHT_ROUTE_PREFIXES = [];

export function isDarkRoute(pathname) {
  if (!pathname) return true;
  return !LIGHT_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
