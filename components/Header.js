"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function Header() {
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
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-2xl font-bold tracking-tight text-[#7C3AED]"
        >
          splurgie <span aria-hidden="true">✨</span>
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
            className="w-full rounded-full border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-navy outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
          />
        </div>

        <nav className="ml-auto flex items-center gap-3 sm:gap-5">
          <Link
            href="/products"
            className="hidden text-sm font-semibold text-navy transition hover:text-[#7C3AED] sm:block"
          >
            Shop
          </Link>
          <Link
            href="/about"
            className="hidden text-sm font-semibold text-navy transition hover:text-[#7C3AED] sm:block"
          >
            About
          </Link>

          {!loading && user ? (
            <>
              {/* Desktop: show @username text */}
              <Link
                href="/profile"
                className="hidden text-sm font-semibold text-[#7C3AED] transition hover:text-[#EC4899] sm:inline"
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
                <Link
                  href="/auth/login"
                  className="text-sm font-semibold text-navy transition hover:text-[#7C3AED]"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-semibold text-navy transition hover:text-[#7C3AED]"
                >
                  Sign Up
                </Link>
              </>
            )
          )}

          {user && <NotificationBell userId={user.id} />}

          <Link
            href="/cart"
            className="relative flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-2 transition hover:bg-gray-50"
          >
            <svg
              className="h-5 w-5 text-navy"
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
            <span className="hidden text-sm font-semibold text-navy sm:inline">
              Cart
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
