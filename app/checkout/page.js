import Header from "@/components/Header";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout — Splurgie",
  description: "Complete your simulated Splurgie purchase",
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="page-heading text-3xl sm:text-4xl">Checkout</h1>
        <p className="mt-2 font-medium text-slate-500">
          Fill in anything. Seriously, any details work.
        </p>
        <div className="mt-8">
          <CheckoutForm />
        </div>
      </main>
    </>
  );
}
