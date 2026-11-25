"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ProductImage from "@/components/ProductImage";
import { formatPrice } from "@/lib/products";

const STEPS = [
  "Adding to cart",
  "“Charging” your imaginary card",
  "Packing a box of nothing",
];

function digits(n) {
  let s = "";
  for (let i = 0; i < n; i++) s += Math.floor(Math.random() * 10);
  return s;
}

export default function HeroCheckout() {
  const [pool, setPool] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | running | done
  const [stepsOn, setStepsOn] = useState(0);
  const [receipt, setReceipt] = useState(null);
  const timers = useRef([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const { data } = await supabase
          .from("products")
          .select("id, name, description, price, image_url, gradient, slug")
          .order("created_at", { ascending: false })
          .limit(60);
        if (cancelled) return;
        const rows = (data || []).map((r) => ({ ...r, price: Number(r.price) }));
        setPool(rows);
        if (rows.length) {
          setCurrent(rows[Math.floor(Math.random() * rows.length)]);
        }
      } catch {
        /* leave empty — fallback UI renders */
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
      timers.current.forEach(clearTimeout);
    };
  }, []);

  function pickAnother() {
    if (pool.length < 2) return;
    let next;
    do {
      next = pool[Math.floor(Math.random() * pool.length)];
    } while (next.id === current?.id);
    setCurrent(next);
  }

  function buy() {
    setPhase("running");
    setStepsOn(0);
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStepsOn(i + 1), 500 * (i + 1)));
    });
    timers.current.push(
      setTimeout(() => {
        setReceipt({ order: `#${digits(8)}`, tracking: `SPG${digits(10)}` });
        setPhase("done");
      }, 500 * STEPS.length + 500)
    );
  }

  function again() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("idle");
    setStepsOn(0);
    setReceipt(null);
    pickAnother();
  }

  return (
    <div className="hm-demo" aria-labelledby="hm-demo-h">
      <div className="hm-dh">
        <span id="hm-demo-h">TRY THE CHECKOUT — RIGHT HERE</span>
        <span className="hm-pill">100% FAKE</span>
      </div>

      {loading && <div className="hm-skel" aria-hidden="true" />}

      {!loading && !current && (
        <p style={{ margin: 0, color: "#5b5578" }}>
          Nothing in the shop yet. Be the first to list something ridiculous.
        </p>
      )}

      {current && (
        <>
          <div className="hm-prod">
            <ProductImage product={current} className="hm-thumb" />
            <div>
              <h2>{current.name}</h2>
              {current.description && (
                <p>
                  {current.description.length > 60
                    ? `${current.description.slice(0, 57)}…`
                    : current.description}
                </p>
              )}
              <div className="hm-price">
                <s>{formatPrice(current.price)}</s>
                <span>$0.00 today</span>
              </div>
            </div>
          </div>

          {phase === "idle" && (
            <>
              <button type="button" className="hm-btn hm-b1" onClick={buy}>
                Buy it (for free)
              </button>
              {pool.length > 1 && (
                <button type="button" className="hm-shuf" onClick={pickAnother}>
                  Show me something else ↻
                </button>
              )}
            </>
          )}

          {phase !== "idle" && (
            <ol className="hm-steps" aria-live="polite">
              {STEPS.map((s, i) => (
                <li key={s} className={stepsOn > i ? "on" : ""}>
                  {s}
                </li>
              ))}
            </ol>
          )}

          {phase === "done" && receipt && (
            <>
              <div className="hm-rc">
                <div className="hm-ln">
                  <span>ORDER</span>
                  <b>{receipt.order}</b>
                </div>
                <div className="hm-ln">
                  <span>TRACKING</span>
                  <b>{receipt.tracking}</b>
                </div>
                <div className="hm-ln">
                  <span>TOTAL</span>
                  <b>$0.00</b>
                </div>
                <div className="hm-fin">STATUS: NEVER ARRIVING 🚚</div>
              </div>
              <div className="hm-row2">
                <button type="button" className="hm-btn hm-b1 hm-sm" onClick={again}>
                  Buy another
                </button>
                <Link href="/products" className="hm-btn hm-b2 hm-sm">
                  Browse all
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
