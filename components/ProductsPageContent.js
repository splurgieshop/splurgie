"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductsGrid from "@/components/ProductsGrid";
import { fetchAllProducts } from "@/lib/fetchProducts";
import { primaryButtonClass } from "@/lib/ui";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      <p className="mt-4 text-sm font-medium text-slate-500">
        Loading products...
      </p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 py-20 text-center">
      <span className="text-5xl">✨</span>
      <p className="page-heading mt-4 text-xl">
        No products yet — be the first to create one!
      </p>
      <Link
        href="/create-product"
        className={`${primaryButtonClass} mt-6 inline-block rounded-xl px-8 py-3 text-sm`}
      >
        Create a Product
      </Link>
    </div>
  );
}

export default function ProductsPageContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Failed to load products.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
        {error}
      </p>
    );
  }
  if (products.length === 0) return <EmptyState />;

  return <ProductsGrid products={products} />;
}
