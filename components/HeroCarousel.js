"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { fetchTrendingProducts } from "@/lib/fetchProducts";
import { productUrl } from "@/lib/products";

export default function HeroCarousel() {
  const [products, setProducts] = useState([]);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTrendingProducts(8);
        if (data?.length >= 1) setProducts(data);
      } catch {
        // silently skip — hero works fine without the carousel
      }
    }
    load();
  }, []);

  useEffect(() => {
    if (products.length < 2) return;
    const t = setInterval(() => {
      // fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setActive((i) => (i + 1) % products.length);
        setVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(t);
  }, [products.length]);

  function goTo(i) {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(i);
      setVisible(true);
    }, 350);
  }

  // Skeleton while loading
  if (products.length === 0) {
    return (
      <div className="flex justify-center py-4">
        <div className="h-72 w-72 rounded-3xl bg-white/20" />
      </div>
    );
  }

  const product = products[active];

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Single large card */}
      <Link href={productUrl(product)}>
        <div
          className="relative h-72 w-72 overflow-hidden rounded-3xl shadow-2xl ring-4 ring-white/20 transition-all duration-400"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.4s ease" }}
        >
          <ProductImage product={product} className="h-full w-full" />

          {/* Bottom overlay with product name */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-4 pt-8">
            {product.badge === "trending" && (
              <span className="mb-1 inline-block rounded-full bg-orange-500 px-2.5 py-0.5 text-xs font-bold text-white">
                🔥 Trending
              </span>
            )}
            <p className="truncate text-sm font-bold text-white">{product.name}</p>
            <p className="text-xs text-white/70">
              ${typeof product.price === "number" ? product.price.toLocaleString() : product.price}
            </p>
          </div>
        </div>
      </Link>

      {/* Dot indicators */}
      {products.length > 1 && (
        <div className="flex gap-1.5">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`View product ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/65"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
