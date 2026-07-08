import { Suspense } from "react";
import Header from "@/components/Header";
import TrackingContent from "@/components/TrackingContent";

export const metadata = {
  title: "Track Order — Splurgie",
  description: "Track your fictional Splurgie shipment",
};

export default function TrackingPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="page-heading mb-8 text-center text-3xl sm:text-4xl">
          Track Your Order
        </h1>
        <Suspense fallback={<div className="py-20 text-center text-slate-500">Loading tracking info...</div>}>
          <TrackingContent />
        </Suspense>
      </main>
    </>
  );
}
