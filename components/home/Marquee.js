"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Marquee() {
  const [names, setNames] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await supabase
          .from("products")
          .select("name")
          .order("sold_count", { ascending: false })
          .limit(10);
        if (!cancelled) setNames((data || []).map((r) => r.name));
      } catch {
        /* hide strip on failure */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (names.length < 3) return null;

  // Duplicate the list so the CSS -50% translate loops seamlessly.
  const items = [...names, ...names];

  return (
    <div className="hm-strip" aria-hidden="true">
      <div className="hm-track">
        {items.map((n, i) => (
          <span key={`${n}-${i}`}>{n}</span>
        ))}
      </div>
    </div>
  );
}
