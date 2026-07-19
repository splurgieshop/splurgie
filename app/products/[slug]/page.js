import { redirect } from "next/navigation";
import Header from "@/components/Header";
import ProductDetail from "@/components/ProductDetail";
import { fetchProductBySlug, fetchTrendingProducts } from "@/lib/fetchProducts";
import Link from "next/link";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return { title: "Product Not Found — Splurgie" };
  return {
    title: `${product.name} — Splurgie`,
    description: product.description,
    openGraph: {
      title: `${product.name} — Splurgie`,
      description: product.description,
      url: `https://splurgie.com/products/${product.slug}`,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

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

  // If someone visits the old UUID URL, redirect to the slug URL
  if (product.slug && slug !== product.slug) {
    redirect(`/products/${product.slug}`);
  }

  const trending = await fetchTrendingProducts(4);
  const relatedProducts = trending
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const fallbackRelated = relatedProducts.length < 3
    ? trending.filter((p) => p.id !== product.id).slice(0, 3 - relatedProducts.length)
    : [];

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
        <ProductDetail
          product={product}
          relatedProducts={[...relatedProducts, ...fallbackRelated].slice(0, 3)}
        />
      </main>
    </>
  );
}
