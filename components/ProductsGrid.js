"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 20;

const PRICE_OPTIONS = [
  { value: "all", label: "All Prices" },
  { value: "under100", label: "Under $100" },
  { value: "100-300", label: "$100 – $300" },
  { value: "over300", label: "Over $300" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "trending", label: "Trending" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export default function ProductsGrid({ products = [] }) {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
    const cat = searchParams.get("category");
    if (cat) setCategory(cat);
  }, [searchParams]);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      result = result.filter((p) => p.category === category);
    }

    if (priceRange === "under100") {
      result = result.filter((p) => p.price < 100);
    } else if (priceRange === "100-300") {
      result = result.filter((p) => p.price >= 100 && p.price <= 300);
    } else if (priceRange === "over300") {
      result = result.filter((p) => p.price > 300);
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "trending") {
      result.sort((a, b) => (b.sold_count || 0) - (a.sold_count || 0));
    }

    return result;
  }, [products, category, priceRange, sortBy, search]);

  const hasActiveFilters = category !== "All" || priceRange !== "all" || search.trim();

  // Reset visible count whenever filters/sort change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, category, priceRange, sortBy]);

  // Infinite scroll via IntersectionObserver
  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) loadMore(); },
      { rootMargin: "200px" }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  function clearFilters() {
    setCategory("All");
    setPriceRange("all");
    setSearch("");
    setSortBy("featured");
  }

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative min-w-[180px] flex-1">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the nonsense…"
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100"
          />
        </div>

        {/* Category dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat === "All" ? "All Categories" : cat}</option>
          ))}
        </select>

        {/* Price dropdown */}
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100"
        >
          {PRICE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-navy outline-none transition focus:border-primary focus:ring-2 focus:ring-purple-100"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>

        {/* Clear filters */}
        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="rounded-xl border border-purple-200 bg-purple-50 px-3 py-2.5 text-sm font-semibold text-primary transition hover:bg-purple-100"
          >
            Clear ✕
          </button>
        )}
      </div>

      {/* Result count */}
      <p className="mb-4 text-sm font-semibold text-slate-500">
        {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        {category !== "All" && <span className="ml-1 text-primary">in {category}</span>}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-slate-500">Nothing matches. Try fewer filters.</p>
      )}

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-10">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
        </div>
      )}
    </div>
  );
}
