"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchTrendingProducts } from "@/lib/fetchProducts";
import { primaryButtonClass } from "@/lib/ui";

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
    </div>
  );
}

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchTrendingProducts(6);
        setProducts(data);
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  if (loading) return <LoadingSpinner />;

  if (products.length === 0) {
    return (
      <div className="rounded-2xl bg-white py-16 text-center shadow-md shadow-purple-100/50">
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

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
