"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { isDarkRoute } from "@/lib/theme";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "@/components/NotificationBell";

function getDisplayName(user) {
  return (
    user?.user_metadata?.username ||
    user?.email?.split("@")[0] ||
    "User"
  );
}

export default function Header({ variant }) {
  const pathname = usePathname();
  // Dark on every public route; pages can still force a variant explicitly.
  const dark = variant ? variant === "dark" : isDarkRoute(pathname);
  const linkClass = dark
    ? "text-sm font-semibold text-white transition hover:text-[#c6ff4a]"
    : "text-sm font-semibold text-navy transition hover:text-[#7C3AED]";
  const { cartCount } = useCart();
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  function handleSearch(e) {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }

  return (
    <header
      className={
        dark
          ? "sticky top-0 z-50 border-b-2 border-[#2d2347] bg-[#0d0817]"
          : "sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm"
      }
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`flex shrink-0 items-center gap-1.5 text-2xl tracking-tight ${
            dark ? "font-black text-white" : "font-bold text-[#7C3AED]"
          }`}
        >
          {dark ? (
            <>
              splurgie<span className="text-[#c6ff4a]">.</span>
            </>
          ) : (
            <>
              splurgie <span aria-hidden="true">✨</span>
            </>
          )}
        </Link>

        <div className="relative mx-auto hidden max-w-md flex-1 sm:block">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search fictional products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className={`w-full rounded-full border py-2.5 pl-10 pr-4 text-sm outline-none transition ${
              dark
                ? "border-[#2d2347] bg-[#17102a] text-white placeholder:text-[#b7aed3] focus:border-[#c6ff4a]"
                : "border-gray-300 bg-white text-navy focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
            }`}
          />
        </div>

        <nav className="ml-auto flex items-center gap-3 sm:gap-5">
          <Link href="/products" className={`hidden sm:block ${linkClass}`}>
            Shop
          </Link>
          <Link href="/about" className={`hidden sm:block ${linkClass}`}>
            About
          </Link>

          {!loading && user ? (
            <>
              {/* Desktop: dashboard + @username */}
              <Link href="/dashboard" className={`hidden sm:inline ${linkClass}`}>
                Dashboard
              </Link>
              <Link
                href="/profile"
                className={`hidden text-sm font-semibold transition sm:inline ${
                  dark
                    ? "text-[#c6ff4a] hover:text-[#ff5fb0]"
                    : "text-[#7C3AED] hover:text-[#EC4899]"
                }`}
              >
                @{getDisplayName(user)}
              </Link>
              {/* Mobile: show profile icon */}
              <Link
                href="/profile"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-xs font-bold text-white sm:hidden"
                aria-label="Profile"
              >
                {getDisplayName(user).slice(0, 2).toUpperCase()}
              </Link>
            </>
          ) : (
            !loading && (
              <>
                <Link href="/auth/login" className={linkClass}>
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className={
                    dark
                      ? "rounded-xl border-2 border-[#c6ff4a] px-3 py-1.5 text-sm font-extrabold text-[#c6ff4a] transition hover:bg-[#c6ff4a] hover:text-[#111]"
                      : linkClass
                  }
                >
                  Sign Up
                </Link>
              </>
            )
          )}

          {user && (
            <div className={dark ? "hm-bell" : undefined}>
              <NotificationBell userId={user.id} />
            </div>
          )}

          <Link
            href="/cart"
            className={`relative flex items-center gap-1.5 rounded-full border px-3 py-2 transition ${
              dark
                ? "border-[#2d2347] hover:bg-[#17102a]"
                : "border-gray-200 hover:bg-gray-50"
            }`}
          >
            <svg
              className={`h-5 w-5 ${dark ? "text-white" : "text-navy"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#EC4899] text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
            <span
              className={`hidden text-sm font-semibold sm:inline ${
                dark ? "text-white" : "text-navy"
              }`}
            >
              Cart
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
