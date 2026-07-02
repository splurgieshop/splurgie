import Header from "@/components/Header";
import ProductDetail from "@/components/ProductDetail";
import { fetchProductById, fetchRecentProducts } from "@/lib/fetchProducts";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);
  if (!product) return { title: "Product Not Found — Splurgie" };
  return {
    title: `${product.name} — Splurgie`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="mx-auto max-w-7xl flex-1 px-4 py-20 text-center sm:px-6 lg:px-8">
          <span className="text-5xl">🔍</span>
          <h1 className="page-heading mt-4 text-3xl">Product not found</h1>
          <p className="mt-2 text-slate-500">
            This fictional product may have vanished into another dimension.
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

  const recent = await fetchRecentProducts(4);
  const relatedProducts = recent
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/products"
          className="mb-6 inline-block text-sm font-bold text-primary hover:text-accent"
        >
          ← Back to products
        </Link>
        <ProductDetail product={product} relatedProducts={relatedProducts} />
      </main>
    </>
  );
}
