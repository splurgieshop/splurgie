"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import ProductImage from "@/components/ProductImage";
import { formatPrice, getSellerName, formatSoldCount, productUrl } from "@/lib/products";
import { primaryButtonClass } from "@/lib/ui";

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-purple-100/50">
      <Link href={productUrl(product)} className="relative block">
        <ProductImage
          product={product}
          className="aspect-square transition duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold shadow-md ${
              product.badge === "trending"
                ? "bg-white text-orange-500"
                : "bg-white text-primary"
            }`}
          >
            {product.badge === "trending" ? "🔥 Trending" : "✨ New"}
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-md transition hover:scale-110"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            className={`h-5 w-5 ${isWishlisted ? "fill-accent text-accent" : "text-slate-400"}`}
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
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link href={productUrl(product)}>
          <h3 className="font-bold text-navy transition group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-xl font-extrabold text-primary">
          {formatPrice(product.price)}
        </p>
        <div className="mt-1 flex items-center gap-2">
          <Link
            href={`/seller/${getSellerName(product)}`}
            className="text-sm font-semibold text-accent hover:underline"
          >
            @{getSellerName(product)}
          </Link>
          {formatSoldCount(product.sold_count) && (
            <span className="text-xs font-bold text-slate-400">
              · {formatSoldCount(product.sold_count)}
            </span>
          )}
        </div>
        <button
          onClick={() => addToCart(product.id)}
          className={`${primaryButtonClass} mt-4 w-full rounded-xl py-2.5 text-sm`}
        >
          Add to cart
        </button>
      </div>
    </article>
  );
}
