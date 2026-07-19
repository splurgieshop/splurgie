"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function HeroMosaic() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    supabase
      .from("products")
      .select("id, name, image_url, gradient, slug")
      .order("sold_count", { ascending: false })
      .limit(30)
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  if (products.length === 0) return null;

  // Triple so the grid always fills the hero background fully
  const items = [...products, ...products, ...products];

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
        gap: "6px",
        padding: "6px",
        opacity: 0.22,
        pointerEvents: "none",
      }}
    >
      {items.map((product, i) => (
        <div
          key={`${product.id}-${i}`}
          style={{ borderRadius: "10px", overflow: "hidden", aspectRatio: "1" }}
        >
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              className={
                product.gradient?.startsWith("from-")
                  ? `w-full h-full bg-gradient-to-br ${product.gradient}`
                  : "w-full h-full"
              }
              style={
                product.gradient && !product.gradient.startsWith("from-")
                  ? { background: product.gradient, width: "100%", height: "100%" }
                  : { background: "rgba(255,255,255,0.3)", width: "100%", height: "100%" }
              }
            />
          )}
        </div>
      ))}
    </div>
  );
}
