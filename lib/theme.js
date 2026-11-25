// Routes that still use the old light theme. Everything else uses the dark
// "Receipt" theme (see `.dk` and `.hm` in app/globals.css).
const LIGHT_ROUTE_PREFIXES = [
  "/auth",
  "/profile",
  "/dashboard",
  "/create-product",
  "/edit-product",
];

export function isDarkRoute(pathname) {
  if (!pathname) return true;
  return !LIGHT_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}
