"use client";

import { usePathname } from "next/navigation";
import { isDarkRoute } from "@/lib/theme";

export default function ThemeShell({ children }) {
  const pathname = usePathname();
  const dark = isDarkRoute(pathname);

  return (
    <div className={`flex flex-1 flex-col ${dark ? "dk" : ""}`}>{children}</div>
  );
}
