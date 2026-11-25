"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function TopCreators() {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await supabase
          .from("products")
          .select("seller_username, sold_count")
          .not("seller_username", "is", null)
          .limit(1000);

        const byCreator = {};
        for (const row of data || []) {
          const name = row.seller_username;
          if (!byCreator[name]) byCreator[name] = { name, sold: 0, listings: 0 };
          byCreator[name].sold += row.sold_count || 0;
          byCreator[name].listings += 1;
        }

        const top = Object.values(byCreator)
          .sort((a, b) => b.sold - a.sold || b.listings - a.listings)
          .slice(0, 3);

        if (!cancelled) setCreators(top);
      } catch {
        /* hide section on failure */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (creators.length === 0) return null;

  return (
    <div className="hm-cr-wrap">
      <div className="hm-cr-head">
        <div>
          <h2>Top creators</h2>
          <p>The minds behind the nonsense. Could be you next.</p>
        </div>
        <Link href="/products" className="hm-link">
          Browse all nonsense →
        </Link>
      </div>
      <ol className="hm-cr">
        {creators.map((c, i) => (
          <li key={c.name}>
            <Link href={`/seller/${c.name}`}>
              <div className="hm-rk" aria-hidden="true">
                {i + 1}
              </div>
              <div>
                <b>@{c.name}</b>
                <span className="hm-sm2">
                  {c.sold.toLocaleString()} sold · {c.listings}{" "}
                  {c.listings === 1 ? "listing" : "listings"}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
