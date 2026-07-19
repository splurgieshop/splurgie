import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSearch from "@/components/HeroSearch";
import HeroMosaic from "@/components/HeroMosaic";
import CategoriesBar from "@/components/CategoriesBar";
import Link from "next/link";

export default function Home() {
  return (
    <>
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
        {/* Real product image mosaic behind the text */}
        <HeroMosaic />

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
