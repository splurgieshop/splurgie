"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { formatPrice, formatSoldCount, productUrl } from "@/lib/products";
import ProductImage from "@/components/ProductImage";

function getUsername(user) {
  return user?.user_metadata?.username || user?.email?.split("@")[0] || "Seller";
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function groupByPeriod(notifications, period) {
  const now = new Date();
  if (period === "7d") {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now);
      d.setDate(d.getDate() - (6 - i));
      const label = d.toLocaleDateString("en-US", { weekday: "short" });
      const count = notifications.filter((n) => {
        const nd = new Date(n.created_at);
        return nd.toDateString() === d.toDateString();
      }).length;
      return { label, count };
    });
  }
  if (period === "30d") {
    return Array.from({ length: 4 }, (_, i) => {
      const start = new Date(now);
      start.setDate(start.getDate() - (3 - i + 1) * 7);
      const end = new Date(now);
      end.setDate(end.getDate() - (3 - i) * 7);
      const count = notifications.filter((n) => {
        const nd = new Date(n.created_at);
        return nd >= start && nd < end;
      }).length;
      return { label: `Wk ${i + 1}`, count };
    });
  }
  // 90d
  return Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now);
    d.setMonth(d.getMonth() - (2 - i));
    const label = d.toLocaleDateString("en-US", { month: "short" });
    const count = notifications.filter((n) => {
      const nd = new Date(n.created_at);
      return (
        nd.getMonth() === d.getMonth() &&
        nd.getFullYear() === d.getFullYear()
      );
    }).length;
    return { label, count };
  });
}

function StatCard({ icon, label, value, sub }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-md shadow-purple-100/50">
      <div className="flex items-start justify-between">
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <span className="text-xl">{icon}</span>
      </div>
      <p className="mt-2 text-2xl font-extrabold text-primary">{value}</p>
      <p className="mt-0.5 text-xs text-slate-400">{sub}</p>
    </div>
  );
}

export default function DashboardContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    if (!loading && !user) router.replace("/auth/login");
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    async function loadData() {
      setDataLoading(true);

      const { data: prods } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", user.id)
        .order("sold_count", { ascending: false });

      const productList = prods || [];
      setProducts(productList);

      if (productList.length > 0) {
        const ids = productList.map((p) => p.id);
        const { data: revs } = await supabase
          .from("reviews")
          .select("rating")
          .in("product_id", ids);
        setReviews(revs || []);
      }

      const { data: notifs } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setNotifications(notifs || []);

      setDataLoading(false);
    }
    loadData();
  }, [user]);

  const stats = useMemo(() => {
    const totalSales = products.reduce((s, p) => s + (p.sold_count || 0), 0);
    const totalRevenue = products.reduce(
      (s, p) => s + (p.sold_count || 0) * (p.price || 0),
      0
    );
    const avgRating =
      reviews.length > 0
        ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        : null;
    return { totalSales, totalRevenue, avgRating, listings: products.length };
  }, [products, reviews]);

  const topProducts = useMemo(
    () =>
      [...products]
        .sort(
          (a, b) =>
            (b.sold_count || 0) * b.price - (a.sold_count || 0) * a.price
        )
        .slice(0, 5),
    [products]
  );

  const categoryBreakdown = useMemo(() => {
    const cats = {};
    products.forEach((p) => {
      if (!cats[p.category]) cats[p.category] = { sales: 0 };
      cats[p.category].sales += p.sold_count || 0;
    });
    return Object.entries(cats)
      .filter(([, d]) => d.sales > 0)
      .sort((a, b) => b[1].sales - a[1].sales)
      .slice(0, 6);
  }, [products]);

  const chartData = useMemo(
    () => groupByPeriod(notifications, period),
    [notifications, period]
  );
  const chartMax = useMemo(
    () => Math.max(...chartData.map((d) => d.count), 1),
    [chartData]
  );

  if (loading || dataLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-200 border-t-purple-600" />
      </div>
    );
  }

  return (
    <div>
      {/* Page header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="page-heading text-3xl">Seller Dashboard</h1>
          <p className="mt-1 text-slate-500">@{getUsername(user)}</p>
        </div>
        <Link
          href="/create-product"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-90"
        >
          + New Listing
        </Link>
      </div>

      {/* Stats row */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon="💰"
          label="Total Revenue"
          value={formatPrice(stats.totalRevenue)}
          sub={`across ${stats.listings} products`}
        />
        <StatCard
          icon="🛍️"
          label="Total Sales"
          value={stats.totalSales}
          sub={`${notifications.length} orders received`}
        />
        <StatCard
          icon="📦"
          label="Active Listings"
          value={stats.listings}
          sub={
            products.filter((p) => !p.sold_count || p.sold_count === 0).length > 0
              ? `${products.filter((p) => !p.sold_count || p.sold_count === 0).length} with no sales yet`
              : "all listing have sales!"
          }
        />
        <StatCard
          icon="⭐"
          label="Avg Rating"
          value={stats.avgRating ? stats.avgRating.toFixed(1) : "—"}
          sub={`from ${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
        />
      </div>

      {/* Chart — full width */}
      <div className="mb-6 rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-navy">Sales Over Time</h2>
          <div className="flex gap-1 rounded-xl bg-slate-100 p-1">
            {["7d", "30d", "90d"].map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition ${
                  period === p
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center rounded-xl bg-purple-50 text-sm text-slate-400">
            No sales yet — share your listings to get started!
          </div>
        ) : (
          <div className="flex items-end gap-2" style={{ height: 120 }}>
            {chartData.map((d, i) => {
              const MAX_H = 96;
              const barH = Math.max(Math.round((d.count / chartMax) * MAX_H), d.count > 0 ? 8 : 3);
              const isMax = d.count === chartMax && d.count > 0;
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1" style={{ height: 120, justifyContent: "flex-end" }}>
                  <span className="text-[10px] font-bold text-primary" style={{ minHeight: 14 }}>
                    {d.count > 0 ? d.count : ""}
                  </span>
                  <div
                    className="w-full rounded-t-md transition-all"
                    style={{
                      height: barH,
                      background: isMax
                        ? "linear-gradient(to top, #7C3AED, #EC4899)"
                        : "#ede9fe",
                    }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Top products + Category breakdown */}
      <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
        {/* Top products */}
        <div className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <h2 className="mb-4 text-sm font-extrabold text-navy">
            Top Products <span className="font-normal text-slate-400">by revenue</span>
          </h2>
          {topProducts.length === 0 ? (
            <div className="rounded-xl bg-purple-50 py-8 text-center">
              <p className="text-sm text-slate-400">No listings yet.</p>
              <Link
                href="/create-product"
                className="mt-2 inline-block text-sm font-bold text-primary hover:underline"
              >
                Create your first product →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {topProducts.map((p, i) => (
                <div key={p.id} className="flex items-center gap-3 py-3">
                  <span className="w-5 text-center text-xs font-extrabold text-purple-200">
                    {i + 1}
                  </span>
                  <ProductImage
                    product={p}
                    className="h-10 w-10 flex-shrink-0 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      href={productUrl(p)}
                      className="block truncate text-sm font-bold text-navy hover:text-primary"
                    >
                      {p.name}
                    </Link>
                    <p className="text-xs text-slate-400">
                      {p.category} · {formatSoldCount(p.sold_count) || "0 sold"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-primary">
                      {formatPrice((p.sold_count || 0) * p.price)}
                    </p>
                    <p className="text-xs text-slate-400">
                      {p.sold_count || 0} sold
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Category breakdown */}
        <div className="rounded-2xl bg-white p-6 shadow-md shadow-purple-100/50">
          <h2 className="mb-4 text-sm font-extrabold text-navy">By Category</h2>
          {categoryBreakdown.length === 0 ? (
            <p className="text-sm text-slate-400">Sales will appear here once you've made some.</p>
          ) : (
            <div className="space-y-4">
              {categoryBreakdown.map(([cat, data]) => {
                const maxSales = Math.max(
                  ...categoryBreakdown.map(([, d]) => d.sales),
                  1
                );
                const pct = Math.round((data.sales / maxSales) * 100);
                return (
                  <div key={cat}>
                    <div className="mb-1.5 flex justify-between text-xs">
                      <span className="max-w-[140px] truncate font-semibold text-navy">
                        {cat}
                      </span>
                      <span className="font-bold text-primary">
                        {data.sales} sold
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-purple-50">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${pct}%`,
                          background:
                            "linear-gradient(to right, #7C3AED, #EC4899)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
