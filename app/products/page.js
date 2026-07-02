import Header from "@/components/Header";
import ProductsPageContent from "@/components/ProductsPageContent";

export const metadata = {
  title: "Products — Splurgie",
  description: "Browse all fictional products on Splurgie",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="page-heading text-3xl sm:text-4xl">All Products</h1>
        <p className="mt-2 font-medium text-slate-500">
          Filter, sort, and splurge on things that don&apos;t exist.
        </p>
        <div className="mt-8">
          <ProductsPageContent />
        </div>
      </main>
    </>
  );
}
