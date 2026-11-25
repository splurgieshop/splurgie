import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { fetchProductsByUsername } from "@/lib/fetchProducts";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `@${username} — Splurgie`,
    description: `Browse all fictional products by @${username} on Splurgie`,
  };
}

export default async function SellerPage({ params }) {
  const { username } = await params;
  const products = await fetchProductsByUsername(username);

  const totalSold = products.reduce((sum, p) => sum + (p.sold_count || 0), 0);

  if (products.length === 0) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl flex-1 px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-5xl">🔍</span>
          <h1 className="page-heading mt-4 text-3xl">@{username} not found</h1>
          <p className="mt-2 text-slate-500">
            Nothing here. This seller hasn&apos;t listed anything, or doesn&apos;t exist.
          </p>
          <Link
            href="/products"
            className="mt-6 inline-block text-sm font-bold text-primary hover:text-accent"
          >
            ← Back to products
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        {/* Seller header */}
        <section className="rounded-2xl bg-white p-8 shadow-md shadow-purple-100/50">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-pink-500 text-xl font-bold text-white shadow-lg">
              {username.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="page-heading text-3xl">@{username}</h1>
              <p className="mt-1 text-slate-500">Splurgie creator</p>
              <div className="mt-4 flex justify-center gap-8 sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{products.length}</p>
                  <p className="text-sm text-slate-500">Listings</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-primary">{totalSold}</p>
                  <p className="text-sm text-slate-500">Total sold</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listings */}
        <div className="mt-10">
          <h2 className="page-heading text-2xl">Everything they made up</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
