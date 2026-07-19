import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSearch from "@/components/HeroSearch";
import CategoriesBar from "@/components/CategoriesBar";
import Link from "next/link";

const whySplurgie = [
  {
    icon: "🔮",
    title: "Discover fictional products",
    description:
      "Browse a curated feed of impossible, imaginative items from creators around the world.",
  },
  {
    icon: "💸",
    title: "Shop without spending",
    description:
      "Add to cart, checkout, and track your order — all the thrill, zero dollars gone.",
  },
  {
    icon: "🎨",
    title: "Create & sell your ideas",
    description:
      "Every account is a buyer and a seller. List your wildest inventions for the community.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <section
        className="px-4 py-20 text-center sm:px-6 lg:px-8"
        style={{
          background: "linear-gradient(135deg, #7C3AED 0%, #a855f7 50%, #EC4899 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl">
          <h1 className="text-5xl font-bold leading-tight text-white sm:text-6xl">
            Splurge on things that don&apos;t exist. Yet.
          </h1>
          <p className="mt-4 text-xl text-white/80">
            100% fictional. 100% fun.
          </p>
          <HeroSearch />
          <Link
            href="/products"
            className="mt-4 inline-block text-sm font-semibold text-white/70 transition hover:text-white"
          >
            or browse all products →
          </Link>
        </div>
      </section>

      <CategoriesBar />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {whySplurgie.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-8 text-center shadow-md shadow-purple-100/60 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-200/50"
            >
              <span className="text-4xl">{item.icon}</span>
              <h3 className="mt-4 text-lg font-extrabold text-navy">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

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
          <FeaturedProducts />
        </div>
      </section>
    </>
  );
}
