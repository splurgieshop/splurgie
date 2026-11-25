import { Suspense } from "react";
import Header from "@/components/Header";
import ConfirmationContent from "@/components/ConfirmationContent";

export const metadata = {
  title: "Order Confirmed (Allegedly) — Splurgie",
  description: "Order confirmed. Nothing is shipping, but congrats.",
};

export default function ConfirmationPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading...</div>}>
          <ConfirmationContent />
        </Suspense>
      </main>
    </>
  );
}
