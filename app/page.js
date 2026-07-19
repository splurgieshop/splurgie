import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSearch from "@/components/HeroSearch";
import CategoriesBar from "@/components/CategoriesBar";
import Link from "next/link";

const MOSAIC = [
  { emoji: "🧴", bg: "rgba(243,232,255,0.92)" },
  { emoji: "🕶️", bg: "rgba(252,231,243,0.92)" },
  { emoji: "📓", bg: "rgba(254,243,199,0.92)" },
  { emoji: "🐧", bg: "rgba(224,242,254,0.92)" },
  { emoji: "🎮", bg: "rgba(243,232,255,0.92)" },
  { emoji: "💄", bg: "rgba(252,231,243,0.92)" },
  { emoji: "⏰", bg: "rgba(254,249,195,0.92)" },
  { emoji: "🌶️", bg: "rgba(254,226,226,0.92)" },
  { emoji: "🐾", bg: "rgba(254,243,199,0.92)" },
  { emoji: "💍", bg: "rgba(243,232,255,0.92)" },
  { emoji: "📦", bg: "rgba(224,242,254,0.92)" },
  { emoji: "✨", bg: "rgba(252,231,243,0.92)" },
  { emoji: "🧪", bg: "rgba(209,250,229,0.92)" },
  { emoji: "🎨", bg: "rgba(243,232,255,0.92)" },
  { emoji: "🛸", bg: "rgba(224,242,254,0.92)" },
  { emoji: "🪄", bg: "rgba(252,231,243,0.92)" },
  { emoji: "🌮", bg: "rgba(254,243,199,0.92)" },
  { emoji: "🔮", bg: "rgba(243,232,255,0.92)" },
  { emoji: "🎭", bg: "rgba(252,231,243,0.92)" },
  { emoji: "🧸", bg: "rgba(254,243,199,0.92)" },
  { emoji: "🫧", bg: "rgba(209,250,229,0.92)" },
  { emoji: "🦄", bg: "rgba(243,232,255,0.92)" },
  { emoji: "🪐", bg: "rgba(224,242,254,0.92)" },
  { emoji: "🎪", bg: "rgba(252,231,243,0.92)" },
  { emoji: "🍄", bg: "rgba(254,243,199,0.92)" },
  { emoji: "🎯", bg: "rgba(254,226,226,0.92)" },
  { emoji: "🧲", bg: "rgba(224,242,254,0.92)" },
  { emoji: "🦋", bg: "rgba(252,231,243,0.92)" },
  { emoji: "🎸", bg: "rgba(243,232,255,0.92)" },
  { emoji: "🫙", bg: "rgba(254,243,199,0.92)" },
];

const TICKER_ITEMS = [
  "Nihilistic Penguin Backpack",
  "Mewing Mouth Tape",
  "Delulu Vision Glasses",
  "Aura Points Loyalty Card",
  "Brain Rot Detox Kit",
  "Crashout Journal",
  "Unspoken Rizz Cologne",
  "NPC Reset Button",
  "Sigma Alarm Clock",
  "Main Character Subscription Box",
  "Emotional Support Stapler",
  "Ring of Perpetual Excuse Making",
  "Monday Morning Smoothie Mix",
  "Quantum Sock Locator",
  "The CEO Cardigan",
];

const STATS = [
  { value: "500+", label: "Products" },
  { value: "90k+", label: "Carts filled" },
  { value: "200+", label: "Sellers" },
];

const tickerText = TICKER_ITEMS.join("  ·  ");

export default function Home() {
  return (
    <>
      <style>{`
        @keyframes splurgieTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track {
          display: inline-block;
          white-space: nowrap;
          animation: splurgieTicker 28s linear infinite;
        }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #7C3AED 0%, #a855f7 50%, #EC4899 100%)",
          minHeight: "360px",
        }}
      >
        {/* Mosaic background */}
        <div
          className="absolute inset-0"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
            gap: "6px",
            padding: "6px",
            opacity: 0.17,
            pointerEvents: "none",
          }}
        >
          {[...MOSAIC, ...MOSAIC].map((item, i) => (
            <div
              key={i}
              style={{
                background: item.bg,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
                aspectRatio: "1",
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center px-4 py-24 text-center sm:px-6 lg:px-8">
          <div className="mx-auto w-full max-w-2xl">
            <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
              Shop things that<br className="hidden sm:block" /> don&apos;t exist. Yet.
            </h1>
            <p className="mt-4 text-xl text-white/80">
              100% fictional · 100% fun
            </p>
            <div className="mt-8">
              <HeroSearch />
            </div>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-semibold text-white/70 transition hover:text-white"
            >
              or browse all products →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="border-b border-purple-100 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-center divide-x divide-purple-100 px-4 sm:px-6 lg:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-8 py-4 sm:px-16">
              <span className="text-2xl font-extrabold text-primary sm:text-3xl">
                {s.value}
              </span>
              <span className="mt-0.5 text-xs font-medium text-slate-500">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TICKER ── */}
      <div
        className="overflow-hidden py-3"
        style={{ background: "#1a0533" }}
      >
        <div className="ticker-track text-sm font-medium" style={{ color: "#d8b4fe" }}>
          {tickerText}&nbsp;&nbsp;·&nbsp;&nbsp;{tickerText}&nbsp;&nbsp;·&nbsp;&nbsp;
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <CategoriesBar />

      {/* ── TRENDING PRODUCTS ── */}
      <section className="bg-gradient-to-b from-purple-50/50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="page-heading text-3xl sm:text-4xl">
                Trending Now
              </h2>
              <p className="mt-2 text-slate-500">
                The hottest fictional finds this week
              </p>
            </div>
            <Link
              href="/products"
              className="text-sm font-bold text-primary hover:text-accent"
            >
              View all →
            </Link>
          </div>
          <div className="mt-10">
            <FeaturedProducts />
          </div>
        </div>
      </section>
    </>
  );
}
