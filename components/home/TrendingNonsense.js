"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/ProductImage";
import { fetchTrendingProducts } from "@/lib/fetchProducts";
import { formatPrice, formatSoldCount, productUrl } from "@/lib/products";

export default function TrendingNonsense() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const data = await fetchTrendingProducts(6);
        if (!cancelled) setProducts(data);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section id="shop" className="hm-sec">
      <div className="hm-wrap">
        <h2 className="hm-t">Trending nonsense</h2>
        <p className="hm-lead">What everyone&apos;s pretending to buy this week.</p>

        {loading && <p className="hm-empty">Loading the nonsense…</p>}

        {!loading && products.length === 0 && (
          <p className="hm-empty">
            No nonsense yet.{" "}
            <Link href="/create-product" className="hm-link">
              Be the first to list something
            </Link>
          </p>
        )}

        {products.length > 0 && (
          <div className="hm-pg">
            {products.map((p) => (
              <article key={p.id} className="hm-p">
                <Link href={productUrl(p)} className="hm-im" aria-hidden="true" tabIndex={-1}>
                  <ProductImage product={p} className="h-full w-full" />
                </Link>
                <h3>
                  <Link href={productUrl(p)}>{p.name}</Link>
                </h3>
                <div className="hm-m">
                  <span>{formatSoldCount(p.sold_count) || "brand new"}</span>
                  <span>
                    <s>{formatPrice(p.price)}</s> <b>$0</b>
                  </span>
                </div>
                <Link href={productUrl(p)} className="hm-btn hm-b1 hm-sm">
                  Buy it free
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="hm-more">
          <Link href="/products" className="hm-btn hm-b1">
            See all nonsense →
          </Link>
        </div>
      </div>
    </section>
  );
}
