"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsGrid({ products = [] }) {
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))].sort();
    return ["All", ...cats];
  }, [products]);

  const filtered = useMemo(() => {
    let result = [...products];

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
    }

    return result;
  }, [products, category, priceRange, sortBy]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-64">
        <div className="sticky top-24 space-y-6 rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <div>
            <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-primary">
              Category
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium text-navy"
                >
                  <input
                    type="radio"
                    name="category"
                    checked={category === cat}
                    onChange={() => setCategory(cat)}
                    className="accent-primary"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-primary">
              Price Range
            </h3>
            <div className="space-y-2">
              {[
                { value: "all", label: "All Prices" },
                { value: "under100", label: "Under $100" },
                { value: "100-300", label: "$100 – $300" },
                { value: "over300", label: "Over $300" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex cursor-pointer items-center gap-2 text-sm font-medium text-navy"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={priceRange === opt.value}
                    onChange={() => setPriceRange(opt.value)}
                    className="accent-primary"
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-primary">
              Sort By
            </h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-field w-full"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <p className="mb-4 text-sm font-semibold text-slate-500">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="py-12 text-center text-slate-500">
            No products match your filters.
          </p>
        )}
      </div>
    </div>
  );
}
