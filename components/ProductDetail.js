"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getSellerName, formatSoldCount } from "@/lib/products";
import { primaryButtonClass } from "@/lib/ui";
import ProductReviews from "@/components/ProductReviews";
import ShareButton from "@/components/ShareButton";
import ReportButton from "@/components/ReportButton";

export default function ProductDetail({ product, relatedProducts }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl shadow-xl shadow-purple-200/40">
          <ProductImage product={product} className="aspect-square" />
        </div>

        <div>
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">
              {product.category}
            </p>
            {product.badge && (
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-primary">
                {product.badge === "trending" ? "🔥 Trending" : "✨ New"}
              </span>
            )}
          </div>
          <h1 className="page-heading mt-2 text-3xl sm:text-4xl lg:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-3xl font-extrabold text-primary">
            {formatPrice(product.price)}
          </p>
          <div className="mt-2 flex items-center gap-3">
            <Link
              href={`/seller/${getSellerName(product)}`}
              className="text-sm font-bold text-accent hover:underline"
            >
              Sold by @{getSellerName(product)}
            </Link>
            {formatSoldCount(product.sold_count) && (
              <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-bold text-primary">
                🔥 {formatSoldCount(product.sold_count)}
              </span>
            )}
          </div>
          {product.location && (
            <p className="mt-1 text-sm text-slate-500">
              📦 Ships from {product.location}
            </p>
          )}
          <p className="mt-6 leading-relaxed text-slate-600">
            {product.description}
          </p>

          <ReportButton product={product} />

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => addToCart(product.id)}
              className={`${primaryButtonClass} flex-1 rounded-xl py-3.5 text-sm`}
            >
              Add to cart
            </button>
            <ShareButton product={product} />
            <button
              onClick={() => toggleWishlist(product.id)}
              className="flex h-12 w-12 items-center justify-center rounded-xl border-2 border-purple-100 bg-white shadow-sm transition hover:border-accent hover:bg-pink-50"
              aria-label="Toggle wishlist"
            >
              <svg
                className={`h-6 w-6 ${isWishlisted ? "fill-accent text-accent" : "text-slate-400"}`}
                fill={isWishlisted ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ProductReviews productId={product.id} />

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="page-heading text-2xl">More nonsense you&apos;ll love</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
