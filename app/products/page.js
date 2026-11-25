import { Suspense } from "react";
import Header from "@/components/Header";
import ProductsPageContent from "@/components/ProductsPageContent";

export const metadata = {
  title: "All the Nonsense — Splurgie",
  description: "Browse 100+ fictional products on Splurgie. Add to cart, check out for $0, track a package that never arrives.",
};

export default function ProductsPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="page-heading text-3xl sm:text-4xl">All the nonsense</h1>
        <p className="mt-2 font-medium text-slate-500">
          Filter it, sort it, pretend to buy it.
        </p>
        <div className="mt-8">
          <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading the nonsense…</div>}>
            <ProductsPageContent />
          </Suspense>
        </div>
      </main>
    </>
  );
}
