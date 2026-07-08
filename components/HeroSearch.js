"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-10 w-full max-w-xl">
      <div className="flex overflow-hidden rounded-2xl bg-white shadow-xl shadow-purple-900/20">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for anything fictional..."
          className="flex-1 bg-transparent px-5 py-4 text-base text-navy outline-none placeholder:text-slate-400"
          autoComplete="off"
        />
        <button
          type="submit"
          className="m-1.5 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
        >
          Search
        </button>
      </div>
    </form>
  );
}
